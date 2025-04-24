import { defineField } from "sanity";
import { BulbOutlineIcon } from "@sanity/icons";

const about = {
  name: "about",
  title: "About",
  type: "document",
  icon: BulbOutlineIcon,

  fields: [
    defineField({
      name: "menu",
      title: "Menu",
      type: "string",
    }),
    defineField({
      name: "sortOrder",
      title: "Menu Sort Order",
      type: "number",
      description:
        "Controls the position in the menu (higher numbers appear later)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Add a custom slug for the URL or generate one from the menu",
      options: { source: "menu" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
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
  ],
};

export default about;
