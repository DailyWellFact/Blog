import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import { client, urlFor } from "../../lib/sanity";
import { PortableText } from "@portabletext/react";

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
  body: any;
  metaTitle?: string;
  metaDescription?: string;
  excerpt?: string;
  sources?: string[];
}

interface Props {
  post: Post;
  relatedPosts: Post[];
}

const PostPage: NextPage<Props> = ({ post, relatedPosts }) => {
  const authorName = post.authorName || "Daily Well Fact";
  const mainImageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).url()
    : null;

  const description =
    post.metaDescription ||
    post.excerpt ||
    "Read this health and wellness article on Daily Well Fact.";

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
              description,
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
        <article style={{ maxWidth: 800, margin: "0 auto" }}>
          <Link href="/">← Back to all posts</Link>

          <h1>{post.title}</h1>

          <p>
            By <strong>{authorName}</strong> •{" "}
            {new Date(post.publishedAt).toDateString()}
            {post.updatedAt && (
              <> • Updated {new Date(post.updatedAt).toDateString()}</>
            )}
          </p>

          {post.category && <p>Category: {post.category}</p>}

          {mainImageUrl && (
            <Image
              src={mainImageUrl}
              alt={post.title}
              width={1200}
              height={700}
              priority
            />
          )}

          <PortableText value={post.body} />

          {/* MEDICAL DISCLAIMER */}
          <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
            <strong>Medical Disclaimer:</strong>
            <p>
              This content is for educational purposes only and does not
              constitute medical advice. Always consult a qualified healthcare
              professional.
            </p>
          </div>

          {/* SOURCES */}
          {post.sources && post.sources.length > 0 && (
            <div style={{ marginTop: "2rem" }}>
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

          {/* AUTHOR BIO */}
          <div style={{ marginTop: "2rem" }}>
            <h4>{authorName}</h4>
            <p>{post.authorBio || "Health & wellness writer at Daily Well Fact."}</p>
          </div>

          {/* RELATED POSTS */}
          {relatedPosts.length > 0 && (
            <div style={{ marginTop: "3rem" }}>
              <h3>Related Articles</h3>
              <ul>
                {relatedPosts.map((p) => (
                  <li key={p._id}>
                    <Link href={`/post/${p.slug.current}`}>{p.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await client.fetch(
    `*[_type == "post"]{ "slug": slug.current }`
  );

  return {
    paths: slugs.map((s: any) => ({ params: { slug: s.slug } })),
    fallback: "blocking",
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
      body,
      metaTitle,
      metaDescription,
      excerpt,
      sources
    }`,
    { slug: params?.slug }
  );

  const relatedPosts = await client.fetch(
    `*[_type == "post" && slug.current != $slug][0...3]{
      _id,
      title,
      slug
    }`,
    { slug: params?.slug }
  );

  return {
    props: { post, relatedPosts },
    revalidate: 60,
  };
};

export default PostPage;
