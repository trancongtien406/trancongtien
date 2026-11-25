"use client";
import { useSyncExternalStore } from "react";

/** Media query an toàn SSR: server luôn trả `false`, client cập nhật sau hydrate. */
export function useMedia(query: string): boolean {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
