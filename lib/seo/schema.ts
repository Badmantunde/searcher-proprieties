import { CONTACT, SOCIAL } from "@/app/lib/links";
import type { DevelopedProperty, DevelopingProject } from "@/lib/properties/types";
import { absoluteUrl } from "./metadata";
import { SITE_LOGO, SITE_NAME, SITE_URL } from "./site";

type JsonLd = Record<string, unknown>;

function parseNairaAmount(value: string): number | null {
  const cleaned = value.replace(/[₦,\s]/g, "");
  const match = cleaned.match(/^([\d.]+)([KMB])?/i);
  if (!match) return null;

  const amount = Number.parseFloat(match[1]);
  if (Number.isNaN(amount)) return null;

  const suffix = (match[2] ?? "").toUpperCase();
  const multipliers: Record<string, number> = {
    K: 1_000,
    M: 1_000_000,
    B: 1_000_000_000,
  };

  return Math.round(amount * (multipliers[suffix] ?? 1));
}

function buildOffersFromPriceLabel(priceLabel: string): JsonLd | undefined {
  const parts = priceLabel.split(/\s*-\s*/).map((part) => part.trim());
  const prices = parts
    .map(parseNairaAmount)
    .filter((price): price is number => price !== null);

  if (!prices.length) return undefined;

  if (prices.length === 1) {
    return {
      "@type": "Offer",
      priceCurrency: "NGN",
      price: prices[0],
      availability: "https://schema.org/InStock",
    };
  }

  return {
    "@type": "AggregateOffer",
    priceCurrency: "NGN",
    lowPrice: Math.min(...prices),
    highPrice: Math.max(...prices),
    offerCount: 1,
    availability: "https://schema.org/InStock",
  };
}

function propertyAddress(location: string): JsonLd {
  return {
    "@type": "PostalAddress",
    streetAddress: location,
    addressLocality: "Lagos",
    addressRegion: "Lagos",
    addressCountry: "NG",
  };
}

function listingProvider(): JsonLd {
  return {
    "@type": "RealEstateAgent",
    name: SITE_NAME,
    url: SITE_URL,
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
  };
}

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "RealEstateAgent"],
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(SITE_LOGO),
    image: absoluteUrl("/image/OG.png"),
    description:
      "Searcher Properties is a trusted Lagos real estate company delivering premium developments and smart property investments.",
    email: CONTACT.email,
    telephone: CONTACT.phoneE164,
    address: propertyAddress(CONTACT.officeAddress),
    sameAs: [SOCIAL.instagram],
    areaServed: {
      "@type": "City",
      name: "Lagos",
      containedInPlace: {
        "@type": "Country",
        name: "Nigeria",
      },
    },
  };
}

export function developedListingSchema(property: DevelopedProperty): JsonLd {
  const url = absoluteUrl(`/properties/developed/${property.slug}`);
  const images = [
    property.gallery.hero,
    property.image,
    ...property.gallery.thumbnails.slice(0, 3),
  ]
    .filter(Boolean)
    .map(absoluteUrl);

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.longDescription || property.description,
    url,
    image: images.length ? images : undefined,
    address: propertyAddress(property.location),
    offers: buildOffersFromPriceLabel(property.priceRange),
    amenityFeature: property.amenities.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    provider: listingProvider(),
  };
}

export function developingListingSchema(project: DevelopingProject): JsonLd {
  const url = absoluteUrl(`/properties/developing/${project.slug}`);
  const priceLabel =
    project.units[0]?.price ??
    project.units.map((unit) => unit.price).join(" - ");
  const images = [
    project.gallery.hero,
    project.image,
    ...project.gallery.thumbnails.slice(0, 3),
  ]
    .filter(Boolean)
    .map(absoluteUrl);

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: project.title,
    description:
      project.longDescription ||
      `${project.description} ${project.progress}% complete, expected ${project.completion}.`,
    url,
    image: images.length ? images : undefined,
    address: propertyAddress(project.location),
    offers: priceLabel ? buildOffersFromPriceLabel(priceLabel) : undefined,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Development progress",
        value: `${project.progress}%`,
      },
      {
        "@type": "PropertyValue",
        name: "Expected completion",
        value: project.completion,
      },
      {
        "@type": "PropertyValue",
        name: "Lease type",
        value: project.leaseLabel,
      },
    ],
    provider: listingProvider(),
  };
}
