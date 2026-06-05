import Link from "next/link";
import PropertyVideoPlayer from "./PropertyVideoPlayer";
import Reveal from "./Reveal";
import { PROPERTY_VIDEO } from "@/lib/videos";

export default function VideoShowcase() {
  return (
    <section id="videos" className="bg-[#f7f7f5] p-6 sm:p-10 lg:p-20">
      <div className="mx-auto max-w-[1280px]">
        <Reveal variant="fade-up" className="text-center">
          <h2 className="text-3xl font-medium text-slate-900 sm:text-4xl lg:text-5xl">
            Video Showcase
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-700 sm:text-lg">
            Experience our properties through a virtual tour
          </p>
        </Reveal>

        <Reveal variant="scale-in" delay={150} className="mx-auto mt-12 max-w-5xl">
          <PropertyVideoPlayer />
          <p className="mt-4 text-center text-sm text-slate-600 sm:text-base">
            {PROPERTY_VIDEO.title}
          </p>
        </Reveal>

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
