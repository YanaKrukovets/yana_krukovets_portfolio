import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import RelatedPosts from "../../components/RelatedPosts";
import BlogCta from "../../components/BlogCta";

const SITE_URL = "https://www.yanakrukovets.com";
const SLUG = "how-to-add-ai-chatbot-to-website";
const TITLE = "How to Add an AI Chatbot to Your Website (and What I Learned Building My Own)";

const articleJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: TITLE,
  description:
    "Three ways to add an AI chatbot to a website, from a no-code widget to a custom build. With the code behind the Gemini chatbot on my own site: the system prompt, the server route that hides the API key, rate limiting, and how I keep it from inventing links.",
  datePublished: "2026-11-03",
  dateModified: "2026-11-03",
  image: `${SITE_URL}/images/blogs/ai-chatbot.png`,
  url: `${SITE_URL}/blog/${SLUG}`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/${SLUG}`,
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
      name: "How much does it cost to add an AI chatbot to a website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A hosted chatbot service usually charges a monthly subscription, often with a free plan for low traffic. A custom chatbot has two costs: the development time to build it once, and the per-message fee from the AI provider. On a small business site using a fast, cheap model like Gemini Flash, the per-message cost is small enough that the build is the main expense.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add an AI chatbot to my website without coding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Hosted chatbot services give you a script tag to paste into your site, and on WordPress there are plugins that do the same thing. You upload your content or point the service at your pages, and it answers from that. The trade-off is less control over how it looks, what it says, and where visitor messages are stored.",
      },
    },
    {
      "@type": "Question",
      name: "Will an AI chatbot make things up about my business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It can. Language models fill gaps with plausible guesses, and prices, opening hours, and links are where that hurts most. You reduce it by giving the bot the facts in its instructions, telling it to say it doesn't know when the answer isn't there, and forbidding it from producing any URL that isn't on a list you gave it.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to call the AI API directly from the browser?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Anything in browser JavaScript can be read by visitors, so an API key there can be copied and used on your bill. Put the key in a server-side environment variable and have the browser call your own endpoint, which then calls the AI provider. That endpoint is also where you add rate limits and input checks.",
      },
    },
  ],
});

export default function HowToAddAiChatbotToWebsite() {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Yana Krukovets`}</title>
        <meta
          name="description"
          content="How to add an AI chatbot to your website: no-code widgets, WordPress plugins, or a custom build. Real code from my Gemini chatbot, plus costs, security, and how to stop it inventing answers."
        />
        <meta property="og:type" key="og:type" content="article" />
        <meta property="article:published_time" content="2026-11-03" />
        <meta property="article:modified_time" content="2026-11-03" />
        <meta property="article:author" content={SITE_URL} />
        <meta property="og:title" key="og:title" content={`${TITLE} | Yana Krukovets`} />
        <meta
          property="og:description"
          key="og:description"
          content="Three ways to put an AI chatbot on a website, and the code behind the one on mine: system prompt, hidden API key, rate limits, and no invented links."
        />
        <meta property="og:url" key="og:url" content={`${SITE_URL}/blog/${SLUG}`} />
        <meta property="og:image" key="og:image" content={`${SITE_URL}/images/blogs/ai-chatbot.png`} />
        <meta property="og:image:width" key="og:image:width" content="1280" />
        <meta property="og:image:height" key="og:image:height" content="640" />
        <meta property="og:image:alt" key="og:image:alt" content="A website chat window where a visitor asks if the developer is available and the AI assistant answers with a link to the contact form" />
        <meta name="twitter:title" key="twitter:title" content={`${TITLE} | Yana Krukovets`} />
        <meta name="twitter:description" key="twitter:description" content="No-code widget, WordPress plugin, or custom build: how to add an AI chatbot to a website, with real code from mine." />
        <meta name="twitter:image" key="twitter:image" content={`${SITE_URL}/images/blogs/ai-chatbot.png`} />
        <meta name="twitter:image:alt" key="twitter:image:alt" content="A website chat window where a visitor asks if the developer is available and the AI assistant answers with a link to the contact form" />
        <meta property="twitter:url" key="twitter:url" content={`${SITE_URL}/blog/${SLUG}`} />
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
              <span className="blog-article__category">AI</span>
              <span aria-hidden="true">·</span>
              <time dateTime="2026-11-03">November 3, 2026</time>
              <span aria-hidden="true">·</span>
              <span>9 min read</span>
            </div>
          </header>

          <div className="blog-article__banner">
            <Image
              src="/images/blogs/ai-chatbot.png"
              alt="A website chat window where a visitor asks if the developer is available and the AI assistant answers with a link to the contact form"
              width={1280}
              height={640}
              className="blog-article__banner-img"
              priority
            />
          </div>
          <h1 id="blog-post-title" className="blog-article__title">
            {TITLE}
          </h1>
          <p className="blog-article__intro">
            There&apos;s a chat button in the corner of this site. Ask it what
            I&apos;ve built or whether I&apos;m free for a project and it
            answers in a couple of sentences, with links to the right page.
            It runs on Google&apos;s Gemini, and the whole thing is about 120
            lines of server code and one React component. Below are the ways to
            put a chatbot like that on your own website, which one I&apos;d
            pick for which kind of site, and the parts of my build that took
            longer than I expected.
          </p>

          <div className="blog-article__body">

            <section>
              <h2>First, Decide What the Chatbot Is For</h2>
              <p>
                A chatbot that can &ldquo;answer anything&rdquo; usually answers
                nothing well. Pick the job before you pick the tool. On my site
                the job is narrow: tell visitors about my skills, projects, and
                posts, then point anyone who wants to hire me at the contact
                form. A dental clinic&apos;s bot might answer insurance and
                hours questions and send people to booking. A store&apos;s bot
                might help someone find the right product size.
              </p>
              <p>
                Write down the five or ten questions your visitors actually ask.
                Your inbox and your contact form are the best sources. If those
                questions all have short, factual answers, a chatbot will do
                well. If they need someone to look at an account or a calendar,
                you&apos;re building something bigger, and the chatbot needs
                access to those systems.
              </p>
            </section>

            <section>
              <h2>Three Ways to Add an AI Chatbot</h2>

              <h3>1. A hosted chatbot service</h3>
              <p>
                Services like Intercom, Tidio, and Chatbase let you sign up,
                give the bot your website or a few documents to learn from, and
                paste a script tag into your site. You can have something live
                in an afternoon without writing code. You pay a monthly
                subscription, the widget looks like their widget, and your
                visitors&apos; conversations are stored on their servers.
              </p>
              <p>
                This is the right choice for a lot of small businesses. If you
                need a bot this week and don&apos;t care much about the design,
                start here.
              </p>

              <h3>2. A WordPress plugin</h3>
              <p>
                If your site runs on WordPress, chatbot plugins wrap the same
                idea in a settings screen. Some connect to a hosted service.
                Others ask for your own OpenAI or Gemini API key and call the
                model for you. Check two things before you install one: where it
                stores the key, and whether it loads a heavy script on every
                page. Chat widgets are third-party scripts, and third-party
                scripts are a common reason a WordPress site gets slow, which I
                wrote about in{" "}
                <Link href="/blog/improve-wordpress-performance">
                  my post on WordPress performance
                </Link>
                .
              </p>

              <h3>3. A custom build with an AI API</h3>
              <p>
                This is what I did. You write a small server endpoint that talks
                to an AI model, and a chat component that talks to your
                endpoint. It takes more work up front. In exchange you control
                the design, the instructions, which model you use, and what
                happens to the messages. You also pay the AI provider per
                message instead of paying a subscription, which on a small site
                works out cheap.
              </p>
              <p>
                The rest of this post is about that third option, using the
                code that runs on this site.
              </p>
            </section>

            <section>
              <h2>How My Chatbot Is Built</h2>
              <p>
                The site is Next.js. The pieces are:
              </p>
              <ul>
                <li>
                  <code>components/ChatWidget.js</code>, the floating button and
                  chat panel
                </li>
                <li>
                  <code>pages/api/chat.js</code>, a server route that receives a
                  message and the conversation so far, then asks Gemini for a
                  reply
                </li>
                <li>
                  the <code>@google/generative-ai</code> package and a{" "}
                  <code>GEMINI_API_KEY</code> environment variable on Vercel
                </li>
              </ul>
              <p>
                I picked Gemini 2.5 Flash because it&apos;s fast and cheap, and
                a portfolio assistant doesn&apos;t need a big reasoning model to
                say which projects use React. I made the same call for{" "}
                <Link href="/blog/focus-copilot-architecture">
                  Focus Copilot
                </Link>
                , for the same reasons.
              </p>
            </section>

            <section>
              <h2>Keep the API Key on the Server</h2>
              <p>
                This is the one rule you can&apos;t skip. If the browser calls
                the AI provider directly, the API key has to be in your
                JavaScript, and anyone can open dev tools and copy it. Then
                they&apos;re running their own app on your bill.
              </p>
              <p>
                So the browser only ever talks to my endpoint:
              </p>
              <pre className="blog-article__code"><code>{`const res = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: userText, history }),
});`}</code></pre>
              <p>
                And the endpoint is the only code that knows the key:
              </p>
              <pre className="blog-article__code"><code>{`const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: SYSTEM_CONTEXT,
});

const chat = model.startChat({ history: safeHistory });
const result = await chat.sendMessage(message);
res.status(200).json({ reply: result.response.text() });`}</code></pre>
              <p>
                If the key is missing, the route returns a 503 and the widget
                shows a friendly error. A missing key shouldn&apos;t take the
                whole site down with it.
              </p>
            </section>

            <section>
              <h2>The System Prompt Is Most of the Work</h2>
              <p>
                The model knows nothing about you. Everything it says about your
                business comes from the system prompt, the block of instructions
                sent with every conversation. Mine holds my bio, skills, work
                history, every project, every blog post, and my contact links,
                followed by rules about tone and length.
              </p>
              <p>
                The first version had the projects typed in by hand, and before
                long it was describing work I&apos;d replaced and skills
                I no longer listed. Now the prompt is built
                from the same data files the site itself renders, so a new blog
                post shows up in the chatbot&apos;s answers the moment it&apos;s
                deployed:
              </p>
              <pre className="blog-article__code"><code>{`import { BLOG_POSTS } from "../../lib/blogPosts";
import { projects } from "../../lib/projects";

const BLOG_SECTION = BLOG_POSTS.map(
  (post) => \`- "\${post.title}" — \${post.description} URL: \${SITE}/blog/\${post.slug}\`
).join("\\n");`}</code></pre>
              <p>
                If your content lives in a CMS, the same idea works: fetch the
                pages, services, or FAQ entries and build the prompt from them.
                For a large site with hundreds of pages you&apos;d search for
                the relevant ones per question instead of sending all of them,
                but a small business site fits in one prompt without trouble.
              </p>
            </section>

            <section>
              <h2>Stop It From Making Things Up</h2>
              <p>
                Ask a model for a link to a blog post it hasn&apos;t been shown
                and it will often write one anyway: right domain, sensible slug,
                404. When a model doesn&apos;t have a fact, it writes something
                shaped like one.
              </p>
              <p>
                These rules in my prompt handle most of it:
              </p>
              <pre className="blog-article__code"><code>{`If asked something you don't know about Yana, say you're not sure
and suggest contacting her directly.

Only share blog URLs exactly as listed above — never invent one.

Keep responses brief (2-4 sentences max).`}</code></pre>
              <p>
                The length limit helps more than you&apos;d think. A model asked
                for two sentences has less room to drift into things it
                doesn&apos;t know. For a business, the facts that matter most
                are prices, hours, and policies. Put them in the prompt word for
                word, and tell the bot to send people to a page or a person for
                anything else.
              </p>
            </section>

            <section>
              <h2>Protect the Endpoint</h2>
              <p>
                A public chat endpoint is a public door to a paid API. Mine
                checks a few things before it calls Gemini:
              </p>
              <ul>
                <li>
                  <strong>Rate limit.</strong> Ten requests per IP address per
                  minute, then a 429 error that the widget turns into
                  &ldquo;please wait a moment.&rdquo;
                </li>
                <li>
                  <strong>Message size.</strong> Messages over 2,000 characters
                  and conversations over 40 turns are rejected, so nobody can
                  paste a novel in and run up the bill.
                </li>
                <li>
                  <strong>History roles.</strong> The browser sends the
                  conversation history back on every message, and anything from
                  the browser can be edited. The server keeps only entries with
                  the role <code>user</code> or <code>model</code> and plain text,
                  so nobody can slip in a fake &ldquo;system&rdquo; message.
                </li>
              </ul>
              <p>
                One caveat about my rate limiter: it&apos;s an in-memory map,
                and on Vercel each serverless instance has its own memory, which
                resets on a cold start. It stops casual abuse and that&apos;s
                all. For a busier site I&apos;d move the counter into Redis or
                the database, and I&apos;d set a monthly spending cap in the AI
                provider&apos;s console either way.
              </p>
            </section>

            <section>
              <h2>The Chat Window Itself</h2>
              <p>
                A few small decisions made the widget easier to use:
              </p>
              <ul>
                <li>
                  Suggested questions on first open (&ldquo;What projects have
                  you built?&rdquo;, &ldquo;Are you available for hire?&rdquo;),
                  because a blank text box makes people freeze.
                </li>
                <li>
                  Links in replies become clickable. I split the text on URLs
                  and render real <code>&lt;a&gt;</code> tags instead of
                  injecting the model&apos;s output as HTML. Model output is
                  untrusted text, so it never goes through{" "}
                  <code>dangerouslySetInnerHTML</code>.
                </li>
                <li>
                  Enter sends and Shift+Enter adds a new line, the input gets
                  focus when the panel opens, and the panel scrolls to the
                  newest message.
                </li>
                <li>
                  Other parts of the page can open the chat. The &ldquo;Ask my
                  AI assistant&rdquo; card on the homepage just fires{" "}
                  <code>window.dispatchEvent(new Event(&quot;open-chat&quot;))</code>.
                </li>
              </ul>
            </section>

            <section>
              <h2>Privacy and Measuring Whether It Helps</h2>
              <p>
                Visitors type things into chat boxes that they wouldn&apos;t put
                in a form, including names, emails, and sometimes details about
                their health or money. Every message goes to the AI provider, so
                say so in your privacy policy, and don&apos;t store full
                conversations unless you have a reason to. I don&apos;t log
                message text at all.
              </p>
              <p>
                I do track one event: when someone opens the chat. It goes into
                the same first-party analytics I described in{" "}
                <Link href="/blog/ai-search-seo-for-developer-portfolio">
                  my AI search post
                </Link>
                , so I can see how many visitors open the assistant and whether
                those sessions end on the contact page. If almost nobody opens
                it, that tells you something too. Maybe the button is in the
                wrong place, or the site already answers the questions people
                have.
              </p>
            </section>

            <section>
              <h2>Which Option Should You Pick?</h2>
              <p>
                If you want a chatbot running by Friday and the default look is
                fine, use a hosted service. If you&apos;re on WordPress and want
                to stay inside the admin, try a plugin, and test your page speed
                before and after. If the chatbot is part of your brand, needs to
                follow strict rules about what it says, or has to connect to your
                own data, build it. The build is a few days of work for a
                developer, and after that you pay only for the messages.
              </p>
            </section>

            <section className="blog-article__faq">
              <h2>Frequently Asked Questions</h2>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  How much does it cost to add an AI chatbot to a website?
                </summary>
                <p className="blog-article__faq-answer">
                  A hosted chatbot service usually charges a monthly
                  subscription, often with a free plan for low traffic. A custom
                  chatbot has two costs: the development time to build it once,
                  and the per-message fee from the AI provider. On a small
                  business site using a fast, cheap model like Gemini Flash, the
                  per-message cost is small enough that the build is the main
                  expense.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Can I add an AI chatbot to my website without coding?
                </summary>
                <p className="blog-article__faq-answer">
                  Yes. Hosted chatbot services give you a script tag to paste
                  into your site, and on WordPress there are plugins that do the
                  same thing. You upload your content or point the service at
                  your pages, and it answers from that. The trade-off is less
                  control over how it looks, what it says, and where visitor
                  messages are stored.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Will an AI chatbot make things up about my business?
                </summary>
                <p className="blog-article__faq-answer">
                  It can. Language models fill gaps with plausible guesses, and
                  prices, opening hours, and links are where that hurts most. You
                  reduce it by giving the bot the facts in its instructions,
                  telling it to say it doesn&apos;t know when the answer
                  isn&apos;t there, and forbidding it from producing any URL that
                  isn&apos;t on a list you gave it.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Is it safe to call the AI API directly from the browser?
                </summary>
                <p className="blog-article__faq-answer">
                  No. Anything in browser JavaScript can be read by visitors, so
                  an API key there can be copied and used on your bill. Put the
                  key in a server-side environment variable and have the browser
                  call your own endpoint, which then calls the AI provider. That
                  endpoint is also where you add rate limits and input checks.
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

          <RelatedPosts currentSlug={SLUG} />
        </div>
      </article>
      </div>
    </>
  );
}
