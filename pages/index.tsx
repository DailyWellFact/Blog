// pages/index.tsx
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
  const [visibleCount, setVisibleCount] = useState(10);

  // Sort posts by date (newest first)
  const sortedPosts = useMemo(() => {
    return [...posts].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [posts]);

  // Filter posts based on search term
  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return sortedPosts;
    const term = searchTerm.toLowerCase();
    return sortedPosts.filter(post => post.title.toLowerCase().includes(term));
  }, [searchTerm, sortedPosts]);

  // Featured post is the first of the filtered posts (if any)
  const featuredPost = filteredPosts[0];

  // All other posts (after featured)
  const otherPosts = filteredPosts.slice(1);

  // Reset visible count when search changes
  useMemo(() => {
    setVisibleCount(10);
  }, [searchTerm]);

  // Slice for current page
  const visiblePosts = otherPosts.slice(0, visibleCount);
  const hasMore = visibleCount < otherPosts.length;

  const loadMore = () => {
    setVisibleCount(prev => prev + 10);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero" style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 className="hero-title" style={styles.heroTitle}>
            Small Habits,<br />
            <span style={styles.heroHighlight}>Big Wellness</span>
          </h1>
          <p className="hero-subtitle" style={styles.heroSubtitle}>
            Science-backed wellness insights delivered daily. Start your journey to a healthier you.
          </p>
          <div style={styles.heroButtons}>
            <Link href="#latest">
              <a className="primary-button" style={styles.primaryButton}>Explore Articles</a>
            </Link>
            <Link href="/about">
              <a className="secondary-button" style={styles.secondaryButton}>Learn More</a>
            </Link>
          </div>
        </div>
        <div style={styles.heroImage}>
          <div style={styles.heroImagePlaceholder}>
            <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="300" fill="url(#gradient)" />
              <circle cx="200" cy="150" r="80" fill="white" fillOpacity="0.2" />
              <path d="M200 100 L220 150 L200 200 L180 150 Z" fill="white" fillOpacity="0.6" />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="400" y2="300" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#10b981" />
                  <stop offset="1" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section style={styles.featuredSection}>
          <div style={styles.featuredContainer}>
            <div style={styles.featuredContent}>
              <span style={styles.featuredBadge}>Featured Article</span>
              <h2 className="featured-title" style={styles.featuredTitle}>{featuredPost.title}</h2>
              <p style={styles.featuredMeta}>
                By {featuredPost.author || 'Anonymous'} •{' '}
                {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <Link href={`/post/${featuredPost.slug.current}`}>
                <a style={styles.featuredButton}>Read More →</a>
              </Link>
            </div>
            {featuredPost.mainImage && (
              <div style={styles.featuredImage}>
                <img
                  src={urlFor(featuredPost.mainImage).width(600).url()}
                  alt={featuredPost.title}
                  style={styles.featuredImageStyle}
                />
              </div>
            )}
          </div>
        </section>
      )}

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
            className="search-input"
            style={styles.searchInput}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} style={styles.clearButton}>
              ✕
            </button>
          )}
        </div>
      </div>

      {/* All Posts Grid */}
      <section id="latest" style={styles.latestSection}>
        <div style={styles.sectionHeader}>
          <h2 className="section-title" style={styles.sectionTitle}>
            {searchTerm ? 'Search Results' : 'All Articles'}
          </h2>
          {!searchTerm && (
            <p className="section-subtitle" style={styles.sectionSubtitle}>Explore our complete collection of wellness insights</p>
          )}
        </div>
        {visiblePosts.length === 0 ? (
          <div style={styles.noResults}>
            <p>No articles found matching "{searchTerm}".</p>
          </div>
        ) : (
          <>
            <div style={styles.grid}>
              {visiblePosts.map((post) => (
                <article key={post._id} style={styles.card}>
                  {post.mainImage && (
                    <Link href={`/post/${post.slug.current}`}>
                      <a style={styles.imageLink}>
                        <img
                          src={urlFor(post.mainImage).width(600).url()}
                          alt={post.title}
                          className="card-image"
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
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            {hasMore && (
              <div style={styles.loadMoreContainer}>
                <button onClick={loadMore} style={styles.loadMoreButton}>
                  Load More
                </button>
              </div>
            )}
            {!hasMore && visiblePosts.length > 0 && (
              <p style={styles.endMessage}>You've reached the end 🎉</p>
            )}
          </>
        )}
      </section>

      <style jsx>{`
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem !important;
          }
          .hero-subtitle {
            font-size: 1rem !important;
          }
          .section-title {
            font-size: 1.75rem !important;
          }
          .section-subtitle {
            font-size: 1rem !important;
          }
          .featured-title {
            font-size: 1.5rem !important;
          }
          .card-image {
            height: 160px !important;
          }
          .primary-button,
          .secondary-button {
            padding: 0.5rem 1rem !important;
            font-size: 0.875rem !important;
          }
          .search-input {
            font-size: 0.875rem !important;
            padding: 0.5rem 1rem 0.5rem 2rem !important;
          }
        }
        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.75rem !important;
          }
          .section-title {
            font-size: 1.5rem !important;
          }
          .card-image {
            height: 140px !important;
          }
        }
      `}</style>
    </Layout>
  );
};

const styles = {
  hero: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '2rem',
    marginBottom: '4rem',
    padding: '2rem 0',
  },
  heroContent: {
    flex: 1,
    minWidth: '280px',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    lineHeight: 1.2,
    marginBottom: '1rem',
    color: '#1f2937',
  },
  heroHighlight: {
    color: '#10b981',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: '#4b5563',
    marginBottom: '2rem',
    maxWidth: '500px',
  },
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap' as const,
  },
  primaryButton: {
    backgroundColor: '#10b981',
    color: '#ffffff',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#10b981',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    textDecoration: 'none',
    fontWeight: '500',
    border: '1px solid #10b981',
    transition: 'background-color 0.2s, color 0.2s',
  },
  heroImage: {
    flex: 1,
    minWidth: '280px',
    maxWidth: '400px',
  },
  heroImagePlaceholder: {
    width: '100%',
    height: 'auto',
    borderRadius: '1rem',
    overflow: 'hidden',
  },
  featuredSection: {
    marginBottom: '4rem',
    backgroundColor: '#f3f4f6',
    borderRadius: '1rem',
    overflow: 'hidden',
  },
  featuredContainer: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    gap: '2rem',
    padding: '2rem',
  },
  featuredContent: {
    flex: 1,
    minWidth: '280px',
  },
  featuredBadge: {
    display: 'inline-block',
    backgroundColor: '#10b981',
    color: '#ffffff',
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem',
    marginBottom: '1rem',
  },
  featuredTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#1f2937',
  },
  featuredMeta: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '1rem',
  },
  featuredButton: {
    color: '#10b981',
    textDecoration: 'none',
    fontWeight: '500',
    display: 'inline-block',
    marginTop: '0.5rem',
  },
  featuredImage: {
    flex: 1,
    minWidth: '280px',
    maxWidth: '400px',
  },
  featuredImageStyle: {
    width: '100%',
    height: 'auto',
    borderRadius: '0.5rem',
    objectFit: 'cover' as const,
  },
  searchSection: {
    marginBottom: '3rem',
    display: 'flex',
    justifyContent: 'center',
  },
  searchContainer: {
    position: 'relative' as const,
    width: '100%',
    maxWidth: '500px',
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
  latestSection: {
    marginBottom: '4rem',
  },
  sectionHeader: {
    textAlign: 'center' as const,
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  sectionSubtitle: {
    fontSize: '1.125rem',
    color: '#6b7280',
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
    transition: 'transform 0.3s',
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
  noResults: {
    textAlign: 'center' as const,
    padding: '3rem',
    color: '#6b7280',
    fontSize: '1.125rem',
  },
  loadMoreContainer: {
    textAlign: 'center' as const,
    marginTop: '2rem',
  },
  loadMoreButton: {
    backgroundColor: '#10b981',
    color: '#ffffff',
    padding: '0.75rem 2rem',
    borderRadius: '2rem',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  endMessage: {
    textAlign: 'center' as const,
    marginTop: '2rem',
    color: '#6b7280',
    fontSize: '0.875rem',
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