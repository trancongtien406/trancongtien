export type Reserve = { guests: number; date: string; time: string; picks: string[] };

export const TIMES = ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];

export function todayISO(now = new Date()) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;
}

export function validateReserve(r: { guests: number; date: string; time: string }, today = todayISO()): Record<string, string> {
  const e: Record<string, string> = {};
  if (!r.date) e.date = "Chọn ngày bạn muốn đến.";
  else if (r.date < today) e.date = "Ngày này đã qua, hãy chọn ngày từ hôm nay trở đi.";
  if (!r.time) e.time = "Chọn giờ bạn muốn đến.";
  if (r.guests < 1 || r.guests > 12) e.guests = "Bàn nhận từ 1 đến 12 khách; nhóm đông hơn, hãy ghi trong form tư vấn.";
  return e;
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  const wd = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"][dt.getDay()];
  return `${wd}, ${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
}

export function buildSummary(r: Reserve): string {
  const lines = [
    "Tóm tắt đặt bàn · Mộc Vang",
    `Số khách: ${r.guests}`,
    `Ngày giờ mong muốn: ${formatDate(r.date)}, ${r.time}`,
  ];
  if (r.picks.length) lines.push("Muốn thử: " + r.picks.join("; "));
  lines.push("Dành cho khách từ 18 tuổi.");
  return lines.join("\n");
}
