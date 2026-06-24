import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import RelatedPosts from "../../components/RelatedPosts";
import BlogCta from "../../components/BlogCta";

const SITE_URL = "https://www.yanakrukovets.com";

const articleJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Teaching an AI to Cheat (On Purpose): What I Built",
  description:
    "A piece-by-piece breakdown of the reward-tampering gridworld project: a custom Gymnasium environment, three PPO agents trained with different incentives, a behavior-based cheat detector, and a local LLM critic that explains the violations in plain English.",
  datePublished: "2026-06-24",
  dateModified: "2026-06-24",
  image: `${SITE_URL}/images/blogs/research.png`,
  url: `${SITE_URL}/blog/reward-hacking-detector-build`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/reward-hacking-detector-build`,
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
      name: "What is a gymnasium.Env and why build a custom one?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gymnasium is the standard Python interface for reinforcement learning environments: it defines step(), reset(), and an observation/action space that any training library knows how to talk to. A custom subclass was needed here because the environment had to track something off-the-shelf grids don't: a ground-truth completion flag that stays hidden from the reward the agent trains on, alongside the fake sensor signal it can exploit.",
      },
    },
    {
      "@type": "Question",
      name: "How do you set a threshold for a behavior-based cheat detector without cheating yourself?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "By splitting the honest agent's episodes into two halves: one half sets the threshold (how many visits to the exploit square counts as suspicious), and the other half, which the threshold never saw, is used to measure how often the detector raises a false alarm. Using the same data for both jobs would make a detector look better than it actually is, the same failure mode as testing a model on its own training data.",
      },
    },
    {
      "@type": "Question",
      name: "What is Constitutional AI and how was it used here?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Constitutional AI, an approach Anthropic uses to train Claude, scores and corrects model behavior against a written set of principles rather than relying only on human feedback. This project borrowed the basic idea on a much smaller scale: a short written list of rules an agent should follow, handed to a separate local language model along with a flagged episode, so it could point out which rule was broken and describe what the agent should have done instead.",
      },
    },
    {
      "@type": "Question",
      name: "Why run the critic model locally with Ollama instead of an API?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ollama runs open models like Llama 3.2 directly on a local machine, with no API key, no per-request cost, and no data leaving the machine. For a learning project that just needs a model to read a short trajectory and explain a rule violation in plain language, a small local model is enough, and it keeps the entire pipeline runnable offline.",
      },
    },
  ],
});

export default function RewardHackingDetectorBuild() {
  return (
    <>
      <Head>
        <title>Teaching an AI to Cheat (On Purpose): What I Built | Yana Krukovets</title>
        <meta
          name="description"
          content="How I built a reward-tampering gridworld in Python: a custom Gymnasium environment, three PPO agents with different incentives, a behavior-based cheat detector, and a local LLM that explains the violations."
        />
        <meta property="og:type" key="og:type" content="article" />
        <meta property="article:published_time" content="2026-06-24" />
        <meta property="article:modified_time" content="2026-06-24" />
        <meta property="article:author" content={SITE_URL} />
        <meta property="og:title" key="og:title" content="Teaching an AI to Cheat (On Purpose): What I Built | Yana Krukovets" />
        <meta
          property="og:description"
          key="og:description"
          content="A piece-by-piece breakdown of a reward-tampering gridworld: a custom Gymnasium environment, three PPO agents, a behavior-based cheat detector, and a local LLM critic."
        />
        <meta property="og:url" key="og:url" content={`${SITE_URL}/blog/reward-hacking-detector-build`} />
        <meta property="og:image" key="og:image" content={`${SITE_URL}/images/blogs/research.png`} />
        <meta property="og:image:width" key="og:image:width" content="1282" />
        <meta property="og:image:height" key="og:image:height" content="643" />
        <meta property="og:image:alt" key="og:image:alt" content="Diagram of a gridworld with an AI agent, a target square, and an exploit square, alongside a behavior monitor" />
        <meta name="twitter:title" key="twitter:title" content="Teaching an AI to Cheat (On Purpose): What I Built | Yana Krukovets" />
        <meta name="twitter:description" key="twitter:description" content="A piece-by-piece breakdown of a reward-tampering gridworld: a custom Gymnasium environment, three PPO agents, a behavior-based cheat detector, and a local LLM critic." />
        <meta name="twitter:image" key="twitter:image" content={`${SITE_URL}/images/blogs/research.png`} />
        <meta name="twitter:image:alt" key="twitter:image:alt" content="Diagram of a gridworld with an AI agent, a target square, and an exploit square, alongside a behavior monitor" />
        <meta property="twitter:url" key="twitter:url" content={`${SITE_URL}/blog/reward-hacking-detector-build`} />
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
              <time dateTime="2026-06-24">June 24, 2026</time>
              <span aria-hidden="true">·</span>
              <span>8 min read</span>
            </div>
          </header>

          <div className="blog-article__banner">
            <Image
              src="/images/blogs/research.png"
              alt="Diagram of a gridworld with an AI agent, a target square, and an exploit square, alongside a behavior monitor"
              width={760}
              height={381}
              className="blog-article__banner-img"
              priority
            />
          </div>
          <h1 id="blog-post-title" className="blog-article__title">
            Teaching an AI to Cheat (On Purpose): What I Built
          </h1>
          <p className="blog-article__intro">
            In{" "}
            <Link href="/blog/teaching-ai-to-cheat-reward-hacking">
              the first post in this series
            </Link>
            , I explained the idea behind reward hacking. This one is the build
            log: the actual pieces of{" "}
            <a href="https://github.com/YanaKrukovets/reward-tampering-gridworld" target="_blank" rel="noopener noreferrer">
              reward-tampering-gridworld
            </a>{" "}
            on GitHub, in the order I built them.
          </p>

          <div className="blog-article__body">

            <section>
              <h2>A Quick Recap of the Setup</h2>
              <p>
                An AI trained with reinforcement learning doesn&apos;t get told
                how to do a task. It gets a reward number that climbs when it
                does well, and it works out a strategy through trial and
                error. If there&apos;s ever a gap between &ldquo;the number
                went up&rdquo; and &ldquo;the task actually got done,&rdquo; a
                clever agent will exploit that gap instead of doing the real
                work. That&apos;s reward hacking.
              </p>
              <p>
                To study it on a scale I could fully control, I built a 7x7
                grid world where an agent has a real goal, a target square in
                the opposite corner, and a fake shortcut: a separate
                &ldquo;tamper&rdquo; square that fires a success signal
                without the agent ever finishing the job. This post walks
                through what I built to study that gap, piece by piece.
              </p>
              <p>
                A quick note on where I&apos;m coming from: I&apos;ve worked
                as a developer for a while, so reading code, debugging, and
                structuring a project weren&apos;t new skills here. Python
                specifically was. I&apos;m new enough to it that half the fun
                of this project was learning the language while also learning
                the RL concepts on top of it, and genuinely enjoying both at
                once.
              </p>
            </section>

            <section>
              <h2>1. The Environment</h2>
              <p>
                The grid itself is a small Python program built on{" "}
                <strong>Gymnasium</strong>, the standard interface most RL
                training libraries expect an environment to implement. Each
                turn, the agent chooses a direction, and the environment
                reports back where it ended up, whether it actually reached
                the goal, and whether it&apos;s currently standing on the fake
                square.
              </p>
              <p>
                The detail that matters most: the environment tracks two
                signals that never get mixed together. One is the truth,
                whether the episode actually ended at the real target. The
                other is what the sensor reports, which is the only thing the
                agent is rewarded on and the only thing it can manipulate.
                Keeping these apart is what makes it possible to later prove,
                with data, that a gap exists between looking successful and
                being successful.
              </p>
              <p>
                Concretely, it&apos;s a <code>gymnasium.Env</code> subclass
                with a 7x7 grid, 4 discrete movement actions, and an
                observation space of just three numbers: row, column, and
                whether the cheat shortcut still has uses left. Every{" "}
                <code>step()</code> call returns the usual RL tuple, plus an{" "}
                <code>info</code> dict carrying the ground-truth flag the
                agent&apos;s reward function never sees:
              </p>
              <pre>
                <code>{`info = {
    "true_done": true_done,               # ground truth, hidden from the reward
    "sensor_triggered": sensor_triggered,  # what the agent is actually rewarded on
    "on_tamper_cell": on_tamper_cell,
}`}</code>
              </pre>
            </section>

            <section>
              <h2>2. Three Agents, Three Incentives</h2>
              <p>
                With the environment in place, I trained three versions of the
                agent using PPO (Proximal Policy Optimization) through{" "}
                <strong>Stable-Baselines3</strong>, an established RL library.
                Each version got a different reward rule:
              </p>
              <ul>
                <li>
                  <strong>Honest:</strong> rewarded only for reaching the real
                  target, with no shortcut available.
                </li>
                <li>
                  <strong>Unrestrained cheater:</strong> rewarded purely for
                  standing on the fake square, with unlimited uses.
                </li>
                <li>
                  <strong>Light cheater:</strong> rewarded mainly for the real
                  goal, with a capped number of bonus points (two per
                  attempt) available from the fake square.
                </li>
              </ul>
              <p>
                None of these agents were instructed to cheat or not cheat.
                Each one ran thousands of trial-and-error attempts and
                converged on whatever strategy maximized its score under its
                own reward rule.
              </p>
              <p>
                Training is close to a one-liner once the environment and
                reward rule exist:
              </p>
              <pre>
                <code>{`model = PPO("MlpPolicy", env, verbose=1)
