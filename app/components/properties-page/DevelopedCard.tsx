import Image from "next/image";
import Link from "next/link";
import { mapsHref, whatsappHref } from "../../lib/links";
import type { DevelopedProperty } from "@/lib/properties/types";
import {
  CheckBadgeIcon,
  ChevronRight,
  HeartIcon,
  KeyIcon,
  LocationIcon,
  MapPinIcon,
  SparkleIcon,
  WhatsappIcon,
} from "./icons";

export type { DevelopedProperty } from "@/lib/properties/types";

export default function DevelopedCard(p: DevelopedProperty) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-15px_rgba(0,0,0,0.3)]">
      <div className="card-shine relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={p.image}
          alt={p.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
          <span className="rounded-full bg-brand px-4 py-2 text-xs font-medium text-white shadow-md shadow-black/20 sm:text-sm">
            Completed
          </span>
          <button
            type="button"
            aria-label="Save to favorites"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/50 text-white backdrop-blur transition-colors hover:bg-white/80 hover:text-rose-500"
          >
            <HeartIcon />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6 sm:gap-6 sm:p-7">
        <a
          href={mapsHref(p.location)}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${p.location} in Google Maps`}
          className="inline-flex items-center gap-2 text-slate-700 transition-colors hover:text-brand"
        >
          <LocationIcon />
          <span className="text-sm sm:text-base">{p.location}</span>
        </a>

        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-medium text-slate-900 sm:text-2xl">
            {p.title}
          </h3>
          <p className="text-sm leading-relaxed text-black/70 sm:text-base">
            {p.description}
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/properties/developed/${p.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand px-4 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
            >
              View Details
              <ChevronRight />
            </Link>
            <a
              href={whatsappHref(`Hi! I'd like to enquire about ${p.title}.`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-green px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <WhatsappIcon />
              Enquire on Whatsapp
            </a>
          </div>

          <a
            href={mapsHref(p.location)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-brand transition-opacity hover:opacity-80"
          >
            <MapPinIcon />
            View on Map
            <ChevronRight size={12} />
          </a>

          <ul className="flex flex-col gap-2.5 border-t border-black/5 pt-4 text-sm text-brand sm:text-base">
            <li className="flex items-center gap-3">
              <CheckBadgeIcon />
              <span className="font-medium">Fully Completed</span>
            </li>
            <li className="flex items-center gap-3">
              <KeyIcon />
              <span className="font-medium">Ready to Move in</span>
            </li>
            <li className="flex items-center gap-3">
              <SparkleIcon />
              <span className="font-medium">Premium Finishing</span>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}
