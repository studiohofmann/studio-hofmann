import Link from "next/link";

interface LinkListItemProps {
  title: string | null | undefined;
  subtitle?: string | null | undefined;
  href: string;
  className?: string;
}

export default function LinkListItem({
  title,
  subtitle,
  href,
  className = "px-4",
}: LinkListItemProps) {
  return (
    <div>
      <Link href={href} className={className}>
        <div className="overflow-hidden whitespace-nowrap text-ellipsis flex-1">
          {title}
        </div>
        {subtitle && <div className="font-normal normal-case">{subtitle}</div>}
      </Link>
    </div>
  );
}
