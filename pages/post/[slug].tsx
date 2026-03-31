import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { client, urlFor } from '../../lib/sanity';
import { PortableText } from '@portabletext/react';
import type { CSSProperties } from 'react';

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
  const [mounted, setMounted] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setMounted(true);
    setShareUrl(window.location.href);
  }, []);

  const authorName = post.author || 'Daily Well Fact';
  const formattedDate =
    mounted && post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : '';

  const components = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset) return null;
        return (
          <div style={styles.blogImageWrapper}>
            <Image
              src={urlFor(value).url()}
              alt="Blog"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        );
      },
    },
  };

  return (
    <Layout>
      <article style={styles.container}>
        <Link href="/" style={styles.backLink}>
          ← Back
        </Link>

        <h1 style={styles.title}>{post.title}</h1>

        <p style={styles.meta}>
          By {authorName}
          {formattedDate && ` • ${formattedDate}`}
        </p>

        {post.mainImage && (
          <div style={styles.featuredWrapper}>
            <Image
              src={urlFor(post.mainImage).width(1200).url()}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}

        <div style={styles.content}>
          <PortableText value={post.body} components={components} />
        </div>

        {/* SHARE */}
        <div style={styles.shareSection}>
          <p style={styles.shareText}>Share this article</p>
          <div style={styles.shareButtons}>
            <a
              href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
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
          </div>
        </div>

        {/* RELATED */}
        {relatedPosts.length > 0 && (
          <section style={styles.relatedSection}>
            <h2 style={styles.relatedTitle}>You Might Also Like</h2>

            <div style={styles.grid}>
              {relatedPosts.map((item) => (
                <Link href={`/post/${item.slug.current}`} key={item._id}>
                  <div style={styles.card} data-card>
                    <div style={styles.imageWrapper}>
                      <Image
                        src={urlFor(item.mainImage).width(600).url()}
                        alt={item.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="overlay" style={styles.overlay}>
                        Read →
                      </div>
                    </div>
                    <div style={styles.cardContent}>
                      <h3 style={styles.cardTitle}>{item.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <style jsx>{`
          div[data-card]:hover {
            transform: translateY(-6px);
            box-shadow: 0 12px 20px rgba(0, 0, 0, 0.12);
          }
        `}</style>
      </article>
    </Layout>
  );
};

export default PostPage;

//
// 🔧 STYLES (TYPE SAFE)
//

const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: 800,
    margin: '0 auto',
    padding: '0 1rem', // adds breathing room on mobile
  },

  backLink: {
    display: 'inline-block',
    marginBottom: '1rem',
    color: '#10b981',
    textDecoration: 'none',
  },

  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
  },

  meta: {
    color: '#6b7280',
    marginBottom: '1.5rem',
  },

  // Featured image: responsive aspect ratio instead of fixed height
  featuredWrapper: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16/9',
    borderRadius: '1rem',
    overflow: 'hidden',
    marginBottom: '2rem',
  },

  content: {
    lineHeight: 1.7,
  },

  // Blog images inside PortableText: responsive aspect ratio
  blogImageWrapper: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16/9',
    margin: '2rem 0',
  },

  shareSection: {
    marginTop: '2rem',
    textAlign: 'center',
  },

  shareText: {
    marginBottom: '1rem',
  },

  shareButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },

  shareButton: {
    background: '#f3f4f6',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    textDecoration: 'none',
  },

  relatedSection: {
    marginTop: '3rem',
  },

  relatedTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1.5rem',
  },

  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    borderRadius: '1rem',
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  },

  imageWrapper: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16/9', // replaces fixed height
    flexShrink: 0,
  },

  cardImage: {
    objectFit: 'cover',
  },

  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    opacity: 0,
    transition: 'opacity 0.2s ease',
    pointerEvents: 'none', // prevents overlay from blocking clicks
  },

  cardContent: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },

  cardTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#111827',
    lineHeight: 1.4,
  },
};

//
// 🔧 STATIC
//

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await client.fetch(
    `*[_type == "post"]{ "slug": slug.current }`
  );

  return {
    paths: slugs.map((s: any) => ({ params: { slug: s.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await client.fetch(
    `*[_type=="post" && slug.current==$slug][0]`,
    { slug: params?.slug }
  );

  const relatedPosts = await client.fetch(
    `*[_type=="post" && slug.current != $slug][0...3]`,
    { slug: params?.slug }
  );

  return {
    props: { post, relatedPosts },
  };
};
