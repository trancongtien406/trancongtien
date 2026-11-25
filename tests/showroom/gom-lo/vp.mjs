import { createRequire } from "node:module";
const require = createRequire("/Users/mac/mern/works/hancitywebsite/package.json");
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:3100";
const [w, h] = [Number(process.argv[2] || 1440), Number(process.argv[3] || 900)];
const ys = process.argv.slice(4).map((v) => (v.startsWith("#") ? v : Number(v)));
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, hasTouch: w < 700, isMobile: w < 700 });
const p = await ctx.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push(e.message));
await p.goto(BASE + "/demos/gom-lo", { waitUntil: "load" });
await p.waitForTimeout(3000);
for (const y of ys) {
  if (typeof y === "string") await p.evaluate((sel) => { const el = document.querySelector(sel); window.scrollTo(0, el.getBoundingClientRect().top + scrollY + 0); }, y);
  else await p.evaluate((v) => window.scrollTo(0, v), y);
  await p.waitForTimeout(1800);
  await p.screenshot({ path: `tests/showroom/gom-lo/screenshots/vp-${w}-${String(y).replace("#", "")}.png` });
}
console.log("errs", errs);
await b.close();
