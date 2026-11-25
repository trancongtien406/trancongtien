export const IMG_BASE = "/images/demos/bar-mai-thuong";
export type Img = { name: string; w: number; h: number; alt: string };
export const IMGS = {
  hero: { name: "hero-neon-glass", w: 1000, h: 1500, alt: "Ly cocktail hồng đặt trên bàn dưới ánh đèn neon" },
  smokeRed: { name: "smoke-red", w: 1000, h: 1500, alt: "Ly cocktail đỏ có khói bốc lên trên nền tối" },
  smokeCoupe: { name: "smoke-coupe", w: 1000, h: 1500, alt: "Ly coupe cocktail phủ khói mỏng" },
  pourBlue: { name: "pour-blue", w: 1000, h: 1398, alt: "Tay bartender rót cocktail xanh qua dụng cụ lọc vào ly" },
  ice: { name: "ice-cubes", w: 1000, h: 667, alt: "Ba viên đá trong suốt trên mặt đá ướt tối" },
  citrus: { name: "citrus", w: 1000, h: 1500, alt: "Cam và chanh xanh trên nền đen" },
  lounge: { name: "rooftop-lounge", w: 1000, h: 667, alt: "Không gian bar trên cao với cửa kính nhìn ra thành phố" },
  rooftop: { name: "rooftop-night", w: 1000, h: 1778, alt: "Sân thượng bar nhìn xuống thành phố về đêm" },
  city: { name: "city-night", w: 1000, h: 667, alt: "Toàn cảnh thành phố về đêm với những toà nhà sáng đèn" },
  neon: { name: "neon-pink", w: 1000, h: 684, alt: "Bảng đèn neon hồng và xanh trên nền đỏ sẫm" },
  fog: { name: "neon-fog", w: 1000, h: 1500, alt: "Ánh neon xanh cyan xuyên sương mù đêm" },
  counter: { name: "bar-counter", w: 1000, h: 667, alt: "Quầy bar hiện đại với kệ ly và chai, đèn neon chữ viết tay phía trên" },
  coupes: { name: "pink-coupes", w: 1000, h: 667, alt: "Hai ly coupe cocktail hồng trước nền kim tuyến" },
} satisfies Record<string, Img>;
