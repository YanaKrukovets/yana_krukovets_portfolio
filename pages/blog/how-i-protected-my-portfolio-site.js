import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import RelatedPosts from "../../components/RelatedPosts";
import BlogCta from "../../components/BlogCta";

const SITE_URL = "https://www.yanakrukovets.com";
const SLUG = "how-i-protected-my-portfolio-site";
const TITLE = "How I Locked Down My Portfolio Site: A Security Checklist for Small Next.js Sites";
const DESCRIPTION =
  "A one-afternoon security pass on a Next.js portfolio hosted on Vercel: a critical Next.js update, rate limits that work on serverless, a daily cap on the AI chatbot, an admin login lockout, a Content-Security-Policy, a spam honeypot, and Google Cloud limits on the Gemini key.";
const IMAGE = "/images/blogs/secure-website-shield.png";
const IMAGE_ALT =
  "A laptop showing a browser window with a glowing blue shield and padlock in the middle of the screen";

const articleJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: "2026-11-06",
  dateModified: "2026-11-06",
  image: `${SITE_URL}${IMAGE}`,
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
      name: "Does a personal portfolio site really need security work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, if it does anything beyond static pages. A portfolio with a contact form, an AI chatbot, or an admin page has things worth abusing: an API key that costs money per request, a login someone can guess at, and a form bots can fill with spam. Bots scan every site they can find, so being small doesn't make you invisible.",
      },
    },
    {
      "@type": "Question",
      name: "Why doesn't an in-memory rate limiter work on Vercel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On Vercel, API routes run as serverless functions. Traffic is spread across several instances, each with its own memory, and an instance can be shut down and restarted at any time. A counter kept in a JavaScript Map only sees the requests that reached that one instance and resets on every cold start. A shared store like Upstash Redis keeps one count for everybody.",
      },
    },
    {
      "@type": "Question",
      name: "Does a Google Cloud budget stop charges on my Gemini API key?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. A budget in Google Cloud Billing only sends email alerts when spending crosses the thresholds you set. To actually stop requests, lower the quota for the Generative Language API (for example, requests per day) under APIs & Services. Once the quota is used up, Google rejects further requests instead of charging for them.",
      },
    },
    {
      "@type": "Question",
      name: "What is a honeypot field in a contact form?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A honeypot is an extra form field that is hidden from people and screen readers. Real visitors never see it, so they leave it empty. Spam bots tend to fill in every field they find. If the honeypot has a value, the submission is thrown away. Formspree supports this with a field named _gotcha.",
      },
    },
  ],
});

