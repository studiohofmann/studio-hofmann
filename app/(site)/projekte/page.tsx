import { client } from "@/sanity/lib/client";
import { PROJEKTE_QUERY, PROJEKTE_POST_QUERY } from "@/sanity/lib/queries";
import {
  Projekte as ProjekteType,
  ProjektePost as ProjektePostType,
} from "@/sanity.types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

async function getProjekteData(): Promise<ProjekteType | null> {
  try {
    const data = await client.fetch<ProjekteType>(PROJEKTE_QUERY);
    return data;
  } catch (error) {
    console.error("Error fetching Projekte data:", error);
    return null;
  }
}

async function getProjektePostData(): Promise<ProjektePostType[] | null> {
  try {
    // Use the query from queries.ts file which already includes sorting
    const data = await client.fetch<ProjektePostType[]>(PROJEKTE_POST_QUERY);
    return data;
  } catch (error) {
    console.error("Error fetching ProjektePost data:", error);
    return null;
  }
}

export default async function Projekte() {
  const projekte = await getProjekteData();
  const projektePost = await getProjektePostData();

  if (!projekte) {
    return <div>No project data found.</div>;
  }

  if (!projektePost || projektePost.length === 0) {
    return <div>No project posts found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Render the main project content */}
      <div className="mb-8">
        <PortableText value={projekte.text || []} />
      </div>

      {/* Render the project posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projektePost.map((projekt, index) => (
          <div key={index} className="group">
            <Link href={`/projekte/${projekt.slug?.current || "#"}`}>
              <div className="flex flex-col gap-3">
                {projekt.titleImage && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={urlFor(projekt.titleImage).url()}
                      alt={
                        projekt.titleImage.alt ||
                        projekt.title ||
                        "Default alt text"
                      }
                      fill
                      placeholder="blur"
                      blurDataURL={urlFor(projekt.titleImage)
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
