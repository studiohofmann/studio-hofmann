import { client } from "@/sanity/lib/client";
import { CONTACT_QUERY } from "@/sanity/lib/queries";
import { Contact as ContactType } from "@/sanity.types";
import { PortableText } from "@portabletext/react";

export default async function Contact() {
  const contactData = await client.fetch<ContactType>(CONTACT_QUERY);
  return (
    <section>
      <div>Kontakt</div>

      {contactData.text && (
        <div className="prose lg:prose-xl">
          <PortableText value={contactData.text} />
        </div>
      )}
    </section>
  );
}
