// og-image 1200x630 cho Gương Phẩm. Chạy: node tests/showroom/detail-xe/og.mjs
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire('/Users/mac/mern/works/hancitywebsite/package.json');
const { chromium } = require('playwright');
const sharp = require('sharp');
const R = '/Users/mac/mern/personal/trancongtien/';
const F = R + 'app/(demos)/demos/detail-xe/fonts/';
const IMG = R + 'public/images/demos/detail-xe/';
const b64 = (f) => 'data:font/woff2;base64,' + fs.readFileSync(F + f).toString('base64');
const ff = (fam, file, w) => `@font-face{font-family:'${fam}';font-weight:${w};src:url(${b64(file)})}`;
const fonts = ['vietnamese', 'latin'].map((s) => ff('S', `saira-${s}-800-normal.woff2`, 800) + ff('S', `saira-${s}-600-normal.woff2`, 600)).join('');
const photo = 'data:image/webp;base64,' + fs.readFileSync(IMG + 'den-chrome-dau-xe-1200.webp').toString('base64');
const sym = 'data:image/svg+xml;base64,' + fs.readFileSync(IMG + 'identity/symbol.svg').toString('base64');
const html = `<style>${fonts}*{box-sizing:border-box;margin:0}body{width:1200px;height:630px;position:relative;overflow:hidden;background:#0c0d0f;font-family:S;color:#f2f4f7}
.ph{position:absolute;inset:0}.ph img{width:100%;height:100%;object-fit:cover;object-position:60% 40%}
.sh{position:absolute;inset:0;background:linear-gradient(90deg,#0c0d0f 8%,rgba(12,13,15,.86) 48%,rgba(12,13,15,.25) 100%)}
.sym{position:absolute;left:76px;top:64px;width:76px}
h1{position:absolute;left:76px;top:190px;font-weight:800;font-size:68px;line-height:1.08;text-transform:uppercase;letter-spacing:.01em;background:linear-gradient(100deg,#868d98,#f2f4f7 50%,#c9ced6);-webkit-background-clip:text;color:transparent;width:700px}
.t{position:absolute;left:76px;bottom:80px;font-weight:600;font-size:24px;letter-spacing:.14em;text-transform:uppercase;color:#c9ced6}
.t::before{content:"";display:inline-block;width:44px;height:3px;background:#e10600;vertical-align:middle;margin-right:16px}
</style><div class=ph><img src="${photo}"></div><div class=sh></div><img class=sym src="${sym}"><h1>Rửa chi tiết, đánh bóng, phủ ceramic</h1><div class=t>Gương Phẩm · Ngũ Hành Sơn, Đà Nẵng</div>`;
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
await sharp(await p.screenshot()).webp({ quality: 86 }).toFile(IMG + 'identity/og-image.webp');
await b.close();
