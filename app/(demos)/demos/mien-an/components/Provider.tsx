"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Pressure, Scent } from "../data/types";

type Selection = { ritualId: string | null; pressure: Pressure | null; scent: Scent | null; nonce: number };
type Ctx = {
  selection: Selection;
  detailId: string | null;
  openDetail: (id: string) => void;
  closeDetail: () => void;
  /** Chọn nghi thức → điền sẵn Appointment Preview rồi cuộn tới đó. */
  choose: (id: string, opts?: { pressure?: Pressure | null; scent?: Scent | null }) => void;
};

const MienAnContext = createContext<Ctx | null>(null);

export function useMienAn() {
  const c = useContext(MienAnContext);
  if (!c) throw new Error("useMienAn phải nằm trong MienAnProvider");
  return c;
}

export function MienAnProvider({ children }: { children: React.ReactNode }) {
  const [selection, setSelection] = useState<Selection>({ ritualId: null, pressure: null, scent: null, nonce: 0 });
  const [detailId, setDetailId] = useState<string | null>(null);

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
    () => ({ selection, detailId, openDetail: setDetailId, closeDetail: () => setDetailId(null), choose }),
    [selection, detailId, choose],
  );
  return <MienAnContext.Provider value={value}>{children}</MienAnContext.Provider>;
}
