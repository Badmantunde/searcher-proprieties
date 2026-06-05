import type { DevelopedProperty, DevelopingProject, PropertyType } from "./types";

export type PropertySearchItem = {
  id: string;
  slug: string;
  title: string;
  location: string;
  description: string;
  propertyType: PropertyType;
  typeLabel: string;
  href: string;
  searchText: string;
};

function buildSearchText(parts: (string | undefined | null)[]): string {
  return parts
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function developedToSearchItem(property: DevelopedProperty): PropertySearchItem {
  return {
    id: `developed-${property.slug}`,
    slug: property.slug,
    title: property.title,
    location: property.location,
    description: property.description,
    propertyType: "developed",
    typeLabel: "Developed",
    href: `/properties/developed/${property.slug}`,
    searchText: buildSearchText([
      property.title,
      property.location,
      property.description,
      property.longDescription,
      property.priceRange,
      ...property.amenities,
      property.slug,
    ]),
  };
}

export function developingToSearchItem(
  project: DevelopingProject,
): PropertySearchItem {
  return {
    id: `developing-${project.slug}`,
    slug: project.slug,
    title: project.title,
    location: project.location,
    description: project.description,
    propertyType: "developing",
    typeLabel: "Developing",
    href: `/properties/developing/${project.slug}`,
    searchText: buildSearchText([
      project.title,
      project.location,
      project.description,
      project.longDescription,
      project.leaseLabel,
      project.completion,
      ...project.units.map((u) => `${u.type} ${u.price} ${u.rental}`),
      project.slug,
    ]),
  };
}

function scoreItem(item: PropertySearchItem, query: string): number {
  const q = query.toLowerCase();
  const title = item.title.toLowerCase();
  const location = item.location.toLowerCase();

  let score = 0;

  if (title === q) score += 100;
  else if (title.startsWith(q)) score += 50;
  else if (title.includes(q)) score += 30;

  if (location.includes(q)) score += 20;
  if (item.description.toLowerCase().includes(q)) score += 10;
  if (item.searchText.includes(q)) score += 5;

  const words = q.split(/\s+/).filter(Boolean);
  if (words.length > 1 && words.every((word) => item.searchText.includes(word))) {
    score += 15;
  }

  return score;
}

export function filterPropertySearch(
  items: PropertySearchItem[],
  query: string,
  limit = 6,
): PropertySearchItem[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  return items
    .map((item) => ({ item, score: scoreItem(item, trimmed) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, limit)
    .map(({ item }) => item);
}

export function matchesPropertyQuery(
  searchText: string,
  query: string | undefined,
): boolean {
  const q = query?.trim().toLowerCase();
  if (!q) return true;

  const words = q.split(/\s+/).filter(Boolean);
  return words.every((word) => searchText.includes(word));
}
