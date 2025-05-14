import { client } from "@/sanity/lib/client";
import { FOOTER_MENU_QUERY } from "@/sanity/lib/queries";
import ActiveLink from "../navigation/ActiveLink";
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
    <div>
      <div className="line"></div>
      <div className="flex flex-col gap-2">
        {/* Use grid with equal columns instead of flex */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {pages.map((page) => {
            const slug = page.slug?.current || "";
            const menuText = page.menu || "Untitled";
            return (
              <div key={slug} className="flex">
                <ActiveLink href={`/${slug}`} className="w-full">
                  {menuText}
                </ActiveLink>
              </div>
            );
          })}
        </div>

        <Copyright />
      </div>
    </div>
  );
}
