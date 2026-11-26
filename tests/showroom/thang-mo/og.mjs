// Dựng favicon-32.png, apple-touch-icon.png, og-image.webp và logo-sheet.png từ SVG/ảnh đã có.
import { chromium } from '/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs';
import sharp from '/Users/mac/mern/works/hancitywebsite/node_modules/sharp/lib/index.js';
import fs from 'node:fs';
const ID = '/Users/mac/mern/personal/trancongtien/public/images/demos/thang-mo/identity/';
const IM = '/Users/mac/mern/personal/trancongtien/public/images/demos/thang-mo/';
const FD = '/Users/mac/mern/personal/trancongtien/app/(demos)/demos/thang-mo/fonts/';
const SH = '/Users/mac/mern/personal/trancongtien/tests/showroom/thang-mo/screenshots/';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const fav = fs.readFileSync(ID + 'favicon.svg', 'utf8');
for (const [n, s] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180]]) {
  const p = await browser.newPage({ viewport: { width: s, height: s } });
  await p.setContent(`<body style="margin:0">${fav.replace('width="64" height="64"', `width="${s}" height="${s}"`)}</body>`);
  await p.screenshot({ path: ID + n }); await p.close();
}
const ff = (n, w, st = 'normal') => `@font-face{font-family:'PF';src:url('file://${FD}playfair-display-${n}-wght-${st}.woff2');font-weight:400 900;font-style:${st}}`;
const html = `<style>${ff('latin', 0)}${ff('vietnamese', 0)}${ff('latin', 0, 'italic')}${ff('vietnamese', 0, 'italic')}
body{margin:0;width:1200px;height:630px;background:#f5f0e8;font-family:PF,serif;color:#4e302a;position:relative;overflow:hidden}
.l{position:absolute;left:72px;top:64px}.l img{width:300px}
h1{position:absolute;left:72px;top:230px;margin:0;font-weight:500;font-size:50px;line-height:1.15;letter-spacing:-0.03em;width:560px}
p{position:absolute;left:72px;bottom:56px;margin:0;font-size:20px;font-style:italic;color:#675a50;width:560px;line-height:1.4}
.ph{position:absolute;right:84px;top:60px;width:380px;background:#fffdf8;padding:16px 16px 20px;transform:rotate(1.8deg);box-shadow:0 20px 40px -20px rgba(78,48,42,.5)}
.ph div{height:460px;background:url('file://${IM}vay-cua-so-1200.webp') center 35%/cover;position:relative}
.ph span{position:absolute;left:10px;bottom:10px;background:rgba(255,253,248,.92);font:500 13px sans-serif;color:#302b27;padding:6px 9px}
.d{position:absolute;right:84px;bottom:28px;font:500 14px sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#7d5443}</style>
<body><div class="l"><img src="file://${ID}logo-horizontal.svg"></div><h1 style="white-space:nowrap">Ảnh cưới Đà Nẵng:<br>pre-wedding, ngày cưới,<br>album.</h1><p>Studio ảnh cưới · Quận Sơn Trà, Đà Nẵng · Gói từ 5.900.000 đ</p>
<div class="ph"><div></div></div><div class="d">Wedding Studio</div></body>`;
fs.writeFileSync('/private/tmp/tm-og.html', html);
const p = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await p.goto('file:///private/tmp/tm-og.html'); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
await p.screenshot({ path: '/private/tmp/tm-og.png' });
await sharp('/private/tmp/tm-og.png').webp({ quality: 86 }).toFile(ID + 'og-image.webp');
// logo sheet
const sh = await browser.newPage({ viewport: { width: 1200, height: 760 } });
const img = (n, w) => `<img src="file://${ID}${n}" width="${w}">`;
const shHtml = (`<body style="margin:0;background:#fff;font:12px sans-serif"><div style="display:flex;gap:24px;padding:20px;align-items:center;background:#f5f0e8">${img('logo-primary.svg', 320)}${img('logo-horizontal.svg', 320)}${img('symbol.svg', 200)}${img('symbol.svg', 32)}${img('symbol.svg', 16)}${img('favicon.svg', 64)}</div><div style="display:flex;gap:24px;padding:20px;background:#fff">${img('logo-mono.svg', 320)}${img('logo-horizontal-mono.svg', 320)}</div><div style="display:flex;gap:24px;padding:20px;background:#4e302a">${img('logo-reversed.svg', 320)}${img('logo-horizontal-reversed.svg', 320)}</div></body>`);
fs.writeFileSync('/private/tmp/tm-sheet.html', shHtml); await sh.goto('file:///private/tmp/tm-sheet.html');
await sh.waitForTimeout(500); await sh.screenshot({ path: SH + 'logo-sheet.png' });
await browser.close(); console.log('done');
