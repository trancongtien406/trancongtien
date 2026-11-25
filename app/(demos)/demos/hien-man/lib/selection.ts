import { type ISODate, compareISO, formatVN } from "./dates";
import { blockedNights, DEMO_TODAY, isNightAvailable } from "./availability";
import type { RoomId } from "./rooms";

export interface Range {
  checkIn: ISODate | null;
  checkOut: ISODate | null;
}

export interface ClickResult extends Range {
  /** thông báo lỗi/gợi ý (null nếu không có) */
  notice: string | null;
}

/** Ngày kín vẫn có thể chọn làm NGÀY TRẢ PHÒNG nếu mọi đêm trước đó trống. */
export function canCheckout(room: RoomId, checkIn: ISODate | null, day: ISODate, today: ISODate = DEMO_TODAY): boolean {
  if (!checkIn || compareISO(day, checkIn) <= 0) return false;
  return blockedNights(room, checkIn, day, today).length === 0;
}

/**
 * Luật chọn khoảng ngày bằng hai lần bấm:
 * - Chưa có ngày nhận, hoặc đã đủ khoảng: bấm một đêm trống để bắt đầu khoảng mới.
 * - Đã có ngày nhận: bấm ngày sau đó để chốt trả phòng; bấm ngày trước/bằng thì dời ngày nhận.
 * - Khoảng chứa đêm kín bị từ chối, giữ ngày nhận và báo ngày kín đầu tiên.
 */
export function applyDayClick(room: RoomId, current: Range, day: ISODate, today: ISODate = DEMO_TODAY): ClickResult {
  const startNew = !current.checkIn || !!current.checkOut;
  if (startNew) {
    if (!isNightAvailable(room, day, today)) return { ...current, notice: `Đêm ${formatVN(day)} đã kín hoặc không mở đặt. Hãy chọn ngày khác.` };
    return { checkIn: day, checkOut: null, notice: null };
  }
  const ci = current.checkIn as ISODate;
  if (compareISO(day, ci) <= 0) {
    if (!isNightAvailable(room, day, today)) return { ...current, notice: `Đêm ${formatVN(day)} đã kín hoặc không mở đặt. Hãy chọn ngày khác.` };
    return { checkIn: day, checkOut: null, notice: null };
  }
  const blocked = blockedNights(room, ci, day, today);
  if (blocked.length) {
    return { checkIn: ci, checkOut: null, notice: `Khoảng này có đêm đã kín (${formatVN(blocked[0])}). Chọn ngày trả phòng sớm hơn hoặc đổi loại phòng.` };
  }
  return { checkIn: ci, checkOut: day, notice: null };
}
