export default function PropertiesHero() {
  return (
    <section
      id="all-properties"
      className="relative isolate w-full overflow-hidden bg-slate-900 text-slate-50"
    >
      {/* Soft accent glows so the dark hero feels alive, not flat */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(34,60,133,0.45)_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(20,184,166,0.18)_0%,_transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center justify-center px-6 pt-36 pb-20 text-center sm:px-10 sm:pt-44 sm:pb-24 lg:px-16 lg:pt-52 lg:pb-28">
        <h1
          className="animate-rise-in font-sans text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[80px] xl:leading-[1.05]"
          style={{ animationDelay: "120ms" }}
        >
          All <span className="text-brand-teal">Properties</span>
        </h1>
        <p
          className="animate-rise-in mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg lg:mt-8 lg:text-xl lg:leading-9"
          style={{ animationDelay: "280ms" }}
        >
          Explore our complete collection of luxury completed homes and
          investment opportunities.
        </p>
      </div>
    </section>
  );
}
