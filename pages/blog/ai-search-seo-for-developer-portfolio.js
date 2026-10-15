import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import RelatedPosts from "../../components/RelatedPosts";
import BlogCta from "../../components/BlogCta";

const SITE_URL = "https://www.yanakrukovets.com";

const articleJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "AI Search SEO for a Developer Portfolio: What ChatGPT and Perplexity Actually See",
  description:
    "I fetched my own portfolio the way AI crawlers do and found an empty heading, 24 nameless project cards, and a Person schema nothing pointed to. Here is what I fixed, what llms.txt can and can't do, and how I now measure visits from AI assistants.",
  datePublished: "2026-10-15",
  dateModified: "2026-10-15",
  image: `${SITE_URL}/images/blogs/ai-search.png`,
  url: `${SITE_URL}/blog/ai-search-seo-for-developer-portfolio`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/ai-search-seo-for-developer-portfolio`,
  },
  author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Yana Krukovets", url: SITE_URL },
  publisher: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Yana Krukovets", url: SITE_URL },
});

const faqJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do AI crawlers like GPTBot and ClaudeBot run JavaScript?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generally no. The crawlers behind ChatGPT, Claude, and Perplexity read the HTML your server sends and don't execute your scripts, so anything rendered only on the client is invisible to them. Google is the exception because it renders pages for its regular index, and AI Overviews draw on that index. The safe assumption is that if text isn't in the server-rendered HTML, an AI assistant can't quote it.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need an llms.txt file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It's optional. llms.txt is a proposed convention: a Markdown file at the root of your site that summarizes it for language models. Google has said it doesn't use it, and there's little public evidence that the other big assistants read it either. I added one because it's generated from data I already had and cost almost nothing to build, but I'd do every other fix in this post first.",
      },
    },
    {
      "@type": "Question",
      name: "Is AI search optimization different from regular SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mostly it's the same work with less tolerance for shortcuts. Google's AI features use its normal search index, and ChatGPT search relies heavily on Bing's. What changes is emphasis: content has to be in plain server-rendered text, facts about who you are need to be consistent everywhere, and answers should be stated directly enough to quote.",
      },
    },
    {
      "@type": "Question",
      name: "How can I tell if visitors come from ChatGPT or Perplexity?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Check two things on each landing page view: the referrer and the utm_source query parameter. Some assistants send a referrer such as perplexity.ai or claude.ai, while ChatGPT adds ?utm_source=chatgpt.com to the links it cites. Classify both into a channel per session and you can count AI assistant visits separately from search and social.",
      },
    },
  ],
});

export default function AiSearchSeoForDeveloperPortfolio() {
  return (
    <>
      <Head>
        <title>AI Search SEO for a Developer Portfolio: What ChatGPT and Perplexity Actually See | Yana Krukovets</title>
        <meta
          name="description"
          content="What AI crawlers see on a Next.js portfolio, and what I changed: server-rendered text, linked JSON-LD with one Person @id, llms.txt, RSS, and tracking visits from ChatGPT and Perplexity."
        />
        <meta property="og:type" key="og:type" content="article" />
        <meta property="article:published_time" content="2026-10-15" />
        <meta property="article:modified_time" content="2026-10-15" />
        <meta property="article:author" content={SITE_URL} />
        <meta property="og:title" key="og:title" content="AI Search SEO for a Developer Portfolio: What ChatGPT and Perplexity Actually See | Yana Krukovets" />
        <meta
          property="og:description"
          key="og:description"
          content="I fetched my portfolio the way AI crawlers do. An empty heading, 24 nameless project cards, and what I changed so assistants can read and cite the site."
        />
        <meta property="og:url" key="og:url" content={`${SITE_URL}/blog/ai-search-seo-for-developer-portfolio`} />
        <meta property="og:image" key="og:image" content={`${SITE_URL}/images/blogs/ai-search.png`} />
        <meta property="og:image:width" key="og:image:width" content="1280" />
        <meta property="og:image:height" key="og:image:height" content="640" />
        <meta property="og:image:alt" key="og:image:alt" content="A chat asking for a Next.js developer in Ottawa, answered with a citation to yanakrukovets.com" />
        <meta name="twitter:title" key="twitter:title" content="AI Search SEO for a Developer Portfolio: What ChatGPT and Perplexity Actually See | Yana Krukovets" />
        <meta name="twitter:description" key="twitter:description" content="What AI crawlers see on a Next.js portfolio, and the fixes: server-rendered text, linked JSON-LD, llms.txt, RSS, and AI referral tracking." />
        <meta name="twitter:image" key="twitter:image" content={`${SITE_URL}/images/blogs/ai-search.png`} />
        <meta name="twitter:image:alt" key="twitter:image:alt" content="A chat asking for a Next.js developer in Ottawa, answered with a citation to yanakrukovets.com" />
        <meta property="twitter:url" key="twitter:url" content={`${SITE_URL}/blog/ai-search-seo-for-developer-portfolio`} />
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
              <time dateTime="2026-10-15">October 15, 2026</time>
              <span aria-hidden="true">·</span>
              <span>7 min read</span>
            </div>
          </header>

          <div className="blog-article__banner">
            <Image
              src="/images/blogs/ai-search.png"
              alt="A chat asking for a Next.js developer in Ottawa, answered with a citation to yanakrukovets.com"
              width={1280}
              height={640}
              className="blog-article__banner-img"
              priority
            />
          </div>
          <h1 id="blog-post-title" className="blog-article__title">
            AI Search SEO for a Developer Portfolio: What ChatGPT and Perplexity Actually See
          </h1>
          <p className="blog-article__intro">
            More people now find developers by asking an assistant questions
            like &ldquo;who&apos;s a good Next.js developer in Ottawa?&rdquo;
            instead of typing keywords into Google. So I wanted to know what
            those assistants find when they read my site. I fetched it the way
            their crawlers do, and the answer was less flattering than I
            expected.
          </p>

          <div className="blog-article__body">

            <section>
              <h2>Who Reads Your Site Now</h2>
              <p>
                Each assistant has its own crawler. OpenAI runs{" "}
                <code>GPTBot</code> for training and <code>OAI-SearchBot</code>{" "}
                for ChatGPT search. Anthropic has <code>ClaudeBot</code>,
                Perplexity has <code>PerplexityBot</code>, and all of them
                also send separate user agents when a person asks the
                assistant to open a specific page.
              </p>
              <p>
                The detail that matters for a React developer: these crawlers
                read the HTML your server sends and don&apos;t run your
                JavaScript. Google renders pages for its normal index, and its
                AI Overviews pull from that index, so Google sees more. Everyone
                else sees what <code>curl</code> sees.
              </p>
              <p>
                The other thing worth knowing is that ChatGPT search leans on
                Bing&apos;s index. If your site is invisible in Bing, it&apos;s
                harder for ChatGPT to find, whatever your Google rankings look
                like.
              </p>
            </section>

            <section>
              <h2>The Audit: Fetching My Own Site as GPTBot</h2>
              <p>
                I ran the audit with Claude Code. The core of it is one
                request with a crawler user agent, then stripping the tags to
                see the plain text:
              </p>
              <pre className="blog-article__code"><code>{`curl -A "GPTBot/1.2" https://www.yanakrukovets.com/ -o home.html`}</code></pre>
              <p>
                The good news first. My portfolio uses the Next.js Pages
                Router, so pages are rendered on the server and the text is
                all there: about 600 words on the homepage and more than 2,000
                on a typical blog post. <code>robots.txt</code> allows every
                crawler, the sitemap lists every post, and canonical URLs were
                already correct from{" "}
                <Link href="/blog/seo-for-nextjs-portfolio">
                  my first round of Next.js SEO work
                </Link>
                .
              </p>
              <p>Then the problems.</p>

              <h3>A heading that said &ldquo;I am a |&rdquo;</h3>
              <p>
                My hero has a typewriter effect that cycles through roles:
                Frontend Developer, Full Stack Developer, and so on. The hook
                started with an empty string and typed the first word in after
                the page loaded. In the server HTML, the second-most important
                heading on my homepage read &ldquo;I am a |&rdquo;. The cursor
                was the only content.
              </p>
              <p>The fix was one line. Start on the full first word:</p>
              <pre className="blog-article__code"><code>{`// before
const [displayed, setDisplayed] = useState("");

// after: server-rendered HTML now contains a real role
const [displayed, setDisplayed] = useState(words?.[0] ?? "");`}</code></pre>
              <p>
                The animation looks the same to visitors. It pauses on the
                first word, deletes it, and carries on.
              </p>

              <h3>24 project cards with no names</h3>
              <p>
                This one was worse. My projects page has 6 personal projects
                and 18 client sites. Each card showed a screenshot, a
                &ldquo;Personal Project&rdquo; label, a year, and a tech
                list. The project&apos;s name only existed inside the
                screenshot. To a crawler, a card read like this:
              </p>
              <pre className="blog-article__code"><code>{`VIEW Personal Project 2026 An AI safety research project simulating
reward tampering in RL... Technologies: Python, Gymnasium...`}</code></pre>
              <p>
                No name anywhere. The client cards were thinner still: no
                description at all, and alt text like &ldquo;WordPress WordPress
                website&rdquo; and &ldquo;Canada website, developer&rdquo;,
                which described neither the image nor the project.
              </p>
              <p>
                An assistant asked &ldquo;what has she built?&rdquo; had
                nothing to answer with. So every project now has a{" "}
                <code>name</code> rendered as a real heading, a one-sentence
                description, and alt text that describes the screenshot. I
                also moved the project data out of the component into{" "}
                <code>lib/projects.js</code>, because three different things
                now read it: the cards, the structured data, and{" "}
                <code>llms.txt</code>.
              </p>
            </section>

            <section>
              <h2>One Person, One @id</h2>
              <p>
                I already had JSON-LD. The layout emitted a{" "}
                <code>Person</code> block with my name, job title, location
                and social links, and every blog post had a{" "}
                <code>BlogPosting</code> with an author. The trouble was that
                these were 19 separate people as far as a machine could tell.
                Each post declared its own anonymous Person who happened to
                share my name.
              </p>
              <p>
                Schema.org has a fix for that: give the entity a stable{" "}
                <code>@id</code> and point at it everywhere else. The layout now
                emits a small graph:
              </p>
              <pre className="blog-article__code"><code>{`{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.yanakrukovets.com/#person",
      "name": "Yana Krukovets",
      "jobTitle": ["Full Stack Developer", "Frontend Developer"],
      "sameAs": ["https://github.com/YanaKrukovets", "https://www.linkedin.com/in/..."]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.yanakrukovets.com/#website",
      "publisher": { "@id": "https://www.yanakrukovets.com/#person" }
    }
  ]
}`}</code></pre>
              <p>And every post&apos;s author points at the same node:</p>
              <pre className="blog-article__code"><code>{`author: { "@type": "Person", "@id": \`\${SITE_URL}/#person\`, name: "Yana Krukovets", url: SITE_URL },`}</code></pre>
              <p>
                On top of that, the homepage is marked as a{" "}
                <code>ProfilePage</code> with me as its main entity, the blog
                index lists every post as a <code>Blog</code>, and the projects
                page has an <code>ItemList</code> of every project. Personal
                projects name me as <code>creator</code>. Client sites name me
                as <code>contributor</code>, because I built them with a team
                and the schema shouldn&apos;t claim more than that.
              </p>
              <p>
                A caveat on expectations: structured data doesn&apos;t make an
                assistant cite you. It removes ambiguity. When the facts are
                explicit and linked, the model has less to guess about.
              </p>
            </section>

            <section>
              <h2>llms.txt and RSS</h2>
              <p>
                <code>llms.txt</code> is a proposed convention: a Markdown
                file at the root of a site that tells a language model what
                the site is and where the important pages are. Mine has a
                one-paragraph summary of who I am, then lists of pages,
                projects, and every blog post with its description.
              </p>
              <p>
                I want to be straight about this one. Google has said it
                doesn&apos;t use <code>llms.txt</code>, and I haven&apos;t seen
                good evidence that the other big assistants read it. I added it
                anyway because it cost almost nothing. Both it and a new RSS
                feed are generated on request from the same data files that
                drive the site, so I never have to update them by hand:
              </p>
              <pre className="blog-article__code"><code>{`// pages/llms.txt.js
export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(buildLlmsTxt()); // built from lib/blogPosts.js and lib/projects.js
  res.end();
  return { props: {} };
}`}</code></pre>
              <p>
                The RSS feed at <code>/rss.xml</code> has a clearer payoff. Feed
                readers and aggregators pick up new posts from it, and a{" "}
                <code>&lt;link rel=&quot;alternate&quot;&gt;</code> tag in the
                page head lets anything that understands feeds discover it.
              </p>
            </section>

            <section>
              <h2>Measuring Visits From AI Assistants</h2>
              <p>
                None of this matters if I can&apos;t see whether it works. My
                site already has its own cookieless analytics, stored in
                Supabase, so I added a traffic-source breakdown with a
                dedicated channel for AI assistants.
              </p>
              <p>
                There are two signals. Some assistants send a normal referrer,
                like <code>perplexity.ai</code> or <code>claude.ai</code>.
                Others strip the referrer but tag the links they cite: ChatGPT
                adds <code>?utm_source=chatgpt.com</code>. The tracker reads
                only that one parameter from the landing URL:
              </p>
              <pre className="blog-article__code"><code>{`function utmSource() {
  try {
    return new URLSearchParams(window.location.search).get("utm_source") || null;
  } catch {
    return null;
  }
}`}</code></pre>
              <p>
                On the server, a small classifier sorts each session into
                direct, search, AI, social, or referral, and names the
                assistant when it can. One ordering detail caught me:{" "}
                <code>gemini.google.com</code> matches Google too, so the AI
                check has to run before the search-engine check, or Gemini
                visits get counted as Google searches.
              </p>
              <p>
                The dashboard now has a Sources tab with sessions per channel
                and per assistant, and the numbers feed into the AI-written
                suggestions the dashboard already generates.
              </p>
            </section>

            <section>
              <h2>The Parts That Aren&apos;t Code</h2>
              <p>
                <strong>Bing Webmaster Tools.</strong> Since ChatGPT search
                draws on Bing, the site needs to be verified there with the
                sitemap submitted, the same routine as{" "}
                <Link href="/blog/google-search-console-guide">
                  Google Search Console
                </Link>
                . It&apos;s ten minutes of setup that a lot of developers skip
                because Bing feels irrelevant.
              </p>
              <p>
                <strong>Consistent facts everywhere.</strong> An assistant
                deciding whether my LinkedIn profile, my GitHub account, and
                this site describe the same person compares the facts. Same
                name, same title, same city, same stack: strong signal.
                &ldquo;Frontend developer in Toronto&rdquo; on one and
                &ldquo;full stack developer in Ottawa&rdquo; on another, and it
                has to pick one or hedge. Making the core facts match across all
                three is next on my list.
              </p>
              <p>
                <strong>Writing that can be quoted.</strong> Assistants lift
                direct answers. A question heading followed by a two-sentence
                answer gets used. A paragraph that warms up for four sentences
                before saying anything doesn&apos;t. That&apos;s also why every
                post here ends with an FAQ, marked up with{" "}
                <code>FAQPage</code> schema that matches the visible text word
                for word.
              </p>
            </section>

            <section>
              <h2>What I&apos;d Check First on Any Site</h2>
              <p>
                If you only have an hour, fetch your homepage and your most
                important page with <code>curl</code> and read the text. Look
                for headings that are empty, names that only exist in images,
                and content that loads after the page does. That one check found
                the two biggest problems on my site, and both fixes were small.
              </p>
              <p>
                It&apos;s too early for me to show results. The Sources tab
                will tell me over the next couple of months whether assistants
                start sending people here, and I&apos;ll know which of these
                changes earned their place.
              </p>
            </section>

            <section className="blog-article__faq">
              <h2>Frequently Asked Questions</h2>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Do AI crawlers like GPTBot and ClaudeBot run JavaScript?
                </summary>
                <p className="blog-article__faq-answer">
                  Generally no. The crawlers behind ChatGPT, Claude, and
                  Perplexity read the HTML your server sends and don&apos;t
                  execute your scripts, so anything rendered only on the
                  client is invisible to them. Google is the exception because
                  it renders pages for its regular index, and AI Overviews draw
                  on that index. The safe assumption is that if text isn&apos;t
                  in the server-rendered HTML, an AI assistant can&apos;t quote
                  it.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Do I need an llms.txt file?
                </summary>
                <p className="blog-article__faq-answer">
                  It&apos;s optional. llms.txt is a proposed convention: a
                  Markdown file at the root of your site that summarizes it for
                  language models. Google has said it doesn&apos;t use it, and
                  there&apos;s little public evidence that the other big
                  assistants read it either. I added one because it&apos;s generated
                  from data I already had and cost almost nothing to build, but
                  I&apos;d do every other fix in this post first.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Is AI search optimization different from regular SEO?
                </summary>
                <p className="blog-article__faq-answer">
                  Mostly it&apos;s the same work with less tolerance for
                  shortcuts. Google&apos;s AI features use its normal search
                  index, and ChatGPT search relies heavily on Bing&apos;s. What
                  changes is emphasis: content has to be in plain
                  server-rendered text, facts about who you are need to be
                  consistent everywhere, and answers should be stated directly
                  enough to quote.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  How can I tell if visitors come from ChatGPT or Perplexity?
                </summary>
                <p className="blog-article__faq-answer">
                  Check two things on each landing page view: the referrer and
                  the <code>utm_source</code> query parameter. Some assistants
                  send a referrer such as perplexity.ai or claude.ai, while
                  ChatGPT adds <code>?utm_source=chatgpt.com</code> to the links
                  it cites. Classify both into a channel per session and you
                  can count AI assistant visits separately from search and
                  social.
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

          <RelatedPosts currentSlug="ai-search-seo-for-developer-portfolio" />

        </div>
      </article>
      </div>
    </>
  );
}
