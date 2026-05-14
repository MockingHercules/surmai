import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext.jsx";
import { useCart } from "../components/CartContext.jsx";
import { GlassCard } from "../components/GlassCard.jsx";

const formatMoney = (value) => `Rs ${value.toLocaleString("en-IN")}`;

export default function CartPage() {
  const { isAuthenticated, openAuth } = useAuth();
  const { items, subtotal, remove, add, removeAll, clear } = useCart();
  const delivery = items.length ? 29 : 0;
  const total = subtotal + delivery;

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-slate-950 px-5 pb-16 pt-32 text-white md:px-10 md:pt-36">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_12%,rgba(139,246,236,.18),transparent_28%),radial-gradient(circle_at_86%_10%,rgba(255,255,255,.12),transparent_24%),linear-gradient(135deg,#07111f,#0b2030_45%,#041017)]" />
      <div className="mx-auto max-w-7xl">
        <section className="mb-10 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-cyan-200">Surmai checkout</p>
          <h1 className="mt-4 font-display text-5xl leading-[.92] sm:text-6xl md:text-8xl">Fresh seafood basket.</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Review your catch, adjust quantities, and place a presentation-ready seafood order with smooth cart persistence.
          </p>
        </section>

        {!isAuthenticated ? (
          <GlassCard className="grid min-h-[420px] place-items-center p-8 text-center">
            <div className="max-w-xl">
              <p className="text-6xl">Lock</p>
              <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">Login to view your cart.</h2>
              <p className="mt-3 text-slate-300">Your seafood basket is protected and restores automatically after you sign in.</p>
              <button onClick={() => openAuth("signin", "cart")} className="mt-6 rounded-full bg-cyan-200 px-7 py-4 font-bold text-slate-950 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-300/20">Login Now</button>
            </div>
          </GlassCard>
        ) : (
          <section className="grid gap-6 lg:grid-cols-[1fr_390px]">
            <GlassCard className="overflow-hidden">
              <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.14em] text-cyan-200">Your cart</p>
                  <h2 className="mt-2 text-3xl font-semibold">Seafood order</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link to="/shop" className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold transition hover:-translate-y-1 hover:bg-white/15">Continue shopping</Link>
                  <button onClick={clear} disabled={!items.length} className="rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300">Clear cart</button>
                </div>
              </div>

              <div className="grid gap-4 p-5 md:p-6">
                {items.length ? items.map(({ product, quantity }) => {
                  const lineTotal = product.price * quantity;
                  return (
                    <article key={product.id} className="grid gap-4 rounded-[1.6rem] border border-white/10 bg-white/10 p-4 transition hover:-translate-y-1 hover:border-cyan-200/40 hover:bg-white/15 sm:grid-cols-[104px_1fr] md:grid-cols-[112px_1fr_auto] md:items-center">
                      <img src={product.image} alt={product.name} className="h-28 w-full rounded-2xl object-cover sm:h-26 sm:w-26 md:h-28 md:w-28" />

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[.12em] text-cyan-200">{product.category} / {product.unit}</p>
                        <h3 className="mt-2 text-2xl font-semibold">{product.name}</h3>
                        <p className="mt-2 text-slate-300">{formatMoney(product.price)} each</p>
                        <button onClick={() => removeAll(product.id)} className="mt-3 text-sm font-bold text-red-200 transition hover:text-red-100">Remove item</button>
                      </div>

                      <div className="grid gap-3 md:min-w-44 md:justify-items-end">
                        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 p-1">
                          <button onClick={() => remove(product.id)} className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-lg font-black transition hover:bg-white/25" aria-label={`Decrease ${product.name}`}>-</button>
                          <strong className="min-w-8 text-center">{quantity}</strong>
                          <button onClick={() => add(product)} className="grid h-10 w-10 place-items-center rounded-full bg-cyan-200 text-lg font-black text-slate-950 transition hover:scale-105" aria-label={`Increase ${product.name}`}>+</button>
                        </div>
                        <div className="rounded-2xl bg-cyan-200/10 px-4 py-3 text-left md:text-right">
                          <p className="text-xs uppercase tracking-[.12em] text-cyan-200">Item subtotal</p>
                          <strong className="text-xl text-white">{formatMoney(lineTotal)}</strong>
                        </div>
                      </div>
                    </article>
                  );
                }) : (
                  <div className="grid min-h-[300px] place-items-center rounded-[1.6rem] border border-dashed border-white/20 bg-white/5 p-8 text-center">
                    <div>
                      <p className="text-5xl">Cart</p>
                      <h3 className="mt-4 text-2xl font-semibold">Your cart is empty.</h3>
                      <p className="mt-2 text-slate-300">Add fresh fish, prawns, crab, or shellfish from the shop.</p>
                      <Link to="/shop" className="mt-6 inline-flex rounded-full bg-cyan-200 px-6 py-3 font-bold text-slate-950 transition hover:-translate-y-1">Shop seafood</Link>
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <GlassCard className="p-6">
                <p className="text-xs font-bold uppercase tracking-[.14em] text-cyan-200">Order summary</p>
                <h2 className="mt-2 text-3xl font-semibold">Checkout total</h2>

                <div className="mt-6 grid gap-3 text-slate-300">
                  <div className="flex justify-between"><span>Subtotal</span><strong className="text-white">{formatMoney(subtotal)}</strong></div>
                  <div className="flex justify-between"><span>Delivery</span><strong className="text-white">{formatMoney(delivery)}</strong></div>
                  <div className="flex justify-between border-t border-white/15 pt-4 text-xl"><span>Total</span><strong className="text-white">{formatMoney(total)}</strong></div>
                </div>

                <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-4">
                  <p className="text-xs font-bold uppercase tracking-[.14em] text-cyan-200">Payment options</p>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm font-bold">
                    <span className="rounded-full bg-cyan-200 px-3 py-2 text-slate-950">Card</span>
                    <span className="rounded-full bg-white/10 px-3 py-2">GPay</span>
                    <span className="rounded-full bg-white/10 px-3 py-2">PhonePe</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-300">Presentation checkout only. No real payment is charged.</p>
                </div>

                <div className="group relative mt-6">
                  <button disabled={!items.length} className="min-h-13 w-full rounded-full bg-cyan-200 px-6 py-4 font-black text-slate-950 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-300/20 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300">
                    Proceed to Checkout
                  </button>
                  {!items.length && <span className="pointer-events-none absolute -top-11 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-xl bg-white px-3 py-2 text-xs font-semibold text-slate-950 shadow-xl group-hover:block">Add items before checkout</span>}
                </div>
              </GlassCard>
            </aside>
          </section>
        )}
      </div>
    </main>
  );
}
