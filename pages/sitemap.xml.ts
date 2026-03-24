import { GetServerSideProps } from 'next';
import { client } from '../lib/sanity';

const BASE_URL = 'https://dailywellfact.com';

function generateSiteMap(posts: any[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    <!-- Static Pages -->
    <url>
      <loc>${BASE_URL}/</loc>
    </url>
    <url>
      <loc>${BASE_URL}/about</loc>
    </url>
    <url>
      <loc>${BASE_URL}/contact</loc>
    </url>
    <url>
      <loc>${BASE_URL}/privacy</loc>
    </url>
    <url>
      <loc>${BASE_URL}/disclaimer</loc>
    </url>

    <!-- Blog Posts -->
    ${posts
      .map((post) => {
        return `
        <url>
          <loc>${BASE_URL}/post/${post.slug.current}</loc>
        </url>
        `;
      })
      .join('')}

  </urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const query = `*[_type == "post"]{ slug }`;
  const posts = await client.fetch(query);

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
