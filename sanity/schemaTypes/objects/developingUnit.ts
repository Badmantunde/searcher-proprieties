import { defineField, defineType } from "sanity";

export const developingUnit = defineType({
  name: "developingUnit",
  title: "Unit pricing",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Unit type",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rental",
      title: "Rental label",
      type: "string",
      description: 'e.g. "Annual Rental: ₦2.2M Yearly"',
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "type", subtitle: "price" },
  },
});
