import { client } from "@/sanity/lib/client";
import { HOME_QUERY } from "@/sanity/lib/queries";
import { Home as HomeType } from "@/sanity.types";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

export default async function GetInTouch() {
  // Fetch all home content
  const homeData = await client.fetch<HomeType>(HOME_QUERY);

  if (!homeData || !homeData.getInTouch) {
    return <div>No content found.</div>;
  }

  const { text, contactDetails } = homeData.getInTouch;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 bg-neutral-500 p-4">
      {/* Render the text content */}
      {text && text.length > 0 && (
        <div>
          <PortableText value={text} />
        </div>
      )}

      <div>
        {contactDetails && contactDetails.length > 0 && (
          <div className="grid grid-cols-1 gap-2">
            {contactDetails.map((contact, index) => (
              <div key={index} className="grid grid-cols-1 gap-2">
                {/* Handle different contact types */}
                {contact.title?.toLowerCase() === "email" ? (
                  contact.value ? (
                    <Link href={contact.value}>{contact.title}</Link>
                  ) : (
                    <span>{contact.title}</span>
                  )
                ) : contact.title?.toLowerCase() === "instagram" ? (
                  <a
                    href={`https://instagram.com/${contact.value?.replace("@", "") || ""}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contact.title}
                  </a>
                ) : (
                  <div>
                    {contact.title}: {contact.value}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
