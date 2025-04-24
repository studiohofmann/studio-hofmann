import { client } from "@/sanity/lib/client";
import { ABOUT_QUERY } from "@/sanity/lib/queries";
import { About as AboutType } from "@/sanity.types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

// Server component
export default async function About() {
  // Fetch the "about" document
  const aboutData = await client.fetch<AboutType>(ABOUT_QUERY);

  return (
    <section>
      {/* Render the image if present */}
      {aboutData.image && (
        <div className="relative w-full h-full aspect-4/3">
          <Image
            src={urlFor(aboutData.image).url()}
            alt={aboutData.image.alt || "About image"}
            fill
            priority
            placeholder="blur"
            blurDataURL={urlFor(aboutData.image)
              .width(24)
              .height(24)
              .blur(10)
              .url()}
            className="object-cover"
          />
        </div>
      )}

      {/* Render the PortableText if present */}
      {aboutData.text && (
        <div className="prose lg:prose-xl">
          <PortableText value={aboutData.text} />
        </div>
      )}
    </section>
  );
}
