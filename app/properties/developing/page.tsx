import type { Metadata } from "next";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import DevelopingHero from "../../components/properties-page/developing/DevelopingHero";
import DevelopingGrid from "../../components/properties-page/developing/DevelopingGrid";

export const metadata: Metadata = {
  title: "Developing Properties — Searcher Properties",
  description:
    "Future developments and investment opportunities from Searcher Properties — secure your future with exclusive early-stage property investments offering exceptional ROI potential.",
};

export default function DevelopingPropertiesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Nav />
      <DevelopingHero />
      <DevelopingGrid />
      <Footer />
    </main>
  );
}
