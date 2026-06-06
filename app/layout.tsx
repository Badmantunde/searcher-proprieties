import type { Metadata } from "next";
import { Poppins, Reem_Kufi } from "next/font/google";
import PageTransition from "./components/PageTransition";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const reemKufi = Reem_Kufi({
  variable: "--font-reem-kufi",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://searcherproperties.com"),
  title: "Searcher Properties | Real Estate & Property Investment in Lagos",
  description:
    "Discover apartments, homes, and investment properties across Lagos. Searcher Properties helps buyers, investors, and tenants find quality real estate opportunities with confidence.",
  keywords: [
    "Lagos real estate",
    "property investment Lagos",
    "apartments in Lagos",
    "houses for sale Lagos",
    "luxury apartments Lagos",
    "Searcher Properties",
  ],
  icons: {
    icon: "/image/FAV.png",
    apple: "/image/FAV.png",
  },
  openGraph: {
    title: "Searcher Properties | Real Estate & Property Investment in Lagos",
    description:
      "Explore verified apartments, homes, and investment opportunities across Lagos.",
    url: "https://searcherproperties.com",
    siteName: "Searcher Properties",
    type: "website",
    images: [
      {
        url: "/image/OG.png",
        width: 1200,
        height: 630,
        alt: "Searcher Properties",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${reemKufi.variable} antialiased`}
    >
      <body className="min-h-screen bg-white text-slate-900 font-sans">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
