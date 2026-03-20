import { GetServerSideProps, NextPage } from 'next'
import { client, urlFor } from '../../lib/sanity'
import { PortableText } from '@portabletext/react'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  mainImage: any
  author?: string
  publishedAt: string
  body: any
}

interface Props {
  post: Post
}

const PostPage: NextPage<Props> = ({ post }) => {
  const components = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) return null
        return (
          <img
            src={urlFor(value).width(800).url()}
            alt={value.alt || 'Blog Image'}
            style={{
              width: '100%',
              margin: '1rem 0',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        )
      },
    },
    marks: {
      link: ({ children, value }: any) => {
        const href = value?.href || '#'
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>
            {children}
          </a>
        )
      },
    },
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1>{post.title}</h1>
      <p>
        By {post.author || 'Unknown'} on {new Date(post.publishedAt).toDateString()}
      </p>

      {post.mainImage && (
        <img
          src={urlFor(post.mainImage).width(800).url()}
          alt={post.title}
          style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '2rem' }}
        />
      )}

      <div style={{ marginTop: '2rem' }}>
        <PortableText value={post.body} components={components} />
      </div>
    </div>
  )
}

// Fetch single post by slug on every request
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    mainImage,
    author,
    publishedAt,
    body
  }`
  const post = await client.fetch(query, { slug: params?.slug })

  if (!post) {
    return { notFound: true }
  }

  return { props: { post } }
}

export default PostPage