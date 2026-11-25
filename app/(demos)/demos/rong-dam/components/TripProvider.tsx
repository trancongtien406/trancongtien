"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { getTour, isTourId, type Companion, type Interest, type Lang, type TourId } from "../data/tours";
import type { DurationOption } from "../lib/finder";
import { BUDGET_MAX, BUDGET_MIN, MAX_INTERESTS } from "../lib/finder";
import { MAX_GUESTS } from "../lib/pricing";

export type FinderForm = { duration: DurationOption | null; maxBudget: number; interests: Interest[]; companion: Companion | null };
export type TripState = {
  tourId: TourId; dayId: string; stopId: string | null;
  adults: number; children: number; singleRooms: number; includeAdmission: boolean; showMap: boolean;
  finder: FinderForm; submitted: FinderForm | null;
};
export const DEFAULT_STATE: TripState = {
  tourId: "RD-01", dayId: "day-1", stopId: null, adults: 2, children: 0, singleRooms: 0, includeAdmission: true, showMap: true,
  finder: { duration: null, maxBudget: 1500000, interests: [], companion: null }, submitted: null,
};

const KEY = "rd-state-v1";
const DURS = ["half-day", "one-day", "two-days", "three-plus"];
const INTS = ["nature", "culture", "food", "photography", "relaxation"];
const COMPS = ["solo", "couple", "family", "friends"];
const int = (v: unknown, lo: number, hi: number, d: number) => (typeof v === "number" && Number.isInteger(v) && v >= lo && v <= hi ? v : d);

function parseForm(f: unknown): FinderForm | null {
  if (!f || typeof f !== "object") return null;
  const o = f as Record<string, unknown>;
  return {
    duration: typeof o.duration === "string" && DURS.includes(o.duration) ? (o.duration as DurationOption) : null,
    maxBudget: int(o.maxBudget, BUDGET_MIN, BUDGET_MAX, 1500000),
    interests: Array.isArray(o.interests) ? (o.interests.filter((x) => typeof x === "string" && INTS.includes(x)).slice(0, MAX_INTERESTS) as Interest[]) : [],
    companion: typeof o.companion === "string" && COMPS.includes(o.companion) ? (o.companion as Companion) : null,
  };
}

/** Dữ liệu từ storage luôn được kiểm lại: ID tour/ngày sai thì về mặc định, số khách sai thì về mặc định. */
export function sanitize(raw: unknown): TripState {
  if (!raw || typeof raw !== "object") return DEFAULT_STATE;
  const o = raw as Record<string, unknown>;
  const tour = getTour(isTourId(o.tourId) ? o.tourId : null);
  const day = tour.days.find((d) => d.id === o.dayId) ?? tour.days[0];
  const stop = day.stops.find((s) => s.id === o.stopId);
  let adults = int(o.adults, 1, MAX_GUESTS, 2);
  let children = int(o.children, 0, MAX_GUESTS - 1, 0);
  if (adults + children > MAX_GUESTS) { adults = 2; children = 0; }
  const rooms = tour.pricing.singleRoomSupplement > 0 ? int(o.singleRooms, 0, adults, 0) : 0;
  return {
    tourId: tour.id, dayId: day.id, stopId: stop ? stop.id : null, adults, children, singleRooms: rooms,
    includeAdmission: o.includeAdmission !== false, showMap: o.showMap !== false,
    finder: parseForm(o.finder) ?? DEFAULT_STATE.finder, submitted: parseForm(o.submitted),
  };
}

type Ctx = {
  lang: Lang; state: TripState; hydrated: boolean;
  patch: (p: Partial<TripState>) => void;
  selectTour: (id: TourId) => void;
  setFinder: (p: Partial<FinderForm>) => void;
  reset: () => void;
};
const TripCtx = createContext<Ctx | null>(null);
export const useTrip = () => {
  const c = useContext(TripCtx);
  if (!c) throw new Error("TripProvider thiếu");
  return c;
};

export function TripProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const [state, setState] = useState<TripState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setState(sanitize(JSON.parse(raw)));
    } catch { /* storage lỗi: dùng mặc định */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (first.current) { first.current = false; }
    try { window.localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* bỏ qua */ }
  }, [state, hydrated]);

  const patch = useCallback((p: Partial<TripState>) => setState((s) => sanitize({ ...s, ...p })), []);
  const selectTour = useCallback((id: TourId) => {
    setState((s) => sanitize({ ...s, tourId: id, dayId: "day-1", stopId: null, singleRooms: 0 }));
  }, []);
  const setFinder = useCallback((p: Partial<FinderForm>) => setState((s) => ({ ...s, finder: { ...s.finder, ...p } })), []);
  const reset = useCallback(() => setState((s) => ({ ...s, finder: DEFAULT_STATE.finder, submitted: null })), []);

  const value = useMemo(() => ({ lang, state, hydrated, patch, selectTour, setFinder, reset }), [lang, state, hydrated, patch, selectTour, setFinder, reset]);
  return <TripCtx.Provider value={value}>{children}</TripCtx.Provider>;
}
