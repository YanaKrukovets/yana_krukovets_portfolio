import Link from "next/link";
import { useRouter } from "next/router";

export default function BlogCta() {
  const router = useRouter();
  const isHome = router.pathname === "/";

  return (
    <section className="blog-cta" aria-labelledby="blog-cta-title">
      <p id="blog-cta-title" className="blog-cta__title">
        Need a developer for your next project?
      </p>
      <p className="blog-cta__subtitle">
        Yana Krukovets is a Full Stack/Frontend Developer based in Ottawa,
        Canada, specializing in React, Next.js, WordPress, Sanity, Shopify
        development.
      </p>
      <div className="blog-cta__actions">
        <Link href="/projects" className="blog-cta__button">
          View Projects
        </Link>
        {isHome ? (
          <Link href="/blog" className="blog-cta__button">
            Read the Blog
          </Link>
        ) : (
          <Link href="/#about" className="blog-cta__button">
            About Yana
          </Link>
        )}
        <Link href="/contact" className="blog-cta__button">
          Get in Touch
        </Link>
      </div>
    </section>
  );
}
