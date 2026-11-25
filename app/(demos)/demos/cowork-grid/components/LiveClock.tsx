"use client";

import { useEffect, useState } from "react";
import { vnNow } from "../lib/seatmap";

const pad = (n: number) => String(n).padStart(2, "0");

/** Đồng hồ giờ Đà Nẵng (UTC+7) chạy thật mỗi giây. Hiện "--:--:--" tới khi hydrate để không lệch SSR. */
export function LiveClock({ className, seconds = true, prefix = "ĐN" }: { className?: string; seconds?: boolean; prefix?: string }) {
  const [t, setT] = useState<string | null>(null);
  useEffect(() => {
    const f = () => {
      const n = vnNow();
      setT(`${pad(n.hour)}:${pad(n.minute)}${seconds ? `:${pad(n.second)}` : ""}`);
    };
    f();
    const id = window.setInterval(f, seconds ? 1000 : 15000);
    return () => window.clearInterval(id);
  }, [seconds]);
  return (
    <span className={className} translate="no">
      {prefix} <time suppressHydrationWarning dateTime={t ?? undefined}>{t ?? (seconds ? "--:--:--" : "--:--")}</time>
    </span>
  );
}
