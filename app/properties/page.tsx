import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PropertiesHero from "../components/properties-page/PropertiesHero";
import DevelopedProperties from "../components/properties-page/DevelopedProperties";
import DevelopingProjects from "../components/properties-page/DevelopingProjects";
export const metadata: Metadata = {
  title: "Properties — Searcher Properties",
  description:
    "Explore Searcher Properties' complete collection of luxury completed homes and developing investment projects.",
};

export default function PropertiesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Nav />
      <PropertiesHero />
      <DevelopedProperties />
      <DevelopingProjects />
      <Footer />
    </main>
  );
}
