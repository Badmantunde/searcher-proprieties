import PropertyVideoPlayer from "../PropertyVideoPlayer";
import Reveal from "../Reveal";
import { PROPERTY_VIDEO } from "@/lib/videos";

export default function VideosGrid() {
  return (
    <section
      id="videos"
      className="bg-white px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal variant="fade-up" className="mx-auto max-w-5xl">
          <PropertyVideoPlayer />
          <h2 className="mt-6 text-center text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
            {PROPERTY_VIDEO.title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-base text-slate-600 sm:text-lg">
            Explore our properties through this cinematic walkthrough and
            development showcase.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
