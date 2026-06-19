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
    "Is Claude Code Safe? What It Stores, How Long, and How to Lock It Down",
  description:
    "A developer's plain-language look at Claude Code security: what data it keeps on your machine and on Anthropic's servers, what gets sent over the network, how long transcripts are retained, how to delete them, and the settings that make it more private.",
  datePublished: "2026-06-18",
  dateModified: "2026-06-18",
  image: `${SITE_URL}/images/blogs/safe.png`,
  url: `${SITE_URL}/blog/claude-code-security-and-privacy`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/claude-code-security-and-privacy`,
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
      name: "Where does Claude Code store my conversations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On your own machine, in plaintext JSONL files under ~/.claude/projects/, one folder per project. Claude Code keeps them so you can resume a session, and by default they live there for 30 days. You change that window with the cleanupPeriodDays setting, or delete the files yourself at any time. Separately, when you send a prompt, that prompt and the model's reply travel over the network to the model provider and are retained on their side according to your account type.",
      },
    },
    {
      "@type": "Question",
      name: "How long does Anthropic keep Claude Code data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your account. On Free, Pro, and Max plans the period is 30 days if you have not allowed your data to be used for model improvement, and 5 years if you have. On Team, Enterprise, and API the standard period is 30 days, and qualified Enterprise organizations can enable Zero Data Retention, which is designed to avoid the standard server-side retention of transcripts. Conversations you delete are removed from your history right away and purged from back-end storage within 30 days. Content flagged for a usage policy violation can be kept longer: inputs and outputs for up to two years, and trust and safety classification scores for up to seven years.",
      },
    },
    {
      "@type": "Question",
      name: "Is my code used to train Claude models?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On commercial plans (Team, Enterprise, API) no, your code and prompts are not used to train models unless your organization explicitly opts in, such as through the Development Partner Program. On consumer plans (Free, Pro, Max) it is a setting you control: when the model-improvement setting is on, data from those accounts can be used to train new models, and that includes Claude Code usage. You can change the setting any time at claude.ai/settings/data-privacy-controls.",
      },
    },
    {
      "@type": "Question",
      name: "How do I make Claude Code more private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Turn off the training setting if you are on a consumer plan, or use a commercial plan (with Zero Data Retention for the strongest guarantee). Lower cleanupPeriodDays so local transcripts are deleted sooner, and keep full-disk encryption on since those transcripts are stored in plaintext. Opt out of the optional traffic you do not want with environment variables: DISABLE_TELEMETRY, DISABLE_ERROR_REPORTING, DISABLE_FEEDBACK_COMMAND, or CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC to cover the non-essential ones at once. And avoid pasting real secrets into prompts.",
      },
    },
  ],
});

export default function ClaudeCodeSecurityAndPrivacy() {
  return (
    <>
      <Head>
        <title>Is Claude Code Safe? What It Stores, How Long, and How to Lock It Down | Yana Krukovets</title>
        <meta
          name="description"
          content="What Claude Code keeps on your machine and on Anthropic's servers, what it sends over the network, how long it's retained, how to delete it, and the settings that make it more private."
        />
        <meta property="og:type" key="og:type" content="article" />
        <meta property="article:published_time" content="2026-06-18" />
        <meta property="article:modified_time" content="2026-06-18" />
        <meta property="article:author" content={SITE_URL} />
        <meta property="og:title" key="og:title" content="Is Claude Code Safe? What It Stores, How Long, and How to Lock It Down | Yana Krukovets" />
        <meta
          property="og:description"
          key="og:description"
          content="A developer's plain-language guide to Claude Code security: what data it holds, how long it's kept, how to delete it, and how to lock it down."
        />
        <meta property="og:url" key="og:url" content={`${SITE_URL}/blog/claude-code-security-and-privacy`} />
        <meta property="og:image" key="og:image" content={`${SITE_URL}/images/blogs/safe.png`} />
        <meta property="og:image:width" key="og:image:width" content="1341" />
        <meta property="og:image:height" key="og:image:height" content="703" />
        <meta property="og:image:alt" key="og:image:alt" content="Claude Code security and privacy — what data it stores and how to control it" />
        <meta name="twitter:title" key="twitter:title" content="Is Claude Code Safe? What It Stores, How Long, and How to Lock It Down | Yana Krukovets" />
        <meta name="twitter:description" key="twitter:description" content="What Claude Code keeps locally and on the server, how long it's retained, how to delete it, and how to make it more private." />
        <meta name="twitter:image" key="twitter:image" content={`${SITE_URL}/images/blogs/safe.png`} />
        <meta name="twitter:image:alt" key="twitter:image:alt" content="Claude Code security and privacy — what data it stores and how to control it" />
        <meta property="twitter:url" key="twitter:url" content={`${SITE_URL}/blog/claude-code-security-and-privacy`} />
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
              <span className="blog-article__category">AI &amp; Security</span>
              <span aria-hidden="true">·</span>
              <time dateTime="2026-06-18">June 18, 2026</time>
              <span aria-hidden="true">·</span>
              <span>10 min read</span>
            </div>
          </header>

          <div className="blog-article__banner">
            <Image
              src="/images/blogs/safe.png"
              alt="Claude Code security and privacy — what data it stores and how to control it"
              width={1341}
              height={703}
              className="blog-article__banner-img"
              priority
            />
          </div>
          <h1 id="blog-post-title" className="blog-article__title">
            Is Claude Code Safe? What It Stores, How Long, and How to Lock It Down
          </h1>
          <p className="blog-article__intro">
            I use Claude Code on real client work, so &ldquo;where does my code
            actually go?&rdquo; isn&apos;t an academic question for me. Here is
            what I found when I went looking: what the tool keeps on my machine,
            what leaves it, how long any of it sticks around, and the handful of
            settings that tighten the whole thing up.
          </p>

          <div className="blog-article__body">

            <section>
              <h2>Two places your data lives</h2>
              <p>
                The first thing that helped me think clearly about this was
                splitting it in two. Claude Code data lives in two separate
                places, and they have completely different rules (everything
                here lines up with Anthropic&apos;s own{" "}
                <a
                  href="https://code.claude.com/docs/en/data-usage"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Claude Code data usage documentation
                </a>
                ):
              </p>
              <ul>
                <li>
                  <strong>On your machine:</strong> transcripts, settings, and
                  some history files Claude Code writes to disk so it can resume
                  sessions and remember context.
                </li>
                <li>
                  <strong>On the model provider&apos;s servers:</strong> the
                  prompts and replies that have to travel over the network for
                  the model to answer you at all.
                </li>
              </ul>
              <p>
                Most of the worry I see online mixes these up. &ldquo;Is it
                stored forever?&rdquo; has a different answer for each. Let&apos;s
                take them one at a time.
              </p>
            </section>

            <section>
              <h2>What Claude Code keeps on your machine</h2>
              <p>
                Look inside <code>~/.claude/</code> and you can see most of it
                for yourself. The part people care about is{" "}
                <code>~/.claude/projects/</code>: that&apos;s where Claude Code
                stores your <strong>session transcripts</strong>, as plaintext{" "}
                <code>.jsonl</code> files, one folder per project. Open one in a
                text editor and you&apos;ll read back the whole conversation,
                including the file contents and commands that scrolled past
                during the session.
              </p>
              <p>
                Two things matter here. First, <strong>plaintext</strong>: the
                files are stored as plain JSONL, so protecting them relies on
                your OS account security and whatever disk-encryption technology
                you use, like FileVault or BitLocker. There&apos;s no separate
                app-level encryption layer on top. Second,{" "}
                <strong>they don&apos;t live forever</strong>. By default Claude
                Code keeps local transcripts for <strong>30 days</strong> and
                then cleans them up. You can shorten or lengthen that with the{" "}
                <code>cleanupPeriodDays</code> setting in your settings file.
              </p>
              <p>
                Alongside the transcripts, <code>~/.claude/</code> holds your
                settings, shell snapshots, a file-history/backups area Claude
                Code uses to undo edits, and local telemetry buffers. None of
                that is secret to anyone but you, but it is worth knowing it
                exists before you, say, sync your home directory to a shared
                drive.
              </p>
            </section>

            <section>
              <h2>What actually leaves your machine</h2>
              <p>
                To answer a prompt, the model has to see it. So your{" "}
                <strong>prompts and the model&apos;s outputs</strong> are sent
                over the network to your model provider, encrypted in transit
                with TLS. That part is unavoidable. It&apos;s how the tool
                works. Everything else that leaves is optional and worth knowing
                about by name:
              </p>
              <ul>
                <li>
                  <strong>Telemetry:</strong> operational metrics like latency
                  and reliability. Anthropic&apos;s docs are explicit that this
                  does <em>not</em> include your code or file paths. Opt out with{" "}
                  <code>DISABLE_TELEMETRY</code>.
                </li>
                <li>
                  <strong>Error reporting:</strong> crash data sent to Sentry.
                  Opt out with <code>DISABLE_ERROR_REPORTING</code>.
                </li>
                <li>
                  <strong>The <code>/feedback</code> command:</strong> this one
                  is different. Running it sends a copy of your conversation
                  history, <em>including code</em>, to Anthropic. It only happens
                  when you run the command, and you choose how much history to
                  include. Those transcripts are kept for 5 years. Opt out
                  entirely with <code>DISABLE_FEEDBACK_COMMAND</code>.
                </li>
                <li>
                  <strong>Session quality surveys:</strong> the &ldquo;How is
                  Claude doing?&rdquo; prompt records only your rating, not your
                  conversation. There&apos;s a separate follow-up that asks to
                  look at your transcript, and it uploads nothing unless you
                  click yes. If you do opt into it, your conversation
                  transcripts, any subagent transcripts, and the raw session log
                  can be uploaded and are kept for up to 6 months.
                </li>
                <li>
                  <strong>WebFetch safety check:</strong> before fetching a URL,
                  Claude Code sends just the hostname (not the path or page) to
                  check it against a safety blocklist.
                </li>
              </ul>
              <p>
                The pattern is reassuring once you see it: the heavy stuff (your
                code) only leaves when you deliberately send it, and the
                always-on traffic is metrics without code attached.
              </p>
            </section>

            <section>
              <h2>How long the server keeps it</h2>
              <p>
                This is the question I most wanted a straight answer to, and it
                comes down to your plan (the numbers below are from
                Anthropic&apos;s{" "}
                <a
                  href="https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  data retention policy
                </a>
                ):
              </p>
              <ul>
                <li>
                  <strong>Free, Pro, Max (consumer plans):</strong>{" "}
                  <strong>30 days</strong> if you haven&apos;t allowed your data
                  to be used for model improvement, and <strong>5 years</strong>{" "}
                  if you have. That second number surprises people, so it&apos;s
                  worth checking which side of it you&apos;re on.
                </li>
                <li>
                  <strong>Team, Enterprise, API (commercial plans):</strong> a
                  standard <strong>30-day</strong> retention period. Qualified
                  Enterprise organizations can turn on{" "}
                  <strong>Zero Data Retention</strong>, which is designed to
                  avoid the standard server-side retention of transcripts on
                  Anthropic&apos;s systems.
                </li>
              </ul>
              <p>
                A couple of edges worth knowing. When you{" "}
                <strong>delete a conversation</strong>, it leaves your history
                immediately and is purged from back-end storage within 30 days.
                And if something gets <strong>flagged for a policy
                violation</strong>, that content can be kept longer: per
                Anthropic&apos;s retention policy linked above, inputs and
                outputs for up to two years, and trust and safety classification
                scores for up to seven years. Normal work isn&apos;t in that
                bucket, but it&apos;s honest to mention the exception exists.
              </p>
            </section>

            <section>
              <h2>Is your code used to train models?</h2>
              <p>
                Short version: on <strong>commercial plans</strong> (Team,
                Enterprise, API), no. Your code and prompts aren&apos;t used to
                train models unless your organization explicitly opts in, for
                example through the Development Partner Program.
              </p>
              <p>
                On <strong>consumer plans</strong> (Free, Pro, Max), it&apos;s a
                setting you control. When the model-improvement setting is on,
                data from those accounts can be used to train new models, and
                that includes your Claude Code sessions. The control lives at{" "}
                <a
                  href="https://claude.ai/settings/data-privacy-controls"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  claude.ai/settings/data-privacy-controls
                </a>
                , and you can change it whenever you like. It only affects new or
                resumed sessions, not ones you never touch again.
              </p>
            </section>

            <section>
              <h2>How to delete your data</h2>
              <p>
                There&apos;s no single button, because the data lives in two
                places. To clear it properly you handle both:
              </p>
              <ul>
                <li>
                  <strong>Local transcripts:</strong> delete the files under{" "}
                  <code>~/.claude/projects/</code>, or lower{" "}
                  <code>cleanupPeriodDays</code> so they age out faster. If you
                  want a clean slate, removing that folder wipes the local
                  history (you lose the ability to resume those sessions, which
                  is the only thing it costs you).
                </li>
                <li>
                  <strong>Server-side conversations:</strong> delete them from
                  your Claude history. They disappear from view immediately and
                  are removed from back-end storage within 30 days. Claude Code
                  on the web sessions can be deleted individually too.
                </li>
                <li>
                  <strong>Stop future retention:</strong> turning off the
                  training setting moves a consumer account back to the shorter
                  30-day window going forward.
                </li>
              </ul>
            </section>

            <section>
              <h2>How to make it more secure</h2>
              <p>
                None of this requires a security team. Here&apos;s the checklist
                I actually use, roughly in order of impact:
              </p>
              <ul>
                <li>
                  <strong>Pick the right plan.</strong> If the work is sensitive,
                  a commercial plan keeps your code out of training by default,
                  and Zero Data Retention on Enterprise is the strongest option.
                </li>
                <li>
                  <strong>Turn off the training setting</strong> on consumer
                  plans if you&apos;d rather not contribute data, and it drops
                  your retention to 30 days as a bonus.
                </li>
                <li>
                  <strong>Keep full-disk encryption on.</strong> Those local
                  transcripts are plaintext, so the encryption that protects
                  them is your laptop&apos;s. FileVault on macOS, BitLocker on
                  Windows.
                </li>
                <li>
                  <strong>Shorten <code>cleanupPeriodDays</code></strong> so old
                  conversations don&apos;t pile up on disk longer than you need.
                </li>
                <li>
                  <strong>Trim the optional traffic.</strong>{" "}
                  <code>CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC</code> switches
                  off the non-essential calls in one move; or set{" "}
                  <code>DISABLE_TELEMETRY</code>,{" "}
                  <code>DISABLE_ERROR_REPORTING</code>, and{" "}
                  <code>DISABLE_FEEDBACK_COMMAND</code> individually.
                </li>
                <li>
                  <strong>Don&apos;t paste real secrets into prompts.</strong>{" "}
                  Use environment variables and <code>.env</code> files that stay
                  out of the conversation. A key you never type can&apos;t be
                  logged anywhere.
                </li>
                <li>
                  <strong>Mind your repo.</strong> Keep secrets in{" "}
                  <code>.gitignore</code>, and don&apos;t commit the{" "}
                  <code>~/.claude</code> transcripts if they ever land inside a
                  project. The same discipline I wrote about for{" "}
                  <Link href="/blog/how-i-use-ai-on-wordpress-projects">
                    using AI on WordPress projects
                  </Link>{" "}
                  applies here too. Review what the AI touches before it ships.
                </li>
              </ul>
            </section>

            <section>
              <h2>What not to paste into the chat</h2>
              <p>
                The single best habit is upstream of every setting: be
                deliberate about what you type in the first place. A value you
                never send can&apos;t be retained, logged, or read back from a
                transcript. The things I keep out of the chat:
              </p>
              <ul>
                <li>
                  <strong>Live credentials.</strong> API keys, access tokens,
                  passwords, private SSH or signing keys, and database
                  connection strings with real hosts. If you need Claude to work
                  with one, reference it as an environment variable
                  (<code>process.env.STRIPE_KEY</code>) instead of pasting the
                  value.
                </li>
                <li>
                  <strong>Whole <code>.env</code> and secrets files.</strong>{" "}
                  Share the variable names you need help with, not the file with
                  every value filled in.
                </li>
                <li>
                  <strong>Real personal data.</strong> Customer names, emails,
                  phone numbers, health or financial records, anything covered
                  by an NDA or a privacy law. When you need realistic input to
                  debug with, make up fake data that has the same shape.
                </li>
                <li>
                  <strong>Code you&apos;re not cleared to share.</strong> On
                  client or employer work, check whether sending the codebase to
                  a third-party tool is allowed before you do. A commercial plan
                  with Zero Data Retention is often what makes that a yes.
                </li>
                <li>
                  <strong>Production infrastructure details</strong> you
                  wouldn&apos;t post publicly: internal hostnames, server IPs,
                  access URLs. They rarely help the answer and they sit in the
                  transcript afterward.
                </li>
              </ul>
              <p>
                A simple test before you hit enter: would you be fine with this
                text sitting in a plaintext file on your disk for a month, and on
                a server for as long as your plan&apos;s retention allows? If
                not, redact it or swap in a placeholder first. Good news here is
                that Claude Code already redacts known API key and token patterns
                before anything is uploaded through <code>/feedback</code>, but
                that&apos;s a safety net, not a substitute for keeping secrets
                out of the conversation.
              </p>
            </section>

            <section>
              <h2>So, is it safe?</h2>
              <p>
                For my work, yes — with the settings above in place. The honest
                summary is that Claude Code is reasonable by default and{" "}
                <em>configurable</em> when default isn&apos;t enough. Your code
                only leaves when you send a prompt or deliberately run{" "}
                <code>/feedback</code>; the always-on traffic is metrics without
                code; retention is finite and, on commercial plans, can be zero.
                The one habit worth building is the same one that makes any tool
                safe: know where the data goes, and decide on purpose instead of
                by default.
              </p>
            </section>

            <section className="blog-article__faq">
              <h2>Frequently Asked Questions</h2>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Where does Claude Code store my conversations?
                </summary>
                <p className="blog-article__faq-answer">
                  On your own machine, in plaintext JSONL files under{" "}
                  <code>~/.claude/projects/</code>, one folder per project.
                  Claude Code keeps them so you can resume a session, and by
                  default they live there for 30 days. You change that window
                  with the <code>cleanupPeriodDays</code> setting, or delete the
                  files yourself at any time. Separately, when you send a prompt,
                  that prompt and the model&apos;s reply travel over the network
                  to the model provider and are retained on their side according
                  to your account type.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  How long does Anthropic keep Claude Code data?
                </summary>
                <p className="blog-article__faq-answer">
                  It depends on your account. On Free, Pro, and Max plans the
                  period is 30 days if you have not allowed your data to be used
                  for model improvement, and 5 years if you have. On Team,
                  Enterprise, and API the standard period is 30 days, and
                  qualified Enterprise organizations can enable Zero Data
                  Retention, which is designed to avoid the standard server-side
                  retention of transcripts. Conversations you delete are removed
                  from your history right away and purged from back-end storage
                  within 30 days. Content flagged for a usage policy violation
                  can be kept longer: inputs and outputs for up to two years, and
                  trust and safety classification scores for up to seven years.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Is my code used to train Claude models?
                </summary>
                <p className="blog-article__faq-answer">
                  On commercial plans (Team, Enterprise, API) no, your code and
                  prompts are not used to train models unless your organization
                  explicitly opts in, such as through the Development Partner
                  Program. On consumer plans (Free, Pro, Max) it is a setting you
                  control: when the model-improvement setting is on, data from
                  those accounts can be used to train new models, and that
                  includes Claude Code usage. You can change the setting any time
                  at claude.ai/settings/data-privacy-controls.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  How do I make Claude Code more private?
                </summary>
                <p className="blog-article__faq-answer">
                  Turn off the training setting if you are on a consumer plan, or
                  use a commercial plan (with Zero Data Retention for the
                  strongest guarantee). Lower <code>cleanupPeriodDays</code> so
                  local transcripts are deleted sooner, and keep full-disk
                  encryption on since those transcripts are stored in plaintext.
                  Opt out of the optional traffic you do not want with
                  environment variables: <code>DISABLE_TELEMETRY</code>,{" "}
                  <code>DISABLE_ERROR_REPORTING</code>,{" "}
                  <code>DISABLE_FEEDBACK_COMMAND</code>, or{" "}
                  <code>CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC</code> to cover
                  the non-essential ones at once. And avoid pasting real secrets
                  into prompts.
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

          <RelatedPosts currentSlug="claude-code-security-and-privacy" />

        </div>
      </article>
      </div>
    </>
  );
}
