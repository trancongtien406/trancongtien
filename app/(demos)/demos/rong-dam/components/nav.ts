/** Cuộn tới Itinerary Explorer và chuyển focus vào tiêu đề; tôn trọng prefers-reduced-motion. */
export function goToExplorer() {
  if (typeof window === "undefined") return;
  const el = document.getElementById("itinerary");
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.setTimeout(() => {
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    const h = el.querySelector<HTMLElement>("[data-focus-target]");
    h?.focus({ preventScroll: true });
  }, 30);
}
