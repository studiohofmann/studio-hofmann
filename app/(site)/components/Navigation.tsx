import { client } from "@/sanity/lib/client";
import { MENU_QUERY, FOOTER_MENU_QUERY } from "@/sanity/lib/queries";
import ActiveLink from "./ActiveLink";
import Studio from "@/public/studio.svg";
import Hofmann from "@/public/hofmann.svg";
import Copyright from "./Copyright";
import Instagram from "./Instagram";

interface MenuTypes {
  menu: string;
  slug: {
    current: string;
  };
}
interface FooterMenuTypes {
  menu: string;
  slug: {
    current: string;
  };
}

async function getMenuData(): Promise<MenuTypes[]> {
  try {
    const data = await client.fetch<MenuTypes[]>(MENU_QUERY);
    return data;
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return [];
  }
}

async function getFooterMenuData(): Promise<FooterMenuTypes[]> {
  try {
    const data = await client.fetch<FooterMenuTypes[]>(FOOTER_MENU_QUERY);
    return data;
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return [];
  }
}

export const revalidate = 0;

export default async function Navigation() {
  const menuItems = await getMenuData();
  const footerMenuItems = await getFooterMenuData();

  return (
    <nav className="p-1 flex flex-col gap-1 md:flex-row xl:flex-col xl:fixed xl:left-0 xl:top-0 xl:h-screen xl:w-1/5">
      <ActiveLink
        href="/"
        className="!bg-transparent !py-0 xl:mb-0 flex gap-1 group xl:flex-col"
      >
        <Studio className="logo" />
        <Hofmann className="logo" />
      </ActiveLink>

      <div className="grid grid-cols-4 gap-1 md:grid-cols-2 xl:grid-cols-1 flex-grow xl:grow-0">
        {menuItems.map((item) => (
          <div key={item.slug.current}>
            <ActiveLink href={`/${item.slug.current}`} className="">
              {item.menu}
            </ActiveLink>
          </div>
        ))}
      </div>

      {/* Footer Menu */}
      <div className="hidden xl:block mt-auto text-center">
        <div className="flex flex-col gap-1">
          <Instagram />
          {footerMenuItems.map((footerMenuItem) => {
            const slug = footerMenuItem.slug?.current || "";
            const menuText = footerMenuItem.menu || "Untitled";
            return (
              <div key={slug}>
                <ActiveLink href={`/${slug}`} className="menuButton">
                  {menuText}
                </ActiveLink>
              </div>
            );
          })}
          <Copyright />
        </div>
      </div>
    </nav>
  );
}
