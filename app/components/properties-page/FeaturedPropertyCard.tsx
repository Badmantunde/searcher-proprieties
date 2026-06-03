import Image from "next/image";
import Link from "next/link";
import { mapsHref, whatsappHref } from "../../lib/links";
import {
  ChevronRight,
  LocationIcon,
  MapPinIcon,
  WhatsappIcon,
} from "./icons";

export type FeaturedProperty = {
  image: string;
  primaryBadge: string;
  secondaryBadge: string;
  location: string;
  title: string;
  description: string;
  detailHref: string;
};

export default function FeaturedPropertyCard(p: FeaturedProperty) {
  return (
    <article className="group h-full overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-15px_rgba(0,0,0,0.3)]">
      <Link href={p.detailHref} className="block" aria-label={`View ${p.title}`}>
        <div className="card-shine relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={p.image}
            alt={p.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-4 top-4 flex justify-between gap-2">
            <span className="rounded-full bg-brand px-4 py-2 text-xs font-medium text-white shadow-md shadow-black/20 sm:text-sm">
              {p.primaryBadge}
            </span>
            <span className="rounded-full bg-slate-50 px-4 py-2 text-xs font-medium text-slate-900 shadow-md shadow-black/20 sm:text-sm">
              {p.secondaryBadge}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-6 sm:p-7">
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

        <h3 className="mt-3 text-xl font-medium text-slate-900 sm:text-2xl">
          {p.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
          {p.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={p.detailHref}
            className="inline-flex items-center gap-1 rounded-full border border-brand px-4 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
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
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-opacity hover:opacity-80"
        >
          <MapPinIcon />
          View on Map
          <ChevronRight size={12} />
        </a>
      </div>
    </article>
  );
}
