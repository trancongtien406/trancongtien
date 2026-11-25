import type { Tour } from "../data/tours";

export const MAX_GUESTS = 12;
export type Guests = { adults: number; children: number; singleRooms: number; includeAdmission: boolean };
export type Breakdown = {
  adultService: number; childService: number; serviceSubtotal: number;
  adultAdmission: number; childAdmission: number; admissionSubtotal: number;
  roomSupplement: number; grandTotal: number; displayedTotal: number;
};
export type PriceResult = { ok: true; value: Breakdown } | { ok: false; error: "adults" | "total" | "children" | "rooms" | "integer" };

const isInt = (n: unknown): n is number => typeof n === "number" && Number.isInteger(n);

/** Tiền là số nguyên VND. Trả lỗi thay vì tính ra NaN hay số âm. */
export function calculateTripPrice(tour: Tour, g: Guests): PriceResult {
  if (!isInt(g.adults) || !isInt(g.children) || !isInt(g.singleRooms)) return { ok: false, error: "integer" };
  if (g.adults < 1) return { ok: false, error: "adults" };
  if (g.children < 0) return { ok: false, error: "children" };
  if (g.adults + g.children > MAX_GUESTS) return { ok: false, error: "total" };
  if (g.singleRooms < 0 || g.singleRooms > g.adults) return { ok: false, error: "rooms" };
  const p = tour.pricing;
  const adultService = g.adults * p.adultBase;
  const childService = g.children * p.childBase;
  const serviceSubtotal = adultService + childService;
  const adultAdmission = g.adults * p.adultAdmission;
  const childAdmission = g.children * p.childAdmission;
  const admissionSubtotal = adultAdmission + childAdmission;
  const roomSupplement = g.singleRooms * p.singleRoomSupplement;
  const grandTotal = serviceSubtotal + admissionSubtotal + roomSupplement;
  const displayedTotal = serviceSubtotal + roomSupplement + (g.includeAdmission ? admissionSubtotal : 0);
  return { ok: true, value: { adultService, childService, serviceSubtotal, adultAdmission, childAdmission, admissionSubtotal, roomSupplement, grandTotal, displayedTotal } };
}
