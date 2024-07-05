import { projects } from "@/lib/interface";
import { client, urlFor } from "@/sanity/lib/client";
import Image from "next/image"
import Link from "next/link";
import SelectedProjects from "./selected-projects";

async function getData() {
    const query = `*[_type == "projects"]{projectImage, projectName, "projectSlug":projectSlug.current}`
    const data = await client.fetch(query);
    return data;
};

export default async function ProjectImage() {
    const data: projects[] = await getData()
    return (
        <div className="bg-gray-300">
            <SelectedProjects />
            <div>{data.map((image, idx) => (
                <div key={idx} className="mx-6 mb-12">
                    <p className="mb-3">{image.projectName}</p>
                    <Link href={`/${image.projectSlug}`}>
                        <Image src={urlFor(image.projectImage).url()} alt="image" width={500} height={500} />
                    </Link>
                </div>
            ))}</div></div>
    )
}