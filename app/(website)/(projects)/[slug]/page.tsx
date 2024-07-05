import Image from "next/image";
import { client, urlFor } from "@/sanity/lib/client";
import { projects } from "@/lib/interface";
import { PortableText } from "next-sanity";



async function getData(slug: string) {
    const query = `*[_type == "projects" && projectSlug.current == "${slug}"] 
    {"projectSlug": projectSlug.current, projectName, projectImage, projectClient, projectDescription, projectGallery}[0]`
    const data = await client.fetch(query);
    return data;
};



export default async function Project({ params }: { params: { slug: string } }) {
    const data: projects = await getData(params.slug)
    return (
        <div className="">
            <div className="bg-neutral-300">
                <div className="mx-6 pt-16 pb-6">
                    <Image src={urlFor(data.projectImage).url()} alt="image" width={500} height={500} className="mt-6" />
                    <h1 className="mt-5">{data.projectName}</h1>
                    <div className="mt-5"><PortableText value={data.projectClient} /></div>
                    <div className="mt-5"><PortableText value={data.projectDescription} /></div>
                </div>
            </div>
            <div className="pt-6 bg-neutral-200">
                <div className="mx-6">{data.projectGallery.map((image) =>
                (<span key={image._id}>
                    <Image src={urlFor(image).url()} alt="image" width={500} height={500} className="mb-6" />
                </span>))}
                </div>
            </div>
        </div>

    )

}