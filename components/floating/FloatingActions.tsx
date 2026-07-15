"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

function ZaloIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="24" cy="24" r="24" fill="#0068FF" />
      <path
        fill="#fff"
        d="M14.5 31.2c-.4 1.3.8 2.3 2 1.8l4.4-1.8c1.2.4 2.5.6 3.9.6 7.3 0 13.2-5 13.2-11.2S32.1 9.4 24.8 9.4 11.6 14.4 11.6 20.6c0 2.5.9 4.8 2.5 6.6l.4 3.999z"
        opacity=".15"
      />
      <text
        x="24"
        y="28"
        textAnchor="middle"
        fill="#fff"
        fontSize="14"
        fontWeight="800"
        fontFamily="system-ui,sans-serif"
      >
        Zalo
      </text>
    </svg>
  );
}

export function FloatingActions({
  zaloUrl = siteConfig.social.zalo,
}: {
  zaloUrl?: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-60 flex flex-col items-center gap-3 sm:bottom-7 sm:right-6">
      <a
        href={zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo với Trần Công Tiến"
        className="pointer-events-auto animate-zalo-shake rounded-full shadow-lg shadow-blue-500/40 transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <ZaloIcon className="size-14" />
      </a>
      <button
        type="button"
        aria-label="Cuộn lên đầu trang"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "pointer-events-auto inline-flex size-11 items-center justify-center rounded-full border border-border bg-white text-ink shadow-lg transition",
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <ArrowUp className="size-5" />
      </button>
    </div>
  );
}
