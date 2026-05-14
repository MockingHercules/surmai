import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/AuthContext.jsx";
import { GlassCard } from "../components/GlassCard.jsx";

export function ProtectedRoute({ children }) {
  const { isAuthenticated, openAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) openAuth("signin");
  }, [isAuthenticated, openAuth]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <main className="page-shell pt-36">
      <GlassCard className="p-8">
        <p className="text-sm uppercase tracking-[.14em] text-cyan-200">Member dashboard</p>
        <h1 className="mt-3 font-display text-6xl">Welcome, {user.fullName.split(" ")[0]}.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          This protected page is ready for profile details, saved seafood orders, delivery addresses, and member-only recommendations.
        </p>
      </GlassCard>
    </main>
  );
}
