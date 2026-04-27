import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { client, urlFor } from '../../lib/sanity';
import { PortableText } from '@portabletext/react';
import SEO from '../../components/SEO';
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
  const authorName = post.author || 'Daily Well Fact';

  const [shareUrl, setShareUrl] = useState('');
  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const shareText = encodeURIComponent(`Check out "${post.title}" on Daily Well Fact`);

  const components = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) return null;
        const imageUrl = urlFor(value).width(800).url();
        return (
          <div style={styles.imageWrapper}>
            <Image
              src={imageUrl}
              alt={value.alt || 'Blog Image'}
              width={800}
              height={500}
              style={styles.blogImage}
              loading="lazy"
            />
          </div>
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
    list: {
      bullet: ({ children }: any) => <ul style={styles.bulletList}>{children}</ul>,
      number: ({ children }: any) => <ol style={styles.numberList}>{children}</ol>,
    },
    listItem: {
      bullet: ({ children }: any) => <li style={styles.listItem}>{children}</li>,
      number: ({ children }: any) => <li style={styles.listItem}>{children}</li>,
    },
  };

  const mainImageUrl = post.mainImage ? urlFor(post.mainImage).width(800).url() : null;

  return (
    <>
      <SEO
  title={post.metaTitle || post.title}
  description={post.metaDescription || post.excerpt}
  canonical={`https://dailywellfact.com/post/${post.slug.current}`}
/>
    <Layout>
      <style jsx>{`
        /* Responsive grid - mobile first */
        .related-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        @media (min-width: 640px) {
          .related-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .related-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        /* Card hover effects */
        .related-card {
          background: white;
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .related-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.02);
        }
        .related-card:hover .related-title {
          color: #10b981;
        }
        .related-title {
          transition: color 0.2s ease;
        }
        /* Image zoom on hover */
        .related-image-wrapper {
          position: relative;
          width: 100%;
          height: 160px;
          overflow: hidden;
        }
        .related-image {
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .related-card:hover .related-image {
          transform: scale(1.05);
        }
      `}</style>

      <article style={styles.container}>
        <Link href="/" style={styles.backLink}>
          ← Back to all posts
        </Link>

        <h1 style={styles.title}>{post.title}</h1>
        <div style={styles.meta}>
          By {authorName} •{' '}
          {new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>

        {mainImageUrl && (
          <div style={styles.featuredImageWrapper}>
            <Image
              src={mainImageUrl}
              alt={post.title}
              width={800}
              height={500}
              style={styles.featuredImage}
              priority
              sizes="(max-width: 800px) 100vw, 800px"
            />
          </div>
        )}

        <div style={styles.content}>
          <PortableText value={post.body} components={components} />
        </div>

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

        <div style={styles.authorBio}>
          <div style={styles.authorAvatar}>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="30" fill="#10b981" />
              <path d="M30 15 C35 15 39 19 39 24 C39 29 35 33 30 33 C25 33 21 29 21 24 C21 19 25 15 30 15 Z" fill="white" />
              <circle cx="30" cy="38" r="12" fill="white" />
            </svg>
          </div>
          <div style={styles.authorInfo}>
            <h4 style={styles.authorName}>{authorName}</h4>
            <p style={styles.authorDesc}>
              Health & wellness writer, founder of Daily Well Fact. Learn more{' '}
              <Link href="/about" style={styles.authorLink}>
                on the About page
              </Link>.
            </p>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <section style={styles.relatedSection}>
            <h2 style={styles.relatedTitle}>You Might Also Like</h2>
            <div className="related-grid">
              {relatedPosts.map((related) => (
                <div key={related._id} className="related-card">
                  {related.mainImage && (
                    <Link href={`/post/${related.slug.current}`} style={{ display: 'block' }}>
                      <div className="related-image-wrapper">
                        <Image
                          src={urlFor(related.mainImage).width(400).url()}
                          alt={related.title}
                          fill
                          className="related-image"
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    </Link>
                  )}
                  <div style={styles.relatedCardContent}>
                    <Link href={`/post/${related.slug.current}`} className="related-title" style={styles.relatedCardTitle}>
                      {related.title}
                    </Link>
                    <p style={styles.relatedCardMeta}>
                      {new Date(related.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
};

const styles = {
  container: {
    maxWidth: 800,
    margin: '0 auto',
  },
  backLink: {
    display: 'inline-block',
    marginBottom: '2rem',
    color: '#10b981',
    textDecoration: 'none',
    fontWeight: '500',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '0.5rem',
  },
  meta: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '1.5rem',
  },
  featuredImageWrapper: {
    width: '100%',
    marginBottom: '2rem',
    position: 'relative' as const,
  },
  featuredImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '0.75rem',
  },
  content: {
    fontSize: '1.125rem',
    lineHeight: 1.7,
    color: '#1f2937',
    marginBottom: '2rem',
  },
  imageWrapper: {
    width: '100%',
    margin: '1.5rem 0',
    position: 'relative' as const,
  },
  blogImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '0.5rem',
  },
  link: {
    color: '#10b981',
    textDecoration: 'underline',
  },
  paragraph: {
    marginBottom: '1.25rem',
  },
  bulletList: {
    marginBottom: '1.25rem',
    paddingLeft: '1.5rem',
    listStyleType: 'disc',
  },
  numberList: {
    marginBottom: '1.25rem',
    paddingLeft: '1.5rem',
    listStyleType: 'decimal',
  },
  listItem: {
    marginBottom: '0.5rem',
    lineHeight: 1.6,
  },
  h2: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    marginTop: '2rem',
    marginBottom: '1rem',
    color: '#111827',
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '1.5rem',
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
    marginTop: '4rem',
    paddingTop: '2rem',
    borderTop: '1px solid #e5e7eb',
  },
  relatedTitle: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#1f2937',
  },
  relatedCardContent: {
    padding: '1rem',
  },
  relatedCardTitle: {
    fontSize: '1rem',
    fontWeight: '600',
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
    fallback: 'blocking',
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

  return {
    props: { post, relatedPosts },
    revalidate: 60,
  };
};

export default PostPage;
