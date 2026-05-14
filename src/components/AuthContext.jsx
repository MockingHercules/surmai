import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
const LOCAL_TOKEN_KEY = "surmai_auth_token";
const SESSION_TOKEN_KEY = "surmai_session_token";

function readToken() {
  return localStorage.getItem(LOCAL_TOKEN_KEY) || sessionStorage.getItem(SESSION_TOKEN_KEY) || "";
}

function storeToken(token, remember) {
  if (remember) {
    localStorage.setItem(LOCAL_TOKEN_KEY, token);
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
  } else {
    sessionStorage.setItem(SESSION_TOKEN_KEY, token);
    localStorage.removeItem(LOCAL_TOKEN_KEY);
  }
}

function clearToken() {
  localStorage.removeItem(LOCAL_TOKEN_KEY);
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
}

async function authFetch(path, options = {}) {
  const token = readToken();
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Something went wrong.");
  return data;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalView, setModalView] = useState("signin");
  const [toast, setToast] = useState("");

  const firstName = user?.fullName?.split(" ")?.[0] || "";

  useEffect(() => {
    const token = readToken();
    if (!token) return;

    authFetch("/api/auth/me")
      .then((data) => setUser(data.user))
      .catch(() => clearToken());
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 3200);
    return () => clearTimeout(id);
  }, [toast]);

  const openAuth = (view = "signin") => {
    setModalView(view);
    setModalOpen(true);
  };

  const completeAuth = ({ user: nextUser, token, remember, message }) => {
    storeToken(token, remember);
    setUser(nextUser);
    setModalOpen(false);
    setToast(message || `Welcome back, ${nextUser.fullName.split(" ")[0]}! 👋`);
  };

  const logout = () => {
    clearToken();
    setUser(null);
    setToast("Logged out of Surmai.");
  };

  const value = useMemo(() => ({
    user,
    firstName,
    toast,
    modalOpen,
    modalView,
    setModalOpen,
    setModalView,
    openAuth,
    completeAuth,
    logout,
    isAuthenticated: Boolean(user),
  }), [user, firstName, toast, modalOpen, modalView]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export { authFetch };
