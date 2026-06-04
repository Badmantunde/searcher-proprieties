export const propertyFields = /* groq */ `
  _id,
  propertyType,
  "slug": slug.current,
  title,
  description,
  longDescription,
  location,
  cardImage,
  gallery,
  bedrooms,
  rate,
  priceRange,
  amenities,
  leaseLabel,
  progress,
  completion,
  units,
  featured,
  featuredPrimaryBadge,
  featuredSecondaryBadge
`;

export const propertiesByTypeQuery = /* groq */ `
  *[_type == "property" && propertyType == $type && defined(slug.current)]
  | order(title asc) {
    ${propertyFields}
  }
`;

export const propertyBySlugQuery = /* groq */ `
  *[_type == "property" && slug.current == $slug][0] {
    ${propertyFields}
  }
`;

export const allPropertySlugsQuery = /* groq */ `
  *[_type == "property" && propertyType == $type && defined(slug.current)] {
    "slug": slug.current
  }
`;

export const featuredPropertiesQuery = /* groq */ `
  *[_type == "property" && featured == true && defined(slug.current)]
  | order(_updatedAt desc) [0...4] {
    ${propertyFields}
  }
`;
