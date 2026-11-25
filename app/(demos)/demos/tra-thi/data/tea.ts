export type Mood = "tinh" | "tap-trung" | "quay-quan" | "nhe-long" | "am-bung";
export type Moment = "sang" | "chieu" | "toi";
export type Food = "khong" | "banh-ngot" | "man-nhe" | "trai-cay" | "hat";

export type Tea = {
  id: string;
  name: string;
  kind: string;
  origin: string;
  flavor: string;
  /** màu mẫu lá/nước (chỉ để trang trí) */
  swatch: string;
  tempC: number;
  /** gam trà khô */
  grams: number;
  /** ml nước cho lượng gam ở trên */
  ml: number;
  /** thời gian (giây) của từng nước pha */
  steeps: number[];
  /** giá tham khảo một ấm thưởng trà (VND) */
  price: number;
  moods: Mood[];
  moments: Moment[];
  foods: Food[];
  note: string;
};

export const TEAS: Tea[] = [
  { id: "thai-nguyen", name: "Trà xanh Thái Nguyên", kind: "Trà xanh", origin: "Thái Nguyên", flavor: "Chát nhẹ, hậu ngọt, thơm cốm", swatch: "#8fb27c", tempC: 80, grams: 5, ml: 150, steeps: [30, 35, 45], price: 120000, moods: ["tap-trung", "nhe-long"], moments: ["sang", "chieu"], foods: ["khong", "trai-cay", "hat"], note: "Dùng nước vừa sôi để nguội một chút, rót thật sát lá để không bị đắng." },
  { id: "shan-tuyet", name: "Shan tuyết cổ thụ", kind: "Trà xanh", origin: "Hà Giang", flavor: "Thanh, hậu ngọt sâu, mùi hoa rừng", swatch: "#a3bf8d", tempC: 85, grams: 6, ml: 150, steeps: [25, 30, 40, 55], price: 220000, moods: ["tinh", "tap-trung"], moments: ["sang", "chieu"], foods: ["khong", "hat"], note: "Lá lớn, tráng trà 5 giây rồi mới pha. Nước đầu để làm tỉnh lá." },
  { id: "bach-tra", name: "Bạch trà Suối Giàng", kind: "Trà trắng", origin: "Yên Bái", flavor: "Nhẹ như hoa, ngọt mật, ít chát", swatch: "#d7d9b8", tempC: 85, grams: 5, ml: 150, steeps: [40, 45, 60, 80], price: 190000, moods: ["tinh", "nhe-long"], moments: ["sang", "chieu"], foods: ["khong", "trai-cay"], note: "Rót nước theo thành ấm, tránh dội thẳng lên lá. Pha nhiều nước vẫn êm." },
  { id: "o-long", name: "Ô long Đà Lạt", kind: "Ô long", origin: "Lâm Đồng", flavor: "Thơm hoa, béo nhẹ, hậu vị dài", swatch: "#b9a35a", tempC: 95, grams: 6, ml: 150, steeps: [20, 25, 35, 45, 60], price: 180000, moods: ["quay-quan", "nhe-long"], moments: ["chieu", "toi"], foods: ["banh-ngot", "trai-cay", "man-nhe"], note: "Lá cuộn tròn nở dần qua từng nước, mỗi nước một hương khác." },
  { id: "dai-hong-bao", name: "Đại Hồng Bào nham trà", kind: "Ô long nướng", origin: "Vũ Di", flavor: "Khói nhẹ, vị đá, hậu ngọt than", swatch: "#8a5a3a", tempC: 98, grams: 7, ml: 150, steeps: [15, 20, 30, 40, 55], price: 260000, moods: ["tap-trung", "am-bung"], moments: ["chieu", "toi"], foods: ["man-nhe", "hat"], note: "Nước thật nóng, rót nhanh. Trà nướng chịu được nhiều nước pha." },
  { id: "hong-tra", name: "Hồng trà Phú Thọ", kind: "Hồng trà", origin: "Phú Thọ", flavor: "Ngọt hậu, mùi mật và trái chín", swatch: "#a8502b", tempC: 90, grams: 4, ml: 150, steeps: [30, 40, 55], price: 140000, moods: ["am-bung", "quay-quan"], moments: ["sang", "chieu"], foods: ["banh-ngot", "man-nhe"], note: "Hợp với bánh ngọt vừa phải; không pha quá lâu để tránh gắt." },
  { id: "pho-nhi", name: "Phổ nhĩ chín", kind: "Hậu lên men", origin: "Vân Nam", flavor: "Đậm, mùi gỗ và đất ẩm, êm dày", swatch: "#4a2f22", tempC: 100, grams: 6, ml: 150, steeps: [10, 15, 20, 30, 40, 60], price: 200000, moods: ["am-bung", "tinh"], moments: ["toi", "chieu"], foods: ["man-nhe", "hat"], note: "Rửa trà một lượt nhanh. Nước sôi hẳn, rót ngay để lấy vị đậm mà không đục." },
  { id: "tra-sen", name: "Trà ướp sen", kind: "Trà ướp hương", origin: "Hà Nội", flavor: "Hương sen dịu, thanh mát, ngọt hậu", swatch: "#c9c9a0", tempC: 85, grams: 5, ml: 150, steeps: [30, 40, 50], price: 240000, moods: ["tinh", "quay-quan"], moments: ["sang", "chieu"], foods: ["banh-ngot", "khong"], note: "Hương sen dễ bay, pha ấm đã làm nóng và đậy nắp ngay." },
  { id: "tra-nhai", name: "Trà nhài", kind: "Trà ướp hương", origin: "Đà Lạt", flavor: "Hoa nhài rõ, ngọt thơm, sáng vị", swatch: "#e0e0b8", tempC: 80, grams: 5, ml: 150, steeps: [30, 35, 45], price: 130000, moods: ["nhe-long", "quay-quan"], moments: ["sang", "chieu"], foods: ["banh-ngot", "trai-cay"], note: "Không dùng nước sôi hẳn để hương nhài không bị gắt." },
  { id: "matcha", name: "Matcha nghi lễ", kind: "Bột trà xanh", origin: "Uji", flavor: "Đậm rêu xanh, béo umami, hậu ngọt", swatch: "#6f9b3f", tempC: 75, grams: 2, ml: 70, steeps: [30], price: 150000, moods: ["tap-trung", "tinh"], moments: ["sang", "chieu"], foods: ["banh-ngot", "khong"], note: "Rây bột, đánh hình chữ M trong 30 giây đến khi mịn bọt." },
  { id: "hojicha", name: "Hojicha rang", kind: "Trà xanh rang", origin: "Kyoto", flavor: "Rang thơm, ngọt hạt dẻ, ít chát", swatch: "#7b5a3a", tempC: 95, grams: 5, ml: 150, steeps: [20, 25, 35], price: 110000, moods: ["am-bung", "nhe-long"], moments: ["toi", "chieu"], foods: ["banh-ngot", "hat", "man-nhe"], note: "Rang kỹ nên pha được bằng nước sôi; hợp buổi tối vì hương dịu." },
  { id: "genmaicha", name: "Genmaicha gạo rang", kind: "Trà xanh gạo rang", origin: "Nhật Bản", flavor: "Thơm cơm cháy, hậu ngọt, nhẹ", swatch: "#a89b5e", tempC: 90, grams: 5, ml: 150, steeps: [30, 40, 50], price: 100000, moods: ["quay-quan", "am-bung"], moments: ["sang", "chieu", "toi"], foods: ["man-nhe", "hat", "khong"], note: "Dễ pha nhất trong danh mục, hợp nhóm đông và đồ ăn mặn nhẹ." },
];

