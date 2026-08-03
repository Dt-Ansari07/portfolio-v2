"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref + boolean flag that flips to `true` once the element has
 * scrolled into view. Used instead of a full animation library for simple
 * fade-up reveals to keep the client bundle small.
 *
 * Note on reduced motion: we don't special-case it here. The global
 * `prefers-reduced-motion` media query in globals.css already collapses
 * every animation/transition duration to ~0, so once IntersectionObserver
 * flips `inView` (which happens immediately for already-visible elements)
 * the content simply appears without a visible slide/fade for those users.
 */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView } as const;
}
