"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { MAX_LINE_QTY, MAX_TRAY_QTY, MENU_MAP, type Temperature } from "../data/menu";

export type TrayLine = { productId: string; temperature: Temperature; quantity: number };
type State = { lines: TrayLine[] };
type Action =
  | { type: "add"; productId: string; temperature: Temperature }
  | { type: "qty"; productId: string; temperature: Temperature; delta: number }
  | { type: "remove"; productId: string; temperature: Temperature }
  | { type: "clear" }
  | { type: "restore"; lines: TrayLine[] };

export const STORAGE_KEY = "rn:tray:v1";
const total = (lines: TrayLine[]) => lines.reduce((n, l) => n + l.quantity, 0);

/** Làm sạch dữ liệu từ localStorage: bỏ ID lạ, nhiệt độ sai, gộp trùng, kẹp số lượng. */
export function sanitize(raw: unknown): TrayLine[] {
  if (!raw || typeof raw !== "object" || (raw as { version?: number }).version !== 1) return [];
  const items = (raw as { items?: unknown }).items;
  if (!Array.isArray(items)) return [];
  const map = new Map<string, TrayLine>();
  let sum = 0;
  for (const it of items) {
    const p = MENU_MAP.get(String(it?.productId));
    const t = it?.temperature as Temperature;
    if (!p || !p.temperatures.includes(t)) continue;
    const key = `${p.id}:${t}`;
    const q = Math.max(1, Math.min(MAX_LINE_QTY, Math.floor(Number(it?.quantity) || 0)));
    const prev = map.get(key)?.quantity ?? 0;
    const next = Math.min(MAX_LINE_QTY, prev + q, prev + q);
    const allowed = Math.min(next, MAX_TRAY_QTY - (sum - prev));
    if (allowed <= 0) continue;
    sum += allowed - prev;
    map.set(key, { productId: p.id, temperature: t, quantity: allowed });
  }
  return [...map.values()];
}

function reducer(state: State, a: Action): State {
  switch (a.type) {
    case "restore": return { lines: a.lines };
    case "clear": return { lines: [] };
    case "remove": return { lines: state.lines.filter((l) => !(l.productId === a.productId && l.temperature === a.temperature)) };
    case "add":
    case "qty": {
      const delta = a.type === "add" ? 1 : a.delta;
      const idx = state.lines.findIndex((l) => l.productId === a.productId && l.temperature === a.temperature);
      if (idx === -1) return delta > 0 && total(state.lines) < MAX_TRAY_QTY ? { lines: [...state.lines, { productId: a.productId, temperature: a.temperature, quantity: 1 }] } : state;
      const cur = state.lines[idx];
      const q = cur.quantity + delta;
      if (q <= 0) return { lines: state.lines.filter((_, i) => i !== idx) };
      if (q > MAX_LINE_QTY || total(state.lines) + delta > MAX_TRAY_QTY) return state;
      return { lines: state.lines.map((l, i) => (i === idx ? { ...l, quantity: q } : l)) };
    }
  }
}

export type AddResult = "ok" | "line-limit" | "tray-limit";
type Ctx = {
  lines: TrayLine[]; count: number; subtotal: number; open: boolean; storageError: boolean; message: string;
  add: (id: string, t: Temperature) => AddResult; changeQty: (id: string, t: Temperature, d: number) => void;
  remove: (id: string, t: Temperature) => void; clear: () => void; openTray: () => void; closeTray: () => void; say: (m: string) => void;
};
const TrayCtx = createContext<Ctx | null>(null);
export const useTray = () => {
  const c = useContext(TrayCtx);
  if (!c) throw new Error("useTray ngoài TrayProvider");
  return c;
};

export function TrayProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [open, setOpen] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [message, setMessage] = useState("");
  const loaded = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "restore", lines: sanitize(JSON.parse(raw)) });
    } catch { /* JSON hỏng hoặc bị chặn: bỏ qua */ }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, items: state.lines }));
      queueMicrotask(() => setStorageError(false));
    } catch { queueMicrotask(() => setStorageError(true)); }
  }, [state.lines]);

  const say = useCallback((m: string) => {
    setMessage(m);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(""), 2400);
  }, []);

  const value = useMemo<Ctx>(() => {
    const count = total(state.lines);
    const subtotal = state.lines.reduce((s, l) => s + (MENU_MAP.get(l.productId)?.priceVnd ?? 0) * l.quantity, 0);
    return {
      lines: state.lines, count, subtotal, open, storageError, message,
      add: (id, t) => {
        const line = state.lines.find((l) => l.productId === id && l.temperature === t);
        if (count >= MAX_TRAY_QTY) { say("Khay chứa tối đa 30 ly."); return "tray-limit"; }
        if (line && line.quantity >= MAX_LINE_QTY) { say("Mỗi lựa chọn tối đa 9 ly."); return "line-limit"; }
        dispatch({ type: "add", productId: id, temperature: t });
        say("Đã thêm vào khay.");
        return "ok";
      },
      changeQty: (id, t, d) => {
        const line = state.lines.find((l) => l.productId === id && l.temperature === t);
        if (d > 0 && count >= MAX_TRAY_QTY) return say("Khay chứa tối đa 30 ly.");
        if (d > 0 && line && line.quantity >= MAX_LINE_QTY) return say("Mỗi lựa chọn tối đa 9 ly.");
        dispatch({ type: "qty", productId: id, temperature: t, delta: d });
      },
      remove: (id, t) => dispatch({ type: "remove", productId: id, temperature: t }),
      clear: () => dispatch({ type: "clear" }),
      openTray: () => setOpen(true),
      closeTray: () => setOpen(false),
      say,
    };
  }, [state.lines, open, storageError, message, say]);

  return <TrayCtx.Provider value={value}>{children}</TrayCtx.Provider>;
}
