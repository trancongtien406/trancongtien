import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mac/mern/works/hancitywebsite/package.json");
const { chromium } = require("playwright");
const ROOT = process.cwd();
const ID = `${ROOT}/public/images/demos/tra-thi/identity`;
const F = `${ROOT}/app/(demos)/demos/tra-thi/fonts`;
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const sym = fs.readFileSync(`${ID}/symbol.svg`, "utf8");
const logo = fs.readFileSync(`${ID}/logo-reversed.svg`, "utf8");
async function shot(html, w, h, out, type = "png") {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.setContent(html); await p.waitForTimeout(400);
  await p.screenshot({ path: out, type: "png", omitBackground: true }); await p.close();
}
await shot(`<body style="margin:0;background:transparent"><div style="width:32px;height:32px">${sym.replace("<svg ", '<svg width="32" height="32" ')}</div></body>`, 32, 32, `${ID}/favicon-32.png`);
await shot(`<body style="margin:0;background:#1c1f1d;display:grid;place-items:center;height:180px"><div style="width:120px;height:120px">${sym.replace("<svg ", '<svg width="120" height="120" ')}</div></body>`, 180, 180, `${ID}/apple-touch-icon.png`);
const img = fs.readFileSync(`${ROOT}/public/images/demos/tra-thi/am-dat-set-1200.webp`).toString("base64");
const fv = fs.readFileSync(`${F}/newsreader-vietnamese.woff2`).toString("base64");
const fl = fs.readFileSync(`${F}/newsreader-latin.woff2`).toString("base64");
const html = `<style>@font-face{font-family:N;src:url(data:font/woff2;base64,${fv});unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB;font-weight:200 800}@font-face{font-family:N;src:url(data:font/woff2;base64,${fl});font-weight:200 800}
body{margin:0;width:1200px;height:630px;background:#1c1f1d;color:#e7e0d2;font-family:N,serif;display:grid;grid-template-columns:1fr 480px;overflow:hidden}
.l{padding:64px 0 64px 72px;display:flex;flex-direction:column;justify-content:space-between}.l svg{height:52px;width:auto}
h1{font-weight:300;font-size:78px;line-height:1.1;margin:0;letter-spacing:-.015em}p{margin:14px 0 0;color:#a9aa9e;font-size:26px;font-family:serif}
.r{background:url(data:image/webp;base64,${img}) 58% 50%/cover}</style>
<body><div class="l">${logo}<div><h1>Một chén trà,<br>vạn khoảng lặng.</h1><p>Nhà trà tĩnh lặng ở Đà Nẵng</p></div></div><div class="r"></div></body>`;
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html); await p.waitForTimeout(600);
await p.screenshot({ path: `${ID}/og-image.png`, type: "png" });
await b.close();
