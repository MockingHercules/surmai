import { useEffect, useMemo, useState } from "react";
import { authFetch, makeLocalToken, readLocalUsers, useAuth, writeLocalUsers } from "./AuthContext.jsx";

const initialForm = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  remember: true,
};

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function fullNameFromEmail(email) {
  return normalizeEmail(email)
    .split("@")[0]
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase()) || "Surmai User";
}

function localSignup(form) {
  const email = normalizeEmail(form.email);
  const users = readLocalUsers();
  const existing = users[email];

  // Presentation-safe behavior: if the same person signs up again with the same password,
  // treat it as a successful sign-in instead of blocking the demo flow.
  if (existing) {
    if (existing.password === form.password) {
      return { user: existing.user, token: makeLocalToken(email), message: `Welcome back, ${existing.user.fullName.split(" ")[0]}!` };
    }
    throw new Error("Email already registered. Please sign in.");
  }

  const user = {
    id: `local-${Date.now()}`,
    fullName: form.fullName.trim() || fullNameFromEmail(email),
    email,
  };

  users[email] = { user, password: form.password };
  writeLocalUsers(users);
  return { user, token: makeLocalToken(email), message: `Welcome, ${user.fullName.split(" ")[0]}!` };
}

function localLogin(form) {
  const email = normalizeEmail(form.email);
  const entry = readLocalUsers()[email];

  if (!entry) {
    throw new Error("No account found. Please sign up first.");
  }

  if (entry.password !== form.password) {
    throw new Error("Incorrect password.");
  }

  return { user: entry.user, token: makeLocalToken(email), message: `Welcome back, ${entry.user.fullName.split(" ")[0]}!` };
}

function resetLocalPassword(form) {
  const email = normalizeEmail(form.email);
  const users = readLocalUsers();
  const entry = users[email];

  if (!entry) {
    throw new Error("No account found. Please sign up first.");
  }

  users[email] = { ...entry, password: form.password };
  writeLocalUsers(users);
  return "Password reset successfully. Please sign in with your new password.";
}

function Spinner() {
  return <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />;
}

function EyeIcon({ hidden }) {
  return <span aria-hidden="true">{hidden ? "Show" : "Hide"}</span>;
}

function Field({ label, name, type = "text", value, onChange, valid, invalid, autoComplete, right }) {
  const border = value ? (valid ? "border-emerald-400" : invalid ? "border-red-400" : "border-slate-300") : "border-slate-300";
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <div className={`flex items-center rounded-xl border bg-white px-3 shadow-sm transition focus-within:border-blue-500 ${border}`}>
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className="min-h-12 flex-1 bg-transparent text-slate-950 outline-none placeholder:text-slate-400"
          placeholder={label}
        />
        {right}
        {value && <span className={`ml-2 h-2.5 w-2.5 rounded-full ${valid ? "bg-emerald-500" : invalid ? "bg-red-500" : "bg-slate-300"}`} />}
      </div>
    </label>
  );
}

function passwordStrength(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  if (score <= 1) return { label: "Weak", color: "bg-red-500", width: "w-1/4" };
  if (score <= 3) return { label: "Good", color: "bg-amber-500", width: "w-2/3" };
  return { label: "Strong", color: "bg-emerald-500", width: "w-full" };
}

