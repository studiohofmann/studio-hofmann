import { client } from "@/sanity/lib/client";
import { MENU_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
import Studio from "@/public/studio.svg";
import Hofmann from "@/public/hofmann.svg";

interface MenuTypes {
  menu: string;
  slug: {
    current: string;
  };
}

// Fetch menu data from Sanity
async function getMenuData(): Promise<MenuTypes[]> {
  try {
    const data = await client.fetch<MenuTypes[]>(MENU_QUERY);
    return data;
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return [];
  }
}

export const revalidate = 0;

export default async function Navigation() {
  const menuItems = await getMenuData();

  return (
    <nav className="">
      {/* Logo */}
      <Link href="/" className="flex gap-2 justify-start border-none pb-0">
        <Studio className="w-full h-full aspect-[76.73/37.2] md:w-auto md:h-full" />
        <Hofmann className="w-full h-full aspect-[76.73/37.2] md:w-auto md:h-full" />
      </Link>

      {/* Menu Items */}
      <ul className="flex gap-4">
        {menuItems.map((item) => (
          <li key={item.slug.current}>
            <Link
              href={`/${item.slug.current}`}
              className="text-sm font-medium"
            >
              {item.menu}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
