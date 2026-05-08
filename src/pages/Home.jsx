import { Link } from "react-router-dom";

// First landing image: the large Surmai fish hero behind the title.
const surmaiHeroImage = "https://commons.wikimedia.org/wiki/Special:FilePath/Surmai%20Fish.JPG";

// Secondary image used only behind the kitchen-notes slider section.
const landingSeafoodImage = "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=2400&q=90";

const notes = [
  {
    title: "Buy with your senses",
    copy: "Clear eyes, firm flesh, red gills, and a clean sea smell are the fastest quality checks before you cook.",
  },
  {
    title: "Match cut to technique",
    copy: "Surmai steaks love tawa heat, prawns need quick cooking, crab rewards slow masala, and clams shine in sukka.",
  },
  {
    title: "Respect the monsoon",
    copy: "Choose smaller daily catch and verified vendors during rough weather months, when supply changes quickly.",
  },
  {
    title: "Keep big predators occasional",
    copy: "Larger predator fish can carry more mercury. Mix in sardines, mackerel, anchovies, and freshwater carp.",
  },
  {
    title: "Cook clean and cold",
    copy: "Keep seafood chilled until cooking, pat it dry before frying, and salt close to the pan for cleaner texture.",
  },
];

const duplicatedNotes = [...notes, ...notes];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#071a1f] text-white">
      {/* First screen: Surmai brand hero with the fish image behind the title. */}
      <section className="relative isolate min-h-screen overflow-hidden px-5 pb-20 pt-32 md:px-10 md:pt-36">
        <img
          src={surmaiHeroImage}
          alt="Surmai fish"
          className="absolute inset-0 -z-30 h-full w-full scale-110 object-cover object-center opacity-70 grayscale"
        />
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_58%_38%,rgba(221,236,232,.18),transparent_25%),linear-gradient(90deg,rgba(3,17,20,.97),rgba(7,27,31,.68)_48%,rgba(3,17,20,.92))]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,17,20,.1),rgba(3,17,20,.46)_62%,#071a1f)]" />

        <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-end gap-8 lg:grid-cols-[1fr_360px]">
          <div className="pb-4">
            <p className="mb-5 text-xs font-bold uppercase tracking-[.12em] text-cyan-100 drop-shadow-lg">
              Coastal plates, river classics, market wisdom
            </p>
            <h1 className="font-display text-[clamp(6rem,20vw,17rem)] leading-[.72] tracking-normal text-white drop-shadow-2xl">
              surmai
            </h1>
            <p className="mt-8 max-w-3xl text-xl leading-8 text-white md:text-2xl">
              A refined guide to Indian seafood cuisine, from mustard-rich Hilsa and banana-leaf Karimeen to Goan prawns, crab xec xec, squid ghee roast, clams, mussels, and surmai.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/dishes" className="rounded-full bg-white px-7 py-4 font-bold text-slate-950 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/20">
                Explore dishes
              </Link>
              <Link to="/season" className="rounded-full border border-white/35 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/20">
                Check seasonality
              </Link>
            </div>
          </div>

          <aside className="mb-12 rounded-xl border border-white/30 bg-white/10 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl lg:mb-16">
            <p className="text-xs font-bold uppercase text-white/80">Featured catch</p>
            <h2 className="mt-3 text-2xl font-semibold">Surmai Tawa Fry</h2>
            <p className="mt-4 text-sm leading-6 text-white/85">
              Firm kingfish steaks, chilli, turmeric, kokum, and a hard sear on a cast-iron tawa.
            </p>
          </aside>
        </div>
      </section>

      {/* Infinite slider inspired by the shared seafood-image reference. */}
      <section className="notes-section relative isolate min-h-[84vh] overflow-hidden px-5 py-20 md:px-10 md:py-28">
        <img
          src={landingSeafoodImage}
          alt="Seafood background"
          className="absolute inset-0 -z-30 h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(2,16,19,.92),rgba(8,18,20,.56)_42%,rgba(2,16,19,.86)),radial-gradient(circle_at_52%_32%,rgba(255,255,255,.14),transparent_26%)]" />
        <div className="absolute inset-0 -z-10 bg-black/20 backdrop-blur-[1px]" />

        <div className="mx-auto max-w-7xl md:grid md:grid-cols-[.7fr_1.3fr] md:items-start md:gap-10">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-white/90">Kitchen notes</p>
          <div>
            <h2 className="max-w-5xl font-display text-6xl leading-[.92] text-white drop-shadow-2xl md:text-8xl">
              Small choices that make seafood taste professional.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
              A quick moving guide for buying, cutting, seasoning, and cooking seafood with confidence.
            </p>
          </div>
        </div>

        <div className="notes-shell mx-auto mt-14 max-w-[96rem] overflow-hidden p-1">
          <div className="notes-grid flex w-max gap-5" aria-label="Scrolling kitchen notes">
            {duplicatedNotes.map((note, index) => (
              <article key={`${note.title}-${index}`} tabIndex="0" className="note-card group w-[78vw] max-w-[390px] shrink-0 rounded-[1.4rem] border border-white/25 bg-white/18 p-6 text-white shadow-2xl shadow-black/25 backdrop-blur-2xl transition duration-500 focus:outline-none sm:w-[390px]">
                <h3 className="text-2xl font-bold drop-shadow-lg">{note.title}</h3>
                <p className="mt-5 text-base leading-7 text-white/76">{note.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
