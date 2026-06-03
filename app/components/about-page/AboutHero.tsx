import Image from "next/image";

export default function AboutHero() {
  return (
    <section
      id="who-we-are"
      className="relative isolate w-full overflow-hidden text-slate-50"
    >
      <Image
        src="/about/image-14-3.png"
        alt="Searcher Properties leadership"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Layered overlay to lift legibility and match the design */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(15,23,42,0.15)_0%,_rgba(0,0,0,0.55)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1280px] flex-col items-center justify-center px-6 pt-44 pb-40 text-center sm:min-h-[110vh] sm:px-10 sm:pt-60 sm:pb-52 lg:min-h-[120vh] lg:px-16 lg:pt-72 lg:pb-64">
        <h1
          className="animate-rise-in font-sans text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[80px] xl:leading-[1.05]"
          style={{ animationDelay: "120ms" }}
        >
          <span className="text-white/95">Who We</span>{" "}
          <span className="text-brand-teal">Are</span>
        </h1>
        <p
          className="animate-rise-in mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg lg:mt-8 lg:text-xl lg:leading-9"
          style={{ animationDelay: "280ms" }}
        >
          Searcher Properties is a trusted real estate company focused on
          delivering premium developments and smart property investments
          across Lagos and beyond.
        </p>
      </div>
    </section>
  );
}
