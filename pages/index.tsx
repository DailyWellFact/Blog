import { useState } from 'react';
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
  featuredPost: Post | null;
}

const Home: NextPage<Props> = ({ posts, featuredPost }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sort posts by date (newest first) and take first 6 for the grid (excluding featured)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const featured = featuredPost || sortedPosts[0];
  const allRecentPosts = sortedPosts.filter((post) => post._id !== featured?._id);

  // Filter posts based on search query (case‑insensitive)
  const filteredPosts = allRecentPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show only the first 6 posts (or all if fewer) after filtering
  const recentPosts = filteredPosts.slice(0, 6);

  return (
    <Layout>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Small Habits,<br />
            <span style={styles.heroHighlight}>Big Wellness</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Science-backed wellness insights delivered daily. Start your journey to a healthier you.
          </p>
          <div style={styles.heroButtons}>
            <Link href="#latest">
              <a style={styles.primaryButton}>Explore Articles</a>
            </Link>
            <Link href="/about">
              <a style={styles.secondaryButton}>Learn More</a>
            </Link>
          </div>
        </div>
        <div style={styles.heroImage}>
          <div style={styles.heroImagePlaceholder}>
            {/* Placeholder illustration – replace with your own image if desired */}
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
      {featured && (
        <section style={styles.featuredSection}>
          <div style={styles.featuredContainer}>
            <div style={styles.featuredContent}>
              <span style={styles.featuredBadge}>Featured Article</span>
              <h2 style={styles.featuredTitle}>{featured.title}</h2>
              <p style={styles.featuredMeta}>
                By {featured.author || 'Anonymous'} •{' '}
                {new Date(featured.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <Link href={`/post/${featured.slug.current}`}>
                <a style={styles.featuredButton}>Read More →</a>
              </Link>
            </div>
            {featured.mainImage && (
              <div style={styles.featuredImage}>
                <img
                  src={urlFor(featured.mainImage).width(600).url()}
                  alt={featured.title}
                  style={styles.featuredImageStyle}
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Latest Posts Section with Search */}
      <section id="latest" style={styles.latestSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Latest Insights</h2>
          <p style={styles.sectionSubtitle}>Fresh wellness wisdom, updated daily</p>
        </div>

        {/* Search Bar */}
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search articles by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              Clear
            </button>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <div style={styles.noResults}>
            <p>No articles found matching "{searchQuery}". Try a different search term.</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {recentPosts.map((post) => (
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
  searchContainer: {
    display: 'flex',
    gap: '0.5rem',
    maxWidth: '500px',
    margin: '0 auto 2rem auto',
  },
  searchInput: {
    flex: 1,
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  clearButton: {
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb',
    backgroundColor: '#f3f4f6',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'background-color 0.2s',
  },
  noResults: {
    textAlign: 'center' as const,
    padding: '2rem',
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
  // Optionally, you can define a featured post by a field or just pick the latest
  const featuredPost = posts.length ? posts[0] : null;
  return { props: { posts, featuredPost } };
}

export default Home;
