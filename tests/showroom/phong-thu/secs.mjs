import { createRequire } from "node:module";
const require = createRequire("/Users/mac/mern/works/hancitywebsite/package.json");
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:3100";
const mode = process.argv[2] || "d";
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const vp = mode === "m" ? { width: 390, height: 844 } : { width: 1440, height: 900 };
const ctx = await b.newContext({ viewport: vp, ...(mode === "m" ? { hasTouch: true, isMobile: true } : {}) });
const p = await ctx.newPage();
await p.goto(BASE + "/demos/phong-thu", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
const ids = (process.argv[3] || "dich-vu,quy-trinh,phong-thu,master,bang-gia,uoc-tinh,lien-he").split(",");
for (const id of ids) {
  await p.evaluate((i) => { const e = document.getElementById(i); scrollTo(0, e.getBoundingClientRect().top + scrollY - 70); }, id);
  await p.waitForTimeout(1500);
  if (id === "uoc-tinh") { await p.locator("#uoc-tinh label", { hasText: "Thu band" }).click(); await p.waitForTimeout(1200); }
  await p.screenshot({ path: `screenshots/${mode}-${id}.png` });
  if (id === "uoc-tinh") { await p.evaluate(() => scrollBy(0, 700)); await p.waitForTimeout(800); await p.screenshot({ path: `screenshots/${mode}-${id}-2.png` }); }
}
await b.close();
