import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY, PROJECT_POST_QUERY } from "@/sanity/lib/queries";
import {
  Projects as ProjectsType,
  ProjectPost as ProjectPostType,
} from "@/sanity.types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";

export const revalidate = 0;

async function getProjectsData(): Promise<ProjectsType | null> {
  try {
    const data = await client.fetch<ProjectsType>(PROJECTS_QUERY);
    return data;
  } catch (error) {
    console.error("Error fetching Projekte data:", error);
    return null;
  }
}

async function getProjectsPostData(): Promise<ProjectPostType[] | null> {
  try {
    // Use the query from queries.ts file which already includes sorting
    const data = await client.fetch<ProjectPostType[]>(PROJECT_POST_QUERY);
    return data;
  } catch (error) {
    console.error("Error fetching ProjektePost data:", error);
    return null;
  }
}

export default async function Projects() {
  const projects = await getProjectsData();
  const projectPost = await getProjectsPostData();

  if (!projects) {
    return <div>No project data found.</div>;
  }

  if (!projectPost || projectPost.length === 0) {
    return <div>No project posts found.</div>;
  }

  return (
    <section>
      <PortableText value={projects.text || []} />

      <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 md:gap-1 xl:gap-1">
        {projectPost.map((project, index) => (
          <div key={index} className="group">
            <Link
              className="!block !py-0"
              href={`/projekte/${project.slug?.current || "#"}`}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2 py-2 px-4 border-b-4 border-b-neutral-800">
                  <ArrowRightOutlined />
                  {project.title && (
                    <div className="font-bold truncate">{project.title}</div>
                  )}
                </div>
                {project.titleImage && (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={urlFor(project.titleImage).url()}
                      alt={
                        project.titleImage.alt ||
                        project.title ||
                        "Default alt text"
                      }
                      fill
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
              </div>
            </Link>

            {/* Add hr line after each project except the last one, only on mobile */}
            {index !== projectPost.length - 1 && (
              <hr className="line md:hidden" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
