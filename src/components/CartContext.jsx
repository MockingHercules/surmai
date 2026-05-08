import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);
export function CartProvider({ children }) {
  const [items, setItems] = useState({});
  const [open, setOpen] = useState(false);
  const add = (product) => setItems((current) => ({ ...current, [product.id]: { product, quantity: (current[product.id]?.quantity || 0) + 1 } }));
  const remove = (id) => setItems((current) => { const next = { ...current }; if (!next[id]) return next; next[id].quantity -= 1; if (next[id].quantity <= 0) delete next[id]; return next; });
  const clear = () => setItems({});
  const list = Object.values(items);
  const count = list.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = list.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const value = useMemo(() => ({ items: list, count, subtotal, add, remove, clear, open, setOpen }), [items, count, subtotal, open]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export const useCart = () => useContext(CartContext);