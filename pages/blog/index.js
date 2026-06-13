import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS as POSTS } from "../../lib/blogPosts";

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog | Yana Krukovets — Web Developer</title>
        <meta
          name="description"
          content="Thoughts on web development, WordPress, performance, and building better websites — by Yana Krukovets, Full Stack Developer based in Ottawa, Canada."
        />
        <meta property="og:title" key="og:title" content="Blog | Yana Krukovets" />
        <meta
          property="og:description"
          key="og:description"
          content="Thoughts on web development, WordPress, and building better websites."
        />
        <meta name="twitter:title" key="twitter:title" content="Blog | Yana Krukovets" />
        <meta
          name="twitter:description"
          key="twitter:description"
          content="Thoughts on web development, WordPress, and building better websites."
        />
      </Head>

      <div className="content-wrapper">
      <div className="blog-page">
        <div className="blog-page__header">
          <h1 className="blog-page__title">Blog</h1>
          <p className="blog-page__subtitle">
            Notes from real projects — on WordPress, performance, and building
            things that last.
          </p>
        </div>

        <ul className="blog-list" role="list">
          {POSTS.map((post) => (
            <li key={post.slug} className="blog-card">
              {post.image && (
                <Link href={`/blog/${post.slug}`} className="blog-card__image-link" tabIndex={-1} aria-hidden="true">
                  <div className="blog-card__image-wrap">
                    <Image
                      src={post.image}
                      alt={`${post.title} — article banner`}
                      width={800}
                      height={420}
                      className="blog-card__image"
                    />
                  </div>
                </Link>
              )}
              <div className="blog-card__content">
                <div className="blog-card__meta">
                  <span className="blog-card__category">{post.category}</span>
                  <span className="blog-card__dot" aria-hidden="true">·</span>
                  <time className="blog-card__date" dateTime={post.isoDate}>{post.date}</time>
                  <span className="blog-card__dot" aria-hidden="true">·</span>
                  <span className="blog-card__read-time">{post.readTime}</span>
                </div>
                <h2 className="blog-card__title">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="blog-card__description">{post.description}</p>
                <Link href={`/blog/${post.slug}`} className="blog-card__cta" aria-label={`Read: ${post.title}`}>
                  Read post →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </>
  );
}
