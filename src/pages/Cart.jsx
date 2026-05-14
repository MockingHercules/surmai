import { useAuth } from "../components/AuthContext.jsx";
import { useCart } from "../components/CartContext.jsx";
import { GlassCard } from "../components/GlassCard.jsx";

export default function CartPage() {
  const { isAuthenticated, openAuth } = useAuth();
  const { items, subtotal, remove, add, removeAll } = useCart();
  const delivery = items.length ? 29 : 0;

  return (
    <main className="page-shell pt-36">
      {!isAuthenticated ? (
        <GlassCard className="grid min-h-[420px] place-items-center p-8 text-center">
          <div>
            <p className="text-6xl">🔒</p>
            <h1 className="mt-5 text-4xl font-semibold">You need to be logged in to view your cart.</h1>
            <p className="mt-3 text-slate-300">Login to see saved seafood items, quantities, and checkout totals.</p>
            <button onClick={() => openAuth("signin", "cart")} className="mt-6 rounded-full bg-cyan-200 px-6 py-3 font-bold text-slate-950">Login Now</button>
          </div>
        </GlassCard>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <GlassCard className="p-6">
            <p className="text-sm uppercase tracking-[.14em] text-cyan-200">Your cart</p>
            <h1 className="mt-3 text-4xl font-semibold">Seafood basket</h1>
            <div className="mt-6 grid gap-4">
              {items.length ? items.map(({ product, quantity }) => (
                <div key={product.id} className="grid gap-4 rounded-3xl bg-white/10 p-4 sm:grid-cols-[96px_1fr_auto] sm:items-center">
                  <img src={product.image} alt={product.name} className="h-24 w-24 rounded-2xl object-cover" />
                  <div>
                    <h2 className="text-2xl font-semibold">{product.name}</h2>
                    <p className="text-slate-300">Rs {product.price} / {product.unit}</p>
                    <button onClick={() => removeAll(product.id)} className="mt-2 text-sm font-semibold text-red-200">Remove</button>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => remove(product.id)} className="grid h-10 w-10 place-items-center rounded-full bg-white/15">-</button>
                    <strong>{quantity}</strong>
                    <button onClick={() => add(product)} className="grid h-10 w-10 place-items-center rounded-full bg-cyan-200 text-slate-950">+</button>
                  </div>
                </div>
              )) : <p className="rounded-2xl bg-white/10 p-5 text-slate-300">Your cart is empty.</p>}
            </div>
          </GlassCard>

          <GlassCard className="h-fit p-6">
            <h2 className="text-3xl font-semibold">Order total</h2>
            <div className="mt-5 grid gap-3 text-slate-300">
              <div className="flex justify-between"><span>Subtotal</span><strong className="text-white">Rs {subtotal.toLocaleString("en-IN")}</strong></div>
              <div className="flex justify-between"><span>Delivery</span><strong className="text-white">Rs {delivery}</strong></div>
              <div className="flex justify-between border-t border-white/15 pt-4 text-xl"><span>Total</span><strong className="text-white">Rs {(subtotal + delivery).toLocaleString("en-IN")}</strong></div>
            </div>
            <div className="group relative mt-6">
              <button disabled={!items.length} className="min-h-12 w-full rounded-full bg-cyan-200 font-bold text-slate-950 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300">Proceed to Checkout</button>
              {!items.length && <span className="pointer-events-none absolute -top-11 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-xl bg-white px-3 py-2 text-xs font-semibold text-slate-950 shadow-xl group-hover:block">Cart is empty</span>}
            </div>
          </GlassCard>
        </div>
      )}
    </main>
  );
}
