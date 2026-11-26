// Chụp: node shot.mjs -> screenshots/hero-{1440,390}.png, part-{1440,390}-N.png, full-{1440,390}.png
import { chromium } from '/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const BASE = process.env.BASE || 'http://localhost:3100';
const D = path.join(path.dirname(fileURLToPath(import.meta.url)), 'screenshots');
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
for (const [w, h, n] of [[1440, 900, '1440'], [390, 844, '390']]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/demos/net-lech`, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(2200);
  await p.screenshot({ path: `${D}/hero-${n}.png` });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } await new Promise((r) => setTimeout(r, 800)); window.scrollTo(0, 0); await Promise.all([...document.images].map((i) => { i.loading = 'eager'; return i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; }); })); });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${D}/full-${n}.png`, fullPage: true });
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  const step = n === '1440' ? 1800 : 2400; let i = 0;
  for (let y = 0; y < H; y += step, i++) { await p.evaluate((yy) => window.scrollTo(0, yy), y); await p.waitForTimeout(600); await p.screenshot({ path: `${D}/part-${n}-${i}.png`, fullPage: true, clip: { x: 0, y, width: w, height: Math.min(step, H - y) } }); }
  console.log(n, H, i);
  await ctx.close();
}
await b.close();
