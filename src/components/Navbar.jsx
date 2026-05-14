import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import { useCart } from "./CartContext.jsx";
import Logo from "./Logo.jsx";

const links = [
  ["/shop", "Shop"],
  ["/markets", "Markets"],
  ["/dishes", "Dishes"],
  ["/restaurants", "Restaurants"],
  ["/season", "Season"],
];

function PersonIcon() {
  return <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="7" r="4" /><path d="M4 21c1.6-4 4.2-6 8-6s6.4 2 8 6" /></svg>;
}

function CartIcon() {
  return <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" /><circle cx="10" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /></svg>;
}

export default function Navbar({ cartCount, onCartOpen }) {
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const location = useLocation();
  const { user, firstName, openAuth, logout } = useAuth();
  const { badgePulse, logoutCart } = useCart();

  useEffect(() => {
    setOpen(false);
    setAccountOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logoutCart();
    logout();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-4 md:px-8 md:py-4">
      <nav className="mx-auto flex max-w-7xl items-center gap-2 rounded-[1.5rem] border border-white/35 bg-slate-100/75 p-2 pl-3 shadow-2xl shadow-black/15 backdrop-blur-2xl sm:gap-3 sm:rounded-[2rem] sm:pl-4">
        <NavLink to="/" className="mr-auto flex min-w-0 items-center gap-2 rounded-full transition hover:scale-[1.02] sm:gap-3" aria-label="Surmai home">
          <Logo />
          <span className="font-display text-3xl leading-none text-slate-950 sm:text-4xl">surmai</span>
        </NavLink>

        <button className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-slate-950 text-white md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span className="text-xl">{open ? "x" : "="}</span>
        </button>

        <div className={`${open ? "grid" : "hidden"} absolute left-3 right-3 top-[4.75rem] gap-2 rounded-3xl border border-white/20 bg-slate-950/95 p-3 shadow-2xl backdrop-blur-2xl md:static md:flex md:bg-transparent md:p-0 md:shadow-none`}>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `rounded-full px-4 py-3 text-sm transition hover:-translate-y-0.5 hover:bg-white/15 ${isActive ? "bg-cyan-200 text-slate-950 shadow-lg shadow-cyan-300/20" : "text-white md:text-slate-950"}`}>
              {label}
            </NavLink>
          ))}
        </div>

        <div className="relative shrink-0">
          {user ? (
            <button onClick={() => setAccountOpen(!accountOpen)} className="flex items-center gap-2 rounded-full border border-slate-950/10 bg-white/35 px-3 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-white/15 sm:px-4" aria-label={`Open account menu for ${firstName}`}>
              <PersonIcon /> <span className="hidden sm:inline">{firstName}</span>
            </button>
          ) : (
            <button onClick={() => openAuth("signin")} className="flex items-center gap-2 rounded-full border border-slate-950/10 bg-white/35 px-3 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-white/15 sm:px-4" aria-label="Login">
              <PersonIcon /> <span className="hidden sm:inline">Login</span>
            </button>
          )}

          {accountOpen && (
            <div className="absolute right-0 mt-3 w-44 overflow-hidden rounded-2xl border border-white/15 bg-slate-950/95 p-2 text-white shadow-2xl backdrop-blur-xl">
              <NavLink to="/dashboard" className="block rounded-xl px-4 py-3 text-sm hover:bg-white/10">Profile</NavLink>
              <button className="block w-full rounded-xl px-4 py-3 text-left text-sm hover:bg-white/10">My Orders</button>
              <button onClick={handleLogout} className="block w-full rounded-xl px-4 py-3 text-left text-sm text-red-200 hover:bg-red-500/10">Logout</button>
            </div>
          )}
        </div>

        <button onClick={onCartOpen} className="relative flex shrink-0 items-center gap-2 rounded-full bg-cyan-200 px-3 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-xl sm:px-5" aria-label={`Open cart${cartCount ? `, ${cartCount} items` : ""}`}>
          <CartIcon /> <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && <span className={`absolute -right-1 -top-1 grid h-6 min-w-6 place-items-center rounded-full bg-red-500 px-1.5 text-xs font-bold text-white shadow-lg shadow-red-950/30 ${badgePulse ? "animate-cartPop" : ""}`}>{cartCount}</span>}
        </button>
      </nav>
    </header>
  );
}

