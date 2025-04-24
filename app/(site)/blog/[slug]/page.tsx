import { client } from "@/sanity/lib/client";
import { BLOG_POST_QUERY } from "@/sanity/lib/queries";
import { BlogPost as BlogPostType } from "@/sanity.types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

// Generate static paths for all blog post slugs
export async function generateStaticParams() {
  try {
    const posts = await client.fetch<BlogPostType[]>(BLOG_POST_QUERY);
    return posts.map((post) => ({
      slug: post.slug?.current ?? "",
    }));
  } catch (error) {
    console.error("Error fetching blog post slugs:", error);
    return [];
  }
}

// Fetch data for a specific blog post
async function getBlogPostData(slug: string): Promise<BlogPostType | null> {
  try {
    // Fetch all blog posts and find the one with matching slug
    const allPosts = await client.fetch<BlogPostType[]>(BLOG_POST_QUERY);
    return allPosts.find((post) => post.slug?.current === slug) || null;
  } catch (error) {
    console.error("Error fetching blog post data:", error);
    return null;
  }
}

// Page component
export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await getBlogPostData(params.slug);
  const allPosts = await client.fetch<BlogPostType[]>(BLOG_POST_QUERY);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">Blog post not found</div>
    );
  }

  return (
    <section>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-1">
        <h2>{post.title}</h2>
        <p>{post.date}</p>
      </div>

      <div className=" grid grid-cols-1 gap-1 xl:grid-cols-2">
        {post.titleImage && (
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={urlFor(post.titleImage).url()}
              alt={post.titleImage.alt || post.title || "Blog post image"}
              fill
              priority
              placeholder="blur"
              blurDataURL={urlFor(post.titleImage)
                .width(24)
                .height(24)
                .blur(10)
                .url()}
              className="object-cover"
            />
          </div>
        )}
        <div className="bg-neutral-400">
          <PortableText value={post.text || []} />
        </div>
      </div>

      {/* Blog Post Gallery */}
      {post.gallery && post.gallery.length > 0 && (
        <div className="">
          <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 xl:gap-1">
            {post.gallery.map((imageItem, index) => (
              <div key={index} className="relative w-full h-full aspect-[4/3]">
                <Image
                  src={urlFor(imageItem).url()}
                  alt={imageItem.alt || `Gallery image ${index + 1}`}
                  fill
                  placeholder="blur"
                  blurDataURL={urlFor(imageItem)
                    .width(24)
                    .height(24)
                    .blur(10)
                    .url()}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Posts */}
      <div className="flex flex-col gap-1">
        {allPosts
          .filter((p) => p.slug?.current !== params.slug) // Exclude current post
          .map((post) => (
            <div key={post.slug?.current}>
              <Link
                href={`/blog/${post.slug?.current}`} // Corrected URL
                className="menuButton !justify-between px-4"
              >
                <div>{post.title}</div>
                <div>
                  {post.date
                    ? new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "No date available"}
                </div>
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
}
