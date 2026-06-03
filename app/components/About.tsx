import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section
      id="about"
      className="bg-white p-6 sm:p-10 lg:p-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal variant="fade-up" className="max-w-4xl text-left">
          <h2 className="text-3xl font-medium leading-[1.25] text-slate-900 sm:text-4xl lg:text-[44px] lg:leading-[1.2]">
            At <span className="text-brand-teal">Searcher Properties</span>, we
            believe every investment should feel valuable, secure, and built
            for the future.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Searcher Properties is a modern real estate company focused on
            delivering quality developments and reliable property investment
            opportunities across Lagos and other growing cities. We help
            individuals and families find spaces that combine comfort, value,
            and long-term potential.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          <Reveal
            variant="fade-up"
            delay={100}
            className="overflow-hidden rounded-2xl shadow-md shadow-black/10"
          >
            <Image
              src="/image/image-9-191.png"
              alt="What we do at Searcher Properties"
              width={1200}
              height={1000}
              className="h-auto w-full transition-transform duration-700 hover:scale-[1.03]"
            />
          </Reveal>
          <Reveal
            variant="fade-up"
            delay={250}
            className="overflow-hidden rounded-2xl shadow-md shadow-black/10"
          >
            <Image
              src="/image/image-11-216.png"
              alt="Why you should invest with Searcher Properties"
              width={1200}
              height={1000}
              className="h-auto w-full transition-transform duration-700 hover:scale-[1.03]"
            />
          </Reveal>
        </div>

        <Reveal
          variant="fade-up"
          delay={350}
          className="mt-10 flex justify-start"
        >
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30"
          >
            Explore More
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
      </div>
    </section>
  );
}
