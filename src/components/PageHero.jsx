export default function PageHero({ eyebrow, title, copy, image }) {
  return (
    <section className="relative isolate overflow-hidden px-5 pb-14 pt-32 sm:pt-36 md:px-10 md:pb-24">
      <img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-950/80 to-cyan-950/50" />
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[.12em] text-cyan-200 sm:mb-5 sm:text-sm">{eyebrow}</p>
        <h1 className="max-w-5xl font-display text-5xl leading-[0.95] text-white sm:text-6xl md:text-8xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8 md:mt-7">{copy}</p>
      </div>
    </section>
  );
}
