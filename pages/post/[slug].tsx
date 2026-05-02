// pages/post/[slug].tsx
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import { client, urlFor } from '../../lib/sanity';
import { PortableText } from '@portabletext/react';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  author?: string;
  publishedAt: string;
  updatedAt?: string;
  category?: string;
  sources?: string[];
  body: any;
  metaTitle?: string;
  metaDescription?: string;
  excerpt?: string;
}

interface Props {
  post: Post;
  relatedPosts: Post[];
}

const PostPage: NextPage<Props> = ({ post, relatedPosts }) => {
  const authorName = post.author || 'Daily Well Fact';
  const fallbackDescription =
    'Daily Well Fact delivers science-based health, nutrition, and wellness insights. Read this article for expert-backed facts.';
  const metaTitle = post.metaTitle || post.title;
  const metaDescription =
    post.metaDescription || post.excerpt || `${post.title.substring(0, 150)}...` || fallbackDescription;
  const canonicalUrl = `https://dailywellfact.com/post/${post.slug.current}`;
  const mainImageUrl = post.mainImage ? urlFor(post.mainImage).width(1200).url() : null;

  const publishedDate = new Date(post.publishedAt).toISOString();
  const displayPublishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const updatedDateObj = post.updatedAt ? new Date(post.updatedAt) : null;
  const updatedDate = updatedDateObj?.toISOString() || null;
  const displayUpdatedDate =
    updatedDateObj?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) || null;

  const showUpdated = updatedDate && updatedDate !== publishedDate;

  const [shareUrl, setShareUrl] = useState('');
  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const shareText = encodeURIComponent(`Check out "${post.title}" on Daily Well Fact`);

  // PortableText components (style handled by global CSS classes)
  const components = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) return null;
        const imageUrl = urlFor(value).width(800).url();
        const altText = value.alt || 'Blog illustration';
        return (
          <div className="portable-image-wrapper">
            <Image
              src={imageUrl}
              alt={altText}
              width={800}
              height={500}
              className="portable-image"
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
          <a href={href} target="_blank" rel="noopener noreferrer" className="portable-link">
            {children}
          </a>
        );
      },
    },
    block: {
      normal: ({ children }: any) => <p className="paragraph">{children}</p>,
      h2: ({ children }: any) => <h2 className="heading-2">{children}</h2>,
      h3: ({ children }: any) => <h3 className="heading-3">{children}</h3>,
    },
    list: {
      bullet: ({ children }: any) => <ul className="bullet-list">{children}</ul>,
      number: ({ children }: any) => <ol className="number-list">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }: any) => <li className="list-item">{children}</li>,
      number: ({ children }: any) => <li className="list-item">{children}</li>,
    },
  };

  // JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: metaTitle,
    description: metaDescription,
    image: mainImageUrl ? [mainImageUrl] : [],
    datePublished: publishedDate,
    dateModified: updatedDate || publishedDate,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Daily Well Fact',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dailywellfact.com/logo.png',
      },
    },
  };

  return (
    <Layout>
      <SEO
        title={metaTitle}
        description={metaDescription}
        canonical={canonicalUrl}
        ogType="article"
        ogImage={mainImageUrl ?? undefined}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="post-container">
        <Link href="/" className="back-link">
          ← Back to all posts
        </Link>

        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          By {authorName} • {displayPublishedDate}
          {showUpdated && ` (Updated: ${displayUpdatedDate})`}
          {post.category && ` • ${post.category}`}
        </div>

        {mainImageUrl && (
          <div className="featured-image-wrapper">
            <Image
              src={mainImageUrl}
              alt={metaTitle}
              width={800}
              height={500}
              className="featured-image"
              priority
              sizes="(max-width: 800px) 100vw, 800px"
            />
          </div>
        )}

        <div className="post-content">
          <PortableText value={post.body} components={components} />
        </div>

        {/* Sources section — FIXED: links wrap inside container */}
        {post.sources && post.sources.length > 0 && (
          <div className="sources-box">
            <h3 className="sources-heading">Sources & References</h3>
            <ul className="sources-list">
              {post.sources.map((src, idx) => (
                <li key={idx} className="sources-list-item">
                  {src.startsWith('http') ? (
                    <a href={src} target="_blank" rel="noopener noreferrer" className="sources-link">
                      {src}
                    </a>
                  ) : (
                    <span className="sources-text">{src}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="disclaimer-box">
          <p className="disclaimer-text">
            <strong>⚠️ MEDICAL DISCLAIMER:</strong> This article is for educational purposes only
            and does not constitute medical advice. The information provided should not be used to
            diagnose, treat, cure, or prevent any medical condition. Always consult with a qualified
            healthcare professional before making changes to your health routine or treatment plan.
            <strong> In case of a medical emergency, please call 911 or visit the nearest emergency room.</strong>
          </p>
        </div>

        <div className="share-section">
          <p className="share-text">Share this article:</p>
          <div className="share-buttons">
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-button"
            >
              Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-button"
            >
              Facebook
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodeURIComponent(
                post.title
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-button"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="author-bio">
          <div className="author-avatar">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="30" fill="#10b981" />
              <path d="M30 15 C35 15 39 19 39 24 C39 29 35 33 30 33 C25 33 21 29 21 24 C21 19 25 15 30 15 Z" fill="white" />
              <circle cx="30" cy="38" r="12" fill="white" />
            </svg>
          </div>
          <div className="author-info">
            <h4 className="author-name">{authorName}</h4>
            <p className="author-desc">
              Health & wellness writer, founder of Daily Well Fact. Learn more{' '}
              <Link href="/about" className="author-link">
                on the About page
              </Link>
              .
            </p>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <section className="related-section">
            <h2 className="related-title">You Might Also Like</h2>
            <div className="related-grid">
              {relatedPosts.map((related) => (
                <div key={related._id} className="related-card">
                  {related.mainImage && (
                    <Link href={`/post/${related.slug.current}`} className="related-image-link">
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
                  <div className="related-card-content">
                    <Link href={`/post/${related.slug.current}`} className="related-card-title">
                      {related.title}
                    </Link>
                    <p className="related-card-meta">
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

      <style jsx>{`
        /* ===== RESET & GLOBAL ===== */
        .post-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1rem;
          width: 100%;
          overflow-x: hidden;
        }

        /* Typography */
        .post-title {
          font-size: 1.8rem;
          font-weight: bold;
          color: #111827;
          margin-bottom: 0.5rem;
          line-height: 1.2;
          word-break: break-word;
        }

        .post-meta {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 1.5rem;
          word-break: break-word;
        }

        .back-link {
          display: inline-block;
          margin-bottom: 2rem;
          color: #10b981;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .back-link:hover {
          text-decoration: underline;
        }

        /* Images */
        .featured-image-wrapper,
        .portable-image-wrapper {
          width: 100%;
          margin-bottom: 2rem;
        }

        .featured-image,
        .portable-image {
          width: 100%;
          height: auto;
          border-radius: 0.75rem;
          display: block;
        }

        /* Content typography */
        .post-content {
          font-size: 1.125rem;
          line-height: 1.7;
          color: #1f2937;
          margin-bottom: 2rem;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .paragraph {
          margin-bottom: 1.25rem;
        }

        .heading-2 {
          font-size: 1.75rem;
          font-weight: bold;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #111827;
        }

        .heading-3 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #111827;
        }

        .bullet-list,
        .number-list {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }

        .bullet-list {
          list-style-type: disc;
        }

        .number-list {
          list-style-type: decimal;
        }

        .list-item {
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }

        .portable-link {
          color: #10b981;
          text-decoration: underline;
          word-break: break-word;
        }

        /* ===== SOURCES SECTION (FIXED) ===== */
        .sources-box {
          background-color: #f0fdf4;
          border-left: 4px solid #10b981;
          padding: 1rem;
          margin: 2rem 0;
          border-radius: 0.5rem;
          width: 100%;
          overflow-x: auto;
        }

        .sources-heading {
          font-size: 1rem;
          font-weight: bold;
          margin-bottom: 0.75rem;
          color: #065f46;
        }

        .sources-list {
          margin: 0;
          padding-left: 1.25rem;
          list-style-type: disc;
        }

        .sources-list-item {
          font-size: 0.875rem;
          color: #065f46;
          margin-bottom: 0.5rem;
          word-break: break-word;
          overflow-wrap: break-word;
          line-height: 1.5;
        }

        .sources-link {
          color: #065f46;
          text-decoration: underline;
          word-break: break-all;
          overflow-wrap: break-word;
          display: inline-block;
          max-width: 100%;
        }

        .sources-link:hover {
          color: #10b981;
        }

        .sources-text {
          word-break: break-word;
        }

        /* ===== DISCLAIMER ===== */
        .disclaimer-box {
          background-color: #fef9e6;
          border-left: 4px solid #f59e0b;
          padding: 1rem;
          margin: 2rem 0;
          border-radius: 0.5rem;
        }

        .disclaimer-text {
          font-size: 0.875rem;
          color: #78350f;
          margin: 0;
          line-height: 1.5;
        }

        /* ===== SHARE SECTION ===== */
        .share-section {
          margin: 2rem 0;
          padding: 1.5rem 0;
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
          text-align: center;
        }

        .share-text {
          margin-bottom: 1rem;
          font-weight: 500;
          color: #4b5563;
        }

        .share-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
        }

        .share-button {
          background-color: #f3f4f6;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          color: #1f2937;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: background 0.2s;
          display: inline-block;
        }

        .share-button:hover {
          background-color: #e5e7eb;
        }

        /* ===== AUTHOR BIO ===== */
        .author-bio {
          display: flex;
          flex-direction: row;
          gap: 1rem;
          align-items: center;
          margin: 2rem 0;
          padding: 1rem;
          background-color: #f9fafb;
          border-radius: 1rem;
        }

        .author-avatar {
          flex-shrink: 0;
        }

        .author-info {
          flex: 1;
        }

        .author-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.25rem;
        }

        .author-desc {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .author-link {
          color: #10b981;
          text-decoration: underline;
        }

        /* ===== RELATED POSTS ===== */
        .related-section {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid #e5e7eb;
        }

        .related-title {
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          color: #1f2937;
        }

        .related-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .related-card {
          background: white;
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .related-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .related-image-link {
          display: block;
        }

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

        .related-card-content {
          padding: 1rem;
        }

        .related-card-title {
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
          text-decoration: none;
          display: inline-block;
          margin-bottom: 0.5rem;
          line-height: 1.4;
          transition: color 0.2s ease;
        }

        .related-card-title:hover {
          color: #10b981;
        }

        .related-card-meta {
          font-size: 0.75rem;
          color: #6b7280;
        }

        /* ===== MEDIA QUERIES (Mobile Responsiveness) ===== */
        @media (min-width: 640px) {
          .post-container {
            padding: 0 1.5rem;
          }

          .post-title {
            font-size: 2.5rem;
          }

          .sources-box {
            padding: 1rem 1.25rem;
          }

          .author-bio {
            padding: 1.5rem;
          }

          .related-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .related-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Extra small devices */
        @media (max-width: 480px) {
          .post-container {
            padding: 0 0.75rem;
          }

          .post-title {
            font-size: 1.6rem;
          }

          .post-content {
            font-size: 1rem;
          }

          .heading-2 {
            font-size: 1.5rem;
          }

          .heading-3 {
            font-size: 1.3rem;
          }

          .share-buttons {
            gap: 0.5rem;
          }

          .share-button {
            padding: 0.4rem 0.8rem;
            font-size: 0.75rem;
          }

          .author-bio {
            flex-direction: column;
            text-align: center;
          }

          .sources-list {
            padding-left: 1rem;
          }

          .sources-list-item {
            font-size: 0.8rem;
          }
        }

        /* Prevent overflow on all elements */
        img,
        iframe,
        video,
        embed {
          max-width: 100%;
          height: auto;
        }

        * {
          word-break: break-word;
        }
      `}</style>
    </Layout>
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
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    mainImage,
    author,
    publishedAt,
    updatedAt,
    category,
    sources,
    body,
    metaTitle,
    metaDescription,
    excerpt
  }`;
  const post = await client.fetch(query, { slug: params?.slug });

  if (!post) {
    return { notFound: true };
  }

  const allPostsQuery = `*[_type == "post"]{
    _id,
    title,
    slug,
    mainImage,
    author,
    publishedAt
  }`;
  const allPosts = await client.fetch(allPostsQuery);

  const otherPosts = allPosts.filter((p: Post) => p._id !== post._id);
  const shuffled = otherPosts.sort(() => 0.5 - Math.random());
  const relatedPosts = shuffled.slice(0, 3);

  return {
    props: { post, relatedPosts },
    revalidate: 60,
  };
};

export default PostPage;
