import { sanityImageUrl } from "@/sanity/lib/image";
import type { Gallery } from "@/app/components/properties-page/gallery";
import { APT_DETAILS_GALLERY } from "@/app/components/properties-page/gallery";
import type {
  DevelopedProperty,
  DevelopingProject,
  FeaturedProperty,
  SanityPropertyDoc,
  Shortlet,
} from "./types";

function mapGallery(
  gallery: SanityPropertyDoc["gallery"],
): Gallery | undefined {
  if (!gallery?.hero) return undefined;
  const hero = sanityImageUrl(gallery.hero, 2400);
  if (!hero) return undefined;
  const thumbnails =
    gallery.images
      ?.map((img) => sanityImageUrl(img, 1200))
      .filter((url): url is string => Boolean(url)) ?? [];
  return { hero, thumbnails };
}

function mapCardImage(doc: SanityPropertyDoc): string | undefined {
  return sanityImageUrl(doc.cardImage, 1200);
}

function detailPath(type: SanityPropertyDoc["propertyType"], slug: string) {
  return `/properties/${type}/${slug}`;
}

export function mapToShortlet(doc: SanityPropertyDoc): Shortlet | null {
  if (doc.propertyType !== "shortlet") return null;
  const image = mapCardImage(doc);
  const gallery = mapGallery(doc.gallery);
  if (!image || !gallery || !doc.bedrooms || !doc.rate) return null;
  return {
    slug: doc.slug,
    image,
    bedrooms: doc.bedrooms,
    rate: doc.rate,
    location: doc.location,
    title: doc.title,
    description: doc.description,
    longDescription: doc.longDescription,
    gallery,
  };
}

export function mapToDeveloped(doc: SanityPropertyDoc): DevelopedProperty | null {
  if (doc.propertyType !== "developed") return null;
  const image = mapCardImage(doc);
  const gallery = mapGallery(doc.gallery);
  if (!image || !gallery || !doc.priceRange) return null;
  return {
    slug: doc.slug,
    image,
    location: doc.location,
    title: doc.title,
    description: doc.description,
    longDescription: doc.longDescription,
    priceRange: doc.priceRange,
    amenities: doc.amenities ?? [],
    gallery,
  };
}

export function mapToDeveloping(doc: SanityPropertyDoc): DevelopingProject | null {
  if (doc.propertyType !== "developing") return null;
  const image = mapCardImage(doc);
  const gallery = mapGallery(doc.gallery);
  if (!image || !gallery) return null;
  return {
    slug: doc.slug,
    image,
    location: doc.location,
    leaseLabel: doc.leaseLabel ?? "25 Years Lease",
    title: doc.title,
    description: doc.description,
    longDescription: doc.longDescription,
    units: doc.units ?? [],
    progress: doc.progress ?? 0,
    completion: doc.completion ?? "TBA",
    gallery,
  };
}

export function mapToFeatured(doc: SanityPropertyDoc): FeaturedProperty | null {
  if (!doc.featured) return null;
  const image = mapCardImage(doc);
  if (!image) return null;

  const defaultBadges: Record<
    SanityPropertyDoc["propertyType"],
    { primary: string; secondary: string }
  > = {
    shortlet: { primary: "Shortlet", secondary: "Available" },
    developed: { primary: "Developed", secondary: "Completed" },
    developing: {
      primary: doc.leaseLabel ?? "Developing",
      secondary: doc.progress ? `${doc.progress}% Complete` : "In progress",
    },
  };

  const badges = defaultBadges[doc.propertyType];

  return {
    image,
    primaryBadge: doc.featuredPrimaryBadge ?? badges.primary,
    secondaryBadge: doc.featuredSecondaryBadge ?? badges.secondary,
    location: doc.location,
    title: doc.title,
    description: doc.description,
    detailHref: detailPath(doc.propertyType, doc.slug),
  };
}

/** Fallback gallery when Sanity images are missing during migration */
export function withGalleryFallback<T extends { gallery: Gallery }>(
  item: T,
): T {
  if (item.gallery.hero) return item;
  return { ...item, gallery: APT_DETAILS_GALLERY };
}
