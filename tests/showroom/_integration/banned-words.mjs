// Quét văn bản HIỂN THỊ (innerText + alt/aria/title/meta) của từng trang xem có từ cấm (mục 11 AGENT-RULES) không.
import { createRequire } from 'node:module';
const require = createRequire('/Users/mac/mern/works/hancitywebsite/node_modules/');
const { chromium } = require('playwright');
const slugs = process.argv.slice(2);
const BAD = /\bdemo\b|minh hoạ|minh họa|giả định|mô phỏng|dữ liệu mẫu|thương hiệu minh|không phải doanh nghiệp/i;
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
let bad = 0;
for (const s of slugs) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(`http://localhost:3100/demos/${s}`, { waitUntil: 'load', timeout: 120000 });
  await p.waitForTimeout(1500);
  const hits = await p.evaluate((src) => {
    const re = new RegExp(src, 'i'); const out = [];
    const t = document.body.innerText; for (const l of t.split('\n')) if (re.test(l)) out.push('text: ' + l.slice(0, 90));
    document.querySelectorAll('[alt],[aria-label],[title],[placeholder]').forEach((e) => ['alt','aria-label','title','placeholder'].forEach((a) => { const v = e.getAttribute(a); if (v && re.test(v)) out.push(`${a}: ${v.slice(0, 90)}`); }));
    document.querySelectorAll('meta[name=description],meta[property^="og:"]').forEach((m) => { const v = m.content; if (re.test(v)) out.push('meta: ' + v.slice(0, 90)); });
    if (re.test(document.title)) out.push('title: ' + document.title);
    return out;
  }, BAD.source);
  // thanh nổi của điều phối viên không chứa từ cấm; mọi hit là lỗi
  console.log(`${hits.length ? 'FAIL' : 'ok  '} ${s}${hits.length ? '\n  ' + [...new Set(hits)].slice(0, 8).join('\n  ') : ''}`);
  bad += hits.length ? 1 : 0; await p.close();
}
await b.close(); process.exit(bad ? 1 : 0);
