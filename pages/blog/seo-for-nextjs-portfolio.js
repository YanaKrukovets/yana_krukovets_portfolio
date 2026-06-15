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
    "SEO for a Next.js Portfolio — Meta Tags, Open Graph, and JSON-LD That Actually Work",
  description:
    "A walkthrough of the SEO implementation on yanakrukovets.com: meta tags, Open Graph, Twitter cards, JSON-LD structured data, sitemap, and the key prop trick that keeps page-level overrides working correctly in Next.js.",
  datePublished: "2026-06-10",
  dateModified: "2026-06-13",
  image: `${SITE_URL}/images/blogs/SEO.png`,
  url: `${SITE_URL}/blog/seo-for-nextjs-portfolio`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/seo-for-nextjs-portfolio`,
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
      name: "What meta tags does every Next.js page need for SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "At minimum: a unique title tag, a meta description, and a canonical URL. For social sharing, add the full Open Graph set (og:type, og:title, og:description, og:url, og:image) and the matching Twitter card tags. For blog posts, a BlogPosting JSON-LD block gives Google the structured data it needs for rich results.",
      },
    },
    {
      "@type": "Question",
      name: "What is the key prop in Next.js <Head> and why do you need it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Next.js merges Head tags from every component in the render tree. If your layout sets og:title and your page also sets og:title, you end up with two tags, and different crawlers handle duplicates differently, so the result is unpredictable. Adding key='og:title' to both tags tells Next.js to treat them as the same slot: only one tag ends up in the rendered head, and the page-level tag always overrides the layout default.",
      },
    },
    {
      "@type": "Question",
      name: "What is JSON-LD and does it actually help SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JSON-LD is a way to embed structured data in a page as a script tag. Google reads it to understand the content type (article, FAQ, product, event) and can use it for rich results in search. For a portfolio blog, two schemas matter most: BlogPosting (author, publish date, headline) and FAQPage (marks Q&A content up as structured data — though Google significantly reduced FAQ rich result eligibility in 2023, and most sites outside government and authoritative health domains rarely receive FAQ rich snippets today).",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a sitemap for a small portfolio site?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, even for a small site. A sitemap helps Google discover your URLs efficiently — especially useful on smaller sites where internal linking is limited. For a Next.js Pages Router project, the easiest approach is a static sitemap.xml in the public folder, maintained by hand. Submit it once through Google Search Console; on this site new pages have often been indexed within a day or two of publishing, though indexing times vary and aren't guaranteed.",
      },
    },
    {
      "@type": "Question",
      name: "Do Core Web Vitals affect SEO in a Next.js site?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Since 2021, Core Web Vitals (LCP, CLS, and INP) are explicit Google ranking signals as part of the page experience update — though content relevance generally outweighs performance differences in most ranking decisions. Next.js helps with several of them by default: next/image reserves space for images before they load to prevent layout shift (CLS), serves modern formats like WebP or AVIF where supported, and lazy-loads below-the-fold images. When deployed on Vercel, statically generated pages are distributed through Vercel's global edge network, which lowers LCP. The fastest way to check your actual scores is PageSpeed Insights — it runs against your live URL and shows both field data from real Chrome users and lab data.",
      },
    },
  ],
});

export default function SeoForNextjsPortfolio() {
  return (
    <>
      <Head>
        <title>
          SEO for a Next.js Portfolio — Meta Tags, Open Graph, and JSON-LD That
          Actually Work | Yana Krukovets
        </title>
        <meta
          name="description"
          content="How I implemented SEO on yanakrukovets.com: meta tags, Open Graph, Twitter cards, JSON-LD structured data, sitemap, and the Next.js key prop trick that makes page-level overrides work."
        />
        <meta property="og:type" key="og:type" content="article" />
        <meta property="article:published_time" content="2026-06-10" />
        <meta property="article:modified_time" content="2026-06-13" />
        <meta property="article:author" content={SITE_URL} />
        <meta
          property="og:title"
          key="og:title"
          content="SEO for a Next.js Portfolio — Meta Tags, Open Graph, and JSON-LD That Actually Work | Yana Krukovets"
        />
        <meta
          property="og:description"
          key="og:description"
          content="A walkthrough of the SEO implementation on yanakrukovets.com: meta tags, Open Graph, Twitter cards, JSON-LD structured data, and a manually-maintained sitemap in a Next.js Pages Router project."
        />
        <meta
          property="og:url"
          key="og:url"
          content={`${SITE_URL}/blog/seo-for-nextjs-portfolio`}
        />
        <meta
          property="og:image"
          key="og:image"
          content={`${SITE_URL}/images/blogs/SEO.png`}
        />
        <meta property="og:image:width" key="og:image:width" content="1274" />
        <meta property="og:image:height" key="og:image:height" content="640" />
        <meta
          property="og:image:alt"
          key="og:image:alt"
          content="SEO implementation in a Next.js portfolio — meta tags, Open Graph, JSON-LD"
        />
        <meta
          name="twitter:title"
          key="twitter:title"
          content="SEO for a Next.js Portfolio — Meta Tags, Open Graph, and JSON-LD That Actually Work | Yana Krukovets"
        />
        <meta
          name="twitter:description"
          key="twitter:description"
          content="A walkthrough of the SEO implementation on yanakrukovets.com: meta tags, Open Graph, Twitter cards, JSON-LD structured data, and a manually-maintained sitemap in a Next.js Pages Router project."
        />
        <meta
          name="twitter:image"
          key="twitter:image"
          content={`${SITE_URL}/images/blogs/SEO.png`}
        />
        <meta
          name="twitter:image:alt"
          key="twitter:image:alt"
          content="SEO implementation in a Next.js portfolio — meta tags, Open Graph, JSON-LD"
        />
        <meta
          property="twitter:url"
          key="twitter:url"
          content={`${SITE_URL}/blog/seo-for-nextjs-portfolio`}
        />
        <link
          rel="canonical"
          href={`${SITE_URL}/blog/seo-for-nextjs-portfolio`}
          key="canonical"
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
                <span className="blog-article__category">Next.js</span>
                <span aria-hidden="true">·</span>
                <time dateTime="2026-06-10">June 10, 2026</time>
                <span aria-hidden="true">·</span>
                <span>9 min read</span>
              </div>
            </header>

            <div className="blog-article__banner">
              <Image
                src="/images/blogs/SEO.png"
                alt="SEO implementation in a Next.js portfolio — meta tags, Open Graph, and JSON-LD structured data"
                width={1274}
                height={640}
                className="blog-article__banner-img"
                priority
              />
            </div>

            <h1 id="blog-post-title" className="blog-article__title">
              SEO for a Next.js Portfolio — Meta Tags, Open Graph, and JSON-LD
              That Actually Work
            </h1>

            <p className="blog-article__intro">
              When I launched{" "}
              <a
                href="https://www.yanakrukovets.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                yanakrukovets.com
              </a>
              , the site worked — but it was invisible to Google. No structured
              data, no Open Graph tags, no sitemap. Fixing that took less time
              than I expected, and most of it lives in a handful of files I
              already had. This is a walkthrough of exactly what I added, and
              why each piece matters.
            </p>

            <div className="blog-article__body">

              <section>
                <h2>What Next.js Gives You for Free</h2>
                <p>
                  Next.js Pages Router generates HTML by default, either
                  statically at build time or on the server depending on how the
                  page is configured. For both, crawlers receive rendered HTML
                  rather than having to execute JavaScript to see the content —
                  a meaningful advantage over a traditional client-rendered React
                  SPA that you get without any SEO-specific configuration. Some
                  content may still hydrate client-side after the initial HTML
                  loads, but the core page content is in the document from the
                  start.
                </p>
                <p>
                  What you don&apos;t get for free: meta tags, structured data,
                  or any of the signals that tell Google and social platforms how
                  to represent your pages. That part is on you.
                </p>
                <p>
                  One note before the details: this site uses the Pages Router,
                  so everything below is <code>next/head</code> and manual
                  files. If you&apos;re on the App Router, the modern
                  equivalents are the <code>metadata</code> export (or{" "}
                  <code>generateMetadata</code>) for meta tags and{" "}
                  <code>app/sitemap.ts</code> for a generated sitemap — same
                  concepts, less manual wiring.
                </p>
              </section>

              <section>
                <h2>Meta Tags and the <code>key</code> Prop Trick</h2>
                <p>
                  Every page in a Next.js Pages Router app can include a{" "}
                  <code>&lt;Head&gt;</code> block from <code>next/head</code>. I
                  set a site-wide <code>&lt;title&gt;</code> and{" "}
                  <code>description</code> in <code>Layout.js</code> (the root
                  shell that wraps every page) and then override them per-page
                  using the <code>key</code> prop.
                </p>
                <p>
                  The <code>key</code> prop is the part that surprised me.
                  Without it, Next.js merges all <code>&lt;Head&gt;</code> tags
                  from every component in the render tree, so you can end up
                  with two <code>og:title</code> tags, one from the layout and
                  one from the page. How crawlers handle duplicates varies by
                  platform (Facebook, LinkedIn, Slack, and X each parse a
                  little differently), so the result is unpredictable. Adding{" "}
                  <code>key=&quot;og:title&quot;</code> to both tags tells
                  Next.js to treat them as the same slot: only one tag ends up
                  in the rendered head, and the page-level one wins.
                </p>
                <p>
                  This applies to every duplicated tag, including the plain
                  meta description — if both your layout and your page set{" "}
                  <code>&lt;meta name=&quot;description&quot;&gt;</code>,
                  they need <code>key=&quot;description&quot;</code> too. In my
                  setup I sidestep that by not setting a plain description in{" "}
                  <code>Layout.js</code> at all; each page defines its own, so
                  there&apos;s only ever one tag to begin with.
                </p>
              </section>

              <section>
                <h2>Open Graph — What Controls the Link Preview</h2>
                <p>
                  Open Graph tags control the card preview when someone shares a
                  link on LinkedIn, Slack, or iMessage. Without them, platforms
                  fall back to scraping whatever text they find first, usually
                  the wrong thing.
                </p>
                <p>
                  The full set I use on every blog post:
                </p>
                <ul>
                  <li>
                    <code>og:type</code> — <code>article</code> for posts,{" "}
                    <code>website</code> for the homepage
                  </li>
                  <li>
                    <code>og:title</code> — the page title, matching the{" "}
                    <code>&lt;title&gt;</code> tag
                  </li>
                  <li>
                    <code>og:description</code> — a standalone sentence written
                    for the card, not a truncated version of the meta description
                  </li>
                  <li>
                    <code>og:url</code> — the canonical URL of the page,
                    including the full domain; this should match the{" "}
                    <code>href</code> of your{" "}
                    <code>&lt;link rel=&quot;canonical&quot;&gt;</code> tag exactly
                  </li>
                  <li>
                    <code>og:image</code> — an absolute URL to the banner image;
                    I use the blog post banner at a 2:1 ratio (this one is
                    1274&times;640px)
                  </li>
                  <li>
                    <code>og:image:width</code> and{" "}
                    <code>og:image:height</code> — can help crawlers process the
                    image more efficiently and avoid extra inspection requests,
                    though some platforms fetch the image regardless
                  </li>
                  <li>
                    <code>og:image:alt</code> — a text description of the image
                    for screen-reader users on sharing platforms
                  </li>
                </ul>
                <p>
                  Alongside these tags, add a{" "}
                  <code>&lt;link rel=&quot;canonical&quot; href=&quot;...&quot; /&gt;</code>{" "}
                  tag pointing to the same URL as <code>og:url</code>. The
                  canonical tag tells Google which URL is the definitive version
                  of the page. Skip it and Google may index multiple variants as
                  separate pages — with and without a trailing slash, or with
                  query parameters appended by analytics tools. One thing worth
                  knowing: Google treats canonicals as strong hints rather than
                  directives. If other signals conflict (for example, a different
                  URL accumulating more inbound links), Google may select a
                  different canonical than the one you specified.
                </p>
                <p>
                  Use absolute URLs for the image. A relative path like{" "}
                  <code>/images/blogs/banner.png</code> is risky: many social
                  crawlers expect a full URL, and some platforms won&apos;t
                  reliably resolve relative paths. I store
                  the site URL in a <code>SITE_URL</code> constant at the top of
                  each post file and template the image path from it.
                </p>
              </section>

              <section>
                <h2>Twitter Cards</h2>
                <p>
                  X (formerly Twitter) has its own meta tags. Its crawler does
                  fall back to Open Graph when they&apos;re missing, but the
                  Twitter-specific tags take priority and give you explicit
                  control over how the card renders. The core set is:{" "}
                  <code>twitter:card</code>, <code>twitter:title</code>,{" "}
                  <code>twitter:description</code>, <code>twitter:image</code>,
                  and <code>twitter:image:alt</code>. I set{" "}
                  <code>twitter:card</code> to{" "}
                  <code>summary_large_image</code> in <code>Layout.js</code> so
                  every page gets a large image card by default.{" "}
                  <code>twitter:url</code> is sometimes included but isn&apos;t
                  part of X&apos;s core card requirements and isn&apos;t widely
                  used by the platform — treat it as optional.
                </p>
                <p>
                  Same story with the <code>key</code> prop: every Twitter meta
                  tag gets one so page-level values override the layout defaults.
                  Yes, it means duplicating content between the OG tags and the
                  Twitter tags. You could rely on the OG fallback and skip the
                  Twitter set entirely; I keep both because explicit beats
                  implicit when debugging a broken card preview.
                </p>
              </section>

              <section>
                <h2>JSON-LD Structured Data</h2>
                <p>
                  Meta tags help social platforms. JSON-LD structured data helps
                  Google understand what a page is about and enables rich results
                  in search. For this portfolio, I use two schemas on every blog
                  post.
                </p>
                <h3>BlogPosting</h3>
                <p>
                  The <code>BlogPosting</code> schema tells Google the post
                  headline, description, author, publisher, publish date, and
                  banner image. It makes the post eligible to show article
                  metadata in search (author name, date, sometimes the image)
                  instead of just a plain blue link, though Google doesn&apos;t
                  guarantee it&apos;ll display any of them.
                </p>
                <h3>FAQPage</h3>
                <p>
                  If the post has a visible FAQ section (every post on this site
                  does), a matching <code>FAQPage</code> JSON-LD block marks
                  those Q&amp;As up as structured data. One honest caveat: Google
                  significantly reduced FAQ rich result eligibility in 2023, and
                  most sites outside government and authoritative health domains
                  rarely receive FAQ rich snippets today — so a portfolio blog
                  shouldn&apos;t expect them to show up. I keep
                  the markup anyway because it&apos;s valid structured data that
                  helps Google understand the page content, and it costs nothing
                  to maintain alongside the visible FAQ.
                </p>
                <p>
                  The rule that matters: <strong>the schema must match the
                  visible content exactly</strong>. Google cross-references the
                  JSON-LD against what&apos;s actually on the page. If the
                  visible question is &ldquo;How do I configure X?&rdquo; and
                  the schema says &ldquo;Configuring X,&rdquo; that mismatch can
                  get the rich snippet flagged or removed. I copy the FAQ text
                  from the JSX, strip the markup, and paste it into the schema.
                </p>
                <p>
                  Both schemas go in <code>&lt;Head&gt;</code> as{" "}
                  <code>&lt;script type=&quot;application/ld+json&quot;&gt;</code>{" "}
                  tags rendered with{" "}
                  <code>dangerouslySetInnerHTML=&#123;&#123; __html: jsonLdString &#125;&#125;</code>.
                  JSON-LD must be inserted as raw text inside the{" "}
                  <code>&lt;script&gt;</code> tag.{" "}
                  <code>dangerouslySetInnerHTML</code> ensures the JSON is
                  emitted exactly as written, without React escaping any
                  characters — which is why it&apos;s the standard approach for
                  JSON-LD.
                </p>
              </section>

              <section>
                <h2>The Sitemap</h2>
                <p>
                  Next.js doesn&apos;t generate a sitemap automatically in the
                  Pages Router. I maintain <code>public/sitemap.xml</code> by
                  hand, a small XML file with one <code>&lt;url&gt;</code> block
                  per page. For this portfolio that&apos;s: homepage, projects,
                  contact, privacy policy, blog index, and every individual post.
                </p>
                <p>
                  Each entry carries the URL, a <code>lastmod</code> date, plus{" "}
                  <code>changefreq</code> and <code>priority</code> values.
                  Worth knowing: Google has said it largely ignores{" "}
                  <code>changefreq</code> and <code>priority</code>; the fields
                  that actually matter are the URL and <code>lastmod</code>. I
                  still fill in the other two (monthly for the homepage, yearly
                  for posts) because they&apos;re harmless and other crawlers
                  may read them, but don&apos;t expect them to influence how
                  Google crawls your site.
                </p>
                <p>
                  Once the sitemap was ready, I submitted the URL through Google
                  Search Console. On this site, new posts have often been
                  indexed within a day or two of publishing after submission —
                  though indexing times vary widely and aren&apos;t guaranteed.
                  Submission still beats waiting for Google to discover them
                  through crawling.
                </p>
              </section>

              <section>
                <h2>robots.txt</h2>
                <p>
                  A small but necessary file. <code>public/robots.txt</code>{" "}
                  tells crawlers which paths they&apos;re allowed to index. For a
                  portfolio with no private routes, it&apos;s three lines:
                </p>
                <pre className="blog-article__code-block">
                  <code>{`User-agent: *\nAllow: /\n\nSitemap: https://www.yanakrukovets.com/sitemap.xml`}</code>
                </pre>
                <p>
                  The <code>Sitemap:</code> directive at the bottom tells any
                  crawler that reads <code>robots.txt</code> where to find the
                  sitemap, without needing Search Console submission.
                </p>
              </section>

              <section>
                <h2>Other Public Files Worth Adding</h2>
                <p>
                  A few more files that belong in <code>public/</code> — none
                  are ranking factors, but they matter for mobile and PWA
                  behavior:
                </p>
                <ul>
                  <li>
                    <code>favicon.ico</code> — the tab icon; browsers request
                    it automatically
                  </li>
                  <li>
                    <code>manifest.json</code> — enables &ldquo;Add to Home Screen&rdquo;
                    on mobile and defines the app name and icon for PWA
                    installations
                  </li>
                </ul>
                <p>
                  Two <code>&lt;Head&gt;</code> tags worth setting in your
                  layout alongside the SEO tags:
                </p>
                <ul>
                  <li>
                    <code>&lt;link rel=&quot;icon&quot; href=&quot;/favicon.ico&quot; /&gt;</code>{" "}
                    — explicit favicon declaration (browsers find it anyway,
                    but this prevents a 404 log entry in some setups)
                  </li>
                  <li>
                    <code>&lt;meta name=&quot;theme-color&quot; content=&quot;#...&quot; /&gt;</code>{" "}
                    — sets the browser chrome color on Android and in PWA
                    mode; worth adding if your site has a defined color scheme
                  </li>
                </ul>
              </section>

              <section>
                <h2>Performance and Core Web Vitals</h2>
                <p>
                  Meta tags and structured data tell Google what your page is
                  about. Core Web Vitals tell it how your page performs. Since
                  2021, performance has been an explicit ranking signal through
                  Google&apos;s page experience update — though content relevance
                  generally outweighs performance differences in most ranking
                  decisions. It matters, just not more than having useful content.
                </p>
                <p>
                  The three metrics that matter:
                </p>
                <ul>
                  <li>
                    <strong>LCP (Largest Contentful Paint)</strong> — how long
                    until the biggest visible element finishes rendering. For a
                    portfolio, that&apos;s usually the hero image or the banner
                    on a blog post.
                  </li>
                  <li>
                    <strong>CLS (Cumulative Layout Shift)</strong> — how much
                    the page visually jumps while loading. Images without
                    explicit width/height attributes are the most common cause.
                    So is loading a font that pushes text around before it
                    settles.
                  </li>
                  <li>
                    <strong>INP (Interaction to Next Paint)</strong> — replaced
                    FID in 2024. Measures how quickly the page responds to user
                    input like clicks or taps.
                  </li>
                </ul>
                <p>
                  Next.js helps with several of these by default, often without
                  you thinking of it as SEO work.
                </p>
                <p>
                  <strong><code>next/image</code>.</strong> The Image component
                  prevents layout shift by reserving space for the image before
                  it loads. In most cases you provide <code>width</code> and{" "}
                  <code>height</code> props — or use <code>fill</code> for images
                  that should cover their container — and Next.js uses those
                  values to hold the space before the image arrives. It also
                  lazy-loads images below the fold and serves modern optimized
                  formats like WebP or AVIF where the browser supports them. I
                  add{" "}
                  <code>priority</code> to above-the-fold images (like the blog
                  post banner) so they preload instead of wait. That directly
                  improves LCP on pages where the banner is the largest element.
                </p>
                <p>
                  <strong>Static generation and edge delivery.</strong> Most
                  pages on this site are statically generated at build time.
                  When deployed on Vercel, those pages are distributed through
                  Vercel&apos;s global edge network, so the browser gets a
                  complete document without waiting for a server to render
                  anything. That&apos;s a meaningful LCP improvement over a
                  server-rendered or client-rendered equivalent, and it requires
                  no SEO-specific configuration — it&apos;s just how Pages Router
                  works by default.
                </p>
                <p>
                  <strong>Fonts.</strong> <code>next/font</code> inlines
                  critical font CSS at build time and eliminates the external
                  round-trip to Google Fonts. On this site I load fonts from
                  Google Fonts using the <code>media=&quot;print&quot;</code>{" "}
                  non-blocking trick — the stylesheet loads as a low-priority
                  print resource and swaps to <code>all</code> once it&apos;s
                  downloaded, so it never blocks the initial render. Combined
                  with <code>preconnect</code> hints to{" "}
                  <code>fonts.googleapis.com</code> and{" "}
                  <code>fonts.gstatic.com</code>, the font request starts early
                  without delaying the page. It&apos;s one more network request
                  than <code>next/font</code>, but not a render-blocking one.
                </p>
                <p>
                  For measuring: PageSpeed Insights runs against your live URL
                  and shows field data (from actual Chrome users) alongside lab
                  data. LCP and CLS are where portfolio sites tend to have the
                  clearest improvements.
                </p>
              </section>

              <section>
                <h2>Debugging Tools Worth Knowing</h2>
                <p>
                  Once the tags are in place, these tools are how you verify
                  they actually work:
                </p>
                <ul>
                  <li>
                    <strong>Facebook Sharing Debugger</strong> — scrapes your
                    page and shows exactly which Open Graph tags Facebook
                    reads, including the rendered preview card. Use it to
                    force a cache refresh when you update an image.
                  </li>
                  <li>
                    <strong>Twitter Card Validator</strong> — same idea for X
                    (formerly Twitter); lets you confirm the card type and
                    preview before sharing.
                  </li>
                  <li>
                    <strong>Google Rich Results Test</strong> — validates your
                    JSON-LD structured data and shows which rich result types
                    the page is eligible for.
                  </li>
                  <li>
                    <strong>Google Search Console</strong> — the ground truth.
                    Shows coverage errors, structured data warnings, and
                    confirms whether Google has actually indexed your pages.
                    Submit your sitemap here first.
                  </li>
                </ul>
                <p>
                  In practice I use the Rich Results Test after every new
                  post and Search Console a few days later to confirm the
                  page was picked up cleanly.
                </p>
              </section>

              <section>
                <h2>What It Looked Like Before vs. After</h2>
                <p>
                  Before: sharing a link on LinkedIn produced a blank
                  card with the domain name. Google indexed the homepage but
                  ignored the blog. No rich snippets, no structured data warnings
                  in Search Console because there was nothing to warn about.
                </p>
                <p>
                  After: every page produces a proper link preview with the right
                  title, description, and banner image. Blog posts are eligible
                  to display article metadata like publication date, author
                  information, and images in search. The structured data
                  validates cleanly in Search Console. The sitemap is accepted
                  and processed. None of this required a plugin or a third-party
                  service, just a few dozen lines of markup per page and one
                  XML file maintained by hand.
                </p>
                <p>
                  If you&apos;re building a Next.js portfolio and haven&apos;t
                  touched SEO yet, start with the <code>key</code> prop and Open
                  Graph tags. Those two changes will make your links look
                  professional when shared anywhere, which matters more than most
                  developers expect.
                </p>
              </section>

              <section className="blog-article__faq">
                <h2>Frequently Asked Questions</h2>

                <details className="blog-article__faq-item">
                  <summary className="blog-article__faq-question">
                    What meta tags does every Next.js page need for SEO?
                  </summary>
                  <p className="blog-article__faq-answer">
                    At minimum: a unique title tag, a meta description, and a
                    canonical URL. For social sharing, add the full Open Graph
                    set (<code>og:type</code>, <code>og:title</code>,{" "}
                    <code>og:description</code>, <code>og:url</code>,{" "}
                    <code>og:image</code>) and the matching Twitter card tags.
                    For blog posts, a <code>BlogPosting</code> JSON-LD block
                    gives Google the structured data it needs for rich results.
                  </p>
                </details>

                <details className="blog-article__faq-item">
                  <summary className="blog-article__faq-question">
                    What is the <code>key</code> prop in Next.js{" "}
                    <code>&lt;Head&gt;</code> and why do you need it?
                  </summary>
                  <p className="blog-article__faq-answer">
                    Next.js merges <code>&lt;Head&gt;</code> tags from every
                    component in the render tree. If your layout sets{" "}
                    <code>og:title</code> and your page also sets{" "}
                    <code>og:title</code>, you end up with two tags, and
                    different crawlers handle duplicates differently, so the
                    result is unpredictable. Adding{" "}
                    <code>key=&quot;og:title&quot;</code> to both tags tells
                    Next.js to treat them as the same slot: only one tag ends up
                    in the rendered head, and the page-level tag always
                    overrides the layout default.
                  </p>
                </details>

                <details className="blog-article__faq-item">
                  <summary className="blog-article__faq-question">
                    What is JSON-LD and does it actually help SEO?
                  </summary>
                  <p className="blog-article__faq-answer">
                    JSON-LD is a way to embed structured data in a page as a
                    script tag. Google reads it to understand the content type
                    (article, FAQ, product, event) and can use it for rich
                    results in search. For a portfolio blog, two schemas matter
                    most: <code>BlogPosting</code> (author, publish date,
                    headline) and <code>FAQPage</code> (marks Q&amp;A content up
                    as structured data — though Google significantly reduced FAQ
                    rich result eligibility in 2023, and most sites outside
                    government and authoritative health domains rarely receive
                    FAQ rich snippets today).
                  </p>
                </details>

                <details className="blog-article__faq-item">
                  <summary className="blog-article__faq-question">
                    Do I need a sitemap for a small portfolio site?
                  </summary>
                  <p className="blog-article__faq-answer">
                    Yes, even for a small site. A sitemap helps Google discover
                    your URLs efficiently — especially useful on smaller sites
                    where internal linking is limited. For a Next.js Pages Router
                    project, the easiest approach is a static{" "}
                    <code>sitemap.xml</code> in the <code>public</code> folder,
                    maintained by hand. Submit it once through Google Search
                    Console; on this site new pages have often been indexed within
                    a day or two of publishing, though indexing times vary and
                    aren&apos;t guaranteed.
                  </p>
                </details>

                <details className="blog-article__faq-item">
                  <summary className="blog-article__faq-question">
                    Do Core Web Vitals affect SEO in a Next.js site?
                  </summary>
                  <p className="blog-article__faq-answer">
                    Yes. Since 2021, Core Web Vitals (LCP, CLS, and INP) are
                    explicit Google ranking signals as part of the page
                    experience update — though content relevance generally
                    outweighs performance differences in most ranking decisions.
                    Next.js helps with several of them by default:{" "}
                    <code>next/image</code> reserves space for images before
                    they load to prevent layout shift (CLS), serves modern
                    formats like WebP or AVIF where supported, and lazy-loads
                    below-the-fold images. When deployed on Vercel, statically
                    generated pages are distributed through Vercel&apos;s global
                    edge network, which lowers LCP. The fastest way to check
                    your actual scores is PageSpeed Insights — it runs against
                    your live URL and shows both field data from real Chrome
                    users and lab data.
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

            <RelatedPosts currentSlug="seo-for-nextjs-portfolio" />

          </div>
        </article>
      </div>
    </>
  );
}
