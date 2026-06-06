import { createClient } from "@/lib/supabase/server";
import { getPublicClientOrNull } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  normalizePropertyRow,
  rowToDeveloped,
  rowToDeveloping,
  rowToFeatured,
  withGalleryFallback,
} from "./map";
import {
  STATIC_DEVELOPED,
  STATIC_DEVELOPING,
  STATIC_FEATURED,
} from "./static";
import { developedToSearchItem, developingToSearchItem } from "./search";
import type {
  DevelopedProperty,
  DevelopingProject,
  FeaturedProperty,
  PropertyRow,
  PropertyType,
} from "./types";

export const REVALIDATE_SECONDS = 60;

async function fetchPublishedByType(
  type: PropertyType,
): Promise<PropertyRow[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = getPublicClientOrNull();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("property_type", type)
    .eq("published", true)
    .order("title", { ascending: true });

  if (error || !data) return [];
  return data.map((row) => normalizePropertyRow(row));
}

export async function getSearchableProperties() {
  const [developed, developing] = await Promise.all([
    getDevelopedProperties(),
    getDevelopingProjects(),
  ]);

  return [
    ...developed.map(developedToSearchItem),
    ...developing.map(developingToSearchItem),
  ];
}

export async function getDevelopedProperties(): Promise<DevelopedProperty[]> {
  if (!isSupabaseConfigured()) {
    return STATIC_DEVELOPED;
  }

  const rows = await fetchPublishedByType("developed");
  return rows
    .map(rowToDeveloped)
    .filter((item): item is DevelopedProperty => item !== null)
    .map(withGalleryFallback);
}

export async function getDevelopingProjects(): Promise<DevelopingProject[]> {
  if (!isSupabaseConfigured()) {
    return STATIC_DEVELOPING;
  }

  const rows = await fetchPublishedByType("developing");
  return rows
    .map(rowToDeveloping)
    .filter((item): item is DevelopingProject => item !== null)
    .map(withGalleryFallback);
}

export async function getFeaturedProperties(): Promise<FeaturedProperty[]> {
  if (!isSupabaseConfigured()) return STATIC_FEATURED;

  const supabase = getPublicClientOrNull();
  if (!supabase) return STATIC_FEATURED;

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .order("updated_at", { ascending: false });

  if (error || !data?.length) return [];

  return data
    .map((row) => rowToFeatured(normalizePropertyRow(row)))
    .filter((item): item is FeaturedProperty => item !== null);
}

export async function getDevelopedBySlug(
  slug: string,
): Promise<DevelopedProperty | undefined> {
  const row = await getPropertyRowBySlug(slug, "developed");
  if (row) {
    const mapped = rowToDeveloped(row);
    if (mapped) return withGalleryFallback(mapped);
  }
  if (!isSupabaseConfigured()) {
    return STATIC_DEVELOPED.find((p) => p.slug === slug);
  }
  return undefined;
}

export async function getDevelopingBySlug(
  slug: string,
): Promise<DevelopingProject | undefined> {
  const row = await getPropertyRowBySlug(slug, "developing");
  if (row) {
    const mapped = rowToDeveloping(row);
    if (mapped) return withGalleryFallback(mapped);
  }
  if (!isSupabaseConfigured()) {
    return STATIC_DEVELOPING.find((p) => p.slug === slug);
  }
  return undefined;
}

async function getPropertyRowBySlug(
  slug: string,
  type: PropertyType,
): Promise<PropertyRow | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = getPublicClientOrNull();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .eq("property_type", type)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) return null;
  return normalizePropertyRow(data);
}

export async function getSlugsByType(
  type: PropertyType,
): Promise<{ slug: string }[]> {
  if (!isSupabaseConfigured()) {
    const fallback = type === "developed" ? STATIC_DEVELOPED : STATIC_DEVELOPING;
    return fallback.map((p) => ({ slug: p.slug }));
  }

  const supabase = getPublicClientOrNull();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("properties")
    .select("slug")
    .eq("property_type", type)
    .eq("published", true);

  if (error || !data?.length) return [];

  return data.map((row) => ({ slug: row.slug as string }));
}

export async function getPublishedPropertiesForSitemap(): Promise<
  Array<{ slug: string; property_type: PropertyType; updated_at: string }>
> {
  if (!isSupabaseConfigured()) {
    return [
      ...STATIC_DEVELOPED.map((p) => ({
        slug: p.slug,
        property_type: "developed" as const,
        updated_at: new Date().toISOString(),
      })),
      ...STATIC_DEVELOPING.map((p) => ({
        slug: p.slug,
        property_type: "developing" as const,
        updated_at: new Date().toISOString(),
      })),
    ];
  }

  const supabase = getPublicClientOrNull();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("properties")
    .select("slug, property_type, updated_at")
    .eq("published", true);

  if (error || !data?.length) return [];

  return data.map((row) => ({
    slug: row.slug as string,
    property_type: row.property_type as PropertyType,
    updated_at: row.updated_at as string,
  }));
}

export async function getAllPropertiesAdmin(): Promise<PropertyRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error || !data) return [];
  return data.map((row) => normalizePropertyRow(row));
}

export async function getPropertyByIdAdmin(
  id: string,
): Promise<PropertyRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return normalizePropertyRow(data);
}
