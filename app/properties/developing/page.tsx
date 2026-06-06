import type { Metadata } from "next";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import DevelopingHero from "../../components/properties-page/developing/DevelopingHero";
import DevelopingGrid from "../../components/properties-page/developing/DevelopingGrid";
import { getDevelopingProjects } from "@/lib/properties/fetch";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: "Developing Properties & Off-Plan Investments",
  description:
    "Future developments and investment opportunities from Searcher Properties — secure your future with exclusive early-stage property investments offering exceptional ROI potential.",
  path: "/properties/developing",
});

export default async function DevelopingPropertiesPage() {
  const items = await getDevelopingProjects();

  return (
    <main className="flex min-h-screen min-w-0 flex-col overflow-x-hidden bg-white">
      <Nav />
      <DevelopingHero />
      <DevelopingGrid items={items} />
      <Footer />
    </main>
  );
}
