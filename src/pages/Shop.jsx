import { useMemo, useState } from "react";
import PageHero from "../components/PageHero.jsx";
import SearchFilter from "../components/SearchFilter.jsx";
import { products, shopCategories } from "../data/shop.js";
import { useCart } from "../components/CartContext.jsx";

export default function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { add, blockedProductId, wishlistIds, toggleWishlist } = useCart();
  const visible = useMemo(() => products.filter((item) => (category === "All" || item.category === category) && item.name.toLowerCase().includes(search.toLowerCase())), [search, category]);

  return <>
    <PageHero eyebrow="Fresh in minutes" title="Shop premium seafood." copy="A Blinkit-style presentation demo for buying fresh fish, prawns, crab and shellfish with a cart and fake checkout." image="https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1800&q=85" />
    <main className="page-shell">
      <SearchFilter search={search} setSearch={setSearch} categories={shopCategories} active={category} setActive={setCategory} placeholder="Search seafood products" />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {visible.map((product) => {
          const blocked = blockedProductId === product.id;
          const wished = wishlistIds.includes(product.id);
          return (
            <article key={product.id} className="glass-card overflow-hidden">
              <div className="relative aspect-square overflow-hidden">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 hover:scale-110" />
                <span className="absolute right-3 top-3 rounded-full bg-cyan-200 px-3 py-2 text-xs font-bold text-slate-950">{product.freshness}</span>
                <button onClick={() => toggleWishlist(product)} className={`absolute left-3 top-3 grid h-11 w-11 place-items-center rounded-full border border-white/30 text-xl backdrop-blur-xl transition hover:scale-110 ${wished ? "bg-red-500 text-white" : "bg-slate-950/45 text-white"}`} aria-label="Toggle wishlist">
                  {wished ? "♥" : "♡"}
                </button>
              </div>
              <div className="p-5">
                <p className="text-xs uppercase text-cyan-200">{product.category} / {product.unit}</p>
                <h3 className="mt-2 text-2xl font-semibold">{product.name}</h3>
                <p className="mt-2 text-slate-300">{product.stock}</p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <strong className="text-xl">Rs {product.price}</strong>
                  <button onClick={() => add(product)} className={`rounded-full px-5 py-3 font-bold transition hover:-translate-y-1 ${blocked ? "animate-lockFlash bg-red-500 text-white" : "bg-cyan-200 text-slate-950"}`}>
                    {blocked ? "🔒 Login" : "Add to cart"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  </>;
}
