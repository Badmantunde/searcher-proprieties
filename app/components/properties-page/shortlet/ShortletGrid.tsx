import Reveal from "../../Reveal";
import ShortletCard from "../ShortletCard";
import type { Shortlet } from "@/lib/properties/types";

type Props = {
  items: Shortlet[];
};

export default function ShortletGrid({ items }: Props) {
  return (
    <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:gap-8">
          {items.map((s, i) => (
            <Reveal
              key={s.slug}
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
