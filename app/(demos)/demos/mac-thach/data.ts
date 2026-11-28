export type FragranceVolume = {
  ml: 50 | 100;
  price: number;
};

export type Fragrance = {
  id: string;
  index: string;
  /** Phần chữ thường trước phần nghiêng có màu nhấn */
  namePrefix: string;
  /** Phần chữ nghiêng mang màu ánh sáng riêng (như Gre + nat, Rose + Lune trong video) */
  nameAccent: string;
  fullName: string;
  subtitleVi: string;
  mood: "tram-am" | "hoa-dem" | "suong-lanh" | "bien-sau" | "do-tram";
  moodLabel: string;
  concentration: string;
  image: string;
  /** Màu nhấn chính (HEX) cho chữ nghiêng & điểm sáng */
  accentHex: string;
  /** Bộ ba RGB cho gradient chùm sáng rọi & ánh phản chiếu */
  accentRgb: string;
  /** Màu nền hốc sáng nhẹ khi hover/mở rộng */
  glowRgb: string;
  shortDesc: string;
  story: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  longevity: string;
  sillage: string;
  intensity: number; // 1-5
  volumes: [FragranceVolume, FragranceVolume];
};

export const FRAGRANCES: readonly Fragrance[] = [
  {
    id: "ambre-nocturne",
    index: "01",
    namePrefix: "Ambre ",
    nameAccent: "Nocturne",
    fullName: "Ambre Nocturne",
    subtitleVi: "Hổ Phách & Khói Trầm",
    mood: "tram-am",
    moodLabel: "Trầm ấm",
    concentration: "Extrait de Parfum · 34%",
    image: "/images/demos/mac-thach/flacon-ambre.jpg",
    accentHex: "#e3a857",
    accentRgb: "227, 168, 87",
    glowRgb: "198, 128, 42",
    shortDesc: "Nhựa hổ phách hun khói, trầm hương già và vani Madagascar nướng chậm.",
    story:
      "Lấy cảm hứng từ lò ủ nhựa thơm lúc nửa đêm. Lớp hổ phách ấm nóng tan chảy trên nền gỗ trầm khô và nhựa labdanum, để lại vệt khói vàng sang trọng kéo dài suốt 14 giờ.",
    notes: {
      top: ["Cam Bergamot nướng", "Hạt bạch đậu khấu", "Tiêu hồng"],
      heart: ["Nhựa Labdanum", "Trầm hương Khánh Hòa", "Nhũ hương Oman"],
      base: ["Hổ phách xám", "Vani đen Madagascar", "Gỗ đàn hương"],
    },
    longevity: "12–14 giờ",
    sillage: "Mạnh, ôm sát ấm áp",
    intensity: 5,
    volumes: [
      { ml: 50, price: 4850000 },
      { ml: 100, price: 6950000 },
    ],
  },
  {
    id: "rose-lune",
    index: "02",
    namePrefix: "Rose ",
    nameAccent: "Lune",
    fullName: "Rose Lune",
    subtitleVi: "Hồng Nguyệt & Xạ Trắng",
    mood: "hoa-dem",
    moodLabel: "Hoa đêm",
    concentration: "Extrait de Parfum · 30%",
    image: "/images/demos/mac-thach/flacon-rose.jpg",
    accentHex: "#f0a6b8",
    accentRgb: "240, 166, 184",
    glowRgb: "226, 134, 158",
    shortDesc: "Cánh hồng Damask hái trước bình minh, vải chín lạnh và xạ hương mịn như lụa.",
    story:
      "Không phải đóa hồng ngọt ngào ban ngày, Rose Lune nở trong ánh trăng lạnh. Vị thanh mát của quả lý chua và sương đêm cân bằng độ quyến rũ của hồng tháng Năm và gỗ cashmere.",
    notes: {
      top: ["Lý chua đen", "Vải thiều ướp lạnh", "Tiêu Tứ Xuyên"],
      heart: ["Hoa hồng Damask", "Hoa mẫu đơn trắng", "Rượu Champagne hồng"],
      base: ["Xạ hương trắng", "Gỗ Cashmere", "Hoắc hương sạch"],
    },
    longevity: "9–11 giờ",
    sillage: "Vừa phải, mềm mại",
    intensity: 3,
    volumes: [
      { ml: 50, price: 4650000 },
      { ml: 100, price: 6650000 },
    ],
  },
  {
    id: "brume-diris",
    index: "03",
    namePrefix: "Brume ",
    nameAccent: "d’Iris",
    fullName: "Brume d’Iris",
    subtitleVi: "Sương Ngọc & Diên Vĩ",
    mood: "suong-lanh",
    moodLabel: "Sương lạnh",
    concentration: "Extrait de Parfum · 28%",
    image: "/images/demos/mac-thach/flacon-brume.jpg",
    accentHex: "#c4d6be",
    accentRgb: "196, 214, 190",
    glowRgb: "160, 188, 154",
    shortDesc: "Làn sương sớm trên đá ướt, rễ diên vĩ Florence và trà trắng ủ lạnh.",
    story:
      "Tĩnh lặng và trong suốt như giọt sương đọng trên phiến đá bazan lúc 5 giờ sáng. Rễ diên vĩ nghiền mịn hoà cùng lá sung xanh và cỏ hương bài tạo cảm giác sạch sẽ, khoáng đạt.",
    notes: {
      top: ["Trà trắng Bạch Hào", "Lá sung non", "Chanh Yuzu"],
      heart: ["Rễ diên vĩ Florence", "Hoa bạch chỉ", "Khoáng đá ướt"],
      base: ["Cỏ hương bài Haiti", "Gỗ tuyết tùng trắng", "Ambrette"],
    },
    longevity: "8–10 giờ",
    sillage: "Tinh tế, gần da",
    intensity: 2,
    volumes: [
      { ml: 50, price: 4500000 },
      { ml: 100, price: 6450000 },
    ],
  },
  {
    id: "abysse",
    index: "04",
    namePrefix: "A",
    nameAccent: "bysse",
    fullName: "Abysse",
    subtitleVi: "Vực Thẳm & Long Diên Hương",
    mood: "bien-sau",
    moodLabel: "Biển sâu",
    concentration: "Extrait de Parfum · 32%",
    image: "/images/demos/mac-thach/flacon-abysse.jpg",
    accentHex: "#4d94ff",
    accentRgb: "77, 148, 255",
    glowRgb: "30, 96, 224",
    shortDesc: "Muối biển đen, long diên hương tự nhiên, bách xù lạnh và gỗ lũa ngập mặn.",
    story:
      "Một cú lặn sâu vào đại dương lúc nửa đêm nơi ánh sáng tắt dần. Vị mặn khoáng của đá ngầm và tảo biển gặp độ sâu bí ẩn của long diên hương, tạo nên khí chất lạnh lùng khó quên.",
    notes: {
      top: ["Quả bách xù lạnh", "Muối biển đen", "Bưởi đắng"],
      heart: ["Tảo biển Đại Tây Dương", "Cây xô thơm", "Oải hương núi"],
      base: ["Long diên hương", "Gỗ lũa biển", "Rêu sồi đen"],
    },
    longevity: "11–13 giờ",
    sillage: "Lan tỏa xa, sắc nét",
    intensity: 4,
    volumes: [
      { ml: 50, price: 4950000 },
      { ml: 100, price: 7150000 },
    ],
  },
  {
    id: "grenat",
    index: "05",
    namePrefix: "Gre",
    nameAccent: "nat",
    fullName: "Grenat",
    subtitleVi: "Hồng Lựu & Da Thuộc Đỏ",
    mood: "do-tram",
    moodLabel: "Đỏ trầm",
    concentration: "Extrait de Parfum · 35%",
    image: "/images/demos/mac-thach/flacon-grenat.jpg",
    accentHex: "#e03e62",
    accentRgb: "224, 62, 98",
    glowRgb: "196, 36, 72",
    shortDesc: "Anh đào đen ngâm rượu, nghệ tây đỏ, hoa hồng nhung và da thuộc hun khói.",
    story:
      "Sắc đỏ ruby đặc quánh trong khối pha lê dày. Grenat mở đầu bằng anh đào đen và nghệ tây cay nồng, rồi lắng xuống lớp da thuộc mềm và đậu tonka cháy đầy mê hoặc.",
    notes: {
      top: ["Anh đào đen", "Nhụy hoa nghệ tây", "Rượu Rum ủ lâu"],
      heart: ["Hoa hồng nhung đỏ", "Hạt lựu ép", "Hoa mộc tê"],
      base: ["Da thuộc đen", "Đậu Tonka rang", "Nhựa Benzoin Siam"],
    },
    longevity: "12–15 giờ",
    sillage: "Rất mạnh, đầy cuốn hút",
    intensity: 5,
    volumes: [
      { ml: 50, price: 5150000 },
      { ml: 100, price: 7450000 },
    ],
  },
] as const;

