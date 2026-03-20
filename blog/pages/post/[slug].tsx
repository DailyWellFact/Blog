import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
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
          style={{ width: '100%', height: 'auto' }}
        />
      )}
      <div style={{ marginTop: '2rem' }}>
        <PortableText value={post.body} />
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await client.fetch(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`)
  return {
    paths: slugs.map((s: any) => ({ params: { slug: s.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
  return { props: { post } }
}

export default PostPage