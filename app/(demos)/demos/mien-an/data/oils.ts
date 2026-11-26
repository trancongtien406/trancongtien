export type OilId = "sa-chanh" | "gung-que" | "oai-huong" | "tra-xanh" | "khong-huong";

export type Oil = {
  id: OilId;
  name: string;
  note: string;
  /** Tông trang khi chọn: ghi đè token màu của thương hiệu. */
  tone: { ivory: string; linen: string; olive: string; forest: string; bronze: string; swatch: string };
};

export const OILS: readonly Oil[] = [
  { id: "sa-chanh", name: "Sả chanh", note: "Mùi tươi, hơi chua nhẹ, hợp buổi trưa và trời nóng.", tone: { ivory: "#f1f1e1", linen: "#e1e4c7", olive: "#4b5a2a", forest: "#2a3018", bronze: "#7d8446", swatch: "#a3ad4a" } },
  { id: "gung-que", name: "Gừng quế", note: "Mùi ấm, cay nhẹ, hợp liệu trình đá ấm và ngày mưa.", tone: { ivory: "#f5ebdc", linen: "#ecd5b8", olive: "#6b3f1e", forest: "#35200f", bronze: "#a8662c", swatch: "#c07a3a" } },
  { id: "oai-huong", name: "Oải hương", note: "Mùi hoa dịu, hợp buổi tối và khi bạn muốn thật yên.", tone: { ivory: "#f1edf3", linen: "#dfd7e6", olive: "#4f4466", forest: "#2a2336", bronze: "#7a6c93", swatch: "#8f7fae" } },
  { id: "tra-xanh", name: "Trà xanh bạc hà", note: "Mùi mát, sạch, hợp chăm sóc da mặt và ngâm chân.", tone: { ivory: "#eaf0eb", linen: "#d3e2d9", olive: "#2f5a4e", forest: "#18302a", bronze: "#4f8071", swatch: "#5f9684" } },
  { id: "khong-huong", name: "Không hương liệu", note: "Dầu nền không mùi, dành cho người nhạy cảm với hương.", tone: { ivory: "#f3efe6", linen: "#e6dccd", olive: "#485346", forest: "#292d26", bronze: "#8d765e", swatch: "#c6b59e" } },
] as const;

export const getOil = (id: OilId | null) => OILS.find((o) => o.id === id) ?? null;
