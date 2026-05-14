import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import PageHero from "../components/PageHero.jsx";
import SearchFilter from "../components/SearchFilter.jsx";
import { dishes, dishCategories } from "../data/dishes.js";

const fallbackDishImage = "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=85";
const spiceScores = { Mild: 18, Medium: 45, Warm: 58, Sharp: 74, Hot: 92 };

function imageFallback(event) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = fallbackDishImage;
}

function SpiceMeter({ level, compact = false }) {
  const score = spiceScores[level] || 45;
  return (
    <div className={compact ? "mt-3" : "mt-4"}>
      <div className="flex items-center justify-between text-xs uppercase tracking-[.12em] text-slate-300">
        <span>Spice</span>
        <strong className="text-cyan-100">{level}</strong>
      </div>
      <div className="relative mt-2 h-2.5 overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 via-orange-400 to-red-500">
        <span className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white bg-slate-950 shadow-lg" style={{ left: `calc(${score}% - 8px)` }} />
      </div>
      {!compact && <div className="mt-1 flex justify-between text-[10px] uppercase tracking-[.12em] text-slate-500"><span>Mild</span><span>Medium</span><span>Hot</span></div>}
    </div>
  );
}

function RecipeModal({ dish, onClose }) {
  return createPortal(
    <div
      className="fixed inset-0 z-[999] grid place-items-center bg-slate-950/82 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${dish.name} recipe`}
    >
      <div
        className="flex max-h-[88svh] w-full max-w-[46rem] flex-col overflow-hidden rounded-[1.5rem] border border-white/20 bg-slate-950 text-white shadow-[0_30px_90px_rgba(0,0,0,.6)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-36 shrink-0 overflow-hidden md:h-44">
          <img src={dish.image} alt={dish.name} onError={imageFallback} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
          <button type="button" className="absolute right-3 top-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:scale-105" onClick={onClose}>Close</button>
          <div className="absolute bottom-4 left-4 right-20">
            <p className="text-xs uppercase tracking-[.14em] text-cyan-200">{dish.origin} / {dish.style}</p>
            <h2 className="mt-1 text-3xl font-semibold leading-tight md:text-4xl">{dish.name}</h2>
          </div>
        </div>

        <div className="overflow-y-auto p-4 md:p-5">
          <div className="grid gap-4 md:grid-cols-[.9fr_1.1fr]">
            <aside className="rounded-2xl border border-white/15 bg-white/10 p-4">
              <p className="text-sm leading-6 text-cyan-100">{dish.intro}</p>
              <SpiceMeter level={dish.spice} compact />
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-xl bg-white/10 p-2"><span className="block text-slate-400">Prep</span><strong>{dish.prepTime}</strong></div>
                <div className="rounded-xl bg-white/10 p-2"><span className="block text-slate-400">Cook</span><strong>{dish.cookTime}</strong></div>
                <div className="rounded-xl bg-white/10 p-2"><span className="block text-slate-400">Serves</span><strong>{dish.serves}</strong></div>
              </div>
              <h3 className="mt-4 text-lg font-semibold">Ingredients</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {dish.ingredients.map((item) => <span className="rounded-full bg-cyan-200 px-3 py-1.5 text-xs font-semibold text-slate-950" key={item}>{item}</span>)}
              </div>
            </aside>

            <section>
              <p className="text-xs uppercase tracking-[.14em] text-cyan-200">Cook at home</p>
              <h3 className="mt-1 text-2xl font-semibold">Step-by-step recipe</h3>
              <ol className="mt-4 grid gap-3">
                {dish.recipe.map((step, index) => (
                  <li key={step} className="grid grid-cols-[34px_1fr] gap-3 rounded-2xl border border-white/10 bg-white/10 p-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-cyan-200 text-sm font-bold text-slate-950">{index + 1}</span>
                    <p className="text-sm leading-6 text-slate-200">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function Dishes() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const visible = useMemo(() => dishes.filter((dish) => (category === "All" || dish.category === category) && dish.name.toLowerCase().includes(search.toLowerCase())), [search, category]);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setSelected(null);
      }
    }

    if (selected) {
      document.addEventListener("keydown", closeOnEscape);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [selected]);

  return <>
    <PageHero
      eyebrow="Seafood dish gallery"
      title="Regional seafood dishes."
      copy="Discover Indian seafood recipes you can cook at home, with ingredients, spice level, cooking style, origin state, and step-by-step methods for every dish."
      image="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1800&q=85"
    />
    <main className="page-shell">
      <SearchFilter search={search} setSearch={setSearch} categories={dishCategories} active={category} setActive={setCategory} placeholder="Search dishes" />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((dish) => (
          <button key={dish.name} type="button" onClick={() => setSelected(dish)} className="glass-card group overflow-hidden text-left">
            <div className="relative h-64 overflow-hidden">
              <img src={dish.image} alt={dish.name} onError={imageFallback} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 to-transparent" />
              <span className="absolute bottom-4 left-4 rounded-full bg-cyan-200 px-4 py-2 text-xs font-bold text-slate-950">View recipe</span>
            </div>
            <div className="p-6">
              <p className="text-sm uppercase text-cyan-200">{dish.origin} / {dish.style}</p>
              <h3 className="mt-2 text-3xl font-semibold">{dish.name}</h3>
              <SpiceMeter level={dish.spice} />
              <p className="mt-4 text-sm leading-6 text-slate-400">{dish.intro}</p>
              <div className="mt-4 flex flex-wrap gap-2">{dish.ingredients.map((item) => <span className="rounded-full bg-white/10 px-3 py-2 text-sm" key={item}>{item}</span>)}</div>
            </div>
          </button>
        ))}
      </div>
    </main>

    {selected && <RecipeModal dish={selected} onClose={() => setSelected(null)} />}
  </>;
}
