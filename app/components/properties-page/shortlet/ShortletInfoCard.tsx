import { mapsHref } from "../../../lib/links";
import { LocationIcon } from "../icons";

type Props = {
  location: string;
  title: string;
  description: string;
};

export default function ShortletInfoCard({
  location,
  title,
  description,
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

      <h1 className="mt-3 text-2xl font-medium leading-tight text-slate-900 sm:mt-4 sm:text-3xl lg:text-4xl xl:text-5xl">
        {title}
      </h1>

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-black/70 sm:mt-5 sm:text-base lg:text-lg lg:leading-8">
        {description}
      </p>
    </div>
  );
}
