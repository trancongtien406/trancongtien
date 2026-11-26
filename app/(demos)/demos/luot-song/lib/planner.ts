import { MODULES, SLOT_INFO, type ModuleKey } from "../data/content";

export type Level = "moi" | "dung" | "luot";
export type Age = "nhi" | "teen" | "lon" | "cao";
export type Sessions = 1 | 3 | 5 | 10;
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
export const SESSIONS: Sessions[] = [1, 3, 5, 10];
export const SLOTS: { v: Slot; label: string; time: string }[] = (Object.keys(SLOT_INFO) as Slot[]).map((v) => ({
  v,
  label: SLOT_INFO[v].label,
  time: `tập trung ${SLOT_INFO[v].gather}`,
}));

const NAME: Record<Level, Record<Sessions, string>> = {
  moi: { 1: "Buổi trải nghiệm", 3: "Khoá 3 buổi · Đứng vững", 5: "Khoá 5 buổi · Nền tảng", 10: "Khoá 10 buổi · Ra sóng đều tay" },
  dung: { 1: "Buổi Đứng Đẹp", 3: "Khoá 3 buổi · Điều ván", 5: "Khoá 5 buổi · Tiến bộ", 10: "Khoá 10 buổi · Đường sóng" },
  luot: { 1: "Buổi chỉnh kỹ thuật", 3: "Khoá 3 buổi · Đường sóng", 5: "Khoá 5 buổi · Tiến bậc sóng", 10: "Khoá 10 buổi · Tiến bậc sóng dài" },
};
const GOAL: Record<Level, Record<Sessions, string>> = {
  moi: { 1: "Làm quen, an toàn, thử đứng", 3: "Chèo ván, pop-up, bắt sóng trắng", 5: "Dựng nền tảng đủ bốn mảng", 10: "Từ nền tảng tới chọn vị trí và chuyển hướng" },
  dung: { 1: "Cải thiện tư thế và thăng bằng", 3: "Chèo, chọn vị trí, điều khiển ván", 5: "Cải thiện kỹ năng liên tục", 10: "Chuyển hướng, đọc sóng, bắt sóng đều tay" },
  luot: { 1: "Đánh giá kỹ thuật và sửa lỗi", 3: "Đọc sóng, chọn hướng, chuyển trọng tâm", 5: "Tăng kiểm soát và xử lý tình huống", 10: "Kỹ thuật chuyển hướng và chọn sóng có kế hoạch" },
};
/** giá tham khảo (đồng) / người; khớp bảng giá trên trang */
const PRICE: Record<Level, Record<Sessions, number>> = {
  moi: { 1: 750000, 3: 1950000, 5: 3100000, 10: 5800000 },
  dung: { 1: 800000, 3: 2100000, 5: 3400000, 10: 6300000 },
  luot: { 1: 900000, 3: 2400000, 5: 3900000, 10: 7200000 },
};
const KIDS_PRICE: Record<Sessions, number> = { 1: 650000, 3: 1750000, 5: 2800000, 10: 5200000 };

/** Thứ tự bài học: luôn an toàn -> chèo ván -> pop-up -> đọc sóng; mỗi dòng là một buổi. */
const SCHEDULE: Record<Level, Record<Sessions, ModuleKey[][]>> = {
  moi: {
    1: [["AT", "CH", "PO", "DS"]],
    3: [["AT", "CH"], ["PO"], ["PO", "DS"]],
    5: [["AT", "CH"], ["PO"], ["PO", "DS"], ["DS"], ["DS"]],
    10: [["AT", "CH"], ["CH", "PO"], ["PO"], ["PO", "DS"], ["DS"], ["DS"], ["DS"], ["DS"], ["DS"], ["DS"]],
  },
  dung: {
    1: [["AT", "PO", "DS"]],
    3: [["AT", "CH"], ["PO", "DS"], ["DS"]],
    5: [["AT", "CH"], ["PO"], ["DS"], ["DS"], ["DS"]],
    10: [["AT", "CH"], ["PO"], ["DS"], ["DS"], ["DS"], ["DS"], ["DS"], ["DS"], ["DS"], ["DS"]],
  },
  luot: {
    1: [["AT", "DS"]],
    3: [["AT", "CH", "DS"], ["DS"], ["DS"]],
    5: [["AT", "CH"], ["DS"], ["DS"], ["DS"], ["DS"]],
    10: [["AT", "CH"], ["DS"], ["DS"], ["DS"], ["DS"], ["DS"], ["DS"], ["DS"], ["DS"], ["DS"]],
  },
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
    age === "nhi" ? "Lớp trẻ em: nhóm tối đa 4 bạn, thời lượng dưới nước ngắn hơn, huấn luyện viên giám sát sát bên, phụ huynh ở bờ trong tầm nhìn."
    : age === "teen" ? "Từ 13 đến 17 tuổi cần phụ huynh xác nhận trước khi tham gia."
    : age === "cao" ? "Thời lượng, cường độ và phần khởi động được điều chỉnh theo thể trạng của bạn; tuổi không phải giới hạn."
    : "Lớp tiêu chuẩn, nhóm tối đa 6 học viên.";
  const s = SLOT_INFO[slot];
  const lv = LEVELS.find((x) => x.v === level)!;
  const ag = AGES.find((x) => x.v === age)!;
  return {
    courseName: kids ? (sessions === 1 ? "Lớp trẻ em · buổi lẻ" : `Lớp trẻ em · gói ${sessions} buổi`) : NAME[level][sessions],
    goal: kids ? "Làm quen ván và sóng bằng trò chơi, an toàn là trên hết" : GOAL[level][sessions],
    price: kids ? KIDS_PRICE[sessions] : PRICE[level][sessions],
    priceNote: kids ? "Giá tham khảo cho mỗi bạn nhỏ, buổi 75 phút." : "Giá tham khảo cho mỗi người, mỗi buổi khoảng 2 giờ.",
    sessions,
    sessionList,
    ageNote,
    slotNote: `Khung ${s.label.toLowerCase()} (tập trung ${s.gather}, kết thúc ${s.end}) là mong muốn của bạn. Huấn luyện viên xác nhận giờ thật theo thuỷ triều, gió, dòng chảy và ánh sáng của từng ngày.`,
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
