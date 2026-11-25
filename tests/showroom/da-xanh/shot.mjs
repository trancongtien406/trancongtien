import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
const [,, w="1440", h="900", out="s.png", full="0", scroll="0"] = process.argv;
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: +w, height: +h } })).newPage();
const errs=[]; p.on("console", m=>{ if(m.type()==="error") errs.push(m.text()); }); p.on("pageerror", e=>errs.push("PAGEERR "+e.message));
await p.goto("http://localhost:3100/demos/da-xanh", { waitUntil: "networkidle", timeout: 120000 });
await p.waitForTimeout(3500);
if (+scroll) { await p.evaluate(y=>window.scrollTo(0,y), +scroll); await p.waitForTimeout(1800); }
await p.screenshot({ path: new URL("./screenshots/"+out, import.meta.url).pathname, fullPage: full==="1" });
console.log("errors:", errs.slice(0,5));
await b.close();
