"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { AssistantBotIcon } from "@/components/floating/AssistantBotIcon";
import { EstimatorApp } from "@/features/estimator/EstimatorApp";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const OPEN_ESTIMATE_CHAT_EVENT = "open-estimate-chat";

export function openEstimateChat(productKey?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(OPEN_ESTIMATE_CHAT_EVENT, { detail: { productKey } }),
  );
}

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
  const searchParams = useSearchParams();
  const queryProduct = searchParams.get("product") || undefined;

  const [scrollVisible, setScrollVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMounted, setChatMounted] = useState(false);
  const [sessionNonce, setSessionNonce] = useState(0);
  const [productKey, setProductKey] = useState<string | undefined>(queryProduct);

  useEffect(() => {
    const onScroll = () => setScrollVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const open = (event: Event) => {
      const detail = (event as CustomEvent<{ productKey?: string }>).detail;
      if (detail?.productKey) setProductKey(detail.productKey);
      setChatMounted(true);
      setChatOpen(true);
    };
    window.addEventListener(OPEN_ESTIMATE_CHAT_EVENT, open);
    return () => window.removeEventListener(OPEN_ESTIMATE_CHAT_EVENT, open);
  }, []);

  function openChat() {
    setProductKey(queryProduct);
    setChatMounted(true);
    setChatOpen(true);
  }

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-60 sm:bottom-6 sm:right-6">
      {chatMounted ? (
        <div
          className={cn(
            "pointer-events-auto flex h-[min(32rem,calc(100dvh-5.5rem))] w-[min(22.5rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-ink/20",
            !chatOpen && "hidden",
          )}
          role="dialog"
          aria-label="Trợ lý ước tính dự án"
          aria-hidden={!chatOpen}
        >
          <EstimatorApp
            variant="widget"
            active={chatOpen}
            sessionNonce={sessionNonce}
            initialProductKey={productKey}
            onClose={() => setChatOpen(false)}
            onRestart={() => setSessionNonce((n) => n + 1)}
          />
        </div>
      ) : null}

      {!chatOpen ? (
        <div className="pointer-events-none flex flex-col items-end gap-3">
          <button
            type="button"
            onClick={openChat}
            aria-label="Mở trợ lý ước tính dự án"
            className="pointer-events-auto relative size-14 overflow-hidden rounded-full shadow-lg shadow-brand/35 transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <span className="absolute -right-0.5 -top-0.5 z-10 size-3 rounded-full bg-emerald-500 ring-2 ring-surface" />
            <AssistantBotIcon className="size-14 animate-bot-bob" />
          </button>

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
              scrollVisible
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-3 opacity-0",
            )}
          >
            <ArrowUp className="size-5" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
