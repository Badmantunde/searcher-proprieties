import Image from "next/image";

export type Video = {
  thumbnail: string;
  title: string;
  href?: string;
};

export default function VideoCard({ thumbnail, title, href = "#" }: Video) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.3)]"
    >
      <div className="card-shine relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-0 grid place-items-center bg-black/10 transition-colors duration-300 group-hover:bg-black/25">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-white/70 text-slate-700 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-brand sm:h-16 sm:w-16">
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
      </div>

      <div className="flex flex-1 items-center justify-center p-5 sm:p-6">
        <h3 className="text-center text-base font-bold leading-tight text-slate-900 sm:text-lg lg:text-xl">
          {title}
        </h3>
      </div>
    </a>
  );
}
