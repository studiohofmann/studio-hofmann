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

export default projektePost;
