import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

export default function TrustedProperties() {
  return (
    <section className="bg-white p-6 sm:p-10 lg:p-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <Reveal variant="fade-right" className="order-2 lg:order-1">
          <span className="inline-flex rounded-full bg-black px-6 py-2 text-sm text-white/80">
            Looking for trusted properties?
          </span>
          <p className="mt-6 text-base leading-relaxed text-slate-800 sm:text-lg lg:text-xl lg:leading-[1.7]">
            Searcher Properties is a modern real estate company commited to
            delivery quality homes, smart investments and reliable property
            opportunities with transparency and professionalism.
          </p>

          <Link
            href="/properties"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30"
          >
            Explore listings
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              className="transition-transform group-hover:translate-x-1"
            >
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </Reveal>

        <Reveal
          variant="fade-left"
          delay={150}
          className="order-1 overflow-hidden rounded-2xl shadow-xl shadow-black/10 lg:order-2"
        >
          <Image
            src="/image/image-10-213.png"
            alt="Modern villa with pool"
            width={1200}
            height={900}
            className="h-auto w-full transition-transform duration-700 hover:scale-[1.02]"
          />
        </Reveal>
      </div>
    </section>
  );
}
