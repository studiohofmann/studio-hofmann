import { client } from "@/sanity/lib/client";
import { BLOG_QUERY, BLOG_POST_QUERY } from "@/sanity/lib/queries";
import { Blog as BlogType, BlogPost as BlogPostType } from "@/sanity.types";
import { PortableText } from "@portabletext/react";
import SanityImage from "../components/SanityImage";
import Link from "next/link";

export const revalidate = 0;

async function getBlogData(): Promise<BlogType | null> {
  try {
    const data = await client.fetch<BlogType>(BLOG_QUERY);
    return data;
  } catch (error) {
    console.error("Error fetching Blog data:", error);
    return null;
  }
}

async function getBlogPostsData(): Promise<BlogPostType[] | null> {
  try {
    const data = await client.fetch<BlogPostType[]>(BLOG_POST_QUERY);
    return data;
  } catch (error) {
    console.error("Error fetching Blog Post data:", error);
    return null;
  }
}

export default async function Blog() {
  const blog = await getBlogData();
  const blogPost = await getBlogPostsData();

  if (!blog) {
    return <div>No blog data found.</div>;
  }

  return (
    <section>
      <PortableText value={blog.text || []} />

      <div className="line"></div>

      <div className="previewGallery">
        {blogPost?.map((post, index) => (
          <div key={index} className="flex flex-col">
            <Link
              className="blogPostLink group"
              href={`/blog/${post.slug?.current || "#"}`}
            >
              {post.title && <div className="groupLink">{post.title}</div>}
              {post.date && <div className="date">{post.date}</div>}

              {post.titleImage && (
                <SanityImage
                  image={post.titleImage}
                  altFallback="About image"
                  priority={true}
                />
              )}
              {post.text && (
                <p>
                  {(post.text?.[0]?.children?.[0]?.text ?? "").slice(0, 150)}
                  ...read more
                </p>
              )}
            </Link>

            {/* Conditionally render the line */}
            {/* Conditionally render the line */}
            {index < (blogPost?.length || 0) - 1 && (
              <div className="line md:hidden"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
