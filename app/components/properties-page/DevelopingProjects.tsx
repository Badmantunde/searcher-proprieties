import { getDevelopingProjects } from "@/lib/properties/fetch";
import Reveal from "../Reveal";
import DevelopingCard from "./DevelopingCard";
import SectionHeader from "./SectionHeader";

export default async function DevelopingProjects() {
  const projects = await getDevelopingProjects();

  return (
    <section
      id="developing"
      className="bg-cream px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader
          title="Developing Projects"
          subtitle="Investment opportunities with high ROI potential"
          viewAllHref="/properties/developing"
        />

        <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:gap-8">
          {projects.map((p, i) => (
            <Reveal
              key={p.slug}
              variant="fade-up"
              delay={i * 100}
              className="h-full"
            >
              <DevelopingCard {...p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
