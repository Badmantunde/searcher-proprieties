import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import LocationMap from "../components/LocationMap";
import ContactHero from "../components/contact-page/ContactHero";
import ContactSection from "../components/contact-page/ContactSection";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Get in touch with Searcher Properties. We're here to help with your dream home or perfect investment opportunity in Lagos and beyond.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="flex min-h-screen min-w-0 flex-col overflow-x-hidden bg-white">
      <Nav />
      <ContactHero />
      <ContactSection />
      <LocationMap />
      <Footer />
    </main>
  );
}
