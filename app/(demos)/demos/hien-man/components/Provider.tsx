"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import type { ISODate } from "../lib/dates";
import { computeQuote, type QuoteResult } from "../lib/pricing";
import { getRoom, type RoomId } from "../lib/rooms";
import { applyDayClick } from "../lib/selection";

interface State {
  room: RoomId;
  qty: number;
  guests: number;
  checkIn: ISODate | null;
  checkOut: ISODate | null;
  notice: string | null;
  saved: boolean;
}

type Action =
  | { type: "room"; room: RoomId }
  | { type: "qty"; qty: number }
  | { type: "guests"; guests: number }
  | { type: "day"; day: ISODate }
  | { type: "range"; checkIn: ISODate; checkOut: ISODate }
  | { type: "clear" }
  | { type: "restore"; s: Pick<State, "room" | "qty" | "guests" | "checkIn" | "checkOut"> }
  | { type: "saved"; value: boolean }
  | { type: "dismiss" };

const initial: State = { room: "bien-go", qty: 1, guests: 2, checkIn: null, checkOut: null, notice: null, saved: false };

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "room": {
      const t = getRoom(a.room);
      const qty = a.room === "tron-villa" ? 1 : Math.min(s.qty, t.units);
      // giữ số khách người dùng đã nhập; công cụ tính sẽ báo lỗi nếu vượt sức chứa, không tự giảm.
      const guests = a.room === "tron-villa" && s.guests < 8 ? 12 : s.guests;
      return { ...s, room: a.room, qty, guests, notice: null };
    }
    case "qty":
      return { ...s, qty: a.qty, notice: null };
    case "guests":
      return { ...s, guests: a.guests, notice: null };
    case "day": {
      const r = applyDayClick(s.room, { checkIn: s.checkIn, checkOut: s.checkOut }, a.day);
      return { ...s, checkIn: r.checkIn, checkOut: r.checkOut, notice: r.notice };
    }
    case "range":
      return { ...s, checkIn: a.checkIn, checkOut: a.checkOut, notice: null };
    case "restore":
      return { ...s, ...a.s, notice: null, saved: true };
    case "saved":
      return { ...s, saved: a.value };
    case "clear":
      return { ...s, checkIn: null, checkOut: null, notice: null };
    case "dismiss":
      return { ...s, notice: null };
  }
}

interface Ctx extends State {
  quote: QuoteResult;
  setRoom: (r: RoomId) => void;
  setQty: (n: number) => void;
  setGuests: (n: number) => void;
  clickDay: (d: ISODate) => void;
  setRange: (ci: ISODate, co: ISODate) => void;
  clear: () => void;
  dismiss: () => void;
  hasSaved: boolean;
  savePlan: () => boolean;
  forgetPlan: () => void;
}

const KEY = "hien-man:stay-plan:v1";

const StayContext = createContext<Ctx | null>(null);

export function StayProvider({ children }: { children: React.ReactNode }) {
  const [s, dispatch] = useReducer(reducer, initial);
  const quote = useMemo(() => computeQuote({ room: s.room, checkIn: s.checkIn, checkOut: s.checkOut, guests: s.guests, qty: s.qty }), [s.room, s.checkIn, s.checkOut, s.guests, s.qty]);
  const setRoom = useCallback((room: RoomId) => dispatch({ type: "room", room }), []);
  const setQty = useCallback((qty: number) => dispatch({ type: "qty", qty }), []);
  const setGuests = useCallback((guests: number) => dispatch({ type: "guests", guests }), []);
  const clickDay = useCallback((day: ISODate) => dispatch({ type: "day", day }), []);
  const setRange = useCallback((checkIn: ISODate, checkOut: ISODate) => dispatch({ type: "range", checkIn, checkOut }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);
  const dismiss = useCallback(() => dispatch({ type: "dismiss" }), []);

  // Khôi phục kế hoạch đã lưu sau hydrate; chỉ nhận nếu dữ liệu hợp lệ (tính lại giá, không lưu tổng tiền).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (!raw) return;
      const p = JSON.parse(raw) as { v?: number; room?: RoomId; qty?: number; guests?: number; checkIn?: string; checkOut?: string };
      if (p.v !== 1 || !p.room || !p.checkIn || !p.checkOut || typeof p.qty !== "number" || typeof p.guests !== "number") return;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(p.checkIn) || !/^\d{4}-\d{2}-\d{2}$/.test(p.checkOut)) return;
      const r = computeQuote({ room: p.room, checkIn: p.checkIn, checkOut: p.checkOut, guests: p.guests, qty: p.qty });
      if (!r.ok) { window.localStorage.removeItem(KEY); return; }
      dispatch({ type: "restore", s: { room: p.room, qty: p.qty, guests: p.guests, checkIn: p.checkIn, checkOut: p.checkOut } });
    } catch { /* localStorage bị chặn: bỏ qua */ }
  }, []);

  const savePlan = useCallback(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify({ v: 1, room: s.room, qty: s.qty, guests: s.guests, checkIn: s.checkIn, checkOut: s.checkOut }));
      dispatch({ type: "saved", value: true });
      return true;
    } catch { return false; }
  }, [s.room, s.qty, s.guests, s.checkIn, s.checkOut]);
  const forgetPlan = useCallback(() => {
    try { window.localStorage.removeItem(KEY); } catch { /* bỏ qua */ }
    dispatch({ type: "saved", value: false });
  }, []);
  const value = useMemo(() => ({ ...s, hasSaved: s.saved, quote, setRoom, setQty, setGuests, clickDay, setRange, clear, dismiss, savePlan, forgetPlan }), [s, quote, setRoom, setQty, setGuests, clickDay, setRange, clear, dismiss, savePlan, forgetPlan]);
  return <StayContext.Provider value={value}>{children}</StayContext.Provider>;
}

export function useStay(): Ctx {
  const c = useContext(StayContext);
  if (!c) throw new Error("useStay phải nằm trong StayProvider");
  return c;
}
