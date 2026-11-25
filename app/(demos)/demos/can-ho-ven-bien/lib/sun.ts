/** Bảng màu theo giờ, nội suy tuyến tính theo RGB. */
export type Pal = { sky1: string; sky2: string; facL: string; facS: string; sea1: string; sea2: string; glow: number; win: number; stars: number; shore: string };

const K: [number, Pal][] = [
  [5.5, { sky1: "#0a1330", sky2: "#3a3558", facL: "#2b3350", facS: "#141d38", sea1: "#0f2340", sea2: "#0a1830", glow: 0, win: 0.75, stars: 0.6, shore: "#060f20" }],
  [6.5, { sky1: "#2c3d6b", sky2: "#e8a477", facL: "#e0a070", facS: "#26365a", sea1: "#3a5d82", sea2: "#1b3355", glow: 0.7, win: 0.3, stars: 0, shore: "#0a1830" }],
  [9, { sky1: "#4d86bd", sky2: "#a9cde6", facL: "#cdb79c", facS: "#3b5376", sea1: "#2a6491", sea2: "#164468", glow: 0.12, win: 0, stars: 0, shore: "#12294a" }],
  [12, { sky1: "#2f74b5", sky2: "#8fc0e3", facL: "#b4c2d0", facS: "#33506f", sea1: "#1a6296", sea2: "#104370", glow: 0, win: 0, stars: 0, shore: "#12294a" }],
  [15.5, { sky1: "#3d79b0", sky2: "#b6d2e6", facL: "#cdb08a", facS: "#37506f", sea1: "#235f8f", sea2: "#143f66", glow: 0.08, win: 0, stars: 0, shore: "#12294a" }],
  [17.5, { sky1: "#3a4f86", sky2: "#f0b27a", facL: "#e39a5a", facS: "#2c3556", sea1: "#34547f", sea2: "#1c3052", glow: 0.55, win: 0.15, stars: 0, shore: "#0b1a33" }],
  [18.4, { sky1: "#2a2f63", sky2: "#e2755a", facL: "#d9783f", facS: "#232a4d", sea1: "#2e3a66", sea2: "#16213f", glow: 0.85, win: 0.5, stars: 0, shore: "#081329" }],
  [19.3, { sky1: "#151d45", sky2: "#5a3f6b", facL: "#5a4a5e", facS: "#1a2243", sea1: "#18254a", sea2: "#0e1730", glow: 0.15, win: 0.88, stars: 0.3, shore: "#060f20" }],
  [21, { sky1: "#0a1330", sky2: "#16224a", facL: "#222d4d", facS: "#101a35", sea1: "#0c1a38", sea2: "#08122a", glow: 0, win: 1, stars: 0.85, shore: "#050c1a" }],
];

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const toHex = (c: number[]) => "#" + c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
const mix = (a: string, b: string, t: number) => { const x = hex(a), y = hex(b); return toHex(x.map((v, i) => v + (y[i] - v) * t)); };

export function palette(h: number): Pal {
  const hh = Math.min(Math.max(h, K[0][0]), K[K.length - 1][0]);
  let i = 0;
  while (i < K.length - 2 && hh > K[i + 1][0]) i++;
  const [h0, a] = K[i], [h1, b] = K[i + 1];
  const t = (hh - h0) / (h1 - h0);
  const m = (x: number, y: number) => x + (y - x) * t;
  return {
    sky1: mix(a.sky1, b.sky1, t), sky2: mix(a.sky2, b.sky2, t), facL: mix(a.facL, b.facL, t), facS: mix(a.facS, b.facS, t),
    sea1: mix(a.sea1, b.sea1, t), sea2: mix(a.sea2, b.sea2, t), shore: mix(a.shore, b.shore, t),
    glow: m(a.glow, b.glow), win: m(a.win, b.win), stars: m(a.stars, b.stars),
  };
}

export const HORIZON = 392;
/** Mặt trời mọc bên trái (Đông), lặn bên phải (Tây). Trả null khi dưới đường chân trời. */
export function sunAt(h: number) {
  if (h < 5.6 || h > 18.8) return null;
  const t = (h - 6) / 12;
  const x = 200 + t * 800;
  const y = HORIZON - Math.sin(Math.PI * Math.min(Math.max(t, -0.05), 1.05)) * 330;
  return { x, y, elev: Math.max(0, Math.sin(Math.PI * t)) };
}
export function moonAt(h: number) {
  const n = h >= 18.4 ? h - 18.4 : h + 5.6; // 0..~8.7
  const t = Math.min(Math.max(n / 11.6, 0), 1);
  return { x: 220 + t * 760, y: HORIZON - Math.sin(Math.PI * t) * 300 };
}

export function phase(h: number) {
  if (h < 5.8) return { name: "Đêm khuya", note: "Toà tháp chỉ còn ánh đèn các tầng, mặt biển tối và phẳng." };
  if (h < 7) return { name: "Bình minh", note: "Mặt tiền hướng Đông ngả màu đồng khi mặt trời nhô khỏi đường chân trời." };
  if (h < 10.5) return { name: "Buổi sáng", note: "Nắng thấp và ấm, rọi thẳng vào phòng khách phía biển." };
  if (h < 14) return { name: "Giữa trưa", note: "Lam chắn nắng làm việc: kính phản sáng lạnh, bóng đổ ngắn." };
  if (h < 17) return { name: "Chiều", note: "Ánh sáng chuyển sang phía Tây, mặt tiền biển dịu lại." };
  if (h < 18.6) return { name: "Hoàng hôn", note: "Những dải đồng cuối ngày đi dọc ban công, mặt biển hồng cam." };
  if (h < 20) return { name: "Chạng vạng", note: "Đèn các căn hộ lần lượt sáng, bầu trời xanh thẫm." };
  return { name: "Đêm", note: "Toà tháp sáng đèn như một cột sáng nhỏ bên mặt biển." };
}

export const clockText = (h: number) => {
  const m = Math.round((h % 1) * 60);
  const hh = Math.floor(h) + (m === 60 ? 1 : 0);
  return `${String(hh).padStart(2, "0")}:${String(m === 60 ? 0 : m).padStart(2, "0")}`;
};
