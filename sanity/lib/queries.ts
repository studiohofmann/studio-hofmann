import { groq } from "next-sanity";

export const MENU_QUERY = groq`*[_type in ["projekte", "about", "kontakt", "blog"]] | order(sortOrder asc) {menu, slug}`;

export const HOME_QUERY = groq`*[_type == "home"][0] | {introduction, heroImage, productTitle, productImage, productText, interiorTitle, interiorImage, interiorText, webTitle, webImage, webText}`;

export const PROJECTS_QUERY = groq`*[_type == "projects"][0] | {titleImage, text}`;

export const PROJECT_POST_QUERY = groq`*[_type == "projectPost"] | order(sortOrder desc) {title, slug, sortOrder, titleImage, client, profession, text, summary, gallery}`;

export const ABOUT_QUERY = groq`*[_type == "about"][0] {image, text}`;

export const CONTACT_QUERY = groq`*[_type == "contact"][0] {text}`;

export const BLOG_QUERY = groq`*[_type == "blog"][0] | {text}`;

export const BLOG_POST_QUERY = groq`*[_type == "blogPost"] | order(date desc) {title, slug, date, titleImage, text, gallery}`;

export const PRAXIS_QUERY = groq`*[_type == "praxis"] {menu, bilder[], text}`;

export const KONTAKT_QUERY = groq`*[_type == "kontakt"] {menu, iconsText, navigationText, telefonnummer, email, instagram, formularText, anfahrtText}`;

export const DISCLAIMER_QUERY = groq`*[_type == "disclaimer"][0] {menu, responsibilityText, disclaimerText}`;

export const TERMS_AND_CONDITIONS_QUERY = groq`*[_type == "termsAndConditions"][0] {text}`;

export const FOOTER_QUERY = groq`*[_type == "footer"] {terminText, anerkennungText, adresse, copyright}`;

export const FOOTER_MENU_QUERY = groq`*[_type in ["disclaimer", "termsAndConditions"]] | order(sortOrder asc) {menu, slug}`;
