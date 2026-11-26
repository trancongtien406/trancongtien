// og-image 1200x630 cho Ô Lưới. Chạy: node tests/showroom/cowork-grid/og.mjs
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire('/Users/mac/mern/works/hancitywebsite/package.json');
const { chromium } = require('playwright');
const sharp = require('sharp');
const R = '/Users/mac/mern/personal/trancongtien/';
const F = R + 'app/(demos)/demos/cowork-grid/fonts/';
const IMG = R + 'public/images/demos/cowork-grid/';
const b64 = (f) => 'data:font/woff2;base64,' + fs.readFileSync(F + f).toString('base64');
const ff = (fam, file, w) => `@font-face{font-family:'${fam}';font-weight:${w};src:url(${b64(file)})}`;
const fonts = ['vietnamese', 'latin'].map((s) => ff('B', `bai-jamjuree-${s}-700-normal.woff2`, 700) + ff('B', `bai-jamjuree-${s}-500-normal.woff2`, 500) + ff('M', `space-mono-${s}-700-normal.woff2`, 700)).join('');
const photo = 'data:image/webp;base64,' + fs.readFileSync(IMG + 'ban-dai-go-1200.webp').toString('base64');
const sym = 'data:image/svg+xml;base64,' + fs.readFileSync(IMG + 'identity/symbol.svg').toString('base64');
const html = `<style>${fonts}*{box-sizing:border-box;margin:0}body{width:1200px;height:630px;position:relative;overflow:hidden;background:#0b0b0c;color:#f4f4f2;font-family:B;background-image:linear-gradient(to right,rgba(244,244,242,.06) 1px,transparent 1px),linear-gradient(to bottom,rgba(244,244,242,.06) 1px,transparent 1px);background-size:60px 60px}
.fr{position:absolute;inset:36px;border:1px solid rgba(244,244,242,.35)}
.sym{position:absolute;left:76px;top:70px;width:64px}
h1{position:absolute;left:76px;top:170px;font-weight:700;font-size:62px;line-height:1.12;letter-spacing:-.01em;width:600px}
h1 em{color:#ff5a1f;font-style:normal}
.t{position:absolute;left:76px;bottom:92px;font-family:M;font-weight:700;font-size:20px;letter-spacing:.06em;color:#ff5a1f;text-transform:uppercase}
.p{position:absolute;right:76px;top:76px;width:380px;height:478px;border:1px solid rgba(244,244,242,.5);overflow:hidden}
.p img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.1)}
.sq{position:absolute;right:76px;top:76px;width:60px;height:60px;background:#ff5a1f}
</style><div class=fr></div><img class=sym src="${sym}"><h1>Chỗ làm việc chung ở Hải Châu<em>.</em></h1><div class=t>Hot desk từ 120.000 đ · Dùng thử 1 ngày</div><div class=p><img src="${photo}"></div><div class=sq></div>`;
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
await sharp(await p.screenshot()).webp({ quality: 86 }).toFile(IMG + 'identity/og-image.webp');
await b.close();
