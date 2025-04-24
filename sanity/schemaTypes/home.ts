import { defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

const home = {
  name: "home",
  title: "Home",
  type: "document",
  icon: HomeIcon,

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
      name: "heroImage",
      title: "Hero Image",
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
      name: "introduction",
      title: "Introduction",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "productTitle",
      title: "Product Title",
      type: "string",
    }),
    defineField({
      name: "productImage",
      title: "Product Image",
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
      name: "productText",
      title: "Product Text",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "interiorTitle",
      title: "Interior Title",
      type: "string",
    }),
    defineField({
      name: "interiorImage",
      title: "Interior Image",
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
      name: "interiorText",
      title: "Interior Text",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "webTitle",
      title: "Web Title",
      type: "string",
    }),
    defineField({
      name: "webImage",
      title: "Web Image",
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
      name: "webText",
      title: "Web Text",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
};

export default home;
