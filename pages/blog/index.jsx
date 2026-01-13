import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { getAllPosts } from '../../src/data/posts';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function BlogIndex({ posts }) {
  return (
    <>
      <NextSeo
        title="Nadav Avital - Blog"
        description="Thoughts on software engineering, AI-assisted development, and building apps."
        canonical="https://nadavavital.com/blog"
      />

      <main className="page page-blog">
        <Link href="/" className="back-link">
          ← Back
        </Link>

        <header className="blog-header">
          <h1>Blog</h1>
        </header>

        <div className="posts-list">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="post-card">
              <time className="post-date">{formatDate(post.date)}</time>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-description">{post.description}</p>
            </Link>
          ))}
        </div>

        <footer>
          © {new Date().getFullYear()} Nadav Avital
        </footer>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: {
      posts: posts.map(({ slug, title, date, description }) => ({
        slug,
        title,
        date: date instanceof Date ? date.toISOString() : date,
        description
      }))
    }
  };
}
