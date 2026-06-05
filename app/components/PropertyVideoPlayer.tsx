import type { SiteVideo } from "@/lib/videos";

type Props = {
  video: SiteVideo;
  className?: string;
};

export default function PropertyVideoPlayer({ video, className = "" }: Props) {
  return (
    <div
      className={`overflow-hidden rounded-2xl bg-black shadow-xl shadow-black/15 sm:rounded-3xl ${className}`}
    >
      <video
        className="aspect-video w-full object-cover"
        controls
        playsInline
        preload="metadata"
        src={video.src}
        title={video.title}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
