import { createRequire } from "node:module";
const require = createRequire("/Users/mac/mern/works/hancitywebsite/package.json");
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:3100";
const OUT = new URL("./screenshots/", import.meta.url).pathname;
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
for (const [name, vp] of [["d", { width: 1440, height: 900 }], ["m", { width: 390, height: 844 }]]) {
  const p = await (await b.newContext({ viewport: vp })).newPage();
  await p.goto(BASE + "/demos/ruou-vang", { waitUntil: "networkidle" });
  await p.waitForTimeout(2500);
  const box = await p.evaluate(() => { const r = document.getElementById("rot").getBoundingClientRect(); return { top: r.top + scrollY, h: r.height }; });
  for (const f of [0.1, 0.3, 0.55, 0.8, 0.97]) {
    await p.evaluate((y) => window.scrollTo(0, y), box.top + box.h * f - vp.height * 0.4);
    await p.waitForTimeout(900);
    await p.screenshot({ path: OUT + `pour-${name}-${f}.png` });
  }
}
await b.close();
