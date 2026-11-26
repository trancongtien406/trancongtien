// Dựng og-image.webp cho Nét Lệch (không chữ demo/minh hoạ). Chạy: node tests/showroom/net-lech/og.mjs
import { chromium } from '/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs';
import sharp from '/Users/mac/mern/works/hancitywebsite/node_modules/sharp/lib/index.js';
import fs from 'node:fs';
const ID = '/Users/mac/mern/personal/trancongtien/public/images/demos/net-lech/identity/';
const IM = '/Users/mac/mern/personal/trancongtien/public/images/demos/net-lech/';
const FD = '/Users/mac/mern/personal/trancongtien/app/(demos)/demos/net-lech/fonts/';
const ff = (fam, f, w) => `@font-face{font-family:'${fam}';src:url('file://${FD}${f}.woff2');font-weight:${w}}`;
const html = `<style>${ff('OS', 'oswald-latin-wght-normal', '200 700')}${ff('OS', 'oswald-vietnamese-wght-normal', '200 700')}${ff('AR', 'archivo-latin-wght-normal', '100 900')}${ff('AR', 'archivo-vietnamese-wght-normal', '100 900')}
body{margin:0;width:1200px;height:630px;background:#151515;color:#f5f3ee;position:relative;overflow:hidden;font-family:AR,sans-serif}
.ph{position:absolute;right:0;top:0;width:520px;height:630px;clip-path:polygon(31% 0,100% 0,100% 100%,0 100%);background:#000 url('file://${IM}may-tong-do-1200.webp') 50% 40%/cover;filter:grayscale(1) contrast(1.1)}
.l{position:absolute;left:64px;top:52px}.l img{height:64px}
h1{position:absolute;left:64px;top:170px;margin:0;font:700 118px/1.12 OS,sans-serif;text-transform:uppercase;letter-spacing:-0.03em;width:700px}
h1 span{display:inline-block;background:#d1fa39;color:#151515;padding:0 22px 0 14px;margin:34px 0 0 -14px;transform:skewX(-14deg)}
h1 span b{display:inline-block;transform:skewX(14deg);font-weight:700}
p{position:absolute;left:64px;bottom:52px;margin:0;font:600 20px/1.4 AR,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#b8b8b0;white-space:nowrap}
</style><body><div class="l"><img src="file://${ID}logo-reversed.svg"></div><div class="ph"></div>
<h1>Salon tóc<br><span><b>Đà Nẵng</b></span></h1><p>Cắt · Uốn · Duỗi · Nhuộm · Hải Châu · Từ 150.000 đ</p></body>`;
fs.writeFileSync('/private/tmp/nl-og.html', html);
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.goto('file:///private/tmp/nl-og.html'); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(600);
await p.screenshot({ path: '/private/tmp/nl-og.png' });
await sharp('/private/tmp/nl-og.png').webp({ quality: 86 }).toFile(ID + 'og-image.webp');
await b.close(); console.log('done');
