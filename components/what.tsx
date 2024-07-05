import { WhatInterface } from "@/lib/interface";
import { client } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";
import WhatTab from "./what-tab";

async function getData() {
    const query = `*[_type == "what"]{name, text, info}[0]`
    const data = await client.fetch(query);
    return data;
};

export default async function What() {
    const data: WhatInterface = await getData();

    return (

        <div className="bg-neutral-200">
            <div className="px-6 py-12">
                <h2 className="mb-12">{data.name}</h2>
                <PortableText value={data.text} />
                <WhatTab />
                <PortableText value={data.info} />
            </div>

        </div>

    )
}