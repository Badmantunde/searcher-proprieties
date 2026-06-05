"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  alt: string;
  hero: string;
  thumbnails: string[];
};

export default function PropertyGallery({ alt, hero, thumbnails }: Props) {
  const slides = useMemo(() => [hero, ...thumbnails], [hero, thumbnails]);
  const [index, setIndex] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = useCallback(
    (delta: number) => {
      setHeroLoaded(false);
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

  useEffect(() => {
    const next = slides[(index + 1) % slides.length];
    const prev = slides[(index - 1 + slides.length) % slides.length];
    for (const src of [next, prev]) {
      const img = new window.Image();
      img.src = src;
    }
  }, [index, slides]);

  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [index]);

  return (
    <div className="flex w-full min-w-0 flex-col items-stretch overflow-x-hidden">
      <div className="relative isolate w-full min-w-0 overflow-hidden bg-slate-100">
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
          {!heroLoaded ? (
            <div className="absolute inset-0 animate-pulse bg-slate-200" aria-hidden />
          ) : null}
          <Image
            key={slides[index]}
            src={slides[index]}
            alt={alt}
            fill
            sizes="100vw"
            priority={index === 0}
            quality={80}
            onLoad={() => setHeroLoaded(true)}
            onError={() => setHeroLoaded(true)}
            className={`object-cover transition-opacity duration-300 ${
              heroLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 h-11 w-11 -translate-y-1/2 transition-transform hover:scale-105 active:scale-95 sm:left-6 sm:h-14 sm:w-14 lg:left-10"
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
              className="absolute right-3 top-1/2 z-10 h-11 w-11 -translate-y-1/2 transition-transform hover:scale-105 active:scale-95 sm:right-6 sm:h-14 sm:w-14 lg:right-10"
            >
              <Image
                src="/apt-details-assets/arrow-right.svg"
                alt=""
                width={100}
                height={100}
                className="h-full w-full drop-shadow-md"
              />
            </button>
          </>
        ) : null}
      </div>

      {slides.length > 1 ? (
        <div className="mx-auto w-full min-w-0 max-w-[1280px] px-4 pt-6 sm:px-8 sm:pt-8 lg:px-16">
          <div className="rounded-xl bg-slate-50 px-4 py-4 sm:rounded-2xl sm:px-6 sm:py-5 lg:px-8">
            <div
              role="tablist"
              aria-label="Gallery thumbnails"
              className="scrollbar-hide flex w-full min-w-0 touch-pan-x snap-x snap-mandatory items-center gap-3 overflow-x-auto overscroll-x-contain sm:gap-4"
            >
            {slides.map((src, i) => {
              const active = i === index;

              return (
                <button
                  key={`${src}-${i}`}
                  ref={(el) => {
                    thumbRefs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-label={`Show image ${i + 1}`}
                  onClick={() => {
                    setHeroLoaded(false);
                    setIndex(i);
                  }}
                  className={`relative aspect-[4/3] w-28 shrink-0 snap-center overflow-hidden rounded-lg border-[3px] bg-slate-200 transition-all duration-300 ease-out sm:w-32 sm:rounded-xl md:w-36 lg:w-40 ${
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
                    quality={75}
                    loading={i < 4 ? "eager" : "lazy"}
                    className="object-cover"
                  />
                </button>
              );
            })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
