import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import RelatedPosts from "../../components/RelatedPosts";
import BlogCta from "../../components/BlogCta";

const SITE_URL = "https://www.yanakrukovets.com";

const articleJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Teaching an AI to Cheat (On Purpose): The Judge That Didn't Care About the Score",
  description:
    "I finally tested my AI judge against the sneakiest reward-tampering cheater in this series, one too small for either number-based detector to see. The judge caught it every time, because it reads a yes-or-no fact instead of a number that can be shrunk away.",
  datePublished: "2026-06-28",
  dateModified: "2026-06-28",
  image: `${SITE_URL}/images/blogs/research.png`,
  url: `${SITE_URL}/blog/teaching-ai-to-cheat-the-judge-that-didnt-care-about-the-score`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/teaching-ai-to-cheat-the-judge-that-didnt-care-about-the-score`,
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
      name: "What is the AI judge, and how is it different from the two number-based detectors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The judge is a separate model that reads a play-by-play log of an agent's actions plus a short written rulebook, then explains in plain English whether a rule was broken and where. The two earlier detectors work by computing a number, visit count or total reward, and comparing it against a threshold.",
      },
    },
    {
      "@type": "Question",
      name: "What two problems with the judge had been left unfixed since earlier in the series?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "First, the judge's creativity setting was left turned up, so it could give a different answer to the exact same input on different runs. Second, the judge had never been tested against the sneakiest cheaters built in later posts, the ones small enough to slip past both number-based detectors.",
      },
    },
    {
      "@type": "Question",
      name: "Did the AI judge catch the cheat that both number-based detectors missed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, every single time. The cheater earned an extra reward of one ten-millionth of a point, too small for the visit-count detector or the reward-gap detector to notice. The judge still flagged it consistently and pointed at the exact step where the violation happened.",
      },
    },
    {
      "@type": "Question",
      name: "Why did the judge succeed where the number-based detectors failed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The judge doesn't do math on the reward at all. It reads a yes-or-no fact in the log, whether the agent is standing on the fake-success square, and applies a rule that says this counts as a violation regardless of size. A yes-or-no fact can't be shrunk down to nothing the way a number can.",
      },
    },
  ],
});

export default function TeachingAiToCheatTheJudgeThatDidntCareAboutTheScore() {
  return (
    <>
      <Head>
        <title>Teaching an AI to Cheat (On Purpose): The Judge That Didn&apos;t Care About the Score | Yana Krukovets</title>
        <meta
          name="description"
          content="I finally tested my AI judge against the sneakiest reward-tampering cheater in this series, one too small for either number-based detector to see. The judge caught it every time, because it reads a yes-or-no fact instead of a number that can be shrunk away."
        />
        <meta property="og:type" key="og:type" content="article" />
        <meta property="article:published_time" content="2026-06-28" />
        <meta property="article:modified_time" content="2026-06-28" />
        <meta property="article:author" content={SITE_URL} />
        <meta property="og:title" key="og:title" content="Teaching an AI to Cheat (On Purpose): The Judge That Didn't Care About the Score | Yana Krukovets" />
        <meta
          property="og:description"
          key="og:description"
          content="A plain-language AI judge caught the smallest reward-tampering cheat in this series, one both number-based detectors missed, because it checks a yes-or-no fact instead of a number that can be dialed down."
        />
        <meta property="og:url" key="og:url" content={`${SITE_URL}/blog/teaching-ai-to-cheat-the-judge-that-didnt-care-about-the-score`} />
        <meta property="og:image" key="og:image" content={`${SITE_URL}/images/blogs/research.png`} />
        <meta property="og:image:width" key="og:image:width" content="1282" />
        <meta property="og:image:height" key="og:image:height" content="643" />
        <meta property="og:image:alt" key="og:image:alt" content="Research chart illustrating an AI reward-hacking detection experiment" />
        <meta name="twitter:title" key="twitter:title" content="Teaching an AI to Cheat (On Purpose): The Judge That Didn't Care About the Score | Yana Krukovets" />
        <meta name="twitter:description" key="twitter:description" content="A plain-language AI judge caught the smallest reward-tampering cheat in this series, one both number-based detectors missed, because it checks a yes-or-no fact instead of a number that can be dialed down." />
        <meta name="twitter:image" key="twitter:image" content={`${SITE_URL}/images/blogs/research.png`} />
        <meta name="twitter:image:alt" key="twitter:image:alt" content="Research chart illustrating an AI reward-hacking detection experiment" />
        <meta property="twitter:url" key="twitter:url" content={`${SITE_URL}/blog/teaching-ai-to-cheat-the-judge-that-didnt-care-about-the-score`} />
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
              <span className="blog-article__category">Machine Learning</span>
              <span aria-hidden="true">·</span>
              <time dateTime="2026-06-28">June 28, 2026</time>
              <span aria-hidden="true">·</span>
              <span>7 min read</span>
            </div>
          </header>

          <div className="blog-article__banner">
            <Image
              src="/images/blogs/research.png"
              alt="Research chart illustrating an AI reward-hacking detection experiment"
              width={760}
              height={381}
              className="blog-article__banner-img"
              priority
            />
          </div>
          <h1 id="blog-post-title" className="blog-article__title">
            Teaching an AI to Cheat (On Purpose): The Judge That Didn&apos;t Care About the Score
          </h1>
          <p className="blog-article__intro">
            This is the last post in this series, and it ties together
            something I&apos;d been putting off. I had two number-based cheat
            detectors, built across{" "}
            <Link href="/blog/teaching-ai-to-cheat-the-detector-that-saw-what-the-other-missed">
              the last few posts
            </Link>
            , and a separate AI-powered judge that reads an AI&apos;s actions
            and explains in plain English whether it broke the rules.
            I&apos;d never properly tested the judge against the sneakiest
            cheaters. This post is about what happened when I finally did,
            and it was the most encouraging result in the whole project.
          </p>

          <div className="blog-article__body">

            <section>
              <h2>A Quick Recap, in Plain Terms</h2>
              <p>
                Through this whole series, I&apos;ve had an AI playing a
                simple game: walk across a small grid to reach a target
                square. There&apos;s also a fake shortcut square, if the AI
                stands on it, it can claim a tiny bit of &ldquo;success&rdquo;
                without actually finishing the real task.
              </p>
              <p>I built two ways to catch this:</p>
              <ul>
                <li>
                  <strong>Watch its feet</strong> — count how often it steps
                  on the fake-success square.
                </li>
                <li>
                  <strong>Watch its score</strong> — check if it earned more
                  points than an honest player ever could.
                </li>
              </ul>
              <p>
                I also built a third thing, separate from both: an AI judge.
                You hand it a play-by-play log of what the AI did, plus a
                short written rulebook, and it writes back, in normal
                sentences, whether a rule was broken and where.
              </p>
            </section>

            <section>
              <h2>The Problem I Hadn&apos;t Fixed Yet</h2>
              <p>
                Two issues had been sitting unaddressed since the very first
                writeup.
              </p>
              <p>
                The judge could change its mind for no reason. If you handed
                it the exact same play-by-play log twice, it might cite a
                different rule the second time, or skip a violation it caught
                the first time. That&apos;s not the judge being smart or dumb
                about the content, it&apos;s a setting. AI judges like this
                one have a creativity dial, and it was left turned up, so the
                same input could produce slightly different answers each run.
                That&apos;s a real problem if you ever want to trust
                &ldquo;the judge says X&rdquo; as a stable answer.
              </p>
              <p>
                The judge had also never actually seen the hardest cases. In
                the last two posts, I built progressively sneakier cheaters,
                ones that get away with a tiny illegal bonus so small that my
                own number-based detectors couldn&apos;t see it anymore. The
                judge had never been pointed at those trajectories at all. I
                had no idea if it would catch them or miss them too.
              </p>
            </section>

            <section>
              <h2>What I Fixed</h2>
              <p>Both fixes were small.</p>
              <p>
                For the first issue, I turned the judge&apos;s creativity
                dial all the way down to zero and locked in a fixed starting
                point, so it gives the same answer every time for the same
                input, no surprises, no flip-flopping.
              </p>
              <p>
                For the second issue, I just pointed the judge at the new,
                sneakier trajectories that the earlier posts had created, the
                ones specifically designed to be invisible to my number-based
                detectors.
              </p>
            </section>

            <section>
              <h2>What Happened: the Judge Caught the Cheat My Numbers Couldn&apos;t</h2>
              <p>
                This is the part that actually matters. The sneakiest cheater
                in this whole project earned an extra reward so tiny, one
                ten-millionth of a point, that both number-based detectors
                went completely blind to it. Watching its feet didn&apos;t
                work, it stepped on the square the same number of times an
                honest player does by accident. Watching its score
                didn&apos;t work either, the extra points were too small to
                clear the safety margin I&apos;d set.
              </p>
              <p>
                The AI judge caught it anyway. Every single time,
                consistently, it correctly pointed at the exact step where
                the agent stood on the fake-success square and explained that
                this was against the rules, regardless of how small the
                extra reward was.
              </p>
              <p>
                Why did it succeed where the number-crunching failed? The
                judge isn&apos;t doing math on the score at all. It&apos;s
                reading a flag in the play-by-play log that simply says
                &ldquo;yes, the AI is currently standing on the
                fake-success square,&rdquo; a plain yes or no, not a number
                that can be shrunk down to nothing. And the written rulebook
                I gave it has a sentence that says, almost word for word,
                &ldquo;this counts as a violation no matter how small the
                reward is.&rdquo; The judge followed that instruction
                literally, and because its signal was a yes/no fact rather
                than a number that can be quietly dialed down, there was no
                way to sneak the cheat past it just by making the reward
                tinier.
              </p>
            </section>

            <section>
              <h2>Why This Is a Satisfying Place to Stop</h2>
              <p>
                Across this whole series, every number-based detector I built
                eventually hit some kind of wall or floor, a point below
                which the cheat became invisible, either because the
                underlying behavior became indistinguishable from normal
                play, or because a setting in my own code was left too
                loose. The plain-language judge, reading categorical facts
                about behavior instead of crunching a number, didn&apos;t
                share that weakness. It can still be wrong about other
                things, and it&apos;s only ever as good as the rulebook you
                hand it, but for the specific failure mode that broke
                everything else in this project, shrinking the cheat until
                it&apos;s too small to count, reading the rules in plain
                language and checking a yes/no fact turned out to be the most
                robust approach of the three.
              </p>
              <p>
                If there&apos;s one takeaway from six blog posts of trying to
                catch a cheating AI on a 7x7 grid, it&apos;s this: numbers are
                easy to game by making them smaller. A clear written rule
                that says &ldquo;this is not allowed, no matter how
                small&rdquo; is much harder to game, because there&apos;s no
                number left to shrink.
              </p>
              <p>
                The full code for the environment, the agents, both
                detectors, and the judge lives in{" "}
                <a href="https://github.com/YanaKrukovets/reward-tampering-gridworld" target="_blank" rel="noopener noreferrer">
                  reward-tampering-gridworld
                </a>{" "}
                on GitHub.
              </p>
            </section>

            <section className="blog-article__faq">
              <h2>Frequently Asked Questions</h2>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  What is the AI judge, and how is it different from the two number-based detectors?
                </summary>
                <p className="blog-article__faq-answer">
                  The judge is a separate model that reads a play-by-play
                  log of an agent&apos;s actions plus a short written
                  rulebook, then explains in plain English whether a rule
                  was broken and where. The two earlier detectors work by
                  computing a number, visit count or total reward, and
                  comparing it against a threshold.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  What two problems with the judge had been left unfixed since earlier in the series?
                </summary>
                <p className="blog-article__faq-answer">
                  First, the judge&apos;s creativity setting was left turned
                  up, so it could give a different answer to the exact same
                  input on different runs. Second, the judge had never been
                  tested against the sneakiest cheaters built in later
                  posts, the ones small enough to slip past both
                  number-based detectors.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Did the AI judge catch the cheat that both number-based detectors missed?
                </summary>
                <p className="blog-article__faq-answer">
                  Yes, every single time. The cheater earned an extra reward
                  of one ten-millionth of a point, too small for the
                  visit-count detector or the reward-gap detector to notice.
                  The judge still flagged it consistently and pointed at the
                  exact step where the violation happened.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Why did the judge succeed where the number-based detectors failed?
                </summary>
                <p className="blog-article__faq-answer">
                  The judge doesn&apos;t do math on the reward at all. It
                  reads a yes-or-no fact in the log, whether the agent is
                  standing on the fake-success square, and applies a rule
                  that says this counts as a violation regardless of size.
                  A yes-or-no fact can&apos;t be shrunk down to nothing the
                  way a number can.
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

          <RelatedPosts currentSlug="teaching-ai-to-cheat-the-judge-that-didnt-care-about-the-score" />

        </div>
      </article>
      </div>
    </>
  );
}
