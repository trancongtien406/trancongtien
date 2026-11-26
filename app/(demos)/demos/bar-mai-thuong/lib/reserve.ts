export const ZONES = [
  { id: "san-thuong", name: "Sân thượng mở", note: "40 chỗ, ngoài trời, nhìn thành phố lên đèn. Hợp nhóm nhỏ, tối trời đẹp." },
  { id: "hien-kinh", name: "Hiên kính", note: "24 chỗ, có mái, kính chắn gió. Hợp khi trời nhiều gió." },
  { id: "quay-bar", name: "Quầy bar", note: "8 ghế, 1-3 người, ghế còn lại ưu tiên khách đến sớm." },
  { id: "goc-neon", name: "Góc neon", note: "18 chỗ, sofa dưới đèn hồng-cyan, nhóm 4-8 người." },
] as const;
export type ZoneId = (typeof ZONES)[number]["id"];

export const TIMES = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"] as const;
export const MAX_GUESTS = 12;

export type ReserveInput = { date: string; time: string; guests: number; zone: ZoneId | ""; drink: string };
export type ReserveErrors = Partial<Record<"date" | "time" | "zone", string>>;

export const todayISO = (now = new Date()) => {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;
};

export function validateReserve(i: ReserveInput, today = todayISO()): ReserveErrors {
  const e: ReserveErrors = {};
  if (!i.date) e.date = "Chọn ngày bạn muốn đến.";
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(i.date) || Number.isNaN(Date.parse(i.date))) e.date = "Ngày chưa hợp lệ.";
  else if (i.date < today) e.date = "Ngày này đã qua, hãy chọn từ hôm nay trở đi.";
  if (!i.time) e.time = "Chọn giờ bạn dự định đến.";
  if (!i.zone) e.zone = "Chọn một khu vực để mình sắp chỗ.";
  return e;
}

const WEEKDAY = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return `${WEEKDAY[dt.getDay()]}, ${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
}

export function summaryLines(i: ReserveInput) {
  const zone = ZONES.find((z) => z.id === i.zone);
  const lines = [`Ngày: ${formatDate(i.date)}`, `Giờ đến dự kiến: ${i.time}`, `Số khách: ${i.guests}`, `Khu vực: ${zone?.name ?? ""}`];
  if (i.drink) lines.push(`Muốn thử: ${i.drink}`);
  return lines;
}
