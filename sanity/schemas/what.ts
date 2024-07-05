import { defineArrayMember, defineField } from "sanity";
import { OlistIcon } from '@sanity/icons'


const what = {
    name: "what",
    title: "What",
    type: "document",
    icon: OlistIcon,

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
        defineField({
            name: "disciplines",
            title: "Disciplines",
            type: "array",
            of: [
                defineArrayMember({
                    name: "field",
                    title: "Field",
                    type: "object",
                    fields: [
                        {
                            name: "fieldName",
                            title: "Name",
                            type: "string",
                        },
                        {
                            name: "fieldText",
                            title: "Text",
                            type: "array",
                            of: [{ type: "block" }],
                        },

                    ]
                })

            ],

        }),
        defineField({
            name: "info",
            title: "Info",
            type: "array",
            of: [{ type: "block" }],
        }),


    ],
};

export default what;