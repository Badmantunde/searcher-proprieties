import Link from "next/link";
import Reveal from "../Reveal";
import { ChevronRight } from "./icons";

type Props = {
  title: string;
  subtitle: string;
  viewAllHref: string;
  viewAllLabel?: string;
};

export default function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel = "View all",
}: Props) {
  return (
    <Reveal variant="fade-up">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <div>
          <h2 className="text-3xl font-medium text-slate-900 sm:text-4xl lg:text-5xl xl:text-[56px] xl:leading-[1.05]">
            {title}
          </h2>
          <p className="mt-4 text-base text-black/70 sm:text-lg lg:text-xl">
            {subtitle}
          </p>
        </div>

        <Link
          href={viewAllHref}
          className="group inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-semibold text-brand transition-colors hover:text-brand/80 sm:self-end sm:text-base"
        >
          {viewAllLabel}
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            <ChevronRight size={16} />
          </span>
        </Link>
      </div>
    </Reveal>
  );
}
