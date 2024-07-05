import { type SchemaTypeDefinition } from 'sanity'
import header from "@/sanity/schemas/header"
import projects from "@/sanity/schemas/projects"
import about from "@/sanity/schemas/about"
import blog from './schemas/blog'
import contact from './schemas/contact'
import what from './schemas/what'
import selectedProjects from './schemas/selected-Projects'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [header, projects, about, blog, contact, what, selectedProjects],
}
