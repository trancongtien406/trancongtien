import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const W = +process.argv[2] || 1440, H = +process.argv[3] || 900;
const ctx = await b.newContext({ viewport: { width: W, height: H }, hasTouch: W < 800, isMobile: W < 800 });
const p = await ctx.newPage();
p.on("console", (m) => m.type() === "error" && console.log("ERR", m.text().slice(0, 200)));
await p.goto("http://localhost:3100/demos/nail-pop", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
await p.screenshot({ path: `screenshots/s-hero-${W}.png` });
const total = await p.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < total; y += Math.round(H * 0.8)) { await p.evaluate((v) => window.scrollTo(0, v), y); await p.waitForTimeout(150); }
await p.waitForTimeout(800);
await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(400);
await p.screenshot({ path: `screenshots/s-full-${W}.png`, fullPage: true });
await b.close();
