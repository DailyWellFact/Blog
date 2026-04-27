import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { client, urlFor } from "../../lib/sanity";
import { PortableText } from "@portabletext/react";
import SEO from "../../components/SEO";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  authorName?: string;
  publishedAt: string;
  body: any;

  // NEW FIELDS
  metaTitle?: string;
  metaDescription?: string;
  excerpt?: string;
}

interface Props {
  post: Post;
  relatedPosts: Post[];
}

const PostPage: NextPage<Props> = ({ post, relatedPosts }) => {
  const authorName = post.authorName || "Daily Well Fact";

  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  const mainImageUrl = post.mainImage
    ? urlFor(post.mainImage).width(800).url()
    : null;

  // 🔥 STRONG SEO FALLBACK
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
              description: description,
              image: mainImageUrl,
              datePublished: post.publishedAt,
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

          <p style={{ color: "#6b7280" }}>
            By {authorName} •{" "}
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>

          {mainImageUrl && (
            <Image
              src={mainImageUrl}
              alt={post.title}
              width={800}
              height={500}
              style={{ borderRadius: "12px" }}
              priority
            />
          )}

          <div style={{ marginTop: "2rem" }}>
            <PortableText value={post.body} />
          </div>

          {/* 🔥 MEDICAL DISCLAIMER */}
          <div
            style={{
              marginTop: "2rem",
              padding: "1rem",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              background: "#f9fafb",
            }}
          >
            <strong>Medical Disclaimer:</strong>
            <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
              This article is for educational purposes only and does not
              constitute medical advice. Always consult a qualified healthcare
              professional before making health decisions.
            </p>
          </div>

          {/* RELATED POSTS */}
          {relatedPosts.length > 0 && (
            <div style={{ marginTop: "3rem" }}>
              <h2>You Might Also Like</h2>

              {relatedPosts.map((p) => (
                <div key={p._id} style={{ marginBottom: "1rem" }}>
                  <Link href={`/post/${p.slug.current}`}>
                    {p.title}
                  </Link>
                </div>
              ))}
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
    paths: slugs.map((s: any) => ({
      params: { slug: s.slug },
    })),
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
      publishedAt,
      body,
      metaTitle,
      metaDescription,
      excerpt
    }`,
    { slug: params?.slug }
  );

  const relatedPosts = await client.fetch(
    `*[_type == "post" && _id != $id][0...3]{
      _id,
      title,
      slug
    }`,
    { id: post._id }
  );

  return {
    props: { post, relatedPosts },
    revalidate: 60,
  };
};

export default PostPage;
