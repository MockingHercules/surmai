export function GlassCard({ children, className = "" }) {
  return <div className={`rounded-3xl border border-white/15 bg-white/10 shadow-2xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/15 ${className}`}>{children}</div>;
}