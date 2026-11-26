/** Dữ liệu và luật tính của công cụ chọn gói chăm sóc (chỉ grooming, không thú y). Giá là giá tham khảo. */

export type Species = "dog" | "cat";
export type GoalId = "bath" | "trim" | "spa";
export type CoatId = "short" | "medium" | "long" | "curly";
export type CondId = "tangle" | "smell" | "shed";

export type WeightOpt = { id: string; label: string; bath: number; trim: number; spa: number; scale: number };

/** Giá tham khảo theo loài, cân nặng và gói (lông ngắn). Độ dài lông nhân hệ số ở COATS. */
export const WEIGHTS: Record<Species, WeightOpt[]> = {
  dog: [
    { id: "d1", label: "Dưới 3 kg", bath: 150000, trim: 270000, spa: 330000, scale: 0.8 },
    { id: "d2", label: "3 – 7 kg", bath: 200000, trim: 320000, spa: 380000, scale: 1 },
    { id: "d3", label: "7 – 15 kg", bath: 280000, trim: 430000, spa: 500000, scale: 1.3 },
    { id: "d4", label: "15 – 25 kg", bath: 380000, trim: 560000, spa: 650000, scale: 1.7 },
    { id: "d5", label: "Trên 25 kg", bath: 500000, trim: 720000, spa: 830000, scale: 2.1 },
  ],
  cat: [
    { id: "c1", label: "Dưới 3 kg", bath: 180000, trim: 280000, spa: 360000, scale: 0.9 },
    { id: "c2", label: "3 – 5 kg", bath: 230000, trim: 340000, spa: 410000, scale: 1.1 },
    { id: "c3", label: "Trên 5 kg", bath: 300000, trim: 430000, spa: 500000, scale: 1.4 },
  ],
};

export const COATS: { id: CoatId; label: string; hint: string; mult: number; scale: number }[] = [
  { id: "short", label: "Lông ngắn", hint: "Pug, mèo ta, Corgi…", mult: 1, scale: 1 },
  { id: "medium", label: "Lông vừa", hint: "Shiba, Poodle tỉa…", mult: 1.15, scale: 1.1 },
  { id: "long", label: "Lông dài", hint: "Golden, mèo Ba Tư…", mult: 1.35, scale: 1.3 },
  { id: "curly", label: "Xoăn hoặc dày", hint: "Poodle, Bichon, Maine Coon…", mult: 1.5, scale: 1.45 },
];

export const CONDS: { id: CondId; label: string; hint: string; add: number }[] = [
  { id: "tangle", label: "Lông rối, vón cục", hint: "Gỡ rối từng mảng bằng lược và dầu xả", add: 60000 },
  { id: "smell", label: "Hơi có mùi", hint: "Tắm hai lượt và ủ khử mùi", add: 40000 },
  { id: "shed", label: "Rụng nhiều lông", hint: "Chải và sấy gom lông rụng", add: 50000 },
];

export const GOALS: { id: GoalId; label: string; pack: string; hint: string }[] = [
  { id: "bath", label: "Tắm thơm", pack: "Tắm Bọt Thơm", hint: "Chải, tắm, sấy, cắt móng, lau tai" },
  { id: "trim", label: "Tắm và tỉa gọn", pack: "Tắm & Tỉa Gọn", hint: "Thêm tỉa gọn mặt, chân, bụng, tạo kiểu nhẹ" },
  { id: "spa", label: "Spa thư giãn", pack: "Spa Bông Xù", hint: "Thêm ủ dưỡng lông và massage" },
];

