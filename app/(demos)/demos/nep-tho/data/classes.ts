/** Dữ liệu lớp, huấn luyện viên, lịch tuần, gói tập của Nếp Thở. */

export type Category = "reformer" | "mat" | "yoga";
export type Level = "beginner" | "every" | "experienced";
export type InstructorId = "an" | "may" | "lam";

export const CATEGORY_LABEL: Record<Category, string> = { reformer: "Reformer", mat: "Mat Pilates", yoga: "Yoga" };
export const LEVEL_LABEL: Record<Level, string> = { beginner: "Nhập môn", every: "Mọi cấp độ", experienced: "Có kinh nghiệm" };

export type StudioClass = {
  id: string; name: string; category: Category; level: Level; minutes: number; capacity: number; price: number; desc: string;
  /** thẻ cho Class Finder */
  goals: ("flex" | "core" | "calm" | "posture")[]; intensity: 1 | 2 | 3; photo: string; photoAlt: string;
};

export const CLASSES: StudioClass[] = [
  { id: "CL01", name: "Reformer Khởi đầu", category: "reformer", level: "beginner", minutes: 50, capacity: 6, price: 300000, desc: "Làm quen với máy Reformer, cách điều chỉnh thiết bị và những chuyển động cơ bản.", goals: ["core", "posture"], intensity: 2, photo: "kiheng-chan", photoAlt: "Bàn chân kiễng trên thảm trong studio sáng" },
  { id: "CL02", name: "Reformer Flow", category: "reformer", level: "experienced", minutes: 50, capacity: 6, price: 300000, desc: "Chuỗi bài tập liên tiếp trên máy Reformer với nhịp chuyển động chủ động hơn.", goals: ["core", "flex"], intensity: 3, photo: "dang-lung", photoAlt: "Dáng lưng xoay thân bên cửa sổ" },
  { id: "CL03", name: "Mat Pilates", category: "mat", level: "every", minutes: 45, capacity: 10, price: 180000, desc: "Khám phá các chuyển động trên thảm, chú ý đến kiểm soát động tác và nhịp thở.", goals: ["core", "posture", "flex"], intensity: 2, photo: "tay-cuon-tham", photoAlt: "Hai bàn tay cuộn tấm thảm tập" },
  { id: "CL04", name: "Yoga Flow", category: "yoga", level: "experienced", minutes: 60, capacity: 10, price: 180000, desc: "Các tư thế được kết nối thành chuỗi chuyển động với nhịp thở làm điểm tựa.", goals: ["flex", "core"], intensity: 3, photo: "bong-dang-nuoc", photoAlt: "Bóng dáng một tư thế yoga bên mặt nước" },
  { id: "CL05", name: "Yoga Nền tảng", category: "yoga", level: "beginner", minutes: 60, capacity: 10, price: 180000, desc: "Làm quen với những tư thế yoga cơ bản và cách điều chỉnh theo khả năng cá nhân.", goals: ["flex", "posture", "calm"], intensity: 1, photo: "ban-chan-tham", photoAlt: "Cận bàn chân và bàn tay trên thảm" },
  { id: "CL06", name: "Yoga Chậm", category: "yoga", level: "every", minutes: 60, capacity: 10, price: 180000, desc: "Một buổi tập có nhịp độ chậm, dùng thảm và đạo cụ để hỗ trợ các tư thế.", goals: ["calm", "flex", "posture"], intensity: 1, photo: "rem-va-tham", photoAlt: "Phòng yoga rèm trắng với thảm và chăn gấp" },
];

export const INSTRUCTORS: { id: InstructorId; name: string; role: string; bio: string }[] = [
  { id: "an", name: "Reformer", role: "Huấn luyện viên Reformer Pilates", bio: "Dẫn các lớp trên máy Reformer: hướng dẫn làm quen thiết bị, chỉnh lò xo theo từng người, nhịp lớp rõ ràng." },
  { id: "may", name: "Yoga", role: "Huấn luyện viên Yoga", bio: "Dẫn Yoga Nền tảng, Yoga Chậm và Yoga Flow: nhịp nhẹ nhàng, dành thời gian cho từng chuyển động và hơi thở." },
  { id: "lam", name: "Mat & Yoga", role: "Huấn luyện viên Mat Pilates và Yoga", bio: "Dẫn Mat Pilates và một số lớp Yoga: gợi ý nhiều lựa chọn động tác để mỗi người tập vừa sức." },
];
export const SLOTS = ["06:30", "09:00", "12:15", "18:00", "19:15"] as const;
/** Nhóm giờ cho bộ lọc theo khung giờ: chỉ xem buổi bắt đầu từ mốc đã chọn. */
export const TIME_MARKS = ["Cả ngày", ...SLOTS] as const;
export const DAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"] as const;
export const DAY_LONG = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ nhật"] as const;

