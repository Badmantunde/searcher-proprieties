import Reveal from "../../Reveal";
import ShortletCard, { SHORTLETS } from "../ShortletCard";

export default function ShortletGrid() {
  return (
    <section
      id="shortlet-apartments"
      className="bg-[#f7f7f5] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:gap-8">
          {SHORTLETS.map((s, i) => (
            <Reveal
              key={i}
              variant="fade-up"
              delay={i * 100}
              className="h-full"
            >
              <ShortletCard {...s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
