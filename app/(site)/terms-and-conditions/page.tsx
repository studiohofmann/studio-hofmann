import { client } from "@/sanity/lib/client";
import { TERMS_AND_CONDITIONS_QUERY } from "@/sanity/lib/queries";
import { TermsAndConditions as TermsAndConditionsType } from "@/sanity.types";
import { PortableText } from "@portabletext/react";

// Server component
export default async function TermsAndConditionsPage() {
  // 1) Fetch the data from Sanity
  const termsData = await client.fetch<TermsAndConditionsType>(
    TERMS_AND_CONDITIONS_QUERY
  );

  // 2) Render the PortableText content
  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      {termsData.text && (
        <div className="prose lg:prose-xl">
          <PortableText value={termsData.text} />
        </div>
      )}
    </section>
  );
}
