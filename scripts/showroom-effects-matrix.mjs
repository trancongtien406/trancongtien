// Đếm hiệu ứng thư viện dùng ở từng landing (quét import/JSX trong app/(demos)/demos/<slug>/**).
// Chạy: node scripts/showroom-effects-matrix.mjs [slug ...]   (không tham số = toàn bộ, in bảng tổng)
import fs from 'node:fs';
import path from 'node:path';
const root = 'app/(demos)/demos';
const ALL = ['SplitWords','SplitLines','TextScramble','ClipReveal','ParallaxLayer','PinnedHorizontalScroll','StickyChapters','ScrollScrubText','VelocityMarquee','Counter','Odometer','MagneticButton','CustomCursor','ImageHoverDistort','TiltCard','CursorSpotlight','ShineSweep','CurtainReveal','StackingCards','DraggableGallery','CanvasParticles','AudioWaveVisualizer','SVGPathDraw','BlobMorph','GrainOverlay','ScrollProgress','InfiniteHorizontalMarqueeImages','NumberTicker','SlotText'];
const COMMON = ['ScrollScrubText','VelocityMarquee','MagneticButton','ClipReveal','ScrollProgress','SplitWords','SVGPathDraw','ParallaxLayer'];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : /\.tsx?$/.test(e.name) ? [path.join(d, e.name)] : []);
const slugs = fs.readdirSync(root).filter((d) => fs.existsSync(path.join(root, d, 'meta.ts')));
const use = {};
for (const s of slugs) {
  const t = walk(path.join(root, s)).map((f) => fs.readFileSync(f, 'utf8')).join('\n');
  use[s] = new Set(ALL.filter((n) => new RegExp('<' + n + '\\b|import[^;]*\\b' + n + '\\b').test(t)));
}
const want = process.argv.slice(2).length ? process.argv.slice(2) : slugs;
const cnt = {}; for (const s of slugs) for (const n of use[s]) cnt[n] = (cnt[n] || 0) + 1;
for (const s of want) {
  const lib = [...use[s]]; const common = lib.filter((n) => COMMON.includes(n)); const sig = lib.filter((n) => !COMMON.includes(n));
  console.log(`${s}: thư viện ${lib.length} | đại trà ${common.length} (${common.join(',') || '-'})${common.length > 2 ? '  <-- VƯỢT hạn mức 2' : ''} | chữ ký thư viện ${sig.length} (${sig.join(',') || '-'})`);
}
if (!process.argv.slice(2).length) {
  console.log('\nSố landing dùng mỗi hiệu ứng:', Object.entries(cnt).sort((a, b) => b[1] - a[1]).map(([n, c]) => `${n}:${c}`).join('  '));
  let pairs = 0, hi = 0, sum = 0;
  for (let i = 0; i < slugs.length; i++) for (let j = i + 1; j < slugs.length; j++) {
    const A = use[slugs[i]], B = use[slugs[j]]; const inter = [...A].filter((x) => B.has(x)).length; const uni = new Set([...A, ...B]).size || 1; const jac = inter / uni; sum += jac; pairs++; if (jac >= 0.5) hi++;
  }
  console.log(`Jaccard TB giữa cặp: ${(sum / pairs).toFixed(2)} | cặp >=0.5: ${hi}/${pairs} | landing vượt hạn mức đại trà: ${slugs.filter((s) => [...use[s]].filter((n) => COMMON.includes(n)).length > 2).length}/${slugs.length}`);
}
