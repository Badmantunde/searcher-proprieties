import type { Gallery } from "@/app/components/properties-page/gallery";

export type PropertyType = "shortlet" | "developed" | "developing";

export type DevelopingUnit = {
  type: string;
  rental: string;
  price: string;
};

export type Shortlet = {
  slug: string;
  image: string;
  bedrooms: string;
  rate: string;
  location: string;
  title: string;
  description: string;
  longDescription: string;
  gallery: Gallery;
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

export type SanityPropertyDoc = {
  _id: string;
  propertyType: PropertyType;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  location: string;
  cardImage?: { asset?: { _ref?: string } } | null;
  gallery?: {
    hero?: { asset?: { _ref?: string } } | null;
    images?: Array<{ asset?: { _ref?: string } } | null> | null;
  } | null;
  bedrooms?: string;
  rate?: string;
  priceRange?: string;
  amenities?: string[];
  leaseLabel?: string;
  progress?: number;
  completion?: string;
  units?: DevelopingUnit[];
  featured?: boolean;
  featuredPrimaryBadge?: string;
  featuredSecondaryBadge?: string;
};
