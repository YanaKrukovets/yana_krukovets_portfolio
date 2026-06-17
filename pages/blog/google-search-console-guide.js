import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import RelatedPosts from "../../components/RelatedPosts";
import BlogCta from "../../components/BlogCta";

const SITE_URL = "https://www.yanakrukovets.com";

const articleJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline:
    "Google Search Console Explained — Indexing Reports, URL Inspection, and Why Your Pages Aren't Showing Up",
  description:
    "A practical guide to Google Search Console: how to read the indexing report, what common 'not indexed' reasons actually mean, and how to use URL Inspection to get your pages into Google faster.",
  datePublished: "2026-06-15",
  dateModified: "2026-06-15",
  image: `${SITE_URL}/images/blogs/seo2.png`,
  url: `${SITE_URL}/blog/google-search-console-guide`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/google-search-console-guide`,
  },
  author: { "@type": "Person", name: "Yana Krukovets", url: SITE_URL },
  publisher: { "@type": "Person", name: "Yana Krukovets", url: SITE_URL },
});

const faqJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does it take Google to index a new page?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It varies. For a new site with little authority, a few days to a few weeks is normal. For an established site, new pages often get indexed within 1–3 days, especially if you submit them through URL Inspection. Submitting a sitemap helps Google discover all your URLs at once, but discovery and indexing are separate steps — Google can know a URL exists for days before it actually crawls and indexes it.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between 'Discovered — currently not indexed' and 'Crawled — currently not indexed'?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "'Discovered — currently not indexed' means Google found the URL but hasn't visited it yet. It's in the crawl queue. 'Crawled — currently not indexed' means Google actually visited and rendered the page but decided not to include it in the index. The second one is more serious: it usually means Google found a quality issue — thin content, near-duplicate pages, or a page without a clear topic.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to request indexing for every new page I publish?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not strictly. Google will eventually find and index pages on its own via your sitemap and internal links. For pages you want crawled sooner, requesting indexing through URL Inspection places the URL into a priority crawl queue. Google does not guarantee faster indexing, but it's worth doing for important pages. Don't submit the same URL repeatedly; once is enough. Wait a few days and check URL Inspection to confirm it was crawled.",
      },
    },
    {
      "@type": "Question",
      name: "Why does 'Page with redirect' appear in my not-indexed list?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Google discovered a URL that responds with a redirect (301 or 302) and won't index the redirect itself — only the destination. This is almost always the non-www version of your pages (e.g., http://yoursite.com/ redirecting to https://www.yoursite.com/). It looks alarming but it isn't a problem. Google follows the redirect, indexes the canonical destination, and the redirect URLs won't appear in search results.",
      },
    },
  ],
});

export default function GoogleSearchConsoleGuide() {
  return (
    <>
      <Head>
        <title>
          Google Search Console Explained — Indexing Reports and Why Your Pages
          Aren&apos;t Showing Up | Yana Krukovets
        </title>
        <meta
          name="description"
          content="A practical guide to Google Search Console: how to read the indexing report, what 'Page with redirect' and 'Discovered — currently not indexed' mean, and how to request indexing for faster results."
        />
        <meta property="og:type" key="og:type" content="article" />
        <meta property="article:published_time" content="2026-06-15" />
        <meta property="article:modified_time" content="2026-06-15" />
        <meta property="article:author" content={SITE_URL} />
        <meta
          property="og:title"
          key="og:title"
          content="Google Search Console Explained — Indexing Reports and Why Your Pages Aren't Showing Up | Yana Krukovets"
        />
        <meta
          property="og:description"
          key="og:description"
          content="A practical guide to Google Search Console: how to read the indexing report, what common 'not indexed' reasons actually mean, and how to use URL Inspection to get pages indexed faster."
        />
        <meta
          property="og:url"
          key="og:url"
          content={`${SITE_URL}/blog/google-search-console-guide`}
        />
        <meta
          property="og:image"
          key="og:image"
          content={`${SITE_URL}/images/blogs/seo2.png`}
        />
        <meta property="og:image:width" key="og:image:width" content="1345" />
        <meta property="og:image:height" key="og:image:height" content="699" />
        <meta
          property="og:image:alt"
          key="og:image:alt"
          content="Google Search Console indexing report dashboard"
        />
        <meta
          name="twitter:title"
          key="twitter:title"
          content="Google Search Console Explained — Indexing Reports and Why Your Pages Aren't Showing Up | Yana Krukovets"
        />
        <meta
          name="twitter:description"
          key="twitter:description"
          content="A practical guide to Google Search Console: how to read the indexing report, what common 'not indexed' reasons actually mean, and how to use URL Inspection to get pages indexed faster."
        />
        <meta
          name="twitter:image"
          key="twitter:image"
          content={`${SITE_URL}/images/blogs/seo2.png`}
        />
        <meta
          name="twitter:image:alt"
          key="twitter:image:alt"
          content="Google Search Console indexing report dashboard"
        />
        <meta
          property="twitter:url"
          key="twitter:url"
          content={`${SITE_URL}/blog/google-search-console-guide`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: articleJsonLd }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqJsonLd }}
        />
      </Head>

      <div className="content-wrapper">
        <article className="blog-article" aria-labelledby="blog-post-title">
          <div className="blog-article__inner">

            <Link href="/blog" className="blog-article__back">
              ← Back to Blog
            </Link>

            <header className="blog-article__header">
              <div className="blog-article__meta">
                <span className="blog-article__category">SEO</span>
                <span aria-hidden="true">·</span>
                <time dateTime="2026-06-15">June 15, 2026</time>
                <span aria-hidden="true">·</span>
                <span>7 min read</span>
              </div>
            </header>

            <div className="blog-article__banner">
              <Image
                src="/images/blogs/seo2.png"
                alt="Google Search Console page indexing report showing indexed and not-indexed pages"
                width={1345}
                height={699}
                className="blog-article__banner-img"
                priority
              />
            </div>

            <h1 id="blog-post-title" className="blog-article__title">
              Google Search Console Explained — Indexing Reports, URL
              Inspection, and Why Your Pages Aren&apos;t Showing Up
            </h1>

            <p className="blog-article__intro">
              When I first opened the indexing report for{" "}
              <a
                href="https://www.yanakrukovets.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                yanakrukovets.com
              </a>{" "}
              in Google Search Console, it showed 1 indexed page and 6 not
              indexed — with two reasons that sounded worse than they were.
              This post breaks down what those reasons actually mean, which
              ones need fixing and which ones don&apos;t, and how to use URL
              Inspection to move things along.
            </p>

            <div className="blog-article__body">

              <section>
                <h2>What Google Search Console Is</h2>
                <p>
                  Search Console is Google&apos;s free tool for monitoring how
                  your site appears in Google Search. It tells you which pages
                  are in the index, what queries they&apos;re showing up for,
                  how many clicks they get, and most usefully when
                  you&apos;re starting out: why specific pages aren&apos;t
                  being indexed.
                </p>
                <p>
                  What it isn&apos;t: a real-time tool. Data in Search Console
                  runs 2–4 days behind. It also isn&apos;t a rank tracker. It
                  shows your performance data within Google Search, but
                  it won&apos;t tell you where you stand against competitors
                  for a given keyword.
                </p>
                <p>
                  Before anything else, you need to verify ownership. The
                  easiest method for most sites is adding a{" "}
                  <code>DNS TXT</code> record through your domain registrar.
                  Alternatively, you can upload an HTML file to your server or
                  add a{" "}
                  <code>
                    &lt;meta name=&ldquo;google-site-verification&rdquo;&gt;
                  </code>{" "}
                  tag to your site&apos;s <code>&lt;head&gt;</code>. Once
                  verified, submit your sitemap and give it a few days to
                  start populating with data.
                </p>
              </section>

              <section>
                <h2>The Pages Indexing Report</h2>
                <p>
                  Find it at <strong>Indexing → Pages</strong> in the left
                  nav. The report splits your URLs into two buckets:
                </p>
                <ul>
                  <li>
                    <strong>Indexed</strong> — pages Google has confirmed are
                    in its index and eligible to show up in search results.
                  </li>
                  <li>
                    <strong>Not indexed</strong> — pages Google knows about
                    but isn&apos;t showing in results, with a reason for each
                    group.
                  </li>
                </ul>
                <p>
                  Below the chart is a table called &ldquo;Why pages
                  aren&apos;t indexed.&rdquo; Each row is a reason, with a
                  page count next to it. Click a row to see the actual URLs
                  behind that reason; the overview itself shows only the
                  counts.
                </p>
              </section>

              <section>
                <h2>Common &ldquo;Not Indexed&rdquo; Reasons</h2>

                <h3>Discovered — currently not indexed</h3>
                <p>
                  Google knows about the URL but hasn&apos;t crawled it yet.
                  This can happen because the site has limited crawl budget,
                  weak internal linking, low authority, slow server response
                  times, or simply because the page is new. Newer and
                  less-established sites are often crawled less aggressively
                  than larger sites with strong authority and frequent content
                  updates. For very small sites, crawl budget is rarely a hard
                  ceiling, but Google still prioritizes crawl resources based
                  on perceived importance.
                </p>
                <p>
                  On this site, 3 pages showed up under this reason when the
                  sitemap was first submitted: the blog index, the projects
                  page, and one of the blog posts. The source was listed as
                  &ldquo;Google systems,&rdquo; meaning Google discovered them
                  from the sitemap rather than from an external link.
                </p>
                <p>
                  <strong>Fix:</strong> Before requesting indexing, make sure
                  the page is linked from at least one crawlable page on your
                  site. URLs that only exist in a sitemap often take longer to
                  be crawled than URLs that are part of your internal link
                  structure. Then use the URL Inspection tool to place the URL
                  into a priority crawl queue (covered below).
                </p>

                <h3>Page with redirect</h3>
                <p>
                  Google discovered a URL that responds with a{" "}
                  <code>301</code> or <code>302</code> redirect. It
                  won&apos;t index the redirect URL itself, only the
                  destination. On most sites these are the non-www versions
                  of your pages (e.g.,{" "}
                  <code>http://yoursite.com/</code> redirecting to{" "}
                  <code>https://www.yoursite.com/</code>).
                </p>
                <p>
                  On yanakrukovets.com, 3 pages appeared under this reason —
                  all non-www variants that redirect to the canonical{" "}
                  <code>https://www.</code> URLs. The source was listed as
                  &ldquo;Website,&rdquo; meaning Google found them by
                  following links rather than from the sitemap (the sitemap
                  only lists the <code>www</code> versions).
                </p>
                <p>
                  <strong>This is not a real problem.</strong> Google follows
                  the redirect, indexes the canonical destination, and the
                  redirect URLs won&apos;t appear in search results. You can
                  ignore them.
                </p>

                <h3>Crawled — currently not indexed</h3>
                <p>
                  Google visited and rendered the page but chose not to
                  include it in the index. This is the reason worth
                  investigating.
                </p>
                <p>Common causes:</p>
                <ul>
                  <li>
                    <strong>Thin or duplicate content</strong> — a page with
                    very little unique text, a stub page, or content that
                    closely mirrors other indexed pages on your site.
                  </li>
                  <li>
                    <strong>Soft 404</strong> — the server returns a{" "}
                    <code>200</code> status but the page has no real content:
                    empty category pages, search result pages showing
                    &ldquo;nothing found,&rdquo; or thin programmatically
                    generated pages.
                  </li>
                  <li>
                    <strong>Weak internal linking</strong> — pages with few
                    or no internal links are harder for Google to evaluate
                    and are more likely to be skipped.
                  </li>
                  <li>
                    <strong>Low perceived value</strong> — sometimes the page
                    is technically valid but Google determines it doesn&apos;t
                    add enough unique value compared with other indexed pages
                    on the same topic.
                  </li>
                </ul>
                <p>
                  <strong>Fix:</strong> Improve the content and make sure the
                  page is linked from other crawlable pages on your site. A
                  clear purpose, a meaningful title and meta description, and
                  real substance for the reader are the baseline. Then request
                  re-indexing via URL Inspection.
                </p>

                <h3>Duplicate without user-selected canonical</h3>
                <p>
                  Google found multiple URLs serving near-identical content
                  and decided to index only one of them, not necessarily the
                  one you wanted. Common causes: tracking parameters
                  creating duplicate URLs (
                  <code>/page?utm_source=twitter</code> vs{" "}
                  <code>/page</code>), or paginated content variants (
                  <code>/blog/page/1/</code> vs <code>/blog/</code>).
                </p>
                <p>
                  <strong>Fix:</strong> Add a{" "}
                  <code>&lt;link rel=&ldquo;canonical&rdquo;&gt;</code> tag
                  pointing to the preferred URL on every affected page.
                  Canonical tags are hints, not directives. Google treats
                  them as a strong signal but may choose a different canonical
                  if its systems determine another URL is a better
                  representative. That said, consistent canonicals are the
                  right tool here. One thing to watch: if your sitemap lists
                  URL A, your canonical points to URL B, and your internal
                  links point to URL C, Google gets conflicting signals. Keep
                  all three aligned on the same version. If you&apos;re on
                  Next.js,{" "}
                  <Link href="/blog/seo-for-nextjs-portfolio">
                    the SEO post covers how to set canonicals correctly using
                    the Layout component
                  </Link>{" "}
                  so they apply across every page without repetition.
                </p>

                <h3>Excluded by &ldquo;noindex&rdquo; tag</h3>
                <p>
                  The page has{" "}
                  <code>
                    &lt;meta name=&ldquo;robots&rdquo;
                    content=&ldquo;noindex&rdquo;&gt;
                  </code>{" "}
                  in its HTML. Google respects it and skips the page
                  entirely.
                </p>
                <p>
                  <strong>Fix:</strong> If you actually want the page indexed,
                  remove the tag. If it&apos;s intentional (staging pages,
                  admin routes, 404 and 500 error pages), leave it alone.
                  That&apos;s the tag working as designed.
                </p>

                <h3>Blocked by robots.txt</h3>
                <p>
                  If a URL is blocked in your <code>robots.txt</code> file,
                  Google may not be able to crawl the page at all, which means
                  it can&apos;t evaluate the content to decide whether to index
                  it. When diagnosing an indexing problem, check both{" "}
                  <code>robots.txt</code> (accessible at{" "}
                  <code>/robots.txt</code> on your domain) and the page-level
                  robots meta tag. They block crawling through different
                  mechanisms: <code>robots.txt</code> tells Googlebot not to
                  fetch the page&apos;s content (though Google can still
                  discover and list the URL from external links, just without
                  a snippet); the <code>noindex</code> meta tag lets Google
                  fetch the page but instructs it not to index what it finds.
                </p>
              </section>

              <section>
                <h2>URL Inspection — How to Request Indexing</h2>
                <p>
                  The URL Inspection tool is in the left nav. Paste any URL
                  from your verified property (it must match exactly —
                  including <code>https://</code> and <code>www</code> if your
                  site uses them) and Search Console will show you:
                </p>
                <ul>
                  <li>Whether the URL is indexed</li>
                  <li>When Googlebot last crawled it</li>
                  <li>
                    How Google rendered the page after executing JavaScript
                    — useful for React, Next.js, and other frameworks where
                    content is client-rendered rather than served as static
                    HTML
                  </li>
                  <li>Any crawl or indexing errors</li>
                </ul>
                <p>
                  If the page isn&apos;t indexed yet, click{" "}
                  <strong>&ldquo;Request Indexing.&rdquo;</strong> This places
                  the URL into a priority crawl queue, which often results in
                  faster crawling. Google does not guarantee indexing or a
                  specific timeline — treat it as a nudge, not a switch.
                </p>
                <p>
                  One thing to keep in mind: requesting indexing for the same
                  URL repeatedly doesn&apos;t help. Submit once, wait 3–5
                  days, then check the report again to confirm the page was
                  crawled.
                </p>
              </section>

              <section>
                <h2>Submitting Your Sitemap</h2>
                <p>
                  A sitemap is an XML file listing every URL you want Google
                  to discover. For a small site with limited internal linking,
                  it&apos;s the most reliable way to make sure Google finds
                  all your pages rather than only the ones linked from the
                  homepage.
                </p>
                <p>
                  Go to <strong>Indexing → Sitemaps</strong> and submit the
                  full URL (e.g.,{" "}
                  <code>https://www.yoursite.com/sitemap.xml</code>). Search
                  Console will show a status. &ldquo;Success&rdquo; means it
                  parsed the file without errors. It does not mean all the
                  URLs inside it are indexed; discovery and indexing are
                  separate steps.
                </p>
                <p>
                  If you&apos;re on Next.js with the Pages Router,{" "}
                  <Link href="/blog/seo-for-nextjs-portfolio">
                    the SEO post walks through the static{" "}
                    <code>sitemap.xml</code> approach
                  </Link>{" "}
                  — a hand-maintained file in the <code>public/</code> folder
                  that works without any extra dependencies.
                </p>
                <p>
                  One common point of confusion: submitting a sitemap gives
                  Google a list of URLs to consider. Whether and when it
                  crawls them is still Google&apos;s call. A sitemap gets your
                  pages discovered faster; URL Inspection gets specific pages
                  crawled faster.
                </p>
              </section>

              <section>
                <h2>What to Ignore</h2>
                <p>
                  Not every entry in the &ldquo;not indexed&rdquo; list
                  requires action. A few that are almost always safe to ignore:
                </p>
                <ul>
                  <li>
                    <strong>Page with redirect</strong> — as covered above,
                    this is expected behavior. The destination URL is what
                    gets indexed.
                  </li>
                  <li>
                    <strong>
                      Alternate page with proper canonical tag
                    </strong>{" "}
                    — Google found a duplicate but you&apos;ve already told it
                    which version to use. It&apos;s doing what you asked.
                  </li>
                  <li>
                    <strong>Page with noindex</strong> for error pages and
                    admin routes — these are intentionally excluded and should
                    stay that way.
                  </li>
                </ul>
                <p>
                  The ones worth acting on are{" "}
                  <strong>
                    &ldquo;Crawled — currently not indexed&rdquo;
                  </strong>{" "}
                  (a content quality signal) and{" "}
                  <strong>
                    &ldquo;Discovered — currently not indexed&rdquo;
                  </strong>{" "}
                  for pages you want indexed quickly.
                </p>
              </section>

              <section className="blog-article__faq">
                <h2>Frequently Asked Questions</h2>

                <details className="blog-article__faq-item">
                  <summary className="blog-article__faq-question">
                    How long does it take Google to index a new page?
                  </summary>
                  <p className="blog-article__faq-answer">
                    It varies. For a new site with little authority, a few
                    days to a few weeks is normal. For an established site,
                    new pages often get indexed within 1–3 days, especially if
                    you submit them through URL Inspection. Submitting a
                    sitemap helps Google discover all your URLs at once, but
                    discovery and indexing are separate steps — Google can know
                    a URL exists for days before it actually crawls and indexes
                    it.
                  </p>
                </details>

                <details className="blog-article__faq-item">
                  <summary className="blog-article__faq-question">
                    What is the difference between &ldquo;Discovered —
                    currently not indexed&rdquo; and &ldquo;Crawled —
                    currently not indexed&rdquo;?
                  </summary>
                  <p className="blog-article__faq-answer">
                    &ldquo;Discovered — currently not indexed&rdquo; means
                    Google found the URL but hasn&apos;t visited it yet —
                    it&apos;s in the crawl queue. &ldquo;Crawled — currently
                    not indexed&rdquo; means Google actually visited and
                    rendered the page but decided not to include it in the
                    index. The second one is more serious: it usually means
                    Google found a quality issue — thin content, near-duplicate
                    pages, or a page without a clear topic.
                  </p>
                </details>

                <details className="blog-article__faq-item">
                  <summary className="blog-article__faq-question">
                    Do I need to request indexing for every new page I publish?
                  </summary>
                  <p className="blog-article__faq-answer">
                    Not strictly. Google will eventually find and index pages
                    on its own via your sitemap and internal links. For pages
                    you want crawled sooner, requesting indexing through URL
                    Inspection places the URL into a priority crawl queue.
                    Google does not guarantee faster indexing, but it&apos;s
                    worth doing for important pages. Don&apos;t submit the same
                    URL repeatedly; once is enough. Wait a few days and check
                    URL Inspection to confirm it was crawled.
                  </p>
                </details>

                <details className="blog-article__faq-item">
                  <summary className="blog-article__faq-question">
                    Why does &ldquo;Page with redirect&rdquo; appear in my
                    not-indexed list?
                  </summary>
                  <p className="blog-article__faq-answer">
                    Google discovered a URL that responds with a redirect (301
                    or 302) and won&apos;t index the redirect itself — only
                    the destination. This is almost always the non-www version
                    of your pages (e.g.,{" "}
                    <code>http://yoursite.com/</code> redirecting to{" "}
                    <code>https://www.yoursite.com/</code>). It looks alarming
                    but it isn&apos;t a problem. Google follows the redirect,
                    indexes the canonical destination, and the redirect URLs
                    won&apos;t appear in search results.
                  </p>
                </details>
              </section>

            </div>

            <footer className="blog-article__footer">
              <BlogCta />
              <Link
                href="/blog"
                className="blog-article__back blog-article__back--bottom"
              >
                ← Back to Blog
              </Link>
            </footer>

            <RelatedPosts currentSlug="google-search-console-guide" />

          </div>
        </article>
      </div>
    </>
  );
}
