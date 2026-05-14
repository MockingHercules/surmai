import { useEffect } from "react";
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

const stats = [
  ["🐟", "50+ Varieties", "Of fresh Indian seafood"],
  ["🎣", "Local Fishermen", "Directly sourced, no middlemen"],
  ["📍", "Pan-India Delivery", "From coast to your city"],
  ["🍳", "Chef Approved", "Trusted by home cooks & pros"],
];

const duplicatedNotes = [...notes, ...notes];

export default function Home() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".about-reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="overflow-hidden bg-[#071a1f] text-white">
      {/* First screen: Surmai brand hero with the fish image behind the title. */}
      <section className="relative isolate min-h-screen overflow-hidden px-5 pb-16 pt-28 sm:pb-20 sm:pt-32 md:px-10 md:pt-36">
        <img
          src={surmaiHeroImage}
          alt="Surmai fish"
          className="absolute inset-0 -z-30 h-full w-full scale-110 object-cover object-center opacity-95 grayscale contrast-125 brightness-110"
        />
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_58%_36%,rgba(236,244,240,.24),transparent_24%),linear-gradient(90deg,rgba(7,24,27,.82),rgba(80,96,93,.42)_48%,rgba(7,22,25,.78))]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(210,221,216,.22),rgba(9,25,28,.28)_40%,rgba(7,26,31,.86))]" />

        <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-end gap-8 lg:grid-cols-[1fr_360px]">
          <div className="pb-4">
            <p className="mb-5 text-xs font-bold uppercase tracking-[.12em] text-cyan-100 drop-shadow-lg">
              Coastal plates, river classics, market wisdom
            </p>
            <h1 className="font-display text-[clamp(5.1rem,20vw,17rem)] leading-[.78] tracking-normal text-white drop-shadow-2xl sm:leading-[.72]">
              surmai
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-7 text-white sm:mt-8 sm:text-xl sm:leading-8 md:text-2xl">
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

          <aside className="mb-12 rounded-xl border border-white/35 bg-white/12 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl lg:mb-16">
            <p className="text-xs font-bold uppercase text-white/80">Featured catch</p>
            <h2 className="mt-3 text-2xl font-semibold">Surmai Tawa Fry</h2>
            <p className="mt-4 text-sm leading-6 text-white/85">
              Firm kingfish steaks, chilli, turmeric, kokum, and a hard sear on a cast-iron tawa.
            </p>
          </aside>
        </div>
      </section>

      {/* About section: video-backed story block between hero and kitchen notes. */}
      <section className="relative isolate flex min-h-[100vh] items-center overflow-hidden bg-[#071a1f] px-5 py-20 md:min-h-[85vh] md:px-10 md:py-24">
        <video
          className="absolute inset-0 -z-30 h-full w-full object-cover"
          src="/videos/fish-fry.mp4"
          poster="/images/about-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 -z-20 bg-black/[.62]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_22%,rgba(45,212,191,.18),transparent_24%),linear-gradient(180deg,rgba(7,26,31,.18),rgba(7,26,31,.82))]" />

        <div className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-[1.05fr_.95fr]">
            <div>
              <p className="about-reveal text-sm font-bold uppercase tracking-[.15em] text-teal-300/85">Who we are</p>
              <h2 className="about-reveal mt-5 max-w-3xl font-display text-5xl leading-[.95] text-white sm:text-6xl sm:leading-[.9] md:text-8xl">
                Fresh from the sea. Straight to your kitchen.
              </h2>
              <div className="mt-7 grid gap-4 text-base leading-7 text-slate-300 sm:mt-8 sm:gap-5 sm:text-lg sm:leading-8">
                <p className="about-reveal">
                  Surmai is built for home cooks and professional chefs who refuse to compromise on quality. We connect you directly to the freshest catch, sourced from local Indian fishing communities along the coast.
                </p>
                <p className="about-reveal">
                  Every fish you find here has a story. A fisherman who woke before dawn. A boat that went out before the tide. We make sure that journey ends at your tawa, not a cold storage warehouse.
                </p>
                <p className="about-reveal rounded-3xl border border-teal-300/25 bg-teal-300/10 p-5 text-teal-100 backdrop-blur-xl">
                  We proudly support local fishermen and coastal livelihoods. When you shop on Surmai, you're not just buying seafood, you're sustaining a way of life.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map(([icon, title, copy], index) => (
                <article key={title} className="about-reveal rounded-3xl border border-white/20 bg-white/10 p-4 shadow-2xl shadow-black/20 backdrop-blur-[10px] sm:p-5 md:p-6" style={{ transitionDelay: `${index * 100}ms` }}>
                  <p className="text-3xl">{icon}</p>
                  <h3 className="mt-4 text-lg font-semibold leading-tight text-white sm:text-2xl">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="about-reveal mx-auto mt-12 max-w-3xl text-center sm:mt-16">
            <h3 className="text-3xl font-semibold text-white sm:text-4xl md:text-5xl">Explore what the sea has to offer</h3>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              From Surmai to prawns, Hilsa to crab, find it all in one place.
            </p>
            <Link to="/shop" className="about-cta-pulse mt-8 inline-flex w-full justify-center rounded-full bg-white px-8 py-4 text-lg font-bold text-slate-950 transition hover:scale-105 hover:shadow-2xl hover:shadow-cyan-300/30 sm:w-auto">
              Shop Fresh Seafood →
            </Link>
          </div>
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
            <h2 className="max-w-5xl font-display text-5xl leading-[.96] text-white drop-shadow-2xl sm:text-6xl sm:leading-[.92] md:text-8xl">
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


