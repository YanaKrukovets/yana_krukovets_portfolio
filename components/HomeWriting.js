import React from "react";
import Link from "next/link";
import { BLOG_POSTS } from "../lib/blogPosts";

// Homepage "Writing" section: the two newest standalone posts plus one card for the
// "Teaching an AI to Cheat" series (linked to its first part). All read from lib/blogPosts.js.
const SERIES_PREFIX = "Teaching an AI to Cheat";

const series = BLOG_POSTS.filter((p) => p.title.startsWith(SERIES_PREFIX));
const latest = BLOG_POSTS.filter((p) => !p.title.startsWith(SERIES_PREFIX)).slice(0, 2);
// BLOG_POSTS is newest first, so the last series entry is part one
const seriesStart = series[series.length - 1];

const shortDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export default function HomeWriting() {
  return (
    <section id="writing" className="home-section home-container" aria-labelledby="writing-heading">
      <div className="home-section__head">
        <div>
          <p className="home-eyebrow">04 · Writing</p>
          <h2 id="writing-heading" className="home-h2">Notes from the lab</h2>
        </div>
        <Link className="home-link" href="/blog">
          All posts
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17L17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </Link>
      </div>

      <ul className="post-grid">
        {latest.map((post) => (
          <li key={post.slug}>
            <Link className="post-card" href={`/blog/${post.slug}`}>
              <span className="post-card__meta">{shortDate(post.isoDate)} · {post.category}</span>
              <span className="post-card__title">{post.title}</span>
              <span className="post-card__cta">Read post · {post.readTime}</span>
            </Link>
          </li>
        ))}
        {seriesStart && (
          <li>
            <Link className="post-card post-card--series" href={`/blog/${seriesStart.slug}`}>
              <span className="post-card__meta">Series · {series.length} parts · AI safety</span>
              <span className="post-card__title">{SERIES_PREFIX} (On Purpose)</span>
              <span className="post-card__cta">Start the series</span>
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
}