export default function HowIProtectedMyPortfolioSite() {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Yana Krukovets`}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:type" key="og:type" content="article" />
        <meta property="article:published_time" content="2026-11-06" />
        <meta property="article:modified_time" content="2026-11-06" />
        <meta property="article:author" content={SITE_URL} />
        <meta property="og:title" key="og:title" content={`${TITLE} | Yana Krukovets`} />
        <meta property="og:description" key="og:description" content={DESCRIPTION} />
        <meta property="og:url" key="og:url" content={`${SITE_URL}/blog/${SLUG}`} />
        <meta property="og:image" key="og:image" content={`${SITE_URL}${IMAGE}`} />
        <meta property="og:image:width" key="og:image:width" content="1536" />
        <meta property="og:image:height" key="og:image:height" content="1024" />
        <meta property="og:image:alt" key="og:image:alt" content={IMAGE_ALT} />
        <meta name="twitter:title" key="twitter:title" content={`${TITLE} | Yana Krukovets`} />
        <meta name="twitter:description" key="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" key="twitter:image" content={`${SITE_URL}${IMAGE}`} />
        <meta name="twitter:image:alt" key="twitter:image:alt" content={IMAGE_ALT} />
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
              <span className="blog-article__category">Security</span>
              <span aria-hidden="true">·</span>
              <time dateTime="2026-11-06">November 6, 2026</time>
              <span aria-hidden="true">·</span>
              <span>9 min read</span>
            </div>
          </header>

          <div className="blog-article__banner">
            <Image
              src={IMAGE}
              alt={IMAGE_ALT}
              width={1536}
              height={1024}
              className="blog-article__banner-img"
              priority
            />
          </div>
          <h1 id="blog-post-title" className="blog-article__title">
            How I Locked Down My Portfolio Site: A Security Checklist for Small Next.js Sites
          </h1>
          <p className="blog-article__intro">
            I ran <code>npm audit</code> on this site and got back 14
            vulnerabilities, one of them critical. That turned into an
            afternoon of fixing things I had been putting off. Here is what I
            changed, in the order I&apos;d do it again.
          </p>

          <div className="blog-article__body">

            <section>
              <h2>Why a Portfolio Is Worth Attacking</h2>
              <p>
                For a long time I assumed nobody would bother with a personal
                site. There&apos;s no shop and nobody has an account here.
                Then I listed what this site actually has:
              </p>
              <ul>
                <li>
                  An{" "}
                  <Link href="/blog/how-to-add-ai-chatbot-to-website">
                    AI chatbot
                  </Link>{" "}
                  backed by a Gemini API key. Every message costs a little
                  money.
                </li>
                <li>A password-protected analytics dashboard.</li>
                <li>A contact form that sends email to me.</li>
                <li>A domain with my name on it.</li>
              </ul>
              <p>
                None of that needs a targeted attacker. Bots scan everything,
                all day, looking for known holes and open endpoints. A chatbot
                endpoint with weak limits is a free AI proxy for anyone who
                finds it, and the bill comes to me.
              </p>
            </section>

            <section>
              <h2>1. Update the Framework First</h2>
              <p>
                The site was on Next.js 15.5.18. The audit listed a stack of
                Next.js advisories, and the worst were remote code execution
                bugs in the Image Optimization API (the part behind{" "}
                <code>next/image</code>). Some of them affected every 15.5.x
                release up to 15.5.27.
              </p>
              <p>
                I expected to be pushed onto Next.js 16, which would have meant
                a migration. It turned out there was a backport, 15.5.29, that
                fixes them on the 15 line. Running <code>npm view next
                dist-tags</code> showed it under the <code>backport</code> tag,
                which is easy to miss if you only look at <code>latest</code>.
              </p>
              <pre className="blog-article__code"><code>{`npm view next dist-tags      # look for a "backport" tag
npm install next@^15.5.29
npm audit fix                # the non-breaking fixes only
npm audit --omit=dev         # what's left in production deps`}</code></pre>
              <p>
                After that, two warnings were left, both from a copy of PostCSS
                that ships inside Next.js. PostCSS only processes my own
                stylesheets at build time, so I&apos;m fine waiting for the next
                Next.js release to pick up the fix.
              </p>
              <p>
                One thing to check if your repo has both{" "}
                <code>package-lock.json</code> and <code>yarn.lock</code>:
                update both, or delete the one you don&apos;t use. Otherwise
                your host might install from the stale file and you deploy the
                old version anyway.
              </p>
              <p>
                To avoid finding out by accident next time, turn on Dependabot
                alerts in the GitHub repo settings. It opens an alert when a
                dependency gets a security advisory.
              </p>
            </section>

            <section>
              <h2>2. Rate Limits That Survive Serverless</h2>
              <p>
                My chat endpoint already had a rate limit: 10 requests per IP
                per minute, kept in a JavaScript <code>Map</code>. I had even
                left myself a comment admitting it &ldquo;resets on cold start
                and is NOT shared across serverless instances.&rdquo;
              </p>
              <p>
                That comment was the whole problem. On Vercel, API routes run
                as serverless functions. Traffic is spread over several
                instances, each with its own memory, and instances get recycled
                all the time. A bot sending requests fast enough to trigger
                scaling would hit fresh counters over and over.
              </p>
              <p>
                The fix is a counter that lives outside the function. I used
                Upstash Redis through its REST API, so there&apos;s no new npm
                package. Each window gets its own key that expires by itself:
              </p>
              <pre className="blog-article__code"><code>{`const windowKey = \`rl:\${key}:\${Math.floor(Date.now() / windowMs)}\`;

const res = await fetch(\`\${process.env.UPSTASH_REDIS_REST_URL}/pipeline\`, {
  method: "POST",
  headers: { Authorization: \`Bearer \${process.env.UPSTASH_REDIS_REST_TOKEN}\` },
  body: JSON.stringify([
    ["INCR", windowKey],
    ["PEXPIRE", windowKey, String(windowMs)],
  ]),
});
const [incr] = await res.json();
return Number(incr.result) > limit;`}</code></pre>
              <p>
                If the Upstash variables aren&apos;t set, or Redis is down, the
                helper falls back to the old in-memory <code>Map</code>. A
                weak limit beats no limit, and local development keeps working
                without a Redis account.
              </p>
              <p>
                I moved this into one shared <code>lib/rateLimit.js</code> and
                used it in three places: the chat, the analytics tracking
                endpoint, and the admin login. Before, two of those had their
                own copy-pasted limiter and the login had none.
              </p>
              <p>
                For the client IP, I read <code>x-real-ip</code> first. Vercel
                sets that header itself and overwrites{" "}
                <code>x-forwarded-for</code>, so a visitor can&apos;t fake a new
                IP for every request by sending their own header. If you host
                somewhere else, check what your platform does, because on a
                plain server those headers are whatever the client sends.
              </p>
            </section>

            <section>
              <h2>3. Put a Ceiling on the AI Bill</h2>
              <p>
                A per-IP limit doesn&apos;t help much against a botnet. A
                thousand IPs at 10 messages a minute each is still a lot of
                Gemini calls. So the chat now also has a site-wide cap: 500
                messages a day across all visitors. Real visitors don&apos;t
                come close to that. When it&apos;s reached, the assistant says
                it&apos;s taking a break and points people to the contact form.
              </p>
              <pre className="blog-article__code"><code>{`const DAILY_LIMIT = Number(process.env.CHAT_DAILY_LIMIT) || 500;

if (await isRateLimited("chat:global", DAILY_LIMIT, DAY_MS)) {
  return res.status(429).json({
    error: "The assistant is taking a break for today. Please use the contact form instead.",
  });
}`}</code></pre>
              <p>
                That check runs only after the request has passed validation,
                so junk requests don&apos;t eat into the daily budget.
              </p>
              <p>
                The code cap is my first line. The second one lives in Google
                Cloud, because it still works if my code has a bug:
              </p>
              <ol>
                <li>
                  <strong>Find the key&apos;s project.</strong> In Google AI
                  Studio, the API keys page shows which Cloud project each key
                  belongs to and whether it&apos;s on the free or paid tier. On
                  the free tier, Google can&apos;t bill you at all; the worst
                  case is the chat going quiet.
                </li>
                <li>
                  <strong>Set a budget alert.</strong> Billing → Budgets &amp;
                  alerts → Create budget, with a small monthly amount. This
                  only sends email. It does not stop anything, which surprised
                  me.
                </li>
                <li>
                  <strong>Lower the quota.</strong> APIs &amp; Services →
                  Generative Language API → Quotas. Lower the requests-per-day
                  limit for the model you use. This is the hard stop: past the
                  quota, requests fail instead of costing money.
                </li>
                <li>
                  <strong>Restrict the key.</strong> APIs &amp; Services →
                  Credentials → your key → API restrictions → only the
                  Generative Language API. If the key ever leaks, it can&apos;t
                  be used for other Google services on your account. Leave
                  application restrictions off, because the key is called from
                  Vercel&apos;s servers, not from a browser.
                </li>
              </ol>
            </section>

            <section>
              <h2>4. Stop Password Guessing on the Admin Page</h2>
              <p>
                The analytics dashboard has one shared password. The login code
                was decent: it compares passwords with{" "}
                <code>crypto.timingSafeEqual</code> so response timing
                doesn&apos;t leak anything, and the session cookie is signed,{" "}
                <code>HttpOnly</code>, <code>Secure</code>, and{" "}
                <code>SameSite=Strict</code>.
              </p>
              <p>
                But nothing stopped someone from trying a million passwords. Now
                an IP gets 5 attempts per 15 minutes, then a &ldquo;try again
                later&rdquo; message. With that limit and a long random
                password, guessing is hopeless. The bots that try common passwords on
                anything that looks like an admin page get five tries and move
                on.
              </p>
              <p>
                The password itself matters as much as the limit. Mine is a
                generated string from a password manager, 20+ characters.
              </p>
            </section>

            <section>
              <h2>5. Security Headers, Including a Real CSP</h2>
              <p>
                My <code>next.config.js</code> already sent some security
                headers. While reading it I found the same block listed twice
                under two different path patterns, and it still included{" "}
                <code>X-XSS-Protection</code>, which modern browsers ignore. It
                was missing the header that does the most work: a
                Content-Security-Policy.
              </p>
              <p>
                A CSP tells the browser which sources it may load scripts,
                styles, fonts, and connections from. If someone manages to
                inject <code>&lt;script src=&quot;https://evil.example&quot;&gt;</code>{" "}
                into a page, the browser refuses to load it. To write mine I
                searched the built HTML for every external host. The list was
                short: Google Fonts and Formspree.
              </p>
              <pre className="blog-article__code"><code>{`const csp = [
  "default-src 'self'",
  \`script-src 'self' 'unsafe-inline'\${isDev ? " 'unsafe-eval'" : ""}\`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://formspree.io",
  "frame-ancestors 'self'",
  "form-action 'self' https://formspree.io",
  "object-src 'none'",
  "base-uri 'self'",
].join("; ");`}</code></pre>
              <p>
                There&apos;s a compromise in there. <code>&apos;unsafe-inline&apos;</code>{" "}
                for scripts weakens the policy, because it allows inline
                scripts. The Pages Router adds a few of its own, and the strict
                alternative is a per-request nonce, which needs middleware and
                turns static pages into dynamic ones. For a portfolio with no
                user-generated content, blocking every outside script source
                gets me most of the benefit. <code>&apos;unsafe-eval&apos;</code>{" "}
                is only there in development, for hot reload.
              </p>
              <p>
                Next to it I added a <code>Permissions-Policy</code> that turns
                off the camera, microphone, geolocation, payment, and USB APIs.
                The site uses none of them, so there&apos;s no reason to let an
                injected script ask. I also set <code>poweredByHeader: false</code>{" "}
                so responses stop announcing &ldquo;Next.js&rdquo; to every
                scanner.
              </p>
              <p>
                Test a new CSP in a real browser before you deploy. Open each
                page type, open the console, and look for &ldquo;Refused to
                load&rdquo; errors. A wrong CSP fails silently for you and
                loudly for your visitors: missing fonts, a dead contact form.
              </p>
            </section>

            <section>
              <h2>6. A Honeypot for Contact Form Spam</h2>
              <p>
                The contact form goes through Formspree, which already filters
                some spam. I added a honeypot on top: a field named{" "}
                <code>_gotcha</code> that people never see. Bots fill in every
                field, and Formspree silently drops any submission where{" "}
                <code>_gotcha</code> has a value.
              </p>
              <pre className="blog-article__code"><code>{`<div aria-hidden="true" style={{ position: "absolute", left: "-10000px" }}>
  <label htmlFor="_gotcha">Leave this field empty</label>
  <input id="_gotcha" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
</div>`}</code></pre>
              <p>
                The details are about accessibility. <code>aria-hidden</code>{" "}
                keeps screen readers from announcing it,{" "}
                <code>tabIndex=&#123;-1&#125;</code> keeps keyboard users from
                tabbing into it, and <code>autoComplete=&quot;off&quot;</code>{" "}
                stops the browser from filling it in for a real person. I moved
                it off-screen instead of using <code>display: none</code>,
                since some bots skip fields that are hidden that way.
              </p>
            </section>

            <section>
              <h2>7. The Accounts Around the Code</h2>
              <p>
                Everything above protects the code. Someone who gets into your
                GitHub or Vercel account doesn&apos;t need any of it, because
                they can deploy whatever they want under your domain. This part
                has no clever code, and I&apos;d argue it matters most:
              </p>
              <ul>
                <li>
                  Two-factor authentication on GitHub, Vercel, Supabase, Google,
                  and the domain registrar. Use an authenticator app or a
                  passkey rather than SMS where you can.
                </li>
                <li>
                  Registrar lock on the domain, so it can&apos;t be transferred
                  away without extra steps.
                </li>
                <li>
                  Secrets only in environment variables, with{" "}
                  <code>.env.local</code> in <code>.gitignore</code>. Run{" "}
                  <code>git log --all -- .env .env.local</code> once to make
                  sure none were ever committed in the past.
                </li>
              </ul>
              <p>
                If you use AI coding tools on a project with secrets, I wrote
                about{" "}
                <Link href="/blog/claude-code-security-and-privacy">
                  how I keep Claude Code away from keys and private files
                </Link>
                .
              </p>
            </section>

            <section>
              <h2>What I Checked and Left Alone</h2>
              <p>
                Some things were already in good shape, and it&apos;s worth
                knowing what to look for:
              </p>
              <ul>
                <li>
                  The Supabase service-role key is only used on the server, and
                  the analytics table has row-level security turned on with no
                  public policies. The public anon key can&apos;t read or write
                  a single row.
                </li>
                <li>
                  The chatbot validates input: message length is capped,
                  history is limited, and only known roles are passed to the
                  model. It has no tools and no database access, so a prompt
                  injection can make it say something silly, but it can&apos;t
                  do anything.
                </li>
                <li>
                  <code>/admin/</code> is disallowed in{" "}
                  <code>robots.txt</code> and the dashboard is{" "}
                  <code>noindex</code>. That doesn&apos;t hide it from
                  attackers, but it keeps it out of search results.
                </li>
              </ul>
              <p>
                I also skipped a CAPTCHA on the chat and a paid web application
                firewall. With the rate limits and the quota in place, both
                felt like more friction than this site needs. If the logs ever
                show sustained abuse, Vercel&apos;s firewall rules are the next
                step.
              </p>
            </section>

            <section>
              <h2>The Short Version, as a Checklist</h2>
              <ul>
                <li>Run <code>npm audit --omit=dev</code> and update the framework, checking for backport releases.</li>
                <li>Keep both lockfiles in sync, or delete one.</li>
                <li>Turn on Dependabot alerts.</li>
                <li>Move rate limits to a shared store if you&apos;re on serverless.</li>
                <li>Add a site-wide daily cap to anything that calls a paid API.</li>
                <li>Set a budget alert, a quota, and API restrictions on the AI key.</li>
                <li>Limit login attempts and use a long random password.</li>
                <li>Add a Content-Security-Policy and Permissions-Policy, then test in a browser.</li>
                <li>Add a honeypot to the contact form.</li>
                <li>Turn on 2FA everywhere and lock the domain.</li>
              </ul>
            </section>

            <section className="blog-article__faq">
              <h2>Frequently Asked Questions</h2>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Does a personal portfolio site really need security work?
                </summary>
                <p className="blog-article__faq-answer">
                  Yes, if it does anything beyond static pages. A portfolio with
                  a contact form, an AI chatbot, or an admin page has things
                  worth abusing: an API key that costs money per request, a
                  login someone can guess at, and a form bots can fill with
                  spam. Bots scan every site they can find, so being small
                  doesn&apos;t make you invisible.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Why doesn&apos;t an in-memory rate limiter work on Vercel?
                </summary>
                <p className="blog-article__faq-answer">
                  On Vercel, API routes run as serverless functions. Traffic is
                  spread across several instances, each with its own memory,
                  and an instance can be shut down and restarted at any time. A
                  counter kept in a JavaScript <code>Map</code> only sees the
                  requests that reached that one instance and resets on every
                  cold start. A shared store like Upstash Redis keeps one count
                  for everybody.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Does a Google Cloud budget stop charges on my Gemini API key?
                </summary>
                <p className="blog-article__faq-answer">
                  No. A budget in Google Cloud Billing only sends email alerts
                  when spending crosses the thresholds you set. To actually stop
                  requests, lower the quota for the Generative Language API (for
                  example, requests per day) under APIs &amp; Services. Once the
                  quota is used up, Google rejects further requests instead of
                  charging for them.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  What is a honeypot field in a contact form?
                </summary>
                <p className="blog-article__faq-answer">
                  A honeypot is an extra form field that is hidden from people
                  and screen readers. Real visitors never see it, so they leave
                  it empty. Spam bots tend to fill in every field they find. If
                  the honeypot has a value, the submission is thrown away.
                  Formspree supports this with a field named{" "}
                  <code>_gotcha</code>.
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

          <RelatedPosts currentSlug="how-i-protected-my-portfolio-site" />

        </div>
      </article>
      </div>
    </>
  );
}
