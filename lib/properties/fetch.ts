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

export async function getDevelopedProperties(): Promise<DevelopedProperty[]> {
  const rows = await fetchPublishedByType("developed");
  const mapped = rows
    .map(rowToDeveloped)
    .filter((item): item is DevelopedProperty => item !== null)
    .map(withGalleryFallback);
  return mapped.length > 0 ? mapped : STATIC_DEVELOPED;
}

export async function getDevelopingProjects(): Promise<DevelopingProject[]> {
  const rows = await fetchPublishedByType("developing");
  const mapped = rows
    .map(rowToDeveloping)
    .filter((item): item is DevelopingProject => item !== null)
    .map(withGalleryFallback);
  return mapped.length > 0 ? mapped : STATIC_DEVELOPING;
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

  if (error || !data?.length) return STATIC_FEATURED;

  const mapped = data
    .map((row) => rowToFeatured(normalizePropertyRow(row)))
    .filter((item): item is FeaturedProperty => item !== null);

  return mapped.length > 0 ? mapped : STATIC_FEATURED;
}

export async function getDevelopedBySlug(
  slug: string,
): Promise<DevelopedProperty | undefined> {
  const row = await getPropertyRowBySlug(slug, "developed");
  if (row) {
    const mapped = rowToDeveloped(row);
    if (mapped) return withGalleryFallback(mapped);
  }
  return STATIC_DEVELOPED.find((p) => p.slug === slug);
}

export async function getDevelopingBySlug(
  slug: string,
): Promise<DevelopingProject | undefined> {
  const row = await getPropertyRowBySlug(slug, "developing");
  if (row) {
    const mapped = rowToDeveloping(row);
    if (mapped) return withGalleryFallback(mapped);
  }
  return STATIC_DEVELOPING.find((p) => p.slug === slug);
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
  const fallback = type === "developed" ? STATIC_DEVELOPED : STATIC_DEVELOPING;

  if (!isSupabaseConfigured()) {
    return fallback.map((p) => ({ slug: p.slug }));
  }

  const supabase = getPublicClientOrNull();
  if (!supabase) {
    return fallback.map((p) => ({ slug: p.slug }));
  }

  const { data, error } = await supabase
    .from("properties")
    .select("slug")
    .eq("property_type", type)
    .eq("published", true);

  if (error || !data?.length) {
    return fallback.map((p) => ({ slug: p.slug }));
  }

  return data.map((row) => ({ slug: row.slug as string }));
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
