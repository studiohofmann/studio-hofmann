import { selectedProjects } from "@/lib/interface";
import { client } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";


async function getData() {
    const query = `*[_type == "selectedProjects"]{name, text}[0]`
    const data = await client.fetch(query);
    return data;
};

export default async function SelectedProjects() {
    const data: selectedProjects = await getData()
    return (
        <div className="px-6 py-12">
            <h2 className="mb-6">{data.name}</h2>
            <PortableText value={data.text} />
        </div>
    )
}