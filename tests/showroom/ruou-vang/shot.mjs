import { createRequire } from "node:module";
const require = createRequire("/Users/mac/mern/works/hancitywebsite/package.json");
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:3100";
const OUT = new URL("./screenshots/", import.meta.url).pathname;
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
for (const [name, vp] of [["d", { width: 1440, height: 900 }], ["m", { width: 390, height: 844 }]]) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 1, hasTouch: name === "m", isMobile: name === "m" });
  const p = await ctx.newPage();
  const errs = []; p.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); }); p.on("pageerror", (e) => errs.push(String(e)));
  await p.goto(BASE + "/demos/ruou-vang", { waitUntil: "networkidle" });
  await p.waitForTimeout(700);
  await p.screenshot({ path: OUT + `curtain-${name}.png` });
  await p.waitForTimeout(2800);
  await p.screenshot({ path: OUT + `hero-${name}.png` });
  // cuộn qua để kích hoạt reveal rồi chụp từng đoạn
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  const step = vp.height;
  let i = 0;
  for (let y = 0; y < H; y += step) { await p.evaluate((yy) => window.scrollTo(0, yy), y); await p.waitForTimeout(650); await p.screenshot({ path: OUT + `sec-${name}-${String(i++).padStart(2, "0")}.png` }); }
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(500);
  console.log(name, "height", H, "errs", errs.slice(0, 3));
  await ctx.close();
}
await b.close();
