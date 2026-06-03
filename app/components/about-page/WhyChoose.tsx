import Reveal from "../Reveal";

const REASONS = [
  "Premium quality construction",
  "Strategic locations across Lagos",
  "Transparent pricing and processes",
  "Flexible payment plans",
  "Dedicated customer support",
  "Proven track record",
];

export default function WhyChoose() {
  return (
    <section className="bg-cream px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal variant="fade-up" className="text-center">
          <h2 className="text-3xl font-medium leading-tight text-slate-900 sm:text-4xl lg:text-5xl xl:text-[56px] xl:leading-[1.1]">
            Why Choose Searcher Properties
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-black/70 sm:text-lg lg:text-xl lg:leading-9">
            We don&apos;t just build properties—we create homes that inspire
            and investments that deliver exceptional returns.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {REASONS.map((reason, idx) => (
            <Reveal key={reason} variant="fade-up" delay={idx * 80}>
              <article className="group flex h-full items-center gap-4 rounded-[28px] border border-cream bg-slate-900/90 px-6 py-5 text-white shadow-sm shadow-black/10 transition-all hover:-translate-y-1 hover:bg-slate-900 hover:shadow-lg hover:shadow-brand/20 sm:px-7 sm:py-6">
                <span
                  aria-hidden
                  className="grid h-3 w-3 shrink-0 place-items-center rounded-full bg-brand sm:h-3.5 sm:w-3.5"
                />
                <p className="text-base font-normal leading-snug text-white/95 sm:text-lg">
                  {reason}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
