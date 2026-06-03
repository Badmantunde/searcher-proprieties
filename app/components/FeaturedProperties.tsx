import Link from "next/link";
import Reveal from "./Reveal";
import FeaturedPropertyCard, {
  type FeaturedProperty,
} from "./properties-page/FeaturedPropertyCard";

const PROPERTIES: FeaturedProperty[] = [
  {
    image: "/image/img_7768-2-39.png",
    primaryBadge: "Developed",
    secondaryBadge: "Completed",
    location: "No. 15 Araromi Street, Shomolu",
    title: "Araromi Project",
    description:
      "Own a piece of luxury with us in our beautifully designed residence....",
    detailHref: "/properties/developed/araromi-residences",
  },
  {
    image: "/image/img_7769-1-76.png",
    primaryBadge: "10 Years Lease",
    secondaryBadge: "95% Complete",
    location: "No. 15 Araromi Street, Shomolu",
    title: "Araromi Project",
    description:
      "Own a piece of luxury with us in our beautifully designed residence....",
    detailHref: "/properties/developing/shomolu-modern-living",
  },
  {
    image: "/image/img_7767-1-113.png",
    primaryBadge: "Developed",
    secondaryBadge: "Completed",
    location: "No. 15 Araromi Street, Shomolu",
    title: "Araromi Project",
    description:
      "Own a piece of luxury with us in our beautifully designed residence....",
    detailHref: "/properties/developed/araromi-residences-2",
  },
  {
    image: "/image/img_7770-1-150.png",
    primaryBadge: "10 Years Lease",
    secondaryBadge: "95% Complete",
    location: "No. 15 Araromi Street, Shomolu",
    title: "Araromi Project",
    description:
      "Own a piece of luxury with us in our beautifully designed residence....",
    detailHref: "/properties/developing/maryland-project",
  },
];

export default function FeaturedProperties() {
  return (
    <section id="properties" className="bg-white p-6 sm:p-10 lg:p-20">
      <div className="mx-auto max-w-[1280px]">
        <Reveal variant="fade-up" className="text-center">
          <h2 className="text-3xl font-medium text-slate-900 sm:text-4xl lg:text-5xl">
            Featured Properties
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 sm:text-lg">
            Explore our latest premium developments and completed projects.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2">
          {PROPERTIES.map((property, idx) => (
            <Reveal
              key={idx}
              variant="fade-up"
              delay={idx * 120}
              className="h-full"
            >
              <FeaturedPropertyCard {...property} />
            </Reveal>
          ))}
        </div>

        <Reveal variant="fade-up" className="mt-12 flex justify-center">
          <Link
            href="/properties"
            className="rounded-full bg-brand px-10 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30"
          >
            View all
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
