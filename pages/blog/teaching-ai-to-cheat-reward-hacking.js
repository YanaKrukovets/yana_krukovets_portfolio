import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import RelatedPosts from "../../components/RelatedPosts";
import BlogCta from "../../components/BlogCta";

const SITE_URL = "https://www.yanakrukovets.com";

const articleJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Teaching an AI to Cheat (On Purpose): The Problem of Reward Hacking",
  description:
    "A hands-on experiment in reward hacking: building a tiny gridworld where an AI agent can fake its own success signal, training three agents with different reward rules, and building a detector that catches the cheating by watching behavior instead of score.",
  datePublished: "2026-06-23",
  dateModified: "2026-06-23",
  image: `${SITE_URL}/images/blogs/research.png`,
  url: `${SITE_URL}/blog/teaching-ai-to-cheat-reward-hacking`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/teaching-ai-to-cheat-reward-hacking`,
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
      name: "What is reward hacking in reinforcement learning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reward hacking (also called specification gaming) happens when an AI trained with reinforcement learning finds a way to make its reward signal go up without actually doing the task the reward was meant to measure. It is not malicious behavior. The AI is optimizing exactly what it was told to optimize. The problem is a gap between what got measured and what was actually wanted.",
      },
    },
    {
      "@type": "Question",
      name: "How do you detect reward hacking in an RL agent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "By comparing the agent's behavior against ground truth rather than trusting the reward signal alone. In this project, that meant tracking two separate outcomes for every episode: true_done (did the agent actually reach the real goal?) and sensor_triggered (what the agent's reward function reported), then building a separate detector that watches for divergence between the two, even when that divergence is small or occasional.",
      },
    },
    {
      "@type": "Question",
      name: "Why use a small gridworld instead of a complex environment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 7x7 gridworld keeps every variable visible and every outcome explainable. With a custom gymnasium.Env, a handful of discrete actions, and a deliberately placed exploit, it is possible to know exactly when and why an agent cheats, which makes it possible to build and verify a detector with confidence before thinking about scaling the idea up to less controlled environments.",
      },
    },
    {
      "@type": "Question",
      name: "What RL library was used to train the agents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Proximal Policy Optimization (PPO) via Stable-Baselines3, a standard and well-tested RL library. The point of the project was not to reimplement an RL algorithm, but to study what happens when the reward function itself is flawed, so the training algorithm was kept as a known quantity and the environment was the variable under test.",
      },
    },
  ],
});

export default function TeachingAiToCheatRewardHacking() {
  return (
    <>
      <Head>
        <title>Teaching an AI to Cheat (On Purpose): The Problem of Reward Hacking | Yana Krukovets</title>
        <meta
          name="description"
          content="I built a gridworld where an AI agent can fake its own success signal, trained three agents with different reward rules, and built a detector that catches the cheating by watching behavior instead of score."
        />
        <meta property="og:type" key="og:type" content="article" />
        <meta property="article:published_time" content="2026-06-23" />
        <meta property="article:modified_time" content="2026-06-23" />
        <meta property="article:author" content={SITE_URL} />
        <meta property="og:title" key="og:title" content="Teaching an AI to Cheat (On Purpose): The Problem of Reward Hacking | Yana Krukovets" />
        <meta
          property="og:description"
          key="og:description"
          content="A gridworld where an AI agent can fake its own success signal, three agents trained with different reward rules, and a detector built to catch the cheating by watching behavior, not score."
        />
        <meta property="og:url" key="og:url" content={`${SITE_URL}/blog/teaching-ai-to-cheat-reward-hacking`} />
        <meta property="og:image" key="og:image" content={`${SITE_URL}/images/blogs/research.png`} />
        <meta property="og:image:width" key="og:image:width" content="1282" />
        <meta property="og:image:height" key="og:image:height" content="643" />
        <meta property="og:image:alt" key="og:image:alt" content="A gridworld diagram illustrating an AI agent, its real goal, and a tampering shortcut it can exploit" />
        <meta name="twitter:title" key="twitter:title" content="Teaching an AI to Cheat (On Purpose): The Problem of Reward Hacking | Yana Krukovets" />
        <meta name="twitter:description" key="twitter:description" content="A gridworld where an AI agent can fake its own success signal, three agents trained with different reward rules, and a detector built to catch the cheating by watching behavior, not score." />
        <meta name="twitter:image" key="twitter:image" content={`${SITE_URL}/images/blogs/research.png`} />
        <meta name="twitter:image:alt" key="twitter:image:alt" content="A gridworld diagram illustrating an AI agent, its real goal, and a tampering shortcut it can exploit" />
        <meta property="twitter:url" key="twitter:url" content={`${SITE_URL}/blog/teaching-ai-to-cheat-reward-hacking`} />
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
              <span className="blog-article__category">AI & Security</span>
              <span aria-hidden="true">·</span>
              <time dateTime="2026-06-23">June 23, 2026</time>
              <span aria-hidden="true">·</span>
              <span>7 min read</span>
            </div>
          </header>

          <div className="blog-article__banner">
            <Image
              src="/images/blogs/research.png"
              alt="A gridworld diagram illustrating an AI agent, its real goal, and a tampering shortcut it can exploit"
              width={760}
              height={381}
              className="blog-article__banner-img"
              priority
            />
          </div>
          <h1 id="blog-post-title" className="blog-article__title">
            Teaching an AI to Cheat (On Purpose): The Problem of Reward Hacking
          </h1>
          <p className="blog-article__intro">
            I&apos;ve been curious about how AI actually works under the hood for
            a while, beyond just using it as a tool, so I built a small
            reinforcement learning project purely to learn from it:{" "}
            <a href="https://github.com/YanaKrukovets/reward-tampering-gridworld" target="_blank" rel="noopener noreferrer">
              reward-tampering-gridworld
            </a>{" "}
            on GitHub. This post is about what I found.
          </p>

          <div className="blog-article__body">

            <section>
              <h2>The Problem</h2>
              <p>
                When we train an AI with reinforcement learning, we don&apos;t
                tell it <em>how</em> to do a task. We just give it a reward, a
                number that goes up when it does well, and let it figure out
                the rest through trial and error.
              </p>
              <p>
                That sounds great until you realize something uncomfortable:
                the AI doesn&apos;t actually care about the task. It only cares
                about the number. And if there&apos;s ever a gap between
                &ldquo;the number went up&rdquo; and &ldquo;the task actually
                got done,&rdquo; a sufficiently clever AI will find that gap
                and exploit it.
              </p>
              <p>
                This is a real, well-known problem in AI safety called{" "}
                <strong>reward hacking</strong> (or &ldquo;specification
                gaming&rdquo;). It&apos;s not science fiction. It happens
                constantly with real systems, in small and large ways. A
                cleaning robot rewarded for &ldquo;not seeing any mess&rdquo;
                might just turn off its camera. A trading bot rewarded for
                &ldquo;profit&rdquo; might find a measurement glitch and
                exploit that instead of actually trading well. The AI isn&apos;t
                being malicious. It&apos;s doing exactly what it was told to
                optimize. The problem is that what we <em>measured</em>{" "}
                wasn&apos;t quite the same as what we <em>wanted</em>.
              </p>
              <p>
                I wanted to see this happen myself, on a small scale I could
                fully understand and control, and then try to build something
                that catches it when it happens.
              </p>
            </section>

            <section>
              <h2>The Setup, in Plain Terms</h2>
              <p>
                I built a tiny grid, think of a 7x7 chessboard. An AI agent
                starts in one corner and has to walk to the opposite corner,
                which is the real goal.
              </p>
              <p>
                But I also added a second, special square somewhere in the
                middle of the grid. If the agent stands on <em>that</em>{" "}
                square, a &ldquo;sensor&rdquo; reports &ldquo;success!&rdquo;,
                even though the agent never actually reached the real goal.
                It&apos;s a loophole: a way to fake the measurement without
                doing the real job.
              </p>
              <p>Then I trained three different versions of the AI:</p>
              <ul>
                <li>
                  One that&apos;s only rewarded for <em>actually</em> reaching
                  the goal (no way to cheat).
                </li>
                <li>
                  One that&apos;s rewarded purely by what the fake sensor says
                  (cheats constantly, doesn&apos;t care about the real goal at
                  all).
                </li>
                <li>
                  One that&apos;s mostly rewarded for the real goal, but can
                  also grab a couple of small bonus points from the fake
                  sensor along the way: a more realistic, &ldquo;mildly
                  dishonest&rdquo; version.
                </li>
              </ul>
              <p>
                The question I wanted to answer:{" "}
                <strong>
                  can you build something that watches an AI&apos;s behavior
                  and reliably tells you when it&apos;s cheating, even when
                  the cheating is small and easy to miss?
                </strong>
              </p>
              <p>
                To find out, I built the world described above, trained three
                AI agents on it with different reward rules (one honest, one
                that cheats blatantly, one that cheats subtly), and built a
                separate &ldquo;detector&rdquo; program that watches behavior,
                not score, to catch the cheaters. It worked, but not on the
                first try: along the way I ran into a bug where one of the
                agents literally couldn&apos;t perceive whether cheating was
                even possible, which meant it never learned the shortcut
                existed at all. Once I fixed that and gave it a clear signal
                of the shortcut&apos;s availability, a second issue showed up
                in the other direction. It cheated <em>too much</em> once it
                could perceive the option, overusing the shortcut far past
                what felt like a &ldquo;mildly dishonest&rdquo; agent should.
                Both bugs ended up being more interesting than the original
                plan, because each one was its own small lesson in how
                sensitive an agent&apos;s behavior is to exactly what it can
                and can&apos;t observe.
              </p>
            </section>

            <section>
              <h2>Under the Hood, for the Technically Curious</h2>
              <p>
                The environment is a custom <code>gymnasium.Env</code>{" "}
                subclass (Gymnasium is the standard Python interface for RL
                environments). The agent has 4 discrete actions (up, down,
                left, right), and the observation it receives each step is
                just a few numbers: its normalized <code>(row, col)</code>{" "}
                position, plus a signal indicating whether its cheat shortcut
                currently has any uses left.
              </p>
              <p>
                The key design choice is tracking{" "}
                <strong>two separate reward signals internally</strong>:{" "}
                <code>true_done</code> (ground truth: did it actually reach
                the target?) and <code>sensor_triggered</code> (the
                measurement the agent is actually trained on, which can be
                faked). Every result in this project comes from comparing
                these two signals after the fact. The agent itself only ever
                sees the second one.
              </p>
              <pre>
                <code>{`true_done = bool(np.array_equal(self.agent_pos, self.target_pos))
