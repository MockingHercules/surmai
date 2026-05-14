import { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/AuthContext.jsx";

const statusStyles = {
  DELIVERED: "bg-emerald-400/15 text-emerald-200 ring-emerald-300/30",
  "IN TRANSIT": "bg-amber-400/15 text-amber-200 ring-amber-300/30",
  PROCESSING: "bg-slate-500/20 text-slate-200 ring-slate-300/20",
};

const fallbackOrders = [
  { id: "ord-1001", item: "Tiger Prawns (1kg)", date: "12 May", price: 899, status: "DELIVERED" },
  { id: "ord-1002", item: "Squid Rings + Pomfret", date: "14 May", price: 1240, status: "IN TRANSIT" },
  { id: "ord-1003", item: "Rawas Fillet Pack", date: "10 May", price: 560, status: "PROCESSING" },
];

const memberPicks = [
  { name: "Silver Pomfret", price: 650, badge: "SEASONAL" },
  { name: "Rock Lobster", price: 2200, badge: "FRESH TODAY" },
  { name: "Rawas Fillet", price: 480, badge: "BESTSELLER" },
  { name: "Blue Crab", price: 1100, badge: "LIMITED" },
];

function rupees(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function readRecentOrders() {
  try {
    // TODO: Replace this localStorage bridge with GET /api/orders?limit=3 when a real orders API exists.
    const saved = JSON.parse(localStorage.getItem("surmai_recent_orders") || "[]");
    return Array.isArray(saved) && saved.length ? saved.slice(0, 3) : fallbackOrders;
  } catch {
    return fallbackOrders;
  }
}

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export function LoginRedirect() {
  const { isAuthenticated, openAuth } = useAuth();
  const location = useLocation();
  const nextPath = location.state?.from || "/dashboard";

  useEffect(() => {
    if (!isAuthenticated) openAuth("signin", "dashboard");
  }, [isAuthenticated, openAuth]);

  if (isAuthenticated) return <Navigate to={nextPath} replace />;

  return (
    <main className="min-h-screen bg-[#0a0f1e] px-5 pt-36 text-[#fff7ed]">
      <section className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/[0.07] p-7 text-center shadow-2xl shadow-black/30 backdrop-blur-xl">
        <p className="text-xs font-black uppercase tracking-[.18em] text-amber-400">Members only</p>
        <h1 className="mt-4 text-4xl font-semibold">Login required.</h1>
        <p className="mt-3 text-slate-300">Sign in to view your Surmai dashboard, orders, points, and saved seafood picks.</p>
        <button onClick={() => openAuth("signin", "dashboard")} className="mt-6 rounded-full bg-amber-500 px-6 py-3 font-black text-slate-950 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-400/20">
          Open login
        </button>
      </section>
    </main>
  );
}

function SquareMark({ className = "" }) {
  return <span className={`inline-block h-3 w-3 rounded-[3px] bg-amber-500 shadow-[0_0_22px_rgba(245,158,11,.45)] ${className}`} />;
}

function DashboardNav() {
  return (
    <nav className="flex items-center justify-between rounded-[1.6rem] border border-white/10 bg-white/[0.055] px-4 py-3 shadow-2xl shadow-black/25 backdrop-blur-xl">
      <a href="/" className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-[#fff7ed]">
        <SquareMark />
        surmai
      </a>
      <button className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/10 text-2xl leading-none text-[#fff7ed] transition hover:-translate-y-0.5 hover:bg-amber-500 hover:text-slate-950" aria-label="Open dashboard menu">
        ≡
      </button>
    </nav>
  );
}

function StatCard({ label, value, suffix }) {
  return (
    <article className="rounded-[1.35rem] border border-white/10 bg-white/[0.07] p-4 shadow-xl shadow-black/20 backdrop-blur-xl transition hover:-translate-y-1 hover:border-amber-400/50 sm:p-5">
      <p className="text-[11px] font-black uppercase tracking-[.16em] text-amber-400">{label}</p>
      <strong className="mt-3 block text-3xl leading-none text-[#fff7ed]">{value}</strong>
      {suffix && <span className="mt-1 block text-sm font-semibold text-slate-300">{suffix}</span>}
    </article>
  );
}

function RecentOrders() {
  const [orders, setOrders] = useState(readRecentOrders);

  useEffect(() => {
    const refreshOrders = () => setOrders(readRecentOrders());
    window.addEventListener("storage", refreshOrders);
    window.addEventListener("surmai:order-placed", refreshOrders);
    return () => {
      window.removeEventListener("storage", refreshOrders);
      window.removeEventListener("surmai:order-placed", refreshOrders);
    };
  }, []);

  return (
    <section className="rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm font-black uppercase tracking-[.16em] text-amber-400">Recent orders</h2>
        <a href="/cart" className="text-sm font-bold text-amber-300 transition hover:text-amber-100">View all →</a>
      </div>

      <div className="mt-5 grid gap-3">
        {orders.map((order) => (
          <article key={order.id} className="grid grid-cols-[auto_1fr] gap-3 rounded-2xl border border-white/10 bg-[#111827]/75 p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
            <SquareMark className="mt-1" />
            <div>
              <h3 className="font-semibold text-[#fff7ed]">{order.item}</h3>
              <p className="mt-1 text-sm text-slate-400">{order.date} · {rupees(order.price)}</p>
            </div>
            <span className={`col-start-2 w-fit rounded-full px-3 py-1.5 text-[11px] font-black tracking-wide ring-1 sm:col-start-auto ${statusStyles[order.status] || statusStyles.PROCESSING}`}>{order.status}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function MemberPicks() {
  return (
    <section className="rounded-[1.8rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <p className="text-xs font-black uppercase tracking-[.16em] text-slate-400">For you</p>
      <h2 className="mt-1 text-sm font-black uppercase tracking-[.16em] text-amber-400">Members only</h2>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {memberPicks.map((product) => (
          <article key={product.name} className="min-h-36 rounded-[1.35rem] border border-white/10 bg-[#111827]/80 p-4 shadow-xl shadow-black/15 transition hover:-translate-y-1 hover:border-amber-400/50">
            <span className="rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-black tracking-wide text-slate-950">{product.badge}</span>
            <SquareMark className="mt-5 block" />
            <h3 className="mt-3 text-base font-semibold text-[#fff7ed]">{product.name}</h3>
            <p className="mt-1 text-sm font-bold text-amber-200">{rupees(product.price)} / kg</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DeliveryAddress() {
  return (
    <section className="rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm font-black uppercase tracking-[.16em] text-amber-400">Delivery address</h2>
        <button className="rounded-full bg-amber-500 px-4 py-2 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/20">+ Add</button>
      </div>
      <div className="mt-5 grid grid-cols-[auto_1fr] gap-3 rounded-2xl border border-white/10 bg-[#111827]/75 p-4">
        <SquareMark className="mt-1" />
        <div>
          <span className="rounded-full border border-amber-300/40 px-3 py-1 text-[11px] font-black text-amber-200">HOME</span>
          <p className="mt-4 leading-7 text-slate-300">14B, Sea View Heights<br />Bandra West, Mumbai 400050</p>
        </div>
      </div>
    </section>
  );
}

function DashboardFooter() {
  const icons = ["Instagram", "YouTube", "X"];
  return (
    <footer className="border-t border-white/10 py-8 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
      <div>
        <p className="text-2xl font-semibold text-[#fff7ed]">surmai</p>
        <p className="mt-2 text-sm text-slate-400">Premium Indian seafood discovery platform.</p>
      </div>
      <div className="mt-5 flex justify-center gap-4 text-sm font-bold text-amber-200 sm:mt-0">
        {icons.map((icon) => <a key={icon} href="#" className="transition hover:text-amber-400">{icon}</a>)}
      </div>
    </footer>
  );
}

export default function Dashboard() {
  const { user, firstName } = useAuth();
  const displayName = useMemo(() => firstName || user?.fullName?.split(" ")?.[0] || "Dev", [firstName, user]);

  return (
    <main className="min-h-screen bg-[#0a0f1e] px-4 pb-8 pt-28 font-sans text-[#fff7ed] sm:px-6 lg:px-10">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_4%,rgba(245,158,11,.18),transparent_28%),radial-gradient(circle_at_90%_10%,rgba(255,247,237,.08),transparent_24%),linear-gradient(180deg,#0a0f1e,#080c18)]" />
      <div className="mx-auto max-w-5xl">
        <DashboardNav />

        <section className="py-9 sm:py-11">
          <p className="text-xs font-black uppercase tracking-[.18em] text-amber-400">Member dashboard</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-[#fff7ed] sm:text-6xl">Welcome, {displayName}.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">This protected page is ready for profile details, saved seafood orders, delivery addresses, and member-only recommendations.</p>
        </section>

        <section className="grid grid-cols-3 gap-3 sm:gap-4">
          <StatCard label="Orders" value="12" />
          <StatCard label="Saved" value="5" suffix="items" />
          <StatCard label="Points" value="840" />
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.08fr_.92fr]">
          <RecentOrders />
          <MemberPicks />
        </div>

        <div className="mt-6">
          <DeliveryAddress />
        </div>

        <DashboardFooter />
      </div>
    </main>
  );
}
