import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import VideosHero from "../components/videos-page/VideosHero";
import VideosGrid from "../components/videos-page/VideosGrid";

export const metadata: Metadata = {
  title: "Property Videos — Searcher Properties",
  description:
    "Watch the Searcher Properties showcase — a cinematic walkthrough of our developments.",
};

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
