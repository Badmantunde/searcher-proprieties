import type { StructureResolver } from "sanity/structure";

const propertyFilter = (propertyType: string) =>
  `_type == "property" && propertyType == "${propertyType}"`;

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("All properties")
        .schemaType("property")
        .child(
          S.documentTypeList("property")
            .title("All properties")
            .defaultOrdering([{ field: "title", direction: "asc" }]),
        ),
      S.divider(),
      S.listItem()
        .title("Shortlet apartments")
        .schemaType("property")
        .child(
          S.documentList()
            .title("Shortlet apartments")
            .filter(propertyFilter("shortlet"))
            .defaultOrdering([{ field: "title", direction: "asc" }]),
        ),
      S.listItem()
        .title("Developed properties")
        .schemaType("property")
        .child(
          S.documentList()
            .title("Developed properties")
            .filter(propertyFilter("developed"))
            .defaultOrdering([{ field: "title", direction: "asc" }]),
        ),
      S.listItem()
        .title("Developing projects")
        .schemaType("property")
        .child(
          S.documentList()
            .title("Developing projects")
            .filter(propertyFilter("developing"))
            .defaultOrdering([{ field: "title", direction: "asc" }]),
        ),
    ]);
