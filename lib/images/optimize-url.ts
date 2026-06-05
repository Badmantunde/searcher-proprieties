type ImageSize = "hero" | "thumb" | "card";

/**
 * Returns the original image URL. Next.js `<Image>` handles resizing
 * and format optimization for Supabase public storage URLs.
 */
export function optimizeImageUrl(url: string, _size: ImageSize = "card"): string {
  return url;
}
