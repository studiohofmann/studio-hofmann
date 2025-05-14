import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY, PROJECT_POST_QUERY } from "@/sanity/lib/queries";
import {
  Projects as ProjectsType,
  ProjectPost as ProjectPostType,
} from "@/sanity.types";
import { PortableText } from "@portabletext/react";
import SanityImage from "../components/SanityImage";
import Link from "next/link";

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

      <div className="line"></div>
      <div className="previewGallery">
        {projectPost.map((project, index) => (
          <div key={index} className="flex flex-col">
            <Link
              className="flex-col !py-0 !gap-2 !border-0 !bg-transparent group"
              href={`/projekte/${project.slug?.current || "#"}`}
            >
              {project.title && (
                <div className="groupLink">{project.title}</div>
              )}

              {project.titleImage && (
                <SanityImage
                  image={project.titleImage}
                  altFallback="About image"
                  priority={true}
                />
              )}
            </Link>
            {/* Conditionally render the line */}
            {/* Conditionally render the line */}
            {index < (projectPost?.length || 0) - 1 && (
              <div className="line md:hidden"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
