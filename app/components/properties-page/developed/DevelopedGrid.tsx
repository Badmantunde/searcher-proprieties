import Reveal from "../../Reveal";
import DevelopedCard from "../DevelopedCard";
import type { DevelopedProperty } from "@/lib/properties/types";

type Props = {
  items: DevelopedProperty[];
};

export default function DevelopedGrid({ items }: Props) {
  return (
    <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:gap-8">
          {items.map((p, i) => (
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