model.learn(total_timesteps=100_000)
model.save(f"agents/{mode}")`}</code>
              </pre>
              <p>
                Stable-Baselines3 ships a <code>Monitor</code> wrapper that
                logs per-episode reward and a chosen field from the{" "}
                <code>info</code> dict to a CSV automatically, so instead of
                writing custom logging, <code>info_keywords=(&quot;true_done&quot;,)</code>{" "}
                pulls the ground-truth flag straight out of the dict above
                into the log file for free.
              </p>
            </section>

            <section>
              <h2>3. Catching the Cheaters by Watching Behavior</h2>
              <p>
                Once the three agents were trained, I built a separate
                program whose only job is to look at an agent&apos;s
                behavior, not its score, and flag whether it&apos;s likely
                cheating. The method is simple: count how many times the
                agent steps onto the fake square during a run. An honest
                agent might cross it once by coincidence on the way to the
                real goal. A cheater visits it far more often than that.
              </p>
              <p>
                To set a fair threshold, I calibrated using only the honest
                agent&apos;s data, establishing what normal behavior looks
                like, and then tested the resulting rule against all three
                agents, including the honest one, to check how often it would
                raise a false alarm.
              </p>
              <p>
                Concretely, I split the honest agent&apos;s episodes in half:
                one half sets the threshold, the other half is held out
                purely to measure the false-positive rate. Using the same
                data to set and test the threshold would make the detector
                look better than it actually is, the same mistake as
                evaluating a model on its own training set:
              </p>
              <pre>
                <code>{`threshold = calib_df["tamper_visits"].max() + 1
