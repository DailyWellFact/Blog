import type { NextPage } from 'next'
import Link from 'next/link'
import { client, urlFor } from '../lib/sanity'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  mainImage: any
  author?: string
  publishedAt: string
}

interface Props {
  posts: Post[]
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1>My Blog</h1>
      {posts.map((post) => (
        <div key={post._id} style={{ marginBottom: '2rem' }}>
          <Link href={`/post/${post.slug.current}`}>
            <a>
              <h2>{post.title}</h2>
              {post.mainImage && (
                <img
                  src={urlFor(post.mainImage).width(600).url()}
                  alt={post.title}
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
            </a>
          </Link>
          <p>
            By {post.author || 'Unknown'} on {new Date(post.publishedAt).toDateString()}
          </p>
        </div>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    mainImage,
    author,
    publishedAt
  }`
  const posts = await client.fetch(query)
  return { props: { posts } }
}

export default Home