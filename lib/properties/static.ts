import { APT_DETAILS_GALLERY } from "@/app/components/properties-page/gallery";
import type {
  DevelopedProperty,
  DevelopingProject,
  DevelopingUnit,
  FeaturedProperty,
  Shortlet,
} from "./types";

const DEFAULT_SHORTLET_LONG =
  "Elegant fully furnished shortlet apartment perfect for business trips, vacations, and weekend stays. Includes fast Wi-Fi, smart TV, kitchen, power supply, and security.";

const DEFAULT_DEVELOPED_LONG =
  "Luxury apartments built for comfort, style, and long-term value. Spacious interiors, modern finishing, secure environment, and excellent road access.";

const DEFAULT_AMENITIES = [
  "24/7 Security",
  "Gym Security",
  "Private Parking",
  "Swimming Pool",
  "Smart Home System",
  "Garden & Landscaping",
];

const DEFAULT_UNITS: DevelopingUnit[] = [
  { type: "Mini Flat", rental: "Annual Rental: ₦2.2M Yearly", price: "₦17M" },
  { type: "Studio Room", rental: "Annual Rental: ₦2.2M Yearly", price: "₦9M" },
];

const DEFAULT_DEVELOPING_LONG =
  "Secure your future with exclusive early-stage property investments offering exceptional ROI potential and transparent development updates.";

export const STATIC_SHORTLETS: Shortlet[] = [
  {
    slug: "the-maple-shortlet",
    image: "/shortlet-assets/img_7768-2-5.png",
    bedrooms: "2 Bedrooms",
    rate: "₦100,000/night",
    location: "No. 15 Araromi Street, Shomolu",
    title: "The Maple Shortlet",
    description:
      "Luxury apartments built for comfort, style, and long-term value...",
    longDescription: DEFAULT_SHORTLET_LONG,
    gallery: APT_DETAILS_GALLERY,
  },
  {
    slug: "the-maple-shortlet-2",
    image: "/shortlet-assets/img_7768-2-55.png",
    bedrooms: "2 Bedrooms",
    rate: "₦100,000/night",
    location: "No. 15 Araromi Street, Shomolu",
    title: "The Maple Shortlet",
    description:
      "Luxury apartments built for comfort, style, and long-term value...",
    longDescription: DEFAULT_SHORTLET_LONG,
    gallery: APT_DETAILS_GALLERY,
  },
  {
    slug: "the-maple-shortlet-3",
    image: "/shortlet-assets/img_7768-2-105.png",
    bedrooms: "2 Bedrooms",
    rate: "₦100,000/night",
    location: "No. 15 Araromi Street, Shomolu",
    title: "The Maple Shortlet",
    description:
      "Luxury apartments built for comfort, style, and long-term value...",
    longDescription: DEFAULT_SHORTLET_LONG,
    gallery: APT_DETAILS_GALLERY,
  },
  {
    slug: "the-maple-shortlet-4",
    image: "/shortlet-assets/img_7768-2-155.png",
    bedrooms: "2 Bedrooms",
    rate: "₦100,000/night",
    location: "No. 15 Araromi Street, Shomolu",
    title: "The Maple Shortlet",
    description:
      "Luxury apartments built for comfort, style, and long-term value...",
    longDescription: DEFAULT_SHORTLET_LONG,
    gallery: APT_DETAILS_GALLERY,
  },
];

export const STATIC_DEVELOPED: DevelopedProperty[] = [
  {
    slug: "araromi-residences",
    image: "/developed-assets/img_7768-2-18.png",
    location: "No. 15 Araromi Street, Shomolu",
    title: "Araromi Residences",
    description:
      "Luxury apartments built for comfort, style, and long-term value...",
    longDescription: DEFAULT_DEVELOPED_LONG,
    priceRange: "₦450M - ₦850M",
    amenities: DEFAULT_AMENITIES,
    gallery: APT_DETAILS_GALLERY,
  },
  {
    slug: "araromi-residences-2",
    image: "/developed-assets/img_7768-2-75.png",
    location: "No. 15 Araromi Street, Shomolu",
    title: "Araromi Residences",
    description:
      "Luxury apartments built for comfort, style, and long-term value...",
    longDescription: DEFAULT_DEVELOPED_LONG,
    priceRange: "₦450M - ₦850M",
    amenities: DEFAULT_AMENITIES,
    gallery: APT_DETAILS_GALLERY,
  },
  {
    slug: "araromi-residences-3",
    image: "/developed-assets/img_7767-1-132.png",
    location: "No. 15 Araromi Street, Shomolu",
    title: "Araromi Residences",
    description:
      "Luxury apartments built for comfort, style, and long-term value...",
    longDescription: DEFAULT_DEVELOPED_LONG,
    priceRange: "₦450M - ₦850M",
    amenities: DEFAULT_AMENITIES,
    gallery: APT_DETAILS_GALLERY,
  },
  {
    slug: "araromi-residences-4",
    image: "/developed-assets/img_7768-2-189.png",
    location: "No. 15 Araromi Street, Shomolu",
    title: "Araromi Residences",
    description:
      "Luxury apartments built for comfort, style, and long-term value...",
    longDescription: DEFAULT_DEVELOPED_LONG,
    priceRange: "₦450M - ₦850M",
    amenities: DEFAULT_AMENITIES,
    gallery: APT_DETAILS_GALLERY,
  },
];

