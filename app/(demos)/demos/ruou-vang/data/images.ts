export const IMG_BASE = "/images/demos/ruou-vang";
export type Img = { name: string; w: number; h: number; alt: string };
export const IMGS = {
  heroTealights: { name: "hero-tealights", w: 1000, h: 1500, alt: "Ly vang đỏ giữa những ngọn nến nhỏ trước nền rèm đỏ sẫm" },
  glassCandle: { name: "glass-candle", w: 1000, h: 1782, alt: "Chân ly vang và ngọn nến hổ phách trong bóng tối" },
  candleSmoke: { name: "candle-smoke", w: 1000, h: 1500, alt: "Khói bay lên từ nến vừa tắt bên cạnh ly vang đỏ" },
  cellar: { name: "cellar", w: 1000, h: 1334, alt: "Hành lang hầm rượu gạch với hàng thùng gỗ sồi" },
  barrels: { name: "barrels", w: 1000, h: 1500, alt: "Hàng thùng gỗ sồi ủ rượu nhìn gần" },
  charcuterie: { name: "charcuterie", w: 1000, h: 667, alt: "Khay phô mai, thịt nguội và trái cây cạnh hai ly vang đỏ" },
  pourTable: { name: "pour-table", w: 1000, h: 1500, alt: "Tay rót vang trên bàn gỗ dưới ánh nến, kèm đĩa phô mai và nho" },
  bottleDark: { name: "bottle-dark", w: 1000, h: 1500, alt: "Chai và ly vang đỏ trên nền đen" },
  bubbles: { name: "bubbles", w: 1000, h: 1500, alt: "Bọt khí li ti trong ly vang sủi màu vàng nhạt" },
  roseGlass: { name: "rose-glass", w: 1000, h: 1500, alt: "Ly vang hồng nhạt đặt trên mặt quầy" },
  glassTrio: { name: "glass-trio", w: 1000, h: 668, alt: "Ba ly vang trắng, hồng và đỏ đổ bóng trên mặt bàn" },
  candleBottle: { name: "candle-bottle", w: 1000, h: 1500, alt: "Ngọn nến cắm trong chai cũ, bên cạnh chùm nho" },
} satisfies Record<string, Img>;
