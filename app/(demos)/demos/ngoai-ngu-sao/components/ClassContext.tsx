"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Lang, Slot } from "../data/content";

export type Filters = { lang: Lang | "all"; level: number; slot: Slot | "all" };
type Ctx = {
  filters: Filters;
  setFilters: (f: Filters) => void;
  selected: string | null;
  setSelected: (id: string | null) => void;
};
const C = createContext<Ctx | null>(null);

/** Trạng thái lớp đang xem, dùng chung giữa lịch khai giảng, thời khoá biểu và bài kiểm tra đầu vào. */
export function ClassProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<Filters>({ lang: "all", level: 0, slot: "all" });
  const [selected, setSelected] = useState<string | null>(null);
  const v = useMemo(() => ({ filters, setFilters, selected, setSelected }), [filters, selected]);
  return <C.Provider value={v}>{children}</C.Provider>;
}
export function useClasses() {
  const c = useContext(C);
  if (!c) throw new Error("ClassProvider missing");
  return c;
}
