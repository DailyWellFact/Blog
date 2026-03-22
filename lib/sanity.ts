import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url';
import { client } from './sanityClient'; // your sanity client

export const urlFor = (source: any) => createImageUrlBuilder(client).image(source);

export const client = createClient({
  projectId: 'q5ebm0hv',
  dataset: 'production',
  apiVersion: '2026-03-20',
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)
