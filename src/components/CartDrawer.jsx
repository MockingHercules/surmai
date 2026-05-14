import { useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import { useCart } from "./CartContext.jsx";

export default function CartDrawer() {
  const { isAuthenticated, openAuth } = useAuth();
  const { items, subtotal, remove, add, removeAll, clear, open, setOpen } = useCart();
  const [payment, setPayment] = useState("Debit card");
  const [status, setStatus] = useState("");
  const delivery = items.length ? 29 : 0;
  const total = subtotal + delivery;

  return (
    <aside className={`fixed inset-0 z-[70] bg-slate-950/50 transition ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setOpen(false)}>
      <div className={`ml-auto flex h-full w-full max-w-md flex-col gap-5 overflow-auto bg-slate-950 p-6 text-white shadow-2xl transition ${open ? "translate-x-0" : "translate-x-full"}`} onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase text-cyan-200">Surmai basket</p>
            <h2 className="text-3xl font-semibold">Your seafood order</h2>
          </div>
          <button className="rounded-full border border-white/20 px-3 py-2 transition hover:bg-white/10" onClick={() => setOpen(false)}>Close</button>
        </div>

        {!isAuthenticated ? (
          <div className="grid flex-1 place-items-center rounded-3xl border border-white/15 bg-white/10 p-8 text-center">
            <div>
              <p className="text-5xl">🔒</p>
              <h3 className="mt-4 text-2xl font-semibold">You need to be logged in to view your cart.</h3>
              <p className="mt-3 text-slate-300">Sign in and Surmai will restore your saved cart automatically.</p>
              <button onClick={() => openAuth("signin", "cart")} className="mt-6 rounded-full bg-cyan-200 px-6 py-3 font-bold text-slate-950 transition hover:-translate-y-1">Login Now</button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-3">
              {items.length ? items.map(({ product, quantity }) => (
                <div key={product.id} className="grid grid-cols-[64px_1fr_auto] items-center gap-3 rounded-2xl bg-white/10 p-3">
                  <img src={product.image} alt={product.name} className="h-16 w-16 rounded-xl object-cover" />
                  <div>
                    <strong>{product.name}</strong>
                    <p className="text-sm text-slate-400">Rs {product.price} / {product.unit}</p>
                    <button onClick={() => removeAll(product.id)} className="mt-1 text-xs font-semibold text-red-200 hover:text-red-100">Remove</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => remove(product.id)} className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white">-</button>
                    <span>{quantity}</span>
                    <button onClick={() => add(product)} className="grid h-8 w-8 place-items-center rounded-full bg-cyan-200 text-slate-950">+</button>
                  </div>
                </div>
              )) : <p className="rounded-2xl bg-white/10 p-5 text-slate-300">Your cart is empty. Add seafood from the Shop page.</p>}
            </div>

            <div className="mt-auto rounded-3xl bg-white/10 p-5">
              <div className="flex justify-between"><span>Subtotal</span><strong>Rs {subtotal.toLocaleString("en-IN")}</strong></div>
              <div className="mt-2 flex justify-between"><span>Delivery</span><strong>Rs {delivery}</strong></div>
              <div className="mt-3 flex justify-between border-t border-white/15 pt-3 text-xl"><span>Total</span><strong>Rs {total.toLocaleString("en-IN")}</strong></div>
            </div>

            <div className="rounded-3xl bg-white/10 p-5">
              <p className="mb-3 text-xs uppercase text-cyan-200">Fake payment</p>
              <div className="flex flex-wrap gap-2">
                {["Debit card", "GPay", "PhonePe"].map((method) => <button key={method} onClick={() => setPayment(method)} className={`rounded-full px-4 py-2 ${payment === method ? "bg-cyan-200 text-slate-950" : "bg-white/15 text-white"}`}>{method}</button>)}
              </div>
              <input className="mt-4 min-h-11 w-full rounded-xl border border-white/15 bg-white px-3 text-slate-950" value={payment === "Debit card" ? "4111 1111 1111 1111" : "demo@upi"} readOnly />
            </div>

            <div className="group relative">
              <button disabled={!items.length} className="min-h-12 w-full rounded-full bg-cyan-200 font-semibold text-slate-950 transition disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300" onClick={() => { if (!items.length) return; setStatus(`Order placed with ${payment}. Your seafood will be delivered soon.`); clear(); }}>
                Proceed to Checkout
              </button>
              {!items.length && <span className="pointer-events-none absolute -top-11 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-xl bg-white px-3 py-2 text-xs font-semibold text-slate-950 shadow-xl group-hover:block">Add items before checkout</span>}
            </div>
            {status && <p className="rounded-2xl bg-cyan-100 p-4 text-slate-950">{status}</p>}
          </>
        )}
      </div>
    </aside>
  );
}
