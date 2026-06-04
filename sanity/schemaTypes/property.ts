import { defineArrayMember, defineField, defineType } from "sanity";

export const property = defineType({
  name: "property",
  title: "Property",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "details", title: "Type-specific details" },
    { name: "marketing", title: "Marketing" },
  ],
  fields: [
    defineField({
      name: "propertyType",
      title: "Property type",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Shortlet apartment", value: "shortlet" },
          { title: "Developed property", value: "developed" },
          { title: "Developing project", value: "developing" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Address / location",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short description (card)",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: "longDescription",
      title: "Full description (detail page)",
      type: "text",
      rows: 6,
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cardImage",
      title: "Card thumbnail",
      type: "image",
      group: "media",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Detail gallery",
      type: "gallery",
      group: "media",
      validation: (Rule) => Rule.required(),
    }),

    // Shortlet
    defineField({
      name: "bedrooms",
      title: "Bedrooms label",
      type: "string",
      group: "details",
      hidden: ({ document }) => document?.propertyType !== "shortlet",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as { propertyType?: string };
          if (doc?.propertyType === "shortlet" && !value) {
            return "Required for shortlet properties";
          }
          return true;
        }),
    }),
    defineField({
      name: "rate",
      title: "Rate label",
      type: "string",
      description: 'e.g. "₦100,000/night"',
      group: "details",
      hidden: ({ document }) => document?.propertyType !== "shortlet",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as { propertyType?: string };
          if (doc?.propertyType === "shortlet" && !value) {
            return "Required for shortlet properties";
          }
          return true;
        }),
    }),

    // Developed
    defineField({
      name: "priceRange",
      title: "Price range",
      type: "string",
      group: "details",
      hidden: ({ document }) => document?.propertyType !== "developed",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as { propertyType?: string };
          if (doc?.propertyType === "developed" && !value) {
            return "Required for developed properties";
          }
          return true;
        }),
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      group: "details",
      of: [defineArrayMember({ type: "string" })],
      hidden: ({ document }) => document?.propertyType !== "developed",
    }),

    // Developing
    defineField({
      name: "leaseLabel",
      title: "Lease label",
      type: "string",
      group: "details",
      hidden: ({ document }) => document?.propertyType !== "developing",
    }),
    defineField({
      name: "units",
      title: "Unit options",
      type: "array",
      group: "details",
      of: [defineArrayMember({ type: "developingUnit" })],
      hidden: ({ document }) => document?.propertyType !== "developing",
    }),
    defineField({
      name: "progress",
      title: "Construction progress (%)",
      type: "number",
      group: "details",
      validation: (Rule) => Rule.min(0).max(100),
      hidden: ({ document }) => document?.propertyType !== "developing",
    }),
    defineField({
      name: "completion",
      title: "Completion date label",
      type: "string",
      description: 'e.g. "July 2026"',
      group: "details",
      hidden: ({ document }) => document?.propertyType !== "developing",
    }),

    defineField({
      name: "featured",
      title: "Show on homepage featured section",
      type: "boolean",
      group: "marketing",
      initialValue: false,
    }),
    defineField({
      name: "featuredPrimaryBadge",
      title: "Featured primary badge",
      type: "string",
      group: "marketing",
      hidden: ({ document }) => !document?.featured,
    }),
    defineField({
      name: "featuredSecondaryBadge",
      title: "Featured secondary badge",
      type: "string",
      group: "marketing",
      hidden: ({ document }) => !document?.featured,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "propertyType",
      media: "cardImage",
    },
    prepare({ title, subtitle, media }) {
      const labels: Record<string, string> = {
        shortlet: "Shortlet",
        developed: "Developed",
        developing: "Developing",
      };
      return {
        title,
        subtitle: labels[subtitle as string] ?? subtitle,
        media,
      };
    },
  },
});
