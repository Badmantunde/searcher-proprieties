"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Props = {
  alt: string;
  hero: string;
  thumbnails: string[];
};

export default function PropertyGallery({ alt, hero, thumbnails }: Props) {
  const slides = [hero, ...thumbnails];
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <div className="flex w-full flex-col items-stretch">
      <div className="relative isolate w-full overflow-hidden bg-slate-100">
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            key={slides[index]}
            src={slides[index]}
            alt={alt}
            fill
            sizes="100vw"
            priority
            className="animate-image-crossfade object-cover"
          />
        </div>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 h-11 w-11 -translate-y-1/2 transition-transform hover:scale-105 active:scale-95 sm:left-6 sm:h-14 sm:w-14 lg:left-10"
        >
          <Image
            src="/apt-details-assets/arrow-left.svg"
            alt=""
            width={100}
            height={100}
            className="h-full w-full drop-shadow-md"
          />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next image"
          className="absolute right-3 top-1/2 h-11 w-11 -translate-y-1/2 transition-transform hover:scale-105 active:scale-95 sm:right-6 sm:h-14 sm:w-14 lg:right-10"
        >
          <Image
            src="/apt-details-assets/arrow-right.svg"
            alt=""
            width={100}
            height={100}
            className="h-full w-full drop-shadow-md"
          />
        </button>
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-4 pt-6 sm:px-8 sm:pt-8 lg:px-16">
        <div
          role="tablist"
          aria-label="Gallery thumbnails"
          className="flex w-full snap-x snap-mandatory items-center gap-3 overflow-x-auto pb-2 sm:gap-4 sm:overflow-visible"
        >
          {slides.map((src, i) => {
            const active = i === index;
            return (
              <button
                key={`${src}-${i}`}
                role="tab"
                type="button"
                aria-selected={active}
                aria-label={`Show image ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`relative aspect-[4/3] w-28 shrink-0 snap-start overflow-hidden rounded-lg border-[3px] bg-slate-200 transition-all duration-300 ease-out sm:w-32 sm:rounded-xl md:w-36 lg:w-40 ${
                  active
                    ? "scale-[1.04] border-[#0046ff] shadow-lg shadow-brand/20"
                    : "border-slate-300 opacity-70 hover:scale-[1.02] hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
