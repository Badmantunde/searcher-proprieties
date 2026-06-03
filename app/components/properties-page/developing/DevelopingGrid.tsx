import Reveal from "../../Reveal";
import DevelopingCard, { DEVELOPING_PROJECTS } from "../DevelopingCard";

export default function DevelopingGrid() {
  return (
    <section
      id="developing-projects"
      className="bg-cream px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:gap-8">
          {DEVELOPING_PROJECTS.map((p, i) => (
            <Reveal
              key={i}
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
