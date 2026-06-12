import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import RelatedPosts from "../../components/RelatedPosts";
import BlogCta from "../../components/BlogCta";

const SITE_URL = "https://www.yanakrukovets.com";

const faqJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between preload and prefetch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Preload tells the browser to fetch a resource the current page needs right now at high priority — like a hero image or a critical font. Prefetch tells the browser to fetch a resource the user will probably need soon at low priority, during idle time — like the JavaScript for the next page. Use preload for this page's critical path, prefetch for the next navigation.",
      },
    },
    {
      "@type": "Question",
      name: "How do I defer third-party scripts in Next.js?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the built-in next/script component instead of a plain script tag. The default strategy, afterInteractive, is the closest Next.js equivalent to a deferred script — it loads without blocking rendering and executes once the page becomes interactive. For analytics, chat widgets, and other non-critical scripts, use strategy='lazyOnload' so they only load during browser idle time and never compete with your content.",
      },
    },
    {
      "@type": "Question",
      name: "Does Next.js prefetch pages automatically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. In production builds, Next.js automatically prefetches links rendered with next/link as they enter the viewport — downloading the code for that route in the background so navigation feels nearly instant. The App Router prefetches more selectively than the Pages Router. You can disable it per-link with prefetch={false} for rarely-visited pages, which saves bandwidth on link-heavy pages.",
      },
    },
  ],
});

const articleJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How to Improve Performance in Next.js and React Apps — defer, preload, and prefetch Done Right",
  description:
    "A practical guide to making Next.js and React applications faster: script loading strategies, resource hints like preload and prefetch, image priorities, and code splitting that actually moves Core Web Vitals.",
  datePublished: "2026-06-05",
  dateModified: "2026-06-05",
  image: `${SITE_URL}/images/blogs/performance2.png`,
  url: `${SITE_URL}/blog/improve-nextjs-react-performance`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/improve-nextjs-react-performance`,
  },
  author: { "@type": "Person", name: "Yana Krukovets", url: SITE_URL },
  publisher: { "@type": "Person", name: "Yana Krukovets", url: SITE_URL },
});

export default function ImproveNextjsReactPerformance() {
  return (
    <>
      <Head>
        <title>Improve Next.js &amp; React Performance — defer, preload, prefetch | Yana Krukovets</title>
        <meta
          name="description"
          content="A practical guide to making Next.js and React applications faster: script loading strategies, resource hints like preload and prefetch, image priorities, and code splitting that actually moves Core Web Vitals."
        />
        <meta property="og:type" key="og:type" content="article" />
        <meta property="og:title" key="og:title" content="Improve Next.js & React Performance — defer, preload, prefetch | Yana Krukovets" />
        <meta
          property="og:description"
          key="og:description"
          content="Script strategies, resource hints, image priorities, and code splitting — the techniques that actually make Next.js and React apps faster."
        />
        <meta property="og:url" key="og:url" content={`${SITE_URL}/blog/improve-nextjs-react-performance`} />
        <meta property="og:image" key="og:image" content={`${SITE_URL}/images/blogs/performance2.png`} />
        <meta property="og:image:width" key="og:image:width" content="1271" />
        <meta property="og:image:height" key="og:image:height" content="640" />
        <meta property="og:image:alt" key="og:image:alt" content="Next.js and React performance optimization — defer, preload, and prefetch" />
        <meta name="twitter:title" key="twitter:title" content="Improve Next.js & React Performance — defer, preload, prefetch | Yana Krukovets" />
        <meta name="twitter:description" key="twitter:description" content="Script strategies, resource hints, image priorities, and code splitting — the techniques that actually make Next.js and React apps faster." />
        <meta name="twitter:image" key="twitter:image" content={`${SITE_URL}/images/blogs/performance2.png`} />
        <meta name="twitter:image:alt" key="twitter:image:alt" content="Next.js and React performance optimization — defer, preload, and prefetch" />
        <meta property="twitter:url" key="twitter:url" content={`${SITE_URL}/blog/improve-nextjs-react-performance`} />
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
              <time dateTime="2026-06-05">June 5, 2026</time>
              <span aria-hidden="true">·</span>
              <span>9 min read</span>
            </div>
          </header>

          <div className="blog-article__banner">
            <Image
              src="/images/blogs/performance2.png"
              alt="Next.js and React performance optimization — defer, preload, and prefetch"
              width={760}
              height={383}
              className="blog-article__banner-img"
              priority
            />
          </div>
          <h1 id="blog-post-title" className="blog-article__title">
            How to Improve Performance in Next.js and React Apps — defer, preload, and prefetch Done Right
          </h1>
          <p className="blog-article__intro">
            React apps have a different performance problem than WordPress
            sites. There&apos;s no{" "}
            <Link href="/blog/improve-wordpress-performance">plugin bloat</Link>{" "}
            and no{" "}
            <Link href="/blog/why-avoid-page-builders">page builder markup</Link>.
            Instead, the weight is JavaScript you wrote yourself: oversized
            bundles, third-party scripts loaded at the wrong time, and images
            the browser discovers too late. The good news is that Next.js ships
            most of the fixes built in; you just have to use them
            deliberately. Here&apos;s how I approach it on real projects:
            when to <code>defer</code>, what to <code>preload</code>, what to{" "}
            <code>prefetch</code>, and where the biggest improvements actually
            come from.
          </p>

          <div className="blog-article__body">

            <section>
              <h2>Start With What the Browser Sees</h2>
              <p>
                Every performance technique in this post is really about one
                thing: controlling <em>when</em> resources load. The browser
                discovers resources by parsing HTML top to bottom, and by
                default it treats everything as equally urgent. Your job is to
                tell it what&apos;s critical now, what can wait, and what it
                should fetch in the background for later:
              </p>
              <ul>
                <li>
                  <strong>Critical now:</strong> the hero image, the fonts,
                  the CSS for above-the-fold content. These deserve{" "}
                  <code>preload</code> and high priority.
                </li>
                <li>
                  <strong>Can wait:</strong> analytics, chat widgets, anything
                  below the fold. These get <code>defer</code>, lazy loading,
                  or an idle-time strategy.
                </li>
                <li>
                  <strong>Needed soon:</strong> the next page the user will
                  visit. This is what <code>prefetch</code> is for.
                </li>
              </ul>
              <p>
                Before changing anything, run your app through{" "}
                <strong>PageSpeed Insights</strong> or a local Lighthouse audit
                and note the three Core Web Vitals: <strong>LCP</strong>{" "}
                (target under 2.5s), <strong>INP</strong> (under 200ms), and{" "}
                <strong>CLS</strong> (under 0.1). Keep in mind that Lighthouse
                measures a simulated page load, so validate improvements against
                real-user Core Web Vitals data too (the field data in
                PageSpeed Insights, when available). Each technique below maps
                to one of those numbers.
              </p>
            </section>

            <section>
              <h2>Defer: Load Scripts at the Right Time with next/script</h2>
              <p>
                The classic HTML answer to render-blocking JavaScript is the{" "}
                <code>defer</code> attribute — the script downloads in parallel
                but only executes after the document is parsed. In Next.js you
                rarely write that attribute yourself, because the framework
                already defers its own bundles and gives you the{" "}
                <code>next/script</code> component for everything else:
              </p>
              <pre className="blog-article__code"><code>{`import Script from "next/script";

// Analytics — load during idle time, never block the page
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXX"
  strategy="lazyOnload"
/>

