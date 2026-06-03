import Image from "next/image";
import Link from "next/link";
import { mapsHref, whatsappHref } from "../../lib/links";
import { APT_DETAILS_GALLERY, type Gallery } from "./gallery";
import {
  ChevronRight,
  FireIcon,
  LightningIcon,
  LocationIcon,
  MapPinIcon,
  TrendUpIcon,
  WhatsappIcon,
} from "./icons";

export type DevelopingUnit = {
  type: string;
  rental: string;
  price: string;
};

export type DevelopingProject = {
  slug: string;
  image: string;
  location: string;
  leaseLabel: string;
  title: string;
  units: DevelopingUnit[];
  progress: number;
  completion: string;
  gallery: Gallery;
};

const DEFAULT_UNITS: DevelopingUnit[] = [
  { type: "Mini Flat", rental: "Annual Rental: ₦2.2M Yearly", price: "₦17M" },
  { type: "Studio Room", rental: "Annual Rental: ₦2.2M Yearly", price: "₦9M" },
];

export const DEVELOPING_PROJECTS: DevelopingProject[] = [
  {
    slug: "shomolu-modern-living",
    image: "/developing-assets/img_7769-1-32.png",
    location: "No. 15 Araromi Street, Shomolu",
    leaseLabel: "25 Years Lease",
    title: "Shomolu Modern Living Project",
    units: DEFAULT_UNITS,
    progress: 95,
    completion: "July 2026",
    gallery: APT_DETAILS_GALLERY,
  },
  {
    slug: "maryland-project",
    image: "/developing-assets/node-101.png",
    location: "No. 15 Araromi Street, Shomolu",
    leaseLabel: "25 Years Lease",
    title: "Maryland Project",
    units: DEFAULT_UNITS,
    progress: 95,
    completion: "July 2026",
    gallery: APT_DETAILS_GALLERY,
  },
  {
    slug: "abule-egba-project",
    image: "/developing-assets/img_7768-2-170.png",
    location: "No. 15 Araromi Street, Shomolu",
    leaseLabel: "25 Years Lease",
    title: "Abule Egba project",
    units: DEFAULT_UNITS,
    progress: 95,
    completion: "July 2026",
    gallery: APT_DETAILS_GALLERY,
  },
  {
    slug: "yaba-garden-estate",
    image: "/developing-assets/node-239.png",
    location: "No. 15 Araromi Street, Shomolu",
    leaseLabel: "25 Years Lease",
    title: "Yaba Garden Estate",
    units: DEFAULT_UNITS,
    progress: 95,
    completion: "July 2026",
    gallery: APT_DETAILS_GALLERY,
  },
];

export function getDevelopingBySlug(
  slug: string,
): DevelopingProject | undefined {
  return DEVELOPING_PROJECTS.find((p) => p.slug === slug);
}

export default function DevelopingCard(p: DevelopingProject) {
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
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/55 to-transparent"
        />

        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
          <span className="rounded-full bg-brand px-4 py-2 text-xs font-medium text-white shadow-md shadow-black/30 sm:text-sm">
            {p.progress}% Complete
          </span>

          <ul className="flex flex-col items-stretch gap-2">
            <li className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              <TrendUpIcon />
              High ROI
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              <LightningIcon />
              Limited Units
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              <FireIcon />
              Selling Fast
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6 sm:gap-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
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
          <span className="rounded-full bg-brand-soft px-4 py-1.5 text-xs font-medium text-brand sm:text-sm">
            {p.leaseLabel}
          </span>
        </div>

        <h3 className="text-xl font-medium text-slate-900 sm:text-2xl">
          {p.title}
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/properties/developing/${p.slug}`}
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

        <div className="mt-auto flex flex-col gap-4 rounded-2xl bg-cream p-5 sm:p-6">
          {p.units.map((u, idx) => (
            <div
              key={idx}
              className={[
                "flex items-center justify-between gap-4",
                idx > 0 ? "border-t border-black/5 pt-4" : "",
              ].join(" ")}
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900 sm:text-base">
                  {u.type}
                </span>
                <span className="text-xs text-black/70 sm:text-sm">
                  {u.rental}
                </span>
              </div>
              <span className="text-lg font-bold text-slate-900 sm:text-xl">
                {u.price}
              </span>
            </div>
          ))}

          <div className="flex flex-col gap-2 border-t border-black/5 pt-4">
            <div className="flex items-center justify-between text-xs font-medium text-slate-800 sm:text-sm">
              <span>Construction Progress</span>
              <span>{p.progress}%</span>
            </div>
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-brand/15"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={p.progress}
            >
              <div
                className="h-full rounded-full bg-brand transition-[width] duration-700"
                style={{ width: `${p.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
