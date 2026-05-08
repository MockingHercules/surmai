import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo.jsx";

const links = [
  ["/shop", "Shop"],
  ["/markets", "Markets"],
  ["/dishes", "Dishes"],
  ["/restaurants", "Restaurants"],
  ["/season", "Season"],
];

export default function Navbar({ cartCount, onCartOpen, darkMode, setDarkMode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8">
      <nav className="mx-auto flex max-w-7xl items-center gap-3 rounded-[2rem] border border-white/20 bg-white/10 p-2 pl-4 shadow-2xl shadow-black/20 backdrop-blur-2xl dark:bg-slate-950/55">
        <NavLink to="/" className="mr-auto flex items-center gap-3 rounded-full transition hover:scale-[1.02]" aria-label="Surmai home">
          <Logo />
          <span className="font-display text-4xl leading-none text-slate-950 dark:text-white">surmai</span>
        </NavLink>
        <button className="grid h-11 w-11 place-items-center rounded-full bg-slate-950 text-white md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span className="text-xl">{open ? "x" : "="}</span>
        </button>
        <div className={`${open ? "grid" : "hidden"} absolute left-4 right-4 top-20 gap-2 rounded-3xl border border-white/20 bg-slate-950/90 p-3 backdrop-blur-2xl md:static md:flex md:bg-transparent md:p-0`}>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `rounded-full px-4 py-3 text-sm transition hover:-translate-y-0.5 hover:bg-white/15 ${isActive ? "bg-cyan-200 text-slate-950 shadow-lg shadow-cyan-300/20" : "text-slate-100 md:text-slate-800 md:dark:text-slate-100"}`}>
              {label}
            </NavLink>
          ))}
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className="hidden rounded-full border border-white/20 px-4 py-3 text-sm text-slate-900 transition hover:bg-white/20 dark:text-white sm:block">
          {darkMode ? "Light" : "Dark"}
        </button>
        <button onClick={onCartOpen} className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-xl dark:bg-cyan-200 dark:text-slate-950">
          Cart <span className="ml-2 rounded-full bg-cyan-200 px-2 py-1 text-slate-950 dark:bg-slate-950 dark:text-cyan-100">{cartCount}</span>
        </button>
      </nav>
    </header>
  );
}
