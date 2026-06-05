import { APT_DETAILS_GALLERY } from "@/app/components/properties-page/gallery";
import type {
  DevelopedProperty,
  DevelopingProject,
  DevelopingUnit,
  FeaturedProperty,
  PropertyRow,
} from "./types";

function parseUnits(raw: unknown): DevelopingUnit[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (u): u is DevelopingUnit =>
      typeof u === "object" &&
      u !== null &&
      "type" in u &&
      "price" in u &&
      typeof (u as DevelopingUnit).type === "string",
  );
}

function parseStringArray(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((v): v is string => typeof v === "string");
}

function galleryFromRow(row: PropertyRow) {
  return {
    hero: row.gallery_hero_url,
    thumbnails: row.gallery_thumbnail_urls ?? [],
  };
}

export function normalizePropertyRow(row: Record<string, unknown>): PropertyRow {
  return {
    id: String(row.id),
    slug: String(row.slug),
    property_type: row.property_type as PropertyRow["property_type"],
    title: String(row.title),
    location: String(row.location),
    description: String(row.description),
    long_description: String(row.long_description),
    card_image_url: String(row.card_image_url),
    gallery_hero_url: String(row.gallery_hero_url),
    gallery_thumbnail_urls: parseStringArray(row.gallery_thumbnail_urls),
    price_range: row.price_range ? String(row.price_range) : null,
    amenities: parseStringArray(row.amenities),
    lease_label: row.lease_label ? String(row.lease_label) : null,
    progress: typeof row.progress === "number" ? row.progress : null,
    completion: row.completion ? String(row.completion) : null,
    units: parseUnits(row.units),
    featured: Boolean(row.featured),
    featured_primary_badge: row.featured_primary_badge
      ? String(row.featured_primary_badge)
      : null,
    featured_secondary_badge: row.featured_secondary_badge
      ? String(row.featured_secondary_badge)
      : null,
    published: Boolean(row.published),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

export function rowToDeveloped(row: PropertyRow): DevelopedProperty | null {
  if (row.property_type !== "developed") return null;
  return {
    slug: row.slug,
    image: row.card_image_url,
    location: row.location,
    title: row.title,
    description: row.description,
    longDescription: row.long_description,
    priceRange: row.price_range ?? "",
    amenities: row.amenities,
    gallery: galleryFromRow(row),
  };
}

export function rowToDeveloping(row: PropertyRow): DevelopingProject | null {
  if (row.property_type !== "developing") return null;
  return {
    slug: row.slug,
    image: row.card_image_url,
    location: row.location,
    leaseLabel: row.lease_label ?? "25 Years Lease",
    title: row.title,
    description: row.description,
    longDescription: row.long_description,
    units: row.units,
    progress: row.progress ?? 0,
    completion: row.completion ?? "TBA",
    gallery: galleryFromRow(row),
  };
}

export function rowToFeatured(row: PropertyRow): FeaturedProperty | null {
  if (!row.featured) return null;

  const defaultBadges: Record<
    PropertyRow["property_type"],
    { primary: string; secondary: string }
  > = {
    developed: { primary: "Developed", secondary: "Completed" },
    developing: {
      primary: row.lease_label ?? "Developing",
      secondary: row.progress ? `${row.progress}% Complete` : "In progress",
    },
  };

  const badges = defaultBadges[row.property_type];

  return {
    image: row.card_image_url,
    primaryBadge: row.featured_primary_badge ?? badges.primary,
    secondaryBadge: row.featured_secondary_badge ?? badges.secondary,
    location: row.location,
    title: row.title,
    description: row.description,
    detailHref: `/properties/${row.property_type}/${row.slug}`,
  };
}

export function withGalleryFallback<T extends { gallery: { hero: string; thumbnails: string[] } }>(
  item: T,
): T {
  if (item.gallery.hero) return item;
  return { ...item, gallery: APT_DETAILS_GALLERY };
}
