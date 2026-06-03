import { mapsHref } from "../../../lib/links";
import type { DevelopingUnit } from "../DevelopingCard";
import { LocationIcon } from "../icons";

type Props = {
  location: string;
  title: string;
  units: DevelopingUnit[];
  progress: number;
  completion: string;
  leaseLabel: string;
};

export default function DevelopingInfoCard({
  location,
  title,
  units,
  progress,
  completion,
  leaseLabel,
}: Props) {
  const stats: { label: string; value: string }[] = [
    { label: "Progress", value: `${progress}%` },
    { label: "Completion", value: completion },
    { label: "Lease", value: leaseLabel },
  ];

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

      <h1 className="mt-6 text-2xl font-medium leading-tight text-slate-900 sm:mt-8 sm:text-3xl lg:text-4xl xl:text-5xl">
        {title}
      </h1>

      <div className="mt-8 rounded-2xl bg-brand/[0.03] p-5 sm:mt-10 sm:rounded-3xl sm:p-7 lg:p-8">
        <ul className="flex flex-col">
          {units.map((u, idx) => (
            <li
              key={u.type + idx}
              className={[
                "flex items-center justify-between gap-6 py-4 sm:py-5",
                idx > 0 ? "border-t border-slate-900/[0.06]" : "",
              ].join(" ")}
            >
              <div className="flex flex-col gap-1.5 sm:gap-2">
                <span className="text-base font-medium text-slate-900 sm:text-lg lg:text-xl">
                  {u.type}
                </span>
                <span className="text-xs text-black/70 sm:text-sm lg:text-base">
                  {u.rental}
                </span>
              </div>
              <span className="text-xl font-bold leading-none text-brand sm:text-2xl lg:text-3xl">
                {u.price}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <dl className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-3 sm:gap-8">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-2 sm:gap-3">
            <dt className="text-sm font-medium text-black/70 sm:text-base lg:text-lg">
              {s.label}
            </dt>
            <dd className="text-xl font-bold leading-none text-slate-900 sm:text-2xl lg:text-3xl">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