// A library the page needs once it's interactive (default)
<Script src="https://example.com/widget.js" strategy="afterInteractive" />`}</code></pre>
              <p>
                The three strategies, in the order you should reach for them:
              </p>
              <ul>
                <li>
                  <strong><code>lazyOnload</code>:</strong> loads during
                  browser idle time, after everything else. The right choice
                  for analytics, ad pixels, chat widgets, and social embeds.
                  This is the Next.js equivalent of the &ldquo;delay
                  JavaScript&rdquo; feature that{" "}
                  <Link href="/blog/improve-wordpress-performance">
                    caching plugins sell for WordPress
                  </Link>, and here it&apos;s free.
                </li>
                <li>
                  <strong><code>afterInteractive</code></strong> (default): the
                  closest Next.js equivalent to a deferred script. It
                  loads without blocking rendering and executes once the page
                  becomes interactive. Fine for scripts the page genuinely
                  needs, but not before paint.
                </li>
                <li>
                  <strong><code>beforeInteractive</code>:</strong> injected
                  before any Next.js code runs. Reserve it for the rare script
                  that must run first, like a consent manager or a bot
                  detector. Every script here delays interactivity for the
                  whole app.
                </li>
              </ul>
              <p>
                The most common mistake I see in audits: a plain{" "}
                <code>&lt;script&gt;</code> tag pasted into <code>_document</code>{" "}
                or <code>Head</code> because that&apos;s what the third-party
                vendor&apos;s instructions said. That bypasses Next.js&apos;s
                scheduling entirely. If a script can use{" "}
                <code>next/script</code> (and almost all of them can), it
                should.
              </p>
            </section>

            <section>
              <h2>Preload: Tell the Browser What It Needs Right Now</h2>
              <p>
                <code>preload</code> is a strong hint to the browser:
                &ldquo;this resource will be needed for the current page very
                soon, so start fetching it at high priority before you&apos;d
                naturally discover it.&rdquo; The classic use case is the LCP image.
                With server-rendered HTML the browser often discovers the
                hero image early on its own. But preloading still matters,
                because it fetches that image at the highest priority and
                disables lazy loading, which on image-heavy pages is often
                the difference between a passing and a failing LCP.
              </p>
              <p>
                In Next.js, you usually don&apos;t write the{" "}
                <code>&lt;link rel=&quot;preload&quot;&gt;</code> tag by hand.
                The framework exposes preloading through props:
              </p>
              <pre className="blog-article__code"><code>{`import Image from "next/image";

// "priority" preloads the image and disables lazy loading —
// use it on exactly one thing: the LCP element
<Image
  src="/images/hero.png"
  alt="Hero"
  width={1200}
  height={600}
  priority
/>`}</code></pre>
              <ul>
                <li>
                  <strong>Images:</strong> add <code>priority</code> to the
                  LCP image (and only that one). Every other{" "}
                  <code>next/image</code> stays lazy-loaded by default, which
                  is what you want. Under the hood, <code>priority</code>{" "}
                  emits a preload hint and sets{" "}
                  <code>fetchpriority=&quot;high&quot;</code> on the image.
                  Worth knowing: Next.js 16 deprecates <code>priority</code>{" "}
                  in favor of a more explicit <code>preload</code> prop, and
                  you can use <code>fetchPriority=&quot;high&quot;</code>{" "}
                  when you want the priority boost without a preload tag.
                </li>
                <li>
                  <strong>Fonts:</strong> use <code>next/font</code>. It
                  self-hosts the font files, preloads them, and sets{" "}
                  <code>font-display</code> automatically, which removes both
                  the flash of invisible text and the layout shift that
                  hurts CLS. If you&apos;re still loading Google Fonts via a{" "}
                  <code>&lt;link&gt;</code> tag, this is a one-file change with
                  a visible payoff.
                </li>
                <li>
                  <strong>Anything else critical:</strong> a manual{" "}
                  <code>&lt;link rel=&quot;preload&quot;&gt;</code> in{" "}
                  <code>Head</code> still works for cases the framework
                  doesn&apos;t cover, like a video poster or a critical API
                  response.
                </li>
              </ul>
              <blockquote className="blog-article__callout">
                <p>
                  Preload is a budget, not a free upgrade. Every preloaded
                  resource competes with everything else for bandwidth. If you
                  preload five things, you&apos;ve preloaded nothing.
                </p>
              </blockquote>
              <p>
                Related hints worth knowing: <code>preconnect</code> opens the
                TCP/TLS connection to a third-party origin early (worth adding
                for your font CDN or API domain), and{" "}
                <code>dns-prefetch</code> is its cheaper fallback that only
                resolves DNS. Both go in <code>Head</code> and cost almost
                nothing.
              </p>
            </section>

            <section>
              <h2>Prefetch: Make the Next Page Feel Instant</h2>
              <p>
                Where preload is about <em>this</em> page, <code>prefetch</code>{" "}
                is about the <em>next</em> one: it fetches at low priority,
                during idle time, so the resource is already cached when the
                user navigates.
              </p>
              <p>
                This is the feature Next.js is famous for: in
                production, links rendered with <code>next/link</code> are
                prefetched automatically as they enter the viewport (the App
                Router prefetches more selectively than the Pages Router). By the
                time the user clicks, the code for that route is usually
                already downloaded, which is why navigation in a well-built
                Next.js app feels nearly instant.
              </p>
              <pre className="blog-article__code"><code>{`import Link from "next/link";

