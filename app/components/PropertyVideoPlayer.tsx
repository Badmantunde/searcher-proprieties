import { PROPERTY_VIDEO } from "@/lib/videos";

type Props = {
  className?: string;
};

export default function PropertyVideoPlayer({ className = "" }: Props) {
  return (
    <div
      className={`overflow-hidden rounded-2xl bg-black shadow-xl shadow-black/15 sm:rounded-3xl ${className}`}
    >
      <video
        className="aspect-video w-full object-cover"
        controls
        playsInline
        preload="metadata"
        src={PROPERTY_VIDEO.src}
        title={PROPERTY_VIDEO.title}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
