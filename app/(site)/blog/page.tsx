import { client } from "@/sanity/lib/client";
import { BLOG_QUERY, BLOG_POST_QUERY } from "@/sanity/lib/queries";
import { Blog as BlogType, BlogPost as BlogPostType } from "@/sanity.types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";

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

      <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 md:gap-1 xl:gap-1">
        {blogPost?.map((blogPost, index) => (
          <div key={index} className="group">
            <Link
              className="!block !py-0"
              href={`/blog/${blogPost.slug?.current || "#"}`}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2 border-b-4 border-b-neutral-800 py-2 px-4">
                  <ArrowRightOutlined />
                  {blogPost.title && <div>{blogPost.title}</div>}
                </div>

                {blogPost.titleImage && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden border-b-4 border-b-neutral-800">
                    <Image
                      src={urlFor(blogPost.titleImage).url()}
                      alt={
                        blogPost.titleImage.alt ||
                        blogPost.title ||
                        "Default alt text"
                      }
                      fill
                      placeholder="blur"
                      blurDataURL={urlFor(blogPost.titleImage)
                        .width(24)
                        .height(24)
                        .blur(10)
                        .url()}
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              {blogPost.text && (
                <p className="!font-semibold">
                  {(blogPost.text?.[0]?.children?.[0]?.text ?? "").slice(
                    0,
                    100
                  )}
                  ...
                </p>
              )}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
