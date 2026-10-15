import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import RelatedPosts from "../../components/RelatedPosts";
import BlogCta from "../../components/BlogCta";

const SITE_URL = "https://www.yanakrukovets.com";
const SLUG = "teaching-a-spaceship-to-play-my-game-ppo";

const articleJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Teaching a Spaceship to Play My Game: Running a PPO Agent Inside the Real, Unmodified Game",
  description:
    "How I trained a PPO reinforcement learning agent to play AlifallX, my browser arcade game, by running the real, unmodified game headless in Node.js with a fake DOM and a controllable clock, then shipping the trained policy to the browser as plain JSON.",
  datePublished: "2026-07-10",
  dateModified: "2026-07-10",
  image: `${SITE_URL}/images/blogs/alifallx.jpg`,
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
      name: "Can you train a reinforcement learning agent on a browser game without rewriting it in Python?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Run the game's JavaScript headless in Node.js with a small shim that fakes window, document, the canvas, audio, and timers. Wrap it in a process that exposes reset, step, and getState over stdio JSON, and a Gymnasium environment in Python can drive it like any other env. The agent then trains on the exact code players run, so training and playback can't drift apart.",
      },
    },
    {
      "@type": "Question",
      name: "Why does a headless game need a fake clock for RL training?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Games tie mechanics like invulnerability frames, banners, and reset timers to requestAnimationFrame and setTimeout. On real time, training is slow and nondeterministic. Replacing those with one scheduler that advances exactly 1/60th of a second per frame makes the game think it runs at 60fps while it actually runs as fast as the CPU allows, with the same result every time for the same inputs.",
      },
    },
    {
      "@type": "Question",
      name: "What is action masking in reinforcement learning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Action masking blocks or overrides actions with a hand-written rule before they reach the environment. In AlifallX, the shield only deflects meteor-storm rocks, so a mask allows shield activation only during a storm and auto-buys a shield when stock runs low. It fixes in a few lines what reward shaping would take millions of steps to teach. Apply the same mask in training and inference, or the deployed agent behaves differently from the one you trained.",
      },
    },
    {
      "@type": "Question",
      name: "Do you need TensorFlow.js or ONNX to run a trained policy in the browser?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not for a small network. A 100 to 256 to 256 to 11 MLP can be exported from PyTorch to a plain JSON file of weights, and the forward pass (matrix multiply, tanh, matrix multiply, argmax per action group) is about 40 lines of JavaScript. Add a parity test against the original framework, because a transposed matrix or wrong activation won't crash, it will just make the agent play slightly worse.",
      },
    },
  ],
});

