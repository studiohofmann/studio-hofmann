import { defineField } from "sanity";
import { RobotIcon } from '@sanity/icons'


const projects = {
    name: "header",
    title: "Header",
    type: "document",
    icon: RobotIcon,

    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
        }),
        defineField({
            name: "heroImage",
            title: "Hero Image",
            type: "image",
            description: "Upload a profile picture",
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Alt",
                    type: "string",
                },
            ],
        }),
        defineField({
            name: "touch",
            title: "Touch",
            type: "string",
        }),
        defineField({
            name: "headerText",
            title: "Header Text",
            type: "array",
            of: [{ type: "block" }],
        }),
    ],
};

export default projects;