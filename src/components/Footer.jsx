export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-5 py-10 text-white md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-5xl">surmai</p>
          <p className="mt-2 text-slate-400">Premium Indian seafood discovery platform.</p>
        </div>
        <div className="flex gap-3 text-sm text-cyan-100">
          <a href="#">Instagram</a><a href="#">YouTube</a><a href="#">X</a>
        </div>
      </div>
    </footer>
  );
}