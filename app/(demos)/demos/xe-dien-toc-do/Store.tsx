"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { BASE, INTERIORS, PAINTS, WHEELS } from "./data";

type Ctx = {
  paint: number; wheel: number; interior: number;
  setPaint: (n: number) => void; setWheel: (n: number) => void; setInterior: (n: number) => void;
  setAll: (p: number, w: number, i: number) => void;
  total: number; code: string;
  drawer: boolean; openDrawer: () => void; closeDrawer: () => void;
};
const C = createContext<Ctx | null>(null);

export function BuildProvider({ children }: { children: React.ReactNode }) {
  const [paint, setPaint] = useState(0);
  const [wheel, setWheel] = useState(1);
  const [interior, setInterior] = useState(0);
  const [drawer, setDrawer] = useState(false);
  const v = useMemo<Ctx>(() => ({
    paint, wheel, interior, setPaint, setWheel, setInterior,
    setAll: (p, w, i) => { setPaint(p); setWheel(w); setInterior(i); },
    total: BASE + PAINTS[paint].add + WHEELS[wheel].add + INTERIORS[interior].add,
    code: `${PAINTS[paint].id}-${WHEELS[wheel].id}-${INTERIORS[interior].id}`,
    drawer, openDrawer: () => setDrawer(true), closeDrawer: () => setDrawer(false),
  }), [paint, wheel, interior, drawer]);
  return <C.Provider value={v}>{children}</C.Provider>;
}
export function useBuild() {
  const v = useContext(C);
  if (!v) throw new Error("BuildProvider missing");
  return v;
}
