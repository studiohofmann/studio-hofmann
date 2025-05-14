import { client } from "@/sanity/lib/client";
import { ABOUT_QUERY } from "@/sanity/lib/queries";
import { About as AboutType } from "@/sanity.types";
import { PortableText } from "@portabletext/react";
import SanityImage from "../components/SanityImage"; // Import the new component

// Server component
export default async function About() {
  // Fetch the "about" document
  const aboutData = await client.fetch<AboutType>(ABOUT_QUERY);

  return (
    <section>
      {/* Render the image if present */}
      {aboutData.image && (
        <SanityImage
          image={aboutData.image}
          altFallback="About image"
          priority={true}
        />
      )}
      <div className="line"></div>

      {/* Render the PortableText if present */}
      {aboutData.text && (
        <div className="prose lg:prose-xl">
          <PortableText value={aboutData.text} />
        </div>
      )}
      <div className="line xl:hidden"></div>
    </section>
  );
}
