// Tạo og-image 1200x630 sạch (không nhãn) cho Rong Dặm. Chạy: node tests/showroom/rong-dam/og.mjs
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire('/Users/mac/mern/works/hancitywebsite/package.json');
const { chromium } = require('playwright');
const sharp = require('sharp');
const R = '/Users/mac/mern/personal/trancongtien/';
const F = R + 'app/(demos)/demos/rong-dam/fonts/';
const IMG = R + 'public/images/demos/rong-dam/';
const b64 = (f) => 'data:font/woff2;base64,' + fs.readFileSync(F + f).toString('base64');
const ff = (fam, file, w) => `@font-face{font-family:'${fam}';font-weight:${w};src:url(${b64(file)})}`;
const img = (n) => 'data:image/webp;base64,' + fs.readFileSync(IMG + n).toString('base64');
const sym = 'data:image/svg+xml;base64,' + fs.readFileSync(IMG + 'identity/symbol.svg').toString('base64');
const fonts = ['latin', 'vietnamese'].map((s) => ff('B', `bricolage-grotesque-${s}-wght-normal.woff2`, '200 800') + ff('Lx', `lexend-${s}-wght-normal.woff2`, '100 900')).join('');
const html = `<style>${fonts}
*{box-sizing:border-box;margin:0}body{width:1200px;height:630px;position:relative;overflow:hidden;font-family:Lx;background:#f5f0e3}
.top{position:absolute;left:0;right:0;top:0;height:14px;background:#f2b84b}
.sym{position:absolute;left:74px;top:60px;width:76px}
h1{position:absolute;left:70px;top:236px;font-family:B;font-weight:800;font-size:68px;line-height:1.1;letter-spacing:-.02em;color:#24392d}
h1 em{display:block;font-style:normal;color:#b83e2b}
.tag{position:absolute;left:72px;bottom:80px;font-size:20px;letter-spacing:.14em;text-transform:uppercase;color:#24392d;font-weight:600}
.bar{position:absolute;left:70px;bottom:40px;width:360px;height:5px;background:#f2b84b}
.ph{position:absolute;background:#fffdf7;padding:12px 12px 12px 12px;box-shadow:0 8px 24px rgba(36,57,45,.25)}
.ph img{display:block;width:100%;height:100%;object-fit:cover}
.p1{right:20px;top:36px;width:356px;height:420px;transform:rotate(2.2deg)}
.p2{right:-14px;top:290px;width:330px;height:300px;transform:rotate(-3.2deg)}
</style><div class=top></div><img class=sym src="${sym}"><h1>Đi một dặm.<em>Thêm một chuyện.</em></h1><div class=tag>Rong Dặm · Tour miền Trung</div><div class=bar></div>
<div class="ph p1"><img src="${img('hoi-an-cau-chua-1200.webp')}"></div><div class="ph p2"><img src="${img('ba-na-hoang-hon-1200.webp')}"></div>`;
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
const buf = await p.screenshot();
await sharp(buf).webp({ quality: 84 }).toFile(IMG + 'identity/og-image.webp');
await b.close();
