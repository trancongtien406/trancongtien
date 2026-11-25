"use client";

import { useEffect } from "react";

/** Root layout của site chính cố định lang="vi": bản EN đặt lại lang trên <html> khi chạy và trả lại khi rời trang. */
export function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.lang;
    el.lang = lang;
    return () => {
      el.lang = prev;
    };
  }, [lang]);
  return null;
}
