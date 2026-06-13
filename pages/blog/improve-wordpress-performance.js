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
      name: "What is the best caching plugin for WordPress?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WP Rocket is the best all-in-one option for most sites — it handles page caching, CSS/JS optimization, lazy loading, and delayed JavaScript execution out of the box. If your host runs LiteSpeed server, LiteSpeed Cache is free and just as powerful. FlyingPress is a strong modern alternative focused specifically on Core Web Vitals.",
      },
    },
    {
      "@type": "Question",
      name: "Why does Google Tag Manager lower my PageSpeed score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Google Tag Manager is a container that loads other scripts — analytics, ads pixels, heatmaps, chat widgets. Each tag adds third-party JavaScript that blocks the browser's main thread, which directly hurts Total Blocking Time and Interaction to Next Paint. The GTM container itself is small, but a container with 15–20 accumulated tags can add over a second of main-thread blocking on mobile.",
      },
    },
    {
      "@type": "Question",
      name: "How do I optimize images on a WordPress site?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use an image optimization plugin like ShortPixel or Imagify — or Smush Pro if the site already runs on the WPMU DEV bundle — to compress images and convert them to WebP or AVIF automatically. Make sure images are lazy-loaded (WordPress does this natively), properly sized for their containers, and that your hero image is excluded from lazy loading so it doesn't hurt Largest Contentful Paint. At larger scales, image CDNs like Cloudinary, Bunny.net, or ImageKit can outperform plugin-based optimization, because resizing and format conversion happen on demand at the edge.",
      },
    },
  ],
});

const articleJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How to Improve WordPress Performance — Plugins That Work, and Why GTM Tanks Your Score",
  description:
    "A practical guide to speeding up a WordPress site: which caching and optimization plugins actually work, and why Google Tag Manager is quietly destroying your PageSpeed score.",
  datePublished: "2026-06-01",
  dateModified: "2026-06-01",
  image: `${SITE_URL}/images/blogs/performance.png`,
  url: `${SITE_URL}/blog/improve-wordpress-performance`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/improve-wordpress-performance`,
  },
  author: { "@type": "Person", name: "Yana Krukovets", url: SITE_URL },
  publisher: { "@type": "Person", name: "Yana Krukovets", url: SITE_URL },
});

export default function ImproveWordPressPerformance() {
  return (
    <>
      <Head>
        <title>How to Improve WordPress Performance — Plugins &amp; GTM | Yana Krukovets</title>
        <meta
          name="description"
          content="A practical guide to speeding up a WordPress site: which caching and optimization plugins actually work, and why Google Tag Manager is quietly destroying your PageSpeed score."
        />
        <meta property="og:type" key="og:type" content="article" />
        <meta property="article:published_time" content="2026-06-01" />
        <meta property="article:modified_time" content="2026-06-01" />
        <meta property="article:author" content={SITE_URL} />
        <meta property="og:title" key="og:title" content="How to Improve WordPress Performance — Plugins & GTM | Yana Krukovets" />
        <meta
          property="og:description"
          key="og:description"
          content="Which WordPress plugins actually make your site faster — and why Google Tag Manager is the biggest hidden score killer."
        />
        <meta property="og:url" key="og:url" content={`${SITE_URL}/blog/improve-wordpress-performance`} />
        <meta property="og:image" key="og:image" content={`${SITE_URL}/images/blogs/performance.png`} />
        <meta property="og:image:width" key="og:image:width" content="1259" />
        <meta property="og:image:height" key="og:image:height" content="675" />
        <meta property="og:image:alt" key="og:image:alt" content="WordPress performance optimization — speeding up Core Web Vitals" />
        <meta name="twitter:title" key="twitter:title" content="How to Improve WordPress Performance — Plugins & GTM | Yana Krukovets" />
        <meta name="twitter:description" key="twitter:description" content="Which WordPress plugins actually make your site faster — and why Google Tag Manager is the biggest hidden score killer." />
        <meta name="twitter:image" key="twitter:image" content={`${SITE_URL}/images/blogs/performance.png`} />
        <meta name="twitter:image:alt" key="twitter:image:alt" content="WordPress performance optimization — speeding up Core Web Vitals" />
        <meta property="twitter:url" key="twitter:url" content={`${SITE_URL}/blog/improve-wordpress-performance`} />
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
              <time dateTime="2026-06-01">June 1, 2026</time>
              <span aria-hidden="true">·</span>
              <span>7 min read</span>
            </div>
          </header>

          <div className="blog-article__banner">
            <Image
              src="/images/blogs/performance.png"
              alt="WordPress performance optimization — speeding up Core Web Vitals"
              width={760}
              height={408}
              className="blog-article__banner-img"
              priority
            />
          </div>
          <h1 id="blog-post-title" className="blog-article__title">
            How to Improve WordPress Performance — Plugins That Work, and Why GTM Tanks Your Score
          </h1>
          <p className="blog-article__intro">
            Every WordPress performance audit I&apos;ve done starts the same way:
            the client runs PageSpeed Insights, sees a red number, and assumes
            the fix is &ldquo;install a caching plugin.&rdquo; Sometimes that&apos;s
            true. But just as often the real culprit is something almost every
            business site has: Google Tag Manager, loading hundreds
            of kilobytes of third-party JavaScript on every single page.
            Here&apos;s how I approach WordPress performance: what to measure,
            which plugins actually help, and how to stop GTM from dragging
            your score down.
          </p>

          <div className="blog-article__body">

            <section>
              <h2>Measure Before You Optimize</h2>
              <p>
                Before installing anything, get a baseline. Run your site through{" "}
                <strong>PageSpeed Insights</strong> and look at two different
                things it shows you:
              </p>
              <ul>
                <li>
                  <strong>Field data (Core Web Vitals):</strong> what real
                  Chrome users experienced over the last 28 days. This is the
                  data Google uses when evaluating Core Web Vitals as part of
                  its ranking systems.
                </li>
                <li>
                  <strong>Lab data (Lighthouse score):</strong> a simulated
                  test on a throttled connection. Useful for diagnosis, but the
                  number itself is not a ranking factor.
                </li>
              </ul>
              <p>
                The three metrics that matter most: <strong>LCP</strong>{" "}
                (Largest Contentful Paint, how fast your main content appears;
                target under 2.5s), <strong>INP</strong> (Interaction to Next
                Paint, how fast the page responds to clicks; target under
                200ms), and <strong>CLS</strong> (Cumulative Layout Shift, how
                much the layout jumps around; target under 0.1).
              </p>
              <p>
                Then open the &ldquo;Reduce the impact of third-party
                code&rdquo; section in the report. On many WordPress business
                sites, Google Tag Manager is one of the largest third-party
                contributors.
              </p>
            </section>

            <section>
              <h2>The Plugins That Actually Make a Difference</h2>

              <h3>1. Caching &amp; Optimization: WP Rocket (or LiteSpeed Cache)</h3>
              <p>
                If you install only one performance plugin, make it{" "}
                <strong>WP Rocket</strong>. Out of the box it gives you page
                caching, and it helps configure browser caching and compression
                where the hosting environment supports it. With a few
                checkboxes you add:
              </p>
              <ul>
                <li>
                  <strong>Remove Unused CSS:</strong> generates a minimal
                  stylesheet per page. Frequently one of the largest Lighthouse
                  improvements on theme-heavy or{" "}
                  <Link href="/blog/why-avoid-page-builders">
                    page-builder sites
                  </Link>
                  .
                </li>
                <li>
                  <strong>Delay JavaScript Execution:</strong> postpones
                  non-critical scripts until the user interacts with the page.
                  This is the feature that neutralizes most third-party script
                  damage.
                </li>
                <li>
                  <strong>Lazy loading</strong> for images and iframes, with
                  exclusions for above-the-fold content.
                </li>
              </ul>
              <p>
                Two situations change the recommendation. If your host runs a
                LiteSpeed server (many budget and mid-range hosts do),{" "}
                <strong>LiteSpeed Cache</strong> is free and arguably more
                powerful, because it caches at the server level instead of in
                PHP. And if you want a modern WP Rocket alternative built
                specifically around Core Web Vitals, <strong>FlyingPress</strong>{" "}
                is excellent. What I&apos;d avoid: running W3 Total Cache,
                Autoptimize, and a host-provided cache simultaneously.
                Overlapping optimization plugins fight each other and break
                sites more often than they speed them up. Pick one stack.
              </p>
              <p>
                A word on <strong>Hummingbird</strong> (WPMU DEV), since it
                often comes pre-installed with agency hosting: the free version
                covers page caching and minification but lacks the two features
                that produce the biggest gains on modern audits.{" "}
                <strong>Hummingbird Pro</strong> does add both (Delay
                JavaScript Execution and automatic Critical CSS generation), so
                if a client already pays for the WPMU DEV bundle, it&apos;s a
                capable choice. Just never run it alongside WP Rocket or
                LiteSpeed Cache. That&apos;s been the typical setup in my own
                work, too: most of the client projects I&apos;ve worked on
                came with Hummingbird Pro already installed as part of the
                WPMU DEV bundle, so the job was usually configuring it
                properly rather than replacing it.
              </p>

              <h3>2. Image Optimization: ShortPixel or Imagify</h3>
              <p>
                Oversized images are the most common cause of bad LCP.{" "}
                <strong>ShortPixel</strong> or <strong>Imagify</strong> will
                compress your media library and serve <strong>WebP/AVIF</strong>{" "}
                versions automatically, often a dramatic size reduction,
                sometimes 50% or more, depending on the image type and how well
                the originals were optimized. Whichever you choose, also make sure
                your hero image is <em>excluded</em> from lazy loading and, ideally,
                preloaded. Lazy-loading the LCP image is one of the most common
                self-inflicted wounds I see.
              </p>
              <p>
                <strong>Smush</strong> (and Smush Pro) is the popular
                alternative here, and it&apos;s serviceable, but the free
                version only does lossless compression, which saves far less
                than ShortPixel&apos;s or Imagify&apos;s smart lossy modes, and
                WebP conversion sits behind the Pro subscription. If a client
                already pays for the WPMU DEV bundle, Smush Pro does the job;
                I wouldn&apos;t buy it standalone. As with Hummingbird, that
                was the usual setup on the client projects I&apos;ve worked
                on: Smush Pro came preinstalled with the WPMU DEV bundle, so
                it was a matter of configuring it well rather than replacing
                it.
              </p>

              <h3>3. Bloat Removal: Perfmatters or Asset CleanUp</h3>
              <p>
                WordPress plugins love loading their scripts everywhere. Your
                contact form plugin loads CSS and JS on every page. Your slider
                plugin loads on pages with no slider. <strong>Perfmatters</strong>{" "}
                 or <strong>Asset CleanUp</strong> let you disable
                scripts per page, so the form plugin only loads on the contact
                page, and WooCommerce assets only load on shop pages. Perfmatters
                also disables WordPress&apos;s own baggage: emoji scripts,
                embeds, dashicons for logged-out users, and an overly chatty
                Heartbeat API.
              </p>
              <p>
                While you&apos;re in there, audit your fonts. Loading three font
                families with six weights each can easily add more
                render-blocking requests than the rest of your theme combined,
                and on many modern audits fonts hurt LCP almost as much as
                images. Self-hosting only the weights you actually use
                (Perfmatters can host Google Fonts locally for you) often
                improves LCP more than another optimization plugin would.
              </p>

              <h3>4. Database Cleanup: WP-Optimize</h3>
              <p>
                Years of post revisions, expired transients, and accumulated
                junk data can gradually increase database overhead and slow
                some queries. <strong>WP-Optimize</strong> on a weekly schedule
                keeps the database lean. Not a dramatic Lighthouse improvement, but it
                keeps the time-to-first-byte from creeping up as the site ages.
              </p>


              <p>
                One caveat before moving on: no optimization plugin can fully
                compensate for slow hosting, an overloaded database, or poorly
                written custom code. Performance starts with infrastructure:
                that entire stack on cheap, oversold shared hosting can still
                be slower than an unoptimized site on a fast VPS or managed
                WordPress host. If your TTFB stays high after page caching is
                enabled, investigate hosting, database performance, and custom
                code before adding more optimization plugins.
              </p>
            </section>

            <section>
              <h2>Why Google Tag Manager Lowers Your Score</h2>
              <p>
                Here&apos;s the part that surprises clients: you can do
                everything above perfectly and still score in the 60s, because
                of the marketing stack.
              </p>
              <p>
                Google Tag Manager itself is a small script. The problem is what
                it does: it&apos;s a <em>container</em> that loads other
                scripts: Google Analytics, ads pixels, Facebook/Meta pixel,
                Hotjar, LinkedIn Insight, chat widgets. Every tag someone has
                ever added through the GTM interface ships to every visitor,
                and marketing teams add tags far more often than they remove
                them. I&apos;ve audited sites whose GTM container had grown to
                20+ tags over five years, several of them tracking campaigns
                that ended years ago.
              </p>
              <p>
                The damage shows up in two specific metrics:
              </p>
              <ul>
                <li>
                  <strong>Total Blocking Time in Lighthouse, and poorer INP
                  for real users.</strong> Each tag executes
                  JavaScript on the browser&apos;s main thread, the same thread
                  that handles clicks and scrolling. A GTM container loaded with
                  analytics, pixels, heatmaps, chat widgets, and marketing
                  scripts can add over a second of main-thread blocking on a
                  mid-range phone, which Lighthouse punishes harshly.
                </li>
                <li>
                  <strong>Network contention during load.</strong> GTM fires
                  early, so its tags compete with your hero image and CSS for
                  bandwidth at exactly the moment LCP is being measured.
                </li>
              </ul>
              <p>
                What actually works:
              </p>
              <ul>
                <li>
                  <strong>Audit the container.</strong> Open GTM and delete every
                  tag tied to an ended campaign or a tool nobody logs into
                  anymore. This is free and often removes half the weight.
                </li>
                <li>
                  <strong>Delay it.</strong> WP Rocket&apos;s &ldquo;Delay
                  JavaScript Execution&rdquo; (or FlyingPress&apos;s equivalent)
                  holds GTM until the first user interaction (scroll, tap, or
                  mouse move). This often improves Lighthouse and real-user
                  responsiveness, because non-critical scripts are deferred
                  until after the initial interaction. The trade-off: delaying
                  GTM can reduce analytics fidelity, since visitors who leave
                  before interacting may never trigger tracking scripts.
                </li>
                <li>
                  <strong>Server-side tagging</strong> for bigger sites: GTM&apos;s
                  server container significantly reduces the amount of
                  third-party processing happening in the visitor&apos;s
                  browser (some client-side collection still remains). More
                  setup (it needs its own hosting), but for tag-heavy
                  organizations it&apos;s often the most sustainable long-term
                  solution.
                </li>
              </ul>

              <blockquote className="blog-article__callout">
                <p>
                  The root problem is always the same: third-party JavaScript
                  that loads before your content needs it. The strategy is
                  always the same too: remove what you can, delay what you
                  can&apos;t, and replace the heaviest offenders with lighter
                  equivalents.
                </p>
              </blockquote>
            </section>

            <section>
              <h2>A Realistic Order of Operations</h2>
              <p>
                If you&apos;re starting from a slow site, this is the sequence
                I&apos;d follow; each step builds on the previous one:
              </p>
              <ul>
                <li>Run PageSpeed Insights and save the baseline report.</li>
                <li>
                  Install one caching/optimization plugin (WP Rocket or
                  LiteSpeed Cache) and enable page caching, Remove Unused CSS,
                  and lazy loading.
                </li>
                <li>
                  Compress the media library and enable WebP with ShortPixel or
                  Imagify; preload the hero image.
                </li>
                <li>
                  Audit the GTM container, delete dead tags, then delay GTM
                  with the caching plugin&apos;s delayed-JS feature.
                </li>
                <li>
                  Use Perfmatters/Asset CleanUp to stop plugins from loading
                  where they aren&apos;t used.
                </li>
              </ul>
              <p>
                On many business sites, this sequence produces substantial
                improvements in Lighthouse and Core Web Vitals. More
                importantly, it improves the field metrics that actually affect
                rankings, not just the lab number.
              </p>
            </section>

            <section className="blog-article__faq">
              <h2>Frequently Asked Questions</h2>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  What is the best caching plugin for WordPress?
                </summary>
                <p className="blog-article__faq-answer">
                  WP Rocket is the best all-in-one option for most sites: it
                  handles page caching, CSS/JS optimization, lazy loading, and
                  delayed JavaScript execution out of the box. If your host runs
                  a LiteSpeed server, LiteSpeed Cache is free and just as
                  powerful. FlyingPress is a strong modern alternative focused
                  specifically on Core Web Vitals.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Why does Google Tag Manager lower my PageSpeed score?
                </summary>
                <p className="blog-article__faq-answer">
                  GTM is a container that loads other scripts: analytics, ad
                  pixels, heatmaps, chat widgets. Each tag adds third-party
                  JavaScript that blocks the browser&apos;s main thread, hurting
                  Total Blocking Time and INP. The container itself is small,
                  but one with 15–20 accumulated tags can add over a second of
                  main-thread blocking on mobile.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  How do I optimize images on a WordPress site?
                </summary>
                <p className="blog-article__faq-answer">
                  Use ShortPixel or Imagify (or Smush Pro if the site already
                  runs on the WPMU DEV bundle) to compress images and convert
                  them to WebP or AVIF automatically. Keep lazy loading on for
                  below-the-fold images, but exclude (and ideally preload) your
                  hero image so it doesn&apos;t hurt Largest Contentful Paint.
                  At larger scales, image CDNs like Cloudinary, Bunny.net, or
                  ImageKit can outperform plugin-based optimization, because
                  resizing and format conversion happen on demand at the edge.
                </p>
              </details>
            </section>

            <section>
              <h2>Performance Is Maintenance, Not a One-Time Fix</h2>
              <p>
                The plugins do the heavy lifting, but the score you earn today
                erodes as new tags get added to GTM, new plugins enqueue their
                scripts sitewide, and the media library fills with uncompressed
                uploads. Re-run PageSpeed Insights after every significant
                change to the site, and audit the GTM container twice a year.
              </p>
              <p>
                And keep the priorities straight: the goal is green field Core Web
                Vitals from real visitors, not a vanity 100 in Lighthouse. A site that loads its content in under two
                seconds, responds instantly to taps, and doesn&apos;t shift
                layout will rank better and convert better, whatever the lab
                number says.
              </p>
             
            </section>

          </div>

          <footer className="blog-article__footer">
            <BlogCta />
            <Link href="/blog" className="blog-article__back blog-article__back--bottom">
              ← Back to Blog
            </Link>
          </footer>

          <RelatedPosts currentSlug="improve-wordpress-performance" />

        </div>
      </article>
      </div>
    </>
  );
}
