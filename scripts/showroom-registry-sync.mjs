// Gom `meta.ts` của mọi landing (app/(demos)/demos/*/meta.ts) → features/showroom/registry.ts
// Chạy: node scripts/showroom-registry-sync.mjs
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('app/(demos)/demos');
const metas = [];
for (const d of fs.readdirSync(root)) {
  const f = path.join(root, d, 'meta.ts');
  if (!fs.existsSync(f)) continue;
  const src = fs.readFileSync(f, 'utf8');
  const m = src.match(/export const meta\s*(?::[^=]+)?=\s*(\{[\s\S]*?\n?\})\s*(as const)?\s*;?/);
  if (!m) { console.warn('bỏ qua (không đọc được)', d); continue; }
  const obj = new Function('return (' + m[1] + ')')();
  if (obj.slug !== d) console.warn('slug khác thư mục', d, obj.slug);
  metas.push(obj);
}
metas.sort((a, b) => parseInt(a.id.replace(/\D/g, '')) - parseInt(b.id.replace(/\D/g, '')));
const esc = (s) => JSON.stringify(s);
const lines = metas.map((o) => `  { id: ${esc(o.id)}, slug: ${esc(o.slug)}, brand: ${esc(o.brand)}, industry: ${esc(o.industry)}, solutionSlug: ${esc(o.solutionSlug)}, tagline: ${esc(o.tagline)}, look: ${esc(o.look)} },`);
const out = `/**
 * Registry các landing ngành nghề. TẠO TỰ ĐỘNG bởi scripts/showroom-registry-sync.mjs từ
 * app/(demos)/demos/<slug>/meta.ts — đừng sửa tay (sửa meta.ts rồi chạy lại script).
 * Chỉ chứa thông tin điều hướng/CTA, KHÔNG có theme/layout dùng chung: mỗi landing tự sở hữu giao diện.
 */
export type DemoEntry = {
  id: string;
  slug: string;
  brand: string;
  industry: string;
  /** slug trang /solutions/<slug> trong DB */
  solutionSlug: string;
  tagline: string;
  /** mô tả ngắn phong cách thị giác riêng */
  look: string;
};

export const DEMOS: readonly DemoEntry[] = [
${lines.join('\n')}
] as const;

export function getDemo(slug: string) {
  return DEMOS.find((d) => d.slug === slug);
}
`;
fs.writeFileSync('features/showroom/registry.ts', out);
console.log('registry:', metas.length, 'landing');
