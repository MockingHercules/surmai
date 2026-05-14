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
  let response;

  try {
    response = await fetch(path, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });
  } catch {
    throw new Error("Auth server is not reachable. Start the site with npm run dev, then try again.");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || `Auth request failed (${response.status}).`);
  return data;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalView, setModalView] = useState("signin");
  const [authReason, setAuthReason] = useState("");
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

  const openAuth = (view = "signin", reason = "") => {
    setModalView(view);
    setAuthReason(reason);
    setModalOpen(true);
  };

  const closeAuth = () => {
    setModalOpen(false);
    setAuthReason("");
  };

  const completeAuth = ({ user: nextUser, token, remember, message }) => {
    storeToken(token, remember);
    setUser(nextUser);
    setModalOpen(false);
    setAuthReason("");
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
    setToast,
    modalOpen,
    modalView,
    authReason,
    setModalOpen,
    setModalView,
    openAuth,
    closeAuth,
    completeAuth,
    logout,
    isAuthenticated: Boolean(user),
  }), [user, firstName, toast, modalOpen, modalView, authReason]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export { authFetch };

