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
  // Get the first three posts for featured, rest for regular
  const featuredPosts = posts.slice(0, 3);
  const regularPosts = posts.slice(3);

  return (
    <Layout>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Small Steps,<br />
            <span style={styles.heroHighlight}>Big Wellness</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Science-backed insights to help you live healthier, one fact at a time.
          </p>
        </div>
      </section>

      {/* Featured Posts Grid */}
      {featuredPosts.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Featured Articles</h2>
          <div style={styles.featuredGrid}>
            {featuredPosts.map((post, idx) => (
              <article key={post._id} style={{ ...styles.card, ...(idx === 0 && styles.featuredCard) }}>
                <Link href={`/post/${post.slug.current}`}>
                  <a style={styles.cardLink}>
                    {post.mainImage && (
                      <div style={styles.cardImageWrapper}>
                        <img
                          src={urlFor(post.mainImage).width(600).url()}
                          alt={post.title}
                          style={styles.cardImage}
                        />
                      </div>
                    )}
                    <div style={styles.cardContent}>
                      <h3 style={styles.cardTitle}>{post.title}</h3>
                      <p style={styles.cardMeta}>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </a>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      {regularPosts.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Latest Articles</h2>
          <div style={styles.postsGrid}>
            {regularPosts.map((post) => (
              <article key={post._id} style={styles.card}>
                <Link href={`/post/${post.slug.current}`}>
                  <a style={styles.cardLink}>
                    {post.mainImage && (
                      <div style={styles.cardImageWrapper}>
                        <img
                          src={urlFor(post.mainImage).width(400).url()}
                          alt={post.title}
                          style={styles.cardImage}
                        />
                      </div>
                    )}
                    <div style={styles.cardContent}>
                      <h3 style={styles.cardTitle}>{post.title}</h3>
                      <p style={styles.cardMeta}>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </a>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
};

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
    borderRadius: '2rem',
    padding: '4rem 2rem',
    marginBottom: '4rem',
    textAlign: 'center' as const,
  },
  heroContent: {
    maxWidth: 800,
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: 800,
    lineHeight: 1.2,
    color: '#1f2937',
    marginBottom: '1rem',
    letterSpacing: '-0.02em',
  },
  heroHighlight: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: '#4b5563',
    maxWidth: 600,
    margin: '0 auto',
    lineHeight: 1.6,
  },
  section: {
    marginBottom: '4rem',
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '2rem',
    color: '#1f2937',
    letterSpacing: '-0.01em',
  },
  featuredGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  postsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  featuredCard: {
    transform: 'scale(1.02)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  cardLink: {
    textDecoration: 'none',
    display: 'block',
  },
  cardImageWrapper: {
    width: '100%',
    height: '220px',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    transition: 'transform 0.3s ease',
  },
  cardContent: {
    padding: '1.5rem',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#111827',
    marginBottom: '0.5rem',
    lineHeight: 1.4,
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