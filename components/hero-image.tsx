import { heroImage } from "@/lib/interface";
import { client, urlFor } from "@/sanity/lib/client";
import Image from "next/image"
import { PortableText } from "next-sanity";
import { ArrowUpOutlined } from '@ant-design/icons';

async function getData() {
  const query = `*[_type == "header"]{heroImage, touch, headerText}[0]`
  const data = await client.fetch(query);
  return data;
};

export default async function HeroImage() {
  const data: heroImage = await getData()
  return (
    <div>
      <div className="absolute z-10 mt-14 right-2">{data.touch} <ArrowUpOutlined /></div>
      <div className="relative h-[50vh] text-center flex items-center justify-center">

        <Image src={urlFor(data.heroImage).url()} alt="image" width={1920} height={1440} className="h-full z-0" />
        <div className="absolute mx-5 text-white"><PortableText value={data.headerText} /></div>
      </div>
    </div>

  )
}