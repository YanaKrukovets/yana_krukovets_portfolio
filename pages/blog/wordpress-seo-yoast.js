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
    "SEO for WordPress with Yoast — What It Fixed on a Client Build, and What It Couldn't",
  description:
    "A walkthrough of setting up Yoast SEO on a real client WordPress site: titles and meta templates, XML sitemaps, schema, the green-light analysis, and the SEO work Yoast can't do for you.",
  datePublished: "2026-06-17",
  dateModified: "2026-06-17",
  image: `${SITE_URL}/images/blogs/wordpress-banner.png`,
  url: `${SITE_URL}/blog/wordpress-seo-yoast`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/wordpress-seo-yoast`,
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
      name: "Is the free version of Yoast SEO enough for most sites?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most small business and portfolio sites, yes. The free version handles title and meta templates, XML sitemaps, canonical tags, robots controls, schema, and Open Graph data, which covers the technical SEO foundation. The premium version mainly adds the redirect manager, multiple focus keyphrases, internal linking suggestions, and orphaned content reports. Those are convenience features, not requirements. I'd only upgrade once the redirect manager alone would save enough manual work to justify it.",
      },
    },
    {
      "@type": "Question",
      name: "Does a green light in Yoast mean my page will rank?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The green light only means the page passed Yoast's on-page checklist: keyphrase in the title, a meta description of the right length, some internal links, readable sentences. Those are hygiene checks, not ranking guarantees. Google ranks on relevance, content quality, authority, and user experience, none of which Yoast can measure. Treat the traffic lights as a reminder of things not to forget, not a score to chase.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use the Yoast sitemap or submit one manually?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the Yoast sitemap. It generates an XML sitemap automatically at /sitemap_index.xml and keeps it updated as you publish, which is the main advantage over a hand-maintained file. Submit that index URL in Google Search Console once. Yoast splits content into separate sitemaps by type (posts, pages, categories), and you can exclude any post type or taxonomy you don't want indexed directly from the Yoast settings.",
      },
    },
    {
      "@type": "Question",
      name: "Can Yoast slow down a WordPress site?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yoast adds some overhead (extra database queries, admin assets, inline schema in the page head), but on a normally built site the impact is small and not what you'd notice on a slow page. Performance problems on WordPress almost always come from heavy themes, page builders, and unoptimized images, not from an SEO plugin. If your scores are bad, fix those first.",
      },
    },
  ],
});

export default function WordPressSeoYoast() {
  return (
    <>
      <Head>
        <title>
          SEO for WordPress with Yoast — What It Fixed on a Client Build, and
          What It Couldn&apos;t | Yana Krukovets
        </title>
        <meta
          name="description"
          content="Setting up Yoast SEO on a real client WordPress site: title and meta templates, XML sitemaps, schema, the green-light analysis, and the SEO work Yoast can't do for you."
        />
        <meta property="og:type" key="og:type" content="article" />
        <meta property="article:published_time" content="2026-06-17" />
        <meta property="article:modified_time" content="2026-06-17" />
        <meta property="article:author" content={SITE_URL} />
        <meta
          property="og:title"
          key="og:title"
          content="SEO for WordPress with Yoast — What It Fixed on a Client Build, and What It Couldn't | Yana Krukovets"
        />
        <meta
          property="og:description"
          key="og:description"
          content="Setting up Yoast SEO on a real client WordPress site: title and meta templates, XML sitemaps, schema, the green-light analysis, and the SEO work Yoast can't do for you."
        />
        <meta
          property="og:url"
          key="og:url"
          content={`${SITE_URL}/blog/wordpress-seo-yoast`}
        />
        <meta
          property="og:image"
          key="og:image"
          content={`${SITE_URL}/images/blogs/wordpress-banner.png`}
        />
        <meta property="og:image:width" key="og:image:width" content="760" />
        <meta property="og:image:height" key="og:image:height" content="317" />
        <meta
          property="og:image:alt"
          key="og:image:alt"
          content="Yoast SEO plugin on a WordPress dashboard"
        />
        <meta
          name="twitter:title"
          key="twitter:title"
          content="SEO for WordPress with Yoast — What It Fixed on a Client Build, and What It Couldn't | Yana Krukovets"
        />
        <meta
          name="twitter:description"
          key="twitter:description"
          content="Setting up Yoast SEO on a real client WordPress site: title and meta templates, sitemaps, schema, and the SEO work Yoast can't do for you."
        />
        <meta
          name="twitter:image"
          key="twitter:image"
          content={`${SITE_URL}/images/blogs/wordpress-banner.png`}
        />
        <meta
          name="twitter:image:alt"
          key="twitter:image:alt"
          content="Yoast SEO plugin on a WordPress dashboard"
        />
        <meta
          property="twitter:url"
          key="twitter:url"
          content={`${SITE_URL}/blog/wordpress-seo-yoast`}
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
                <span className="blog-article__category">WordPress</span>
                <span aria-hidden="true">·</span>
                <time dateTime="2026-06-17">June 17, 2026</time>
                <span aria-hidden="true">·</span>
                <span>8 min read</span>
              </div>
            </header>

            <div className="blog-article__banner">
              <Image
                src="/images/blogs/wordpress-banner.png"
                alt="WordPress dashboard with the Yoast SEO plugin installed"
                width={760}
                height={317}
                className="blog-article__banner-img"
                priority
              />
            </div>

            <h1 id="blog-post-title" className="blog-article__title">
              SEO for WordPress with Yoast — What It Fixed on a Client Build,
              and What It Couldn&apos;t
            </h1>

            <p className="blog-article__intro">
              I picked up a client WordPress site that had been live for two
              years and was barely showing up in search. Pages had no meta
              descriptions, every browser tab read the same generic title, and
              there was no sitemap submitted anywhere. The fix wasn&apos;t
              glamorous: install Yoast SEO, set up the parts that matter, and
              do the manual work the plugin can&apos;t. Here&apos;s what that
              looked like, and where Yoast genuinely earned its keep versus
              where it left me on my own.
            </p>

            <div className="blog-article__body">

              <section>
                <h2>What I Walked Into</h2>
                <p>
                  The site ran a heavy theme with a page builder, which is its
                  own problem (I wrote about that in{" "}
                  <Link href="/blog/why-avoid-page-builders">
                    why I avoid page builders
                  </Link>
                  ). On the SEO side, the basics were missing entirely. Every
                  page title in the search snippet was just the page name plus
                  the site name, no thought behind it. Meta descriptions
                  weren&apos;t set, so Google was inventing its own from
                  whatever text it found first. No sitemap had been submitted
                  in Search Console and no SEO plugin was managing sitemap
                  generation, there was no canonical strategy, and the contact
                  and thank-you pages were fully indexed alongside the real
                  content.
                </p>
                <p>
                  None of that is exotic. It&apos;s the default state of a
                  WordPress site nobody configured. Yoast exists to turn that
                  default into something deliberate.
                </p>
              </section>

              <section>
                <h2>Why Yoast First</h2>
                <p>
                  WordPress gives you a decent SEO foundation out of the box:
                  clean permalinks, automatic <code>&lt;title&gt;</code> tags,
                  RSS feeds, crawlable HTML, image alt text fields, and a basic
                  XML sitemap at <code>/wp-sitemap.xml</code> (since WordPress
                  5.5). What it lacks is the control layer: meta descriptions,
                  Open Graph data, schema, canonicals, and per-page SEO
                  management. An SEO plugin fills that gap, and Yoast is the one
                  I reach for because it covers that control layer in the free
                  version and doesn&apos;t bury it behind upsells.
                </p>
                <p>
                  Rank Math and All in One SEO do the same job, and if a client
                  already runs one of those I leave it. What matters is that
                  exactly one SEO plugin is active. Running two means two
                  plugins both writing title tags and schema, which produces
                  duplicates and conflicting signals. The first thing I checked
                  on this site was that nothing else was already claiming the
                  job.
                </p>
              </section>

              <section>
                <h2>Setting Up Titles and Meta Templates</h2>
                <p>
                  This is the part of Yoast I value most, and it&apos;s easy to
                  miss because it lives in settings rather than on each post.
                  Under <strong>Yoast SEO → Settings</strong>, you define
                  templates for each content type (posts, pages, categories)
                  using variables. So instead of writing a title for all 40
                  existing pages by hand, I set the page template to something
                  like:
                </p>
                <ul>
                  <li>
                    <strong>Title:</strong>{" "}
                    <code>%%title%% %%sep%% %%sitename%%</code>
                  </li>
                  <li>
                    <strong>Posts:</strong>{" "}
                    <code>%%title%% %%sep%% %%category%% %%sep%% %%sitename%%</code>
                  </li>
                </ul>
                <p>
                  That immediately gave every page a sensible default title
                  derived from its own content rather than a repeated string.
                  From there I went into the handful of pages that actually
                  drive the business, the services and landing pages, and
                  wrote custom titles and meta descriptions by hand in the
                  Yoast box below the editor. The template handles the long
                  tail; the important pages get individual attention.
                </p>
                <p>
                  One detail worth knowing: the meta description is not a
                  ranking factor, but it is the snippet most people read before
                  deciding to click. A clear, specific description written for
                  a human will out-click a keyword-stuffed one even if both
                  rank in the same spot.
                </p>
              </section>

              <section>
                <h2>The Sitemap: Set Once, Forget It</h2>
                <p>
                  Yoast generates an XML sitemap automatically and keeps it
                  current as content is published. You&apos;ll find it at{" "}
                  <code>/sitemap_index.xml</code>, which links out to separate
                  sitemaps for posts, pages, and taxonomies. The advantage over
                  a hand-maintained file is that nobody has to remember to
                  update it. On static sites the sitemap is a file someone
                  edits manually, and it goes stale the moment they forget (more on that
                  approach in{" "}
                  <Link href="/blog/seo-for-nextjs-portfolio">
                    the Next.js SEO post
                  </Link>
                  ).
                </p>
                <p>
                  I submitted the <code>sitemap_index.xml</code> URL in Google
                  Search Console once and that was it. If you haven&apos;t set
                  Search Console up yet, it&apos;s worth doing before anything
                  else. It&apos;s how you find out whether your pages are
                  actually getting indexed, which I covered in{" "}
                  <Link href="/blog/google-search-console-guide">
                    the Search Console guide
                  </Link>
                  . Submitting a sitemap gets your URLs discovered; it
                  doesn&apos;t guarantee they&apos;ll be indexed.
                </p>
              </section>

              <section>
                <h2>Keeping the Wrong Pages Out of Google</h2>
                <p>
                  Not every page belongs in search results. The thank-you page
                  after a form submission, the cart and checkout on a store,
                  tag archives that duplicate post content. None of those
                  should be competing for impressions. Yoast lets you set a
                  page to <code>noindex</code> from the{" "}
                  <strong>Advanced</strong> section of the post&apos;s Yoast
                  box, and lets you switch off indexing for entire content
                  types or taxonomies in the settings.
                </p>
                <p>
                  On this site I turned off indexing for tag and date archives
                  because they were generating thin, near-duplicate pages, and
                  set the thank-you page to <code>noindex</code>. That&apos;s a
                  site-specific call, not a universal rule: on larger publishers
                  or stores, well-organized tag or category archives can earn
                  real organic traffic and are worth keeping indexed. Yoast also writes the
                  canonical tag for every page automatically, pointing each URL
                  at itself by default, which tells search engines the preferred
                  version of a URL and heads off many common duplicate-content
                  issues. Canonicals are a signal, not a directive: Google can
                  still pick a different URL if it judges one a better fit, but a
                  consistent self-canonical is the right default.
                </p>
              </section>

              <section>
                <h2>Schema and Social Previews</h2>
                <p>
                  Yoast generates a schema graph automatically, which may
                  include <code>Organization</code> or <code>Person</code> for
                  the site, plus <code>WebPage</code>, <code>Article</code>,{" "}
                  <code>BreadcrumbList</code>, and other types depending on the
                  content. You set whether the site
                  represents a person or an organization during the
                  configuration, and Yoast builds the graph from there. It
                  saves writing JSON-LD by hand, which on a custom site I do
                  myself but on WordPress is exactly the kind of repetitive
                  work a plugin should own.
                </p>
                <p>
                  It also generates the Open Graph and Twitter Card tags that
                  control how a link looks when shared on social or in
                  messaging apps. You can set a default social image for the
                  whole site and override it per page from the{" "}
                  <strong>Social</strong> tab in the Yoast box. The client had
                  none of this, so every shared link showed a blank box;
                  setting a default image fixed it across the whole site at
                  once.
                </p>
              </section>

              <section>
                <h2>The Traffic Lights Are Useful, With a Caveat</h2>
                <p>
                  The part everyone notices is the red, orange, and green dots
                  for the SEO and readability analysis. You set a focus
                  keyphrase and Yoast checks whether it appears in the title,
                  the first paragraph, the URL, a subheading, and the meta
                  description, plus readability things like sentence length and
                  passive voice.
                </p>
                <p>
                  I use these as a checklist, not a target. The checks are real
                  reminders. It&apos;s genuinely easy to forget the meta
                  description or to write a title that doesn&apos;t mention the
                  topic. But a green light means the page passed an on-page
                  hygiene test, not that it will rank. Google ranks on
                  relevance, quality, and authority, and Yoast can&apos;t see
                  any of those. I&apos;ve watched people rewrite a perfectly
                  good sentence into something stilted just to turn an orange
                  dot green, which helps nobody. Chase the green where it costs
                  you nothing; ignore it where it makes the writing worse.
                </p>
              </section>

              <section>
                <h2>What Yoast Couldn&apos;t Do</h2>
                <p>
                  The plugin handled the technical scaffolding well. It did not
                  fix the things that actually move rankings:
                </p>
                <ul>
                  <li>
                    <strong>Content.</strong> Several pages were a couple of
                    sentences over a stock photo. No plugin rescues thin
                    content — that&apos;s writing work, and I flagged it for the
                    client.
                  </li>
                  <li>
                    <strong>Site speed.</strong> The heavy theme and
                    unoptimized images were dragging the load time down, and
                    SEO plugins don&apos;t touch performance. That was a
                    separate job, which I go through in{" "}
                    <Link href="/blog/improve-wordpress-performance">
                      how to improve WordPress performance
                    </Link>
                    .
                  </li>
                  <li>
                    <strong>Internal linking and authority.</strong> Yoast
                    Premium suggests internal links, but deciding what links to
                    what, and earning links from other sites, is strategy and
                    outreach, not a setting.
                  </li>
                </ul>
                <p>
                  Before calling the job finished I also checked Search Console
                  for crawl errors, confirmed HTTPS canonicalization was
                  redirecting the non-www and <code>http</code> versions
                  correctly, fixed the broken internal links the old content had
                  accumulated, and reviewed Core Web Vitals. Yoast doesn&apos;t
                  cover any of that.
                </p>
                <p>
                  Yoast gets you to a clean technical baseline fast. Past that
                  point the work is content and performance, and those are on
                  you.
                </p>
              </section>

              <section className="blog-article__faq">
                <h2>Frequently Asked Questions</h2>

                <details className="blog-article__faq-item">
                  <summary className="blog-article__faq-question">
                    Is the free version of Yoast SEO enough for most sites?
                  </summary>
                  <p className="blog-article__faq-answer">
                    For most small business and portfolio sites, yes. The free
                    version handles title and meta templates, XML sitemaps,
                    canonical tags, robots controls, schema, and Open Graph
                    data, which covers the technical SEO foundation. The
                    premium version mainly adds the redirect manager, multiple
                    focus keyphrases, internal linking suggestions, and orphaned
                    content reports. Those are convenience features, not
                    requirements. I&apos;d only upgrade once the redirect
                    manager alone would save enough manual work to justify it.
                  </p>
                </details>

                <details className="blog-article__faq-item">
                  <summary className="blog-article__faq-question">
                    Does a green light in Yoast mean my page will rank?
                  </summary>
                  <p className="blog-article__faq-answer">
                    No. The green light only means the page passed Yoast&apos;s
                    on-page checklist: keyphrase in the title, a meta
                    description of the right length, some internal links,
                    readable sentences. Those are hygiene checks, not ranking
                    guarantees. Google ranks on relevance, content quality,
                    authority, and user experience, none of which Yoast can
                    measure. Treat the traffic lights as a reminder of things
                    not to forget, not a score to chase.
                  </p>
                </details>

                <details className="blog-article__faq-item">
                  <summary className="blog-article__faq-question">
                    Should I use the Yoast sitemap or submit one manually?
                  </summary>
                  <p className="blog-article__faq-answer">
                    Use the Yoast sitemap. It generates an XML sitemap
                    automatically at <code>/sitemap_index.xml</code> and keeps
                    it updated as you publish, which is the main advantage over
                    a hand-maintained file. Submit that index URL in Google
                    Search Console once. Yoast splits content into separate
                    sitemaps by type (posts, pages, categories), and you can
                    exclude any post type or taxonomy you don&apos;t want
                    indexed directly from the Yoast settings.
                  </p>
                </details>

                <details className="blog-article__faq-item">
                  <summary className="blog-article__faq-question">
                    Can Yoast slow down a WordPress site?
                  </summary>
                  <p className="blog-article__faq-answer">
                    Yoast adds some overhead (extra database queries, admin
                    assets, inline schema in the page head), but on a
                    normally built site the impact is small and not what
                    you&apos;d notice on a slow page. Performance problems on
                    WordPress almost always come from heavy themes, page
                    builders, and unoptimized images, not from an SEO plugin.
                    If your scores are bad, fix those first.
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

            <RelatedPosts currentSlug="wordpress-seo-yoast" />

          </div>
        </article>
      </div>
    </>
  );
}
