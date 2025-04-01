import { client } from "@/sanity/lib/client";
import { PROJEKTE_POST_QUERY } from "@/sanity/lib/queries";
import { ProjektePost as ProjektePostType } from "@/sanity.types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

// Generate static paths for all project slugs
export async function generateStaticParams() {
  try {
    // Use the existing query but we only need the slugs
    const projekte =
      await client.fetch<ProjektePostType[]>(PROJEKTE_POST_QUERY);
    return projekte.map((projekt) => ({
      slug: projekt.slug?.current ?? "",
    }));
  } catch (error) {
    console.error("Error fetching project slugs:", error);
    return [];
  }
}

// Fetch data for a specific project
async function getProjektData(slug: string): Promise<ProjektePostType | null> {
  try {
    // Fetch all projects and find the one with matching slug
    const allProjekte =
      await client.fetch<ProjektePostType[]>(PROJEKTE_POST_QUERY);
    return (
      allProjekte.find((projekt) => projekt.slug?.current === slug) || null
    );
  } catch (error) {
    console.error("Error fetching project data:", error);
    return null;
  }
}

// Page component
export default async function ProjektPage({
  params,
}: {
  params: { slug: string };
}) {
  const projekt = await getProjektData(params.slug);

  if (!projekt) {
    return <div className="container mx-auto px-4 py-8">Project not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{projekt.title}</h1>

      {projekt.titleImage && (
        <div className="relative w-full h-96 mb-8">
          <Image
            src={urlFor(projekt.titleImage).url()}
            alt={projekt.titleImage.alt || projekt.title || "Project image"}
            fill
            priority
            placeholder="blur"
            blurDataURL={urlFor(projekt.titleImage)
              .width(24)
              .height(24)
              .blur(10)
              .url()}
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-3">
          <PortableText value={projekt.text || []} />
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Client</h2>
            <p>{projekt.client}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Profession</h2>
            <p>{projekt.profession}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/projekte" className="text-blue-600 hover:underline">
          ← Back to all projects
        </Link>
      </div>
    </div>
  );
}
