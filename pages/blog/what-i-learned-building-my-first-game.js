import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import RelatedPosts from "../../components/RelatedPosts";
import BlogCta from "../../components/BlogCta";

const SITE_URL = "https://www.yanakrukovets.com";

const articleJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "What I Learned Building My First Game (Without a Game Engine)",
  description:
    "A devlog about AlifallX: Don't Leave Them Behind — a space arcade game built with Next.js, an HTML5 canvas, Claude, and a lot of stubbornness. Eight lessons on game loops vs React, difficulty math, mobile controls, and AI pair programming.",
  datePublished: "2026-06-09",
  dateModified: "2026-06-09",
  image: `${SITE_URL}/images/blogs/alifallx.jpg`,
  url: `${SITE_URL}/blog/what-i-learned-building-my-first-game`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/what-i-learned-building-my-first-game`,
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
      name: "Do you need a game engine to build a browser game?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. For a 2D arcade game, an HTML5 canvas element, requestAnimationFrame, and plain JavaScript are enough — that's what AlifallX runs on. A game engine earns its place for 3D, physics-heavy games, multi-platform releases, or projects where editor tooling, asset pipelines, and a mature ecosystem save more time than the engine costs. But for a browser game it can be more machinery than the project needs, and skipping it forces you to learn how game loops, rendering, and input actually work.",
      },
    },
    {
      "@type": "Question",
      name: "Can you build a game with React or Next.js?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, but don't run the game inside React's render cycle. React re-renders; games loop 60 times per second. Keep the simulation state (positions, entities, particles) in plain variables inside a useEffect, draw to a canvas directly, and use React state only for the UI overlay — score, lives, menus — which changes a few times per minute, not 60 times per second.",
      },
    },
    {
      "@type": "Question",
      name: "What is a fixed-timestep game loop and why does it matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A loop that runs game logic once per displayed frame makes the game literally run faster on a 120Hz phone than on a 60Hz monitor. Delta-time scaling fixes the speed difference and is enough for many games, but the simulation still updates at different frequencies on different devices, which can produce subtle differences in physics and collision behavior. A fixed-timestep loop uses an accumulator to simulate in fixed-size steps (for example 1/60th of a second), running as many steps per frame as needed to catch up, so the game behaves the same on every display.",
      },
    },
  ],
});

export default function WhatILearnedBuildingMyFirstGame() {
  return (
    <>
      <Head>
        <title>What I Learned Building My First Game (Without a Game Engine) | Yana Krukovets</title>
        <meta
          name="description"
          content="A devlog about AlifallX, a space arcade game built with Next.js, an HTML5 canvas, and Claude — no game engine. Eight lessons on game loops vs React, difficulty math, mobile controls, and AI pair programming."
        />
        <meta property="og:type" key="og:type" content="article" />
        <meta property="og:title" key="og:title" content="What I Learned Building My First Game (Without a Game Engine) | Yana Krukovets" />
        <meta
          property="og:description"
          key="og:description"
          content="A devlog about AlifallX: a space arcade game built with plain HTML5 canvas inside Next.js, a year-long pause, and an AI pair programmer for the second half."
        />
        <meta property="og:url" key="og:url" content={`${SITE_URL}/blog/what-i-learned-building-my-first-game`} />
        <meta property="og:image" key="og:image" content={`${SITE_URL}/images/blogs/alifallx.jpg`} />
        <meta property="og:image:width" key="og:image:width" content="660" />
        <meta property="og:image:height" key="og:image:height" content="460" />
        <meta property="og:image:alt" key="og:image:alt" content="AlifallX — a space arcade game built without a game engine" />
        <meta name="twitter:title" key="twitter:title" content="What I Learned Building My First Game (Without a Game Engine) | Yana Krukovets" />
        <meta name="twitter:description" key="twitter:description" content="A devlog about AlifallX: a space arcade game built with plain HTML5 canvas inside Next.js, a year-long pause, and an AI pair programmer for the second half." />
        <meta name="twitter:image" key="twitter:image" content={`${SITE_URL}/images/blogs/alifallx.jpg`} />
        <meta name="twitter:image:alt" key="twitter:image:alt" content="AlifallX — a space arcade game built without a game engine" />
        <meta property="twitter:url" key="twitter:url" content={`${SITE_URL}/blog/what-i-learned-building-my-first-game`} />
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
              <span className="blog-article__category">Game Dev</span>
              <span aria-hidden="true">·</span>
              <time dateTime="2026-06-09">June 9, 2026</time>
              <span aria-hidden="true">·</span>
              <span>8 min read</span>
            </div>
          </header>

          <div className="blog-article__banner">
            <Image
              src="/images/blogs/alifallx.jpg"
              alt="AlifallX — a space arcade game built without a game engine"
              width={660}
              height={460}
              className="blog-article__banner-img"
              priority
            />
          </div>
          <h1 id="blog-post-title" className="blog-article__title">
            What I Learned Building My First Game (Without a Game Engine)
          </h1>
          <p className="blog-article__intro">
            A devlog about{" "}
            <a href="https://www.alifallx.com/" target="_blank" rel="noopener noreferrer">
              AlifallX: Don&apos;t Leave Them Behind
            </a>
            , a space arcade game built with Next.js, an HTML5 canvas, Claude,
            and a lot of stubbornness.
          </p>

          <div className="blog-article__body">

            <section>
              <h2>The Idea</h2>
              <p>
                The premise is simple: you fly a spaceship, rocks fall from the
                sky, and aliens fall with them. Dodge the rocks, catch the
                aliens. Don&apos;t leave them behind.
              </p>
              <p>
                I&apos;m a web developer, not a game developer. I had dabbled
                before (some time in Godot, and a while ago some simple
                kids&apos; puzzle games in Swift) but nothing like a real-time
                arcade game. And when I started this project I made a decision
                that shaped everything after it:{" "}
                <strong>no game engine this time</strong>. Just a{" "}
                <code>&lt;canvas&gt;</code> element,{" "}
                <code>requestAnimationFrame</code> to keep the loop in sync
                with the display&apos;s refresh rate, and JavaScript inside a
                Next.js app. Partly because I wanted to understand how games
                actually work under the hood, the part Godot had always handled
                for me. And partly because pulling a full game engine into a
                website felt like bringing a truck to a bike race.
              </p>
              <p>
                This post is about what that journey actually looked like,
                including the part where the project sat untouched for almost a
                year, and how AI pair programming changed the second half of
                it.
              </p>
            </section>

            <section>
              <h2>Lesson 1: Your First Version Will Be a Prototype, Even if You Don&apos;t Call It That</h2>
              <p>
                The git history doesn&apos;t lie. The first commits are from
                April 2025: <code>init</code>, <code>space moving</code>,{" "}
                <code>add button</code>, <code>moving spaceship</code>,{" "}
                <code>fixed spaceship move</code>. I got a
                ship moving, added rocks, made it work on mobile... then the
                repository sat mostly untouched until spring 2026.
              </p>
              <p>
                I didn&apos;t abandon the project because I lost interest. I
                abandoned it because the first version was built the way a web
                developer builds things: DOM elements and CSS, with React state
                for everything. It worked for a demo, but it was difficult to grow.
                Every feature I imagined (levels, enemies, particle effects)
                was difficult to bolt onto that foundation.
              </p>
              <p>
                <strong>What I&apos;d tell past me:</strong> that&apos;s fine.
                The prototype wasn&apos;t wasted time. It taught me what the
                game should feel like, so that when I came back, I knew exactly
                what I was building. The second version is almost always faster
                to build than the first.
              </p>
            </section>

            <section>
              <h2>Lesson 2: React Is Great at UI, but the Canvas Owns the Game Loop</h2>
              <p>
                When I came back in 2026, the first commit was a full rewrite:{" "}
                <em>&ldquo;Rewrite game to canvas engine with levels, aliens,
                and HUD.&rdquo;</em> The core realization behind it:
              </p>
              <p>
                <strong>React re-renders. Games loop. These are different
                universes.</strong>
              </p>
              <p>
                A game updates continuously, usually 60 times per second. If
                every rock, bullet, and particle lives in React state, you end
                up forcing a UI framework to reconcile and re-render 60 times
                per second — work that becomes increasingly wasteful the more
                entities you add. The architecture that finally worked draws a
                hard line:
              </p>
              <ul>
                <li>
                  <strong>Game state lives in plain <code>let</code> variables</strong>{" "}
                  owned by the game loop, which runs inside a single{" "}
                  <code>useEffect</code>: ship position, rocks, aliens,
                  bullets, particles. The loop mutates them directly
                  and draws to the canvas. In this setup React doesn&apos;t
                  participate in the simulation at all; it only sees the few
                  values I choose to surface.
                </li>
                <li>
                  <strong>React state is only for the UI overlay</strong>:
                  score, lives, level number, the game-over screen. Things that
                  change a few times per minute, not 60 times per second.
                </li>
              </ul>
              <p>
                The &ldquo;engine&rdquo; itself is small. Every simulation
                step runs the same sequence: read input, move everything,
                resolve collisions, spawn whatever the timers say is due, then
                draw the scene to the canvas in one pass. Each entity type is
                a plain array of objects, pushed on spawn and filtered out on
                death. That fixed sequence is the other reason game state
                stays out of React, beyond performance: a simulation wants one
                deterministic update order per frame, not a swarm of
                asynchronous state updates settling whenever React gets around
                to them.
              </p>
              <p>
                The general principle, keeping
                expensive work out of React&apos;s render cycle, is the same
                one behind{" "}
                <Link href="/blog/improve-nextjs-react-performance">
                  most React performance fixes
                </Link>
                ; a game just punishes you for ignoring it 60 times per
                second.
              </p>
            </section>

            <section>
              <h2>Lesson 3: Difficulty Is a Math Problem, Not a Vibes Problem</h2>
              <p>
                In the prototype, difficulty was hardcoded. In the rewrite, I
                made it a formula, and this was the single most fun design work
                in the project.
              </p>
              <p>
                Every level nudges several dials at once: rock speed climbs by
                a fixed step per level, alien speed ramps the same way but caps
                at level 12 so the aliens stay catchable, spawn intervals
                tighten (down to a hard floor so the game stays{" "}
                <em>possible</em>), and the color palette cycles so each level
                feels like a new place.
                Leveling up costs points on a sliding scale. Early levels come
                fast to hook you; later levels cost more so the endgame feels
                earned.
              </p>
              <p>
                Then mechanics unlock by level like chapters in a story:
                multi-alien spawns at level 2, boss rocks at 10, a ReverseAlien
                that rises from the bottom at 17, a UFO with a tractor beam
                that <em>abducts the aliens you&apos;re trying to save</em> at
                20, a gravity well at 35, a control-scrambling hazard at 37,
                and at level 50, The Last Egg: an actual win condition. Most
                arcade games just go forever. I wanted players to be able to{" "}
                <em>finish</em>.
              </p>
              <p>
                The lesson: once difficulty is parameterized, balancing the
                game becomes editing numbers instead of rewriting code.
                Playtest, tweak a constant, playtest again.
              </p>
            </section>

            <section>
              <h2>Lesson 4: An Economy Changes How Players Feel About Dying</h2>
              <p>
                Mid-rewrite, I added coins. Catch aliens, earn coins, spend
                them mid-game: bullets, a shield, an extra life. Suddenly the
                game had <em>decisions</em>. Do I save up for a life, or buy a
                shield now because level 12 is coming?
              </p>
              <p>
                What surprised me is how much this changed the emotional
                texture of the game. Before coins, dying was just failure.
                After coins, dying usually felt like a resource-management
                mistake —{" "}
                <em>my</em> mistake, one I could fix next run. That tiny shift
                is the difference between players quitting and players hitting
                restart. (I also rebalanced the whole economy at least once
                after watching people play. Your first prices will be wrong.
                Everyone&apos;s are.)
              </p>
            </section>

            <section>
              <h2>Lesson 5: Mobile Is Not a Smaller Desktop</h2>
              <p>
                I thought mobile support meant &ldquo;make the canvas
                smaller.&rdquo; It meant none of that. It meant:
              </p>
              <ul>
                <li>
                  <strong>Touch controls as a React overlay</strong>: on-screen
                  buttons for move, shoot, and shield, bridged into the game
                  loop through a ref, with auto-fire on hold.
                </li>
                <li>
                  <strong>Scaling the world, not just the screen</strong>: the
                  ship and rocks render at 60% size on touch devices, because
                  thumbs cover the screen and a phone display is small.
                </li>
                <li>
                  <strong>A fixed-timestep game loop.</strong> This was the big
                  one. My loop originally ran &ldquo;once per frame,&rdquo;
                  which means the game literally runs faster on a 120Hz phone
                  than on a 60Hz monitor. The naive fix is delta-time: multiply
                  movement by the elapsed time since the last frame. That solves
                  the obvious problem of gameplay running faster on high-refresh
                  displays, and for plenty of games it&apos;s enough. But the
                  simulation is still being updated at different frequencies on
                  different devices, which can produce subtle differences in
                  physics and collision behavior. The classic solution is the
                  accumulator pattern: simulate in fixed-size steps (1/60th of
                  a second, say) regardless of how often the screen refreshes,
                  running as many simulation steps as needed each frame to
                  catch up before rendering. (Fancier engines go one step
                  further and interpolate between simulation steps so motion
                  stays smooth on high-refresh displays; falling rocks
                  didn&apos;t need it.) Every
                  game programming book covers this early. I found out the hard
                  way, like everyone does.
                </li>
                <li>
                  <strong>A pile of mobile-web trivia</strong> I never needed
                  before: <code>100dvh</code> instead of <code>100vh</code>,{" "}
                  <code>viewport-fit=cover</code> and safe-area insets for the
                  iPhone home bar, suppressing long-press context menus and
                  text selection, and the fact that mobile browsers generally
                  won&apos;t allow audio playback until the user has
                  interacted with the page.
                </li>
              </ul>
            </section>

            <section>
              <h2>Lesson 6: Refactor When It Hurts, and It Will Hurt</h2>
              <p>
                For a while, the entire game was one ~3,600-line file. It
                worked, but adding anything meant scrolling through everything.
                Eventually I split it into modules (constants, entities,
                drawing, sound) with the loop orchestrating them. The tricky
                part of refactoring a game, compared with a typical CRUD-style
                web app, is that everything shares rapidly-changing mutable
                state. That&apos;s normal in a game loop, but it demands real
                discipline about which module owns what, so carving out
                modules takes more thought than passing props down a component
                tree. Solving that taught me more about
                JavaScript than any tutorial.
              </p>
              <p>
                I refactored <em>after</em> the game was fun, not before. 
              Premature structure would have slowed
                down the messy, experimental phase where the game found its
                personality.
              </p>
            </section>

            <section>
              <h2>Lesson 7: Finishing Is a Feature</h2>
              <p>
                The last stretch wasn&apos;t game development at all: SEO and
                metadata, accessibility passes, a share button, contact and privacy pages, custom error pages. The
                unglamorous 20% that makes a project a <em>product</em>. I even
                snuck in a Santa UFO easter egg, because if you can&apos;t have
                fun in your own game, why are you making one?
              </p>
             
            </section>

            <section>
              <h2>Lesson 8: AI Pair Programming Changes What&apos;s Reachable</h2>
              <p>
                I should be honest about how the second half of this project
                got built: with Claude. The 2026 rewrite (the canvas engine,
                the level system, the mobile port, the big refactor) was done
                with Claude Code as a pair programmer, working in conversation
                rather than alone.
              </p>
              <p>
                What surprised me is how the domain knowledge showed up
                exactly when I needed it. I&apos;d describe what I wanted
                (&ldquo;the difficulty should ramp but never become
                impossible&rdquo;) and we&apos;d turn it into a formula
                together. When the game ran at double speed on high-refresh
                phones, I learned about fixed-timestep loops <em>in the middle
                of fixing the bug</em>. The
                product direction
                and design decisions stayed mine; implementation just got much
                faster.
              </p>
              <p>
               With the help of Claude&apos;s latest model, Fable 5, I
                converted the whole game to a{" "}
                <strong>native Swift mobile game</strong>. Porting a JavaScript canvas game to Swift
                means re-thinking the rendering, the input, the audio, the
                loop.
              </p>
              <p>
                I don&apos;t want to oversell this. AI didn&apos;t write the
                game for me, and the design decisions were all mine. It made
                the slow parts faster and the unfamiliar parts less
                intimidating, and I came out understanding both versions of
                the game, because I was in the conversation the whole time.
              </p>
            </section>

            <section className="blog-article__faq">
              <h2>Frequently Asked Questions</h2>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Do you need a game engine to build a browser game?
                </summary>
                <p className="blog-article__faq-answer">
                  No. For a 2D arcade game, an HTML5 canvas element,{" "}
                  <code>requestAnimationFrame</code>, and plain JavaScript are
                  enough — that&apos;s what AlifallX runs on. A game engine
                  earns its place for 3D, physics-heavy games, multi-platform
                  releases, or projects where editor tooling, asset pipelines,
                  and a mature ecosystem save more time than the engine costs.
                  But for a browser game it can be more machinery than the
                  project needs, and skipping it forces you to learn how game
                  loops, rendering, and input actually work.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  Can you build a game with React or Next.js?
                </summary>
                <p className="blog-article__faq-answer">
                  Yes, but don&apos;t run the game inside React&apos;s render
                  cycle. React re-renders; games loop 60 times per second.
                  Keep the simulation state (positions, entities, particles)
                  in plain variables inside a <code>useEffect</code>, draw to
                  a canvas directly, and use React state only for the UI
                  overlay — score, lives, menus — which changes a few times
                  per minute, not 60 times per second.
                </p>
              </details>

              <details className="blog-article__faq-item">
                <summary className="blog-article__faq-question">
                  What is a fixed-timestep game loop and why does it matter?
                </summary>
                <p className="blog-article__faq-answer">
                  A loop that runs game logic once per displayed frame makes
                  the game literally run faster on a 120Hz phone than on a
                  60Hz monitor. Delta-time scaling fixes the speed difference
                  and is enough for many games, but the simulation still
                  updates at different frequencies on different devices, which
                  can produce subtle differences in physics and collision
                  behavior. A fixed-timestep loop uses an accumulator to
                  simulate in fixed-size steps (for example 1/60th of a
                  second), running as many steps per frame as needed to catch
                  up, so the game behaves the same on every display.
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

          <RelatedPosts currentSlug="what-i-learned-building-my-first-game" />

        </div>
      </article>
      </div>
    </>
  );
}
