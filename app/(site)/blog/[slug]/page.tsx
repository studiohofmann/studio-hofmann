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
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPostData(params.slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">Blog post not found</div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link
          href="/blog"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Back to blog
        </Link>
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      </div>

      {post.titleImage && (
        <div className="relative w-full aspect-[16/9] mb-8">
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
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <div className="prose max-w-none">
        <PortableText value={post.text || []} />
      </div>
    </article>
  );
}
