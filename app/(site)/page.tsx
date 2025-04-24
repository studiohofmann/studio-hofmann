import { client } from "@/sanity/lib/client";
import { HOME_QUERY } from "@/sanity/lib/queries";
import { Home as HomeType } from "@/sanity.types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 0; // Re-fetch on every request or set a time here

export default async function Home() {
  // Fetch all home content
  const homeData = await client.fetch<HomeType>(HOME_QUERY);

  if (!homeData) {
    return <div>No content found.</div>;
  }

  return (
    <section>
      {/* Introduction */}

      {homeData.introduction && (
        <h1>
          <PortableText value={homeData.introduction} />
        </h1>
      )}

      {/* Product Section */}
      <div className="flex flex-col xl:flex-row gap-1">
        {/* Linke Seite: Titel und Bild in flex-col */}
        <div className="flex flex-col gap-1 xl:w-1/2">
          {homeData.productTitle && <h2>{homeData.productTitle}</h2>}

          {homeData.productImage && (
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={urlFor(homeData.productImage).url()}
                alt={homeData.productImage.alt || "Product image"}
                fill
                priority
                placeholder="blur"
                blurDataURL={urlFor(homeData.productImage)
                  .width(24)
                  .height(24)
                  .blur(10)
                  .url()}
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Rechte Seite: Text */}
        <div className="xl:w-1/2 bg-neutral-400">
          {homeData.productText && (
            <PortableText value={homeData.productText} />
          )}
        </div>
      </div>

      {/* Interior Section */}
      <div className="flex flex-col xl:flex-row gap-1">
        {/* Linke Seite: Titel und Bild in flex-col */}
        <div className="flex flex-col gap-1 xl:w-1/2">
          {homeData.interiorTitle && <h2>{homeData.interiorTitle}</h2>}

          {homeData.interiorImage && (
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={urlFor(homeData.interiorImage).url()}
                alt={homeData.interiorImage.alt || "Interior image"}
                fill
                priority
                placeholder="blur"
                blurDataURL={urlFor(homeData.interiorImage)
                  .width(24)
                  .height(24)
                  .blur(10)
                  .url()}
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Rechte Seite: Text */}
        <div className="xl:w-1/2 bg-neutral-400">
          {homeData.interiorText && (
            <PortableText value={homeData.interiorText} />
          )}
        </div>
      </div>

      {/* Web Section */}
      <div className="flex flex-col xl:flex-row gap-1">
        {/* Linke Seite: Titel und Bild in flex-col */}
        <div className="flex flex-col gap-1 xl:w-1/2">
          {homeData.webTitle && <h2>{homeData.webTitle}</h2>}

          {homeData.webImage && (
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={urlFor(homeData.webImage).url()}
                alt={homeData.webImage.alt || "Web image"}
                fill
                priority
                placeholder="blur"
                blurDataURL={urlFor(homeData.webImage)
                  .width(24)
                  .height(24)
                  .blur(10)
                  .url()}
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Rechte Seite: Text */}
        <div className="xl:w-1/2 bg-neutral-400">
          {homeData.webText && <PortableText value={homeData.webText} />}
        </div>
      </div>
    </section>
  );
}
