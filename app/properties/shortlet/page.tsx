import type { Metadata } from "next";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import ShortletHero from "../../components/properties-page/shortlet/ShortletHero";
import ShortletGrid from "../../components/properties-page/shortlet/ShortletGrid";

export const metadata: Metadata = {
  title: "Shortlet Apartments — Searcher Properties",
  description:
    "Fully furnished shortlet apartments perfect for business trips, vacations, and temporary stays with premium amenities and comfort.",
};

export default function ShortletApartmentsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Nav />
      <ShortletHero />
      <ShortletGrid />
      <Footer />
    </main>
  );
}
