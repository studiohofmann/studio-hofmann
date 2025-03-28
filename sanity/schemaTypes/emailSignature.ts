import { defineField } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

const emailSignature = {
  name: "emailSignature",
  title: "Email Signature",
  type: "document",
  icon: EnvelopeIcon,

  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
};

export default emailSignature;
