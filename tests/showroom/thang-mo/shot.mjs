import { chromium } from '/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs';
const BASE = process.env.BASE || 'http://localhost:3100';
const SH = '/Users/mac/mern/personal/trancongtien/tests/showroom/thang-mo/screenshots/';
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
for (const [w, h, n] of [[1440, 900, '1440'], [390, 844, '390']]) {
  const c = await b.newContext({ viewport: { width: w, height: h } }); const p = await c.newPage();
  await p.goto(BASE + '/demos/thang-mo', { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(2500);
  await p.screenshot({ path: SH + `hero-${n}.png` });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } window.scrollTo(0, 0); });
  await p.waitForTimeout(1200);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  const step = n === '1440' ? 1800 : 2400; let i = 0;
  for (let y = 0; y < H; y += step, i++) { await p.evaluate((yy) => window.scrollTo(0, yy), y); await p.waitForTimeout(700); await p.screenshot({ path: SH + `part-${n}-${i}.png`, fullPage: true, clip: { x: 0, y, width: w, height: Math.min(step, H - y) } }); }
  console.log(n, H, i);
  await c.close();
}
{ const c = await b.newContext({ viewport: { width: 390, height: 844 } }); const p = await c.newPage(); await p.goto(BASE + '/demos/thang-mo/credits', { waitUntil: 'networkidle' }); await p.waitForTimeout(1500); await p.screenshot({ path: SH + 'credits-390.png' }); await c.close(); }
await b.close();
