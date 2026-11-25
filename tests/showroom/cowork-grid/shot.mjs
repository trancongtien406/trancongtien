import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:3100";
const w = Number(process.argv[2] || 1440), h = Number(process.argv[3] || 900);
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const ctx = await browser.newContext({ viewport: { width: w, height: h } });
const page = await ctx.newPage();
const errs = [];
page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
page.on("pageerror", (e) => errs.push("PAGEERR " + e.message));
await page.goto(BASE + "/demos/cowork-grid", { waitUntil: "networkidle" });
await page.waitForTimeout(3200);
await page.screenshot({ path: `screenshots/s-hero-${w}.png` });
// cuộn qua toàn trang để kích hoạt reveal
const H = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < H; y += h * 0.7) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(260); }
await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(500);
await page.screenshot({ path: `screenshots/s-full-${w}.png`, fullPage: true });
console.log("H", H, "errs", errs.slice(0, 5));
await browser.close();
