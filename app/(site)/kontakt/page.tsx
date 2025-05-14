import { client } from "@/sanity/lib/client";
import { CONTACT_QUERY } from "@/sanity/lib/queries";
import { Contact as ContactType } from "@/sanity.types";
import { PortableText } from "@portabletext/react";
import ContactForm from "../components/ContactForm";

export default async function Contact() {
  const contactData = await client.fetch<ContactType>(CONTACT_QUERY);
  return (
    <section>
      {contactData.text && <PortableText value={contactData.text} />}
      <div className="line"></div>
      <ContactForm />
      <div className="line xl:hidden"></div>
    </section>
  );
}
