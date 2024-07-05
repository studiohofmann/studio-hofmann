import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from '../env'
import imageUrlBuilder from '@sanity/image-url'


export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
} 
