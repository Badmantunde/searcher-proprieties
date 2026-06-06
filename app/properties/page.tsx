import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PropertiesHero from "../components/properties-page/PropertiesHero";
import DevelopedProperties from "../components/properties-page/DevelopedProperties";
import DevelopingProjects from "../components/properties-page/DevelopingProjects";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const revalidate = 60;
export const metadata: Metadata = buildPageMetadata({
  title: "Properties in Lagos",
  description:
    "Explore Searcher Properties' complete collection of luxury completed homes and developing investment projects across Lagos.",
  path: "/properties",
});

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  const showDeveloped = !category || category === "developed";
  const showDeveloping = !category || category === "developing";

  return (
    <main className="flex min-h-screen min-w-0 flex-col overflow-x-hidden bg-white">
      <Nav />
      <PropertiesHero />
      {showDeveloped ? <DevelopedProperties query={q} /> : null}
      {showDeveloping ? <DevelopingProjects query={q} /> : null}
      <Footer />
    </main>
  );
}
