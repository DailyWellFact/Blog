import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { client, urlFor } from '../../lib/sanity';
import { PortableText } from '@portabletext/react';
import SEO from '../../components/SEO';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  authorName?: string;
  authorBio?: string;
  category?: string;
  publishedAt: string;
  updatedAt?: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  sources?: string[];
  body: any;
}

interface Props {
  post: Post;
  relatedPosts: Post[];
}

const PostPage: NextPage<Props> = ({ post, relatedPosts }) => {
  const authorName = post.authorName || 'Daily Well Fact';

  const [shareUrl, setShareUrl] = useState('');
  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const mainImageUrl = post.mainImage
    ? urlFor(post.mainImage).width(800).url()
    : null;

  const description =
    post.metaDescription ||
    post.excerpt ||
    'Read this health and wellness article on Daily Well Fact.';

  return (
    <>
      {/* SEO */}
      <SEO
        title={post.metaTitle || post.title}
        description={description}
        canonical={`https://dailywellfact.com/post/${post.slug.current}`}
        ogType="article"
        ogImage={mainImageUrl || undefined}
      />

      {/* JSON-LD */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: description,
              image: mainImageUrl,
              datePublished: post.publishedAt,
              dateModified: post.updatedAt || post.publishedAt,
              author: {
                "@type": "Person",
                name: authorName,
              },
              publisher: {
                "@type": "Organization",
                name: "Daily Well Fact",
                logo: {
                  "@type": "ImageObject",
                  url: "https://dailywellfact.com/logo.png",
                },
              },
            }),
          }}
        />
      </Head>

      <Layout>
        <article style={styles.container}>
          <Link href="/" style={styles.backLink}>
            ← Back to all posts
          </Link>

          <h1 style={styles.title}>{post.title}</h1>

          <div style={styles.meta}>
            By {authorName} •{' '}
            {new Date(post.publishedAt).toLocaleDateString()}
            {post.updatedAt && (
              <> • Updated {new Date(post.updatedAt).toLocaleDateString()}</>
            )}
            {post.category && <> • {post.category}</>}
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
              />
            </div>
          )}

          <div style={styles.content}>
            <PortableText value={post.body} />
          </div>

          {/* MEDICAL DISCLAIMER */}
          <div style={styles.disclaimer}>
            <strong>⚠️ Medical Disclaimer</strong>
            <p>
              This article is for educational purposes only and does not
              constitute medical advice. Always consult a qualified healthcare
              professional before making health decisions.
            </p>
          </div>

          {/* SOURCES */}
          {post.sources && post.sources.length > 0 && (
            <div style={styles.sources}>
              <h3>Sources</h3>
              <ul>
                {post.sources.map((src, i) => (
                  <li key={i}>
                    <a href={src} target="_blank" rel="noopener noreferrer">
                      {src}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* RELATED POSTS (unchanged design) */}
          {relatedPosts.length > 0 && (
            <section style={styles.relatedSection}>
              <h2>You Might Also Like</h2>
              <div className="related-grid">
                {relatedPosts.map((related) => (
                  <Link key={related._id} href={`/post/${related.slug.current}`}>
                    {related.title}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </Layout>
    </>
  );
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
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      mainImage,
      authorName,
      authorBio,
      category,
      publishedAt,
      updatedAt,
      excerpt,
      metaTitle,
      metaDescription,
      sources,
      body
    }`,
    { slug: params?.slug }
  );

  const relatedPosts = await client.fetch(
    `*[_type == "post" && slug.current != $slug][0...3]{
      _id,
      title,
      slug,
      mainImage,
      publishedAt
    }`,
    { slug: params?.slug }
  );

  return {
    props: { post, relatedPosts },
    revalidate: 60,
  };
};

export default PostPage;
