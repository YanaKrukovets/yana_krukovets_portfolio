import { useEffect, useRef, useState } from "react";

/**
 * useScrollReveal
 * Returns a ref and a boolean `isVisible`.
 * When the element enters the viewport, isVisible becomes true and stays true.
 *
 * @param {number} threshold - 0..1, how much of the element must be visible (default 0.15)
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // fire once
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