export const DISCOVERY_SET = {
  id: "discovery-night-5x5",
  name: "Coffret Khám Phá Đêm · 5 × 5ml",
  price: 1650000,
  subtitle: "Trọn bộ 5 mùi hương The Night Collection kèm phiếu ưu đãi 1.650.000 ₫ cho chai 100ml.",
  image: "/images/demos/mac-thach/atelier-craft.jpg",
} as const;

export const ATELIER_PILLARS = [
  {
    metric: "90 ngày",
    title: "Ủ lạnh trong hầm đá bazan",
    desc: "Mỗi mẻ tinh dầu được ủ tĩnh ở 12°C bên trong vách đá bazan để các phân tử hương hòa quyện tròn vị, không gắt cồn.",
  },
  {
    metric: "28–35%",
    title: "Nồng độ Extrait de Parfum",
    desc: "Tỷ lệ tinh dầu nguyên bản cao gấp đôi Eau de Parfum thông thường, giúp mùi hương tiến hóa chậm rãi suốt 10 đến 15 giờ.",
  },
  {
    metric: "Thủ công",
    title: "Pha lê thổi & đánh số lô",
    desc: "Thân chai thủy tinh dày đúc khuôn riêng cho từng mùi hương, chiết rót và đóng nắp từng chai tại xưởng chế tác.",
  },
] as const;

export function formatVnd(amount: number): string {
  return new Intl.NumberFormat("vi-VN").format(amount) + " ₫";
}
