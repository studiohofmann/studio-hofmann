import { client } from "@/sanity/lib/client";
import Link from "next/link";
import SanityImage from "../SanityImage";
import { BlogPost as BlogPostType } from "@/sanity.types";
import { LATEST_BLOG_POST_QUERY } from "@/sanity/lib/queries";

export default async function LatestBlogPost() {
  // Fetch the latest blog post
  const latestBlogPost = await client.fetch<BlogPostType>(
    LATEST_BLOG_POST_QUERY
  );

  if (!latestBlogPost) {
    return <div>No content found.</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      <h2>latest Blogpost</h2>
      <Link
        href={`/blog/${latestBlogPost.slug?.current}`}
        className="blogPostLink group"
      >
        <div className="groupLink">{latestBlogPost.title}</div>
        <div className="date">{latestBlogPost.date}</div>

        <div className="w-full flex flex-col gap-4 lg:flex-row">
          <div className="flex-1 flex">
            {latestBlogPost.titleImage && (
              <SanityImage
                image={latestBlogPost.titleImage}
                altFallback="About image"
                priority={true}
              />
            )}
          </div>
          <div className="flex-1 flex">
            {latestBlogPost.text && (
              <p>
                {(latestBlogPost.text?.[0]?.children?.[0]?.text ?? "").slice(
                  0,
                  200
                )}
                ...read more
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
