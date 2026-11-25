import { createRequire } from "node:module";
const require = createRequire("/Users/mac/mern/works/hancitywebsite/package.json");
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:3100";
const [w, h, tag] = [Number(process.argv[2] || 1440), Number(process.argv[3] || 900), process.argv[4] || "d"];
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
await p.goto(BASE + "/demos/bar-mai-thuong", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
const [top, hh] = await p.evaluate(() => { const e = document.querySelector('[data-tm="pour"]'); const r = e.getBoundingClientRect(); return [r.top + scrollY, r.height]; });
for (const [i, f] of [[0, 0.2], [1, 0.55], [2, 0.95]]) {
  await p.evaluate((y) => window.scrollTo(0, y), top + (hh - h) * f - 40 + 0);
  await p.waitForTimeout(900);
  await p.screenshot({ path: `screenshots/${tag}-pour${i}.png` });
}
await b.close();
