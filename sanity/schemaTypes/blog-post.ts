import { defineField } from "sanity";
import { BoldIcon } from "@sanity/icons";

const blogPost = {
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  icon: BoldIcon,

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
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
      name: "date",
      title: "Date",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
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
      name: "text",
      title: "Text",
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

export default blogPost;
