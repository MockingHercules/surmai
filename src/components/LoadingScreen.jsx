import { useEffect } from "react";
export default function LoadingScreen({ loading }) {
  useEffect(() => {}, [loading]);
  if (!loading) return null;
  return <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950 text-white"><div className="h-16 w-16 animate-spin rounded-full border-2 border-cyan-200 border-t-transparent" /></div>;
}