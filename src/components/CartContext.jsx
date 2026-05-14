import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext(null);
const GUEST_CART_KEY = "surmai_cart_guest";
const guestWishlistKey = "surmai_wishlist_guest";

const cartKeyFor = (user) => user?.email ? `surmai_cart_${user.email}` : GUEST_CART_KEY;
const wishlistKeyFor = (user) => user?.email ? `surmai_wishlist_${user.email}` : guestWishlistKey;

function readStored(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
}

function writeStored(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function mergeItems(base, incoming) {
  const next = { ...base };
  Object.values(incoming || {}).forEach(({ product, quantity }) => {
    if (!product?.id) return;
    next[product.id] = {
      product,
      quantity: (next[product.id]?.quantity || 0) + (quantity || 1),
    };
  });
  return next;
}

export function CartProvider({ children }) {
  const { user, isAuthenticated, openAuth, setToast, firstName } = useAuth();
  const [items, setItems] = useState({});
  const [wishlist, setWishlist] = useState({});
  const [pendingProduct, setPendingProduct] = useState(null);
  const [blockedProductId, setBlockedProductId] = useState("");
  const [open, setOpen] = useState(false);
  const [badgePulse, setBadgePulse] = useState(false);

  useEffect(() => {
    if (user?.email) {
      const userCartKey = cartKeyFor(user);
      const userWishlistKey = wishlistKeyFor(user);
      const savedCart = readStored(userCartKey);
      const guestCart = readStored(GUEST_CART_KEY);
      const mergedCart = mergeItems(savedCart, guestCart);
      writeStored(userCartKey, mergedCart);
      localStorage.removeItem(GUEST_CART_KEY);
      setItems(mergedCart);

      const savedWishlist = readStored(userWishlistKey);
      const guestWishlist = readStored(guestWishlistKey);
      const mergedWishlist = { ...savedWishlist, ...guestWishlist };
      writeStored(userWishlistKey, mergedWishlist);
      localStorage.removeItem(guestWishlistKey);
      setWishlist(mergedWishlist);
      return;
    }

    setItems({});
    setWishlist({});
  }, [user?.email]);

  useEffect(() => {
    if (!user?.email) return;
    writeStored(cartKeyFor(user), items);
  }, [items, user?.email]);

  useEffect(() => {
    if (!user?.email) return;
    writeStored(wishlistKeyFor(user), wishlist);
  }, [wishlist, user?.email]);

  useEffect(() => {
    if (!isAuthenticated || !pendingProduct) return;
    add(pendingProduct, { silent: true });
    setPendingProduct(null);
    setOpen(true);
    setToast(`Item added! Welcome, ${firstName} 👋`);
  }, [isAuthenticated, pendingProduct, firstName]);

  const pulseBadge = () => {
    setBadgePulse(false);
    requestAnimationFrame(() => setBadgePulse(true));
    setTimeout(() => setBadgePulse(false), 520);
  };

  const gateCart = (product) => {
    const guestCart = readStored(GUEST_CART_KEY);
    const nextGuest = mergeItems(guestCart, { [product.id]: { product, quantity: 1 } });
    writeStored(GUEST_CART_KEY, nextGuest);
    setPendingProduct(product);
    setBlockedProductId(product.id);
    setToast("Please login to add items to your cart 🔒");
    setTimeout(() => openAuth("signin", "cart"), 1500);
    setTimeout(() => setBlockedProductId(""), 900);
  };

  const add = (product, options = {}) => {
    if (!isAuthenticated) {
      gateCart(product);
      return false;
    }

    setItems((current) => ({
      ...current,
      [product.id]: {
        product,
        quantity: (current[product.id]?.quantity || 0) + 1,
      },
    }));
    pulseBadge();
    if (!options.silent) setToast("Added to cart! 🛒");
    return true;
  };

  const remove = (id) => setItems((current) => {
    const next = { ...current };
    if (!next[id]) return next;
    next[id].quantity -= 1;
    if (next[id].quantity <= 0) delete next[id];
    return next;
  });

  const removeAll = (id) => setItems((current) => {
    const next = { ...current };
    delete next[id];
    return next;
  });

  const clear = () => setItems({});

  const toggleWishlist = (product) => {
    if (!isAuthenticated) {
      setToast("Please login to save items to your wishlist 🔒");
      setBlockedProductId(product.id);
      const currentGuest = readStored(guestWishlistKey);
      writeStored(guestWishlistKey, { ...currentGuest, [product.id]: product });
      setTimeout(() => openAuth("signin", "wishlist"), 1500);
      setTimeout(() => setBlockedProductId(""), 900);
      return false;
    }

    setWishlist((current) => {
      const next = { ...current };
      if (next[product.id]) delete next[product.id];
      else next[product.id] = product;
      return next;
    });
    setToast(wishlist[product.id] ? "Removed from wishlist." : "Saved to wishlist ♥");
    return true;
  };

  const logoutCart = () => {
    setItems({});
    setWishlist({});
    setOpen(false);
  };

  const list = Object.values(items);
  const count = list.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = list.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const wishlistIds = Object.keys(wishlist);

  const value = useMemo(() => ({
    items: list,
    count,
    subtotal,
    add,
    remove,
    removeAll,
    clear,
    open,
    setOpen,
    blockedProductId,
    badgePulse,
    wishlistIds,
    toggleWishlist,
    logoutCart,
  }), [items, count, subtotal, open, blockedProductId, badgePulse, wishlistIds.join("|")]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
