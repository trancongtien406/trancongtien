/* Ảnh minh hoạ thật từ Pexels (xem public/images/demos/phim-tia-chop/CREDITS.md). */
const MAP = {
  vases: { src: "proj-1", alt: "Hình khối 3D uốn lượn màu cam tím, ảnh minh hoạ", w: 900, h: 600 },
  blocks: { src: "proj-2", alt: "Đoàn làm phim quay trong trường quay nền đỏ, ảnh minh hoạ", w: 900, h: 600 },
  cubes: { src: "slide-1", alt: "Màn hình phần mềm dựng phim với dòng thời gian, ảnh minh hoạ", w: 560, h: 560 },
  orbs: { src: "slide-2", alt: "Bảng chỉnh màu phim trên màn hình, ảnh minh hoạ", w: 560, h: 560 },
  glass: { src: "slide-3", alt: "Màn hình làm hoạt hình nhân vật, ảnh minh hoạ", w: 560, h: 560 },
} as const;

export function Art({ kind }: { kind: keyof typeof MAP }) {
  const m = MAP[kind];
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/images/demos/phim-tia-chop/${m.src}.webp`} alt={m.alt} width={m.w} height={m.h} loading="eager" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />;
}
