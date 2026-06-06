import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import VideosHero from "../components/videos-page/VideosHero";
import VideosGrid from "../components/videos-page/VideosGrid";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Property Videos",
  description:
    "Watch the Searcher Properties showcase — a cinematic walkthrough of our developments across Lagos.",
  path: "/videos",
});

export default function VideosPage() {
  return (
    <main className="flex min-h-screen min-w-0 flex-col overflow-x-hidden bg-white">
      <Nav />
      <VideosHero />
      <VideosGrid />
      <Footer />
    </main>
  );
}
