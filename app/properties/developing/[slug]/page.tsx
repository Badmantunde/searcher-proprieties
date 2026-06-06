import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "../../../components/JsonLd";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import PropertyGallery from "../../../components/properties-page/PropertyGallery";
import PropertyContactCard from "../../../components/properties-page/PropertyContactCard";
import DevelopingInfoCard from "../../../components/properties-page/developing/DevelopingInfoCard";
import {
  getDevelopingBySlug,
  getSlugsByType,
} from "@/lib/properties/fetch";
import { buildDevelopingPropertyMetadata } from "@/lib/seo/metadata";
import { developingListingSchema } from "@/lib/seo/schema";

type RouteParams = { slug: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  return getSlugsByType("developing");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getDevelopingBySlug(slug);
  if (!project) {
    return {
      title: "Project not found",
      robots: { index: false, follow: false },
    };
  }
  return buildDevelopingPropertyMetadata(project);
}

export default async function DevelopingDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const project = await getDevelopingBySlug(slug);
  if (!project) notFound();

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <JsonLd data={developingListingSchema(project)} />
      <Nav />

      <PropertyGallery
        alt={project.title}
        hero={project.gallery.hero}
        thumbnails={project.gallery.thumbnails}
      />

      <section className="px-4 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:px-16 lg:pb-24 lg:pt-16">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 sm:gap-8">
          <DevelopingInfoCard
            location={project.location}
            title={project.title}
            units={project.units}
            progress={project.progress}
            completion={project.completion}
            leaseLabel={project.leaseLabel}
          />
          <PropertyContactCard propertyTitle={project.title} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
