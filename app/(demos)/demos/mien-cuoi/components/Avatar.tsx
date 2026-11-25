/** Avatar đồ hoạ phi nhận diện (không dùng ảnh người thật). */
const VARIANTS: Record<string, { bg: string; a: string; b: string }> = {
  "minh-an": { bg: "#E5F4EF", a: "#153D43", b: "#087B72" },
  "thanh-lam": { bg: "#E2EEF8", a: "#153D43", b: "#2F6F9F" },
  "hoai-nam": { bg: "#F4F8FA", a: "#153D43", b: "#52676C" },
};
export function Avatar({ id }: { id: string }) {
  const v = VARIANTS[id] ?? VARIANTS["minh-an"];
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label="Hình đồ hoạ đại diện, không phải ảnh người thật" width="120" height="120">
      <rect width="120" height="120" fill={v.bg} />
      <path d="M0 120V104C0 88 16 78 36 76L60 90L84 76C104 78 120 88 120 104V120Z" fill={v.a} />
      <path d="M60 90L48 76H72Z" fill={v.bg} />
      <circle cx="60" cy="48" r="22" fill={v.b} />
      <path d="M48 52Q60 62 72 52" fill="none" stroke={v.bg} strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}
