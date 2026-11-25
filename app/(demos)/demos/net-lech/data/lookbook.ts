import type { ServiceId } from "./builder";

export type LbLength = "short" | "medium" | "long";
export type LbTech = "cut" | "color" | "perm" | "style";
export type LbStyle = "minimal" | "edgy" | "bold" | "elegant" | "natural";
export type LbCare = "low" | "medium" | "high";

export interface Look {
  id: string; name: string; length: LbLength; tech: LbTech[]; style: LbStyle; care: LbCare;
  desc: string; careNote: string; services: ServiceId[];
  image: { file: string; alt: string; ratio: string; pos: string };
}

export const LABELS = {
  length: { short: "Ngắn", medium: "Vừa", long: "Dài" } as Record<LbLength, string>,
  tech: { cut: "Cắt", color: "Nhuộm", perm: "Uốn", style: "Tạo kiểu" } as Record<LbTech, string>,
  style: { minimal: "Tối giản", edgy: "Cá tính", bold: "Nổi bật", elegant: "Thanh lịch", natural: "Tự nhiên" } as Record<LbStyle, string>,
  care: { low: "Thấp", medium: "Trung bình", high: "Cao" } as Record<LbCare, string>,
};

export const LOOKS: Look[] = [
  { id: "LK-01", name: "Sharp Bob", length: "short", tech: ["cut"], style: "minimal", care: "medium",
    desc: "Đường cắt ngang rõ nét quanh cằm, gáy gọn, tạo hình khối sạch. Hợp làm cảm hứng cho phong cách tối giản.",
    careNote: "Thường cần sấy định hình để giữ đường cắt; nên cắt tỉa định kỳ.", services: ["SV-01"],
    image: { file: "bob-sau-gay", alt: "Mái tóc bob cắt gọn nhìn từ sau gáy trên nền xanh", ratio: "3 / 4", pos: "50% 40%" } },
  { id: "LK-02", name: "Nape Undercut", length: "short", tech: ["cut"], style: "edgy", care: "low",
    desc: "Phần gáy và hai bên cắt sát, phía trên giữ độ dày. Đường chuyển rõ, cá tính nhưng gọn.",
    careNote: "Tạo kiểu nhanh, cần chỉnh lại phần gáy theo tốc độ mọc tóc.", services: ["SV-01"],
    image: { file: "gay-undercut", alt: "Gáy và mái tóc đen cắt undercut nhìn nghiêng từ sau", ratio: "3 / 4", pos: "50% 35%" } },
  { id: "LK-03", name: "Copper Long", length: "long", tech: ["cut", "color"], style: "bold", care: "high",
    desc: "Mái tóc dài thẳng mang sắc đồng ấm, tạo chiều sâu và một điểm nhấn màu sắc rõ ràng.",
    careNote: "Màu nhuộm có thể phai theo thời gian; cân nhắc sản phẩm dành cho tóc nhuộm.", services: ["SV-01", "SV-02"],
    image: { file: "toc-dai-thang", alt: "Mái tóc dài thẳng màu đồng nhìn từ sau lưng", ratio: "3 / 4", pos: "50% 40%" } },
  { id: "LK-04", name: "Loose Wave", length: "long", tech: ["perm", "style"], style: "natural", care: "medium",
    desc: "Những lọn sóng mềm màu vàng sáng, tạo chuyển động tự nhiên cho mái tóc dài.",
    careNote: "Chải nhẹ, hạn chế nhiệt quá mức; kết cấu phụ thuộc chất tóc từng người.", services: ["SV-03"],
    image: { file: "song-vang", alt: "Bàn tay vuốt mái tóc vàng gợn sóng nhìn từ sau", ratio: "3 / 4", pos: "50% 45%" } },
  { id: "LK-05", name: "Rose Flash", length: "short", tech: ["color"], style: "bold", care: "high",
    desc: "Mảng màu hồng đào trên nền tóc sáng, cận cảnh lúc đang lên màu. Một lựa chọn cho người thích nổi bật.",
    careNote: "Cần đánh giá nền tóc trước; duy trì sắc độ thường xuyên hơn các màu tự nhiên.", services: ["SV-02"],
    image: { file: "nhuom-hong", alt: "Cận cảnh bàn tay đeo găng bôi thuốc nhuộm hồng lên tóc", ratio: "4 / 5", pos: "50% 50%" } },
  { id: "LK-06", name: "Crop & Comb", length: "short", tech: ["cut", "style"], style: "elegant", care: "low",
    desc: "Tóc ngắn tỉa bằng kéo và lược, đường cắt mềm và gọn. Hợp người thích vẻ ngoài chỉn chu mà không cầu kỳ.",
    careNote: "Tạo kiểu nhẹ; cắt chỉnh định kỳ để giữ phom.", services: ["SV-01"],
    image: { file: "keo-luoc", alt: "Kéo và lược tỉa mái tóc ngắn, nhìn từ phía sau đầu", ratio: "3 / 4", pos: "50% 50%" } },
  { id: "LK-07", name: "Blunt Ends", length: "long", tech: ["cut"], style: "elegant", care: "medium",
    desc: "Phần đuôi tóc dài được tỉa phẳng, gọn, thẳng. Đơn giản nhưng đường nét rõ ràng.",
    careNote: "Chăm sóc phần ngọn và tỉa định kỳ để đuôi tóc luôn đều.", services: ["SV-01", "SV-04"],
    image: { file: "cat-toc-dai", alt: "Lược và kéo tỉa đuôi mái tóc dài thẳng", ratio: "3 / 4", pos: "50% 35%" } },
  { id: "LK-08", name: "Round-brush Blowout", length: "medium", tech: ["style"], style: "elegant", care: "medium",
    desc: "Sấy phồng bằng lược tròn, tạo độ bồng nhẹ ở chân tóc và đường cong mềm ở ngọn.",
    careNote: "Phom giữ được bao lâu phụ thuộc chất tóc và thời tiết; có thể cần sản phẩm tạo kiểu.", services: ["SV-01"],
    image: { file: "may-say-tron", alt: "Máy sấy và lược tròn tạo phồng cho mái tóc", ratio: "3 / 4", pos: "50% 45%" } },
];

export interface LbFilters { length: LbLength[]; tech: LbTech[]; style: LbStyle[]; care: LbCare[] }
export const EMPTY_FILTERS: LbFilters = { length: [], tech: [], style: [], care: [] };

/** Trong cùng nhóm: OR. Giữa các nhóm: AND. Giữ nguyên thứ tự dữ liệu. */
export function filterLooks(items: Look[], f: LbFilters): Look[] {
  return items.filter((i) =>
    (f.length.length === 0 || f.length.includes(i.length)) &&
    (f.tech.length === 0 || i.tech.some((t) => f.tech.includes(t))) &&
    (f.style.length === 0 || f.style.includes(i.style)) &&
    (f.care.length === 0 || f.care.includes(i.care)),
  );
}
