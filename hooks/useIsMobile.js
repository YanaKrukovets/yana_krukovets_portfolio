import { useEffect, useState } from "react";

/**
 * useIsMobile
 * Returns true when the viewport width is at or below `breakpoint`.
 *
 * Starts false so server and first client render agree (avoids hydration
 * mismatch), then syncs on mount and on every resize.
 *
 * @param {number} breakpoint - max-width in px considered "mobile" (default 768)
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
