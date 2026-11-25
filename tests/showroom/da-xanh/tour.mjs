import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
const [,, w="1440", h="900", prefix="tour"] = process.argv;
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: +w, height: +h } })).newPage();
await p.goto("http://localhost:3100/demos/da-xanh", { waitUntil: "networkidle", timeout: 120000 });
await p.waitForTimeout(3500);
const total = await p.evaluate(()=>document.documentElement.scrollHeight);
let i=0;
for (let y=0; y<total; y+= Math.round(+h*0.92)) {
  await p.evaluate(y=>window.scrollTo(0,y), y); await p.waitForTimeout(1500);
  await p.screenshot({ path: new URL(`./screenshots/${prefix}-${String(i++).padStart(2,"0")}.png`, import.meta.url).pathname });
}
console.log("total", total, "shots", i);
await b.close();
