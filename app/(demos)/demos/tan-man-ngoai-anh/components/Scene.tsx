/* Ảnh chụp thật (Pexels, miễn phí thương mại; xem public/images/demos/tan-man-ngoai-anh/CREDITS.md). kind = tên gợi nhớ hoặc "p<ID>". */
const NAMED: Record<string, number> = {
  face: 19999456, shades: 5202049, room: 6615806, arch: 33185291, book: 2912515, hand: 8832159, dancer: 17029891, ring: 17833396,
  earring: 10082804, bow: 10820346, necklace: 7700270, coat: 36322502, bird: 28147598, cube: 4704984, scroll: 37798256,
  hammock: 36911651, sea: 31357533, subway: 40337828,
};
export type Kind = string;
const BG = new Set([6063062, 36911651, 31357533, 40337828]);

export function Scene({ kind, alt = "", eager = false }: { kind: Kind; id?: string; alt?: string; eager?: boolean }) {
  const n = NAMED[kind] ?? Number(kind.replace(/^p/, ""));
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/images/demos/tan-man-ngoai-anh/p${n}.webp`} alt={alt} width={BG.has(n) ? 1600 : 640} height={BG.has(n) ? 1000 : 800} loading={eager ? "eager" : "lazy"} decoding="async" draggable={false} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />;
}
