import Image from "next/image";
import Link from "next/link";
import { mapsHref, whatsappHref } from "../../lib/links";
import type { Shortlet } from "@/lib/properties/types";
import {
  BedIcon,
  CarIcon,
  ChevronRight,
  LightningIcon,
  LocationIcon,
  MapPinIcon,
  TvIcon,
  WhatsappIcon,
  WifiIcon,
} from "./icons";

export type { Shortlet } from "@/lib/properties/types";

export default function ShortletCard(s: Shortlet) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-15px_rgba(0,0,0,0.3)]">
      <div className="card-shine relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={s.image}
          alt={s.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
        />

        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-brand px-4 py-2 text-xs font-medium text-white shadow-md shadow-black/30 sm:text-sm">
            Shortlet Apartment
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-xs font-medium text-slate-900 shadow-md shadow-black/20 sm:text-sm">
            <BedIcon />
            {s.bedrooms}
          </span>
        </div>

        <div className="absolute inset-x-5 bottom-5 flex flex-col gap-1 text-white">
          <span className="text-xs font-medium text-white/80 sm:text-sm">
            Rate Starting From
          </span>
          <span className="text-2xl font-medium sm:text-3xl lg:text-[34px]">
            {s.rate}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6 sm:gap-6 sm:p-7">
        <a
          href={mapsHref(s.location)}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${s.location} in Google Maps`}
          className="inline-flex items-center gap-2 text-slate-700 transition-colors hover:text-brand"
        >
          <LocationIcon />
          <span className="text-sm sm:text-base">{s.location}</span>
        </a>

        <h3 className="text-xl font-medium text-slate-900 sm:text-2xl">
          {s.title}
        </h3>

        <p className="text-sm leading-relaxed text-black/70 sm:text-base">
          {s.description}
        </p>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-black/80 sm:text-base">
          <li className="flex items-center gap-2.5">
            <WifiIcon />
            Free WI-FI
          </li>
          <li className="flex items-center gap-2.5">
            <TvIcon />
            Smart TV
          </li>
          <li className="flex items-center gap-2.5">
            <LightningIcon size={18} />
            24/7 Power
          </li>
          <li className="flex items-center gap-2.5">
            <CarIcon />
            Parking Available
          </li>
        </ul>

        <div className="mt-auto flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/properties/shortlet/${s.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand px-4 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
            >
              View Apartment
              <ChevronRight />
            </Link>
            <a
              href={whatsappHref(`Hi! I'd like to book ${s.title}.`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-green px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <WhatsappIcon />
              Enquire on Whatsapp
            </a>
          </div>

          <a
            href={mapsHref(s.location)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-brand transition-opacity hover:opacity-80"
          >
            <MapPinIcon />
            View on Map
            <ChevronRight size={12} />
          </a>
        </div>
      </div>
    </article>
  );
}
