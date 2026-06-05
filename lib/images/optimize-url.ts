type ImageSize = "hero" | "thumb" | "card";

const SIZE_PRESETS: Record<ImageSize, { width: number; quality: number }> = {
  hero: { width: 1920, quality: 80 },
  thumb: { width: 320, quality: 75 },
  card: { width: 800, quality: 80 },
};

function toSupabaseRenderUrl(
  url: string,
  width: number,
  quality: number,
): string | null {
  const marker = "/storage/v1/object/public/";
  const idx = url.indexOf(marker);
  if (idx === -1) return null;

  const base = url.slice(0, idx);
  const path = url.slice(idx + marker.length);
  const params = new URLSearchParams({
    width: String(width),
    quality: String(quality),
    resize: "contain",
  });

  return `${base}/storage/v1/render/image/public/${path}?${params.toString()}`;
}

export function optimizeImageUrl(url: string, size: ImageSize = "card"): string {
  if (!url) return url;

  const preset = SIZE_PRESETS[size];
  const rendered = toSupabaseRenderUrl(url, preset.width, preset.quality);
  return rendered ?? url;
}
