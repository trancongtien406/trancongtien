export type Bean = {
  id: string; code: string; level: string; name: string; type: string; region: string; roast: string;
  body: number; acidity: number; notes: string; brew: string; weight: string; priceVnd: number;
  desc: string; howTo: string; image: string; alt: string; tone: "ink" | "heat" | "paper";
};
export const BEANS: readonly Bean[] = [
  { id: "B01", code: "01 / DARK", level: "dark", name: "Nhiệt Đậm", type: "Robusta", region: "Đắk Lắk", roast: "Medium-dark", body: 5, acidity: 1, notes: "Cacao · Hạt rang", brew: "Phin, espresso", weight: "250g", priceVnd: 165000,
    desc: "Đậm ngay từ ngụm đầu, hậu cacao và hạt rang kéo dài. Dành cho những ai thích cà phê có sức nặng, đặc biệt khi pha phin hoặc kết hợp cùng sữa đặc.",
    howTo: "Phin: 20 g cà phê, 160 ml nước 92–95°C, ủ 30 giây rồi để nhỏ giọt khoảng 4 phút. Thêm sữa đặc nếu muốn vị Việt đậm đà.",
    image: "hat-rang-toi", alt: "Cận cảnh hạt cà phê rang đậm màu", tone: "ink" },
  { id: "B02", code: "02 / MEDIUM", level: "medium", name: "Nhiệt Vừa", type: "Blend Arabica và Robusta", region: "Tây Nguyên", roast: "Medium", body: 3, acidity: 2, notes: "Caramel · Hạt dẻ", brew: "Espresso, phin, French press", weight: "250g", priceVnd: 195000,
    desc: "Một điểm cân bằng giữa độ đậm, vị ngọt và hương thơm. Linh hoạt cho nhiều cách pha, dễ uống đen và cũng hợp với sữa.",
    howTo: "French press: 1 phần cà phê, 15 phần nước 94°C, ủ 4 phút rồi ấn chậm. Xay thô vừa, đều hạt.",
    image: "hat-rang-can-canh", alt: "Hạt cà phê rang vừa, nâu caramel", tone: "heat" },
  { id: "B03", code: "03 / LIGHT", level: "light", name: "Nhiệt Sáng", type: "Arabica", region: "Lâm Đồng", roast: "Light", body: 2, acidity: 4, notes: "Cam · Hoa · Mật ong", brew: "V60, pour-over, Cold Brew", weight: "250g", priceVnd: 235000,
    desc: "Thanh, sáng vị, gợi nhớ đến cam, hoa và mật ong. Phù hợp với những ai muốn khám phá các lớp hương tự nhiên của cà phê.",
    howTo: "V60: 15 g cà phê, 250 ml nước 93°C, rót làm ba lượt, tổng thời gian khoảng 2:45. Xay vừa mịn.",
    image: "hat-rang-vang", alt: "Hạt cà phê rang sáng ánh cam", tone: "paper" },
];
