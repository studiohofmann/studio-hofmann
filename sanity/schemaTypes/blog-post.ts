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
      name: "text",
      title: "Text",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
};

export default blogPost;
