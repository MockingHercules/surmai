import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import AuthModal from "./components/AuthModal.jsx";
import { AuthProvider, useAuth } from "./components/AuthContext.jsx";
import { CartProvider, useCart } from "./components/CartContext.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Markets from "./pages/Markets.jsx";
import Dishes from "./pages/Dishes.jsx";
import Restaurants from "./pages/Restaurants.jsx";
import Season from "./pages/Season.jsx";
import Dashboard, { ProtectedRoute } from "./pages/Dashboard.jsx";

function Toast() {
  const { toast } = useAuth();
  if (!toast) return null;
  return <div className="fixed bottom-6 right-6 z-[100] rounded-2xl bg-white px-5 py-4 font-semibold text-slate-950 shadow-2xl shadow-black/25">{toast}</div>;
}

function Shell() {
  const { count, setOpen } = useCart();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => setLoading(false), 380);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => clearTimeout(id);
  }, [location.pathname]);

  return <div className="min-h-screen bg-slate-950 text-white transition-colors">
    <LoadingScreen loading={loading} />
    <Navbar cartCount={count} onCartOpen={() => setOpen(true)} />
    <div className="animate-pageFade">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/dishes" element={<Dishes />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/season" element={<Season />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
    <Footer />
    <CartDrawer />
    <AuthModal />
    <Toast />
  </div>;
}

export default function App() {
  return <CartProvider><AuthProvider><Shell /></AuthProvider></CartProvider>;
}
