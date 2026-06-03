"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Searcher Properties delivered exactly what they promised. My investment has already appreciated significantly. Highly recommended!",
    name: "Adebayo Adekanbi",
    role: "Property Owner",
    avatar: "/image/frame-59-267.png",
  },
  {
    quote:
      "From the very first call to the final handover, the entire process felt transparent and stress-free. The team genuinely cares about their clients.",
    name: "Chioma Okafor",
    role: "Investor",
    avatar: "/image/frame-59-267.png",
  },
  {
    quote:
      "I've worked with several developers and Searcher Properties stands out for quality, professionalism and honest communication. A truly reliable partner.",
    name: "Tunde Bakare",
    role: "Repeat Buyer",
    avatar: "/image/frame-59-267.png",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((curr) => (curr + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-white p-6 sm:p-10 lg:p-20">
      <div className="mx-auto max-w-[1280px]">
        <Reveal variant="fade-up" className="text-center">
          <h2 className="text-3xl font-medium text-slate-900 sm:text-4xl lg:text-5xl">
            Client Testimonials
          </h2>
        </Reveal>

        <Reveal
          variant="fade-up"
          delay={120}
          className="relative mx-auto mt-10 max-w-3xl overflow-hidden"
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {TESTIMONIALS.map((t, idx) => (
              <article
                key={idx}
                className="w-full shrink-0 px-1 sm:px-2"
                aria-hidden={active !== idx}
              >
                <div className="rounded-3xl bg-[#f7f7f5] p-8 shadow-sm sm:p-12">
                  <Image
                    src="/image/vector-265.svg"
                    alt=""
                    width={55}
                    height={55}
                    aria-hidden
                    className="h-11 w-11 sm:h-[55px] sm:w-[55px]"
                  />


                  <p className="mt-6 text-lg leading-relaxed text-slate-800 sm:text-xl sm:leading-9">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="mt-8 flex items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full bg-slate-200 sm:h-16 sm:w-16">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-base font-medium text-slate-900 sm:text-lg">
                        {t.name}
                      </div>
                      <div className="text-sm text-slate-600">{t.role}</div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to testimonial ${idx + 1}`}
                onClick={() => setActive(idx)}
                className={
                  idx === active
                    ? "h-2.5 w-8 rounded-full bg-brand transition-all duration-300"
                    : "h-2.5 w-2.5 rounded-full bg-slate-300 transition-all duration-300 hover:bg-slate-400"
                }
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
