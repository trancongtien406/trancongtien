import { createRequire } from "node:module";
const require = createRequire("/Users/mac/mern/works/hancitywebsite/package.json");
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:3100";
const [w, h, tag, full] = [Number(process.argv[2] || 1440), Number(process.argv[3] || 900), process.argv[4] || "d", process.argv[5] === "full"];
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })).newPage();
p.on("console", (m) => { if (m.type() === "error") console.log("CONSOLE", m.text()); });
await p.goto(BASE + "/demos/bar-mai-thuong", { waitUntil: "networkidle" });
await p.waitForTimeout(3200);
await p.screenshot({ path: `screenshots/${tag}-hero.png` });
if (full) {
  // cuộn để kích hoạt reveal
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 500) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(120); }
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(400);
  await p.screenshot({ path: `screenshots/${tag}-full.png`, fullPage: true });
}
await b.close();
