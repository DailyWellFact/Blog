import type { NextPage } from 'next';
import Link from 'next/link';
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

// ✅ Deterministic date formatter (no hydration issues)
const formatDate = (date: string) => {
  return new Date(date).toISOString().split('T')[0];
};

const Home: NextPage<Props> = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);

  // ✅ Sort posts (safe)
  const sortedPosts = useMemo(() => {
    return [...posts].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    );
  }, [posts]);

  // ✅ Featured post (safe)
  const featuredPost = useMemo(() => {
    const fridayPosts = sortedPosts.filter((post) => {
      return new Date(post.publishedAt).getDay() === 5;
    });
    return fridayPosts[0] || sortedPosts[0] || null;
  }, [sortedPosts]);

  // ✅ Search filter
  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return sortedPosts;
    const term = searchTerm.toLowerCase();
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(term)
    );
  }, [searchTerm, sortedPosts]);

  // ✅ Grid posts
  const gridPosts = useMemo(() => {
    if (searchTerm.trim()) return filteredPosts;
    return filteredPosts.filter(
      (post) => post._id !== featuredPost?._id
    );
  }, [searchTerm, filteredPosts, featuredPost]);

  // ✅ Correct hook usage
  useEffect(() => {
    setVisibleCount(10);
  }, [searchTerm]);

  const visiblePosts = gridPosts.slice(0, visibleCount);
  const hasMore = visibleCount < gridPosts.length;

  const loadMore = () => setVisibleCount((prev) => prev + 10);

  return (
    <Layout>
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Small Habits,<br />
            <span style={styles.heroHighlight}>Big Wellness</span>
          </h1>

          <p style={styles.heroSubtitle}>
            Science-backed wellness insights delivered daily.
          </p>

          <div style={styles.heroButtons}>
            <Link href="#latest" style={styles.primaryButton}>
              Explore Articles
            </Link>

            <Link href="/about" style={styles.secondaryButton}>
              Learn More
            </Link>
          </div>
        </div>

        <div style={styles.heroImage}>
          <img
            src="/hero.png"
            alt="Hero"
            style={styles.heroImageStyle}
          />
        </div>
      </section>

      {/* FEATURED */}
      {!searchTerm && featuredPost && (
        <section style={styles.featuredSection}>
          <div style={styles.featuredContainer}>
            <div style={styles.featuredContent}>
              <span style={styles.featuredBadge}>
                Featured Article
              </span>

              <h2 style={styles.featuredTitle}>
                {featuredPost.title}
              </h2>

              <p style={styles.featuredMeta}>
                By {featuredPost.author || 'Anonymous'} •{' '}
                {formatDate(featuredPost.publishedAt)}
              </p>

              <Link
                href={`/post/${featuredPost.slug.current}`}
                style={styles.featuredButton}
              >
                Read More →
              </Link>
            </div>

            {featuredPost.mainImage && (
              <img
                src={urlFor(featuredPost.mainImage).width(600).url()}
                alt={featuredPost.title}
                style={styles.featuredImage}
              />
            )}
          </div>
        </section>
      )}

      {/* SEARCH */}
      <div style={styles.searchSection}>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* GRID */}
      <section id="latest">
        {visiblePosts.length === 0 ? (
          <p style={styles.noResults}>
            No results for "{searchTerm}"
          </p>
        ) : (
          <>
            <div style={styles.grid}>
              {visiblePosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/post/${post.slug.current}`}
                  style={styles.cardLink}
                >
                  <article style={styles.card}>
                    {post.mainImage && (
                      <img
                        src={urlFor(post.mainImage).width(600).url()}
                        alt={post.title}
                        style={styles.cardImage}
                      />
                    )}

                    <div style={styles.cardContent}>
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
              <div style={styles.loadMoreWrap}>
                <button
                  onClick={loadMore}
                  style={styles.loadMoreButton}
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </Layout>
  );
};

const styles = {
  hero: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '2rem',
    marginBottom: '3rem',
  },
  heroContent: { flex: 1, minWidth: 280 },
  heroTitle: { fontSize: '2.5rem', fontWeight: 'bold' },
  heroHighlight: { color: '#10b981' },
  heroSubtitle: { marginTop: '1rem', color: '#6b7280' },
  heroButtons: { marginTop: '1.5rem', display: 'flex', gap: '1rem' },
  primaryButton: {
    background: '#10b981',
    color: '#fff',
    padding: '0.6rem 1.2rem',
    borderRadius: '0.5rem',
    textDecoration: 'none',
  },
  secondaryButton: {
    border: '1px solid #10b981',
    padding: '0.6rem 1.2rem',
    borderRadius: '0.5rem',
    textDecoration: 'none',
  },
  heroImage: { flex: 1 },
  heroImageStyle: { width: '100%', borderRadius: '1rem' },

  featuredSection: { marginBottom: '3rem' },
  featuredContainer: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap' as const,
  },
  featuredContent: { flex: 1 },
  featuredBadge: {
    background: '#10b981',
    color: '#fff',
    padding: '0.2rem 0.6rem',
    borderRadius: '1rem',
    fontSize: '0.75rem',
  },
  featuredTitle: { fontSize: '1.8rem', marginTop: '0.5rem' },
  featuredMeta: { fontSize: '0.85rem', color: '#6b7280' },
  featuredButton: {
    display: 'inline-block',
    marginTop: '1rem',
    color: '#10b981',
    textDecoration: 'none',
  },
  featuredImage: { width: 400, borderRadius: '0.5rem' },

  searchSection: { marginBottom: '2rem' },
  searchInput: {
    width: '100%',
    maxWidth: 400,
    padding: '0.6rem 1rem',
    borderRadius: '2rem',
    border: '1px solid #ddd',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px,1fr))',
    gap: '2rem',
  },
  cardLink: { textDecoration: 'none', color: 'inherit' },
  card: {
    background: '#fff',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  cardImage: { width: '100%', height: 180, objectFit: 'cover' as const },
  cardContent: { padding: '1rem' },
  cardTitle: { fontSize: '1.1rem' },
  cardMeta: { fontSize: '0.8rem', color: '#6b7280' },

  loadMoreWrap: { textAlign: 'center' as const, marginTop: '2rem' },
  loadMoreButton: {
    padding: '0.6rem 1.5rem',
    borderRadius: '2rem',
    background: '#10b981',
    color: '#fff',
    border: 'none',
  },

  noResults: { textAlign: 'center' as const },
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
