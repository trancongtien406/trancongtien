import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:3100";
const [w, h] = (process.argv[2] || "1440x900").split("x").map(Number);
const ys = (process.argv[3] || "0").split(",").map(Number);
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const p = await b.newPage({ viewport: { width: w, height: h } });
p.on("console", (m) => { if (m.type() === "error") console.log("ERR", m.text().slice(0, 200)); });
p.on("pageerror", (e) => console.log("PAGEERR", e.message));
await p.goto(BASE + "/demos/glamping-nui", { waitUntil: "networkidle", timeout: 120000 });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(3200);
for (const y of ys) {
  await p.evaluate((y) => window.scrollTo(0, y), y);
  await p.waitForTimeout(900);
  await p.screenshot({ path: `screenshots/s-${w}-${y}.png` });
}
console.log("height", await p.evaluate(() => document.documentElement.scrollHeight));
await b.close();
