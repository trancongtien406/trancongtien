export type ClassType = "suc-manh" | "wod" | "ky-thuat" | "xa-day" | "phuc-hoi";
export type CoachId = "cot" | "phan" | "xa" | "day";
export type Band = "sang" | "trua-chieu" | "toi";

export const CLASS_TYPES: { id: ClassType; label: string; short: string; blurb: string }[] = [
  { id: "suc-manh", label: "Sức mạnh", short: "SỨC MẠNH", blurb: "Squat, deadlift, đẩy vai với thanh tạ. Tăng tải từng bước, kỹ thuật trước." },
  { id: "wod", label: "WOD thể lực", short: "WOD", blurb: "Bài tập tổng hợp theo nhịp tabata, EMOM hoặc AMRAP. Mức tạ chia theo từng người." },
  { id: "ky-thuat", label: "Kỹ thuật tạ", short: "KỸ THUẬT", blurb: "Học và chỉnh động tác nền tảng với thanh nhẹ: squat, hinge, đẩy, kéo." },
  { id: "xa-day", label: "Xà & dây", short: "XÀ & DÂY", blurb: "Treo xà, kéo xà, leo dây, nhảy dây. Có bậc hỗ trợ cho người mới." },
  { id: "phuc-hoi", label: "Linh hoạt & phục hồi", short: "PHỤC HỒI", blurb: "Giãn cơ chủ động, hông, vai, cột sống ngực. Nhẹ nhàng, dễ vào." },
];

export const BANDS: { id: Band; label: string; range: string }[] = [
  { id: "sang", label: "Sáng", range: "trước 10:00" },
  { id: "trua-chieu", label: "Trưa & chiều", range: "10:00 đến 17:00" },
  { id: "toi", label: "Tối", range: "sau 17:00" },
];

/** HLV là nhân vật vector, gọi theo biệt danh theo dụng cụ. Không phải người thật. */
export const COACHES: { id: CoachId; nick: string; role: string; line: string }[] = [
  { id: "cot", nick: "Coach Cột", role: "Sức mạnh", line: "Phụ trách thanh tạ và rack. Nói ít, chỉnh kỹ." },
  { id: "phan", nick: "Coach Phấn", role: "Kỹ thuật & phục hồi", line: "Dạy chuyển động nền tảng, hông và vai." },
  { id: "xa", nick: "Coach Xà", role: "Xà & thể dục dụng cụ", line: "Từ treo xà đến kéo xà, có bậc cho từng người." },
  { id: "day", nick: "Coach Dây", role: "WOD thể lực", line: "Giữ nhịp tabata, EMOM và chia mức tạ trong lớp." },
];

export type ClassItem = {
  id: string;
  /** 0 = Thứ 2 ... 6 = Chủ nhật */
  day: number;
  start: string;
  minutes: 45 | 60;
  type: ClassType;
  coach: CoachId;
  level: "Mọi trình độ" | "Đã tập đều" | "Có nền tảng";
};

export const DAYS = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"] as const;
export const DAYS_SHORT = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"] as const;

const c = (day: number, start: string, minutes: 45 | 60, type: ClassType, coach: CoachId, level: ClassItem["level"]): ClassItem =>
  ({ id: `${day}-${start}-${type}`, day, start, minutes, type, coach, level });

export const CLASSES: ClassItem[] = [
  c(0, "06:00", 60, "suc-manh", "cot", "Mọi trình độ"),
  c(0, "12:15", 45, "wod", "day", "Mọi trình độ"),
  c(0, "17:30", 60, "wod", "day", "Đã tập đều"),
  c(0, "19:00", 60, "ky-thuat", "phan", "Mọi trình độ"),
  c(1, "06:00", 60, "wod", "day", "Mọi trình độ"),
  c(1, "17:30", 60, "xa-day", "xa", "Mọi trình độ"),
  c(1, "19:00", 60, "suc-manh", "cot", "Đã tập đều"),
  c(2, "06:00", 60, "ky-thuat", "phan", "Mọi trình độ"),
  c(2, "12:15", 45, "wod", "day", "Mọi trình độ"),
  c(2, "17:30", 60, "wod", "day", "Có nền tảng"),
  c(2, "19:00", 45, "phuc-hoi", "phan", "Mọi trình độ"),
  c(3, "06:00", 60, "suc-manh", "cot", "Mọi trình độ"),
  c(3, "17:30", 60, "xa-day", "xa", "Đã tập đều"),
  c(3, "19:00", 60, "wod", "day", "Mọi trình độ"),
  c(4, "06:00", 60, "wod", "day", "Mọi trình độ"),
  c(4, "12:15", 45, "suc-manh", "cot", "Có nền tảng"),
  c(4, "17:30", 60, "ky-thuat", "phan", "Mọi trình độ"),
  c(4, "19:00", 60, "wod", "day", "Đã tập đều"),
  c(5, "07:30", 60, "wod", "day", "Mọi trình độ"),
  c(5, "09:00", 60, "xa-day", "xa", "Mọi trình độ"),
  c(5, "16:00", 60, "suc-manh", "cot", "Mọi trình độ"),
  c(6, "08:00", 60, "ky-thuat", "phan", "Mọi trình độ"),
  c(6, "09:30", 45, "phuc-hoi", "phan", "Mọi trình độ"),
  c(6, "17:00", 60, "wod", "day", "Mọi trình độ"),
];

export function bandOf(start: string): Band {
  const h = parseInt(start.slice(0, 2), 10);
  return h < 10 ? "sang" : h < 17 ? "trua-chieu" : "toi";
}

export function endTime(start: string, minutes: number) {
  const [h, m] = start.split(":").map(Number);
  const t = h * 60 + m + minutes;
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}
