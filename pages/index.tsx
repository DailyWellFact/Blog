import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo, useEffect } from 'react';
import Layout from '../components/Layout';
import { client, urlFor } from '../lib/sanity';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: any;
  author?: string;
  publishedAt: string;
}

interface Props {
  posts: Post[];
}

// ✅ Hydration-safe date
const formatDate = (date: string) =>
  new Date(date).toISOString().split('T')[0];

const Home: NextPage<Props> = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(9);

  const sortedPosts = useMemo(() => {
    return [...posts].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    );
  }, [posts]);

  const featuredPost = useMemo(() => {
    return sortedPosts[0] || null;
  }, [sortedPosts]);

  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return sortedPosts;
    return sortedPosts.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, sortedPosts]);

  const gridPosts = useMemo(() => {
    if (searchTerm) return filteredPosts;
    return filteredPosts.filter((p) => p._id !== featuredPost?._id);
  }, [searchTerm, filteredPosts, featuredPost]);

  useEffect(() => {
    setVisibleCount(9);
  }, [searchTerm]);

  const visiblePosts = gridPosts.slice(0, visibleCount);
  const hasMore = visibleCount < gridPosts.length;

  return (
    <Layout>
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroText}>
          <h1 style={styles.heroTitle}>
            Small Habits,
            <br />
            <span style={styles.heroHighlight}>Big Wellness</span>
          </h1>

          <p style={styles.heroSubtitle}>
            Science-backed insights that shape a stronger, healthier future.
          </p>

          <div style={styles.heroButtons}>
            <Link href="#latest" style={styles.primaryBtn}>
              Explore Articles
            </Link>
            <Link href="/about" style={styles.secondaryBtn}>
              Learn More
            </Link>
          </div>
        </div>

        <div style={styles.heroImageWrap}>
          <Image
            src="/hero.png"
            alt="Wellness"
            width={600}
            height={400}
            priority
            style={styles.heroImage}
          />
        </div>
      </section>

      {/* FEATURED */}
      {!searchTerm && featuredPost && (
        <section style={styles.featured}>
          <div style={styles.featuredContent}>
            <span style={styles.badge}>Featured</span>

            <h2 style={styles.featuredTitle}>
              {featuredPost.title}
            </h2>

            <p style={styles.meta}>
              By {featuredPost.author || 'Anonymous'} •{' '}
              {formatDate(featuredPost.publishedAt)}
            </p>

            <Link
              href={`/post/${featuredPost.slug.current}`}
              style={styles.readBtn}
            >
              Read Article →
            </Link>
          </div>

          {featuredPost.mainImage && (
            <div style={styles.featuredImageWrap}>
              <Image
                src={urlFor(featuredPost.mainImage)
                  .width(800)
                  .url()}
                alt={featuredPost.title}
                width={800}
                height={500}
                style={styles.featuredImage}
              />
            </div>
          )}
        </section>
      )}

      {/* SEARCH */}
      <div style={styles.searchWrap}>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.search}
        />
      </div>

      {/* GRID */}
      <section id="latest">
        <div style={styles.grid}>
          {visiblePosts.map((post) => (
            <Link
              key={post._id}
              href={`/post/${post.slug.current}`}
              style={styles.cardLink}
            >
              <article style={styles.card}>
                {post.mainImage && (
                  <Image
                    src={urlFor(post.mainImage)
                      .width(600)
                      .url()}
                    alt={post.title}
                    width={600}
                    height={400}
                    sizes="(max-width:768px) 100vw, 33vw"
                    style={styles.cardImage}
                  />
                )}

                <div style={styles.cardBody}>
                  <h3 style={styles.cardTitle}>
                    {post.title}
                  </h3>

                  <p style={styles.cardMeta}>
                    {formatDate(post.publishedAt)}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {hasMore && (
          <div style={styles.loadWrap}>
            <button
              onClick={() =>
                setVisibleCount((v) => v + 9)
              }
              style={styles.loadBtn}
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </Layout>
  );
};

const styles = {
  hero: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    gap: '3rem',
    marginBottom: '4rem',
  },
  heroText: { flex: 1, minWidth: 280 },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: 800,
    lineHeight: 1.2,
  },
  heroHighlight: { color: '#10b981' },
  heroSubtitle: {
    marginTop: '1rem',
    color: '#6b7280',
    fontSize: '1.2rem',
  },
  heroButtons: { marginTop: '1.5rem', display: 'flex', gap: '1rem' },
  primaryBtn: {
    background: '#10b981',
    color: '#fff',
    padding: '0.7rem 1.4rem',
    borderRadius: '0.5rem',
    textDecoration: 'none',
  },
  secondaryBtn: {
    border: '1px solid #10b981',
    padding: '0.7rem 1.4rem',
    borderRadius: '0.5rem',
    textDecoration: 'none',
    color: '#10b981',
  },
  heroImageWrap: { flex: 1, minWidth: 280 },
  heroImage: { width: '100%', borderRadius: '1rem' },

  featured: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '2rem',
    background: '#f3f4f6',
    padding: '2rem',
    borderRadius: '1rem',
    marginBottom: '3rem',
  },
  featuredContent: { flex: 1, minWidth: 280 },
  badge: {
    background: '#10b981',
    color: '#fff',
    padding: '0.2rem 0.7rem',
    borderRadius: '1rem',
    fontSize: '0.75rem',
  },
  featuredTitle: {
    fontSize: '2rem',
    marginTop: '0.5rem',
    fontWeight: 700,
  },
  meta: { color: '#6b7280', marginTop: '0.5rem' },
  readBtn: {
    marginTop: '1rem',
    display: 'inline-block',
    color: '#10b981',
    textDecoration: 'none',
  },
  featuredImageWrap: { flex: 1, minWidth: 280 },
  featuredImage: {
    width: '100%',
    borderRadius: '0.5rem',
  },

  searchWrap: { textAlign: 'center' as const, marginBottom: '2rem' },
  search: {
    width: '100%',
    maxWidth: 400,
    padding: '0.7rem 1rem',
    borderRadius: '2rem',
    border: '1px solid #ddd',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fill, minmax(260px,1fr))',
    gap: '2rem',
  },
  cardLink: { textDecoration: 'none', color: 'inherit' },
  card: {
    background: '#fff',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  },
  cardImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover' as const,
  },
  cardBody: { padding: '1rem' },
  cardTitle: { fontSize: '1.1rem', fontWeight: 600 },
  cardMeta: { fontSize: '0.8rem', color: '#6b7280' },

  loadWrap: { textAlign: 'center' as const, marginTop: '2rem' },
  loadBtn: {
    background: '#10b981',
    color: '#fff',
    border: 'none',
    padding: '0.7rem 2rem',
    borderRadius: '2rem',
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
