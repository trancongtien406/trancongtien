import { BLOB_A, BLOB_B, toPath } from "./shapes";

type Kind = "pear" | "sprout" | "honey" | "rice" | "tea" | "box";

const tint: Record<Kind, [string, string]> = {
  pear: ["#DCE8B5", "#344E32"],
  sprout: ["#C5DB92", "#2c4a2a"],
  honey: ["#EFD98B", "#5a4310"],
  rice: ["#E9E0C6", "#4a4a2a"],
  tea: ["#B9D4A0", "#2f4a2e"],
  box: ["#344E32", "#DCE8B5"],
};

/** Tranh minh hoạ sản phẩm: blob + biểu tượng hình học, không dùng ảnh. */
export function Art({ kind, alt }: { kind: Kind; alt: string }) {
  const [bg, fg] = tint[kind];
  const blob = toPath(kind === "honey" || kind === "tea" ? BLOB_B : BLOB_A, 300, 300);
  return (
    <svg viewBox="0 0 600 600" role="img" aria-label={alt} style={{ width: "100%", height: "auto", display: "block" }}>
      <path d={blob} fill={bg} />
      <g fill="none" stroke={fg} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round">
        {kind === "pear" && (<><path d="M300 170c30 0 48 40 52 78 58 36 92 84 82 132-12 56-70 78-134 78s-122-22-134-78c-10-48 24-96 82-132 4-38 22-78 52-78z" fill={fg} fillOpacity=".08" /><path d="M300 170c4-22 18-40 40-48" /><path d="M335 112c24-12 52-6 66 10-20 16-50 14-66-10z" fill={fg} fillOpacity=".25" /></>)}
        {kind === "sprout" && (<><path d="M300 450V290" /><path d="M300 300c-10-70-70-96-122-92 4 66 50 100 122 92z" fill={fg} fillOpacity=".12" /><path d="M300 270c8-64 66-92 118-86-2 62-46 96-118 86z" fill={fg} fillOpacity=".12" /><path d="M230 450h140" /></>)}
        {kind === "honey" && (<><path d="M300 150l95 55v110l-95 55-95-55V205z" fill={fg} fillOpacity=".1" /><path d="M300 245l45 26v52l-45 26-45-26v-52z" /><path d="M300 380v70" /></>)}
        {kind === "rice" && (<><ellipse cx="240" cy="330" rx="26" ry="62" transform="rotate(-24 240 330)" /><ellipse cx="300" cy="300" rx="26" ry="62" /><ellipse cx="360" cy="330" rx="26" ry="62" transform="rotate(24 360 330)" /><path d="M300 400v70" /></>)}
        {kind === "tea" && (<><path d="M190 380C190 270 290 190 420 190c0 110-90 190-230 190z" fill={fg} fillOpacity=".1" /><path d="M200 400c60-70 120-120 210-200" /></>)}
        {kind === "box" && (<><path d="M170 250h260v190H170z" fill={fg} fillOpacity=".12" /><path d="M150 210h300v40H150z" /><path d="M300 210v230" /><path d="M300 210c-30-50-90-40-80 0M300 210c30-50 90-40 80 0" /></>)}
      </g>
    </svg>
  );
}
