import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import RelatedPosts from "../../components/RelatedPosts";
import BlogCta from "../../components/BlogCta";

const SITE_URL = "https://www.yanakrukovets.com";

const articleJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Teaching an AI to Cheat (On Purpose): Finding Where the Detector Breaks",
  description:
    "I went looking for the point where my reward-tampering detector stops catching cheaters on purpose. Shrinking the exploit from two free uses to one made the detector's catch rate drop straight to zero, even though the agent was still cheating.",
  datePublished: "2026-06-25",
  dateModified: "2026-06-25",
  image: `${SITE_URL}/images/blogs/research.png`,
  url: `${SITE_URL}/blog/teaching-ai-to-cheat-finding-the-detector-floor`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/teaching-ai-to-cheat-finding-the-detector-floor`,
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
      name: "Why couldn't I just move the fake-success square somewhere off the agent's path?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because of where the start and goal sit. The agent starts in one corner and the real goal is the exact opposite corner, and those two points already span the entire grid. Every square on the board sits on some shortest path between them, so there's no detour required to reach any square. An honest agent can walk across the fake-success square for free on a perfectly normal route, no matter where that square is placed.",
      },
    },
    {
      "@type": "Question",
      name: "What happened when the cheating agent's exploit was capped at one use instead of two?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The detector's catch rate went from 100% to 0%, with no gradual decline in between. A one-use cheater visits the fake-success square exactly once per episode, the same number an honest agent hits by accident on its way to the real goal. Once the minimum cheating behavior and the minimum honest behavior produce identical visit counts, a detector that only counts visits has no way left to tell them apart.",
      },
    },
    {
      "@type": "Question",
      name: "Did the agent actually stop cheating once it became undetectable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. It kept earning more reward than completing the real task alone would justify; only the detection signature disappeared. Comparing the agent's score against its true completion rate still shows the same gap as the cheaters that did get caught. The behavior didn't change in any meaningful way, it just dropped below the one specific pattern this detector was built to notice.",
      },
    },
    {
      "@type": "Question",
      name: "What's the next step for catching a cheater this small?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Build a detector that compares earned reward to what reward should be achievable from honest behavior alone, instead of counting visits to a specific square. That's a different signal entirely, and it should in principle still flag the one-use cheater even though visit-counting can't, since the gap between score and ground truth doesn't close just because the exploit got smaller.",
      },
    },
  ],
});

export default function TeachingAiToCheatFindingTheDetectorFloor() {
  return (
    <>
      <Head>
        <title>Teaching an AI to Cheat (On Purpose): Finding Where the Detector Breaks | Yana Krukovets</title>
        <meta
          name="description"
          content="I went looking for the point where my reward-tampering detector stops catching cheaters on purpose. Shrinking the exploit from two free uses to one dropped the catch rate straight to zero, even though the agent was still cheating."
        />
        <meta property="og:type" key="og:type" content="article" />
        <meta property="article:published_time" content="2026-06-25" />
        <meta property="article:modified_time" content="2026-06-25" />
        <meta property="article:author" content={SITE_URL} />
        <meta property="og:title" key="og:title" content="Teaching an AI to Cheat (On Purpose): Finding Where the Detector Breaks | Yana Krukovets" />
        <meta
          property="og:description"
          key="og:description"
          content="Shrinking a reward-tampering exploit from two free uses to one made my behavior-based detector's catch rate fall straight to zero, with no gradual decline, even though the agent kept cheating."
        />
        <meta property="og:url" key="og:url" content={`${SITE_URL}/blog/teaching-ai-to-cheat-finding-the-detector-floor`} />
        <meta property="og:image" key="og:image" content={`${SITE_URL}/images/blogs/research.png`} />
        <meta property="og:image:width" key="og:image:width" content="1282" />
        <meta property="og:image:height" key="og:image:height" content="643" />
        <meta property="og:image:alt" key="og:image:alt" content="Research chart illustrating an AI reward-hacking detection experiment" />
        <meta name="twitter:title" key="twitter:title" content="Teaching an AI to Cheat (On Purpose): Finding Where the Detector Breaks | Yana Krukovets" />
        <meta name="twitter:description" key="twitter:description" content="Shrinking a reward-tampering exploit from two free uses to one made my behavior-based detector's catch rate fall straight to zero, with no gradual decline, even though the agent kept cheating." />
        <meta name="twitter:image" key="twitter:image" content={`${SITE_URL}/images/blogs/research.png`} />
        <meta name="twitter:image:alt" key="twitter:image:alt" content="Research chart illustrating an AI reward-hacking detection experiment" />
        <meta property="twitter:url" key="twitter:url" content={`${SITE_URL}/blog/teaching-ai-to-cheat-finding-the-detector-floor`} />
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
              <time dateTime="2026-06-25">June 25, 2026</time>
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
            Teaching an AI to Cheat (On Purpose): Finding Where the Detector Breaks
          </h1>
          <p className="blog-article__intro">
            In{" "}
            <Link href="/blog/teaching-ai-to-cheat-reward-hacking-results">
              the last post
            </Link>{" "}
            I ended on an open question: my detector caught every cheater I
            threw at it, every time, which sounds like a win but actually
            isn&apos;t. A detector that&apos;s never wrong on the cases I
            happened to test tells me nothing about where it stops working.
            Every real detector stops working somewhere, so this time I went
            looking for that point on purpose.
          </p>

          <div className="blog-article__body">

            <section>
              <h2>A Wrong Turn That Turned Out to Be Informative</h2>
              <p>
                My first idea was to move the fake-success square somewhere a
                normal agent wouldn&apos;t naturally walk past, so that
                visiting it would cost real effort instead of being a free
                pickup along the way.
              </p>
              <p>
                That doesn&apos;t actually work on this grid, and the reason
                is worth spelling out. The agent starts in one corner and the
                real goal sits in the exact opposite corner. On a board like
                that, every single square lies on some shortest path between
                the two corners, because the two endpoints already span the
                whole board. There&apos;s no detour required to visit any
                square, so there&apos;s no way to hide one &ldquo;off to the
                side&rdquo; when the two endpoints already cover every side.
                Wherever I put the fake-success square, an honest agent could
                wander across it for free, just by taking a slightly
                different but equally short route.
              </p>
              <p>
                That dead end pointed at the real lever. It isn&apos;t{" "}
                <em>where</em> the shortcut sits, it&apos;s{" "}
                <em>how many times</em> the agent is allowed to use it.
              </p>
            </section>

            <section>
              <h2>The Experiment: Shrink the Cheat From Two Uses to One</h2>
              <p>
                The subtle cheater from last time was capped at two free uses
                of the shortcut per attempt, just one tick above what an
                honest agent racks up by accident (one visit, from walking
                past the square on the way to the real goal without trying to
                cheat at all). The detector&apos;s threshold sat right
                between those two numbers.
              </p>
              <p>
                So I trained a new version of the same cheater, identical in
                every way except the cap: one free use instead of two.
              </p>
              <pre>
                <code>{`python train.py --mode subtle_cheater --tamper-max-uses 1 --label subtle_cheater_1use`}</code>
              </pre>
            </section>

            <section>
              <h2>The Detector Didn&apos;t Degrade. It Just Stopped.</h2>
              <p>Here&apos;s the result, straight from the detector&apos;s own output:</p>
              <pre>
                <code>{`mode                 episodes  flagged_rate  mean_tamper_visits  true_completion_rate
