import Image from "next/image";
import Reveal from "../Reveal";

type Pillar = {
  title: string;
  body: string;
  image: string;
  alt: string;
  reverse?: boolean;
};

const PILLARS: Pillar[] = [
  {
    title: "Our Mission",
    body: "To redefine luxury real estate in Nigeria by delivering exceptional properties that combine modern design, premium quality, and unmatched value for our clients.",
    image: "/about/image-18-10.png",
    alt: "Hands holding a globe — our mission",
  },
  {
    title: "Our Vision",
    body: "To become Nigeria's most trusted property developer, setting new standards in architectural excellence and customer satisfaction across the nation.",
    image: "/about/frame-166-23.png",
    alt: "Dart hitting target — our vision",
    reverse: true,
  },
  {
    title: "Our Core Value",
    body: "Every property we develop is built to the highest standards, using premium materials and innovative construction techniques that ensure lasting value.",
    image: "/about/frame-164-15.png",
    alt: "Hand refusing money — our core value",
  },
  {
    title: "Our Culture",
    body: "We believe in building lasting relationships with our clients, providing transparent communication and dedicated support throughout their property journey.",
    image: "/about/frame-164-28.png",
    alt: "Team putting hands together — our culture",
    reverse: true,
  },
];

export default function Pillars() {
  return (
    <section className="bg-cream px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-16 sm:gap-20 lg:gap-28">
        {PILLARS.map((p, idx) => (
          <PillarRow key={p.title} pillar={p} index={idx} />
        ))}
      </div>
    </section>
  );
}

function PillarRow({ pillar, index }: { pillar: Pillar; index: number }) {
  const { title, body, image, alt, reverse } = pillar;

  return (
    <Reveal
      variant="fade-up"
      delay={index * 80}
      className={[
        "grid grid-cols-1 items-center gap-10 lg:gap-20",
        "lg:grid-cols-2",
      ].join(" ")}
    >
      <div className={reverse ? "order-1 lg:order-2" : "order-1"}>
        <div className="relative aspect-square w-full overflow-hidden rounded-[36px] shadow-xl shadow-black/10 sm:rounded-[44px] lg:rounded-[50px]">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 hover:scale-[1.04]"
          />
        </div>
      </div>
      <div
        className={[
          "flex flex-col gap-5 sm:gap-7",
          reverse ? "order-2 lg:order-1" : "order-2",
        ].join(" ")}
      >
        <h3 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl xl:text-[56px] xl:leading-[1.05]">
          {title}
        </h3>
        <p className="max-w-xl text-base leading-relaxed text-black/70 sm:text-lg sm:leading-[1.7] lg:text-xl lg:leading-[1.75]">
          {body}
        </p>
      </div>
    </Reveal>
  );
}
