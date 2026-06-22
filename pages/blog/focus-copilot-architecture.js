import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import RelatedPosts from "../../components/RelatedPosts";
import BlogCta from "../../components/BlogCta";

const SITE_URL = "https://www.yanakrukovets.com";

const articleJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Stack, Layer by Layer — What and Why Behind Focus Copilot",
  description:
    "A layer-by-layer walkthrough of Focus Copilot, an ADHD/focus assistant app: why server components, no TypeScript, JWT over database sessions, a free-tier Gemini model, and three deliberately separate AI agents.",
  datePublished: "2026-06-21",
  dateModified: "2026-06-21",
  image: `${SITE_URL}/images/blogs/focus-copilot.png`,
  url: `${SITE_URL}/blog/focus-copilot-architecture`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/focus-copilot-architecture`,
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
      name: "Why use JWT sessions instead of database sessions in a serverless app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because a database-session lookup means a Postgres round-trip on every request, and a serverless connection pool occasionally hands back a stale connection that hangs instead of failing fast. A JWT session validates a signed cookie in memory with zero database calls, so a flaky connection can never eat the whole function timeout just to confirm someone is logged in.",
      },
    },
    {
      "@type": "Question",
      name: "Why does Focus Copilot avoid TypeScript?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It's a deliberate constraint, not a shortcut. Every file starts with a // @ts-check comment, which tells the editor and tsc to type-check that file using JSDoc tags as real annotations. That catches the same class of bug TypeScript catches, without a compile step or a new file extension, though it only works as a real gate if tsc --noEmit is actually wired into CI.",
      },
    },
    {
      "@type": "Question",
      name: "Why run three separate AI agents instead of one general-purpose assistant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each agent has a different job and risk profile. The planner turns an intention into a plan with no tools at all. The session agent gets tools but a tight step cap. The calm agent stays stateless on purpose, with no database access and nothing to misuse. Splitting them keeps each one's failure modes small and its cost tracked separately.",
      },
    },
    {
      "@type": "Question",
      name: "What happens when you build on a free-tier LLM API?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The constraints show up directly in the code. Gemini's free tier throttles hard, so the session agent caps its tool-calling loop at 3 steps and aborts after 20 seconds rather than risk a serverless timeout. It also means a single-provider outage takes every AI feature down at once, since nothing currently routes to a fallback model.",
      },
    },
    {
      "@type": "Question",
      name: "How does Focus Copilot authorize access to a user's own data without middleware or row-level security?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every database query filters on the user's ID directly in the WHERE clause, inside one file that owns all SQL. No route or component touches the database client directly. That per-query filter is the actual authorization model, which is simple and visible but only works if every query remembers to include it.",
      },
    },
  ],
});

export default function FocusCopilotArchitecture() {
  return (
    <>
      <Head>
        <title>Stack, Layer by Layer — What and Why Behind Focus Copilot | Yana Krukovets</title>
        <meta
          name="description"
          content="A layer-by-layer walkthrough of Focus Copilot's stack: Next.js 16 server components, no TypeScript, free-tier Gemini via Vercel AI SDK, Drizzle and Postgres, JWT over database sessions, and three deliberately separate AI agents."
        />
        <meta property="og:type" key="og:type" content="article" />
        <meta property="article:published_time" content="2026-06-21" />
        <meta property="article:modified_time" content="2026-06-21" />
        <meta property="article:author" content={SITE_URL} />
        <meta property="og:title" key="og:title" content="Stack, Layer by Layer — What and Why Behind Focus Copilot | Yana Krukovets" />
        <meta
          property="og:description"
          key="og:description"
          content="Why Focus Copilot is built the way it is: server components by default, JavaScript with JSDoc instead of TypeScript, a free-tier Gemini model with hard timeouts, and JWT sessions over database sessions."
        />
        <meta property="og:url" key="og:url" content={`${SITE_URL}/blog/focus-copilot-architecture`} />
        <meta property="og:image" key="og:image" content={`${SITE_URL}/images/blogs/focus-copilot.png`} />
        <meta property="og:image:width" key="og:image:width" content="1400" />
        <meta property="og:image:height" key="og:image:height" content="639" />
        <meta property="og:image:alt" key="og:image:alt" content="Focus Copilot — an ADHD focus assistant app" />
        <meta name="twitter:title" key="twitter:title" content="Stack, Layer by Layer — What and Why Behind Focus Copilot | Yana Krukovets" />
        <meta name="twitter:description" key="twitter:description" content="Why Focus Copilot is built the way it is: server components by default, JavaScript with JSDoc instead of TypeScript, a free-tier Gemini model with hard timeouts, and JWT sessions over database sessions." />
        <meta name="twitter:image" key="twitter:image" content={`${SITE_URL}/images/blogs/focus-copilot.png`} />
        <meta name="twitter:image:alt" key="twitter:image:alt" content="Focus Copilot — an ADHD focus assistant app" />
        <meta property="twitter:url" key="twitter:url" content={`${SITE_URL}/blog/focus-copilot-architecture`} />
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
              <span className="blog-article__category">Architecture</span>
              <span aria-hidden="true">·</span>
              <time dateTime="2026-06-21">June 21, 2026</time>
              <span aria-hidden="true">·</span>
              <span>9 min read</span>
            </div>
          </header>

          <div className="blog-article__banner">
            <Image
              src="/images/blogs/focus-copilot.png"
              alt="Focus Copilot — an ADHD focus assistant app"
              width={1400}
              height={639}
              className="blog-article__banner-img"
              priority
            />
          </div>
          <h1 id="blog-post-title" className="blog-article__title">
            Stack, Layer by Layer — What and Why Behind Focus Copilot
          </h1>
          <p className="blog-article__intro">
            <a href="https://adhd-eight-umber.vercel.app/" target="_blank" rel="noopener noreferrer">
              Focus Copilot
            </a>{" "}
            (
            <a href="https://github.com/YanaKrukovets/adhd" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            ) is an ADHD and focus assistant: it turns a vague intention into
            a plan, stays with you while you work, and talks you down when
            anxiety gets in the way. I built it as a learning project to get
            hands-on with a stack I hadn&apos;t combined before, not as a
            commercial product. The interesting part isn&apos;t the app
            itself, it&apos;s everywhere a choice in the stack left a
            visible scar in the code: a timeout, a step cap, a comment
            explaining why something slower is actually safer.
          </p>

          <div className="blog-article__body">

            <section>
              <h2>Next.js 16: Where the Server Boundary Actually Lives</h2>
              <p>
                Server components are the default; <code>&apos;use client&apos;</code>{" "}
                only shows up for real interactivity, like the chat
                interface or a countdown timer. The actual security
                boundary isn&apos;t React itself. It&apos;s that the
                model-provider API key and the Postgres connection string
                live in code that only ever runs on the server and never
                gets bundled for the browser. <code>middleware.js</code>{" "}
                protects everything under <code>/app/*</code>, but cheaply
                rather than thoroughly, a tradeoff covered more in the auth
                section below.
              </p>
            </section>

            <section>
              <h2>JavaScript With @ts-check Instead of TypeScript</h2>
              <p>
                Every file opens with <code>{"// @ts-check"}</code>, a line
                that VS Code and <code>tsc</code> both recognize as a
                directive: it infers types from the JS itself, reads JSDoc
                tags like <code>@param</code> and <code>@returns</code> as
                real annotations, and flags mismatches in the editor and in
                CI. The payoff is concrete. The task schema names a field{" "}
                <code>estimateMinutes</code>; write{" "}
                <code>task.estimatedMinutes</code> anywhere by mistake and
                plain JavaScript stays silent about it until something reads{" "}
                <code>undefined</code> at runtime. With{" "}
                <code>@ts-check</code> on, the editor underlines the typo
                immediately.
              </p>
              <p>
                The gap: nothing in <code>package.json</code> runs{" "}
                <code>tsc --noEmit</code>, so unless that command is wired
                into CI, the protection only exists in the editor and is
                easy to skip with a quick terminal edit. The broader
                tradeoff is real too: JSDoc gets verbose fast for generics
                and unions. Between Zod at runtime, Drizzle&apos;s inferred
                database types, and JSDoc for plain function signatures,
                that tradeoff covers what this project needs without
                committing to a TypeScript build.
              </p>
            </section>

            <section>
              <h2>Vercel AI SDK and a Free-Tier Gemini Model</h2>
              <p>
                All three agents go through the same pipe: the Vercel AI
                SDK&apos;s <code>ai</code> package with{" "}
                <code>@ai-sdk/google</code>, routed to{" "}
                <code>gemini-3.1-flash-lite</code>. The planner calls{" "}
                <code>generateObject</code> for a single structured plan;
                the session and calm agents call <code>streamText</code> for
                ongoing conversation.
              </p>
              <p>
                Gemini&apos;s free tier is genuinely free, which matters for
                a project with no revenue, but it throttles hard. In
                practice I hit limits after roughly twenty requests a day,
                and that quota forced the architecture: the session
                agent&apos;s three-step tool-loop cap and 20-second hard
                abort exist because Vercel kills a function at 25 seconds,
                and a throttled API makes a hang more likely. Failing fast
                on purpose beats timing out silently.
              </p>
              <p>
                Two gaps are worth naming. The telemetry pricing table
                currently records Gemini usage as $0, accurate today but
                wrong the moment paid usage is enabled. And because nothing
                routes between models or providers, a Gemini outage takes
                all three agents down at once: that&apos;s the real
                incident behind the blunt &ldquo;Couldn&apos;t reach the
                assistant&rdquo; message users have actually seen. A
                fallback as simple as switching providers after two
                consecutive 429s would close that gap, since the AI SDK
                already abstracts the provider. Every LLM response that
                needs to become structured data also gets checked against
                a Zod schema before it touches{" "}
                <Link href="/blog/drizzle-postgres-vs-supabase">
                  the database layer
                </Link>
                , since a model can hallucinate a field or return malformed
                JSON.
              </p>
            </section>

            <section>
              <h2>Drizzle ORM on Plain Postgres</h2>
              <p>
                The database is plain Postgres on Neon&apos;s serverless
                driver, with Drizzle as the schema and query layer. The
                schema lives in one file, checked into git and reviewed
                like any other change. Migrations are generated diffs you
                read before running them: adding a nullable column becomes
                a migration file in git rather than a dashboard click
                nobody reviews. I covered the full comparison with
                Supabase&apos;s client in{" "}
                <Link href="/blog/drizzle-postgres-vs-supabase">
                  a separate post
                </Link>
                , since it deserved more room than a paragraph here.
              </p>
            </section>

            <section>
              <h2>One File Owns Every Query</h2>
              <p>
                All SQL lives in a single <code>queries.js</code>; no route
                or component touches the database client directly. Every
                query that reads a user&apos;s row filters on that
                user&apos;s ID in the <code>WHERE</code> clause:
              </p>
              <div className="blog-article__code">
                <code>
                  {`and(eq(tasks.id, taskId), eq(tasks.userId, userId))`}
                </code>
              </div>
              <p>
                That filter is the actual authorization model. There is no
                middleware and no Postgres row-level security policy
                underneath it; a user sees a row because the query that
                fetched it was written to only return rows that belong to
                them. That&apos;s also its biggest weakness: nothing
                technical catches a future query that forgets the filter,
                which is exactly the kind of gap a regression test or a
                lint rule should close instead of relying on review
                discipline forever.
              </p>
              <p>
                Functions follow one shape: a JSDoc block on every export,
                a payload object for anything with more than two or three
                arguments, and return types pulled straight from
                Drizzle&apos;s inference instead of hand-written. The file
                is already around 20 functions across five tables, worth
                splitting by domain once it passes roughly 25 to 30, not
                before.
              </p>
            </section>

            <section>
              <h2>Auth.js v5 and JWT Sessions</h2>
              <p>
                Focus Copilot uses Auth.js v5, which has carried a beta
                label through most of its real-world use, with JWT sessions
                instead of database sessions. The reasoning: a
                database-session strategy means every <code>auth()</code>{" "}
                call does a Postgres round-trip, and on a serverless
                connection pool an occasional stale connection can hang
                rather than fail outright, burning the function&apos;s
                entire 25-second budget just to confirm someone is logged
                in. A JWT session validates a signed cookie in memory with
                zero database calls. <code>middleware.js</code> applies the
                same logic one layer up: Edge middleware can&apos;t open a
                Postgres connection at all, so it does a cheap
                cookie-presence check and defers real validation to the
                Node-runtime routes that can. The cost: revoking a session
                before its JWT expires takes extra plumbing, since
                there&apos;s no server-side session row to delete. Fine for
                a personal app, but it becomes a real ceiling the moment
                something like forcing a logout or banning a user
                mid-session is needed.
              </p>
            </section>

            <section>
              <h2>API Routes Repeat the Same Three Lines</h2>
              <p>
                Every route under <code>src/app/api/</code> opens with the
                same block: call <code>auth()</code>, return 401 if there is
                no session. There is no shared wrapper, so each route
                repeats it rather than risk someone forgetting it; a{" "}
                <code>requireAuth()</code> helper would remove that risk
                cheaply. Ownership beyond that point goes through the query
                layer above, not a second guard: a route passes{" "}
                <code>userId</code> down and <code>queries.js</code> does
                the filtering.
              </p>
              <p>
                Routes also pin their runtime explicitly whenever the
                default would be wrong:
              </p>
              <div className="blog-article__code">
                <code>
                  {`export const runtime = 'nodejs';
