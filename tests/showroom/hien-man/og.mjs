// Tạo og-image 1200x630 sạch (không nhãn) cho Hiên Mặn Villa. Chạy: node tests/showroom/hien-man/og.mjs
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire('/Users/mac/mern/works/hancitywebsite/package.json');
const { chromium } = require('playwright');
const sharp = require('sharp');
const R = '/Users/mac/mern/personal/trancongtien/';
const F = R + 'app/(demos)/demos/hien-man/fonts/';
const IMG = R + 'public/images/demos/hien-man/';
const b64 = (f) => 'data:font/woff2;base64,' + fs.readFileSync(F + f).toString('base64');
const ff = (fam, w, st, s) => `@font-face{font-family:'${fam}';font-weight:${w};font-style:${st};src:url(${b64(`${fam === 'L' ? 'lora' : 'manrope'}-${s}-wght-${st}.woff2`)})}`;
const img = 'data:image/webp;base64,' + fs.readFileSync(IMG + 'hero-ho-boi-1200.webp').toString('base64');
const sym = 'data:image/svg+xml;base64,' + fs.readFileSync(IMG + 'identity/symbol-reversed.svg').toString('base64');
const fonts = ['latin', 'vietnamese'].map((s) => ff('L', '400 700', 'normal', s) + ff('M', '200 800', 'normal', s)).join('');
const html = `<style>${fonts}
*{box-sizing:border-box;margin:0}body{width:1200px;height:630px;position:relative;overflow:hidden;font-family:M;background:#0f2f36}
.bg{position:absolute;inset:0;background:url(${img}) center 62%/cover}
.sh{position:absolute;inset:0;background:linear-gradient(100deg,rgba(14,44,52,.82) 0%,rgba(14,44,52,.5) 48%,rgba(14,44,52,.06) 100%),linear-gradient(0deg,rgba(14,44,52,.55) 0%,rgba(14,44,52,0) 45%)}
.sym{position:absolute;left:84px;top:88px;width:62px}
.eb{position:absolute;left:80px;top:312px;color:#f0e8dc;font-size:19px;letter-spacing:.18em;text-transform:uppercase;font-weight:500}
h1{position:absolute;left:78px;top:340px;font-family:L;font-weight:500;font-size:68px;line-height:1.1;color:#faf8f4;letter-spacing:-.01em}
.tag{position:absolute;left:80px;bottom:54px;color:#e9dfd0;font-size:18px;letter-spacing:.18em;text-transform:uppercase;font-weight:500}
</style><div class=bg></div><div class=sh></div><img class=sym src="${sym}"><div class=eb>Sơn Trà · Đà Nẵng</div><h1>Chậm lại, nghe biển thở.</h1><div class=tag>Hiên Mặn Villa</div>`;
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
const buf = await p.screenshot();
await sharp(buf).webp({ quality: 84 }).toFile(IMG + 'identity/og-image.webp');
await b.close();