export default function TeachingASpaceshipToPlayMyGame() {
  return (
    <>
      <Head>
        <title>Teaching a Spaceship to Play My Game: A PPO Agent in the Real Game | Yana Krukovets</title>
        <meta
          name="description"
          content="How I trained a PPO agent to play AlifallX by running the real, unmodified browser game headless in Node.js with a fake DOM and controllable clock, then shipped the policy to the browser as JSON."
        />
        <meta property="og:type" key="og:type" content="article" />
        <meta property="article:published_time" content="2026-07-10" />
        <meta property="article:modified_time" content="2026-07-10" />
        <meta property="article:author" content={SITE_URL} />
        <meta property="og:title" key="og:title" content="Teaching a Spaceship to Play My Game: A PPO Agent in the Real Game | Yana Krukovets" />
        <meta
          property="og:description"
          key="og:description"
          content="Training a reinforcement learning agent on the real, unmodified AlifallX game: a headless browser shim, a 100-number observation, action masking, and a policy that runs in 40 lines of JavaScript."
        />
        <meta property="og:url" key="og:url" content={`${SITE_URL}/blog/${SLUG}`} />
        <meta property="og:image" key="og:image" content={`${SITE_URL}/images/blogs/alifallx.jpg`} />
        <meta property="og:image:width" key="og:image:width" content="660" />
        <meta property="og:image:height" key="og:image:height" content="460" />
        <meta property="og:image:alt" key="og:image:alt" content="AlifallX spaceship catching falling aliens while dodging rocks, the game the PPO agent learns to play" />
        <meta name="twitter:title" key="twitter:title" content="Teaching a Spaceship to Play My Game: A PPO Agent in the Real Game | Yana Krukovets" />
        <meta name="twitter:description" key="twitter:description" content="Training a reinforcement learning agent on the real, unmodified AlifallX game: a headless browser shim, a 100-number observation, action masking, and a policy that runs in 40 lines of JavaScript." />
        <meta name="twitter:image" key="twitter:image" content={`${SITE_URL}/images/blogs/alifallx.jpg`} />
        <meta name="twitter:image:alt" key="twitter:image:alt" content="AlifallX spaceship catching falling aliens while dodging rocks, the game the PPO agent learns to play" />
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
              <span className="blog-article__category">Machine Learning</span>
              <span aria-hidden="true">·</span>
              <time dateTime="2026-07-10">July 10, 2026</time>
              <span aria-hidden="true">·</span>
              <span>9 min read</span>
            </div>
          </header>

          <div className="blog-article__banner">
            <Image
              src="/images/blogs/alifallx.jpg"
              alt="AlifallX spaceship catching falling aliens while dodging rocks, the game the PPO agent learns to play"
              width={660}
              height={460}
              className="blog-article__banner-img"
              priority
            />
          </div>
          <h1 id="blog-post-title" className="blog-article__title">
            Teaching a Spaceship to Play My Game: Running a PPO Agent Inside the Real, Unmodified Game
          </h1>
          <p className="blog-article__intro">
            I trained a reinforcement learning agent to play{" "}
            <a href="https://www.alifallx.com/" target="_blank" rel="noopener noreferrer">
              AlifallX
            </a>
            , my browser arcade game, without writing a single line of a
            simplified Python copy. The agent learns on the real game, and you
            can watch it play in the browser. Code is on GitHub:{" "}
            <a href="https://github.com/YanaKrukovets/rl-aliencatcher" target="_blank" rel="noopener noreferrer">
              rl-aliencatcher
            </a>
            .
          </p>

          <div className="blog-article__body">

            <section>
              <h2>The Game the Agent Has to Learn</h2>
              <p>
                In AlifallX you fly a spaceship along the bottom of the screen,
                catch falling aliens, and dodge rocks. (I wrote about building
                it in{" "}
                <Link href="/blog/what-i-learned-building-my-first-game">
                  What I Learned Building My First Game
                </Link>
                .) Higher levels get crowded fast: meteor storms, UFOs,
                gravity wells that drag you off course, &ldquo;scramble&rdquo;
                effects that mess with your controls, and bonus aliens that
                drop hearts, shields or bombs. There&apos;s also a coin shop
                where you buy bullets, shields and extra lives in the middle of
                a run.
              </p>
              <p>
                After playing it for a while I wanted to know if a machine
                could learn it. In rl-aliencatcher the ship is controlled by an
                agent trained with PPO (Proximal Policy Optimization), playing
                with every rule and hazard switched on.
              </p>
            </section>

            <section>
              <h2>Don&apos;t Rebuild the Game, Use It</h2>
              <p>
                RL game projects usually start by rewriting the game in Python
                so it plugs into Gym-style tooling. I didn&apos;t want that,
                because the copy always drifts. You change a spawn rate or a
                hitbox in one version and forget the other, and then the agent
                gets very good at a game nobody plays.
              </p>
              <p>
                So I set one rule: the unchanged game is the training
                environment. The game&apos;s <code>main.js</code> is copied
                byte-for-byte into the training harness. During training it
                runs headless in Node.js, and when you watch, the same file
                runs in the browser. Training and playback can&apos;t diverge
                because there&apos;s only one game.
              </p>
              <pre className="blog-article__code"><code>{`training:
  train.py (stable-baselines3 PPO)
     └─▶ alien_catcher_env.py (Gymnasium env)
           └─ stdio JSON ─▶ env_server.js
                              └─▶ headless.js + shim.js (fake DOM, fake clock)
                                    └─▶ game/main.js   ← the real, unmodified game

playback:
  index.html ─▶ main.js (real game, real rendering)
                ai.js ─▶ policy.js (tiny MLP forward pass) ─▶ injects key presses`}</code></pre>
            </section>

            <section>
              <h2>Running a Browser Game Without a Browser</h2>
              <p>
                The game expects <code>window</code>, <code>document</code>, a{" "}
                <code>&lt;canvas&gt;</code>, <code>Image</code>,{" "}
                <code>AudioContext</code>, <code>requestAnimationFrame</code>{" "}
                and timers. Node has none of them, so I wrote{" "}
                <code>bridge/shim.js</code>, a small fake browser.
              </p>
              <ul>
                <li>
                  <strong>A canvas context that does nothing.</strong> It&apos;s
                  built on a JavaScript <code>Proxy</code>: any drawing call
                  (<code>fillRect</code>, <code>arc</code>, gradients) returns
                  an empty function, and any style assignment is accepted and
                  thrown away. Rendering costs zero.
                </li>
                <li>
                  <strong>Fake DOM elements</strong> with a working{" "}
                  <code>classList</code>, event listeners and{" "}
                  <code>.click()</code>, so the harness presses
                  &ldquo;Start&rdquo; and &ldquo;Restart&rdquo; the way a
                  person would.
                </li>
                <li>
                  <strong>A clock I control.</strong> This mattered more than
                  anything else in the shim, so it gets its own section.
                </li>
              </ul>

              <h3>The fake clock</h3>
              <p>
                Several mechanics in the game run on time: invulnerability
                frames after a hit, level-up banners, reset timers. On real
                time, training would be slow and nondeterministic. The shim
                swaps <code>requestAnimationFrame</code>,{" "}
                <code>setTimeout</code> and <code>setInterval</code> for one
                scheduler. Each call to <code>pumpFrame()</code> moves it
                forward exactly 1/60th of a second. Timers that are due fire
                first, then the animation callbacks run.
              </p>
              <p>
                The game believes it&apos;s running at 60fps in a browser.
                Really it runs as fast as the CPU allows, and the same inputs
                always give the same result. On my laptop that came out to
                about 1,100–1,400 environment steps per second across 8
                parallel Node processes.
              </p>
              <p>
                On top of the shim, <code>headless.js</code> exposes the three
                functions an RL environment needs: <code>reset()</code>,{" "}
                <code>step(action)</code> and <code>getState()</code>. Each
                agent step applies an action and then advances 4 game frames
                (frame skip), so the agent decides about 15 times per second.
              </p>
            </section>

            <section>
              <h2>What the Agent Sees, Does and Wants</h2>

              <h3>Observations: 100 numbers</h3>
              <p>
                The agent doesn&apos;t look at pixels. It gets a normalized
                vector of 100 floats, built in <code>engine/obs.js</code>:
              </p>
              <ul>
                <li>
                  <strong>Ship and metadata (9 values):</strong> x position,
                  lives, coins, bullets, shields, level, plus flags for an
                  active shield, scramble and meteor storm.
                </li>
                <li>
                  <strong>The 6 nearest rocks:</strong> relative position, fall
                  speed, width, and whether it&apos;s a boss rock.
                </li>
                <li>
                  <strong>The 6 nearest aliens:</strong> relative position,
                  speed, whether one is sitting on a rock, and whether
                  it&apos;s golden or a queen.
                </li>
                <li>
                  <strong>Everything else:</strong> the 4 nearest meteors, 3
                  bonus aliens (heart, shield or bomb), the UFO, the gravity
                  well and the Last Egg, which is the win condition.
                </li>
              </ul>
              <p>
                &ldquo;Nearest&rdquo; means lowest on the screen, since
                that&apos;s the most urgent. Positions are relative to the
                ship, so the policy learns &ldquo;rock slightly to my left and
                close&rdquo; instead of memorizing screen coordinates.
              </p>
              <p>
                The detail I care about most: <code>obs.js</code> and the state
                reader <code>readState.js</code> are shared between the Node
                trainer and the browser. The export script copies them into{" "}
                <code>web/engine/</code>, so the policy gets exactly the same
                input in both places.
              </p>

              <h3>Actions: the full human control set</h3>
              <p>
                The action space is <code>MultiDiscrete([3, 2, 2, 4])</code>:
              </p>
              <ul>
                <li><strong>move:</strong> left, stay or right</li>
                <li><strong>shoot:</strong> yes or no</li>
                <li><strong>shield:</strong> yes or no</li>
                <li><strong>buy:</strong> nothing, bullets, shield or life</li>
              </ul>
              <p>
                The agent &ldquo;presses keys&rdquo; by dispatching synthetic
                keyboard events to the game, exactly like a player. It gets no
                back door into the game state.
              </p>

              <h3>Reward</h3>
              <pre className="blog-article__code"><code>{`+ score gained (each catch)
+ 0.02 × coins earned
− 5     per life lost
+ 1     per life gained
+ 0.01  per step survived
− small penalty for being horizontally far from the nearest catchable alien
− 10    on game over
+ 50    for reaching the Last Egg (winning)`}</code></pre>
              <p>
                The distance penalty is there to give a brand-new policy
                something to go on. Without it, a fresh agent almost never
                catches an alien by chance and gets very little useful signal.
                If you&apos;ve read my{" "}
                <Link href="/blog/teaching-ai-to-cheat-reward-hacking">
                  reward hacking series
                </Link>
                , you know shaping terms like this are exactly where agents
                find loopholes, so I kept it small.
              </p>
            </section>

            <section>
              <h2>Hard Rules: When the Agent Shouldn&apos;t Decide</h2>
              <p>
                One of the two commits in the repo is called{" "}
                <code>shield fix</code>. In the game, the shield only deflects
                meteor-storm rocks. An untrained agent has no idea, so it burned
                shields at random and had none left when a storm arrived.
              </p>
              <p>
                I could have tried to teach that through reward shaping.
                Instead I wrote a small <code>maskAction()</code> function that
                both training and playback apply:
              </p>
              <ul>
                <li>Shields can only be activated during a meteor storm.</li>
                <li>
                  Restock automatically: when shields drop to 1 or fewer and
                  there are at least 70 coins, buy one.
                </li>
              </ul>
              <p>
                Not everything has to be learned. If a rule is obviously right
                and the agent would need millions of steps to stumble onto it,
                write the rule and let the network spend its capacity on the
                hard stuff, like dodging and positioning. The mask lives in the
                shared engine, so the browser agent plays by the same rules it
                trained under.
              </p>
            </section>

            <section>
              <h2>Training</h2>
              <p>The setup is standard stable-baselines3 PPO:</p>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Setting</th>
                    <th scope="col">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Policy</td><td>MLP, 2 × 256 hidden units (tanh)</td></tr>
                  <tr><td>Parallel envs</td><td>8 (each a separate Node process)</td></tr>
                  <tr><td>n_steps / batch</td><td>2048 / 512</td></tr>
                  <tr><td>γ (discount)</td><td>0.995, to plan further ahead because death is expensive</td></tr>
                  <tr><td>GAE λ</td><td>0.95</td></tr>
                  <tr><td>Entropy coef</td><td>0.01</td></tr>
                  <tr><td>Learning rate</td><td>3e-4</td></tr>
                </tbody>
              </table>
              <p>
                I did three main runs, saving a checkpoint every 20k steps.
                Here&apos;s what the logs show:
              </p>
              <ul>
                <li>
                  Episode length went from about 590 steps at the start of the
                  first run to about 1,950 by the end of the latest one. At 4
                  frames per step, that&apos;s surviving roughly 40 seconds at
                  first and over 2 minutes later, in a game that keeps getting
                  harder.
                </li>
                <li>Mean episode reward went from −24.5 to −4.2.</li>
              </ul>
              <p>
                Yes, reward is still negative on average. With −10 for game
                over and −5 per lost life, any episode that ends in death
                starts deep in the red. The agent hasn&apos;t beaten the game
                and doesn&apos;t reliably reach the Last Egg. What it has
                learned is to survive much longer and catch much more, and the
                curves were still climbing when each run ended. The action space
                is big, there are a lot of hazards, and more steps keep
                helping.
              </p>
            </section>

            <section>
              <h2>Shipping the Brain to the Browser Without an ML Library</h2>
              <p>
                Pulling TensorFlow.js or ONNX into the page for a 100 → 256 →
                256 → 11 network felt silly. <code>export_policy.py</code>{" "}
                reads the trained PyTorch weights and writes them to a plain{" "}
                <code>policy.json</code> (about 2 MB). Then{" "}
                <code>web/policy.js</code> runs the forward pass in about 40
                lines of JavaScript: matrix multiply, tanh, matrix multiply,
                and an argmax over each action group.
              </p>
              <p>
                A parity test, <code>bridge/test_policy.js</code>, checks that
                the JavaScript output matches stable-baselines3 exactly.
                Hand-written inference is where a transposed matrix or a wrong
                activation slips in. Nothing crashes. You just get an agent
                that plays a bit worse and no idea why.
              </p>
              <p>In the browser, <code>ai.js</code>:</p>
              <ul>
                <li>starts the game on its own,</li>
                <li>
                  every 4 frames reads the live state, builds the same
                  observation, runs the policy, applies the same action mask
                  and presses the keys,
                </li>
                <li>
                  shows a small badge with what it&apos;s doing (
                  <code>◀ left · 🔫 shoot · score 340 · lvl 4 · ❤ 2</code>),
                </li>
                <li>and restarts after game over to keep playing.</li>
              </ul>
            </section>

            <section>
              <h2>Testing Something That Spans Two Languages</h2>
              <p>
                With Node, Python and the browser all involved, each layer gets
                its own test:
              </p>
              <pre className="blog-article__code"><code>{`node bridge/test_random.js        # full games run headlessly with random actions
node bridge/test_policy.js        # browser policy.js == SB3 output (parity)
node web/test_browser.mjs         # headless Chromium: AI auto-plays, no console errors
python train/alien_catcher_env.py # Python <-> Node bridge smoke test`}</code></pre>
              <p>
                When something breaks, the failing test tells me which side of
                the bridge to look at, which saves a lot of guessing.
              </p>
            </section>

            <section>
              <h2>What I&apos;d Reuse on the Next Project</h2>
              <p>
                <strong>The real game as the environment.</strong> A browser
                shim with a controllable clock is a small amount of code, and
                it gets rid of every &ldquo;training and playback
                disagree&rdquo; bug before it exists.
              </p>
              <p>
                <strong>Writing the obvious rules down.</strong> The shield
                mask took a few lines. Teaching the same thing through reward
                would have taken a long time and probably still leaked.
              </p>
              <p>
                <strong>Skipping the framework for small policies.</strong> A
                JSON file of weights and a short forward pass are enough, as
                long as a parity test is watching them.
              </p>
              <p>
                As for the agent itself, it&apos;s clearly learning and clearly
                not done. Next up are longer runs, curriculum learning that
                starts at easier levels, and maybe a short history of frames
                in the observation so it can judge how fast things are moving.
              </p>
            </section>

            <section className="blog-article__faq">
              <h2>Frequently Asked Questions</h2>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Can you train a reinforcement learning agent on a browser game without rewriting it in Python?
                </summary>
                <p className="blog-article__faq-answer">
                  Yes. Run the game&apos;s JavaScript headless in Node.js with a
                  small shim that fakes <code>window</code>,{" "}
                  <code>document</code>, the canvas, audio, and timers. Wrap it
                  in a process that exposes <code>reset</code>,{" "}
                  <code>step</code>, and <code>getState</code> over stdio JSON,
                  and a Gymnasium environment in Python can drive it like any
                  other env. The agent then trains on the exact code players
                  run, so training and playback can&apos;t drift apart.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Why does a headless game need a fake clock for RL training?
                </summary>
                <p className="blog-article__faq-answer">
                  Games tie mechanics like invulnerability frames, banners, and
                  reset timers to <code>requestAnimationFrame</code> and{" "}
                  <code>setTimeout</code>. On real time, training is slow and
                  nondeterministic. Replacing those with one scheduler that
                  advances exactly 1/60th of a second per frame makes the game
                  think it runs at 60fps while it actually runs as fast as the
                  CPU allows, with the same result every time for the same
                  inputs.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  What is action masking in reinforcement learning?
                </summary>
                <p className="blog-article__faq-answer">
                  Action masking blocks or overrides actions with a
                  hand-written rule before they reach the environment. In
                  AlifallX, the shield only deflects meteor-storm rocks, so a
                  mask allows shield activation only during a storm and
                  auto-buys a shield when stock runs low. It fixes in a few
                  lines what reward shaping would take millions of steps to
                  teach. Apply the same mask in training and inference, or the
                  deployed agent behaves differently from the one you trained.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Do you need TensorFlow.js or ONNX to run a trained policy in the browser?
                </summary>
                <p className="blog-article__faq-answer">
                  Not for a small network. A 100 to 256 to 256 to 11 MLP can be
                  exported from PyTorch to a plain JSON file of weights, and the
                  forward pass (matrix multiply, tanh, matrix multiply, argmax
                  per action group) is about 40 lines of JavaScript. Add a
                  parity test against the original framework, because a
                  transposed matrix or wrong activation won&apos;t crash, it
                  will just make the agent play slightly worse.
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

          <RelatedPosts currentSlug="teaching-a-spaceship-to-play-my-game-ppo" />

        </div>
      </article>
      </div>
    </>
  );
}
