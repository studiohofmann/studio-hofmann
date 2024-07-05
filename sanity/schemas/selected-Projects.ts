import { defineArrayMember, defineField } from "sanity";
import { SelectIcon } from '@sanity/icons'


const specification = {
    name: "selectedProjects",
    title: "Selected Projects",
    type: "document",
    icon: SelectIcon,

    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
        }),
        defineField({
            name: "text",
            title: "Text",
            type: "array",
            of: [{ type: "block" }],
        }),

    ],
};

export default specification;