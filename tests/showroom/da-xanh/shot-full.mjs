import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:3100";
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
for (const [w, h, n] of [[1440, 900, "1440"], [390, 844, "390"]]) {
  const c = await b.newContext({ viewport: { width: w, height: h }, hasTouch: w < 500, isMobile: w < 500 });
  const p = await c.newPage();
  const errs = []; p.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); }); p.on("pageerror", (e) => errs.push(e.message));
  await p.goto(BASE + "/demos/da-xanh", { waitUntil: "networkidle" }); await p.waitForTimeout(3200);
  await p.screenshot({ path: `tests/showroom/da-xanh/screenshots/hero-${n}.png` });
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += Math.round(h * 0.5)) { await p.mouse.wheel(0, Math.round(h * 0.5)); await p.waitForTimeout(140); }
  await p.waitForTimeout(1200); await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(600);
  await p.screenshot({ path: `tests/showroom/da-xanh/screenshots/full-${n}.png`, fullPage: true });
  console.log(n, "H", H, "errs", errs.slice(0, 5));
  await c.close();
}
await b.close();
