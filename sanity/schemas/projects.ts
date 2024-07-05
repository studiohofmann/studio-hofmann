import { defineField } from "sanity";
import { ProjectsIcon } from '@sanity/icons'

const projects = {
    name: "projects",
    title: "Projects",
    type: "document",
    icon: ProjectsIcon,

    fields: [
        defineField({
            name: "projectName",
            title: "Project Name",
            type: "string",
        }),
        defineField({
            name: "projectSlug",
            title: "Project Slug",
            type: "slug",
            options: { source: "projectName" },
        }),
        defineField({
            name: "projectClient",
            title: "Project Client",
            type: "array",
            of: [{ type: "block" }],
        }),
        defineField({
            name: "projectImage",
            title: "Project Image",
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
            name: "projectDescription",
            title: "Project Description",
            type: "array",
            of: [{ type: "block" }],
        }),
        defineField({
            name: 'projectGallery',
            title: 'Project gallery',
            type: 'array',
            of: [{ type: 'image' }]
        }),

        defineField({
            name: "projectKind",
            title: "Project Kind",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "inline",
                    fields: [
                        { type: "string", name: "title" },

                    ]
                }
            ],
            options: {
                list: [
                    { _type: "inline", title: "Product Design" },
                    { _type: "inline", title: "Interior Design" },
                    { _type: "inline", title: "Web Design" },
                    { _type: "inline", title: "Web Development" },

                    { _type: "inline", title: "Technical Development" },
                    { _type: "inline", title: "Project Management" },
                    { _type: "inline", title: "Supply Chain Management" },
                    { _type: "inline", title: "Material Procurement" },

                ]
            }
        }),

    ],
};

export default projects;