export const maxDuration = 30;
// Node needed for postgres-js; extra time for streaming`}
                </code>
              </div>
              <p>
                Both lines exist because the default silently breaks
                something: Edge can&apos;t run the <code>postgres-js</code>{" "}
                driver, and the default function duration is too short for
                a streaming response.
              </p>
            </section>

            <section>
              <h2>Testing and the One Scheduled Job</h2>
              <p>
                Vitest runs against plain Node, not jsdom, since most of
                what needs unit coverage is schema validation and agent
                logic, not DOM behavior. Playwright drives real Chromium
                against <code>npm run dev</code> for everything that needs
                an actual browser. There is exactly one cron job, firing at
                7am UTC and hitting <code>/api/cron/replan</code> to roll
                forward up to three tasks. Rather than stand up a worker
                process for something this small and infrequent, the daily
                replan is just an HTTP endpoint Vercel calls on a timer.
              </p>
            </section>

            <section>
              <h2>Three Agents, Deliberately Kept Apart</h2>
              <p>
                The most opinionated part of the system: there isn&apos;t
                one general-purpose assistant, there are three, each scoped
                to a job.
              </p>
              <ul>
                <li>
                  <strong>Planner</strong> turns an intention into a plan:
                  one call to <code>generateObject</code>, no tools,
                  schema-checked output.
                </li>
                <li>
                  <strong>Session</strong> runs during actual work:{" "}
                  <code>streamText</code> with six tools, capped at three
                  steps. It trusts the task ID it was bound to at session
                  start, not whatever ID the model claims, because the
                  model only ever sees a task&apos;s title, never its real
                  database ID.
                </li>
                <li>
                  <strong>Calm</strong> handles grounding and anxiety
                  conversation, deliberately stateless: no database access,
                  no tools, and its own <code>agentType: &apos;calm&apos;</code>{" "}
                  bucket in telemetry so a long anxious conversation never
                  skews the task-flow agents&apos; cost numbers.
                </li>
              </ul>
              <p>
                Splitting the system this way keeps failure domains small:
                the planner can only produce a bad plan, the session agent
                is boxed into six tools and three steps, and the calm agent
                can&apos;t touch the database at all.
              </p>
            </section>

            <section>
              <h2>Schemas Do Double Duty</h2>
              <p>
                Validation lives in one Zod schema file per domain, and
                each file exports both the schema and a typedef inferred
                from it:
              </p>
              <div className="blog-article__code">
                <code>
                  {`/** @typedef {z.infer<typeof UserMessageSchema>} UserMessage */`}
                </code>
              </div>
              <p>
                That single line is how a plain JS file gets a real,
                checked type without anyone hand-writing an interface that
                could drift from the schema it describes. The schemas
                shaping LLM tool inputs carry a second job: a bound like{" "}
                <code>.min(2).max(240)</code> on{" "}
                <code>estimate_minutes</code> isn&apos;t just rejecting bad
                input, it&apos;s keeping the model&apos;s own output sane.
                These files also explain product rules in their comments,
                not just syntax, the same habit covered next.
              </p>
            </section>

            <section>
              <h2>Comments Record Why, Never What</h2>
              <p>
                The most consistent habit in the codebase: comments never
                restate the code below them, they record a constraint or a
                failure mode that already happened once.
              </p>
              <div className="blog-article__code">
                <code>
                  {`// 'overdue' is intentionally absent — tasks roll forward silently
// convertToModelMessages is async in ai v6 — must be awaited, otherwise
// throws "messages.some is not a function"
// Trust the session-bound task ID, not the model's — any taskId
// it supplies is a guess`}
                </code>
              </div>
              <p>
                Each reads like a scar from a bug that already happened,
                not a note written out of habit. The rule isn&apos;t
                &ldquo;comment your code,&rdquo; it&apos;s closer to
                &ldquo;comment when something burns you, so it can&apos;t
                happen twice.&rdquo;
              </p>
            </section>

            <section>
              <h2>Prompts as Data, Skills as Enforced Process</h2>
              <p>
                System prompts live in their own files, loaded through a
                small <code>loadPrompt()</code> helper that hand-rolls a
                tiny templating syntax over plain string replacement in
                about 25 lines, no library involved. The point: a
                prompt-only change should never touch application code,
                and a 25-line helper is short enough to read in full before
                trusting it with an LLM call.
              </p>
              <p>
                A few of the project&apos;s hard rules also aren&apos;t
                left as prose to remember. Things like reviewing generated
                SQL for destructive operations, or checking user-facing
                copy against a no-shame-language rule, run as automated
                checks before a change ships. A rule like &ldquo;no overdue
                state&rdquo; stays true in practice because something
                checks for it, not because everyone remembers to, though
                the check is only as strong as the discipline to run it:
                nothing technical stops a direct edit that skips it.
              </p>
            </section>

            <section>
              <h2>The Pattern Underneath It All</h2>
              <p>
                Linting and formatting are unremarkable: plain ESLint, no
                custom overrides, Prettier for the rest. The one detail
                worth keeping is a note for whichever AI assistant touches
                the repo, warning that this Next.js version is newer than
                its training data, so check the installed docs before
                assuming an API still works the old way.
              </p>
              <p>
                Every non-obvious choice in this stack traces back to a
                specific constraint, a serverless timeout, a free-tier
                quota, a product ethic about not shaming someone for
                missing a task, rather than a rule followed for its own
                sake. A few of them, like single-provider dependence and an
                authorization model that depends on every query remembering
                to filter, are fine at this scale and would need real
                revisiting before this handled paying users or actual
                money.
              </p>
            </section>

            <section className="blog-article__faq">
              <h2>Frequently Asked Questions</h2>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Why use JWT sessions instead of database sessions in a serverless app?
                </summary>
                <p className="blog-article__faq-answer">
                  Because a database-session lookup means a Postgres
                  round-trip on every request, and a serverless connection
                  pool occasionally hands back a stale connection that
                  hangs instead of failing fast. A JWT session validates a
                  signed cookie in memory with zero database calls, so a
                  flaky connection can never eat the whole function
                  timeout just to confirm someone is logged in.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Why does Focus Copilot avoid TypeScript?
                </summary>
                <p className="blog-article__faq-answer">
                  It&apos;s a deliberate constraint, not a shortcut. Every
                  file starts with a <code>{"// @ts-check"}</code> comment,
                  which tells the editor and <code>tsc</code> to
                  type-check that file using JSDoc tags as real
                  annotations. That catches the same class of bug
                  TypeScript catches, without a compile step or a new file
                  extension, though it only works as a real gate if{" "}
                  <code>tsc --noEmit</code> is actually wired into CI.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Why run three separate AI agents instead of one general-purpose assistant?
                </summary>
                <p className="blog-article__faq-answer">
                  Each agent has a different job and risk profile. The
                  planner turns an intention into a plan with no tools at
                  all. The session agent gets tools but a tight step cap.
                  The calm agent stays stateless on purpose, with no
                  database access and nothing to misuse. Splitting them
                  keeps each one&apos;s failure modes small and its cost
                  tracked separately.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  What happens when you build on a free-tier LLM API?
                </summary>
                <p className="blog-article__faq-answer">
                  The constraints show up directly in the code.
                  Gemini&apos;s free tier throttles hard, so the session
                  agent caps its tool-calling loop at 3 steps and aborts
                  after 20 seconds rather than risk a serverless timeout. It
                  also means a single-provider outage takes every AI
                  feature down at once, since nothing currently routes to a
                  fallback model.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  How does Focus Copilot authorize access to a user&apos;s own data without middleware or row-level security?
                </summary>
                <p className="blog-article__faq-answer">
                  Every database query filters on the user&apos;s ID
                  directly in the <code>WHERE</code> clause, inside one
                  file that owns all SQL. No route or component touches the
                  database client directly. That per-query filter is the
                  actual authorization model, which is simple and visible
                  but only works if every query remembers to include it.
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

          <RelatedPosts currentSlug="focus-copilot-architecture" />

        </div>
      </article>
      </div>
    </>
  );
}
