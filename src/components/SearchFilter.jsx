export default function SearchFilter({ search, setSearch, categories, active, setActive, placeholder = "Search" }) {
  return (
    <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
      <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={placeholder} className="min-h-12 flex-1 rounded-full border border-white/20 bg-white/90 px-5 text-slate-950 outline-none ring-cyan-200 transition focus:ring-4" />
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => <button key={category} onClick={() => setActive(category)} className={`rounded-full px-4 py-3 text-sm transition hover:-translate-y-0.5 ${active === category ? "bg-cyan-200 text-slate-950" : "bg-white/10 text-white"}`}>{category}</button>)}
      </div>
    </div>
  );
}