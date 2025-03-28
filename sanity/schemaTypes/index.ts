import { type SchemaTypeDefinition } from "sanity";
import emailSignature from "./emailSignature";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [emailSignature],
};
