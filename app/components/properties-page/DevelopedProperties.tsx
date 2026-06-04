import { getDevelopedProperties } from "@/lib/properties/fetch";
import Reveal from "../Reveal";
import DevelopedCard from "./DevelopedCard";
import SectionHeader from "./SectionHeader";

export default async function DevelopedProperties() {
  const properties = await getDevelopedProperties();

  return (
    <section
      id="developed"
      className="bg-white px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader
          title="Developed Properties"
          subtitle="Completed luxury homes ready for immediate occupancy"
          viewAllHref="/properties/developed"
        />

        <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:gap-8">
          {properties.map((p, i) => (
            <Reveal
              key={p.slug}
              variant="fade-up"
              delay={i * 100}
              className="h-full"
            >
              <DevelopedCard {...p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
