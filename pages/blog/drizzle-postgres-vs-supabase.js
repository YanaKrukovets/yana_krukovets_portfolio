import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import RelatedPosts from "../../components/RelatedPosts";
import BlogCta from "../../components/BlogCta";

const SITE_URL = "https://www.yanakrukovets.com";

const articleJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Why We Use Drizzle on Top of Postgres Instead of Just Calling Supabase",
  description:
    "Why Focus Copilot uses Drizzle ORM with a plain Postgres database instead of Supabase's client — schema as code, explicit cascades, typed queries without TypeScript, and why both tools can still coexist.",
  datePublished: "2026-06-20",
  dateModified: "2026-06-20",
  image: `${SITE_URL}/images/blogs/drizzle.png`,
  url: `${SITE_URL}/blog/drizzle-postgres-vs-supabase`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/drizzle-postgres-vs-supabase`,
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
      name: "Is Drizzle a replacement for Supabase?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, they solve different problems. Supabase is a hosting and access-layer product — Postgres plus an auto-generated API, auth, and storage. Drizzle is a schema and query tool that talks to any Postgres database, including one hosted on Supabase. Plenty of teams run Drizzle against a Supabase connection string to get Supabase's hosting while keeping Drizzle's schema-as-code and typed queries.",
      },
    },
    {
      "@type": "Question",
      name: "Why not just use the Supabase JS client directly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Supabase client is built on PostgREST, which is great for simple CRUD from a browser but gets awkward for relational work — multi-table joins, conditional aggregates, or jsonb containment queries either need PostgREST's limited filter syntax or a hand-written Postgres function that moves logic out of code review and into the database.",
      },
    },
    {
      "@type": "Question",
      name: "Does Drizzle give you TypeScript-style type safety in a JavaScript project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Drizzle infers row types from the schema definition automatically, so a JavaScript project with JSDoc and @ts-check gets real autocomplete and type errors on column-name typos without anyone hand-writing an interface. Supabase's client returns untyped data unless you separately generate and maintain types, which drifts the moment someone edits a column outside that workflow.",
      },
    },
    {
      "@type": "Question",
      name: "When would Supabase still be the right choice over raw Drizzle and Postgres?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When you need realtime subscriptions pushed to multiple clients, bundled file storage, or a managed Postgres instance with an auto-generated API you can start using immediately without writing a query layer. Those are hosting and infrastructure features that Drizzle doesn't provide on its own.",
      },
    },
  ],
});

export default function DrizzlePostgresVsSupabase() {
  return (
    <>
      <Head>
        <title>Why We Use Drizzle on Top of Postgres Instead of Just Calling Supabase | Yana Krukovets</title>
        <meta
          name="description"
          content="Why Focus Copilot uses Drizzle ORM with plain Postgres instead of the Supabase client: schema as code, explicit cascades, typed queries without TypeScript, and where Supabase still wins."
        />
        <meta property="og:type" key="og:type" content="article" />
        <meta property="article:published_time" content="2026-06-20" />
        <meta property="article:modified_time" content="2026-06-20" />
        <meta property="article:author" content={SITE_URL} />
        <meta property="og:title" key="og:title" content="Why We Use Drizzle on Top of Postgres Instead of Just Calling Supabase | Yana Krukovets" />
        <meta
          property="og:description"
          key="og:description"
          content="Schema as code, explicit cascades, typed queries without TypeScript, and where Supabase still wins — why Focus Copilot runs Drizzle directly against Postgres."
        />
        <meta property="og:url" key="og:url" content={`${SITE_URL}/blog/drizzle-postgres-vs-supabase`} />
        <meta property="og:image" key="og:image" content={`${SITE_URL}/images/blogs/drizzle.png`} />
        <meta property="og:image:width" key="og:image:width" content="660" />
        <meta property="og:image:height" key="og:image:height" content="360" />
        <meta property="og:image:alt" key="og:image:alt" content="Drizzle ORM and Postgres architecture diagram" />
        <meta name="twitter:title" key="twitter:title" content="Why We Use Drizzle on Top of Postgres Instead of Just Calling Supabase | Yana Krukovets" />
        <meta name="twitter:description" key="twitter:description" content="Schema as code, explicit cascades, typed queries without TypeScript, and where Supabase still wins — why Focus Copilot runs Drizzle directly against Postgres." />
        <meta name="twitter:image" key="twitter:image" content={`${SITE_URL}/images/blogs/drizzle.png`} />
        <meta name="twitter:image:alt" key="twitter:image:alt" content="Drizzle ORM and Postgres architecture diagram" />
        <meta property="twitter:url" key="twitter:url" content={`${SITE_URL}/blog/drizzle-postgres-vs-supabase`} />
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
              <span className="blog-article__category">Backend</span>
              <span aria-hidden="true">·</span>
              <time dateTime="2026-06-20">June 20, 2026</time>
              <span aria-hidden="true">·</span>
              <span>9 min read</span>
            </div>
          </header>

          <div className="blog-article__banner">
            <Image
              src="/images/blogs/drizzle.png"
              alt="Drizzle ORM and Postgres architecture diagram"
              width={660}
              height={360}
              className="blog-article__banner-img"
              priority
            />
          </div>
          <h1 id="blog-post-title" className="blog-article__title">
            Why We Use Drizzle on Top of Postgres Instead of Just Calling Supabase
          </h1>
          <p className="blog-article__intro">
            When people see <code>Drizzle + Postgres</code> in the stack
            behind{" "}
            <a href="https://adhd-eight-umber.vercel.app/" target="_blank" rel="noopener noreferrer">
              Focus Copilot
            </a>
            , the question comes up fast. Supabase already gives you a
            Postgres database, an auto-generated REST API, row-level
            security, and a JS client, so why add an ORM and a migration
            tool on top of it?
          </p>

          <div className="blog-article__body">

            <section>
              <h2>Different Layers, Not Competing Tools</h2>
              <p>
                Supabase and Drizzle aren&apos;t really competing for the
                same job. Supabase is a hosting and access-layer product:
                Postgres plus an auto-generated API, auth, and storage,
                bundled together. Drizzle is a schema and query tool that
                happens to talk to Postgres, including one hosted on
                Supabase.
              </p>
              <p>
                You can use both together, with Drizzle talking directly to
                a Supabase Postgres instance over its connection string.
                That combination is close to the sweet spot for a lot of
                teams. But the question we actually get is narrower: raw
                Supabase client calls versus Drizzle queries. Here&apos;s
                what changed for us when we picked the latter.
              </p>
            </section>

            <section>
              <h2>The Schema Is the Source of Truth, Not a Side Effect of API Calls</h2>
              <p>
                In <code>src/lib/db/schema.js</code>, every table (
                <code>users</code>, <code>tasks</code>,{" "}
                <code>intentions</code>, <code>workSessions</code>,{" "}
                <code>sessionEvents</code>, <code>agentCalls</code>) is
                defined once, in code, with real types:
              </p>
              <div className="blog-article__code">
                <code>
                  {`export const tasks = pgTable('tasks', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  estimateMinutes: integer('estimate_minutes').notNull(),
  blockers: jsonb('blockers').default([]),
  state: text('state').notNull().default('pending'),
  // ...
});`}
                </code>
              </div>
              <p>
                That file gets reviewed in pull requests like any other
                code. When we change it, <code>drizzle-kit</code> diffs it
                against the database and generates a migration in{" "}
                <code>drizzle/</code>. We read that SQL before it runs,
                including a project rule that flags destructive operations
                before they ship.
              </p>
              <p>
                With Supabase&apos;s dashboard-first workflow, the schema
                lives in the hosted Postgres instance and the &ldquo;diff&rdquo;
                is whatever you remember to write down. Supabase&apos;s own
                CLI supports migrations too, so you can check schema files
                into git there as well, but the default experience nudges
                you toward clicking &ldquo;Add column&rdquo; in the studio
                UI. For a project where the schema is a contract between a
                planner agent, a session agent, and the UI, we wanted that
                contract versioned and reviewable, not implicit in a hosted
                dashboard.
              </p>
            </section>

            <section>
              <h2>Cascades and Constraints Are Explicit, Not Assumed</h2>
              <p>
                Every child table cascades on user deletion:
              </p>
              <div className="blog-article__code">
                <code>
                  {`userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' })`}
                </code>
              </div>
              <p>
                <code>sessionEvents</code> cascades off{" "}
                <code>workSessions</code> the same way &mdash; plain
                Postgres underneath, but writing it in Drizzle means the
                constraint sits right next to the column it protects, in the
                same file you&apos;re editing when you add a feature. You
                can&apos;t add <code>agentCalls.sessionId</code> without
                seeing, ten lines up, exactly how <code>workSessions</code>{" "}
                gets cleaned up. Supabase&apos;s table editor lets you set
                this too, but it&apos;s a UI action disconnected from the
                code that depends on it.
              </p>
            </section>

            <section>
              <h2>Queries Are Typed End to End Without Writing TypeScript</h2>
              <p>
                Focus Copilot is JavaScript-only, a deliberate constraint on
                the project, but every export still carries JSDoc and{" "}
                <code>@ts-check</code>. Drizzle infers row types from the
                schema automatically, so <code>queries.js</code> gets real
                autocomplete and a type error on a typo like{" "}
                <code>task.estimatedMinutes</code> (it&apos;s actually{" "}
                <code>estimateMinutes</code>) without anyone hand-writing a
                single interface.
              </p>
              <p>
                Supabase supports this too, through{" "}
                <code>supabase gen types</code>, and plenty of teams wire it
                into CI so types stay current automatically. The difference
                is where the types come from: Drizzle derives them directly
                from the schema file you&apos;re already editing, while
                Supabase generates them from a separate introspection step
                that has to be re-run after every schema change. Skip that
                step, or edit a column in the studio without regenerating,
                and <code>.from(&apos;tasks&apos;).select(&apos;*&apos;)</code>{" "}
                goes back to returning <code>any</code> until someone notices.
              </p>
            </section>

            <section>
              <h2>One Place for Database Access, in Plain JavaScript</h2>
              <p>
                The project rule is that all database access goes through{" "}
                <code>src/lib/db/queries.js</code>. That rule is enforceable
                because Drizzle queries are just JavaScript functions
                composing real SQL: joins, aggregates,{" "}
                <code>jsonb</code> filters, with no intermediate query
                language to learn. Deriving per-session cost from{" "}
                <code>agentCalls</code>, for example, is a join against{" "}
                <code>workSessions</code>, written the same way you&apos;d
                write any other function:
              </p>
              <div className="blog-article__code">
                <code>
                  {`db.select(...).from(agentCalls).innerJoin(workSessions, eq(agentCalls.sessionId, workSessions.id))`}
                </code>
              </div>
              <p>
                To be fair to Supabase, this isn&apos;t a case of PostgREST
                being unable to join. Its embedded-resource syntax handles
                foreign-table joins and nested selects fine (
                <code>.from(&apos;tasks&apos;).select(&apos;*, work_sessions(*)&apos;)</code>
                {" "}is a real join), and recent versions added more
                aggregate support on top of that. The gap is elsewhere:
                arbitrary SQL is easier to compose in Drizzle than in
                PostgREST&apos;s filter syntax, complex queries stay in
                application code instead of a Postgres function or RPC, and
                Drizzle&apos;s query builder gives you type inference that
                PostgREST&apos;s string-based filters don&apos;t.
              </p>
            </section>

            <section>
              <h2>A Direct Connection Is an Option, Not a Free Win</h2>
              <p>
                Drizzle talks straight to <code>DATABASE_URL</code> from a
                Next.js server. That works because the server is a trusted
                environment that can safely hold a database credential.
                Supabase&apos;s API layer exists for the opposite case:
                browsers, mobile apps, and edge clients that can&apos;t hold
                a direct Postgres connection at all, where PostgREST plus
                row-level security is the only sane option.
              </p>
              <p>
                Focus Copilot doesn&apos;t have that constraint &mdash; the
                database is only ever touched from the server &mdash; so a
                direct connection is available to us, and we&apos;d rather
                use it: no separate Supabase project to
                provision, no API gateway in front of Postgres, no separate
                dashboard with its own auth and its own outage surface. The
                project already runs its own Auth.js sessions and its own
                Postgres instance, on Neon, RDS, or plain Postgres; adding
                Supabase here would mean a second auth system and a second
                API layer we don&apos;t need, just to get a Postgres box we
                already have.
              </p>
            </section>

            <section>
              <h2>When Supabase Is the Better Tool for the Job</h2>
              <p>
                Drizzle and Supabase sit at different layers of the stack.
                If Focus Copilot needed any of the following, Supabase
                would be the better call:
              </p>
              <ul>
                <li>
                  <strong>Realtime subscriptions.</strong> Live task
                  updates pushed to multiple clients. Supabase Realtime is
                  genuinely hard to replicate by hand.
                </li>
                <li>
                  <strong>Storage for file uploads.</strong> Supabase
                  Storage is a bundled feature you&apos;d otherwise have to
                  wire up yourself.
                </li>
                <li>
                  <strong>A managed Postgres instance with an auto-API,
                  fast.</strong> A team that wants to skip writing a query
                  layer entirely gets there faster with Supabase&apos;s
                  client.
                </li>
                <li>
                  <strong>Bundled auth out of the box.</strong> A project
                  that doesn&apos;t already have its own auth system can
                  lean on Supabase Auth instead of standing one up.
                </li>
              </ul>
              <p>
                And you can use both. Plenty of teams run Drizzle against a
                Supabase-hosted Postgres connection string, getting
                Supabase&apos;s managed hosting, backups, auth, and storage
                while keeping Drizzle&apos;s schema-as-code and typed
                queries on top. That combination makes sense for most
                projects starting fresh. Focus Copilot already owns its
                auth through Auth.js and its own Postgres connection,
                though, so the only Supabase feature we&apos;d actually use
                is the managed Postgres database itself &mdash; and Drizzle
                already covers what we need for schema management and
                queries on top of any Postgres provider, in a way that fits
                a code-review-driven, JavaScript-only, schema-versioned
                workflow.
              </p>
              <p>
                That last point is also why Drizzle has been an easy
                default for new projects generally: the schema and query
                layer don&apos;t change when the hosting provider does.
                Moving a Drizzle-backed app from Neon to RDS, Railway, or a
                self-hosted Postgres instance is mostly a connection-string
                swap. Moving an app built on Supabase Auth, Realtime, and
                RPC functions is a real migration, because those features
                don&apos;t exist outside Supabase. For a project that wants
                to keep its options open on infrastructure, that
                portability is worth weighing on its own.
              </p>
            </section>

            <section className="blog-article__faq">
              <h2>Frequently Asked Questions</h2>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Is Drizzle a replacement for Supabase?
                </summary>
                <p className="blog-article__faq-answer">
                  No, they solve different problems. Supabase is a hosting
                  and access-layer product: Postgres plus an auto-generated
                  API, auth, and storage. Drizzle is a schema and query tool
                  that talks to any Postgres database, including one hosted
                  on Supabase. Plenty of teams run Drizzle against a
                  Supabase connection string to get Supabase&apos;s hosting
                  while keeping Drizzle&apos;s schema-as-code and typed
                  queries.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Why not just use the Supabase JS client directly?
                </summary>
                <p className="blog-article__faq-answer">
                  The Supabase client is built on PostgREST, which is great
                  for simple CRUD from a browser but gets awkward for
                  relational work. Multi-table joins, conditional
                  aggregates, or jsonb containment queries either need
                  PostgREST&apos;s limited filter syntax or a hand-written
                  Postgres function that moves logic out of code review and
                  into the database.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Does Drizzle give you TypeScript-style type safety in a JavaScript project?
                </summary>
                <p className="blog-article__faq-answer">
                  Yes. Drizzle infers row types from the schema definition
                  automatically, so a JavaScript project with JSDoc and{" "}
                  @ts-check gets real autocomplete and type errors on
                  column-name typos without anyone hand-writing an
                  interface. Supabase&apos;s client returns untyped data
                  unless you separately generate and maintain types, which
                  drifts the moment someone edits a column outside that
                  workflow.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  When would Supabase still be the right choice over raw Drizzle and Postgres?
                </summary>
                <p className="blog-article__faq-answer">
                  When you need realtime subscriptions pushed to multiple
                  clients, bundled file storage, or a managed Postgres
                  instance with an auto-generated API you can start using
                  immediately without writing a query layer. Those are
                  hosting and infrastructure features that Drizzle
                  doesn&apos;t provide on its own.
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

          <RelatedPosts currentSlug="drizzle-postgres-vs-supabase" />

        </div>
      </article>
      </div>
    </>
  );
}