export const STATIC_DEVELOPING: DevelopingProject[] = [
  {
    slug: "shomolu-modern-living",
    image: "/developing-assets/img_7769-1-32.png",
    location: "No. 15 Araromi Street, Shomolu",
    leaseLabel: "25 Years Lease",
    title: "Shomolu Modern Living Project",
    description:
      "Investment opportunity with high ROI potential in a prime Lagos location...",
    longDescription: DEFAULT_DEVELOPING_LONG,
    units: DEFAULT_UNITS,
    progress: 95,
    completion: "July 2026",
    gallery: APT_DETAILS_GALLERY,
  },
  {
    slug: "maryland-project",
    image: "/developing-assets/node-101.png",
    location: "No. 15 Araromi Street, Shomolu",
    leaseLabel: "25 Years Lease",
    title: "Maryland Project",
    description:
      "Investment opportunity with high ROI potential in a prime Lagos location...",
    longDescription: DEFAULT_DEVELOPING_LONG,
    units: DEFAULT_UNITS,
    progress: 95,
    completion: "July 2026",
    gallery: APT_DETAILS_GALLERY,
  },
  {
    slug: "abule-egba-project",
    image: "/developing-assets/img_7768-2-170.png",
    location: "No. 15 Araromi Street, Shomolu",
    leaseLabel: "25 Years Lease",
    title: "Abule Egba project",
    description:
      "Investment opportunity with high ROI potential in a prime Lagos location...",
    longDescription: DEFAULT_DEVELOPING_LONG,
    units: DEFAULT_UNITS,
    progress: 95,
    completion: "July 2026",
    gallery: APT_DETAILS_GALLERY,
  },
  {
    slug: "yaba-garden-estate",
    image: "/developing-assets/node-239.png",
    location: "No. 15 Araromi Street, Shomolu",
    leaseLabel: "25 Years Lease",
    title: "Yaba Garden Estate",
    description:
      "Investment opportunity with high ROI potential in a prime Lagos location...",
    longDescription: DEFAULT_DEVELOPING_LONG,
    units: DEFAULT_UNITS,
    progress: 95,
    completion: "July 2026",
    gallery: APT_DETAILS_GALLERY,
  },
];

export const STATIC_FEATURED: FeaturedProperty[] = [
  {
    image: "/image/img_7768-2-39.png",
    primaryBadge: "Developed",
    secondaryBadge: "Completed",
    location: "No. 15 Araromi Street, Shomolu",
    title: "Araromi Project",
    description:
      "Own a piece of luxury with us in our beautifully designed residence....",
    detailHref: "/properties/developed/araromi-residences",
  },
  {
    image: "/image/img_7769-1-76.png",
    primaryBadge: "10 Years Lease",
    secondaryBadge: "95% Complete",
    location: "No. 15 Araromi Street, Shomolu",
    title: "Araromi Project",
    description:
      "Own a piece of luxury with us in our beautifully designed residence....",
    detailHref: "/properties/developing/shomolu-modern-living",
  },
  {
    image: "/image/img_7767-1-113.png",
    primaryBadge: "Developed",
    secondaryBadge: "Completed",
    location: "No. 15 Araromi Street, Shomolu",
    title: "Araromi Project",
    description:
      "Own a piece of luxury with us in our beautifully designed residence....",
    detailHref: "/properties/developed/araromi-residences-2",
  },
  {
    image: "/image/img_7770-1-150.png",
    primaryBadge: "10 Years Lease",
    secondaryBadge: "95% Complete",
    location: "No. 15 Araromi Street, Shomolu",
    title: "Araromi Project",
    description:
      "Own a piece of luxury with us in our beautifully designed residence....",
    detailHref: "/properties/developing/maryland-project",
  },
];
