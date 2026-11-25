// Differentiation Gate: đo mức khác biệt thật giữa các demo (layout, DOM, chữ, màu).
// Chạy: BASE=http://localhost:3100 node tests/showroom/differentiation.mjs [slug1 slug2 ...]
// Có "negative control": bản sao layout của demo đầu tiên chỉ đổi màu/font/ảnh phải bị bắt là GIỐNG.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire('/Users/mac/mern/works/hancitywebsite/node_modules/');
const { chromium } = require('playwright');

const BASE = process.env.BASE || 'http://localhost:3100';
const ALL = ['mien-an','hien-man','rong-dam','rot-nhiet','ben-vi','mien-cuoi','nep-tho','khoi-nep','thang-mo','net-lech'];
const slugs = process.argv.slice(2).length ? process.argv.slice(2) : ALL;
const OUT = path.resolve('tests/showroom/differentiation');
fs.mkdirSync(OUT, { recursive: true });
const THRESH = {
  desktop: { dom: 0.20, layout: 0.30, hero: 0.25, palette: 0.18, type: 0.45, composite: 0.35 },
  mobile: { dom: 0.15, layout: 0.22, hero: 0.18, palette: 0.18, type: 0.45, composite: 0.28 },
};

// ---- thu thập số liệu trong trang ----
const collect = () => {
  const W = innerWidth, H = innerHeight;
  const q = (s) => document.querySelector(s);
  const root = document.querySelector('main') || document.body;
  const sections = [...root.querySelectorAll(':scope > *, :scope > * > section, :scope > * > * > section')]
    .filter((e) => e.getBoundingClientRect().height > 80);
  const seen = new Set();
  const secs = [];
  for (const e of sections) { if (seen.has(e)) continue; seen.add(e); secs.push(e); }
  const layoutOf = (e) => {
    const cs = getComputedStyle(e);
    const kids = [...e.children].filter((c) => c.getBoundingClientRect().height > 0);
    const imgs = e.querySelectorAll('img,picture,video,svg[role=img]').length;
    const cols = cs.display === 'grid' ? cs.gridTemplateColumns.split(' ').length : cs.display === 'flex' ? (cs.flexDirection.startsWith('row') ? kids.length : 1) : 1;
    return `${cs.display}|c${Math.min(cols, 6)}|k${Math.min(kids.length, 8)}|i${Math.min(imgs, 6)}|h${Math.round(e.getBoundingClientRect().height / H)}`;
  };
  const domSig = [];
  const walk = (el, d) => {
    if (d > 5) return;
    for (const c of el.children) {
      const r = c.getBoundingClientRect();
      if (r.width < 8 || r.height < 8) continue;
      const cs = getComputedStyle(c);
      const tag = c.tagName.toLowerCase();
      if (['script', 'style', 'path', 'g'].includes(tag)) continue;
      domSig.push(`${d}:${tag}:${cs.display}:${cs.position === 'static' ? 's' : cs.position[0]}:${Math.round(r.width / W * 8)}x${Math.round(r.height / H * 4)}`);
      walk(c, d + 1);
    }
  };
  walk(root, 0);
  // hero occupancy grid 24x16 trong viewport đầu
  const GX = 24, GY = 16; const grid = new Array(GX * GY).fill(0);
  const mark = (el, v) => {
    const r = el.getBoundingClientRect();
    const x0 = Math.max(0, Math.floor(r.left / W * GX)), x1 = Math.min(GX - 1, Math.floor((r.right - 1) / W * GX));
    const y0 = Math.max(0, Math.floor(r.top / H * GY)), y1 = Math.min(GY - 1, Math.floor((r.bottom - 1) / H * GY));
    if (r.bottom < 0 || r.top > H) return;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) grid[y * GX + x] = Math.max(grid[y * GX + x], v);
  };
  root.querySelectorAll('img,picture,video,canvas').forEach((e) => mark(e, 2));
  root.querySelectorAll('h1,h2,p').forEach((e) => { if (e.getBoundingClientRect().top < H) mark(e, 1); });
  root.querySelectorAll('a,button').forEach((e) => { if (e.getBoundingClientRect().top < H && e.getBoundingClientRect().height < 90) mark(e, 3); });
  const fam = (e) => e ? getComputedStyle(e).fontFamily.split(',')[0].replace(/["']/g, '').trim() : '';
  const h1 = q('h1'); const bodyP = q('main p') || q('p');
  const typo = {
    h1Family: fam(h1), bodyFamily: fam(bodyP),
    h1Size: h1 ? parseFloat(getComputedStyle(h1).fontSize) : 0,
    bodySize: bodyP ? parseFloat(getComputedStyle(bodyP).fontSize) : 16,
    h1Weight: h1 ? +getComputedStyle(h1).fontWeight : 0,
    h1Align: h1 ? getComputedStyle(h1).textAlign : '',
    h1Transform: h1 ? getComputedStyle(h1).textTransform : '',
    h1LH: h1 ? parseFloat(getComputedStyle(h1).lineHeight) / parseFloat(getComputedStyle(h1).fontSize) : 0,
    h1LS: h1 ? getComputedStyle(h1).letterSpacing : '',
  };
  return { sections: secs.map(layoutOf), domSig, grid, typo, nSections: secs.length };
};

// ---- palette từ screenshot đã ẩn ảnh + logo ----
async function paletteOf(page) {
  await page.addStyleTag({ content: 'img,picture,video,canvas,svg image{visibility:hidden!important} [class*=logo i],[aria-label*=logo i],header svg,footer svg{visibility:hidden!important}' });
  const png = await page.screenshot({ fullPage: false });
  const b64 = png.toString('base64');
  return page.evaluate(async (b64) => {
    const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
    const c = document.createElement('canvas'); c.width = 96; c.height = 64;
    const x = c.getContext('2d'); x.drawImage(img, 0, 0, 96, 64);
    const d = x.getImageData(0, 0, 96, 64).data; const hist = {};
    for (let i = 0; i < d.length; i += 4) { const k = [d[i], d[i + 1], d[i + 2]].map((v) => Math.min(3, v >> 6)).join(''); hist[k] = (hist[k] || 0) + 1; }
    const tot = 96 * 64; for (const k in hist) hist[k] /= tot; return hist;
  }, b64);
}

// ---- khoảng cách ----
const lev = (a, b) => { const m = a.length, n = b.length; if (!m || !n) return Math.max(m, n); let p = Array.from({ length: n + 1 }, (_, j) => j); for (let i = 1; i <= m; i++) { const c = [i]; for (let j = 1; j <= n; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; } return p[n]; };
const nlev = (a, b) => lev(a, b) / Math.max(a.length, b.length, 1);
const distLayout = (A, B) => nlev(A.sections, B.sections);
const distDom = (A, B) => { const a = A.domSig.slice(0, 220), b = B.domSig.slice(0, 220); return nlev(a, b); };
const distHero = (A, B) => { let inter = 0, uni = 0; for (let i = 0; i < A.grid.length; i++) { const a = A.grid[i], b = B.grid[i]; if (a || b) { uni++; if (a === b) inter++; } } return uni ? 1 - inter / uni : 1; };
const distPalette = (p, q) => { let s = 0; const ks = new Set([...Object.keys(p), ...Object.keys(q)]); for (const k of ks) s += Math.abs((p[k] || 0) - (q[k] || 0)); return s / 2; };
const distType = (a, b) => {
  let d = 0;
  d += a.h1Family !== b.h1Family ? 0.35 : 0; d += a.bodyFamily !== b.bodyFamily ? 0.25 : 0;
  d += Math.min(1, Math.abs(a.h1Size / a.bodySize - b.h1Size / b.bodySize) / Math.max(a.h1Size / a.bodySize, b.h1Size / b.bodySize, 1)) * 0.15;
  d += Math.abs(a.h1Weight - b.h1Weight) >= 200 ? 0.1 : 0; d += a.h1Align !== b.h1Align ? 0.05 : 0; d += a.h1Transform !== b.h1Transform ? 0.05 : 0; d += a.h1LS !== b.h1LS ? 0.05 : 0;
  return Math.min(1, d);
};
const composite = (m) => 0.40 * (0.6 * m.layout + 0.4 * m.hero) + 0.25 * m.dom + 0.20 * m.type + 0.15 * m.palette;

const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const data = {};
const VP = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
async function measure(slug, vp, mutate) {
  const ctx = await browser.newContext({ viewport: VP[vp], reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/demos/${slug}`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(800);
  if (mutate) await page.addStyleTag({ content: mutate });
  const m = await page.evaluate(collect);
  m.palette = await paletteOf(page);
  await ctx.close();
  return m;
}
for (const vp of ['desktop', 'mobile']) for (const s of slugs) { data[`${s}|${vp}`] = await measure(s, vp); process.stderr.write(`đo ${s} ${vp}\n`); }
// negative control: demo đầu tiên với màu/font/ảnh bị đổi, layout giữ nguyên
const nc = slugs[0];
const MUT = '*{font-family:Georgia,serif!important;color:#2b2bd8!important;background-color:#fff3d1!important} img{filter:hue-rotate(120deg)!important}';
for (const vp of ['desktop', 'mobile']) data[`${nc}-clone|${vp}`] = await measure(nc, vp, MUT);
await browser.close();

const lines = []; let fails = 0;
const report = { thresholds: THRESH, pairs: [] };
for (const vp of ['desktop', 'mobile']) {
  const t = THRESH[vp];
  const names = [...slugs];
  const pairs = [];
  for (let i = 0; i < names.length; i++) for (let j = i + 1; j < names.length; j++) pairs.push([names[i], names[j]]);
  for (const [a, b] of pairs) {
    const A = data[`${a}|${vp}`], B = data[`${b}|${vp}`];
    const m = { layout: distLayout(A, B), dom: distDom(A, B), hero: distHero(A, B), palette: distPalette(A.palette, B.palette), type: distType(A.typo, B.typo) };
    m.composite = composite(m);
    const bad = Object.keys(t).filter((k) => m[k] < t[k]);
    if (bad.length) fails++;
    report.pairs.push({ vp, a, b, ...m, below: bad });
    lines.push(`${bad.length ? 'FAIL' : 'ok  '} ${vp} ${a} ↔ ${b}  layout ${m.layout.toFixed(2)} dom ${m.dom.toFixed(2)} hero ${m.hero.toFixed(2)} pal ${m.palette.toFixed(2)} type ${m.type.toFixed(2)} comp ${m.composite.toFixed(2)}${bad.length ? '  <' + bad.join(',') : ''}`);
  }
  // negative control: layout/dom/hero phải RẤT thấp (bị coi là bản sao) dù màu/chữ khác
  const A = data[`${nc}|${vp}`], C = data[`${nc}-clone|${vp}`];
  const m = { layout: distLayout(A, C), dom: distDom(A, C), hero: distHero(A, C), palette: distPalette(A.palette, C.palette), type: distType(A.typo, C.typo) };
  m.composite = composite(m);
  const caught = m.layout < t.layout && m.dom < t.dom;
  report.pairs.push({ vp, control: true, caught, ...m });
  lines.push(`${caught ? 'ok  ' : 'FAIL'} NEGATIVE-CONTROL ${vp} ${nc} vs bản sao đổi màu/chữ: layout ${m.layout.toFixed(2)} dom ${m.dom.toFixed(2)} hero ${m.hero.toFixed(2)} pal ${m.palette.toFixed(2)} type ${m.type.toFixed(2)} → ${caught ? 'bị bắt là bản sao' : 'KHÔNG bắt được (gate chưa đủ nhạy)'}`);
  if (!caught) fails++;
}
fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 1));
fs.writeFileSync(path.join(OUT, 'report.txt'), lines.join('\n') + '\n');
console.log(lines.join('\n'));
console.log(`\nDifferentiation Gate: ${fails ? fails + ' cặp/kiểm tra KHÔNG đạt' : 'tất cả đạt'} (ngưỡng V1 đề xuất bởi ChatGPT, chưa kiểm chứng khoa học)`);
process.exit(fails ? 1 : 0);
