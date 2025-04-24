// ActiveLink.tsx - Client Component
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className: string;
}) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? "active" : ""}`}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
