 import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import RelatedPosts from "../../components/RelatedPosts";
import BlogCta from "../../components/BlogCta";

const SITE_URL = "https://www.yanakrukovets.com";

const articleJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How I Use AI on WordPress Projects — Where It Helps and Where It Hallucinates",
  description:
    "A working developer's take on using AI tools on real WordPress client builds: the snippets and blocks it speeds up, the hooks and plugin APIs it invents, the AI-content SEO trap, and how to prompt it so the code actually runs.",
  datePublished: "2026-06-18",
  dateModified: "2026-06-18",
  image: `${SITE_URL}/images/blogs/AI-WP.png`,
  url: `${SITE_URL}/blog/how-i-use-ai-on-wordpress-projects`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/how-i-use-ai-on-wordpress-projects`,
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
      name: "Can AI build a WordPress site for you?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not end to end, and not well. AI is genuinely useful for the small, self-contained pieces of a WordPress build, like a functions.php snippet, a custom block, a WP_Query, a regex. It falls apart on the whole: it doesn't know your theme, your plugin stack, your data, or your client's actual goals, and it will confidently invent hooks and functions that don't exist. Treat it as a fast junior pair, not a contractor you hand the project to.",
      },
    },
    {
      "@type": "Question",
      name: "Why does AI hallucinate WordPress hooks and functions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WordPress has thousands of hooks, functions, and plugin APIs, and they follow such consistent naming patterns that a plausible-sounding name is easy to guess and hard to verify by eye. The model predicts a name that fits the pattern rather than one it has confirmed exists, so you get things like a filter that was deprecated three versions ago, or a function that belongs to a different plugin. Always check a hook or function against the official WordPress developer reference or the plugin's own docs before you ship it.",
      },
    },
    {
      "@type": "Question",
      name: "Is AI-generated content bad for WordPress SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Google doesn't penalize content for being AI-assisted; it penalizes content that's unhelpful, regardless of how it was made. The real risk is volume — publishing dozens of thin, generic AI pages that say nothing a person couldn't get faster elsewhere. AI is fine for a first draft or an outline, but a human still has to add the specifics, the experience, and the point. Thin pages also bury the ones that matter, which is its own SEO problem.",
      },
    },
    {
      "@type": "Question",
      name: "How do you prompt AI so the WordPress code actually works?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Give it the context it can't guess: the WordPress version, PHP version, the exact plugin and its version, the theme, and a snippet of the real data or markup you're working with. Ask for the specific hook or function and tell it to flag anything it isn't sure exists. Then read the code before you run it. A 20-line snippet you understand beats a 200-line one you paste on faith.",
      },
    },
    {
      "@type": "Question",
      name: "Can AI work directly with my WordPress site through MCP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, with the right setup. Run a local copy of the site with wp-env, LocalWP, or Docker, and connect your AI assistant to it through a custom MCP server that wraps WP-CLI or the REST API. The assistant can then check which hooks and post types actually exist, run real queries, and read your real data instead of guessing, which is the single best fix for hallucinated code. Keep it pointed at local or staging, never production, and keep any write access behind an explicit flag.",
      },
    },
    {
      "@type": "Question",
      name: "What should you check in AI-generated WordPress code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Two categories that matter more than invented hooks. Security: confirm that output is escaped (esc_html and the right variant for each context), input is sanitized (sanitize_text_field), forms verify a nonce (wp_verify_nonce), and privileged actions check current_user_can(). Performance: watch for N+1 queries like a fresh get_posts() or WP_Query inside a loop, and unbounded queries like WP_Query with posts_per_page set to -1 on large datasets. AI code often runs fine on test data and falls over on a real site.",
      },
    },
  ],
});

export default function HowIUseAiOnWordpressProjects() {
  return (
    <>
      <Head>
        <title>How I Use AI on WordPress Projects — Where It Helps and Where It Hallucinates | Yana Krukovets</title>
        <meta
          name="description"
          content="A working developer's take on using AI on real WordPress client builds: the snippets and blocks it speeds up, the hooks it invents, the AI-content SEO trap, and how to prompt it so the code runs."
        />
        <meta property="og:type" key="og:type" content="article" />
        <meta property="article:published_time" content="2026-06-18" />
        <meta property="article:modified_time" content="2026-06-18" />
        <meta property="article:author" content={SITE_URL} />
        <meta property="og:title" key="og:title" content="How I Use AI on WordPress Projects — Where It Helps and Where It Hallucinates | Yana Krukovets" />
        <meta
          property="og:description"
          key="og:description"
          content="The WordPress work AI genuinely speeds up, the hooks and plugin APIs it invents, and how to prompt it so the code actually runs — from real client builds."
        />
        <meta property="og:url" key="og:url" content={`${SITE_URL}/blog/how-i-use-ai-on-wordpress-projects`} />
        <meta property="og:image" key="og:image" content={`${SITE_URL}/images/blogs/AI-WP.png`} />
        <meta property="og:image:width" key="og:image:width" content="1342" />
        <meta property="og:image:height" key="og:image:height" content="701" />
        <meta property="og:image:alt" key="og:image:alt" content="Using AI tools on WordPress development projects" />
        <meta name="twitter:title" key="twitter:title" content="How I Use AI on WordPress Projects — Where It Helps and Where It Hallucinates | Yana Krukovets" />
        <meta name="twitter:description" key="twitter:description" content="The WordPress work AI genuinely speeds up, the hooks it invents, and how to prompt it so the code actually runs — from real client builds." />
        <meta name="twitter:image" key="twitter:image" content={`${SITE_URL}/images/blogs/AI-WP.png`} />
        <meta name="twitter:image:alt" key="twitter:image:alt" content="Using AI tools on WordPress development projects" />
        <meta property="twitter:url" key="twitter:url" content={`${SITE_URL}/blog/how-i-use-ai-on-wordpress-projects`} />
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
              <time dateTime="2026-06-18">June 18, 2026</time>
              <span aria-hidden="true">·</span>
              <span>11 min read</span>
            </div>
          </header>

          <div className="blog-article__banner">
            <Image
              src="/images/blogs/AI-WP.png"
              alt="Using AI tools on WordPress development projects"
              width={1342}
              height={701}
              className="blog-article__banner-img"
              priority
            />
          </div>
          <h1 id="blog-post-title" className="blog-article__title">
            How I Use AI on WordPress Projects — Where It Helps and Where It Hallucinates
          </h1>
          <p className="blog-article__intro">
            AI has become part of how I work on WordPress client sites.
            Not as a magic site builder, but as a fast pair for the small,
            fiddly parts. It has also wasted my time in ways that are worth
            knowing about before you trust it. Here&apos;s the honest split,
            from real builds.
          </p>

          <div className="blog-article__body">

            <section>
              <h2>The short version</h2>
              <p>
                AI is great at the parts of WordPress that are small, isolated,
                and well-documented: a <code>functions.php</code> snippet, a
                custom block, a <code>WP_Query</code>, a stubborn regex. By
                default it&apos;s also blind to <em>your</em> site, the theme,
                the plugin stack, the data, the client&apos;s actual goal, so it
                will confidently invent hooks and functions that have never
                existed.
              </p>
              <p>
                That blindness, though, is a choice, not a law. Give it the
                whole codebase and a local copy of the database and a lot of the
                gap closes: it can read your theme, see exactly which plugins
                and versions you run, and query real data instead of guessing.
                Hallucinations become much less frequent, because the model can
                verify its assumptions against the actual project. (That setup
                is the <a href="#local-mcp">local site plus a custom MCP
                server</a> I get into later.) That local DB copy still needs to
                be sanitized first, with customer emails, names, and order data
                stripped or anonymized, because &ldquo;local&rdquo; describes
                where the data lives, not whether it&apos;s safe to hand to a
                third-party tool.
              </p>
              <p>
                It doesn&apos;t close the whole gap, though. A database and a
                file tree don&apos;t explain custom business logic, third-party
                API credentials, cron behavior, or deployment-specific config.
                A <code>wp_get_environment_type()</code> branch or a{" "}
                <code>$crm-&gt;sync_customer()</code> call means something the
                AI can&apos;t infer from the data alone. And the real ceiling is
                still judgment: the client&apos;s actual goal, and which of
                several working approaches is the right one here.
              </p>
              <p>
                So I use it the way I&apos;d use a quick, sharp junior dev. Hand
                it the contained tasks, give it as much real context as I safely
                can, read everything it gives back, and keep the decisions that
                need judgment for myself.
              </p>
            </section>

            <section>
              <h2>Where it genuinely saves me time</h2>
              <p>
                These are the jobs I reach for it on without thinking twice,
                because they&apos;re self-contained and I can verify the output
                in seconds.
              </p>
              <ul>
                <li>
                  <strong>functions.php snippets.</strong> &ldquo;Add a body
                  class for logged-in users,&rdquo; &ldquo;dequeue this script
                  on the checkout page,&rdquo; &ldquo;register an image
                  size.&rdquo; These are the same five lines of boilerplate I
                  half-remember every time, and AI writes them faster than I
                  can look up the hook name.
                </li>
                <li>
                  <strong>Custom Gutenberg blocks.</strong> Scaffolding a block
                  (the <code>block.json</code>, the edit and save functions, the
                  attributes) is repetitive and easy to get slightly wrong. AI
                  gets me a working skeleton I can then shape, which is exactly
                  the kind of clean, block-first work I&apos;d rather be doing
                  than fighting a page builder.
                </li>
                <li>
                  <strong>WP_Query and the loop.</strong> Meta queries and
                  tax queries have a verbose array syntax that&apos;s easy to
                  fat-finger. Describing what I want in a sentence and getting
                  the argument array back is a real time save.
                </li>
                <li>
                  <strong>The annoying small stuff.</strong> Regex for a
                  redirect, an <code>.htaccess</code> rule, a one-off SQL query
                  to fix a column in the database, a shell command I use twice a
                  year. AI is good at the things I&apos;d otherwise spend ten
                  minutes searching for.
                </li>
                <li>
                  <strong>Reading unfamiliar code.</strong> Inheriting a
                  client&apos;s 4,000-line theme nobody documented? Pasting a
                  function in and asking &ldquo;what does this do and what calls
                  it&rdquo; is faster than tracing it by hand.
                </li>
              </ul>
            </section>

            <section>
              <h2>The more dangerous failure: missing security</h2>
              <p>
                A made-up hook fails loudly enough that you catch it. The more
                dangerous habit is the code that <em>runs perfectly</em> while
                leaving a security hole wide open. AI-generated WordPress code skips
                the safety rails constantly, because the unsafe version is
                shorter and the model is pattern-matching toward short. Four
                things I check on every snippet:
              </p>
              <ul>
                <li>
                  <strong>Escaping on output.</strong>{" "}
                  <code>echo $_GET[&apos;name&apos;]</code> should be{" "}
                  <code>echo esc_html( $_GET[&apos;name&apos;] )</code>. Any
                  value going into the page gets escaped for its context.
                </li>
                <li>
                  <strong>Sanitizing on input.</strong>{" "}
                  <code>update_option( &apos;title&apos;, $_POST[&apos;title&apos;] )</code>{" "}
                  should wrap the value in{" "}
                  <code>sanitize_text_field()</code> first.
                </li>
                <li>
                  <strong>Nonce checks.</strong> AI-generated admin forms
                  routinely forget <code>wp_verify_nonce()</code>, which is what
                  stops a request from being forged.
                </li>
                <li>
                  <strong>Capability checks.</strong> A privileged action with
                  no <code>current_user_can()</code> in front of it will happily
                  run for someone who shouldn&apos;t be able to trigger it.
                </li>
              </ul>
              <p>
                These omissions show up far more often than a fully invented
                hook, and they cost a lot more when they ship. If you read AI
                WordPress code for one thing, read it for this.
              </p>
            </section>

            <section>
              <h2>The other quiet one: code that works but doesn&apos;t scale</h2>
              <p>
                AI writes code that passes on your test data and falls over on
                the client&apos;s real database. The two patterns I see most:
              </p>
              <ul>
                <li>
                  <strong>N+1 queries.</strong> A query inside the loop, like a{" "}
                  <code>get_posts()</code> or a fresh <code>WP_Query</code> per
                  row, fires one database hit per iteration: fine for ten rows,
                  a problem at ten thousand. (Plain <code>get_post_meta()</code>{" "}
                  in a standard <code>WP_Query</code> loop is usually fine,
                  because the query primes the meta cache up front. The trap is
                  the extra query you add inside the loop.)
                </li>
                <li>
                  <strong>Unbounded queries.</strong>{" "}
                  <code>new WP_Query([ &apos;posts_per_page&apos; =&gt; -1 ])</code>{" "}
                  loads every matching row into memory. On a big dataset that
                  alone can take a page down.
                </li>
              </ul>
              <p>
                The code is correct; it just doesn&apos;t scale. A senior dev
                spots this on sight. AI usually won&apos;t, unless you ask it to
                think about the query count and the row count up front. So I do
                ask, every time the snippet touches the database in a loop.
              </p>
            </section>

            <section>
              <h2>The AI content trap</h2>
              <p>
                Clients ask about this constantly: can we just generate the blog
                with AI? Google doesn&apos;t penalize content for being
                AI-assisted. It penalizes content that&apos;s unhelpful, no
                matter who or what wrote it. The damage comes from{" "}
                <em>volume</em>: spinning up forty thin, interchangeable pages
                that say nothing a reader couldn&apos;t get faster somewhere
                else.
              </p>
              <p>
                A first draft or an outline from AI is fine. But a human still
                has to add the specifics, the real experience, and the point.
                Those are the things that actually earn a ranking. And thin
                pages do more damage than just not ranking: they bury the few
                pages that matter under a pile of filler. If you want the search
                side done properly, that&apos;s a separate job, and I wrote
                about it in{" "}
                <Link href="/blog/wordpress-seo-yoast">
                  SEO for WordPress with Yoast
                </Link>
                .
              </p>
            </section>

            <section>
              <h2>AI won&apos;t fix a bad foundation</h2>
              <p>
                The biggest misread I see is treating AI as a shortcut around
                doing the build properly. If a site is a tangle of page-builder
                shortcodes and twelve overlapping plugins, asking AI to &ldquo;make
                it faster&rdquo; gets you a band-aid instead of a fix, and
                often a snippet that conflicts with one of those plugins. The
                performance and structure problems were architectural before AI
                showed up, and they&apos;re still architectural after.
              </p>
              <p>
                AI makes good foundations faster to build. It does not rescue
                bad ones. That&apos;s a big part of{" "}
                <Link href="/blog/why-avoid-page-builders">
                  why I avoid page builders
                </Link>{" "}
                in the first place, and why the{" "}
                <Link href="/blog/improve-wordpress-performance">
                  real WordPress performance wins
                </Link>{" "}
                come from the stack you choose, not a plugin you bolt on at the
                end.
              </p>
            </section>

            <section id="local-mcp">
              <h2>Going further: a local site and a custom MCP server</h2>
              <p>
                Everything above is the AI working blind, guessing about a site
                it can&apos;t see. The next step is to let it see. Two pieces
                make that safe and surprisingly powerful.
              </p>
              <p>
                <strong>Run the project locally first.</strong> Before AI gets
                anywhere near a client&apos;s install, I spin up a local copy
                with{" "}
                <a
                  href="https://developer.wordpress.org/block-editor/getting-started/devenv/get-started-with-wp-env/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  wp-env
                </a>
                , LocalWP, or plain Docker. A local site is a throwaway
                sandbox: the AI can break it, I reset it, and production never
                feels a thing. This is non-negotiable for me. I don&apos;t point
                AI tooling at a live site.
              </p>
              <p>
                <strong>Wire it up with a custom MCP server.</strong>{" "}
                <abbr title="Model Context Protocol">MCP</abbr> is a standard
                way to hand an AI assistant a set of tools it can call. A small
                MCP server wrapping WP-CLI or the REST API on that local install
                changes the whole game: instead of guessing whether a hook
                exists, the assistant runs <code>wp eval</code> and{" "}
                <em>checks</em>. It can run <code>wp post-type list</code>,{" "}
                <code>wp plugin list</code>, and <code>wp option get</code> for
                real context. Instead of guessing{" "}
                <code>get_field(&apos;event_date&apos;)</code>, it inspects the
                ACF field groups and confirms the field is actually{" "}
                <code>event_start_date</code>. The hallucinated-hook problem
                from earlier shrinks fast once the model is grounded in your
                actual site instead of a statistical guess about WordPress in
                general.
              </p>
              <p>
                You can build that server in an afternoon: expose a few
                read-only commands first (run WP-CLI, query posts, describe a
                table), keep write access behind an explicit flag, and only ever
                point it at local or staging. Grounding plus a sandbox is the
                combination that turns AI from a confident guesser into a tool
                that&apos;s checking its work.
              </p>
              <p>
                And it runs the other direction too. You can build AI{" "}
                <em>into</em> WordPress as a custom plugin: a server-side call to
                an LLM API for things like draft alt text, content summaries, or
                an internal editorial assistant. Keep the API key in{" "}
                <code>wp-config.php</code>, never in the browser, watch the
                per-request cost, and cache what you can. A focused plugin like
                that is a world away from bolting a generic &ldquo;AI&rdquo;
                add-on onto a page builder and hoping.
              </p>
            </section>

            <section>
              <h2>How I actually prompt it</h2>
              <p>
                Most &ldquo;the AI gave me broken code&rdquo; moments come down
                to a prompt that left out everything the model couldn&apos;t
                guess. So I front-load the context:
              </p>
              <ul>
                <li>
                  <strong>Versions.</strong> WordPress version, PHP version, and
                  the exact plugin and <em>its</em> version. A hook that exists
                  in WooCommerce 9 may not in 7.
                </li>
                <li>
                  <strong>Real data.</strong> A snippet of the actual markup,
                  the real custom field name, the real post type, not a
                  placeholder. It writes against what you give it.
                </li>
                <li>
                  <strong>The constraint.</strong> &ldquo;In a child theme, not
                  the core files,&rdquo; &ldquo;without adding a plugin,&rdquo;
                  &ldquo;has to work on PHP 8.&rdquo;
                </li>
                <li>
                  <strong>A doubt check.</strong> I literally ask it to flag any
                  hook or function it isn&apos;t sure exists. It won&apos;t catch
                  all of them, but it catches some.
                </li>
              </ul>
              <p>
                And then I read it. A twenty-line snippet I understand is worth
                more than a two-hundred-line one I paste on faith — because when
                it breaks at 9pm before a launch, I&apos;m the one who has to
                know why.
              </p>
            </section>

            <section className="blog-article__faq">
              <h2>Frequently Asked Questions</h2>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Can AI build a WordPress site for you?
                </summary>
                <p className="blog-article__faq-answer">
                  Not end to end, and not well. AI is genuinely useful for the
                  small, self-contained pieces of a WordPress build, like a{" "}
                  <code>functions.php</code> snippet, a custom block, a{" "}
                  <code>WP_Query</code>, a regex. It falls apart on the whole:
                  it doesn&apos;t know your theme, your plugin stack, your data,
                  or your client&apos;s actual goals, and it will confidently
                  invent hooks and functions that don&apos;t exist. Treat it as
                  a fast junior pair, not a contractor you hand the project to.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Why does AI hallucinate WordPress hooks and functions?
                </summary>
                <p className="blog-article__faq-answer">
                  WordPress has thousands of hooks, functions, and plugin APIs,
                  and they follow such consistent naming patterns that a
                  plausible-sounding name is easy to guess and hard to verify by
                  eye. The model predicts a name that fits the pattern rather
                  than one it has confirmed exists, so you get things like a
                  filter that was deprecated three versions ago, or a function
                  that belongs to a different plugin. Always check a hook or
                  function against the official WordPress developer reference or
                  the plugin&apos;s own docs before you ship it.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Is AI-generated content bad for WordPress SEO?
                </summary>
                <p className="blog-article__faq-answer">
                  Google doesn&apos;t penalize content for being AI-assisted; it
                  penalizes content that&apos;s unhelpful, regardless of how it
                  was made. The real risk is volume — publishing dozens of thin,
                  generic AI pages that say nothing a person couldn&apos;t get
                  faster elsewhere. AI is fine for a first draft or an outline,
                  but a human still has to add the specifics, the experience,
                  and the point. Thin pages also bury the ones that matter,
                  which is its own SEO problem.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  How do you prompt AI so the WordPress code actually works?
                </summary>
                <p className="blog-article__faq-answer">
                  Give it the context it can&apos;t guess: the WordPress
                  version, PHP version, the exact plugin and its version, the
                  theme, and a snippet of the real data or markup you&apos;re
                  working with. Ask for the specific hook or function and tell
                  it to flag anything it isn&apos;t sure exists. Then read the
                  code before you run it. A 20-line snippet you understand
                  beats a 200-line one you paste on faith.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Can AI work directly with my WordPress site through MCP?
                </summary>
                <p className="blog-article__faq-answer">
                  Yes, with the right setup. Run a local copy of the site with{" "}
                  <code>wp-env</code>, LocalWP, or Docker, and connect your AI
                  assistant to it through a custom MCP server that wraps WP-CLI
                  or the REST API. The assistant can then check which hooks and
                  post types actually exist, run real queries, and read your
                  real data instead of guessing, which is the single best fix
                  for hallucinated code. Keep it pointed at local or staging,
                  never production, and keep any write access behind an explicit
                  flag.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  What should you check in AI-generated WordPress code?
                </summary>
                <p className="blog-article__faq-answer">
                  Two categories that matter more than invented hooks.{" "}
                  <strong>Security:</strong> confirm that output is escaped (
                  <code>esc_html</code> and the right variant for each context),
                  input is sanitized (<code>sanitize_text_field</code>), forms
                  verify a nonce (<code>wp_verify_nonce</code>), and privileged
                  actions check <code>current_user_can()</code>.{" "}
                  <strong>Performance:</strong> watch for N+1 queries like a
                  fresh <code>get_posts()</code> or <code>WP_Query</code> inside
                  a loop, and unbounded queries like <code>WP_Query</code> with{" "}
                  <code>posts_per_page</code> set to <code>-1</code> on large
                  datasets. AI code often runs fine on test data and falls over
                  on a real site.
                </p>
              </details>
            </section>

          </div>

          <footer className="blog-article__footer">
            <BlogCta />
            <Link href="/blog" className="blog-article__back blog-article__back--bottom">
              ← Back to Blog
            </Link>
          </footer>

          <RelatedPosts currentSlug="how-i-use-ai-on-wordpress-projects" />

        </div>
      </article>
      </div>
    </>
  );
}
