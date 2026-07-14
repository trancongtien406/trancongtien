"use client";

import { useEffect, useState } from "react";

/** Detect viewport below a Tailwind-like breakpoint (default: lg = 1024). */
export function useMediaQuery(query = "(max-width: 1023px)") {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
