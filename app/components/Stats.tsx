import CountUp from "./CountUp";
import Reveal from "./Reveal";

const STATS = [
  { value: 150, suffix: "+", label: "Happy Clients" },
  { value: 20, suffix: "+", label: "Properties Delivered" },
  { value: 10, suffix: "+", label: "Years Experience" },
];

export default function Stats() {
  return (
    <section className="bg-[#111111] p-6 sm:p-10 lg:p-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6 sm:divide-x sm:divide-white/10">
          {STATS.map((stat, idx) => (
            <Reveal
              key={stat.label}
              variant="fade-up"
              delay={idx * 150}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-3 text-base text-white/70 sm:text-lg">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
