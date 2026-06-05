import PropertyVideoPlayer from "../PropertyVideoPlayer";
import Reveal from "../Reveal";
import { SITE_VIDEOS } from "@/lib/videos";

export default function VideosGrid() {
  return (
    <section
      id="videos"
      className="bg-white px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
          {SITE_VIDEOS.map((video, i) => (
            <Reveal key={video.src} variant="fade-up" delay={i * 120}>
              <PropertyVideoPlayer video={video} />
              <h2 className="mt-6 text-center text-xl font-bold text-slate-900 sm:text-2xl">
                {video.title}
              </h2>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-2xl text-center text-base text-slate-600 sm:text-lg">
          Explore our properties through cinematic walkthroughs and development
          showcases.
        </p>
      </div>
    </section>
  );
}
