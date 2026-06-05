"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { DevelopingUnit, PropertyFormInput, PropertyType } from "@/lib/properties/types";
import { slugify } from "@/lib/slugify";

const BUCKET = "property-images";

export type ActionResult = { error?: string; success?: string };

async function uploadImage(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File,
  folder: string,
): Promise<string | null> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage.from(BUCKET).upload(path, buffer, {
    contentType: file.type || "image/jpeg",
    upsert: false,
  });

  if (error) return null;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

function parseUnits(raw: string | null): DevelopingUnit[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as DevelopingUnit[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function parseAmenities(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function buildPayload(
  formData: FormData,
  urls: {
    card_image_url: string;
    gallery_hero_url: string;
    gallery_thumbnail_urls: string[];
  },
): PropertyFormInput {
  const property_type = formData.get("property_type") as PropertyType;
  const progressRaw = formData.get("progress");

  return {
    slug: slugify(String(formData.get("slug") || formData.get("title") || "")),
    property_type,
    title: String(formData.get("title") || ""),
    location: String(formData.get("location") || ""),
    description: String(formData.get("description") || ""),
    long_description: String(formData.get("long_description") || ""),
    card_image_url: urls.card_image_url,
    gallery_hero_url: urls.gallery_hero_url,
    gallery_thumbnail_urls: urls.gallery_thumbnail_urls,
    price_range: String(formData.get("price_range") || "") || undefined,
    amenities: parseAmenities(formData.get("amenities") as string | null),
    lease_label: String(formData.get("lease_label") || "") || undefined,
    progress: progressRaw ? Number(progressRaw) : undefined,
    completion: String(formData.get("completion") || "") || undefined,
    units: parseUnits(formData.get("units") as string | null),
    featured: formData.get("featured") === "on",
    featured_primary_badge:
      String(formData.get("featured_primary_badge") || "") || undefined,
    featured_secondary_badge:
      String(formData.get("featured_secondary_badge") || "") || undefined,
    published: formData.get("published") === "on",
  };
}

async function resolveImageUrls(
  formData: FormData,
  existing?: {
    card_image_url: string;
    gallery_hero_url: string;
    gallery_thumbnail_urls: string[];
  },
) {
  const supabase = await createClient();
  const folder = slugify(String(formData.get("slug") || "property"));

  const cardFile = formData.get("card_image") as File | null;
  let card_image_url = existing?.card_image_url ?? "";
  if (cardFile && cardFile.size > 0) {
    const uploaded = await uploadImage(supabase, cardFile, folder);
    if (uploaded) card_image_url = uploaded;
  }

  const heroFile = formData.get("gallery_hero") as File | null;
  let gallery_hero_url = existing?.gallery_hero_url ?? "";
  if (heroFile && heroFile.size > 0) {
    const uploaded = await uploadImage(supabase, heroFile, folder);
    if (uploaded) gallery_hero_url = uploaded;
  }

  const gallery_thumbnail_urls = [...(existing?.gallery_thumbnail_urls ?? [])];
  const thumbFiles = formData.getAll("gallery_thumbnails") as File[];
  for (const file of thumbFiles) {
    if (file.size > 0) {
      const uploaded = await uploadImage(supabase, file, folder);
      if (uploaded) gallery_thumbnail_urls.push(uploaded);
    }
  }

  return { card_image_url, gallery_hero_url, gallery_thumbnail_urls };
}

function validatePayload(payload: PropertyFormInput): string | null {
  if (!payload.title.trim()) return "Title is required.";
  if (!payload.slug.trim()) return "Slug is required.";
  if (!payload.location.trim()) return "Location is required.";
  if (!payload.description.trim()) return "Short description is required.";
  if (!payload.long_description.trim()) return "Full description is required.";
  if (!payload.card_image_url) return "Card image is required.";
  if (!payload.gallery_hero_url) return "Gallery hero image is required.";
  return null;
}

function dbRecord(payload: PropertyFormInput) {
  return {
    slug: payload.slug,
    property_type: payload.property_type,
    title: payload.title,
    location: payload.location,
    description: payload.description,
    long_description: payload.long_description,
    card_image_url: payload.card_image_url,
    gallery_hero_url: payload.gallery_hero_url,
    gallery_thumbnail_urls: payload.gallery_thumbnail_urls,
    price_range: payload.property_type === "developed" ? payload.price_range : null,
    amenities: payload.property_type === "developed" ? payload.amenities : [],
    lease_label: payload.property_type === "developing" ? payload.lease_label : null,
    progress: payload.property_type === "developing" ? payload.progress : null,
    completion: payload.property_type === "developing" ? payload.completion : null,
    units: payload.property_type === "developing" ? payload.units : [],
    featured: payload.featured ?? false,
    featured_primary_badge: payload.featured_primary_badge ?? null,
    featured_secondary_badge: payload.featured_secondary_badge ?? null,
    published: payload.published ?? false,
  };
}

function revalidateSite() {
  revalidatePath("/");
  revalidatePath("/properties");
  revalidatePath("/properties/developed");
  revalidatePath("/properties/developing");
}

export async function loginAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: error.message };

  redirect("/admin/properties");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function createPropertyAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const urls = await resolveImageUrls(formData);
  const payload = buildPayload(formData, urls);
  const validationError = validatePayload(payload);
  if (validationError) return { error: validationError };

  const supabase = await createClient();
  const { error } = await supabase.from("properties").insert(dbRecord(payload));

  if (error) return { error: error.message };

  revalidateSite();
  redirect("/admin/properties");
}

export async function updatePropertyAction(
  id: string,
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!existing) return { error: "Property not found." };

  const urls = await resolveImageUrls(formData, {
    card_image_url: existing.card_image_url,
    gallery_hero_url: existing.gallery_hero_url,
    gallery_thumbnail_urls: existing.gallery_thumbnail_urls ?? [],
  });

  const payload = buildPayload(formData, urls);
  const validationError = validatePayload(payload);
  if (validationError) return { error: validationError };

  const { error } = await supabase
    .from("properties")
    .update(dbRecord(payload))
    .eq("id", id);

  if (error) return { error: error.message };

  revalidateSite();
  redirect("/admin/properties");
}

export async function deletePropertyAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("properties").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidateSite();
  redirect("/admin/properties");
}

export async function removeGalleryThumbnailAction(
  propertyId: string,
  url: string,
): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("properties")
    .select("gallery_thumbnail_urls")
    .eq("id", propertyId)
    .maybeSingle();

  if (!existing) return { error: "Property not found." };

  const gallery_thumbnail_urls = (existing.gallery_thumbnail_urls as string[]).filter(
    (item) => item !== url,
  );

  const { error } = await supabase
    .from("properties")
    .update({ gallery_thumbnail_urls })
    .eq("id", propertyId);

  if (error) return { error: error.message };

  revalidateSite();
  return { success: "Thumbnail removed." };
}
