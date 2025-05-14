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
      name: "professions",
      title: "Professions",
      type: "array",
      of: [
        {
          type: "object",
          name: "profession",
          title: "Profession",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
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
        },
      ],
    }),
    defineField({
      name: "getInTouch",
      title: "Get in Touch",
      type: "object",
      fields: [
        defineField({
          name: "text",
          title: "Text",
          type: "array",
          of: [{ type: "block" }],
        }),
        defineField({
          name: "contactDetails",
          title: "Contact Details",
          type: "array",
          of: [
            {
              type: "object",
              name: "contactItem",
              title: "Contact Item",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  description: "Contact label (e.g. Email, Instagram, etc.)",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "value",
                  title: "Value",
                  type: "string",
                  description: "Contact information",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "value",
                },
              },
            },
          ],
        }),
      ],
    }),
  ],
};

export default home;
