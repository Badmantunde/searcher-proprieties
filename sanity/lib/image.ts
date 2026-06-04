import imageUrlBuilder from "@sanity/image-url";
import { isSanityConfigured } from "../env";
import { getSanityClient } from "./client";

type SanityImageSource = Parameters<
  ReturnType<typeof imageUrlBuilder>["image"]
>[0];

export function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(getSanityClient()).image(source);
}

export function sanityImageUrl(
  source: SanityImageSource | null | undefined,
  width?: number,
): string | undefined {
  if (!source || !isSanityConfigured()) return undefined;
  let img = urlFor(source).auto("format").quality(85);
  if (width) img = img.width(width);
  return img.url();
}