// Prefetched automatically when it enters the viewport
<Link href="/projects">Projects</Link>

// Opt out for rarely-visited pages on link-heavy screens
<Link href="/privacy-policy" prefetch={false}>Privacy Policy</Link>`}</code></pre>
              <p>
                Two things to keep in mind:
              </p>
              <ul>
                <li>
                  <strong>It only works in production.</strong> If you&apos;re
                  testing navigation speed with <code>npm run dev</code>,
                  you&apos;re not seeing prefetching at all. Always judge it
                  on a production build.
                </li>
                <li>
                  <strong>It isn&apos;t free.</strong> Next.js throttles and
                  deduplicates prefetches, but a page with many links can
                  still generate substantial prefetch traffic. On dashboards
                  or long listing pages, add <code>prefetch={`{false}`}</code>{" "}
                  to links users rarely follow and let the high-traffic ones
                  keep the default.
                </li>
              </ul>
              <p>
                For data rather than routes, the same idea applies one level
                up: libraries like SWR and React Query can prefetch a
                query on hover or viewport entry, so the next screen renders
                with data already in the cache instead of a loading spinner.
              </p>
            </section>

            <section>
              <h2>Ship Less JavaScript in the First Place</h2>
              <p>
                Resource hints schedule the work; code splitting removes it.
                On most React apps I audit, the biggest improvement comes from
                removing a component or library that shouldn&apos;t be
                in the initial bundle at all.
              </p>
              <p>
                <code>next/dynamic</code> (Next.js&apos;s wrapper around{" "}
                <code>React.lazy</code>) splits a component into its own chunk
                that loads on demand:
              </p>
              <pre className="blog-article__code"><code>{`import dynamic from "next/dynamic";

// The chart library (~200 KB) is split into a separate chunk
// and downloaded only when this component is needed
const SalesChart = dynamic(() => import("../components/SalesChart"));

