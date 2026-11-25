import { createRequire } from "node:module";
const require = createRequire("/Users/mac/mern/works/hancitywebsite/node_modules/");
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:3100";
const [,, path = "/demos/rong-dam", w = "1440", h = "900", out = "/tmp/rd.png", full = "0", sel = ""] = process.argv;
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const p = await b.newPage({ viewport: { width: +w, height: +h } });
const logs = [];
p.on("console", (m) => { if (["error", "warning"].includes(m.type())) logs.push(m.type() + ": " + m.text().slice(0, 200)); });
p.on("pageerror", (e) => logs.push("pageerror: " + e.message));
await p.goto(BASE + path, { waitUntil: "networkidle", timeout: 120000 });
await p.waitForTimeout(2500);
if (sel) { await p.locator(sel).first().scrollIntoViewIfNeeded(); await p.waitForTimeout(1200); }
await p.screenshot({ path: out, fullPage: full === "1" });
console.log(JSON.stringify({ scrollW: await p.evaluate(() => document.documentElement.scrollWidth), logs }));
await b.close();
