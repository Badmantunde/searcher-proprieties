import type { Metadata } from "next";
import type { DevelopedProperty, DevelopingProject } from "@/lib/properties/types";
import {
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "./site";

export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${path}`;
}

export function truncate(text: string, max = 155): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max - 1).trimEnd()}…`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  keywords?: string[];
};

export function buildPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = "website",
  keywords,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);

  return {
    title,
    description,
    keywords: keywords ?? [...DEFAULT_KEYWORDS],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: "en_NG",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt ?? title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Real Estate & Property Investment in Lagos`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Discover apartments, homes, and investment properties across Lagos. Searcher Properties helps buyers, investors, and tenants find quality real estate opportunities with confidence.",
  keywords: [...DEFAULT_KEYWORDS],
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/image/FAV.png",
    apple: "/image/FAV.png",
  },
  openGraph: {
    title: `${SITE_NAME} | Real Estate & Property Investment in Lagos`,
    description:
      "Explore verified apartments, homes, and investment opportunities across Lagos.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Real Estate & Property Investment in Lagos`,
    description:
      "Explore verified apartments, homes, and investment opportunities across Lagos.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export function buildDevelopedPropertyMetadata(
  property: DevelopedProperty,
): Metadata {
  const path = `/properties/developed/${property.slug}`;
  const description = truncate(
    `${truncate(property.description || property.longDescription)}${
      property.priceRange ? ` From ${property.priceRange}.` : ""
    }`.trim(),
  );
    path,
    image: property.gallery.hero || property.image,
    imageAlt: `${property.title} — luxury property in ${property.location}, Lagos`,
    type: "article",
    keywords: [
      property.title,
      property.location,
      "developed property Lagos",
      "luxury apartments Lagos",
      "Searcher Properties",
      ...DEFAULT_KEYWORDS,
    ],
  });
}

export function buildDevelopingPropertyMetadata(
  project: DevelopingProject,
): Metadata {
  const path = `/properties/developing/${project.slug}`;
  const description = truncate(
    project.longDescription ||
      project.description ||
      `Pre-launch investment at ${project.location}. ${project.progress}% complete, expected ${project.completion}. ${project.leaseLabel}.`,
  );

  return buildPageMetadata({
    title: `${project.title} — Off-Plan Investment in ${project.location}`,
    description,
    path,
    image: project.gallery.hero || project.image,
    imageAlt: `${project.title} — developing property in ${project.location}, Lagos`,
    type: "article",
    keywords: [
      project.title,
      project.location,
      "off-plan property Lagos",
      "property investment Lagos",
      "developing projects Lagos",
      "Searcher Properties",
      ...DEFAULT_KEYWORDS,
    ],
  });
}
