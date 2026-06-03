import Image from "next/image";

export default function ContactHero() {
  return (
    <section
      id="get-in-touch"
      className="relative isolate w-full overflow-hidden text-slate-50"
    >
      <Image
        src="/contact-assets/image-16-2.png"
        alt="Person holding phone over laptop — contact Searcher Properties"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Layered overlay for legibility on the photo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(15,23,42,0.15)_0%,_rgba(0,0,0,0.55)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[380px] max-w-[1280px] flex-col items-center justify-center px-6 pt-32 pb-16 text-center sm:min-h-[440px] sm:px-10 sm:pt-36 sm:pb-20 lg:min-h-[520px] lg:px-16 lg:pt-40 lg:pb-24">
        <h1
          className="animate-rise-in font-sans text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[72px] xl:leading-[1.05]"
          style={{ animationDelay: "120ms" }}
        >
          <span className="text-white/95">Get In</span>{" "}
          <span className="text-brand-teal">Touch</span>
        </h1>
        <p
          className="animate-rise-in mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/80 sm:mt-6 sm:text-base lg:text-lg lg:leading-8"
          style={{ animationDelay: "280ms" }}
        >
          Have questions about our properties? We&rsquo;re here to help your
          dream home or perfect investment opportunity.
        </p>
      </div>
    </section>
  );
}
