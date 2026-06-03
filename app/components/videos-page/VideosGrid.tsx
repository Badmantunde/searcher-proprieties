import Reveal from "../Reveal";
import VideoCard, { type Video } from "./VideoCard";

const THUMBS = [
  "/image/frame-52-260.png",
  "/image/frame-53-261.png",
  "/image/frame-54-262.png",
];

export const VIDEOS: Video[] = Array.from({ length: 6 }, (_, i) => ({
  thumbnail: THUMBS[i % THUMBS.length],
  title: "Lekki Premium Estates - Drone Tour",
}));

export default function VideosGrid() {
  return (
    <section
      id="videos"
      className="bg-white px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
          {VIDEOS.map((v, i) => (
            <Reveal
              key={i}
              variant="fade-up"
              delay={i * 90}
              className="h-full"
            >
              <VideoCard {...v} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
