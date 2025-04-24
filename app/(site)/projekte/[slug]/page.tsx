import { client } from "@/sanity/lib/client";
import { PROJECT_POST_QUERY } from "@/sanity/lib/queries";
import { ProjectPost as ProjectsPostType } from "@/sanity.types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

export const revalidate = 0;

// Generate static paths for all project slugs
export async function generateStaticParams() {
  try {
    const project = await client.fetch<ProjectsPostType[]>(PROJECT_POST_QUERY);
    return project.map((project) => ({
      slug: project.slug?.current ?? "",
    }));
  } catch (error) {
    console.error("Error fetching project slugs:", error);
    return [];
  }
}

// Fetch data for a specific project
async function getProjectData(slug: string): Promise<ProjectsPostType | null> {
  try {
    const allProjects =
      await client.fetch<ProjectsPostType[]>(PROJECT_POST_QUERY);
    return allProjects.find((p) => p.slug?.current === slug) || null;
  } catch (error) {
    console.error("Error fetching project data:", error);
    return null;
  }
}

// Page component
export default async function ProjectPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const project = await getProjectData(slug);
  // Fetch all projects for the bottom list
  const allProjects =
    await client.fetch<ProjectsPostType[]>(PROJECT_POST_QUERY);

  if (!project) {
    return <div className="container mx-auto px-4 py-8">Project not found</div>;
  }

  return (
    <section>
      <h2>{project.title}</h2>
      <div className="flex flex-col gap-1 xl:flex-row">
        <p className="flex-1">Client: {project.client}</p>
        <p className="flex-1">{project.profession}</p>
      </div>

      <div className=" grid grid-cols-1 gap-1 xl:grid-cols-2">
        {/* Title Image */}
        {project.titleImage && (
          <div className="relative w-full h-full aspect-[4/3]">
            <Image
              src={urlFor(project.titleImage).url()}
              alt={project.titleImage.alt || project.title || "Project image"}
              fill
              priority
              placeholder="blur"
              blurDataURL={urlFor(project.titleImage)
                .width(24)
                .height(24)
                .blur(10)
                .url()}
              className="object-cover"
            />
          </div>
        )}

        {/* Project Text */}
        <div className="bg-neutral-400">
          <PortableText value={project.text || []} />
        </div>
      </div>

      {/* Project Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="">
          <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 xl:gap-1">
            {project.gallery.map((imageItem, index) => (
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

      {/* All Projects */}
      <div className="flex flex-col gap-1">
        {allProjects
          .filter((p) => p.slug?.current !== slug) // Exclude current project
          .map((project) => (
            <div key={project.slug?.current}>
              <Link
                href={`/projekte/${project.slug?.current}`}
                className="menuButton !justify-between px-4"
              >
                <div>{project.title}</div>
                <div>{project.profession}</div>
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
}