export const SERVICES = [
  {
    id: "bath", name: "Tắm Bọt Thơm", from: 150000, time: "45 phút – 2 giờ", color: "yellow",
    blurb: "Chải sơ, tắm bọt bằng sữa tắm dịu nhẹ, sấy khô, cắt móng và lau tai ngoài. Dành cho bé cần sạch, thơm và nhẹ người.",
    items: ["Chải sơ và kiểm tra lông, da bên ngoài", "Tắm bọt, xả sạch", "Sấy khô và chải suôn", "Cắt móng, lau tai ngoài"],
    photo: "poodle-bot-xa-phong", alt: "Hai chú poodle xám giữa đám bọt xà phòng trắng", pos: "50% 45%",
  },
  {
    id: "trim", name: "Cắt Tỉa Tạo Kiểu", from: 270000, time: "90 phút – 3 giờ", color: "white",
    blurb: "Gói tắm thơm cộng tỉa gọn mặt, chân, bụng, vùng vệ sinh, hoặc tạo kiểu theo ảnh bạn gửi. Bé nhìn gọn gàng và dễ chịu hơn.",
    items: ["Toàn bộ gói Tắm Bọt Thơm", "Tỉa gọn mặt, chân, đuôi", "Tỉa vùng bụng, vùng vệ sinh", "Tạo kiểu theo ảnh mẫu (nếu có)"],
    photo: "yorkshire-bon-tam", alt: "Chú Yorkshire Terrier tựa chân lên thành bồn tắm trắng", pos: "50% 40%",
  },
  {
    id: "earnail", name: "Cắt Móng & Lau Tai", from: 50000, time: "15 – 20 phút", color: "red",
    blurb: "Dịch vụ lẻ khi bé chỉ cần gọn móng, sạch tai ngoài. Có thể thêm vào bất kỳ gói nào.",
    items: ["Cắt và dũa móng", "Lau tai ngoài, tỉa lông tai", "Cạo lông lòng bàn chân", "Xịt thơm dịu"],
    photo: "khan-luoc-sua-tam", alt: "Khăn họa tiết lá, lược cao su xanh và chai sữa tắm trắng trên sàn gỗ cạnh chân chú chó", pos: "50% 55%",
  },
  {
    id: "spa", name: "Spa Bông Xù", from: 330000, time: "80 phút – 3 giờ", color: "white",
    blurb: "Tắm bọt kèm ủ dưỡng lông và massage nhẹ. Dành cho bé thích thư giãn, hoặc dịp đặc biệt của cả nhà.",
    items: ["Toàn bộ gói Tắm Bọt Thơm", "Ủ dưỡng lông 10 phút", "Massage thư giãn nhẹ nhàng", "Xịt thơm dịu và chụp ảnh khoe boss"],
    photo: "collie-bon-tam", alt: "Chú chó collie đứng trong bồn tắm trắng kiểu cổ điển", pos: "50% 30%",
  },
  {
    id: "detangle", name: "Chải Suôn Gỡ Rối", from: 60000, time: "20 – 60 phút", color: "yellow", addon: true,
    blurb: "Thêm vào bất kỳ gói nào khi lông rối, vón cục hoặc rụng nhiều. Chải từng lớp, gỡ bằng lược và dầu xả, không kéo giật.",
    items: ["Gỡ rối từng mảng bằng lược", "Dầu xả giúp lược trượt êm", "Chải gom lông rụng", "Nút quá chặt thì tỉa gọn thay vì kéo"],
    photo: "meo-trang-long", alt: "Chú mèo lông trắng dài đang được chải lông", pos: "50% 40%",
  },
] as const;

export const SURCHARGES = [
  { t: "Lông rối, vón cục", d: "Gỡ rối từng mảng bằng lược và dầu xả", p: "+60.000 ₫" },
  { t: "Hơi có mùi", d: "Tắm lượt hai và ủ khử mùi", p: "+40.000 ₫" },
  { t: "Rụng nhiều lông", d: "Chải và sấy gom lông rụng", p: "+50.000 ₫" },
  { t: "Bé khó giữ, cần hai người", d: "Nhát, hay cắn hoặc hay cào, báo trước khi đặt", p: "+50.000 ₫" },
  { t: "Đón muộn", d: "Quá 60 phút sau giờ hẹn đón, tính mỗi giờ giữ bé", p: "+30.000 ₫" },
] as const;

export const HOURS = [
  { d: "Thứ Hai", t: "Nghỉ", open: false },
  { d: "Thứ Ba", t: "8:00 – 19:00", open: true },
  { d: "Thứ Tư", t: "8:00 – 19:00", open: true },
  { d: "Thứ Năm", t: "8:00 – 19:00", open: true },
  { d: "Thứ Sáu", t: "8:00 – 19:00", open: true },
  { d: "Thứ Bảy", t: "8:00 – 19:00", open: true },
  { d: "Chủ nhật", t: "8:00 – 17:00", open: true },
] as const;
/** Chỉ số ngày theo Date.getDay(): 0 = Chủ nhật. Mốc đóng cửa (phút) và mốc nhận bé cuối. */
export const OPEN_RULE: Record<number, { from: number; to: number; last: number } | null> = {
  0: { from: 480, to: 1020, last: 900 }, 1: null,
  2: { from: 480, to: 1140, last: 990 }, 3: { from: 480, to: 1140, last: 990 }, 4: { from: 480, to: 1140, last: 990 },
  5: { from: 480, to: 1140, last: 990 }, 6: { from: 480, to: 1140, last: 990 },
};
export const SLOT_DAYS = [
  { id: 2, label: "Thứ Ba" }, { id: 3, label: "Thứ Tư" }, { id: 4, label: "Thứ Năm" }, { id: 5, label: "Thứ Sáu" }, { id: 6, label: "Thứ Bảy" }, { id: 0, label: "Chủ nhật" },
] as const;
export const SLOT_TIMES = ["8:00", "9:30", "11:00", "13:30", "15:00", "16:30"] as const;

export type Selection = {
  species: Species | null;
  weight: string | null;
  coat: CoatId | null;
  goal: GoalId;
  conds: CondId[];
  skin: boolean;
};

export const DEFAULT_SELECTION: Selection = { species: null, weight: null, coat: null, goal: "bath", conds: [], skin: false };

