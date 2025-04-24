import { client } from "@/sanity/lib/client";
import { DISCLAIMER_QUERY } from "@/sanity/lib/queries";
import { Disclaimer as DisclaimerType } from "@/sanity.types";
import { PortableText } from "@portabletext/react";

export default async function Disclaimer() {
  const disclaimerData = await client.fetch<DisclaimerType>(DISCLAIMER_QUERY);

  return (
    <section className="flex gap-12">
      {disclaimerData.responsibilityText && (
        <div className="flex-1">
          <PortableText value={disclaimerData.responsibilityText} />
        </div>
      )}
      {disclaimerData.disclaimerText && (
        <div className="flex-2">
          <PortableText value={disclaimerData.disclaimerText} />
        </div>
      )}
    </section>
  );
}
