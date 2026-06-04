import { defineField, defineType } from "sanity";

export const gallery = defineType({
  name: "gallery",
  title: "Image gallery",
  type: "object",
  fields: [
    defineField({
      name: "hero",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Additional images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
  ],
});
