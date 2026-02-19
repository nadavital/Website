import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAllPosts, getPostBySlug } from '../../src/data/posts';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

function extractTldr(content) {
  const trimmedContent = content.trim();
  const tldrMatch = trimmedContent.match(/^:::tldr\s*\n([\s\S]*?)\n\s*:::/);

  if (!tldrMatch) {
    return {
      tldr: null,
      markdown: trimmedContent
    };
  }

  return {
    tldr: tldrMatch[1].trim(),
    markdown: trimmedContent.slice(tldrMatch[0].length).trim()
  };
}

export default function BlogPost({ post }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined'
    ? window.location.href
    : `https://nadavavital.com/blog/${post.slug}`;

  const shareText = `${post.title} by Nadav Avital`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const { tldr, markdown } = extractTldr(post.content);
  const readingTime = getReadingTime(post.content);

  const ogImageUrl = `https://nadavavital.com${post.ogImage || '/og-image.jpeg'}`;
  const canonicalUrl = `https://nadavavital.com/blog/${post.slug}`;

  return (
    <>
      <NextSeo
        title={`Nadav Avital - ${post.title}`}
        description={post.description}
        canonical={canonicalUrl}
        openGraph={{
          url: canonicalUrl,
          title: post.title,
          description: post.description,
          type: 'article',
          article: {
            publishedTime: post.date,
            authors: ['Nadav Avital'],
          },
          images: [
            {
              url: ogImageUrl,
              alt: post.title,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <main className="page page-blog">
        <Link href="/blog" className="back-link">
          ← All Posts
        </Link>

        <article className="blog-article">
          <header className="article-header">
            <div className="article-meta">
              <time>{formatDate(post.date)}</time>
              <span className="meta-dot">·</span>
              <span>{readingTime}</span>
            </div>
            <h1 className="article-title">{post.title}</h1>
          </header>

          {post.app && (
            <div className="article-app-card">
              <Link href={post.app.page} className="app-card-link">
                <Image
                  src={post.app.icon}
                  alt={post.app.name}
                  width={48}
                  height={48}
                  className="app-card-icon"
                />
                <div className="app-card-info">
                  <span className="app-card-name">{post.app.name}</span>
                  <span className="app-card-tagline">{post.app.tagline}</span>
                </div>
              </Link>
              <a
                href={post.app.download}
                target="_blank"
                rel="noopener noreferrer"
                className="app-card-download"
              >
                Download
              </a>
            </div>
          )}

          <div className="article-content">
            {tldr && (
              <details className="tldr-card">
                <summary>TLDR</summary>
                <p>{tldr}</p>
              </details>
            )}

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href = '', children, ...props }) => {
                  const isExternal = href.startsWith('http');
                  if (isExternal) {
                    return (
                      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                        {children}
                      </a>
                    );
                  }
                  return (
                    <a href={href} {...props}>
                      {children}
                    </a>
                  );
                }
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>

          <div className="share-section">
            <span className="share-label">Share</span>
            <div className="share-buttons">
              <button onClick={shareToTwitter} className="share-btn" aria-label="Share on X/Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
              <button onClick={shareToLinkedIn} className="share-btn" aria-label="Share on LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
              <button onClick={handleCopyLink} className="share-btn" aria-label="Copy link">
                {copied ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </article>

        <footer>
          © {new Date().getFullYear()} Nadav Avital
        </footer>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  return {
    props: {
      post: {
        ...post,
        date: post.date instanceof Date ? post.date.toISOString() : post.date
      }
    }
  };
}
