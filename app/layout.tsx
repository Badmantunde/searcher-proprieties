import type { Metadata } from "next";
import { Poppins, Reem_Kufi } from "next/font/google";
import JsonLd from "./components/JsonLd";
import PageTransition from "./components/PageTransition";
import { rootMetadata } from "@/lib/seo/metadata";
import { organizationSchema } from "@/lib/seo/schema";
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

export const metadata: Metadata = rootMetadata;

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
      <body className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-900">
        <JsonLd data={organizationSchema()} />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
