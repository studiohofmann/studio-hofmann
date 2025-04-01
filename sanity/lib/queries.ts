import { groq } from "next-sanity";

export const MENU_QUERY = groq`*[_type in ["home", "projekte", "about", "blog" , "impressum"]] | order(sortOrder asc) {menu, slug}`;

export const PROJEKTE_QUERY = groq`*[_type == "projekte"][0] | {titleImage, text}`;

export const PROJEKTE_POST_QUERY = groq`*[_type == "projektePost"] | order(sortOrder desc) {title, slug, sortOrder, titleImage, client, profession, text}`;

export const BLOG_QUERY = groq`*[_type == "blog"][0] | {text}`;

export const BLOG_POST_QUERY = groq`*[_type == "blogPost"] | order(sortOrder desc) {title, slug, titleImage, text}`;

export const PRAXIS_QUERY = groq`*[_type == "praxis"] {menu, bilder[], text}`;

export const KONTAKT_QUERY = groq`*[_type == "kontakt"] {menu, iconsText, navigationText, telefonnummer, email, instagram, formularText, anfahrtText}`;

export const IMPRESSUM_QUERY = groq`*[_type == "impressum"] {menu, verantwortungText, impressumText}`;

export const FOOTER_QUERY = groq`*[_type == "footer"] {terminText, anerkennungText, adresse, copyright}`;
