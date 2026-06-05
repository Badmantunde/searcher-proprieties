import type { SupabaseClient } from "@supabase/supabase-js";

const BUCKET = "property-images";

export async function uploadPropertyImage(
  supabase: SupabaseClient,
  file: File,
  folder: string,
): Promise<{ url: string | null; error?: string }> {
  const safeFolder = folder.replace(/[^a-z0-9-]/g, "-") || "property";
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${safeFolder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type || "image/jpeg",
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    return { url: null, error: error.message };
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl };
}
