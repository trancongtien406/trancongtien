import type { Kind } from "./Scene";

export type Project = { n: string; title: string; type: string; bg: Kind | null; kind: Kind };
export const PROJECTS: Project[] = [
  { n: "01", title: "Id / một cái túi", type: "Dự án đa phương tiện", bg: "p6063062", kind: "face" },
  { n: "02", title: "Cô gái. Công chúa.", type: "Thiết kế sách", bg: "hammock", kind: "book" },
  { n: "03", title: "Bạc Thanh", type: "Thiết kế web", bg: null, kind: "shades" },
  { n: "04", title: "Mưa tháng Sáu", type: "Nhiếp ảnh", bg: "sea", kind: "room" },
  { n: "05", title: "Chuyện nhỏ ở ga", type: "Phim ngắn", bg: "subway", kind: "coat" },
  { n: "06", title: "Nhật ký nét vẽ", type: "Minh hoạ", bg: null, kind: "bird" },
];

export type Item = { id: string; kind: Kind; x: number; y: number; w: number; h: number; proj?: number; cap?: string; doodle?: string };
export const HOME: Item[] = [
  { id: "h1", kind: "face", x: 4, y: 24, w: 17, h: 36, proj: 0 },
  { id: "h2", kind: "shades", x: 30, y: 10, w: 18, h: 18, proj: 2 },
  { id: "h3", kind: "room", x: 64, y: 40, w: 15, h: 24, proj: 3 },
  { id: "h4", kind: "arch", x: 62, y: 6, w: 17, h: 26, proj: 5 },
  { id: "h5", kind: "book", x: 24, y: 62, w: 13, h: 27, proj: 1 },
  { id: "h6", kind: "hand", x: 44, y: 44, w: 14, h: 20, proj: 4 },
  { id: "h7", kind: "dancer", x: 74, y: 70, w: 15, h: 20 },
  { id: "h8", kind: "ring", x: 46, y: 76, w: 9, h: 14 },
];