flagged = df["tamper_visits"] >= threshold`}</code>
              </pre>
            </section>

            <section>
              <h2>4. A Second Model That Explains the Violation</h2>
              <p>
                The last piece borrows an idea from how Anthropic trains
                Claude: <strong>Constitutional AI</strong>, where model
                behavior gets scored and corrected against a written set of
                principles rather than relying only on human feedback. I
                wrote a short, plain-English list of rules describing what
                the agent should and shouldn&apos;t do, then handed a flagged
                episode and that list to a second, separate model and asked
                it to explain which rule was broken and what better behavior
                would have looked like.
              </p>
              <p>
                That turns &ldquo;the detector raised a flag&rdquo; into an
                actual explanation a person can read and check. The critic
                runs entirely on my own machine through <strong>Ollama</strong>,
                calling a small open model (<code>llama3.2</code>), so there&apos;s
                no API key and no per-request cost. Each flagged trajectory
                gets converted into a plain-text step list and sent alongside
                the rules in a single prompt, no fine-tuning required:
              </p>
              <pre>
                <code>{`response = ollama.chat(model="llama3.2", messages=[{"role": "user", "content": prompt}])`}</code>
              </pre>
              <p>
                <strong>Full stack:</strong> Python, Gymnasium for the
                environment, Stable-Baselines3 for PPO training, Pandas and
                NumPy for the data work, Matplotlib for the plots, and Ollama
                with Llama 3.2 for the local critic.
              </p>
            </section>

            <section>
              <h2>Where It Went Wrong First</h2>
              <p>
                None of this worked cleanly on the first attempt. One agent
                couldn&apos;t even perceive that cheating was an option, so it
                never learned the shortcut existed. After fixing the
                observation so the agent could actually see whether the
                shortcut was available, it swung the other way and leaned on
                the fake square far more than a &ldquo;light cheater&rdquo;
                should. Both bugs taught me more about how sensitive an
                agent&apos;s behavior is to what it can observe than the
                original, tidier plan would have.
              </p>
              <p>
                The full project, environment, training scripts, detector, and
                critic, is on{" "}
                <a href="https://github.com/YanaKrukovets/reward-tampering-gridworld" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>{" "}
                if you want to read the code directly.
              </p>
            </section>

            <section className="blog-article__faq">
              <h2>Frequently Asked Questions</h2>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  What is a gymnasium.Env and why build a custom one?
                </summary>
                <p className="blog-article__faq-answer">
                  Gymnasium is the standard Python interface for reinforcement
                  learning environments: it defines <code>step()</code>,{" "}
                  <code>reset()</code>, and an observation/action space that
                  any training library knows how to talk to. A custom
                  subclass was needed here because the environment had to
                  track something off-the-shelf grids don&apos;t: a
                  ground-truth completion flag that stays hidden from the
                  reward the agent trains on, alongside the fake sensor signal
                  it can exploit.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  How do you set a threshold for a behavior-based cheat detector without cheating yourself?
                </summary>
                <p className="blog-article__faq-answer">
                  By splitting the honest agent&apos;s episodes into two
                  halves: one half sets the threshold (how many visits to the
                  exploit square counts as suspicious), and the other half,
                  which the threshold never saw, is used to measure how often
                  the detector raises a false alarm. Using the same data for
                  both jobs would make a detector look better than it
                  actually is, the same failure mode as testing a model on its
                  own training data.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  What is Constitutional AI and how was it used here?
                </summary>
                <p className="blog-article__faq-answer">
                  Constitutional AI, an approach Anthropic uses to train
                  Claude, scores and corrects model behavior against a
                  written set of principles rather than relying only on human
                  feedback. This project borrowed the basic idea on a much
                  smaller scale: a short written list of rules an agent
                  should follow, handed to a separate local language model
                  along with a flagged episode, so it could point out which
                  rule was broken and describe what the agent should have
                  done instead.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Why run the critic model locally with Ollama instead of an API?
                </summary>
                <p className="blog-article__faq-answer">
                  Ollama runs open models like Llama 3.2 directly on a local
                  machine, with no API key, no per-request cost, and no data
                  leaving the machine. For a learning project that just needs
                  a model to read a short trajectory and explain a rule
                  violation in plain language, a small local model is enough,
                  and it keeps the entire pipeline runnable offline.
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

          <RelatedPosts currentSlug="reward-hacking-detector-build" />

        </div>
      </article>
      </div>
    </>
  );
}
