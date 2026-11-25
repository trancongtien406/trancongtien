import { createRequire } from 'node:module';
const require = createRequire('/Users/mac/mern/works/hancitywebsite/node_modules/');
const { chromium } = require('playwright');
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:3100/demos', { waitUntil: 'load', timeout: 120000 });
const h = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h; y += 700) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(250); }
await p.waitForTimeout(2500);
const bad = await p.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.alt));
console.log('ảnh chưa tải:', bad.length, bad.slice(0, 5));
await p.evaluate(() => scrollTo(0, 1500)); await p.waitForTimeout(800);
await p.screenshot({ path: 'tests/showroom/_integration/demos-index-mid.png' });
await b.close();
