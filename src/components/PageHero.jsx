export default function PageHero({ eyebrow, title, copy, image }) {
  return (
    <section className="relative isolate overflow-hidden px-5 pb-16 pt-36 md:px-10 md:pb-24">
      <img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-950/80 to-cyan-950/50" />
      <div className="mx-auto max-w-7xl">
        <p className="mb-5 text-sm font-bold uppercase text-cyan-200">{eyebrow}</p>
        <h1 className="max-w-5xl font-display text-6xl leading-[0.9] text-white md:text-8xl">{title}</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200">{copy}</p>
      </div>
    </section>
  );
}