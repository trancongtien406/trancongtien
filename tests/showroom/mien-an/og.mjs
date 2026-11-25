import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire('/Users/mac/mern/works/hancitywebsite/package.json');
const { chromium } = require('playwright');
const sharp = require('sharp');
const F='/Users/mac/mern/personal/trancongtien/app/(demos)/demos/mien-an/fonts/';
const IMG='/Users/mac/mern/personal/trancongtien/public/images/demos/mien-an/';
const b64=f=>'data:font/woff2;base64,'+fs.readFileSync(F+f).toString('base64');
const img=n=>'data:image/webp;base64,'+fs.readFileSync(IMG+n).toString('base64');
const ff=(fam,w,st,s)=>`@font-face{font-family:'${fam}';font-weight:${w};font-style:${st};src:url(${b64(`${fam==='C'?'cormorant-garamond':'be-vietnam-pro'}-${s}-${w}-${st}.woff2`)})}`;
const html=`<style>${['latin','vietnamese'].map(s=>ff('C',400,'normal',s)+ff('C',400,'italic',s)+ff('B',500,'normal',s)+ff('B',400,'normal',s)).join('')}
*{box-sizing:border-box;margin:0}body{width:1200px;height:630px;background:#485346;position:relative;overflow:hidden;font-family:B}
.l{position:absolute;left:72px;top:0;bottom:0;width:600px;display:flex;flex-direction:column;justify-content:center;gap:26px;color:#f3efe6}
.eb{font-size:15px;letter-spacing:.16em;text-transform:uppercase;color:#c6b59e;font-weight:500}
h1{font-family:C;font-weight:400;font-size:92px;line-height:1.04;letter-spacing:-.025em}h1 em{font-style:italic}
p{font-size:20px;line-height:1.6;color:#d4ccbb;max-width:470px}
.tag{position:absolute;left:72px;bottom:40px;font-size:14px;letter-spacing:.14em;color:#c6b59e;text-transform:uppercase}
.a{position:absolute;right:72px;top:60px;width:400px;height:540px;border-radius:200px 200px 3px 3px;overflow:hidden}
.a img{width:100%;height:100%;object-fit:cover}.o{position:absolute;right:58px;top:46px;width:400px;height:540px;border-radius:200px 200px 3px 3px;border:1px solid #c6b59e;opacity:.6}
.badge{position:absolute;right:92px;bottom:80px;background:#f3efe6;color:#292d26;font-size:12px;letter-spacing:.1em;text-transform:uppercase;padding:7px 12px;border-radius:99px;font-weight:500}
</style><div class=l><div class=eb>Miên An Wellness</div><h1>Chậm lại,<br>để trở về<br><em>với mình.</em></h1><p>Nghi thức chăm sóc nhẹ nhàng và gợi ý liệu trình theo nhu cầu của bạn.</p></div>
<div class=o></div><div class=a><img src="${img('ma-hero-1200.webp')}"></div><div class=tag>Spa &amp; wellness</div>`;
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(400);
const buf = await p.screenshot();
await sharp(buf).webp({quality:84}).toFile('/Users/mac/mern/personal/trancongtien/public/images/demos/mien-an/identity/og-image.webp');
await b.close();