export const MOODS: { id: Mood; label: string; hint: string }[] = [
  { id: "tinh", label: "Tĩnh lặng", hint: "ngồi yên một mình" },
  { id: "tap-trung", label: "Tập trung", hint: "làm việc, đọc sách" },
  { id: "quay-quan", label: "Quây quần", hint: "trò chuyện cùng bạn" },
  { id: "nhe-long", label: "Nhẹ nhõm", hint: "thư thả cuối tuần" },
  { id: "am-bung", label: "Ấm bụng", hint: "trời se lạnh" },
];
export const MOMENTS: { id: Moment; label: string; hint: string }[] = [
  { id: "sang", label: "Sáng", hint: "trước 11 giờ" },
  { id: "chieu", label: "Chiều", hint: "11 giờ đến 17 giờ" },
  { id: "toi", label: "Tối", hint: "sau 17 giờ" },
];
export const FOODS: { id: Food; label: string }[] = [
  { id: "khong", label: "Chỉ uống trà" },
  { id: "banh-ngot", label: "Bánh ngọt" },
  { id: "man-nhe", label: "Mặn nhẹ" },
  { id: "trai-cay", label: "Trái cây" },
  { id: "hat", label: "Các loại hạt" },
];

export type Pick = { tea: Tea; score: number; reasons: string[] };

