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
    <div className="grid grid-cols-2 gap-2">
      {/* Previous Link/Button */}
      {prevSlug ? (
        <Link
          href={`${basePath}${prevSlug}`}
          className="group !justify-start px-4"
        >
          <LeftOutlined />
          <div>previous</div>
        </Link>
      ) : (
        <div>
          <LeftOutlined />
          <div>previous</div>
        </div>
      )}

      {/* Next Link/Button */}
      {nextSlug ? (
        <Link
          href={`${basePath}${nextSlug}`}
          className="group !justify-end px-4"
        >
          <div>next</div>
          <RightOutlined />
        </Link>
      ) : (
        <div>
          <div>next</div>
          <RightOutlined />
        </div>
      )}
    </div>
  );
}
