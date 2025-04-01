import { defineField } from "sanity";
import { ProjectsIcon } from "@sanity/icons";

const projektePost = {
  name: "projektePost",
  title: "Projekte Post",
  type: "document",
  icon: ProjectsIcon,

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Set the order of this project (lower numbers appear first)",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Add a custom slug for the URL or generate one from the title",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleImage",
      title: "Title Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
    }),
    defineField({
      name: "profession",
      title: "Profession",
      type: "string",
      options: {
        list: [
          { title: "Product Design", value: "pdoductDesign" },
          { title: "Interior Solutions", value: "interiorSolutions" },
          { title: "Web Development", value: "webDevelopment" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
};

export default projektePost;
