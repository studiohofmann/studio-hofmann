import { client } from "@/sanity/lib/client";
import { HOME_QUERY } from "@/sanity/lib/queries";
import { Home as HomeType } from "@/sanity.types";
import { PortableText } from "@portabletext/react";
import SanityImage from "./components/SanityImage";
import GetInTouch from "./components/home/GetInTouch";
import LatestBlogPost from "./components/home/LatestBlogPost";

export const revalidate = 0; // Re-fetch on every request or set a time here

export default async function Home() {
  // Fetch all home content
  const homeData = await client.fetch<HomeType>(HOME_QUERY);

  if (!homeData) {
    return <div>No content found.</div>;
  }

  return (
    <section>
      {homeData.introduction && <PortableText value={homeData.introduction} />}
      <div className="line"></div>
      {/* Professions Section */}

      {homeData.professions?.map((profession, index) => (
        <div key={index} className="flex flex-col">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Left Side: Title and Image */}
            <div className="flex flex-col gap-4 lg:w-1/2">
              {profession.image && (
                <SanityImage
                  image={profession.image}
                  altFallback="About image"
                  priority={true}
                />
              )}
            </div>
            {/* Right Side: Text */}
            <div className="lg:w-1/2 flex flex-col gap-4">
              {profession.title && <h2>{profession.title}</h2>}
              {profession.text && <PortableText value={profession.text} />}
            </div>
          </div>
          <div className="line"></div>
        </div>
      ))}
      <GetInTouch />
      <div className="line"></div>
      <LatestBlogPost />
    </section>
  );
}
