import Link from "next/link";
import PropertyVideoPlayer from "./PropertyVideoPlayer";
import Reveal from "./Reveal";
import { SITE_VIDEOS } from "@/lib/videos";

export default function VideoShowcase() {
  return (
    <section id="videos" className="bg-[#f7f7f5] p-6 sm:p-10 lg:p-20">
      <div className="mx-auto max-w-[1280px]">
        <Reveal variant="fade-up" className="text-center">
          <h2 className="text-3xl font-medium text-slate-900 sm:text-4xl lg:text-5xl">
            Video Showcase
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-700 sm:text-lg">
            Experience our properties through virtual tours
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {SITE_VIDEOS.map((video, idx) => (
            <Reveal key={video.src} variant="scale-in" delay={idx * 150}>
              <PropertyVideoPlayer video={video} />
              <p className="mt-4 text-center text-sm text-slate-600 sm:text-base">
                {video.title}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/videos"
            className="rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-transform hover:-translate-y-0.5"
          >
            Watch on videos page
          </Link>
        </div>
      </div>
    </section>
  );
}
