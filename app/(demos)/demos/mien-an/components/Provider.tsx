"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Pressure, Scent } from "../data/types";
import { getOil, type OilId } from "../data/oils";

type Selection = { ritualId: string | null; pressure: Pressure | null; scent: Scent | null; nonce: number };
type Ctx = {
  selection: Selection;
  detailId: string | null;
  openDetail: (id: string) => void;
  closeDetail: () => void;
  /** Chọn liệu trình → điền sẵn lịch hẹn rồi cuộn tới đó. */
  choose: (id: string, opts?: { pressure?: Pressure | null; scent?: Scent | null }) => void;
  /** Tinh dầu đang chọn: đổi tông màu cả trang và điền vào tóm tắt lịch hẹn. */
  oil: OilId | null;
  setOil: (id: OilId | null) => void;
};

const MienAnContext = createContext<Ctx | null>(null);

export function useMienAn() {
  const c = useContext(MienAnContext);
  if (!c) throw new Error("useMienAn phải nằm trong MienAnProvider");
  return c;
}

const TONE_VARS = ["--ma-ivory", "--ma-linen", "--ma-olive", "--ma-forest", "--ma-bronze"] as const;

export function MienAnProvider({ children }: { children: React.ReactNode }) {
  const [selection, setSelection] = useState<Selection>({ ritualId: null, pressure: null, scent: null, nonce: 0 });
  const [detailId, setDetailId] = useState<string | null>(null);
  const [oil, setOil] = useState<OilId | null>(null);

  // Đổi tông trang: ghi đè token màu trên gốc thương hiệu (transition CSS lo phần chuyển).
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-ma-root]");
    if (!root) return;
    const o = getOil(oil);
    if (!o) {
      TONE_VARS.forEach((v) => root.style.removeProperty(v));
      delete root.dataset.oil;
      return;
    }
    root.style.setProperty("--ma-ivory", o.tone.ivory);
    root.style.setProperty("--ma-linen", o.tone.linen);
    root.style.setProperty("--ma-olive", o.tone.olive);
    root.style.setProperty("--ma-forest", o.tone.forest);
    root.style.setProperty("--ma-bronze", o.tone.bronze);
    root.dataset.oil = o.id;
  }, [oil]);

  const choose = useCallback<Ctx["choose"]>((id, opts) => {
    setSelection((s) => ({ ritualId: id, pressure: opts?.pressure ?? null, scent: opts?.scent ?? null, nonce: s.nonce + 1 }));
    setDetailId(null);
    // chờ dialog đóng rồi mới cuộn
    window.setTimeout(() => {
      const el = document.getElementById("appointment");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      document.getElementById("ap-heading")?.focus({ preventScroll: true });
    }, 140);
  }, []);

  const value = useMemo<Ctx>(
    () => ({ selection, detailId, openDetail: setDetailId, closeDetail: () => setDetailId(null), choose, oil, setOil }),
    [selection, detailId, choose, oil],
  );
  return <MienAnContext.Provider value={value}>{children}</MienAnContext.Provider>;
}
