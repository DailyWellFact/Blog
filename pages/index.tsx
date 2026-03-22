import type { NextPage } from 'next';
import Link from 'next/link';
import { client, urlFor } from '../lib/sanity';

interface Post {
  _id: string;
  title: string;
  slug?: { current?: string };
  mainImage?: any;
  author?: string;
  publishedAt?: string;
}

interface Props {
  posts: Post[];
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1>Latest Wellness Insights</h1>

      {posts.map((post) => {
        const postUrl = post.slug?.current ? `/post/${post.slug.current}` : null;
        const imageUrl = post.mainImage ? urlFor(post.mainImage).width(600).url() : null;

        return (
          <article key={post._id}>
            {imageUrl && postUrl && (
              <Link href={postUrl}>
                <img src={imageUrl} alt={post.title} width={600} />
              </Link>
            )}

            <h2>
              {postUrl ? <Link href={postUrl}>{post.title}</Link> : post.title}
            </h2>
          </article>
        );
      })}
    </main>
  );
};

export async function getStaticProps() {
  const query = `*[_type == "post"]{ _id, title, slug, mainImage, author, publishedAt }`;
  const posts = await client.fetch(query);
  return { props: { posts } };
}

export default Home;