export type Step = { name: string; mins: number; note?: string };
export type Plan = {
  pack: string;
  steps: Step[];
  totalMins: number;
  low: number;
  high: number;
  weightLabel: string;
};

const r5 = (n: number) => Math.max(5, Math.round(n / 5) * 5);
const r10k = (n: number) => Math.round(n / 10000) * 10000;

export function missingFields(sel: Selection): string[] {
  const out: string[] = [];
  if (!sel.species) out.push("loài");
  if (!sel.weight) out.push("cân nặng");
  if (!sel.coat) out.push("độ dài lông");
  return out;
}

export function buildPlan(sel: Selection): Plan | null {
  if (!sel.species || !sel.weight || !sel.coat) return null;
  const w = WEIGHTS[sel.species].find((x) => x.id === sel.weight);
  const coat = COATS.find((c) => c.id === sel.coat);
  const goal = GOALS.find((g) => g.id === sel.goal);
  if (!w || !coat || !goal) return null;
  const cat = sel.species === "cat";
  const f = w.scale * coat.scale;
  const steps: Step[] = [
    { name: "Đón bé, làm quen và kiểm tra lông", mins: 10, note: cat ? "Mèo được nghỉ trong lồng yên tĩnh trước khi bắt đầu." : undefined },
    { name: cat ? "Chải sơ bằng lược mềm" : "Chải sơ, gỡ nút nhỏ", mins: r5(8 * f) },
  ];
  if (sel.conds.includes("tangle")) steps.push({ name: "Gỡ rối từng mảng bằng lược và dầu xả", mins: r5(20 * f), note: "Chỉ gỡ khi bé còn thoải mái; nút quá chặt sẽ tỉa gọn thay vì kéo." });
  if (sel.conds.includes("shed")) steps.push({ name: "Chải gom lông rụng", mins: r5(10 * f) });
  steps.push({ name: cat ? "Tắm bọt nhẹ, nước ấm, xả sạch" : "Tắm bọt bằng sữa tắm dịu nhẹ, xả sạch", mins: r5(15 * f) });
  if (sel.conds.includes("smell")) steps.push({ name: "Tắm lượt hai và ủ khử mùi", mins: r5(12 * f) });
  if (sel.goal === "spa") {
    steps.push({ name: "Ủ dưỡng lông", mins: 10 });
    steps.push({ name: "Massage thư giãn nhẹ nhàng", mins: 10 });
  }
  steps.push({ name: cat ? "Sấy nhẹ, dừng nghỉ khi bé căng thẳng" : "Sấy khô và chải suôn", mins: r5(18 * f), note: cat ? "Mèo nhạy tiếng ồn nên sấy ở mức gió vừa phải." : undefined });
  if (sel.goal === "trim") steps.push({ name: cat ? "Tỉa gọn chân, bụng và vùng vệ sinh" : "Tỉa gọn mặt, chân, bụng và vùng vệ sinh", mins: r5(25 * f) });
  steps.push({ name: "Cắt móng và lau tai ngoài", mins: 5 });
  steps.push({ name: "Xịt thơm dịu và chụp ảnh khoe boss", mins: 3 });
  const totalMins = steps.reduce((a, s) => a + s.mins, 0);
  let price = w[sel.goal] * coat.mult;
  for (const c of CONDS) if (sel.conds.includes(c.id)) price += c.add;
  const low = r10k(price);
  const high = r10k(price * 1.15);
  return { pack: goal.pack, steps, totalMins, low, high: Math.max(high, low + 10000), weightLabel: w.label };
}

export const fmtVnd = (n: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n).replace(/ /g, " ");

export function fmtTime(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (!h) return `${m} phút`;
  return m ? `${h} giờ ${m} phút` : `${h} giờ`;
}

export function summaryText(sel: Selection, plan: Plan): string {
  const sp = sel.species === "cat" ? "Mèo" : "Chó";
  const coat = COATS.find((c) => c.id === sel.coat)?.label ?? "";
  const conds = CONDS.filter((c) => sel.conds.includes(c.id)).map((c) => c.label.toLowerCase());
  return [
    "Tóm tắt chăm sóc tại Bông Xù",
    `${sp}, ${plan.weightLabel}, ${coat.toLowerCase()}`,
    conds.length ? `Tình trạng: ${conds.join(", ")}` : "Tình trạng: lông bình thường",
    `Gói: ${plan.pack}`,
    `Thời gian dự kiến: ${fmtTime(plan.totalMins)}`,
    `Giá tham khảo: ${fmtVnd(plan.low)} đến ${fmtVnd(plan.high)}`,
    ...(sel.skin ? ["Lưu ý: bé có dấu hiệu về da hoặc sức khoẻ, cần hỏi bác sĩ thú y trước khi đặt lịch."] : []),
    "Bông Xù chỉ chăm sóc lông và vệ sinh, không chẩn đoán hay điều trị bệnh.",
  ].join("\n");
}
