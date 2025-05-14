import Link from "next/link";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface PaginationNavProps {
  prevSlug: string | null;
  nextSlug: string | null;
  basePath: string; // e.g., "/blog/" or "/projekte/"
}

export default function PaginationNav({
  prevSlug,
  nextSlug,
  basePath,
}: PaginationNavProps) {
  return (
    <div className="flex w-full gap-2">
      {/* Previous Link/Button */}
      {prevSlug ? (
        <Link
          href={`${basePath}${prevSlug}`}
          className="flex-1 group !justify-start px-4"
        >
          <LeftOutlined />
          <div>previous</div>
        </Link>
      ) : (
        <div className="flex items-center gap-2!justify-start opacity-50 cursor-not-allowed">
          <LeftOutlined />
          <div>previous</div>
        </div>
      )}

      {/* Next Link/Button */}
      {nextSlug ? (
        <Link
          href={`${basePath}${nextSlug}`}
          className="flex-1 group !justify-end"
        >
          <div>next</div>
          <RightOutlined />
        </Link>
      ) : (
        <div className="flex items-center justify-end gap-2 opacity-50 cursor-not-allowed">
          <div>next</div>
          <RightOutlined />
        </div>
      )}
    </div>
  );
}
