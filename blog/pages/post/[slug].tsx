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
}

const PostPage: NextPage<Props> = ({ post }) => {
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
  featuredImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '0.75rem',
    marginBottom: '2rem',
  },
  content: {
    fontSize: '1.125rem',
    lineHeight: 1.7,
    color: '#1f2937',
  },
  blogImage: {
    width: '100%',
    margin: '1.5rem 0',
    borderRadius: '0.5rem',
  },
  link: {
    color: '#10b981',
    textDecoration: 'underline',
  },
  paragraph: {
    marginBottom: '1.25rem',
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
  return { props: { post } };
};

export default PostPage;