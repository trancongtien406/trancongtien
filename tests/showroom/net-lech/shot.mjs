// Chụp nhanh: node shot.mjs [desktop|mobile] -> screenshots/
import { chromium } from '/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const BASE = process.env.BASE || 'http://localhost:3100';
const D = path.join(path.dirname(fileURLToPath(import.meta.url)), 'screenshots');
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
for (const [name, vp] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
  if (process.argv[2] && process.argv[2] !== name) continue;
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 1, ...(name === 'mobile' ? { isMobile: true, hasTouch: true } : {}) });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/demos/net-lech`, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(2200);
  await p.screenshot({ path: `${D}/${name}-hero.png` });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 130)); } await new Promise((r) => setTimeout(r, 800)); window.scrollTo(0, 0); await Promise.all([...document.images].map((i) => { i.loading = 'eager'; return i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; }); })); });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${D}/${name}-full.png`, fullPage: true });
  await ctx.close();
}
await b.close();
