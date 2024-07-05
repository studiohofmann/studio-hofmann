import { defineField } from "sanity";
import { InfoOutlineIcon } from '@sanity/icons'


const about = {
    name: "about",
    title: "About",
    type: "document",
    icon: InfoOutlineIcon,

    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
        }),

        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "name" },
        }),
        defineField({
            name: "text",
            title: "Text",
            type: "array",
            of: [{ type: "block" }],
        }),

        defineField({
            name: "nameProduct",
            title: "Name Product",
            type: "string",
        }),
        defineField({
            name: "textProduct",
            title: "Text Product",
            type: "array",
            of: [{ type: "block" }],
        }),
        defineField({
            name: "nameInterior",
            title: "Name Interior",
            type: "string",
        }),
        defineField({
            name: "textInterior",
            title: "Text Interior",
            type: "array",
            of: [{ type: "block" }],
        }),
        defineField({
            name: "nameWeb",
            title: "Name Web",
            type: "string",
        }),
        defineField({
            name: "textWeb",
            title: "Text Web",
            type: "array",
            of: [{ type: "block" }],
        }),
    ],
};

export default about;