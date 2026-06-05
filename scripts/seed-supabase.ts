/**
 * Seeds Supabase with demo properties from static data. Run: npm run seed
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, createReadStream } from "node:fs";
import { basename, join } from "node:path";
import { config } from "dotenv";
import {
  STATIC_DEVELOPED,
  STATIC_DEVELOPING,
  STATIC_FEATURED,
} from "../lib/properties/static";

config({ path: join(process.cwd(), ".env.local") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey);
const BUCKET = "property-images";

async function uploadPublicImage(relativePath: string): Promise<string> {
  const filePath = join(process.cwd(), "public", relativePath.replace(/^\//, ""));
  const ext = basename(filePath).split(".").pop() || "png";
  const storagePath = `seed/${crypto.randomUUID()}.${ext}`;
  const buffer = readFileSync(filePath);

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buffer, {
      contentType: `image/${ext === "svg" ? "svg+xml" : ext}`,
      upsert: true,
    });

  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
  return data.publicUrl;
}

async function main() {
  console.log("Seeding Supabase…");

  for (const p of STATIC_DEVELOPED) {
    const card = await uploadPublicImage(p.image);
    const hero = await uploadPublicImage(p.gallery.hero);
    const thumbs = [];
    for (const t of p.gallery.thumbnails) {
      thumbs.push(await uploadPublicImage(t));
    }

    const { error } = await supabase.from("properties").upsert(
      {
        slug: p.slug,
        property_type: "developed",
        title: p.title,
        location: p.location,
        description: p.description,
        long_description: p.longDescription,
        card_image_url: card,
        gallery_hero_url: hero,
        gallery_thumbnail_urls: thumbs,
        price_range: p.priceRange,
        amenities: p.amenities,
        published: true,
      },
      { onConflict: "slug" },
    );
    if (error) throw error;
    console.log(`Developed: ${p.title}`);
  }

  for (const p of STATIC_DEVELOPING) {
    const card = await uploadPublicImage(p.image);
    const hero = await uploadPublicImage(p.gallery.hero);
    const thumbs = [];
    for (const t of p.gallery.thumbnails) {
      thumbs.push(await uploadPublicImage(t));
    }

    const { error } = await supabase.from("properties").upsert(
      {
        slug: p.slug,
        property_type: "developing",
        title: p.title,
        location: p.location,
        description: p.description,
        long_description: p.longDescription,
        card_image_url: card,
        gallery_hero_url: hero,
        gallery_thumbnail_urls: thumbs,
        lease_label: p.leaseLabel,
        progress: p.progress,
        completion: p.completion,
        units: p.units,
        published: true,
      },
      { onConflict: "slug" },
    );
    if (error) throw error;
    console.log(`Developing: ${p.title}`);
  }

  for (const f of STATIC_FEATURED) {
    const slug = f.detailHref.split("/").pop();
    const { error } = await supabase
      .from("properties")
      .update({
        featured: true,
        featured_primary_badge: f.primaryBadge,
        featured_secondary_badge: f.secondaryBadge,
      })
      .eq("slug", slug);
    if (error) console.warn(`Featured skip ${slug}:`, error.message);
    else console.log(`Featured: ${slug}`);
  }

  console.log("Done. Sign in at /admin to manage listings.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
