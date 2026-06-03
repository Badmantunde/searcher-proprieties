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
  title: "Searcher Properties — Find Your Dream Property",
  description:
    "Premium homes and investment properties built with trust, quality, and long-term value.",
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
