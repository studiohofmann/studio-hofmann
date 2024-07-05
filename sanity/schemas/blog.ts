import { defineField } from "sanity";
import { BoldIcon } from '@sanity/icons'


const blog = {
    name: "blog",
    title: "Blog",
    type: "document",
    icon: BoldIcon,

    fields: [
        defineField({
            name: "blogName",
            title: "Blog Name",
            type: "string",
        }),

        defineField({
            name: "blogSlug",
            title: "Blog Slug",
            type: "slug",
            options: { source: "blogName" },
        }),
    ],
};

export default blog;