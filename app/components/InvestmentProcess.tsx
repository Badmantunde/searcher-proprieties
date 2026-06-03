import Reveal from "./Reveal";

const STEPS = [
  {
    number: "01",
    title: "Browse Properties",
    description: "Explore our curated collection",
  },
  {
    number: "02",
    title: "Schedule Inspection",
    description: "Visit and experience the property",
  },
  {
    number: "03",
    title: "Make Payment",
    description: "Flexible payment options available",
  },
  {
    number: "04",
    title: "Receive Documentation",
    description: "Get all legal documents",
  },
];

export default function InvestmentProcess() {
  return (
    <section className="bg-white p-6 sm:p-10 lg:p-20">
      <div className="mx-auto max-w-[1280px]">
        <Reveal variant="fade-up" className="text-center">
          <h2 className="text-3xl font-medium text-slate-900 sm:text-4xl lg:text-5xl">
            Investment Process
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-700 sm:text-lg">
            Simple steps to owning your dream property
          </p>
        </Reveal>

        <div className="relative mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((step, idx) => (
            <Reveal
              key={step.number}
              variant="fade-up"
              delay={idx * 150}
              className="relative flex flex-col items-center text-center"
            >
              {idx < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-slate-200 lg:block"
                />
              )}
              <div className="relative z-10 grid h-16 w-16 place-items-center rounded-full bg-brand text-2xl font-medium text-white shadow-lg shadow-brand/30 transition-transform duration-300 hover:scale-110">
                {step.number}
              </div>
              <h3 className="mt-6 text-lg font-medium text-slate-900 sm:text-xl">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[220px] text-sm text-slate-600 sm:text-base">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
