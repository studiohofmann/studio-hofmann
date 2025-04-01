import { groq } from "next-sanity";

export const MENU_QUERY = groq`*[_type in ["home", "projekte", "about", "blog" , "impressum"]] | order(sortOrder asc) {menu, slug}`;

export const LANDINGPAGE_QUERY = groq`*[_type == "landingpage"] {bild, willkommenText, leistungenText}`;

export const UEBERMICH_QUERY = groq`*[_type == "ueberMich"] {menu, bild, text}`;

export const PRAXIS_QUERY = groq`*[_type == "praxis"] {menu, bilder[], text}`;

export const KONTAKT_QUERY = groq`*[_type == "kontakt"] {menu, iconsText, navigationText, telefonnummer, email, instagram, formularText, anfahrtText}`;

export const IMPRESSUM_QUERY = groq`*[_type == "impressum"] {menu, verantwortungText, impressumText}`;

export const FOOTER_QUERY = groq`*[_type == "footer"] {terminText, anerkennungText, adresse, copyright}`;
