import { createRequire } from "node:module";
const require = createRequire("/Users/mac/mern/works/hancitywebsite/package.json");
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:3100";
const [w, h, name, full, y] = [Number(process.argv[2] || 1440), Number(process.argv[3] || 900), process.argv[4] || "hero", process.argv[5] === "full", Number(process.argv[6] || 0)];
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
const errs = [];
p.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
p.on("pageerror", (e) => errs.push("PAGEERR " + e.message));
await p.goto(BASE + "/demos/tra-thi", { waitUntil: "load" });
await p.waitForTimeout(3800);
if (full) {
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let yy = 0; yy < H; yy += 500) { await p.evaluate((v) => window.scrollTo(0, v), yy); await p.waitForTimeout(260); }
  await p.waitForTimeout(2200);
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(500);
} else if (y) { await p.evaluate((v) => window.scrollTo(0, v), y); await p.waitForTimeout(2500); }
await p.screenshot({ path: `tests/showroom/tra-thi/screenshots/${name}.png`, fullPage: full });
console.log("errors:", errs.slice(0, 5));
await b.close();
