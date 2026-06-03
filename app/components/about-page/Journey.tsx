"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Reveal from "../Reveal";

type Milestone = {
  year: string;
  description: string;
};

const MILESTONES: Milestone[] = [
  { year: "2015", description: "Founded Searcher Properties" },
  { year: "2018", description: "Completed 50+ residential units" },
  { year: "2022", description: "Expanded to multiple Lagos estates" },
  { year: "2026", description: "250+ properties delivered" },
];

export default function Journey() {
  return (
    <section className="bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal variant="fade-up" className="text-center">
          <h2 className="text-3xl font-medium leading-tight text-slate-900 sm:text-4xl lg:text-5xl xl:text-[56px] xl:leading-[1.1]">
            About Searcher Properties
          </h2>
        </Reveal>

        <Reveal variant="fade-up" delay={120} className="mt-10 sm:mt-12">
          <p className="w-full text-base leading-relaxed text-black/80 sm:text-lg sm:leading-8 lg:text-xl lg:leading-9">
            <span className="font-medium text-brand-teal">
              Searcher Properties
            </span>{" "}
            is a registered Real Estate consulting firm in Lagos, Nigeria
            involved in real estate marketing, management, development and
            investment company with a mission to provide a peaceful residential
            environment and exquisite homes within a very affordable budget to
            all.
          </p>
          <div className="mt-8 h-px w-full bg-black/15" />
        </Reveal>

        <Reveal variant="fade-up" delay={200} className="mt-16 text-center sm:mt-20">
          <h3 className="text-3xl font-medium text-slate-900 sm:text-4xl lg:text-5xl xl:text-[56px] xl:leading-[1.1]">
            Our Journey
          </h3>
        </Reveal>

        <Timeline />
      </div>
    </section>
  );
}

function Timeline() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={[
        "timeline relative mx-auto mt-12 max-w-[1080px] sm:mt-16",
        active ? "is-active" : "",
      ].join(" ")}
    >
      {/* Vertical spine — left-aligned on mobile, centered on md+ */}
      <div
        aria-hidden
        className="timeline-spine pointer-events-none absolute top-0 bottom-0 left-4 w-[3px] origin-top rounded-full bg-brand sm:left-6 md:left-1/2 md:-translate-x-1/2"
      />

      <ul className="relative flex flex-col gap-6 sm:gap-10 md:gap-16">
        {MILESTONES.map((m, idx) => {
          const isRight = idx % 2 === 0;
          return (
            <li
              key={m.year}
              className="relative md:grid md:grid-cols-2 md:items-start md:gap-x-16"
              style={{ "--i": idx } as CSSProperties}
            >
              {/* Dot marker on the spine */}
              <span
                aria-hidden
                className="timeline-dot pointer-events-none absolute left-4 top-5 z-10 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full bg-white ring-[3px] ring-brand sm:left-6 sm:top-6 sm:h-6 sm:w-6 md:left-1/2 md:top-7"
              >
                <span className="block h-2 w-2 rounded-full bg-brand sm:h-2.5 sm:w-2.5" />
                <span
                  aria-hidden
                  className="timeline-dot-pulse pointer-events-none absolute inset-0 rounded-full bg-brand/40"
                />
              </span>

              {/* Card — alternates sides on md+ */}
              <article
                className={[
                  "timeline-card group relative ml-12 rounded-2xl bg-cream px-5 py-5 shadow-sm shadow-black/5 transition-shadow hover:shadow-md hover:shadow-brand/10",
                  "sm:ml-16 sm:rounded-[28px] sm:px-7 sm:py-6",
                  "md:ml-0 md:px-8 md:py-7",
                  isRight ? "md:col-start-2" : "md:col-start-1 timeline-card-left",
                ].join(" ")}
              >
                <div className="text-2xl font-medium text-brand sm:text-3xl lg:text-[34px]">
                  {m.year}
                </div>
                <p className="mt-2 text-base leading-relaxed text-black/75 sm:mt-3 sm:text-lg lg:text-xl">
                  {m.description}
                </p>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
