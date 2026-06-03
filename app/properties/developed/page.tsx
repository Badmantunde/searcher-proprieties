import type { Metadata } from "next";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import DevelopedHero from "../../components/properties-page/developed/DevelopedHero";
import DevelopedGrid from "../../components/properties-page/developed/DevelopedGrid";

export const metadata: Metadata = {
  title: "Developed Properties — Searcher Properties",
  description:
    "Crafted spaces designed for modern living — explore Searcher Properties' collection of completed luxury residences where elegance meets comfort and prestige.",
};

export default function DevelopedPropertiesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Nav />
      <DevelopedHero />
      <DevelopedGrid />
      <Footer />
    </main>
  );
}
