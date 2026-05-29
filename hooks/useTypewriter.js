import { useEffect, useState } from "react";

/**
 * useTypewriter
 * Cycles through an array of strings with a typewriter effect.
 *
 * @param {string[]} words - array of strings to cycle through
 * @param {number} typeSpeed - ms per character when typing (default 80)
 * @param {number} deleteSpeed - ms per character when deleting (default 40)
 * @param {number} pauseMs - ms to pause at full word before deleting (default 1800)
 */
export function useTypewriter(
  words,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseMs = 1800
) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const current = words[wordIndex % words.length];

    let timeout;

    if (!isDeleting && displayed === current) {
      // Full word shown — pause then start deleting
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && displayed === "") {
      // Fully deleted — move to next word
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      const speed = isDeleting ? deleteSpeed : typeSpeed;
      timeout = setTimeout(() => {
        setDisplayed(
          isDeleting
            ? current.slice(0, displayed.length - 1)
            : current.slice(0, displayed.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseMs]);

  return displayed;
}
