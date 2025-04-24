import { type SchemaTypeDefinition } from "sanity";
import home from "./home";
import projects from "./projects";
import projectPost from "./project-post";
import about from "./about";
import contact from "./contact";
import blog from "./blog";
import blogPost from "./blog-post";
import disclaimer from "./disclaimer";
import termsAndConditions from "./termsAndConditions";
import emailSignature from "./emailSignature";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    home,
    projects,
    projectPost,
    about,
    contact,
    blog,
    blogPost,
    disclaimer,
    termsAndConditions,
    emailSignature,
  ],
};
