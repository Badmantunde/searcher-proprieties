import Link from "next/link";
import { getFeaturedProperties } from "@/lib/properties/fetch";
import Reveal from "./Reveal";
import FeaturedPropertyCard from "./properties-page/FeaturedPropertyCard";

export default async function FeaturedProperties() {
  const properties = await getFeaturedProperties();

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
          {properties.map((property, idx) => (
            <Reveal
              key={property.detailHref}
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
