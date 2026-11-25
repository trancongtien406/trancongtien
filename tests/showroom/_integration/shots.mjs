import { createRequire } from 'node:module';
const require = createRequire('/Users/mac/mern/works/hancitywebsite/node_modules/');
const { chromium } = require('playwright');
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
for (const [name, url] of [['demos-index', '/demos'], ['solution-spa', '/solutions/spa']]) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:3100' + url, { waitUntil: 'load', timeout: 120000 });
  await p.waitForTimeout(2500);
  await p.screenshot({ path: `tests/showroom/_integration/${name}-1440.png`, fullPage: true });
  await p.close();
}
await b.close();
