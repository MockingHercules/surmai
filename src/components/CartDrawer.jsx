import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import { useCart } from "./CartContext.jsx";

const formatMoney = (value) => `Rs ${value.toLocaleString("en-IN")}`;

export default function CartDrawer() {
  const { isAuthenticated, openAuth } = useAuth();
  const { items, subtotal, remove, add, removeAll, clear, open, setOpen } = useCart();
  const [payment, setPayment] = useState("Debit card");
  const [status, setStatus] = useState("");
  const delivery = items.length ? 29 : 0;
  const total = subtotal + delivery;

  return (
    <aside className={`fixed inset-0 z-[70] bg-slate-950/55 transition ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setOpen(false)}>
      <div className={`ml-auto flex h-full w-full max-w-md flex-col gap-5 overflow-auto border-l border-white/10 bg-slate-950 p-5 text-white shadow-2xl transition sm:p-6 ${open ? "translate-x-0" : "translate-x-full"}`} onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.14em] text-cyan-200">Surmai basket</p>
            <h2 className="mt-1 text-3xl font-semibold">Your seafood order</h2>
          </div>
          <button className="rounded-full border border-white/20 px-3 py-2 transition hover:bg-white/10" onClick={() => setOpen(false)}>Close</button>
        </div>

        {!isAuthenticated ? (
          <div className="grid flex-1 place-items-center rounded-3xl border border-white/15 bg-white/10 p-8 text-center">
            <div>
              <p className="text-5xl">Lock</p>
              <h3 className="mt-4 text-2xl font-semibold">Login to view your cart.</h3>
              <p className="mt-3 text-slate-300">Sign in and Surmai will restore your saved seafood basket automatically.</p>
              <button onClick={() => openAuth("signin", "cart")} className="mt-6 rounded-full bg-cyan-200 px-6 py-3 font-bold text-slate-950 transition hover:-translate-y-1">Login Now</button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-3">
              {items.length ? items.map(({ product, quantity }) => {
                const lineTotal = product.price * quantity;
                return (
                  <div key={product.id} className="grid grid-cols-[64px_1fr] gap-3 rounded-2xl border border-white/10 bg-white/10 p-3">
                    <img src={product.image} alt={product.name} className="h-16 w-16 rounded-xl object-cover" />
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <strong>{product.name}</strong>
                          <p className="text-sm text-slate-400">{formatMoney(product.price)} / {product.unit}</p>
                        </div>
                        <strong className="text-cyan-100">{formatMoney(lineTotal)}</strong>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 p-1">
                          <button onClick={() => remove(product.id)} className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white">-</button>
                          <span className="min-w-6 text-center font-bold">{quantity}</span>
                          <button onClick={() => add(product)} className="grid h-8 w-8 place-items-center rounded-full bg-cyan-200 text-slate-950">+</button>
                        </div>
                        <button onClick={() => removeAll(product.id)} className="text-xs font-semibold text-red-200 hover:text-red-100">Remove</button>
                      </div>
                    </div>
                  </div>
                );
              }) : <p className="rounded-2xl bg-white/10 p-5 text-slate-300">Your cart is empty. Add seafood from the Shop page.</p>}
            </div>

            <div className="mt-auto rounded-3xl border border-white/10 bg-white/10 p-5">
              <div className="flex justify-between"><span>Subtotal</span><strong>{formatMoney(subtotal)}</strong></div>
              <div className="mt-2 flex justify-between"><span>Delivery</span><strong>{formatMoney(delivery)}</strong></div>
              <div className="mt-3 flex justify-between border-t border-white/15 pt-3 text-xl"><span>Total</span><strong>{formatMoney(total)}</strong></div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-[.14em] text-cyan-200">Payment</p>
              <div className="flex flex-wrap gap-2">
                {["Debit card", "GPay", "PhonePe"].map((method) => <button key={method} onClick={() => setPayment(method)} className={`rounded-full px-4 py-2 ${payment === method ? "bg-cyan-200 text-slate-950" : "bg-white/15 text-white"}`}>{method}</button>)}
              </div>
              <input className="mt-4 min-h-11 w-full rounded-xl border border-white/15 bg-white px-3 text-slate-950" value={payment === "Debit card" ? "4111 1111 1111 1111" : "demo@upi"} readOnly />
            </div>

            <div className="grid gap-3">
              <Link to="/cart" onClick={() => setOpen(false)} className="min-h-12 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-center font-bold transition hover:-translate-y-1 hover:bg-white/15">
                Open full cart
              </Link>
              <div className="group relative">
                <button disabled={!items.length} className="min-h-12 w-full rounded-full bg-cyan-200 font-semibold text-slate-950 transition disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300" onClick={() => { if (!items.length) return; setStatus(`Order placed with ${payment}. Your seafood will be delivered soon.`); clear(); }}>
                  Proceed to Checkout
                </button>
                {!items.length && <span className="pointer-events-none absolute -top-11 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-xl bg-white px-3 py-2 text-xs font-semibold text-slate-950 shadow-xl group-hover:block">Add items before checkout</span>}
              </div>
            </div>
            {status && <p className="rounded-2xl bg-cyan-100 p-4 text-slate-950">{status}</p>}
          </>
        )}
      </div>
    </aside>
  );
}
