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

  return (
    <Layout>
      <article style={styles.container}>
        <Link href="/">
          <a style={styles.backLink}>← Back to all posts</a>
        </Link>
        <h1 style={styles.title}>{post.title}</h1>
        <div style={styles.meta}>
          By {post.author || 'Anonymous'} •{' '}
          {new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        {post.mainImage && (
          <img
            src={urlFor(post.mainImage).width(800).url()}
            alt={post.title}
            style={styles.featuredImage}
          />
        )}
        <div style={styles.content}>
          <PortableText value={post.body} components={components} />
        </div>

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
    fontWeight: 500,
  },
  title: {
    fontSize: '3rem',
    fontWeight: 800,
    color: '#111827',
    marginBottom: '1rem',
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  },
  meta: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '2rem',
  },
  featuredImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '1rem',
    marginBottom: '2rem',
  },
  content: {
    fontSize: '1.125rem',
    lineHeight: 1.7,
    color: '#1f2937',
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
  relatedSection: {
    marginTop: '4rem',
    paddingTop: '2rem',
    borderTop: '1px solid #e5e7eb',
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