// Client-only widgets can skip server rendering entirely
const ChatWidget = dynamic(() => import("../components/ChatWidget"), {
  ssr: false,
});`}</code></pre>
              <p>
                One caveat on <code>ssr: false</code>: reach for it only when
                the component depends on browser-only APIs or server
                rendering adds little value, like a chat widget. Disabling
                SSR on large chunks of a page removes them from the
                server-rendered HTML, which hurts both SEO and LCP.
              </p>
              <p>
                The best candidates are easy to spot: modals and drawers that
                open on click, charting and map libraries, rich-text editors,
                anything below the fold, and anything rendered conditionally.
                None of that belongs in the bundle that gates first paint.
              </p>
              <p>
                And if you&apos;re on the App Router, the biggest
                bundle-size lever sits one level higher: keep components as
                Server Components wherever possible and add{" "}
                <code>&quot;use client&quot;</code> only where interactivity
                is actually required. Every component that stays on the
                server is JavaScript the browser never has to download, which
                often saves more kilobytes than any preload or prefetch tweak.
              </p>
              <p>
                To find what&apos;s actually heavy, run{" "}
                <strong><code>@next/bundle-analyzer</code></strong> once and
                look at the treemap. Almost every project has a surprise in
                there: a date library imported whole for one formatting call,
                an icon pack shipping a thousand unused icons, lodash imported
                without tree shaking. Fixing two or three of those routinely
                cuts more kilobytes than every resource hint combined.
              </p>
              <p>
                And on the React side, remember that the cheapest render is the
                one that doesn&apos;t happen: keep component state local so
                typing in an input doesn&apos;t re-render the page, reach for{" "}
                <code>useMemo</code> when profiling shows a genuinely
                expensive computation being recomputed unnecessarily (not as
                a default; overusing it adds complexity for no gain), and
                virtualize long lists. These don&apos;t show up in Lighthouse
                directly, but they&apos;re what keeps INP under 200ms once
                real users start interacting.
              </p>
            </section>

            <section>
              <h2>A Realistic Order of Operations</h2>
              <p>
                If I&apos;m handed a slow Next.js app, this is the sequence,
                ordered by payoff per hour of work:
              </p>
              <ul>
                <li>
                  Run Lighthouse on a <strong>production build</strong> and
                  save the baseline.
                </li>
                <li>
                  Mark the LCP image for high-priority loading (using{" "}
                  <code>priority</code> in Next.js 15 or <code>preload</code>{" "}
                  in newer versions) and confirm every other image uses{" "}
                  <code>next/image</code> with proper <code>width</code>/
                  <code>height</code> (that&apos;s your CLS insurance).
                </li>
                <li>
                  Move every third-party <code>&lt;script&gt;</code> tag to{" "}
                  <code>next/script</code>: analytics and widgets get{" "}
                  <code>lazyOnload</code>.
                </li>
                <li>
                  Switch fonts to <code>next/font</code>; add{" "}
                  <code>preconnect</code> for any remaining third-party
                  origins.
                </li>
                <li>
                  Run the bundle analyzer, then <code>next/dynamic</code> the
                  heavy below-the-fold components and fix oversized imports.
                </li>
                <li>
                  Review prefetching: keep the defaults on main navigation,
                  opt out on link-heavy lists, and re-test.
                </li>
              </ul>
            </section>

            <section className="blog-article__faq">
              <h2>Frequently Asked Questions</h2>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  What is the difference between preload and prefetch?
                </summary>
                <p className="blog-article__faq-answer">
                  Preload fetches a resource the current page needs right now,
                  at high priority: a hero image, a critical font. Prefetch
                  fetches a resource the user will probably need soon, at low
                  priority during idle time, like the JavaScript for the next
                  page. Preload is for this page&apos;s critical path; prefetch
                  is for the next navigation.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  How do I defer third-party scripts in Next.js?
                </summary>
                <p className="blog-article__faq-answer">
                  Use the next/script component instead of a plain script tag.
                  The default strategy, afterInteractive, is the closest
                  Next.js equivalent to a deferred script: it loads without
                  blocking rendering and executes once the page becomes
                  interactive. For
                  analytics, chat widgets, and other non-critical scripts, use
                  strategy=&quot;lazyOnload&quot; so they load during idle time
                  and never compete with your content.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Does Next.js prefetch pages automatically?
                </summary>
                <p className="blog-article__faq-answer">
                  Yes. In production builds, Next.js automatically prefetches
                  links rendered with next/link as they enter the viewport, so
                  navigation feels nearly instant (the App Router prefetches
                  more selectively than the Pages Router). You can disable it
                  per-link with prefetch=&#123;false&#125;
                  for rarely-visited pages, which saves bandwidth on link-heavy
                  screens. Note that prefetching is off in development mode, so
                  always judge it on a production build.
                </p>
              </details>
            </section>

            <section>
              <h2>The Framework Does the Heavy Lifting — If You Let It</h2>
              <p>
                The pattern across everything above is that Next.js already
                contains the optimization machinery: automatic code splitting, link
                prefetching, image lazy loading, script scheduling, font
                preloading. Most slow Next.js apps aren&apos;t slow because the
                framework failed; they&apos;re slow because something bypassed
                it: a raw script tag, an unoptimized image, a 300 KB library
                in the shared bundle.
              </p>
              <p>
                The discipline is staying on the paved road: one preloaded
                hero, deferred
                everything-else, prefetched navigation, and a bundle you&apos;ve
                actually looked at. Do that, and green Core Web Vitals stop
                being a project and start being the default.
              </p>
            </section>

          </div>

          <footer className="blog-article__footer">
            <BlogCta />
            <Link href="/blog" className="blog-article__back blog-article__back--bottom">
              ← Back to Blog
            </Link>
          </footer>

          <RelatedPosts currentSlug="improve-nextjs-react-performance" />

        </div>
      </article>
      </div>
    </>
  );
}
