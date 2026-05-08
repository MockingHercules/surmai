import PageHero from "../components/PageHero.jsx";
import { GlassCard } from "../components/GlassCard.jsx";
import { markets, mumbaiRoute, todayCatch } from "../data/markets.js";

export default function Markets() {
  return (
    <>
      <PageHero
        eyebrow="Mumbai market intelligence"
        title="Find fresh seafood markets."
        copy="A Mumbai-only market guide with timings, trusted buying windows, vendor lanes and direct Google Maps guidance for each stop."
        image="https://commons.wikimedia.org/wiki/Special:FilePath/%27Fish%20Auction%27%20at%20Sassoon%20Docks%20in%20Mumbai..JPG"
      />

      <main className="page-shell">
        <section className="mb-8 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-cyan-200/20 bg-cyan-200/10 p-6 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[.12em] text-cyan-200">Today's fresh catch</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {todayCatch.map((item) => (
                <span key={item} className="rounded-full bg-white/10 px-5 py-3 text-white shadow-inner shadow-white/5">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[.12em] text-cyan-200">How to use this guide</p>
            <p className="mt-3 text-slate-300">
              Tap "Get directions" on any market card to open Google Maps from your current location. Go early for auction-style markets and check prices before cleaning or cutting.
            </p>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          {markets.map((market, index) => (
            <GlassCard key={market.name} className="group overflow-hidden">
              <div className="relative h-72 overflow-hidden">
                <img src={market.image} alt={market.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/78 via-slate-950/10 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-slate-950/55 px-4 py-2 text-xs font-bold uppercase text-cyan-100 backdrop-blur-xl">
                  Stop {index + 1}
                </span>
                <span className="absolute bottom-5 left-5 rounded-full bg-white/15 px-4 py-2 text-xs text-white/85 backdrop-blur-xl">
                  {market.imageNote}
                </span>
              </div>

              <div className="p-6">
                <p className="text-sm uppercase tracking-[.12em] text-cyan-200">{market.location}</p>
                <h3 className="mt-2 text-3xl font-semibold">{market.name}</h3>
                <p className="mt-3 text-slate-300">{market.address}</p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs uppercase text-cyan-200">Timing</p>
                    <strong className="mt-2 block text-white">{market.timing}</strong>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs uppercase text-cyan-200">Best time</p>
                    <strong className="mt-2 block text-white">{market.bestTime}</strong>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs uppercase text-cyan-200">Popular catch</p>
                    <strong className="mt-2 block text-white">{market.catch}</strong>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {market.vendors.map((vendor) => (
                    <div key={vendor} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                      <strong>{vendor}</strong>
                      <p className="mt-1 text-sm text-slate-300">Market lane to check first</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={market.directionsUrl} target="_blank" rel="noreferrer" className="rounded-full bg-cyan-200 px-5 py-3 font-bold text-slate-950 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-200/20">
                    Get directions
                  </a>
                  <a href={market.mapUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/20 bg-white/10 px-5 py-3 font-semibold text-white transition hover:-translate-y-1 hover:bg-white/15">
                    View on Google Maps
                  </a>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="grid gap-0 lg:grid-cols-[.85fr_1.15fr]">
            <div className="p-8">
              <p className="text-sm uppercase tracking-[.12em] text-cyan-200">Mumbai market map</p>
              <h2 className="mt-3 text-4xl font-semibold">{mumbaiRoute.title}</h2>
              <p className="mt-3 text-slate-300">{mumbaiRoute.summary}</p>

              <ol className="mt-6 grid gap-3">
                {markets.map((market, index) => (
                  <li key={market.name} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cyan-200 font-bold text-slate-950">{index + 1}</span>
                    <div>
                      <strong>{market.name}</strong>
                      <p className="text-sm text-slate-300">{market.location} / {market.bestTime}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <a href={mumbaiRoute.directionsUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-full bg-white px-6 py-4 font-bold text-slate-950 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/10">
                Open full route in Google Maps
              </a>
            </div>

            <iframe
              title="Mumbai fish markets map"
              src={mumbaiRoute.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[520px] w-full border-0 grayscale-[.15] invert-0"
            />
          </div>
        </section>
      </main>
    </>
  );
}
