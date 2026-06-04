import { getSanityClient } from "@/sanity/lib/client";
import {
  allPropertySlugsQuery,
  featuredPropertiesQuery,
  propertiesByTypeQuery,
  propertyBySlugQuery,
} from "@/sanity/lib/queries";
import { isSanityConfigured } from "@/sanity/env";
import {
  mapToDeveloped,
  mapToDeveloping,
  mapToFeatured,
  mapToShortlet,
  withGalleryFallback,
} from "./map";
import {
  STATIC_DEVELOPED,
  STATIC_DEVELOPING,
  STATIC_FEATURED,
  STATIC_SHORTLETS,
} from "./static";
import type {
  DevelopedProperty,
  DevelopingProject,
  FeaturedProperty,
  PropertyType,
  SanityPropertyDoc,
  Shortlet,
} from "./types";

export const SANITY_REVALIDATE_SECONDS = 60;

async function fetchByType(type: PropertyType): Promise<SanityPropertyDoc[]> {
  if (!isSanityConfigured()) return [];
  try {
    return await getSanityClient().fetch<SanityPropertyDoc[]>(
      propertiesByTypeQuery,
      { type },
      { next: { revalidate: SANITY_REVALIDATE_SECONDS } },
    );
  } catch {
    return [];
  }
}

export async function getShortlets(): Promise<Shortlet[]> {
  const docs = await fetchByType("shortlet");
  const mapped = docs
    .map(mapToShortlet)
    .filter((item): item is Shortlet => item !== null)
    .map(withGalleryFallback);
  return mapped.length > 0 ? mapped : STATIC_SHORTLETS;
}

export async function getDevelopedProperties(): Promise<DevelopedProperty[]> {
  const docs = await fetchByType("developed");
  const mapped = docs
    .map(mapToDeveloped)
    .filter((item): item is DevelopedProperty => item !== null)
    .map(withGalleryFallback);
  return mapped.length > 0 ? mapped : STATIC_DEVELOPED;
}

export async function getDevelopingProjects(): Promise<DevelopingProject[]> {
  const docs = await fetchByType("developing");
  const mapped = docs
    .map(mapToDeveloping)
    .filter((item): item is DevelopingProject => item !== null)
    .map(withGalleryFallback);
  return mapped.length > 0 ? mapped : STATIC_DEVELOPING;
}

export async function getFeaturedProperties(): Promise<FeaturedProperty[]> {
  if (!isSanityConfigured()) return STATIC_FEATURED;
  try {
    const docs = await getSanityClient().fetch<SanityPropertyDoc[]>(
      featuredPropertiesQuery,
      {},
      { next: { revalidate: SANITY_REVALIDATE_SECONDS } },
    );
    const mapped = docs
      .map(mapToFeatured)
      .filter((item): item is FeaturedProperty => item !== null);
    return mapped.length > 0 ? mapped : STATIC_FEATURED;
  } catch {
    return STATIC_FEATURED;
  }
}

export async function getPropertyBySlug(
  slug: string,
): Promise<SanityPropertyDoc | null> {
  if (!isSanityConfigured()) return null;
  try {
    return await getSanityClient().fetch<SanityPropertyDoc | null>(
      propertyBySlugQuery,
      { slug },
      { next: { revalidate: SANITY_REVALIDATE_SECONDS } },
    );
  } catch {
    return null;
  }
}

export async function getShortletBySlug(
  slug: string,
): Promise<Shortlet | undefined> {
  const doc = await getPropertyBySlug(slug);
  if (doc) {
    const mapped = mapToShortlet(doc);
    if (mapped) return withGalleryFallback(mapped);
  }
  return STATIC_SHORTLETS.find((s) => s.slug === slug);
}

export async function getDevelopedBySlug(
  slug: string,
): Promise<DevelopedProperty | undefined> {
  const doc = await getPropertyBySlug(slug);
  if (doc) {
    const mapped = mapToDeveloped(doc);
    if (mapped) return withGalleryFallback(mapped);
  }
  return STATIC_DEVELOPED.find((p) => p.slug === slug);
}

export async function getDevelopingBySlug(
  slug: string,
): Promise<DevelopingProject | undefined> {
  const doc = await getPropertyBySlug(slug);
  if (doc) {
    const mapped = mapToDeveloping(doc);
    if (mapped) return withGalleryFallback(mapped);
  }
  return STATIC_DEVELOPING.find((p) => p.slug === slug);
}

export async function getSlugsByType(
  type: PropertyType,
): Promise<{ slug: string }[]> {
  if (!isSanityConfigured()) {
    const list =
      type === "shortlet"
        ? STATIC_SHORTLETS
        : type === "developed"
          ? STATIC_DEVELOPED
          : STATIC_DEVELOPING;
    return list.map((p) => ({ slug: p.slug }));
  }
  try {
    const slugs = await getSanityClient().fetch<{ slug: string }[]>(
      allPropertySlugsQuery,
      { type },
      { next: { revalidate: SANITY_REVALIDATE_SECONDS } },
    );
    if (slugs.length > 0) return slugs;
  } catch {
    /* fallback below */
  }
  const list =
    type === "shortlet"
      ? STATIC_SHORTLETS
      : type === "developed"
        ? STATIC_DEVELOPED
        : STATIC_DEVELOPING;
  return list.map((p) => ({ slug: p.slug }));
}
