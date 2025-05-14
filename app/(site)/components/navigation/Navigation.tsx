import { client } from "@/sanity/lib/client";
import { MENU_QUERY, FOOTER_MENU_QUERY } from "@/sanity/lib/queries";
import ActiveLink from "./ActiveLink";
import Studio from "@/public/studio.svg";
import Hofmann from "@/public/hofmann.svg";

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
    <div className="flex flex-col">
      <nav className="flex flex-col gap-2 md:flex-row">
        <ActiveLink
          href="/"
          className="!bg-transparent !py-0 !gap-2 flex group !border-0"
        >
          <Studio className="logo" />
          <Hofmann className="logo" />
        </ActiveLink>

        <div className="grid grid-cols-4 gap-2 md:grid-cols-2 flex-grow">
          {menuItems.map((item) => (
            <div key={item.slug.current}>
              <ActiveLink href={`/${item.slug.current}`} className="">
                {item.menu}
              </ActiveLink>
            </div>
          ))}
        </div>
      </nav>
      {/* Line moved outside of nav */}
      <div className="line !mt-4"></div>
    </div>
  );
}
