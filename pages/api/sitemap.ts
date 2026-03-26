import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../lib/sanity';

const BASE_URL = 'https://dailywellfact.com';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = `*[_type == "post"]{ slug }`;
  const posts = await client.fetch(query);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    <url><loc>${BASE_URL}/</loc></url>
    <url><loc>${BASE_URL}/about</loc></url>
    <url><loc>${BASE_URL}/contact</loc></url>
    <url><loc>${BASE_URL}/privacy</loc></url>
    <url><loc>${BASE_URL}/disclaimer</loc></url>

    ${posts
      .map(
        (post: any) => `
        <url>
          <loc>${BASE_URL}/post/${post.slug.current}</loc>
        </url>`
      )
      .join('')}

  </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(sitemap);
}
