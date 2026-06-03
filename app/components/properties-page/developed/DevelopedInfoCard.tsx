import { mapsHref } from "../../../lib/links";
import { LocationIcon } from "../icons";

type Props = {
  location: string;
  title: string;
  description: string;
  priceRange: string;
  amenities: string[];
};

export default function DevelopedInfoCard({
  location,
  title,
  description,
  priceRange,
  amenities,
}: Props) {
  return (
    <div className="rounded-2xl bg-[#EBF5FF] p-6 sm:rounded-3xl sm:p-8 lg:p-10">
      <a
        href={mapsHref(location)}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${location} in Google Maps`}
        className="group inline-flex items-center gap-3 rounded-full text-slate-700 transition-colors hover:text-brand"
      >
        <LocationIcon />
        <span className="text-sm underline-offset-4 group-hover:underline sm:text-base lg:text-lg">
          {location}
        </span>
      </a>

      <div className="mt-6 grid gap-8 sm:mt-8 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16">
        <div>
          <h1 className="text-2xl font-medium leading-tight text-slate-900 sm:text-3xl lg:text-4xl xl:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-black/70 sm:mt-5 sm:text-base lg:text-lg lg:leading-8">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:gap-3 lg:items-end lg:text-right">
          <p className="text-base font-medium text-slate-900 sm:text-lg lg:text-xl">
            Price Range
          </p>
          <p className="text-2xl font-medium leading-none text-brand sm:text-3xl lg:text-4xl">
            {priceRange}
          </p>
        </div>
      </div>

      <div className="mt-10 border-t border-slate-200/70 pt-8 sm:mt-12 sm:pt-10">
        <h2 className="text-lg font-medium text-slate-900 sm:text-xl lg:text-2xl">
          Amenities
        </h2>
        <ul className="mt-5 grid gap-x-8 gap-y-3 sm:mt-6 sm:grid-cols-2 sm:gap-y-4 lg:gap-x-16">
          {amenities.map((item) => (
            <li
              key={item}
              className="flex items-center gap-4 text-sm text-black/80 sm:text-base lg:text-lg"
            >
              <span
                aria-hidden
                className="inline-block h-3 w-3 shrink-0 rounded-full bg-brand-teal lg:h-3.5 lg:w-3.5"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
