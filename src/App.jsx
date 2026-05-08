import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import { CartProvider, useCart } from "./components/CartContext.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Markets from "./pages/Markets.jsx";
import Dishes from "./pages/Dishes.jsx";
import Restaurants from "./pages/Restaurants.jsx";
import Season from "./pages/Season.jsx";

function Shell() {
  const { count, setOpen } = useCart();
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => setLoading(false), 380);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => clearTimeout(id);
  }, [location.pathname]);

  return <div className="min-h-screen bg-slate-950 text-white transition-colors dark:bg-slate-950">
    <LoadingScreen loading={loading} />
    <Navbar cartCount={count} onCartOpen={() => setOpen(true)} darkMode={darkMode} setDarkMode={setDarkMode} />
    <div className="animate-pageFade">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/dishes" element={<Dishes />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/season" element={<Season />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
    <Footer />
    <CartDrawer />
  </div>;
}

export default function App() {
  return <CartProvider><Shell /></CartProvider>;
}
