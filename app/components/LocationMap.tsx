import Reveal from "./Reveal";

const ADDRESS = "7 Ebun Street, Abule Oja, Yaba, Lagos, Nigeria";
const MAPS_QUERY = encodeURIComponent(ADDRESS);
const EMBED_SRC = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed&z=16`;
const DIRECTIONS_HREF = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

export default function LocationMap() {
  return (
    <section aria-label="Office location" className="relative w-full bg-white">
      <Reveal variant="fade-in">
        <iframe
          title={`Map showing ${ADDRESS}`}
          src={EMBED_SRC}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="block h-[420px] w-full border-0 sm:h-[480px] lg:h-[520px]"
        />
      </Reveal>

      <a
        href={DIRECTIONS_HREF}
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-6 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-transform hover:-translate-x-1/2 hover:-translate-y-0.5"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <circle
            cx="12"
            cy="9"
            r="2.5"
            stroke="currentColor"
            strokeWidth="1.7"
          />
        </svg>
        Get Directions
      </a>
    </section>
  );
}
