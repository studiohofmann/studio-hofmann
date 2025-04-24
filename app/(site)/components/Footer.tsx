import { client } from "@/sanity/lib/client";
import { FOOTER_MENU_QUERY } from "@/sanity/lib/queries";
import ActiveLink from "./ActiveLink";
import Copyright from "./Copyright";

interface FooterMenuTypes {
  menu: string;
  slug: {
    current: string;
  };
}

// Server component
export default async function Footer() {
  // Fetch the "disclaimer" and "termsAndConditions" pages
  const pages = await client.fetch<FooterMenuTypes[]>(FOOTER_MENU_QUERY);

  return (
    <footer>
      <div className="flex flex-col gap-1">
        {pages.map((page) => {
          const slug = page.slug?.current || "";
          const menuText = page.menu || "Untitled";
          return (
            <div key={slug}>
              <ActiveLink href={`/${slug}`} className="menuButton">
                {menuText}
              </ActiveLink>
            </div>
          );
        })}
      </div>

      <Copyright />
    </footer>
  );
}