/** Ô lịch: [mã lớp, huấn luyện viên, chỗ còn trống] hoặc null. Hàng = ngày T2..CN, cột = SLOTS. Tổng 33 buổi. */
type Cell = [string, InstructorId, number] | null;
const T: Cell[][] = [
  [["CL01", "an", 4], ["CL05", "may", 6], null, ["CL02", "an", 2], ["CL06", "lam", 5]],
  [["CL03", "lam", 6], ["CL01", "an", 3], ["CL06", "may", 7], ["CL04", "may", 2], ["CL01", "an", 0]],
  [["CL05", "may", 8], ["CL02", "an", 2], ["CL03", "lam", 4], ["CL01", "an", 1], ["CL06", "may", 6]],
  [["CL01", "an", 3], ["CL03", "lam", 7], null, ["CL04", "may", 5], ["CL02", "an", 0]],
  [["CL04", "may", 4], ["CL01", "an", 2], ["CL06", "lam", 8], ["CL02", "an", 1], ["CL05", "lam", 6]],
  [["CL01", "an", 2], ["CL05", "may", 5], ["CL03", "lam", 4], ["CL06", "may", 6], ["CL02", "an", 3]],
  [["CL05", "lam", 7], ["CL01", "an", 0], ["CL06", "may", 8], ["CL03", "lam", 5], ["CL06", "may", 6]],
];

export type Session = { id: string; day: number; time: string; classId: string; instructor: InstructorId; left: number };

/** `left` là số chỗ còn trống (đã đổi từ cột "x/y" của đặc tả: x là chỗ còn). Tuần sau biến thiên xác định theo id. */
export function sessionsForWeek(week: number): Session[] {
  const out: Session[] = [];
  T.forEach((row, day) => row.forEach((c, i) => {
    if (!c) return;
    const cls = CLASSES.find((x) => x.id === c[0])!;
    const shift = week === 0 ? 0 : ((day * 7 + i * 3 + week * 5) % 4) - 1; // -1..2, xác định
    const left = Math.min(cls.capacity, Math.max(0, c[2] + shift));
    out.push({ id: `w${week}-${day}-${SLOTS[i]}`, day, time: SLOTS[i], classId: c[0], instructor: c[1], left });
  }));
  return out;
}

/** Tuần cố định (không lấy ngày hiện tại để SSR/hydrate nhất quán). Tuần 0 bắt đầu thứ Hai 23/11/2026. */
export const WEEK_START = new Date(Date.UTC(2026, 10, 23));
export function weekDates(week: number): { d: number; m: number }[] {
  return Array.from({ length: 7 }, (_, i) => { const x = new Date(WEEK_START.getTime() + (week * 7 + i) * 86400000); return { d: x.getUTCDate(), m: x.getUTCMonth() + 1 }; });
}
export const WEEKS = 4;

export function availability(left: number): { status: "available" | "limited" | "full"; label: string } {
  if (left === 0) return { status: "full", label: "Hết chỗ" };
  if (left <= 2) return { status: "limited", label: `Còn ${left} chỗ` };
  return { status: "available", label: `Còn ${left} chỗ` };
}

export const endTime = (time: string, minutes: number) => {
  const [h, m] = time.split(":").map(Number); const t = h * 60 + m + minutes;
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
};

export const PLANS = [
  { id: "P01", name: "Nhịp đầu", note: "Buổi tập thử", price: 250000, sessions: "1 buổi tập", per: null as number | null, lines: ["Reformer, Mat hoặc Yoga", "Dùng trong 14 ngày", "Chọn lớp còn chỗ"], featured: false },
  { id: "P02", name: "Nhịp đều", note: "Lịch tập linh hoạt", price: 1600000, sessions: "8 buổi tập", per: 200000, lines: ["Tất cả lớp nhóm", "Dùng trong 30 ngày", "Không tự động gia hạn"], featured: true },
  { id: "P03", name: "Nhịp riêng", note: "Nhiều thời gian hơn", price: 2800000, sessions: "16 buổi tập", per: 175000, lines: ["Tất cả lớp nhóm", "Dùng trong 60 ngày", "Không tự động gia hạn"], featured: false },
];

export const vnd = (n: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);
