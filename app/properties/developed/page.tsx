import type { Metadata } from "next";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import DevelopedHero from "../../components/properties-page/developed/DevelopedHero";
import DevelopedGrid from "../../components/properties-page/developed/DevelopedGrid";
import { getDevelopedProperties } from "@/lib/properties/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Developed Properties — Searcher Properties",
  description:
    "Crafted spaces designed for modern living — explore Searcher Properties' collection of completed luxury residences where elegance meets comfort and prestige.",
};

export default async function DevelopedPropertiesPage() {
  const items = await getDevelopedProperties();

  return (
    <main className="flex min-h-screen min-w-0 flex-col overflow-x-hidden bg-white">
      <Nav />
      <DevelopedHero />
      <DevelopedGrid items={items} />
      <Footer />
    </main>
  );
}
