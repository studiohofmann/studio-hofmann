import { type SchemaTypeDefinition } from "sanity";
import home from "./home";
import projekte from "./projekte";
import projektePost from "./projekte-post";
import about from "./about";
import kontakt from "./kontakt";
import blog from "./blog";
import blogPost from "./blog-post";
import impressum from "./impressum";
import emailSignature from "./emailSignature";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    home,
    projekte,
    projektePost,
    about,
    kontakt,
    blog,
    blogPost,
    impressum,
    emailSignature,
  ],
};
