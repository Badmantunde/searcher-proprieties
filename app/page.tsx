import About from "./components/About";
import Contact from "./components/Contact";
import FeaturedProperties from "./components/FeaturedProperties";
import Footer from "./components/Footer";
import Header from "./components/Header";
import InvestmentProcess from "./components/InvestmentProcess";
import LocationMap from "./components/LocationMap";
import Nav from "./components/Nav";
import Stats from "./components/Stats";
import TrustedProperties from "./components/TrustedProperties";
import VideoShowcase from "./components/VideoShowcase";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Nav />
      <Header />
      <TrustedProperties />
      <FeaturedProperties />
      <Stats />
      <About />
      <InvestmentProcess />
      <VideoShowcase />
      <Contact />
      <LocationMap />
      <Footer />
    </main>
  );
}