export default function AuthModal() {
  const { modalOpen, modalView, setModalView, authReason, closeAuth, completeAuth } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const strength = passwordStrength(form.password);
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isName = form.fullName.trim().length >= 2;
  const isPassword = form.password.length >= 8;
  const isConfirm = form.confirmPassword && form.confirmPassword === form.password;

  const title = modalView === "signup" ? "Create account" : modalView === "forgot" ? "Reset password" : "Sign in";
  const subtitle = modalView === "signup" ? "Join Surmai for saved orders and faster seafood checkout." : modalView === "forgot" ? "Enter your email and a new password. The password resets instantly for this presentation." : "Welcome back to your Surmai account.";

  useEffect(() => {
    if (!modalOpen) return;
    setMessage("");
  }, [modalOpen, modalView]);

  const update = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const delay = () => new Promise((resolve) => setTimeout(resolve, 350));

  const submit = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await delay();

      if (modalView === "forgot") {
        if (form.password !== form.confirmPassword) {
          setMessage("Passwords do not match.");
          return;
        }

        const localMessage = resetLocalPassword(form);
        setMessage(localMessage);
        authFetch("/api/auth/forgot-password", {
          method: "POST",
          body: JSON.stringify({ email: form.email, password: form.password }),
        }).catch(() => {});
        return;
      }

      if (modalView === "signup") {
        if (form.password !== form.confirmPassword) {
          setMessage("Passwords do not match.");
          return;
        }

        const data = localSignup(form);
        completeAuth({ ...data, remember: form.remember });
        setForm(initialForm);
        authFetch("/api/auth/register", {
          method: "POST",
          body: JSON.stringify(form),
        }).catch(() => {});
        return;
      }

      const data = localLogin(form);
      completeAuth({ ...data, remember: form.remember });
      setForm(initialForm);
      authFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      }).catch(() => {});
    } catch (error) {
      setMessage(error.message || "Please check the form and try again.");

      if ((error.message || "").includes("No account found")) {
        setTimeout(() => setModalView("signup"), 1800);
      }
      if ((error.message || "").includes("Email already registered")) {
        setTimeout(() => setModalView("signin"), 1000);
      }
    } finally {
      setLoading(false);
    }
  };


  const canSubmit = useMemo(() => {
    if (modalView === "forgot") return isEmail && isPassword && isConfirm;
    if (modalView === "signin") return isEmail && form.password.length > 0;
    return isName && isEmail && isPassword && isConfirm;
  }, [modalView, isEmail, isName, isPassword, isConfirm, form.password.length]);

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/70 p-0 opacity-100 backdrop-blur-sm animate-pageFade sm:p-4" onMouseDown={closeAuth}>
      <section className="flex max-h-dvh min-h-dvh w-full max-w-md flex-col overflow-hidden rounded-none bg-white text-slate-950 shadow-2xl shadow-black/30 transition sm:min-h-0 sm:max-h-[92vh] sm:rounded-xl md:max-w-lg" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 p-5 sm:p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.14em] text-blue-600">Surmai account</p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{title}</h2>
            <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          </div>
          <button onClick={closeAuth} className="rounded-full border border-slate-200 px-3 py-2 text-sm transition hover:bg-slate-100">Close</button>
        </div>

        <div className="overflow-y-auto p-5 sm:p-6">
          {authReason && <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">{authReason === "wishlist" ? "Login to save seafood to your wishlist" : "Login to continue shopping"}</div>}
          {modalView !== "forgot" && (
            <div className="mb-5 grid grid-cols-2 rounded-full bg-slate-100 p-1 text-sm font-semibold">
              <button className={`rounded-full py-3 transition ${modalView === "signin" ? "bg-white shadow" : "text-slate-500"}`} onClick={() => setModalView("signin")}>Sign In</button>
              <button className={`rounded-full py-3 transition ${modalView === "signup" ? "bg-white shadow" : "text-slate-500"}`} onClick={() => setModalView("signup")}>Sign Up</button>
            </div>
          )}

          <form onSubmit={submit} className="grid gap-4 transition-all duration-300">
            {modalView === "signup" && <Field label="Full Name" name="fullName" value={form.fullName} onChange={update} valid={isName} invalid={form.fullName && !isName} autoComplete="name" />}
            <Field label="Email" name="email" type="email" value={form.email} onChange={update} valid={isEmail} invalid={form.email && !isEmail} autoComplete="email" />

            {(modalView === "signin" || modalView === "signup" || modalView === "forgot") && (
              <>
                <Field
                  label={modalView === "forgot" ? "New Password" : "Password"}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={update}
                  valid={isPassword}
                  invalid={form.password && !isPassword}
                  autoComplete="off"
                  right={<button type="button" onClick={() => setShowPassword(!showPassword)} className="text-xs font-bold text-blue-600"><EyeIcon hidden={!showPassword} /></button>}
                />
                <div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full ${strength.color} ${strength.width} transition-all`} /></div>
                  <p className="mt-1 text-xs text-slate-500">Password strength: {strength.label}. Minimum 8 characters.</p>
                </div>
              </>
            )}

            {(modalView === "signup" || modalView === "forgot") && (
              <Field
                label={modalView === "forgot" ? "Confirm New Password" : "Confirm Password"}
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={update}
                valid={isConfirm}
                invalid={form.confirmPassword && !isConfirm}
                autoComplete="off"
                right={<button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-xs font-bold text-blue-600"><EyeIcon hidden={!showConfirm} /></button>}
              />
            )}

            {modalView !== "forgot" && (
              <label className="flex items-center gap-3 text-sm text-slate-600">
                <input type="checkbox" name="remember" checked={form.remember} onChange={update} className="h-4 w-4 accent-blue-600" />
                Remember me for 30 days
              </label>
            )}

            {message && <p className={`rounded-xl p-3 text-sm ${message.includes("sent") || message.includes("successfully") ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>{message}</p>}

            <button disabled={!canSubmit || loading} className="mt-1 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#1a73e8] font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300">
              {loading && <Spinner />}
              {modalView === "signup" ? "Create Account" : modalView === "forgot" ? "Reset password" : "Sign In"}
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-slate-500">
            {modalView === "signin" && <><button className="font-semibold text-blue-600" onClick={() => setModalView("forgot")}>Forgot password?</button><span className="mx-2">/</span>Don&apos;t have an account? <button className="font-semibold text-blue-600" onClick={() => setModalView("signup")}>Sign Up</button></>}
            {modalView === "signup" && <>Already have an account? <button className="font-semibold text-blue-600" onClick={() => setModalView("signin")}>Sign In</button></>}
            {modalView === "forgot" && <>Remembered it? <button className="font-semibold text-blue-600" onClick={() => setModalView("signin")}>Sign In</button></>}
          </div>
        </div>
      </section>
    </div>
  );
}


