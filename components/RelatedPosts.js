import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "../lib/blogPosts";

export default function RelatedPosts({ currentSlug }) {
  const [posts, setPosts] = useState([]);

  // Shuffle on the client only — random picks during SSR would mismatch on hydration
  useEffect(() => {
    const candidates = BLOG_POSTS.filter((post) => post.slug !== currentSlug);
    const shuffled = [...candidates].sort(() => Math.random() - 0.5);
    setPosts(shuffled.slice(0, 2));
  }, [currentSlug]);

  if (posts.length === 0) return null;

  return (
    <aside className="related-posts" aria-labelledby="related-posts-title">
      <h2 id="related-posts-title" className="related-posts__title">
        You May Also Be Interested In
      </h2>
      <ul className="related-posts__list" role="list">
        {posts.map((post) => (
          <li key={post.slug} className="related-posts__card">
            <Link href={`/blog/${post.slug}`} className="related-posts__link">
              <div className="related-posts__image-wrap">
                <Image
                  src={post.image}
                  alt=""
                  width={480}
                  height={270}
                  className="related-posts__image"
                />
              </div>
              <div className="related-posts__meta">
                <span className="related-posts__category">{post.category}</span>
                <span className="related-posts__dot" aria-hidden="true">·</span>
                <time className="related-posts__date" dateTime={post.isoDate}>{post.date}</time>
              </div>
              <h3 className="related-posts__post-title">{post.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
