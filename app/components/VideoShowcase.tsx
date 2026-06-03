import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

const VIDEOS = [
  "/image/frame-52-260.png",
  "/image/frame-53-261.png",
  "/image/frame-54-262.png",
];

export default function VideoShowcase() {
  return (
    <section
      id="videos"
      className="bg-[#f7f7f5] p-6 sm:p-10 lg:p-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal variant="fade-up" className="text-center">
          <h2 className="text-3xl font-medium text-slate-900 sm:text-4xl lg:text-5xl">
            Video Showcase
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-700 sm:text-lg">
            Experience our properties through virtual tours
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((src, idx) => (
            <Reveal key={idx} variant="scale-in" delay={idx * 130}>
              <Link
                href="/videos"
                aria-label={`Watch property tour ${idx + 1}`}
                className="group relative block aspect-square w-full overflow-hidden rounded-2xl bg-slate-200 shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              >
                <Image
                  src={src}
                  alt={`Property tour ${idx + 1}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 grid place-items-center bg-black/0 transition-colors group-hover:bg-black/15">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-brand backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/videos"
            className="rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-transform hover:-translate-y-0.5"
          >
            See all videos
          </Link>
        </div>
      </div>
    </section>
  );
}
