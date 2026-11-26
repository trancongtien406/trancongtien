export type Mood = "tinh" | "tap-trung" | "quay-quan" | "nhe-long" | "am-bung";
export type Moment = "sang" | "chieu" | "toi";
export type Food = "khong" | "banh-ngot" | "man-nhe" | "trai-cay" | "hat";

export type Tea = {
  id: string;
  name: string;
  kind: string;
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
  { id: "thai-nguyen", name: "Trà xanh búp", kind: "Trà xanh", flavor: "Chát nhẹ, hậu ngọt, thơm cốm", swatch: "#8fb27c", tempC: 80, grams: 5, ml: 150, steeps: [30, 35, 45], price: 120000, moods: ["tap-trung", "nhe-long"], moments: ["sang", "chieu"], foods: ["khong", "trai-cay", "hat"], note: "Dùng nước vừa sôi để nguội một chút, rót thật sát lá để không bị đắng." },
  { id: "shan-tuyet", name: "Shan tuyết", kind: "Trà xanh", flavor: "Thanh, hậu ngọt sâu, mùi hoa rừng", swatch: "#a3bf8d", tempC: 85, grams: 6, ml: 150, steeps: [25, 30, 40, 55], price: 220000, moods: ["tinh", "tap-trung"], moments: ["sang", "chieu"], foods: ["khong", "hat"], note: "Lá lớn, tráng trà 5 giây rồi mới pha. Nước đầu để làm tỉnh lá." },
  { id: "bach-tra", name: "Bạch trà", kind: "Trà trắng", flavor: "Nhẹ như hoa, ngọt mật, ít chát", swatch: "#d7d9b8", tempC: 85, grams: 5, ml: 150, steeps: [40, 45, 60, 80], price: 190000, moods: ["tinh", "nhe-long"], moments: ["sang", "chieu"], foods: ["khong", "trai-cay"], note: "Rót nước theo thành ấm, tránh dội thẳng lên lá. Pha nhiều nước vẫn êm." },
  { id: "o-long", name: "Ô long cuộn", kind: "Ô long", flavor: "Thơm hoa, béo nhẹ, hậu vị dài", swatch: "#b9a35a", tempC: 95, grams: 6, ml: 150, steeps: [20, 25, 35, 45, 60], price: 180000, moods: ["quay-quan", "nhe-long"], moments: ["chieu", "toi"], foods: ["banh-ngot", "trai-cay", "man-nhe"], note: "Lá cuộn tròn nở dần qua từng nước, mỗi nước một hương khác." },
  { id: "dai-hong-bao", name: "Ô long nướng than", kind: "Ô long nướng", flavor: "Khói nhẹ, vị đá, hậu ngọt than", swatch: "#8a5a3a", tempC: 98, grams: 7, ml: 150, steeps: [15, 20, 30, 40, 55], price: 260000, moods: ["tap-trung", "am-bung"], moments: ["chieu", "toi"], foods: ["man-nhe", "hat"], note: "Nước thật nóng, rót nhanh. Trà nướng chịu được nhiều nước pha." },
  { id: "hong-tra", name: "Hồng trà", kind: "Hồng trà", flavor: "Ngọt hậu, mùi mật và trái chín", swatch: "#a8502b", tempC: 90, grams: 4, ml: 150, steeps: [30, 40, 55], price: 140000, moods: ["am-bung", "quay-quan"], moments: ["sang", "chieu"], foods: ["banh-ngot", "man-nhe"], note: "Hợp với bánh ngọt vừa phải; không pha quá lâu để tránh gắt." },
  { id: "pho-nhi", name: "Phổ nhĩ chín", kind: "Hậu lên men", flavor: "Đậm, mùi gỗ và đất ẩm, êm dày", swatch: "#4a2f22", tempC: 100, grams: 6, ml: 150, steeps: [10, 15, 20, 30, 40, 60], price: 200000, moods: ["am-bung", "tinh"], moments: ["toi", "chieu"], foods: ["man-nhe", "hat"], note: "Rửa trà một lượt nhanh. Nước sôi hẳn, rót ngay để lấy vị đậm mà không đục." },
  { id: "tra-sen", name: "Trà ướp sen", kind: "Trà ướp hương", flavor: "Hương sen dịu, thanh mát, ngọt hậu", swatch: "#c9c9a0", tempC: 85, grams: 5, ml: 150, steeps: [30, 40, 50], price: 240000, moods: ["tinh", "quay-quan"], moments: ["sang", "chieu"], foods: ["banh-ngot", "khong"], note: "Hương sen dễ bay, pha ấm đã làm nóng và đậy nắp ngay." },
  { id: "tra-nhai", name: "Trà nhài", kind: "Trà ướp hương", flavor: "Hoa nhài rõ, ngọt thơm, sáng vị", swatch: "#e0e0b8", tempC: 80, grams: 5, ml: 150, steeps: [30, 35, 45], price: 130000, moods: ["nhe-long", "quay-quan"], moments: ["sang", "chieu"], foods: ["banh-ngot", "trai-cay"], note: "Không dùng nước sôi hẳn để hương nhài không bị gắt." },
  { id: "matcha", name: "Matcha đánh tay", kind: "Bột trà xanh", flavor: "Đậm rêu xanh, béo umami, hậu ngọt", swatch: "#6f9b3f", tempC: 75, grams: 2, ml: 70, steeps: [30], price: 150000, moods: ["tap-trung", "tinh"], moments: ["sang", "chieu"], foods: ["banh-ngot", "khong"], note: "Rây bột, đánh hình chữ M trong 30 giây đến khi mịn bọt." },
  { id: "hojicha", name: "Hojicha rang", kind: "Trà xanh rang", flavor: "Rang thơm, ngọt hạt dẻ, ít chát", swatch: "#7b5a3a", tempC: 95, grams: 5, ml: 150, steeps: [20, 25, 35], price: 110000, moods: ["am-bung", "nhe-long"], moments: ["toi", "chieu"], foods: ["banh-ngot", "hat", "man-nhe"], note: "Rang kỹ nên pha được bằng nước sôi; hợp buổi tối vì hương dịu." },
  { id: "genmaicha", name: "Genmaicha gạo rang", kind: "Trà xanh gạo rang", flavor: "Thơm cơm cháy, hậu ngọt, nhẹ", swatch: "#a89b5e", tempC: 90, grams: 5, ml: 150, steeps: [30, 40, 50], price: 100000, moods: ["quay-quan", "am-bung"], moments: ["sang", "chieu", "toi"], foods: ["man-nhe", "hat", "khong"], note: "Dễ pha nhất trong danh mục, hợp nhóm đông và đồ ăn mặn nhẹ." },
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

/** Giá một chén lẻ (khoảng 40% giá ấm, làm tròn 5.000). */
export const cupPrice = (t: Tea) => Math.round((t.price * 0.4) / 5000) * 5000;

/* ---- Bánh trà & đồ ăn kèm ---- */
export type Bite = { name: string; note: string; price: number };
export const BITES: { id: string; title: string; hint: string; items: Bite[] }[] = [
  { id: "ngot", title: "Bánh ngọt", hint: "Hợp hồng trà, ô long, matcha, trà ướp hương", items: [
    { name: "Bánh đậu xanh nướng", note: "4 miếng, bở mịn, ít ngọt", price: 45000 },
    { name: "Mochi nhân đậu đỏ", note: "3 cái, dẻo, dùng lạnh", price: 55000 },
    { name: "Bông lan trà xanh", note: "1 lát dày, kèm kem tươi ít ngọt", price: 60000 },
    { name: "Chè hạt sen long nhãn", note: "Chén nhỏ, dùng ấm", price: 50000 },
  ] },
  { id: "man", title: "Mặn nhẹ", hint: "Hợp ô long nướng, phổ nhĩ, hojicha, genmaicha", items: [
    { name: "Cơm cháy chà bông", note: "Giòn, rắc mè, dùng kèm nước mắm tỏi ớt nhạt", price: 55000 },
    { name: "Bánh tráng nướng mè", note: "Đĩa nhỏ, chấm muối tôm", price: 40000 },
    { name: "Rong biển sấy giòn", note: "Cuộn nhỏ, ít muối", price: 45000 },
  ] },
  { id: "hat", title: "Trái cây & hạt", hint: "Hợp trà xanh, bạch trà, shan tuyết", items: [
    { name: "Đĩa trái cây theo mùa", note: "3 đến 4 loại, cắt sẵn", price: 80000 },
    { name: "Hạt điều rang muối", note: "Một đĩa nhỏ, rang trong ngày", price: 50000 },
    { name: "Hạnh nhân và óc chó", note: "Rang nhẹ, không ướp", price: 70000 },
  ] },
];

/* ---- Bàn & phòng trà ---- */
export const ROOMS = [
  { id: "ban", name: "Bàn thấp trước hiên", seats: "1 đến 4 người", fee: "Không phụ phí", rule: "Nhận khách tại chỗ, không cần đặt trước. Có thể giữ bàn 15 phút.", detail: "Mặt bàn gỗ thấp, đệm ngồi, nhìn ra khoảng sân nhỏ. Phù hợp ngồi một mình, cặp đôi, buổi gặp ngắn." },
  { id: "tinh", name: "Phòng trà Tĩnh", seats: "4 đến 6 người", fee: "Phụ phí phòng 120.000₫ mỗi giờ", rule: "Đặt trước, tối thiểu 2 giờ, đặt cọc 30%.", detail: "Phòng kín, cửa trượt giấy, một bàn dài và bếp nước riêng. Hợp họp nhóm nhỏ, sinh nhật nhẹ, tiếp khách." },
  { id: "lang", name: "Phòng trà Lặng", seats: "6 đến 10 người", fee: "Phụ phí phòng 180.000₫ mỗi giờ", rule: "Đặt trước, tối thiểu 2 giờ, đặt cọc 30%.", detail: "Phòng lớn nhất, hai bàn nối, có thể bày bánh trà theo set. Hợp gia đình, nhóm bạn, buổi gặp đối tác." },
];

/* ---- Trà đóng gói mang về ---- */
export const TAKEAWAY = [
  { name: "Trà xanh búp", pack: "50 g", price: 90000 },
  { name: "Shan tuyết", pack: "50 g", price: 180000 },
  { name: "Bạch trà", pack: "50 g", price: 160000 },
  { name: "Ô long cuộn", pack: "100 g", price: 220000 },
  { name: "Hồng trà", pack: "100 g", price: 150000 },
  { name: "Hojicha rang", pack: "100 g", price: 110000 },
  { name: "Genmaicha gạo rang", pack: "100 g", price: 90000 },
  { name: "Matcha đánh tay", pack: "30 g", price: 160000 },
];
export const GEAR = [
  { name: "Ấm gốm nhỏ 150 ml", price: 350000 },
  { name: "Bộ 4 chén gốm", price: 280000 },
  { name: "Que đánh matcha tre", price: 120000 },
];

export const HOURS = [
  { day: "Thứ Hai đến Thứ Sáu", time: "8:30 đến 21:30" },
  { day: "Thứ Bảy, Chủ Nhật", time: "8:00 đến 22:00" },
  { day: "Gọi nước cuối", time: "Trước giờ đóng cửa 30 phút" },
];

export const POLICIES = [
  ["Giữ bàn", "Bàn thấp nhận khách tại chỗ. Bàn đã đặt được giữ 15 phút kể từ giờ hẹn."],
  ["Đặt phòng trà", "Phòng Tĩnh và Lặng cần đặt trước ít nhất 1 ngày, đặt cọc 30% giá trị dự kiến."],
  ["Huỷ và đổi giờ", "Huỷ hoặc đổi giờ trước 24 giờ: hoàn đủ tiền cọc. Sau mốc này, tiền cọc được giữ lại."],
  ["Phụ phí", "Phòng riêng tính theo giờ, tối thiểu 2 giờ. Bộ trà theo số người tính một lần mỗi bàn."],
  ["Đồ ăn mang vào", "Vui lòng không mang đồ ăn, nước uống ngoài vào quán. Bánh sinh nhật nhỏ được phép, báo trước giúp chúng tôi."],
  ["Giữ yên lặng", "Nói chuyện nhỏ, để điện thoại chế độ rung. Không hút thuốc trong nhà. Trẻ nhỏ đi cùng người lớn."],
];
