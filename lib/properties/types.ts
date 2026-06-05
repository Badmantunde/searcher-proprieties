import type { Gallery } from "@/app/components/properties-page/gallery";

export type PropertyType = "developed" | "developing";

export type DevelopingUnit = {
  type: string;
  rental: string;
  price: string;
};

export type DevelopedProperty = {
  slug: string;
  image: string;
  location: string;
  title: string;
  description: string;
  longDescription: string;
  priceRange: string;
  amenities: string[];
  gallery: Gallery;
};

export type DevelopingProject = {
  slug: string;
  image: string;
  location: string;
  leaseLabel: string;
  title: string;
  description: string;
  longDescription: string;
  units: DevelopingUnit[];
  progress: number;
  completion: string;
  gallery: Gallery;
};

export type FeaturedProperty = {
  image: string;
  primaryBadge: string;
  secondaryBadge: string;
  location: string;
  title: string;
  description: string;
  detailHref: string;
};

export type PropertyRow = {
  id: string;
  slug: string;
  property_type: PropertyType;
  title: string;
  location: string;
  description: string;
  long_description: string;
  card_image_url: string;
  gallery_hero_url: string;
  gallery_thumbnail_urls: string[];
  price_range: string | null;
  amenities: string[];
  lease_label: string | null;
  progress: number | null;
  completion: string | null;
  units: DevelopingUnit[];
  featured: boolean;
  featured_primary_badge: string | null;
  featured_secondary_badge: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type PropertyFormInput = {
  slug: string;
  property_type: PropertyType;
  title: string;
  location: string;
  description: string;
  long_description: string;
  card_image_url: string;
  gallery_hero_url: string;
  gallery_thumbnail_urls: string[];
  price_range?: string;
  amenities?: string[];
  lease_label?: string;
  progress?: number;
  completion?: string;
  units?: DevelopingUnit[];
  featured?: boolean;
  featured_primary_badge?: string;
  featured_secondary_badge?: string;
  published?: boolean;
};
