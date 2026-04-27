// pages/sitemap.xml.ts
import { GetServerSideProps } from 'next';
import { client } from '../lib/sanity';

const BASE_URL = 'https://dailywellfact.com';

interface Post {
  slug: { current: string };
  publishedAt: string;
  updatedAt?: string;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toISOString().split('T')[0]; // YYYY-MM-DD
}

function generateSiteMap(posts: Post[]) {
  const now = new Date().toISOString().split('T')[0];

  // Static pages with their priorities and changefreq
  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/about', priority: '0.6', changefreq: 'monthly' },
    { path: '/contact', priority: '0.6', changefreq: 'monthly' },
    { path: '/privacy', priority: '0.6', changefreq: 'monthly' },
    { path: '/disclaimer', priority: '0.6', changefreq: 'monthly' },
    { path: '/terms', priority: '0.6', changefreq: 'monthly' },
    { path: '/editorial-policy', priority: '0.6', changefreq: 'monthly' },
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('')}
  ${posts
    .map((post) => {
      const lastmod = post.updatedAt ? formatDate(post.updatedAt) : formatDate(post.publishedAt);
      return `
  <url>
    <loc>${BASE_URL}/post/${post.slug.current}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join('')}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Fetch all posts with publishedAt and updatedAt
  const query = `*[_type == "post"] {
    slug,
    publishedAt,
    updatedAt
  }`;
  const posts: Post[] = await client.fetch(query);

  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default function SiteMap() {
  return null;
}
