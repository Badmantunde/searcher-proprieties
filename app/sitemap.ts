import type { MetadataRoute } from "next";
import { getPublishedPropertiesForSitemap } from "@/lib/properties/fetch";

const SITE_URL = "https://searcherproperties.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getPublishedPropertiesForSitemap();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/properties`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/properties/developed`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/properties/developing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/videos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  const propertyPages: MetadataRoute.Sitemap = properties.map(
    ({ slug, property_type, updated_at }) => ({
      url: `${SITE_URL}/properties/${property_type}/${slug}`,
      lastModified: new Date(updated_at),
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  return [...staticPages, ...propertyPages];
}
