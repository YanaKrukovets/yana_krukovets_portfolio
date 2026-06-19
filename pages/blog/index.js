import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { BLOG_POSTS as POSTS } from "../../lib/blogPosts";

const POSTS_PER_PAGE = 5;

export default function Blog() {
  const router = useRouter();
  const totalPages = Math.max(1, Math.ceil(POSTS.length / POSTS_PER_PAGE));
  const currentPage = Math.min(
    totalPages,
    Math.max(1, parseInt(router.query.page, 10) || 1)
  );
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = POSTS.slice(startIndex, startIndex + POSTS_PER_PAGE);

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
          {pagePosts.map((post) => (
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

        {totalPages > 1 && (
          <div className="blog-pagination" role="navigation" aria-label="Blog pagination">
            <Link
              href={currentPage <= 2 ? "/blog" : `/blog?page=${currentPage - 1}`}
              className={`blog-pagination__arrow ${currentPage === 1 ? "blog-pagination__arrow--disabled" : ""}`}
              aria-disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ← Prev
            </Link>

            <ul className="blog-pagination__list" role="list">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li key={page}>
                  <Link
                    href={page === 1 ? "/blog" : `/blog?page=${page}`}
                    className={`blog-pagination__link ${page === currentPage ? "blog-pagination__link--active" : ""}`}
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={`/blog?page=${currentPage + 1}`}
              className={`blog-pagination__arrow ${currentPage === totalPages ? "blog-pagination__arrow--disabled" : ""}`}
              aria-disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              Next →
            </Link>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
