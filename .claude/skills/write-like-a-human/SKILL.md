---
name: write-like-a-human
description: Final-pass enforcement layer that strips AI writing tells before delivery. Run on blog posts, articles, emails, social copy, bios, and page copy — NOT on code comments, commit messages, JSON-LD, or metadata. Trigger when drafting or editing prose, or when someone says "make this not sound like AI," "remove the robot voice," "clean this up," or "final pass."
---

# Write Like a Human

An enforcement layer, not a style guide. It catches the patterns that make writing sound machine-made and refuses to ship them. Run it as the final pass on every piece of prose. If a draft fails, fix it in place. Do not announce the catch. Deliver the clean version.

Scope: blog posts, articles, emails, social copy, bios, landing-page text. Do not apply to code comments, commit messages, JSON-LD descriptions, alt text, or other metadata.

Two passes. The first catches the loud structural tics. The second catches the quiet vocabulary tells that survive a first read. Run both, every time.

## Pass 1: The Seven Structural Tics

1. Em dashes: at most one per ~500 words. Replace the rest with a comma, period, parentheses, or colon. If a sentence only works with one, that can be the one you keep, or rewrite the sentence. (Zero everywhere is itself a detectable pattern; sparse is the goal.)
2. No "it's not X, it's Y." Also kill "less about X, more about Y." Make the point straight.
3. Break the rule of three. Stop grouping everything in threes. Use one word, or two, or four. Vary the count.
4. No empty openers. Cut "Great question," "Absolutely," "I'd be happy to help." Also cut "In a world where..." and "Whether you're X or Y..." The first real sentence is the opener.
5. No performative enthusiasm. One exclamation point at most, usually zero. Cut amazing, incredible, fantastic, thrilled, delighted.
6. No "Let's" openers. No "Let's dive in," "Let's break this down," "Let's explore." Just start.
7. No recap closers. Do not restate the body at the end. End on the last real point or a clean next step. (Exception: an explicit FAQ or summary section the piece calls for, e.g. an SEO blog post with a FAQ block, stays.)

Also watch: consecutive paragraphs opening with the same construction, and colon-heavy headings ("The Problem: Why X Fails") repeated through a piece. Vary them.

## Pass 2: The Seven Vocabulary and Narrator Tells

1. Tell-words. Replace every time: delve, foster, elevate, unlock (metaphorical), tapestry, multifaceted, nuanced (as filler), game-changer, revolutionize, unprecedented, empower, landscape (metaphorical), navigate (metaphorical), crucial, realm, pivotal, robust, seamless, cutting-edge. Swap in plain, specific language.
2. Corporate jargon. Replace or cut: "at the end of the day," "in today's fast-paced world," "circle back," "move the needle," "low-hanging fruit," "touch base," "leverage" (use "use"), "synergy," "deep dive," "holistic," "actionable insights," "align/alignment" (when vague), "stakeholder," "thought leader."
3. "Win" framing. Cut "the winning strategy," "the win here is," "that's a win," "win-win," "big win." Name the actual result.
4. The "quietly" narrator voice. Cut spy-thriller staging: "Quietly, [company] has been...," "behind the scenes," "under the radar," "without fanfare," "silently [verb]ing." State the fact.
5. Hedge stacking and scene-setting. One hedge per sentence, maximum. Two or more (might, could, possibly, potentially, perhaps, somewhat, arguably) triggers a rewrite into a direct statement. Delete a paragraph's throat-clearing first sentence if the second works as the opener.
6. Abstract container words. Cut empty vessels: "that distance is where the value lives," "the answer sits in the space between X and Y," and any vague use of "opportunity," "space," "distance," or "gap." Test: can you answer "to do what, exactly"?
7. "Most people" positioning. Cut the unnamed wrong crowd: "most people miss this," "what most people get wrong," "everyone is focused on X but the real story is Y." Make the claim directly. Keep "most people" only with a verifiable observation behind it.

## The Final Pass

Run before delivering anything:

1. Em dashes counted: at most one per ~500 words.
2. "It's not X, it's Y" rewritten direct.
3. At least one group of three broken.
4. First sentence is real content, not an opener.
5. One exclamation point at most.
6. No "Let's" opening a paragraph or piece.
7. Closing is not a recap (FAQ/summary sections excepted).
8. Tell-words and jargon replaced with plain language.
9. "Win," "quietly," and "most people" cut or made specific.
10. One hedge per sentence, maximum.

Fix every failure silently. Ship the clean version.

## Edge Cases

- Direct quotes: leave them alone, even if they contain banned terms.
- Code and technical syntax: the em dash rule does not apply to code, commands, or file paths.
- Genuine technical terms stay when technically correct: "scalable," "ecosystem," "leverage," "optimize" (e.g. "optimize images," "optimize bundle size"), "best practices" (in dev content), "cache," "lazy load." Performance and engineering writing needs its vocabulary.
- One hedge is fine. The ban is on stacking.
- A real three-part list: if removing one item breaks the meaning, keep all three.
- SEO blog structure (intro, FAQ section, short conclusion) the piece explicitly calls for is allowed; the recap-closer rule targets reflexive restating, not requested structure.

The job: catch the tells, swap in specific language, hand back prose that reads like a person wrote it.
