import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import {
  SHORTLETS,
  getShortletBySlug,
} from "../../../components/properties-page/ShortletCard";
import PropertyGallery from "../../../components/properties-page/PropertyGallery";
import PropertyContactCard from "../../../components/properties-page/PropertyContactCard";
import ShortletInfoCard from "../../../components/properties-page/shortlet/ShortletInfoCard";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return SHORTLETS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getShortletBySlug(slug);
  if (!property) return { title: "Property not found — Searcher Properties" };
  return {
    title: `${property.title} — Searcher Properties`,
    description: property.longDescription,
  };
}

export default async function ShortletDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const property = getShortletBySlug(slug);
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
          <ShortletInfoCard
            location={property.location}
            title={property.title}
            description={property.longDescription}
          />
          <PropertyContactCard propertyTitle={property.title} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
