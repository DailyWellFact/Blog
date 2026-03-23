import type { NextPage } from 'next';
import Link from 'next/link';
import { useState, useMemo } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');

  // Filter posts based on search term
  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return posts;
    const term = searchTerm.toLowerCase();
    return posts.filter(post => post.title.toLowerCase().includes(term));
  }, [searchTerm, posts]);

  // Mark first three posts as featured (only when not searching)
  const isSearching = searchTerm.trim() !== '';
  const showFeaturedBadge = !isSearching;

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

      {/* Search Bar */}
      <div style={styles.searchSection}>
        <div style={styles.searchContainer}>
          <svg
            style={styles.searchIcon}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={styles.clearButton}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Posts Grid */}
      <section style={styles.section}>
        <div style={styles.postsGrid}>
          {filteredPosts.length === 0 ? (
            <div style={styles.noResults}>
              <p>No articles found matching "{searchTerm}".</p>
            </div>
          ) : (
            filteredPosts.map((post, idx) => (
              <article
                key={post._id}
                style={{
                  ...styles.card,
                  ...(showFeaturedBadge && idx < 3 && styles.featuredCard),
                }}
              >
                {showFeaturedBadge && idx < 3 && (
                  <div style={styles.featuredBadge}>Featured</div>
                )}
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
            ))
          )}
        </div>
      </section>
    </Layout>
  );
};

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
    borderRadius: '2rem',
    padding: '4rem 2rem',
    marginBottom: '3rem',
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
  searchSection: {
    marginBottom: '3rem',
    display: 'flex',
    justifyContent: 'center',
  },
  searchContainer: {
    position: 'relative' as const,
    width: '100%',
    maxWidth: 500,
  },
  searchIcon: {
    position: 'absolute' as const,
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 20,
    height: 20,
    color: '#9ca3af',
    pointerEvents: 'none' as const,
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    fontSize: '1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '2rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'inherit',
    backgroundColor: '#ffffff',
  },
  clearButton: {
    position: 'absolute' as const,
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    color: '#9ca3af',
    padding: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'background 0.2s',
  },
  section: {
    marginBottom: '4rem',
  },
  postsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
  },
  card: {
    position: 'relative' as const,
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
  featuredBadge: {
    position: 'absolute' as const,
    top: '1rem',
    left: '1rem',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '2rem',
    fontSize: '0.75rem',
    fontWeight: 600,
    zIndex: 1,
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
  noResults: {
    textAlign: 'center' as const,
    padding: '3rem',
    color: '#6b7280',
    fontSize: '1.125rem',
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