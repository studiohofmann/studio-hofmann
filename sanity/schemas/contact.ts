import { defineField } from "sanity";
import { InfoOutlineIcon } from '@sanity/icons'


const contact = {
    name: "contact",
    title: "Contact",
    type: "document",
    icon: InfoOutlineIcon,

    fields: [
        defineField({
            name: "contactName",
            title: "Contact Name",
            type: "string",
        }),

        defineField({
            name: "contactSlug",
            title: "Contact Slug",
            type: "slug",
            options: { source: "contactName" },
        }),
    ],
};

export default contact;