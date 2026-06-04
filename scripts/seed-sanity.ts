/**
 * Seeds Sanity with demo properties. Run: npm run seed
 */
import { createClient } from "@sanity/client";
import { createReadStream } from "node:fs";
import { basename, join } from "node:path";
import { config } from "dotenv";
import {
  STATIC_DEVELOPED,
  STATIC_DEVELOPING,
  STATIC_FEATURED,
  STATIC_SHORTLETS,
} from "../lib/properties/static";

config({ path: join(process.cwd(), ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-06-02",
  token,
  useCdn: false,
});

async function uploadImage(relativePath: string) {
  const filePath = join(process.cwd(), "public", relativePath.replace(/^\//, ""));
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename: basename(filePath),
  });
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } };
}

async function uploadGallery(gallery: { hero: string; thumbnails: string[] }) {
  const hero = await uploadImage(gallery.hero);
  const images = [];
  for (const src of gallery.thumbnails ?? []) {
    images.push(await uploadImage(src));
  }
  return { _type: "gallery" as const, hero, images };
}

function baseDoc(
  item: { slug: string; title: string; location: string; description: string; longDescription: string },
  propertyType: "shortlet" | "developed" | "developing",
) {
  return {
    _type: "property" as const,
    propertyType,
    title: item.title,
    slug: { _type: "slug" as const, current: item.slug },
    location: item.location,
    description: item.description,
    longDescription: item.longDescription,
  };
}

async function main() {
  console.log("Seeding Sanity…");

  for (const s of STATIC_SHORTLETS) {
    await client.create({
      ...baseDoc(s, "shortlet"),
      bedrooms: s.bedrooms,
      rate: s.rate,
      cardImage: await uploadImage(s.image),
      gallery: await uploadGallery(s.gallery),
    });
    console.log(`Created shortlet: ${s.title}`);
  }

  for (const p of STATIC_DEVELOPED) {
    await client.create({
      ...baseDoc(p, "developed"),
      priceRange: p.priceRange,
      amenities: p.amenities,
      cardImage: await uploadImage(p.image),
      gallery: await uploadGallery(p.gallery),
    });
    console.log(`Created developed: ${p.title}`);
  }

  for (const p of STATIC_DEVELOPING) {
    await client.create({
      ...baseDoc(p, "developing"),
      leaseLabel: p.leaseLabel,
      units: p.units.map((u) => ({
        _type: "developingUnit" as const,
        _key: u.type.toLowerCase().replace(/\s+/g, "-"),
        ...u,
      })),
      progress: p.progress,
      completion: p.completion,
      cardImage: await uploadImage(p.image),
      gallery: await uploadGallery(p.gallery),
    });
    console.log(`Created developing: ${p.title}`);
  }

  for (const f of STATIC_FEATURED) {
    const slug = f.detailHref.split("/").pop();
    const existing = await client.fetch<string | null>(
      `*[_type == "property" && slug.current == $slug][0]._id`,
      { slug },
    );
    if (!existing) continue;
    await client
      .patch(existing)
      .set({
        featured: true,
        featuredPrimaryBadge: f.primaryBadge,
        featuredSecondaryBadge: f.secondaryBadge,
      })
      .commit();
    console.log(`Marked featured: ${slug}`);
  }

  console.log("Done. Open /studio and Publish documents.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
