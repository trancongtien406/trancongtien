import { MODULES, type ModuleKey } from "../data/content";

export type Level = "moi" | "dung" | "luot";
export type Age = "nhi" | "teen" | "lon" | "cao";
export type Sessions = 1 | 2 | 3 | 5;
export type Slot = "som" | "sang" | "chieu";

export const LEVELS: { v: Level; label: string; hint: string }[] = [
  { v: "moi", label: "Chưa biết", hint: "Chưa từng đứng trên ván" },
  { v: "dung", label: "Biết đứng", hint: "Đã đứng được trên sóng trắng" },
  { v: "luot", label: "Đã lướt", hint: "Tự bắt sóng, muốn chỉnh kỹ thuật" },
];
export const AGES: { v: Age; label: string }[] = [
  { v: "nhi", label: "6 đến 12" },
  { v: "teen", label: "13 đến 17" },
  { v: "lon", label: "18 đến 39" },
  { v: "cao", label: "Từ 40" },
];
export const SESSIONS: Sessions[] = [1, 2, 3, 5];
export const SLOTS: { v: Slot; label: string; time: string }[] = [
  { v: "som", label: "Sáng sớm", time: "khoảng 5:30 đến 8:00" },
  { v: "sang", label: "Sáng", time: "khoảng 8:00 đến 10:00" },
  { v: "chieu", label: "Chiều muộn", time: "khoảng 15:30 đến 17:30" },
];

const NAME: Record<Level, Record<Sessions, string>> = {
  moi: { 1: "Buổi Làm Quen", 2: "Nhập Môn Sóng Trắng", 3: "Đứng Vững", 5: "Nền Tảng Trọn Vẹn" },
  dung: { 1: "Đứng Đẹp", 2: "Điều Ván", 3: "Điều Ván", 5: "Trại Tiến Bộ" },
  luot: { 1: "Chỉnh Kỹ Thuật", 2: "Đường Sóng", 3: "Đường Sóng", 5: "Tiến Bậc Sóng" },
};
const GOAL: Record<Level, Record<Sessions, string>> = {
  moi: { 1: "Làm quen, an toàn, thử đứng", 2: "Chèo ván, pop-up, bắt sóng trắng", 3: "Đứng vững, điều khiển hướng cơ bản", 5: "Dựng nền tảng toàn diện" },
  dung: { 1: "Cải thiện tư thế và thăng bằng", 2: "Chèo, chọn vị trí, điều khiển ván", 3: "Chèo, chọn vị trí, điều khiển ván", 5: "Cải thiện kỹ năng liên tục" },
  luot: { 1: "Đánh giá kỹ thuật và sửa lỗi", 2: "Đọc sóng, chọn hướng, chuyển trọng tâm", 3: "Đọc sóng, chọn hướng, chuyển trọng tâm", 5: "Tăng kiểm soát và xử lý tình huống" },
};
/** giá tham khảo (đồng) / người */
const PRICE: Record<Level, Record<Sessions, number>> = {
  moi: { 1: 650000, 2: 1200000, 3: 1650000, 5: 2500000 },
  dung: { 1: 700000, 2: 1300000, 3: 1800000, 5: 2800000 },
  luot: { 1: 800000, 2: 1500000, 3: 2100000, 5: 3300000 },
};
const KIDS_PRICE: Record<Sessions, number> = { 1: 750000, 2: 1400000, 3: 2000000, 5: 3200000 };

/** Thứ tự bài học: luôn an toàn -> chèo ván -> pop-up -> đọc sóng; mỗi dòng là một buổi. */
const SCHEDULE: Record<Level, Record<Sessions, ModuleKey[][]>> = {
  moi: { 1: [["AT", "CH", "PO", "DS"]], 2: [["AT", "CH"], ["PO", "DS"]], 3: [["AT", "CH"], ["PO"], ["DS"]], 5: [["AT", "CH"], ["PO"], ["PO", "DS"], ["DS"], ["DS"]] },
  dung: { 1: [["AT", "PO", "DS"]], 2: [["AT", "CH", "PO"], ["DS"]], 3: [["AT", "CH"], ["PO", "DS"], ["DS"]], 5: [["AT", "CH"], ["PO"], ["DS"], ["DS"], ["DS"]] },
  luot: { 1: [["AT", "DS"]], 2: [["AT", "DS"], ["DS"]], 3: [["AT", "CH", "DS"], ["DS"], ["DS"]], 5: [["AT", "CH"], ["DS"], ["DS"], ["DS"], ["DS"]] },
};

export type Plan = {
  courseName: string;
  goal: string;
  price: number;
  priceNote: string;
  sessions: Sessions;
  sessionList: { title: string; modules: { key: ModuleKey; name: string; text: string }[] }[];
  ageNote: string;
  slotNote: string;
  levelLabel: string;
  ageLabel: string;
  slotLabel: string;
};

export function buildPlan(level: Level, age: Age, sessions: Sessions, slot: Slot): Plan {
  const kids = age === "nhi";
  const base = SCHEDULE[level][sessions];
  const sessionList = base.map((mods, i) => ({
    title: `Buổi ${i + 1}`,
    modules: mods.map((key) => ({ key, ...MODULES[key] })),
  }));
  const ageNote =
    age === "nhi" ? "Lớp trẻ em: thời lượng dưới nước ngắn hơn, huấn luyện viên giám sát sát bên, phụ huynh ở bờ trong tầm nhìn."
    : age === "teen" ? "Từ 13 đến 17 tuổi cần phụ huynh xác nhận trước khi tham gia."
    : age === "cao" ? "Thời lượng, cường độ và phần khởi động được điều chỉnh theo thể trạng của bạn; tuổi không phải giới hạn."
    : "Lớp tiêu chuẩn.";
  const s = SLOTS.find((x) => x.v === slot)!;
  const lv = LEVELS.find((x) => x.v === level)!;
  const ag = AGES.find((x) => x.v === age)!;
  return {
    courseName: kids ? "Sóng Nhí" : NAME[level][sessions],
    goal: kids ? "Làm quen ván và sóng bằng trò chơi, an toàn là trên hết" : GOAL[level][sessions],
    price: kids ? KIDS_PRICE[sessions] : PRICE[level][sessions],
    priceNote: kids ? "Giá tham khảo cho mỗi bạn nhỏ, buổi 60 đến 75 phút." : "Giá tham khảo cho mỗi người, buổi 90 phút.",
    sessions,
    sessionList,
    ageNote,
    slotNote: `Khung ${s.label.toLowerCase()} (${s.time}) là mong muốn của bạn. Huấn luyện viên xác nhận giờ thật theo thuỷ triều, gió, dòng chảy và ánh sáng của từng ngày.`,
    levelLabel: lv.label,
    ageLabel: ag.label,
    slotLabel: s.label,
  };
}

export const vnd = (n: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

export function planSummary(p: Plan): string {
  const lines = [
    `Khoá gợi ý: ${p.courseName} (${p.sessions} buổi)`,
    `Trình độ: ${p.levelLabel} · Nhóm tuổi: ${p.ageLabel} · Khung giờ mong muốn: ${p.slotLabel}`,
    `Giá tham khảo: ${vnd(p.price)} mỗi người`,
    ...p.sessionList.map((s) => `${s.title}: ${s.modules.map((m) => m.name).join(" > ")}`),
    "Điều kiện thực tế do huấn luyện viên quyết định mỗi buổi.",
  ];
  return lines.join("\n");
}
