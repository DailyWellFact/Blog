import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { client, urlFor } from '../../lib/sanity';
import { PortableText } from '@portabletext/react';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: any;
  author?: string;
  publishedAt: string;
  body: any;
}

interface Props {
  post: Post;
  relatedPosts: Post[];
}

// ✅ Hydration-safe date
const formatDate = (date: string) =>
  new Date(date).toISOString().split('T')[0];

const PostPage: NextPage<Props> = ({ post, relatedPosts }) => {
  const authorName = post.author || 'Daily Well Fact';

  // ✅ Safe client-only share URL
  const [shareUrl, setShareUrl] = useState('');
  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const shareText = encodeURIComponent(
    `Check out "${post.title}"`
  );

  // ✅ PortableText with Image optimization
  const components = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) return null;
        return (
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || 'Blog Image'}
            width={800}
            height={500}
            style={styles.blogImage}
          />
        );
      },
    },
    marks: {
      link: ({ children, value }: any) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          {children}
        </a>
      ),
    },
    block: {
      normal: ({ children }: any) => (
        <p style={styles.paragraph}>{children}</p>
      ),
      h2: ({ children }: any) => (
        <h2 style={styles.h2}>{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 style={styles.h3}>{children}</h3>
      ),
    },
  };

  return (
    <Layout>
      <article style={styles.container}>
        <Link href="/" style={styles.backLink}>
          ← Back to all posts
        </Link>

        <h1 style={styles.title}>{post.title}</h1>

        <div style={styles.meta}>
          By {authorName} • {formatDate(post.publishedAt)}
        </div>

        {/* FEATURED IMAGE */}
        {post.mainImage && (
          <Image
            src={urlFor(post.mainImage).width(1000).url()}
            alt={post.title}
            width={1000}
            height={600}
            priority
            style={styles.featuredImage}
          />
        )}

        {/* CONTENT */}
        <div style={styles.content}>
          <PortableText value={post.body} components={components} />
        </div>

        {/* SHARE */}
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
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.shareButton}
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* AUTHOR */}
        <div style={styles.authorBio}>
          <div style={styles.authorAvatar}>
            <svg width="60" height="60">
              <circle cx="30" cy="30" r="30" fill="#10b981" />
            </svg>
          </div>

          <div>
            <h4 style={styles.authorName}>{authorName}</h4>
            <p style={styles.authorDesc}>
              Health & wellness writer. Learn more{' '}
              <Link href="/about" style={styles.authorLink}>
                here
              </Link>
            </p>
          </div>
        </div>

        {/* RELATED POSTS */}
        {relatedPosts.length > 0 && (
          <section style={styles.relatedSection}>
            <h2 style={styles.relatedTitle}>
              You Might Also Like
            </h2>

            <div style={styles.relatedGrid}>
              {relatedPosts.map((p) => (
                <Link
                  key={p._id}
                  href={`/post/${p.slug.current}`}
                  style={styles.relatedCardLink}
                >
                  <div style={styles.relatedCard}>
                    {p.mainImage && (
                      <Image
                        src={urlFor(p.mainImage).width(400).url()}
                        alt={p.title}
                        width={400}
                        height={250}
                        style={styles.relatedImage}
                      />
                    )}

                    <div style={styles.relatedCardContent}>
                      <h3 style={styles.relatedCardTitle}>
                        {p.title}
                      </h3>

                      <p style={styles.relatedCardMeta}>
                        {formatDate(p.publishedAt)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
};

const styles = {
  container: { maxWidth: 800, margin: '0 auto' },

  backLink: {
    display: 'inline-block',
    marginBottom: '2rem',
    color: '#10b981',
    textDecoration: 'none',
  },

  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },

  meta: { color: '#6b7280', marginBottom: '1.5rem' },

  featuredImage: {
    width: '100%',
    borderRadius: '0.75rem',
    marginBottom: '2rem',
  },

  content: { lineHeight: 1.7 },

  blogImage: {
    width: '100%',
    margin: '1.5rem 0',
    borderRadius: '0.5rem',
  },

  paragraph: { marginBottom: '1.2rem' },

  h2: { fontSize: '1.8rem', marginTop: '2rem' },

  h3: { fontSize: '1.4rem', marginTop: '1.5rem' },

  link: { color: '#10b981' },

  shareSection: { textAlign: 'center', margin: '2rem 0' },

  shareButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },

  shareButton: {
    padding: '0.5rem 1rem',
    background: '#f3f4f6',
    borderRadius: '0.5rem',
    textDecoration: 'none',
  },

  authorBio: {
    display: 'flex',
    gap: '1rem',
    padding: '1.5rem',
    background: '#f9fafb',
    borderRadius: '1rem',
  },

  authorName: { fontWeight: '600' },

  authorDesc: { color: '#6b7280' },

  authorLink: { color: '#10b981' },

  relatedSection: { marginTop: '3rem' },

  relatedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))',
    gap: '1.5rem',
  },

  relatedCardLink: {
    textDecoration: 'none',
    color: 'inherit',
  },

  relatedCard: {
    background: '#fff',
    borderRadius: '0.75rem',
    overflow: 'hidden',
  },

  relatedImage: {
    width: '100%',
    height: '160px',
    objectFit: 'cover' as const,
  },

  relatedCardContent: { padding: '1rem' },

  relatedCardTitle: { fontSize: '1rem', fontWeight: 600 },

  relatedCardMeta: { fontSize: '0.75rem', color: '#6b7280' },
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await client.fetch(
    `*[_type == "post"]{ "slug": slug.current }`
  );

  return {
    paths: slugs.map((s: any) => ({
      params: { slug: s.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug: params?.slug }
  );

  const allPosts = await client.fetch(`*[_type == "post"]`);

  // ✅ Deterministic related posts (NO Math.random)
  const relatedPosts = allPosts
    .filter((p: Post) => p._id !== post._id)
    .slice(0, 3);

  return { props: { post, relatedPosts } };
};

export default PostPage;
