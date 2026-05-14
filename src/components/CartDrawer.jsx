import { useState } from "react";
import { useCart } from "./CartContext.jsx";

export default function CartDrawer() {
  const { items, subtotal, remove, add, clear, open, setOpen } = useCart();
  const [payment, setPayment] = useState("Debit card");
  const [status, setStatus] = useState("");
  const delivery = items.length ? 29 : 0;

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

        <div className="grid gap-3">
          {items.length ? items.map(({ product, quantity }) => (
            <div key={product.id} className="grid grid-cols-[64px_1fr_auto] items-center gap-3 rounded-2xl bg-white/10 p-3">
              <img src={product.image} alt={product.name} className="h-16 w-16 rounded-xl object-cover" />
              <div>
                <strong>{product.name}</strong>
                <p className="text-sm text-slate-400">Rs {product.price} / {product.unit}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => remove(product.id)} className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white">-</button>
                <span>{quantity}</span>
                <button onClick={() => add(product)} className="grid h-8 w-8 place-items-center rounded-full bg-cyan-200 text-slate-950">+</button>
              </div>
            </div>
          )) : <p className="rounded-2xl bg-white/10 p-5 text-slate-300">Add seafood to start your demo order.</p>}
        </div>

        <div className="rounded-3xl bg-white/10 p-5">
          <div className="flex justify-between"><span>Subtotal</span><strong>Rs {subtotal.toLocaleString("en-IN")}</strong></div>
          <div className="mt-2 flex justify-between"><span>Delivery</span><strong>Rs {delivery}</strong></div>
          <div className="mt-3 flex justify-between border-t border-white/15 pt-3 text-xl"><span>Total</span><strong>Rs {(subtotal + delivery).toLocaleString("en-IN")}</strong></div>
        </div>

        <div className="rounded-3xl bg-white/10 p-5">
          <p className="mb-3 text-xs uppercase text-cyan-200">Fake payment</p>
          <div className="flex flex-wrap gap-2">
            {["Debit card", "GPay", "PhonePe"].map((method) => <button key={method} onClick={() => setPayment(method)} className={`rounded-full px-4 py-2 ${payment === method ? "bg-cyan-200 text-slate-950" : "bg-white/15 text-white"}`}>{method}</button>)}
          </div>
          <input className="mt-4 min-h-11 w-full rounded-xl border border-white/15 bg-white px-3 text-slate-950" value={payment === "Debit card" ? "4111 1111 1111 1111" : "demo@upi"} readOnly />
        </div>

        <button className="min-h-12 rounded-full bg-cyan-200 font-semibold text-slate-950" onClick={() => { if (!items.length) return setStatus("Add at least one item before placing a demo order."); setStatus(`Order placed with ${payment}. Your seafood will be delivered soon.`); clear(); }}>Place demo order</button>
        {status && <p className="rounded-2xl bg-cyan-100 p-4 text-slate-950">{status}</p>}
      </div>
    </aside>
  );
}
