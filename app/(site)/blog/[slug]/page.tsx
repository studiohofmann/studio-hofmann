import { client } from "@/sanity/lib/client";
import { BLOG_POST_QUERY } from "@/sanity/lib/queries";
import { BlogPost as BlogPostType } from "@/sanity.types";
import { PortableText } from "@portabletext/react";
import SanityImage from "../../components/SanityImage";
import LinkListItem from "../../components/navigation/LinkListItem";
import PaginationNav from "../../components/PaginationNav";
import { getPaginationSlugs } from "@/utils/getPaginationUtils";

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
  const paramsFromProps = await props.params;
  const post = await getBlogPostData(paramsFromProps.slug);
  const allPosts = await client.fetch<BlogPostType[]>(BLOG_POST_QUERY);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">Blog post not found</div>
    );
  }

  // Get previous and next blog post slugs
  const { prevSlug: prevPostSlug, nextSlug: nextPostSlug } = getPaginationSlugs(
    allPosts,
    paramsFromProps.slug
  );

  return (
    <section>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
        <h2>{post.title}</h2>
        <div className="date">{post.date}</div>
      </div>

      <div className=" grid grid-cols-1 gap-2 xl:grid-cols-2">
        {post.titleImage && (
          <SanityImage
            image={post.titleImage}
            altFallback="About image"
            priority={true}
          />
        )}
        <div className="flex flex-col flex-grow">
          <PortableText value={post.text || []} />
        </div>
      </div>

      {/* Blog Post Gallery */}
      {post.gallery && post.gallery.length > 0 && (
        <div className="gallery">
          {post.gallery.map((imageItem, index) => (
            <SanityImage
              key={index}
              image={imageItem}
              altFallback={`Gallery image ${index + 1}`}
              aspectRatio="aspect-[4/3]"
              className="object-cover"
            />
          ))}
        </div>
      )}
      <div className="line"></div>

      {/* Previous/Next Blog Post Navigation */}
      <PaginationNav
        prevSlug={prevPostSlug}
        nextSlug={nextPostSlug}
        basePath="/blog/"
      />

      {/* All Blog Posts List */}
      {allPosts
        .filter((p) => p.slug?.current !== paramsFromProps.slug)
        .map((otherPost) => (
          <LinkListItem
            key={otherPost.slug?.current}
            title={otherPost.title}
            subtitle={otherPost.date}
            href={`/blog/${otherPost.slug?.current}`}
          />
        ))}

      <div className="line xl:hidden"></div>
    </section>
  );
}