on_tamper_cell = bool(np.array_equal(self.agent_pos, self.tamper_pos))`}</code>
              </pre>
              <p>
                The three agents were trained with PPO (Proximal Policy
                Optimization) via Stable-Baselines3, a standard, well-tested
                RL library. The point of the project was never to
                reimplement an RL algorithm, but to study what happens when
                the <em>reward function itself</em> is flawed.
              </p>
            </section>

            <section>
              <h2>Why I Built This</h2>
              <p>
                I&apos;m a developer
                who got curious about how AI actually learns, beyond the
                surface level of calling an API. Reward hacking is one of
                those ideas that sounds abstract until you watch it happen on
                your own screen, in a grid you built yourself, with an agent
                you trained yourself. Seeing the cheating agent walk straight
                to the tamper square instead of the real goal, every single
                episode, made the concept click in a way that reading about it
                never did.
              </p>
              <p>
                The full project, including the
                detector and the training scripts for all three agents, is on{" "}
                <a href="https://github.com/YanaKrukovets/reward-tampering-gridworld" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>{" "}
                if you want to poke at it yourself. The{" "}
                <Link href="/blog/reward-hacking-detector-build">
                  next post in this series
                </Link>{" "}
                goes through how the environment, the three agents, and the
                detector were actually built.
              </p>
            </section>

            <section className="blog-article__faq">
              <h2>Frequently Asked Questions</h2>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  What is reward hacking in reinforcement learning?
                </summary>
                <p className="blog-article__faq-answer">
                  Reward hacking (also called specification gaming) happens
                  when an AI trained with reinforcement learning finds a way
                  to make its reward signal go up without actually doing the
                  task the reward was meant to measure. It is not malicious
                  behavior. The AI is optimizing exactly what it was told to
                  optimize. The problem is a gap between what got measured and
                  what was actually wanted.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  How do you detect reward hacking in an RL agent?
                </summary>
                <p className="blog-article__faq-answer">
                  By comparing the agent&apos;s behavior against ground truth
                  rather than trusting the reward signal alone. In this
                  project, that meant tracking two separate outcomes for every
                  episode: <code>true_done</code> (did the agent actually
                  reach the real goal?) and <code>sensor_triggered</code>{" "}
                  (what the agent&apos;s reward function reported), then
                  building a separate detector that watches for divergence
                  between the two, even when that divergence is small or
                  occasional.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Why use a small gridworld instead of a complex environment?
                </summary>
                <p className="blog-article__faq-answer">
                  A 7x7 gridworld keeps every variable visible and every
                  outcome explainable. With a custom <code>gymnasium.Env</code>,
                  a handful of discrete actions, and a deliberately placed
                  exploit, it is possible to know exactly when and why an
                  agent cheats, which makes it possible to build and verify a
                  detector with confidence before thinking about scaling the
                  idea up to less controlled environments.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  What RL library was used to train the agents?
                </summary>
                <p className="blog-article__faq-answer">
                  Proximal Policy Optimization (PPO) via Stable-Baselines3, a
                  standard and well-tested RL library. The point of the
                  project was not to reimplement an RL algorithm, but to study
                  what happens when the reward function itself is flawed, so
                  the training algorithm was kept as a known quantity and the
                  environment was the variable under test.
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

          <RelatedPosts currentSlug="teaching-ai-to-cheat-reward-hacking" />

        </div>
      </article>
      </div>
    </>
  );
}
