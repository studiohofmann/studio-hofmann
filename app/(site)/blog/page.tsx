import { client } from "@/sanity/lib/client";
import { BLOG_QUERY, BLOG_POST_QUERY } from "@/sanity/lib/queries";
import { Blog as BlogType, BlogPost as BlogPostType } from "@/sanity.types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

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
    <div className="container mx-auto px-4 py-8">
      {/* Blog main content */}
      <div className="prose max-w-none mb-12">
        <PortableText value={blog.text || []} />
      </div>

      {/* Blog posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {blogPost?.map((blogPost, index) => (
          <div key={index} className="group">
            <Link href={`/blog/${blogPost.slug?.current || "#"}`}>
              <div className="flex flex-col gap-3">
                {blogPost.titleImage && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
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
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
