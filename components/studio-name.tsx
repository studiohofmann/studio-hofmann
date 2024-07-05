import { studioName } from "@/lib/interface";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

async function getData() {
    const query = `*[_type == "header"]{name}[0]`
    const data = await client.fetch(query);
    return data;
};

export default async function StudioName() {
    const data: studioName = await getData()
    return (
        <div className="bg-neutral-200 hover:bg-sky-700 border border-neutral-700 shadow-md flex items-center justify-center w-1/2">
            <Link href="/" className="">{data.name}</Link>
        </div>
    )
}