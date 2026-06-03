import Reveal from "../Reveal";
import SectionHeader from "./SectionHeader";
import ShortletCard, { SHORTLETS } from "./ShortletCard";

export default function ShortletApartments() {
  return (
    <section
      id="shortlet"
      className="bg-white px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader
          title="Shortlet Apartments"
          subtitle="Fully furnished apartments for temporary stays"
          viewAllHref="/properties/shortlet"
        />

        <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:gap-8">
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