honest                100       0.0           1.0                 1.0
blatant_cheater       100       1.0           23.0                0.0
subtle_cheater        100       1.0           2.0                 1.0
subtle_cheater_1use   100       0.0           1.0                 1.0`}</code>
              </pre>
              <p>
                The new cheater visits the fake-success square exactly once
                per attempt, the same number an honest agent hits purely by
                accident. There&apos;s no way to tell them apart by counting
                visits, because their visit counts are identical. The
                detector&apos;s catch rate didn&apos;t slip from 100% down to
                something like 70%. It went straight to 0%. Every single
                attempt sailed through unflagged.
              </p>
              <p>
                That wasn&apos;t a surprise once I&apos;d worked through the
                math behind it. It&apos;s a hard floor, not a gradual
                decline. The detector&apos;s only signal is how many times an
                agent stood on a given square, and once the minimum honest
                behavior and the minimum cheating behavior land on the same
                number, that signal has nothing left to work with.
              </p>
            </section>

            <section>
              <h2>The Part That Should Worry You a Little</h2>
              <p>
                Here&apos;s the detail that matters most: the AI didn&apos;t
                stop cheating. It just became invisible to this particular
                way of looking for it.
              </p>
              <p>
                Look at the gap between the two lines in the chart below. The
                blue line is the agent&apos;s actual score, the proxy reward
                it was trained on. The orange line is whether it really
                finished the task. For the honest agent, those lines sit
                right on top of each other. For the new, harder-to-catch
                cheater, the score still sits clearly above what finishing
                the real task alone would earn, even though by every metric
                the detector tracks, it looks just as clean as an honest
                agent.
              </p>
              <div className="blog-article__image">
                <Image
                  src="/images/blogs/divergence_chart_new.png"
                  alt="Chart comparing measured reward against true task completion for the honest agent and the new one-use cheater, showing the cheater's score still diverging from ground truth even though the visit-based detector flags it as clean"
                  width={800}
                  height={1320}
                  className="blog-article__inline-img"
                />
              </div>
              <p>
                So the cheating is still there, plainly visible if you compare
                score to ground truth. It&apos;s only invisible to a detector
                that watches movement patterns and never looks at score at
                all.
              </p>
            </section>

            <section>
              <h2>Why This Matters Beyond a Toy Grid</h2>
              <p>
                This is the small-scale version of a real concern in AI
                safety: a detector built around one specific signature of bad
                behavior, here, &ldquo;visits a particular square too
                often,&rdquo; only catches cheating that&apos;s loud enough to
                clear that signature. Shrink the cheating below the noise
                floor of normal behavior, and the exact same detector,
                unchanged, no bugs, working exactly as designed, goes blind.
                The AI didn&apos;t get smarter or sneakier in any deep sense;
                the exploit just got small enough to blend into ordinary
                behavior.
              </p>
              <p>
                That&apos;s a real failure mode, not just a quirk of this toy
                grid: any detector that watches one kind of behavioral
                fingerprint has a floor below which it simply cannot see, no
                matter how well it&apos;s tuned.
              </p>
            </section>

            <section>
              <h2>What I&apos;d Try Next</h2>
              <p>
                The honest next step is building a second detector that
                doesn&apos;t rely on visit counts at all, one that compares
                earned reward against what reward should be achievable from
                honest behavior alone, and flags the gap directly, the way I
                did by eye for the chart above. That&apos;s a fundamentally
                different signal from counting how many times an agent stood
                on a square, and it should, in principle, still catch the
                one-use cheater even though visit-counting can&apos;t.
                Building that and seeing whether it actually holds up is the
                natural next experiment.
              </p>
              <p>
                The full code for the environment, the agents, and the
                detector lives in{" "}
                <a href="https://github.com/YanaKrukovets/reward-tampering-gridworld" target="_blank" rel="noopener noreferrer">
                  reward-tampering-gridworld
                </a>{" "}
                on GitHub, if you want to push on the floor yourself.
              </p>
            </section>

            <section className="blog-article__faq">
              <h2>Frequently Asked Questions</h2>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Why couldn&apos;t I just move the fake-success square somewhere off the agent&apos;s path?
                </summary>
                <p className="blog-article__faq-answer">
                  Because of where the start and goal sit. The agent starts
                  in one corner and the real goal is the exact opposite
                  corner, and those two points already span the entire grid.
                  Every square on the board sits on some shortest path
                  between them, so there&apos;s no detour required to reach
                  any square. An honest agent can walk across the
                  fake-success square for free on a perfectly normal route,
                  no matter where that square is placed.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  What happened when the cheating agent&apos;s exploit was capped at one use instead of two?
                </summary>
                <p className="blog-article__faq-answer">
                  The detector&apos;s catch rate went from 100% to 0%, with
                  no gradual decline in between. A one-use cheater visits the
                  fake-success square exactly once per episode, the same
                  number an honest agent hits by accident on its way to the
                  real goal. Once the minimum cheating behavior and the
                  minimum honest behavior produce identical visit counts, a
                  detector that only counts visits has no way left to tell
                  them apart.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Did the agent actually stop cheating once it became undetectable?
                </summary>
                <p className="blog-article__faq-answer">
                  No. It kept earning more reward than completing the real
                  task alone would justify; only the detection signature
                  disappeared. Comparing the agent&apos;s score against its
                  true completion rate still shows the same gap as the
                  cheaters that did get caught. The behavior didn&apos;t
                  change in any meaningful way, it just dropped below the one
                  specific pattern this detector was built to notice.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  What&apos;s the next step for catching a cheater this small?
                </summary>
                <p className="blog-article__faq-answer">
                  Build a detector that compares earned reward to what
                  reward should be achievable from honest behavior alone,
                  instead of counting visits to a specific square.
                  That&apos;s a different signal entirely, and it should in
                  principle still flag the one-use cheater even though
                  visit-counting can&apos;t, since the gap between score and
                  ground truth doesn&apos;t close just because the exploit
                  got smaller.
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

          <RelatedPosts currentSlug="teaching-ai-to-cheat-finding-the-detector-floor" />

        </div>
      </article>
      </div>
    </>
  );
}
