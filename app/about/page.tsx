import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import AboutHero from "../components/about-page/AboutHero";
import Pillars from "../components/about-page/Pillars";
import Journey from "../components/about-page/Journey";
import WhyChoose from "../components/about-page/WhyChoose";
import LocationMap from "../components/LocationMap";

export const metadata: Metadata = {
  title: "About — Searcher Properties",
  description:
    "Searcher Properties is a trusted real estate company delivering premium developments and smart property investments across Lagos and beyond.",
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen min-w-0 flex-col overflow-x-hidden bg-white">
      <Nav />
      <AboutHero />
      <Pillars />
      <Journey />
      <WhyChoose />
      <LocationMap />
      <Footer />
    </main>
  );
}
