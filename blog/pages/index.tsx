import type { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';
import { client, urlFor } from '../lib/sanity';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  author?: string;
  publishedAt: string;
}

interface Props {
  posts: Post[];
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <Layout>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={styles.pageTitle}>Latest Wellness Insights</h1>
        <div style={styles.grid}>
          {posts.map((post) => (
            <article key={post._id} style={styles.card}>
              {post.mainImage && (
                <Link href={`/post/${post.slug.current}`}>
                  <a style={styles.imageLink}>
                    <img
                      src={urlFor(post.mainImage).width(600).url()}
                      alt={post.title}
                      style={styles.cardImage}
                    />
                  </a>
                </Link>
              )}
              <div style={styles.cardContent}>
                <Link href={`/post/${post.slug.current}`}>
                  <a style={styles.cardTitle}>{post.title}</a>
                </Link>
                <p style={styles.cardMeta}>
                  By {post.author || 'Anonymous'} •{' '}
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    marginBottom: '2rem',
    color: '#1f2937',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  imageLink: {
    display: 'block',
  },
  cardImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover' as const,
  },
  cardContent: {
    padding: '1.5rem',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#111827',
    textDecoration: 'none',
    marginBottom: '0.5rem',
    display: 'inline-block',
    transition: 'color 0.2s',
  },
  cardMeta: {
    fontSize: '0.875rem',
    color: '#6b7280',
  },
};

export async function getStaticProps() {
  const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    mainImage,
    author,
    publishedAt
  }`;
  const posts = await client.fetch(query);
  return { props: { posts } };
}

export default Home;