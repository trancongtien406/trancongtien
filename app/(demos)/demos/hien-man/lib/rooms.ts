export type RoomId = "bien-go" | "hien-sang" | "suite-ho-boi" | "tron-villa";

export interface RoomType {
  id: RoomId;
  name: string;
  /** số phòng (đơn vị tồn kho) thuộc loại này */
  units: number;
  /** số khách đã gồm trong giá */
  baseGuests: number;
  /** số khách tối đa cho một đơn vị */
  maxGuests: number;
  /** giá tham khảo giả định, VND/đêm, mùa thường, ngày thường */
  basePrice: number;
  /** phụ thu mỗi khách thêm / đêm */
  extraGuestFee: number;
  /** lưu trú tối thiểu mặc định (đêm) */
  minNights: number;
}

/** Giá tham khảo giả định. Tổng 3+2+2 = 7 phòng; "bao trọn" dùng cả 7 phòng. */
export const ROOMS: readonly RoomType[] = [
  { id: "bien-go", name: "Hiên Biển", units: 3, baseGuests: 2, maxGuests: 3, basePrice: 2_400_000, extraGuestFee: 350_000, minNights: 1 },
  { id: "hien-sang", name: "Hiên Bình Minh", units: 2, baseGuests: 2, maxGuests: 3, basePrice: 3_100_000, extraGuestFee: 350_000, minNights: 1 },
  { id: "suite-ho-boi", name: "Suite Hồ Bơi", units: 2, baseGuests: 2, maxGuests: 4, basePrice: 4_600_000, extraGuestFee: 400_000, minNights: 1 },
  { id: "tron-villa", name: "Bao trọn villa", units: 1, baseGuests: 12, maxGuests: 16, basePrice: 19_800_000, extraGuestFee: 450_000, minNights: 2 },
] as const;

export function getRoom(id: RoomId): RoomType {
  const r = ROOMS.find((x) => x.id === id);
  if (!r) throw new Error(`Unknown room ${id}`);
  return r;
}
