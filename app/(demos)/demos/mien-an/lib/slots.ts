import { BUFFER_MINUTES, BUSY, CLOSE_MINUTES, LEAD_MINUTES, OPEN_MINUTES, RESOURCES, SLOT_STEP, WINDOW_DAYS } from "../data/rituals";
import type { BookingResource, MockBusyInterval, Ritual } from "../data/types";
import { diffDays, type VnNow } from "./vietnam-time";

export type Slot = { startMinutes: number; resourceId: string };

/** Slot khả dụng của một ngày. `preferredResourceId` giới hạn theo kỹ thuật viên đã chọn. */
export function getAvailableSlots(
  ritual: Ritual,
  dayOffset: number,
  now: VnNow,
  isToday: boolean,
  preferredResourceId: string | "auto" = "auto",
  resources: readonly BookingResource[] = RESOURCES,
  busy: readonly MockBusyInterval[] = BUSY,
): Slot[] {
  const earliest = isToday ? now.minutes + LEAD_MINUTES : 0;
  const out: Slot[] = [];
  const pool = resources
    .filter((r) => r.supportedRitualIds.includes(ritual.id) && (preferredResourceId === "auto" || r.id === preferredResourceId))
    .sort((a, b) => a.id.localeCompare(b.id));
  for (let start = OPEN_MINUTES; start < CLOSE_MINUTES; start += SLOT_STEP) {
    if (start < earliest) continue;
    const end = start + ritual.durationMinutes + BUFFER_MINUTES;
    if (end > CLOSE_MINUTES) continue;
    const found = pool.find(
      (r) => !busy.some((b) => b.dayOffset === dayOffset && b.resourceId === r.id && start < b.endMinutes && end > b.startMinutes),
    );
    if (found) out.push({ startMinutes: start, resourceId: found.id });
  }
  return out;
}

export function dayOffsetOf(today: string, date: string) {
  return diffDays(today, date);
}

export const isDateInWindow = (offset: number) => offset >= 0 && offset < WINDOW_DAYS;
