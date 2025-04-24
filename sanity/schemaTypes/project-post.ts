import { defineField } from "sanity";
import { ProjectsIcon } from "@sanity/icons";

const projectPost = {
  name: "projectPost",
  title: "Project Post",
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
          { title: "Product Design", value: "Product Design" },
          { title: "Interior Solutions", value: "Interior Solutions" },
          {
            title: "Web Design & Development",
            value: "Web Design & Development",
          },
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
    defineField({
      name: "summary",
      title: "Summary",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
          ],
          options: {
            hotspot: true,
          },
        },
      ],
      description: "Upload and manage multiple images as a gallery",
    }),
  ],
};

export default projectPost;
