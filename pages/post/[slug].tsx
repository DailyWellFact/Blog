import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { client, urlFor } from '../../lib/sanity';
import { PortableText } from '@portabletext/react';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  author?: string;
  publishedAt: string;
  body: any;
}

interface Props {
  post: Post;
  relatedPosts: Post[];
}

const PostPage: NextPage<Props> = ({ post, relatedPosts }) => {
  // Always use "Vijay Sharma" as the author (overwrite if not set)
  const authorName = 'Vijay Sharma';

  const components = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) return null;
        return (
          <img
            src={urlFor(value).width(800).url()}
            alt={value.alt || 'Blog Image'}
            style={styles.blogImage}
          />
        );
      },
    },
    marks: {
      link: ({ children, value }: any) => {
        const href = value?.href || '#';
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" style={styles.link}>
            {children}
          </a>
        );
      },
    },
    block: {
      normal: ({ children }: any) => <p style={styles.paragraph}>{children}</p>,
      h2: ({ children }: any) => <h2 style={styles.h2}>{children}</h2>,
      h3: ({ children }: any) => <h3 style={styles.h3}>{children}</h3>,
    },
  };

  // Share URLs
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = encodeURIComponent(`Check out "${post.title}" on Daily Well Fact`);

  return (
    <Layout>
      <article>
        {/* Hero Section */}
        <div style={styles.hero}>
          <div style={styles.heroOverlay} />
          {post.mainImage && (
            <img
              src={urlFor(post.mainImage).width(1200).url()}
              alt={post.title}
              style={styles.heroImage}
            />
          )}
          <div style={styles.heroContent}>
            <Link href="/">
              <a style={styles.backLink}>← Back to all posts</a>
            </Link>
            <h1 style={styles.title}>{post.title}</h1>
            <div style={styles.meta}>
              <span>By {authorName}</span>
              <span>•</span>
              <span>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div style={styles.contentContainer}>
          <div style={styles.content}>
            <PortableText value={post.body} components={components} />
          </div>

          {/* Share Section */}
          <div style={styles.shareSection}>
            <p style={styles.shareText}>Share this article:</p>
            <div style={styles.shareButtons}>
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.shareButton}
              >
                Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.shareButton}
              >
                Facebook
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.shareButton}
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Author Bio – link to About page */}
          <div style={styles.authorBio}>
            <div style={styles.authorAvatar}>
              {/* Placeholder avatar */}
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="30" fill="#10b981" />
                <path d="M30 15 C35 15 39 19 39 24 C39 29 35 33 30 33 C25 33 21 29 21 24 C21 19 25 15 30 15 Z" fill="white" />
                <circle cx="30" cy="38" r="12" fill="white" />
              </svg>
            </div>
            <div style={styles.authorInfo}>
              <h4 style={styles.authorName}>{authorName}</h4>
              <p style={styles.authorDesc}>
                Health & wellness writer, founder of Daily Well Fact. Learn more <Link href="/about"><a style={styles.authorLink}>on the About page</a></Link>.
              </p>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section style={styles.relatedSection}>
              <h2 style={styles.relatedTitle}>You Might Also Like</h2>
              <div style={styles.relatedGrid}>
                {relatedPosts.map((related) => (
                  <div key={related._id} style={styles.relatedCard}>
                    {related.mainImage && (
                      <Link href={`/post/${related.slug.current}`}>
                        <a style={styles.relatedImageLink}>
                          <img
                            src={urlFor(related.mainImage).width(400).url()}
                            alt={related.title}
                            style={styles.relatedImage}
                          />
                        </a>
                      </Link>
                    )}
                    <div style={styles.relatedCardContent}>
                      <Link href={`/post/${related.slug.current}`}>
                        <a style={styles.relatedCardTitle}>{related.title}</a>
                      </Link>
                      <p style={styles.relatedCardMeta}>
                        {new Date(related.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </Layout>
  );
};

const styles = {
  hero: {
    position: 'relative' as const,
    height: '60vh',
    minHeight: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '3rem',
    overflow: 'hidden',
  },
  heroOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))',
    zIndex: 1,
  },
  heroImage: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  heroContent: {
    position: 'relative' as const,
    zIndex: 2,
    textAlign: 'center' as const,
    color: '#ffffff',
    maxWidth: '800px',
    padding: '0 2rem',
  },
  backLink: {
    display: 'inline-block',
    marginBottom: '1rem',
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '0.9rem',
    opacity: 0.8,
    transition: 'opacity 0.2s',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 800,
    marginBottom: '1rem',
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  meta: {
    fontSize: '0.9rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    opacity: 0.9,
  },
  contentContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  content: {
    fontSize: '1.125rem',
    lineHeight: 1.7,
    color: '#1f2937',
    marginBottom: '3rem',
  },
  blogImage: {
    width: '100%',
    margin: '2rem 0',
    borderRadius: '0.75rem',
  },
  link: {
    color: '#10b981',
    textDecoration: 'underline',
  },
  paragraph: {
    marginBottom: '1.5rem',
  },
  h2: {
    fontSize: '1.875rem',
    fontWeight: 700,
    marginTop: '2.5rem',
    marginBottom: '1rem',
    color: '#111827',
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginTop: '2rem',
    marginBottom: '0.75rem',
    color: '#111827',
  },
  shareSection: {
    margin: '2rem 0',
    padding: '1.5rem 0',
    borderTop: '1px solid #e5e7eb',
    borderBottom: '1px solid #e5e7eb',
    textAlign: 'center' as const,
  },
  shareText: {
    marginBottom: '1rem',
    fontWeight: 500,
    color: '#4b5563',
  },
  shareButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  shareButton: {
    backgroundColor: '#f3f4f6',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    color: '#1f2937',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: 500,
    transition: 'background 0.2s',
  },
  authorBio: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    margin: '2rem 0',
    padding: '1.5rem',
    backgroundColor: '#f9fafb',
    borderRadius: '1rem',
  },
  authorAvatar: {
    flexShrink: 0,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#111827',
    marginBottom: '0.25rem',
  },
  authorDesc: {
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  authorLink: {
    color: '#10b981',
    textDecoration: 'underline',
  },
  relatedSection: {
    marginTop: '3rem',
    marginBottom: '2rem',
  },
  relatedTitle: {
    fontSize: '1.75rem',
    fontWeight: 700,
    marginBottom: '1.5rem',
    color: '#1f2937',
  },
  relatedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '2rem',
  },
  relatedCard: {
    backgroundColor: '#ffffff',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  relatedImageLink: {
    display: 'block',
  },
  relatedImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover' as const,
  },
  relatedCardContent: {
    padding: '1rem',
  },
  relatedCardTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#111827',
    textDecoration: 'none',
    display: 'inline-block',
    marginBottom: '0.5rem',
    lineHeight: 1.4,
  },
  relatedCardMeta: {
    fontSize: '0.75rem',
    color: '#6b7280',
  },
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await client.fetch(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`
  );
  return {
    paths: slugs.map((s: any) => ({ params: { slug: s.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    mainImage,
    author,
    publishedAt,
    body
  }`;
  const post = await client.fetch(query, { slug: params?.slug });

  const allPostsQuery = `*[_type == "post"]{
    _id,
    title,
    slug,
    mainImage,
    author,
    publishedAt
  }`;
  const allPosts = await client.fetch(allPostsQuery);

  const otherPosts = allPosts.filter((p: Post) => p._id !== post?._id);
  const shuffled = otherPosts.sort(() => 0.5 - Math.random());
  const relatedPosts = shuffled.slice(0, 3);

  return { props: { post, relatedPosts } };
};

export default PostPage;