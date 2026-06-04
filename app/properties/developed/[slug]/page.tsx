import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import PropertyGallery from "../../../components/properties-page/PropertyGallery";
import PropertyContactCard from "../../../components/properties-page/PropertyContactCard";
import DevelopedInfoCard from "../../../components/properties-page/developed/DevelopedInfoCard";
import {
  getDevelopedBySlug,
  getSlugsByType,
} from "@/lib/properties/fetch";

type RouteParams = { slug: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  return getSlugsByType("developed");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getDevelopedBySlug(slug);
  if (!property) return { title: "Property not found — Searcher Properties" };
  return {
    title: `${property.title} — Searcher Properties`,
    description: property.longDescription,
  };
}

export default async function DevelopedDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const property = await getDevelopedBySlug(slug);
  if (!property) notFound();

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Nav />

      <PropertyGallery
        alt={property.title}
        hero={property.gallery.hero}
        thumbnails={property.gallery.thumbnails}
      />

      <section className="px-4 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:px-16 lg:pb-24 lg:pt-16">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 sm:gap-8">
          <DevelopedInfoCard
            location={property.location}
            title={property.title}
            description={property.longDescription}
            priceRange={property.priceRange}
            amenities={property.amenities}
          />
          <PropertyContactCard propertyTitle={property.title} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
