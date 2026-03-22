// lib/sanity.ts
import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

// Initialize the Sanity client
export const client = createClient({
  projectId: 'q5ebm0hv',
  dataset: 'production',
  apiVersion: '2026-03-20',
  useCdn: true,
});

// Helper to build image URLs
export const urlFor = (source: any) => createImageUrlBuilder(client).image(source);
