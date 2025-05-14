import { client } from "@/sanity/lib/client";
import { PROJECT_POST_QUERY } from "@/sanity/lib/queries";
import { ProjectPost as ProjectsPostType } from "@/sanity.types";
import { PortableText } from "@portabletext/react";
import SanityImage from "../../components/SanityImage";
import LinkListItem from "../../components/navigation/LinkListItem";
import PaginationNav from "../../components/PaginationNav";
import { getPaginationSlugs } from "@/utils/getPaginationUtils";

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
  const allProjects =
    await client.fetch<ProjectsPostType[]>(PROJECT_POST_QUERY);

  if (!project) {
    return <div className="container mx-auto px-4 py-8">Project not found</div>;
  }

  // Get previous and next project slugs
  const { prevSlug: prevProjectSlug, nextSlug: nextProjectSlug } =
    getPaginationSlugs(allProjects, slug);

  return (
    <section>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {project.titleImage && (
            <SanityImage
              image={project.titleImage}
              altFallback="About image"
              priority={true}
            />
          )}
          <div className="flex flex-col gap-2">
            <h1>{project.title}</h1>
            <div>Client: {project.client}</div>
            {project.profession}
            <div>
              <PortableText value={project.text || []} />
            </div>
          </div>
        </div>

        {/* Project Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="">
            <div className="gallery">
              {project.gallery.map((imageItem, index) => (
                <SanityImage
                  key={index}
                  image={imageItem}
                  altFallback={`Gallery image ${index + 1}`}
                  aspectRatio="aspect-[4/3]"
                  className="object-cover"
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="line"></div>

      {/* Previous/Next Project Navigation */}
      <div className="navigation">
        <PaginationNav
          prevSlug={prevProjectSlug}
          nextSlug={nextProjectSlug}
          basePath="/projekte/"
        />

        {/* All Projects List */}
        {allProjects
          .filter((p) => p.slug?.current !== slug)
          .map((p) => (
            <LinkListItem
              key={p.slug?.current}
              title={p.title}
              subtitle={p.profession}
              href={`/projekte/${p.slug?.current}`}
            />
          ))}
      </div>
    </section>
  );
}