/** Chấm điểm: tâm trạng 3, thời điểm 2, đồ ăn 2. Trả về tối đa 3 gợi ý, điểm giảm dần. */
export function pairTea(mood: Mood | null, moment: Moment | null, food: Food | null): Pick[] {
  const label = (list: { id: string; label: string }[], id: string) => list.find((x) => x.id === id)?.label.toLowerCase() ?? id;
  const picks = TEAS.map((tea) => {
    let score = 0;
    const reasons: string[] = [];
    if (mood && tea.moods.includes(mood)) { score += 3; reasons.push(`hợp tâm trạng ${label(MOODS, mood)}`); }
    if (moment && tea.moments.includes(moment)) { score += 2; reasons.push(`dễ uống vào buổi ${label(MOMENTS, moment)}`); }
    if (food && tea.foods.includes(food)) { score += 2; reasons.push(food === "khong" ? "uống riêng vẫn trọn vị" : `đi cùng ${label(FOODS, food)}`); }
    return { tea, score, reasons };
  });
  return picks.filter((p) => p.score > 0).sort((a, b) => b.score - a.score || a.tea.price - b.tea.price).slice(0, 3);
}

export const vnd = (n: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);
export const fmtSec = (s: number) => { const m = Math.floor(s / 60), r = s % 60; return m ? `${m}:${String(r).padStart(2, "0")}` : `${r}s`; };

/* ---- Bộ trà & khung giờ cho bản tóm tắt ---- */
export type TeaSet = { id: string; name: string; seats: string; min: number; max: number; setup: number; desc: string };
export const SETS: TeaSet[] = [
  { id: "doc-am", name: "Bộ độc ẩm", seats: "1 đến 2 người", min: 1, max: 2, setup: 40000, desc: "Một ấm nhỏ, hai chén. Hợp ngồi riêng, đọc sách." },
  { id: "hoi-ngo", name: "Bộ hội ngộ", seats: "3 đến 5 người", min: 3, max: 5, setup: 70000, desc: "Ấm vừa, bốn chén, khay tre. Hợp bạn bè, đối tác." },
  { id: "quay-quan", name: "Bộ quây quần", seats: "6 đến 8 người", min: 6, max: 8, setup: 120000, desc: "Hai ấm, công cụ rót chung, bàn dài. Hợp gia đình." },
];
export const SLOTS = [
  { id: "s1", label: "Sáng, 8:30 đến 10:30" },
  { id: "s2", label: "Trưa, 11:00 đến 13:00" },
  { id: "s3", label: "Chiều, 14:30 đến 16:30" },
  { id: "s4", label: "Tối, 18:30 đến 20:30" },
];
export const recommendSet = (people: number) => SETS.find((s) => people >= s.min && people <= s.max) ?? SETS[SETS.length - 1];