function rng(seed: number) { let a = seed; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const PORTRAIT = [19999456, 13469411, 18890524, 36322502, 33393745, 31635316, 17029891, 5888319, 34921744, 35233104, 6615806, 38975400, 33185291, 28637678, 18081014, 34968703, 6500631, 8832159, 1701208, 10820346, 6081456];
const LAND = [23468954, 12737410, 15921368, 29731398, 2912515, 5202049, 33646085, 7700270];
const CAPS = ["Đêm thứ Năm|minh hoạ|2023", "Một nét và một ý nghĩ|2022", "Thử nghiệm mực đỏ|2024", "Ghi chép ở ga|2023", "Chợ Hàn sáng sớm|ảnh|2024", "Áo thun mùa hè|in và thương hiệu|2023"];
const DOODLES = ["basket", "palm", "ac", "chicken", "sword", "city", "scribble"];
export const PLAY: Item[] = (() => {
  const r = rng(11);
  const list: Item[] = [];
  const kinds = [...PORTRAIT, ...LAND];
  for (let i = 0; i < 30; i++) {
    const n = kinds[i % kinds.length];
    const portrait = PORTRAIT.includes(n);
    const w = 3 + r() * 3.2;
    list.push({ id: `p${i}`, kind: `p${n}`, x: 3 + r() * 88, y: 4 + r() * 84, w, h: portrait ? w * 1.5 : w * 1.05, cap: r() < 0.4 ? CAPS[i % CAPS.length] : undefined });
  }
  DOODLES.forEach((d, i) => list.push({ id: `d${i}`, kind: "doodle", doodle: d, x: 6 + r() * 84, y: 6 + r() * 80, w: 6 + r() * 3, h: 6, cap: i % 2 ? "Nét vẽ|2024" : undefined }));
  return list;
})();

export const JEWELS: { kind: Kind; name: string }[] = [
  { kind: "earring", name: "Bông tai tròn" },
  { kind: "ring", name: "Nhẫn bạc" },
  { kind: "bow", name: "Vòng cổ bạc" },
  { kind: "shades", name: "Kính gọng cam" },
];

export const CASES: Record<number, { title: string; meta: string; text: string; credit: string; shots: { k: string; cap: string }[] }> = {
  0: { title: "Id / một cái túi", meta: "Đà Nẵng, 2024. Ảnh. Ghi chép.", text: "Một dự án đa phương tiện về những thứ ta mang theo bên người: chân dung, đồ vật và vài dòng ghi chú viết tay. Mỗi chiếc túi là một câu chuyện nhỏ về chủ nhân của nó.", credit: "Ảnh minh hoạ, nguồn Pexels.", shots: [{ k: "p6063062", cap: "Chân dung sau lớp kính mưa" }, { k: "p19999456", cap: "Cô gái cầm tay lên má" }, { k: "p13469411", cap: "Ánh nhìn dưới khăn choàng" }, { k: "p36322502", cap: "Nhắm mắt" }, { k: "p31635316", cap: "Nụ cười ven đèn" }, { k: "p33393745", cap: "Hai người, một khung hình" }] },
  1: { title: "Cô gái. Công chúa.", meta: "Sài Gòn, 2023. Thiết kế sách.", text: "Thiết kế bìa và dàn trang cho một tập truyện ngắn về những cô gái lớn lên giữa hai thế giới. Bìa đỏ, chữ lớn, ảnh chân dung cắt sát và nhiều khoảng trắng.", credit: "Ảnh minh hoạ, nguồn Pexels.", shots: [{ k: "p2912515", cap: "Đọc bên cửa sổ" }, { k: "p18081014", cap: "Váy đỏ ở sân nhà" }, { k: "p32166667", cap: "Bìa sách thử" }, { k: "p33393745", cap: "Hai chị em" }, { k: "p34968703", cap: "Cánh cửa đỏ, trang bìa phụ" }, { k: "p5888319", cap: "Buổi tập múa" }] },
  3: { title: "Mưa tháng Sáu", meta: "Quy Nhơn, 2025. Nhiếp ảnh phim.", text: "Loạt ảnh chụp bờ biển và những chuyến đi chậm vào mùa mưa: đá, sóng, một cánh buồm ở xa. Làm bằng máy phim cũ và rất nhiều kiên nhẫn.", credit: "Ảnh minh hoạ, nguồn Pexels.", shots: [{ k: "p31357533", cap: "Sóng trên đá" }, { k: "p23468954", cap: "Cánh buồm" }, { k: "p12737410", cap: "Mặt nước" }, { k: "p36911651", cap: "Hồ lúc chiều" }, { k: "p4704984", cap: "Dù lượn" }, { k: "p18821441", cap: "Cánh đồng cỏ khô" }] },
  4: { title: "Chuyện nhỏ ở ga", meta: "Hà Nội, 2025. Phim ngắn. Ảnh.", text: "Phim ngắn và loạt ảnh về những người chờ tàu: mỗi người một nhịp, một câu chuyện không ai kể. Quay trong ba đêm ở ga tàu điện.", credit: "Ảnh minh hoạ, nguồn Pexels.", shots: [{ k: "p40337828", cap: "Sân ga" }, { k: "p15921368", cap: "Đường ray cuối ngày" }, { k: "p29731398", cap: "Hầm tàu" }, { k: "p7884213", cap: "Dây điện và toà nhà" }, { k: "p6500631", cap: "Một nửa gương mặt" }, { k: "p8832159", cap: "Đôi tay" }] },
  5: { title: "Nhật ký nét vẽ", meta: "Sài Gòn, 2022 đến nay. Minh hoạ.", text: "Cuốn sổ minh hoạ hằng ngày: mỗi trang là một vật nhỏ nhặt được trên đường, kèm vài dòng ghi chú. Dưới đây là những thứ làm nên các nét vẽ ấy.", credit: "Ảnh tư liệu minh hoạ, nguồn Pexels.", shots: [{ k: "p33185291", cap: "Phù điêu đá" }, { k: "p36492217", cap: "Gỗ chạm" }, { k: "p28637678", cap: "Tượng trắng" }, { k: "p28147598", cap: "Xích đu buổi chiều" }, { k: "p37798256", cap: "Trang sức nhỏ trên giấy nâu" }, { k: "p4704984", cap: "Chiếc dù" }] },
};
