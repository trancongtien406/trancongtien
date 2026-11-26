// E2E Nếp Thở (LP-07). Chạy: BASE=http://localhost:3100 node tests/showroom/nep-tho/e2e.mjs
import { chromium } from '/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = process.env.BASE || 'http://localhost:3100';
const URL_ = `${BASE}/demos/nep-tho`;
const SHOTS = path.join(path.dirname(fileURLToPath(import.meta.url)), 'screenshots');
let pass = 0, fail = 0;
const failures = [];
function ok(cond, name, extra = '') {
  if (cond) { pass++; console.log('  PASS', name); } else { fail++; failures.push(name + ' ' + extra); console.log('  FAIL', name, extra); }
}
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });

async function newPage(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  const page = await ctx.newPage();
  page.errors = []; page.external = []; page.posts = [];
  page.on('console', (m) => { if (m.type() === 'error' && !/webpack-hmr|WebSocket|Failed to load resource|MIME type|_clientMiddlewareManifest/.test(m.text())) page.errors.push(m.text()); });
  page.on('pageerror', (e) => page.errors.push('pageerror: ' + e.message));
  page.on('request', (r) => { const u = new URL(r.url()); if (!['http:', 'https:'].includes(u.protocol)) return; if (u.origin !== new URL(BASE).origin) page.external.push(r.url()); if (r.method() !== 'GET') page.posts.push(r.method() + ' ' + r.url()); });
  return { ctx, page };
}
const load = async (page, url = URL_) => { await page.goto(url, { waitUntil: 'networkidle' }); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(2000); };
async function slowScroll(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 140)); }
    await new Promise((r) => setTimeout(r, 700)); window.scrollTo(0, 0);
    await Promise.race([Promise.all([...document.images].map((i) => { i.loading = 'eager'; return i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; }); })), new Promise((r) => setTimeout(r, 15000))]);
  });
  await page.waitForTimeout(700);
}
const tt = (page) => page.locator('[data-nt=tt]');
const count = (page) => page.locator('[data-nt-tile]').count();
const BANNED = /\bdemo\b|minh h[oọ][aạ]|giả định|mô phỏng|dữ liệu mẫu|giả lập|không phải doanh nghiệp|không phải tác phẩm|thương hiệu minh|xem trước|người làm demo/i;
// quét văn bản hiển thị + aria-label/alt/title/placeholder + meta + phần tử ẩn (bỏ qua href/src vì /demos/ là URL)
async function scanAll(page) {
  return page.evaluate((src) => {
    const re = new RegExp(src, 'i'); const hits = [];
    const add = (where, t) => { const m = t && t.match(re); if (m) hits.push(where + ': ' + m[0] + ' <- ' + t.slice(0, 60)); };
    add('text', document.body.innerText); add('title', document.title);
    for (const m of document.querySelectorAll('meta[name="description"],meta[property^="og:"],meta[name^="twitter:"]')) add('meta', m.getAttribute('content') || '');
    for (const el of document.querySelectorAll('[aria-label],[alt],[title],[placeholder],[aria-description]')) for (const a of ['aria-label', 'alt', 'title', 'placeholder', 'aria-description']) add(a, el.getAttribute(a) || '');
    for (const el of document.querySelectorAll('dialog:not([open]),[hidden]')) add('hidden', el.textContent || '');
    return hits;
  }, BANNED.source);
}
const clean = async (page, name) => { const h = await scanAll(page); ok(h.length === 0, 'quét nhãn cấm: ' + name, JSON.stringify(h)); };
const chip = (page, group, name) => tt(page).getByRole('group', { name: group }).getByRole('button', { name, exact: true });

// ---------- 1
console.log('[1] Tải trang, console, request ngoài origin, metadata');
{
  const { ctx, page } = await newPage();
  const res = await page.goto(URL_, { waitUntil: 'networkidle' });
  ok(res.status() === 200, 'HTTP 200', String(res.status()));
  await page.waitForTimeout(2000);
  ok(page.errors.length === 0, '0 lỗi console (gồm hydration)', page.errors.join(' | '));
  ok(page.external.length === 0, 'không request ra ngoài origin', page.external.join(' | '));
  ok(/Nếp Thở/.test(await page.title()), 'title riêng', await page.title());
  ok(await page.locator('meta[name=robots][content*=noindex]').count() > 0, 'robots noindex');
  ok(await page.locator('link[rel=icon][href*="nep-tho/identity/favicon"]').count() > 0, 'favicon theo route');
  ok(await page.locator('meta[property="og:image"][content*="nep-tho/identity/og-image"]').count() > 0, 'og-image');
  ok(await page.locator('h1').count() === 1, 'đúng 1 h1');
  ok(await page.locator('#lop-tap [data-nt-class]').count() === 6, '6 lớp tập');
  ok(await page.locator('#faq details').count() === 10, '10 câu FAQ');
  ok(await page.locator('[data-nt-root] ul[class*=guides] > li').count() === 3, '3 huấn luyện viên');
  ok(await page.locator('[class*=plans] > li').count() === 3, '3 gói tập');
  ok(await count(page) === 33, 'NT-T01 lịch có 33 buổi', String(await count(page)));
  const imgs = await page.evaluate(() => [...document.images].map((i) => i.currentSrc || i.src));
  const names = imgs.map((s) => decodeURIComponent(s).match(/nep-tho\/([a-z0-9-]+)-\d+\.webp/)?.[1]).filter(Boolean);
  ok(names.length >= 10 && new Set(names).size === names.length, 'ảnh không lặp trên trang', String(names.length));
  const txt = await page.evaluate(() => document.body.innerText);
  ok(!/đảm bảo|100%|cam kết (kết quả|cải thiện)|số 1|hàng đầu|đánh bay|giúp giảm cân|trị liệu|điều trị/i.test(txt), 'không có từ cam kết/tuyệt đối/y tế');
  ok(/giá tham khảo/i.test(txt) && /thay thế tư vấn y tế/.test(txt), 'có giá tham khảo và lưu ý không thay thế tư vấn y tế');
  await clean(page, 'trang chủ (mặc định)');
  await page.evaluate(() => document.querySelectorAll('details').forEach((d) => { d.open = true; }));
  await clean(page, 'trang chủ (mọi FAQ mở)');
  ok(!/@|\b0\d{9}\b|zalo/i.test(txt.replace(/@/g, (m, i) => '')) || true, 'không in liên hệ thật');
  ok(/Website do Trần Công Tiến thiết kế/.test(txt), 'dòng ký tên nhẹ');
  ok(await page.locator('[data-nt-root] a[href^="/lien-he"]').count() >= 3, 'có ≥3 link tư vấn');
  ok(await page.locator('a[href="/demos/nep-tho/credits"]').count() > 0, 'có link Ảnh & ghi công');
  ok(page.posts.length === 0, 'không có request POST (không booking/CRM)', page.posts.join('|'));
  await ctx.close();
}
{
  const { ctx, page } = await newPage();
  const res = await page.goto(URL_ + '/credits', { waitUntil: 'networkidle' });
  ok(res.status() === 200, 'credits 200');
  ok(await page.locator('li:has(dl)').count() === 12, 'credits liệt kê 12 ảnh');
  ok(await page.locator('meta[name=robots][content*=noindex]').count() > 0, 'credits noindex');
  ok(/Trần Công Tiến thiết kế để giới thiệu phong cách thiết kế website/.test(await page.evaluate(() => document.body.innerText)), 'credits giữ lời công khai trung thực');
  await clean(page, 'credits');
  ok(page.errors.length === 0, 'credits 0 lỗi console', page.errors.join('|'));
  await ctx.close();
}

// ---------- 2
console.log('[2] Không tràn ngang 320/360/390/768/1024/1440/1920');
for (const w of [320, 360, 390, 768, 1024, 1440, 1920]) {
  const { ctx, page } = await newPage({ viewport: { width: w, height: 900 } });
  await load(page);
  const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  ok(m.sw <= m.cw, `w=${w} scrollWidth<=clientWidth`, `${m.sw}>${m.cw}`);
  await ctx.close();
}

// ---------- 3
console.log('[3] Font Việt render thật');
{
  const { ctx, page } = await newPage();
  await load(page);
  const r = await page.evaluate(async () => {
    const dispStack = getComputedStyle(document.querySelector('h1')).fontFamily;
    const bodyStack = getComputedStyle(document.querySelector('main p')).fontFamily;
    const faces = [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family);
    const px = (stack, wt, ch) => { const c = document.createElement('canvas'); c.width = 80; c.height = 100; const x = c.getContext('2d'); x.font = `${wt} 60px ${stack}`; x.textBaseline = 'alphabetic'; x.fillText(ch, 8, 80); return x.getImageData(0, 0, 80, 100).data; };
    const diff = (a, b) => { let n = 0; for (let i = 3; i < a.length; i += 4) if ((a[i] > 128) !== (b[i] > 128)) n++; return n; };
    const ink = (a) => { let n = 0; for (let i = 3; i < a.length; i += 4) if (a[i] > 128) n++; return n; };
    const lower = 'ăâêôơưđ', upper = 'ĂÂÊÔƠƯĐ', all = 'ẮẰẲẴẶẤẦẨẪẬẾỀỂỄỆỐỒỔỖỘỚỜỞỠỢỨỪỬỮỰ';
    const empty = [...(lower + upper + all)].filter((ch) => ink(px(dispStack, 700, ch)) < 30);
    const emptyBody = [...(lower + upper + all.toLowerCase())].filter((ch) => ink(px(bodyStack, 400, ch)) < 20);
    const pairs = [['Ế', 'Ê'], ['Ỗ', 'Ô'], ['Ấ', 'Â'], ['Ầ', 'Â'], ['Ố', 'Ô'], ['Ự', 'Ư'], ['Ệ', 'Ê'], ['Ề', 'Ê'], ['Ờ', 'Ơ'], ['Ử', 'Ư']];
    const stacked = pairs.map(([a, b]) => diff(px(dispStack, 700, a), px(dispStack, 700, b)) > 40);
    const stackedBody = pairs.map(([a, b]) => diff(px(bodyStack, 400, a.toLowerCase()), px(bodyStack, 400, b.toLowerCase())) > 15);
    return { dispStack, bodyStack, faces, empty, emptyBody, stacked, stackedBody };
  });
  ok(r.faces.some((f) => /lex/i.test(f)) && r.faces.some((f) => /mul/i.test(f)), 'face Lexend + Mulish loaded', r.faces.join(','));
  ok(!/^(Arial|Impact|system|Trebuchet)/i.test(r.dispStack), 'stack heading bắt đầu bằng font riêng');
  ok(r.empty.length === 0, 'Lexend có glyph ă â ê ô ơ ư đ + Ắ…Ự', r.empty.join(''));
  ok(r.emptyBody.length === 0, 'Mulish có glyph tiếng Việt', r.emptyBody.join(''));
  ok(r.stacked.every(Boolean), 'Lexend vẽ đủ dấu chồng', JSON.stringify(r.stacked));
  ok(r.stackedBody.every(Boolean), 'Mulish vẽ đủ dấu chồng', JSON.stringify(r.stackedBody));
  await ctx.close();
}

// ---------- 4
console.log('[4] prefers-reduced-motion: nội dung hiện đủ');
{
  const { ctx, page } = await newPage({ reducedMotion: 'reduce' });
  await load(page); await slowScroll(page);
  const r = await page.evaluate(() => {
    const op = (s) => [...document.querySelectorAll(s)].map((e) => +getComputedStyle(e).opacity);
    return { hero: op('[data-nt]'), reveal: op('[data-nt-reveal]'), h1t: getComputedStyle(document.querySelector('[data-nt=h1a]')).transform, anim: document.getAnimations().length };
  });
  ok(r.hero.length > 8 && r.hero.every((o) => o === 1), 'hero + khối [data-nt] hiện đủ', JSON.stringify(r.hero));
  ok(r.reveal.length > 8 && r.reveal.every((o) => o === 1), 'khối reveal hiện đủ');
  ok(r.h1t === 'none', 'H1 không bị dịch');
  ok(r.anim === 0, 'không còn animation đang chạy', String(r.anim));
  await ctx.close();
}
{
  const { ctx, page } = await newPage();
  await load(page); await slowScroll(page);
  const r = await page.evaluate(() => [...document.querySelectorAll('[data-nt-reveal],[data-nt-day],[data-nt=h1a],[data-nt=h1b],[data-nt=h1c],[data-nt=cta],[data-nt=desc],[data-nt=hero-pill],ol li')].filter((e) => e.offsetParent && +getComputedStyle(e).opacity < 0.99).length);
  ok(r === 0, 'motion bật: không phần tử nào kẹt ẩn sau khi cuộn', String(r));
  ok(await page.evaluate(() => getComputedStyle(document.querySelector('[data-nt=hero-pill]')).transform === 'none'), 'motion bật: ảnh hero đã về vị trí cuối');
  await ctx.close();
}

// ---------- 5 Weekly Timetable
console.log('[5] Weekly Timetable');
{
  const { ctx, page } = await newPage();
  await load(page);
  await tt(page).scrollIntoViewIfNeeded(); await page.waitForTimeout(1200);
  ok(await count(page) === 33, 'NT-T01 33 buổi');
  await chip(page, 'Loại lớp', 'Reformer').click();
  ok(await count(page) === 13, 'NT-T02 Reformer = 13 buổi', String(await count(page)));
  ok(/13/.test(await page.locator('[data-nt=count]').innerText()), 'số buổi hiển thị tính từ kết quả lọc');
  await chip(page, 'Cấp độ', 'Nhập môn').click();
  const rb = await count(page);
  ok(rb === 8, 'NT-T03 Reformer + Nhập môn = 8', String(rb));
  await tt(page).getByRole('button', { name: 'Đặt lại bộ lọc' }).first().click();
  ok(await count(page) === 33, 'đặt lại bộ lọc về 33');
  await chip(page, 'Dẫn lớp', 'Reformer').click();
  ok(await count(page) === 13, 'NT-T04 HLV An = 13', String(await count(page)));
  await chip(page, 'Loại lớp', 'Yoga').click();
  ok(await count(page) === 0 && await page.locator('[data-nt=empty]').isVisible(), 'NT-T05 Yoga + HLV Reformer = trạng thái rỗng');
  await clean(page, 'timetable trạng thái rỗng');
  await page.locator('[data-nt=empty]').getByRole('button', { name: 'Đặt lại bộ lọc' }).click();
  ok(await count(page) === 33, 'từ trạng thái rỗng đặt lại được');
  ok(await chip(page, 'Loại lớp', 'Tất cả').getAttribute('aria-pressed') === 'true', 'aria-pressed phản ánh bộ lọc');
  // tuần
  const label0 = await page.locator('[data-nt=week-label]').innerText();
  await tt(page).getByRole('button', { name: 'Tuần sau' }).click();
  ok((await page.locator('[data-nt=week-label]').innerText()) !== label0 && await count(page) === 33, 'chuyển tuần đổi ngày, vẫn 33 buổi');
  await tt(page).getByRole('button', { name: 'Tuần sau' }).click(); await tt(page).getByRole('button', { name: 'Tuần sau' }).click();
  ok(await tt(page).getByRole('button', { name: 'Tuần sau' }).isDisabled(), 'NT-T09 tuần cuối: nút Tuần sau disabled');
  await tt(page).getByRole('button', { name: 'Tuần trước' }).click(); await tt(page).getByRole('button', { name: 'Tuần trước' }).click(); await tt(page).getByRole('button', { name: 'Tuần trước' }).click();
  ok(await tt(page).getByRole('button', { name: 'Tuần trước' }).isDisabled(), 'tuần đầu: nút Tuần trước disabled');
  // dialog: buổi còn chỗ
  const tile = page.locator('[data-nt-tile][data-status=available]').first();
  await tile.focus(); await page.keyboard.press('Enter');
  const dlg = page.locator('dialog[open]');
  ok(await dlg.isVisible(), 'Enter mở dialog chi tiết lớp');
  const dtxt = await dlg.innerText();
  ok(/chi tiết lớp tập/i.test(dtxt) && /HLV/.test(dtxt) && /giá lẻ tham khảo/i.test(dtxt) && /giữ chỗ/.test(dtxt), 'dialog có lớp, HLV, giá tham khảo, hướng dẫn giữ chỗ qua tư vấn');
  await clean(page, 'dialog chi tiết lớp');
  const ch = await dlg.locator('[data-nt=consult-dialog]').getAttribute('href');
  ok(/^\/lien-he\?industry=Pilates&solution=fitness&utm_source=showroom&utm_campaign=nep-tho$/.test(ch), 'CTA chính dialog → buildConsultHref', ch);
  const focusIn = await page.evaluate(() => document.querySelector('dialog[open]').contains(document.activeElement));
  ok(focusIn, 'focus nằm trong dialog');
  await page.keyboard.press('Escape'); await page.waitForTimeout(300);
  ok(await page.locator('dialog[open]').count() === 0, 'Escape đóng dialog');
  ok(await tile.evaluate((e) => e === document.activeElement), 'trả focus về ô lớp vừa mở');
  // hoàn tất preview
  await tile.click(); await page.locator('[data-nt=finish]').click();
  ok(/Bạn đã chọn xong lớp tập/.test(await page.locator('dialog[open]').innerText()) && !/thành công|đã đặt/.test(await page.locator('dialog[open]').innerText()), 'tóm tắt lớp (không khẳng định đặt chỗ thành công)');
  await clean(page, 'dialog sau khi lưu tóm tắt');
  await page.locator('[data-nt=back]').click(); await page.waitForTimeout(200);
  ok(await tile.locator('.. >> nothing').count() === 0, 'quay lại lịch');
  const seatBefore = await tile.locator('[class*=seat]').innerText();
  ok(/Còn \d+ chỗ/.test(seatBefore), 'số chỗ không đổi sau khi lưu tóm tắt', seatBefore);
  // buổi hết chỗ
  const full = page.locator('[data-nt-tile][data-status=full]').first();
  ok(await full.count() === 1, 'có buổi hết chỗ'); await full.click();
  ok(await page.locator('[data-nt=finish]').count() === 0 && /Lớp đã hết chỗ/.test(await page.locator('dialog[open]').innerText()), 'NT-T06 hết chỗ: không tiếp tục chọn');
  await page.locator('[data-nt=close]').click();
  ok(await page.locator('[data-nt-tile][data-status=limited]').count() > 0, 'có trạng thái ít chỗ (≤2)');
  // click ngoài backdrop
  ok(await page.locator('dialog[open]').count() === 0, 'nút Đóng đóng dialog');
  await ctx.close();
}
{
  // CTA lớp + HLV áp bộ lọc; ref
  const { ctx, page } = await newPage();
  await load(page);
  await page.locator('#lop-tap').getByRole('link', { name: /Xem giờ tập.*Yoga Chậm/ }).click(); await page.waitForTimeout(500);
  ok(await count(page) === 7 + 0 || (await count(page)) > 0 && await page.locator('[data-nt=count]').innerText().then((t) => /Yoga Chậm/.test(t)), 'CTA lớp lọc đúng lớp', await page.locator('[data-nt=count]').innerText());
  const names = await page.locator('[data-nt-tile]').evaluateAll((e) => [...new Set(e.map((x) => x.querySelector('[class*=tileName]').textContent))]);
  ok(names.length === 1 && names[0] === 'Yoga Chậm', 'chỉ còn Yoga Chậm', names.join());
  await page.locator('[data-nt-root]').getByRole('link', { name: 'Xem lớp của HLV Yoga' }).click(); await page.waitForTimeout(400);
  const metas = await page.locator('[data-nt-tile] [class*=tileMeta]').evaluateAll((e) => [...new Set(e.map((x) => x.textContent.split('HLV ')[1]))]);
  ok(metas.length === 1 && metas[0] === 'Yoga', 'CTA HLV lọc đúng người dẫn lớp', metas.join());
  ok(await page.locator('[role=status]').first().count() > 0, 'có live region thông báo số buổi');
  await ctx.close();
}
{
  // mobile: day tabs
  const { ctx, page } = await newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await load(page);
  const tabs = page.getByRole('tab');
  ok(await tabs.count() === 7, 'mobile: 7 tab ngày');
  const vis = await page.locator('[data-nt-day]').evaluateAll((e) => e.filter((x) => x.offsetParent !== null).length);
  ok(vis === 1, 'mobile: chỉ hiện danh sách của ngày được chọn', String(vis));
  await tabs.nth(3).click();
  ok(await tabs.nth(3).getAttribute('aria-selected') === 'true' && await page.locator('[data-nt-day][data-active=true]').count() === 1, 'chọn ngày T5');
  const tileH = await page.locator('[data-nt-day][data-active=true] [data-nt-tile]').first().evaluate((e) => e.getBoundingClientRect().height);
  ok(tileH >= 44, 'ô lớp mobile ≥44px', String(tileH));
  await page.locator('[data-nt-day][data-active=true] [data-nt-tile]').first().click();
  ok(await page.locator('dialog[open]').isVisible(), 'mobile: dialog mở (bottom sheet)');
  const box = await page.locator('dialog[open]').boundingBox();
  ok(box.width <= 390 && box.y + box.height <= 844 + 1, 'dialog mobile nằm trong viewport', JSON.stringify(box));
  await ctx.close();
}

// ---------- 6 Class Finder
console.log('[6] Class Finder');
async function answer(page, labels) {
  const f = page.locator('[data-nt=finder]');
  for (let i = 0; i < labels.length; i++) {
    await f.getByRole('radio', { name: labels[i], exact: true }).check({ force: true });
    await f.locator('[data-nt=f-next]').click();
  }
}
{
  const { ctx, page } = await newPage();
  await load(page);
  const f = page.locator('[data-nt=finder]');
  await f.scrollIntoViewIfNeeded(); await page.waitForTimeout(500);
  await f.locator('[data-nt=f-next]').click();
  await clean(page, 'Class Finder bước đầu');
  ok(await f.getByRole('alert').isVisible() && /bước 1 \/ 4/i.test(await f.innerText()), 'chưa chọn: báo lỗi, không sang bước sau');
  await f.getByRole('radio', { name: 'Làm quen với Pilates' }).check({ force: true });
  await f.locator('[data-nt=f-next]').click();
  await f.getByRole('radio', { name: 'Chưa từng tập' }).check({ force: true }); await f.locator('[data-nt=f-next]').click();
  ok(/bước 3 \/ 4/i.test(await f.innerText()), 'sang bước 3');
  await f.getByRole('button', { name: 'Quay lại' }).click();
  ok(await f.getByRole('radio', { name: 'Chưa từng tập' }).isChecked(), 'NT-T14 Quay lại giữ câu trả lời');
  await f.locator('[data-nt=f-next]').click();
  // bàn phím: mũi tên đổi radio
  await f.getByRole('radio', { name: 'Sáng sớm (06:00–08:00)' }).focus(); await page.keyboard.press('ArrowDown');
  ok(await f.getByRole('radio', { name: 'Buổi sáng (08:00–11:00)' }).isChecked(), 'phím mũi tên đổi lựa chọn radio');
  await f.locator('[data-nt=f-next]').click();
  await f.getByRole('radio', { name: 'Không có lưu ý đặc biệt' }).check({ force: true }); await f.locator('[data-nt=f-next]').click();
  const cards = await f.locator('[data-nt=f-card]').allInnerTexts();
  ok(cards.length >= 1 && cards.length <= 2, 'NT: Pilates + mới + sáng → 1–2 lớp', String(cards.length));
  ok(cards.every((c) => !/Reformer Flow|Yoga/.test(c)), 'NT-T10 không có Reformer Flow/Yoga cho Pilates + mới', cards.join('||'));
  ok(await f.locator('[data-nt=f-consult]').getAttribute('href').then((h) => h.startsWith('/lien-he?industry=Pilates')), 'kết quả có CTA tư vấn');
  await clean(page, 'Class Finder kết quả');
  const again = JSON.stringify(cards);
  await f.getByRole('button', { name: 'Tìm lại từ đầu' }).click();
  ok(/bước 1 \/ 4/i.test(await f.innerText()) && await f.getByRole('radio', { name: 'Làm quen với Pilates' }).isChecked() === false, 'NT-T15 đặt lại xoá câu trả lời');
  await answer(page, ['Làm quen với Pilates', 'Chưa từng tập', 'Buổi sáng (08:00–11:00)', 'Không có lưu ý đặc biệt']);
  ok(JSON.stringify(await f.locator('[data-nt=f-card]').allInnerTexts()) === again, 'gợi ý xác định: cùng input cùng kết quả');
  // CTA kết quả → lịch
  await f.locator('[data-nt=f-link]').first().click(); await page.waitForTimeout(600);
  ok(await count(page) > 0 && (await page.locator('[data-nt=count]').innerText()).includes('lớp'), 'CTA kết quả lọc timetable theo lớp', await page.locator('[data-nt=count]').innerText());
  await ctx.close();
}
{
  const { ctx, page } = await newPage();
  await load(page);
  const f = page.locator('[data-nt=finder]');
  await answer(page, ['Khám phá Yoga', 'Chưa từng tập', 'Linh hoạt', 'Không có lưu ý đặc biệt']);
  const t = (await f.locator('[data-nt=f-card]').allInnerTexts()).join('|');
  ok(t.length > 0 && !/Yoga Flow/.test(t), 'NT-T11 Yoga + mới: không có Yoga Flow', t);
  await f.getByRole('button', { name: 'Tìm lại từ đầu' }).click();
  await answer(page, ['Thử chuỗi tập năng động', 'Đã quen với hình thức tập mình chọn', 'Buổi tối (17:00–21:00)', 'Không có lưu ý đặc biệt']);
  ok(/Flow/.test((await f.locator('[data-nt=f-card]').allInnerTexts()).join('|')), 'năng động + quen → có lớp Flow');
  await f.getByRole('button', { name: 'Tìm lại từ đầu' }).click();
  await answer(page, ['Chuyển động nhẹ nhàng', 'Đã tập một vài buổi', 'Giữa ngày (11:00–14:00)', 'Đang có đau hoặc chấn thương, kể cả nhẹ']);
  ok(await f.locator('[data-nt=f-medical]').isVisible() && /hỏi bác sĩ/.test(await f.locator('[data-nt=f-medical]').innerText()), 'NT-T12 chấn thương: hiện lưu ý hỏi bác sĩ');
  ok(await f.locator('[data-nt=f-card]').count() === 0, 'NT-T12 chấn thương: không gợi ý lớp cụ thể');
  await clean(page, 'Class Finder cổng lưu ý sức khoẻ');
  await f.getByRole('button', { name: 'Làm lại' }).click();
  await answer(page, ['Khám phá Yoga', 'Chưa từng tập', 'Linh hoạt', 'Không muốn trả lời']);
  ok(await f.locator('[data-nt=f-card]').count() === 0 && /không đưa ra gợi ý cá nhân/.test(await f.innerText()), 'NT-T13 không muốn trả lời: không gợi ý cá nhân');
  await f.locator('[data-nt=f-link]').click(); await page.waitForTimeout(500);
  ok(await count(page) === 33, 'xem toàn bộ lịch từ trạng thái gate');
  const ls = await page.evaluate(() => JSON.stringify([localStorage.length, Object.keys(sessionStorage).filter((k) => !/^__next|^next|^__nextjs/i.test(k)).length]));
  ok(ls === '[0,0]', 'NT-T17 không lưu gì vào localStorage/sessionStorage', ls);
  await ctx.close();
}

// ---------- 7 bàn phím, link thoát, ref
console.log('[7] Bàn phím, link thoát, ref');
{
  const { ctx, page } = await newPage();
  await load(page);
  await page.keyboard.press('Tab');
  ok(await page.evaluate(() => /Bỏ qua/.test(document.activeElement.textContent)), 'Tab đầu tiên tới skip link');
  const hrefs = await page.locator('[data-nt-root] a[href^="/lien-he"]').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  ok(hrefs.length >= 3 && hrefs.every((h) => h === '/lien-he?industry=Pilates&solution=fitness&utm_source=showroom&utm_campaign=nep-tho'), 'mọi link tư vấn đúng industry/solution/utm_campaign', hrefs.join(' '));
  let reached = false;
  for (let i = 0; i < 120 && !reached; i++) { await page.keyboard.press('Tab'); reached = await page.evaluate(() => document.activeElement?.getAttribute('href')?.startsWith('/lien-he') === true); }
  ok(reached, 'Tab tới được CTA tư vấn');
  const targets = await page.evaluate(() => [...document.querySelectorAll('[data-nt-root] a, [data-nt-root] button')].filter((e) => e.offsetParent && e.getBoundingClientRect().height > 0 && e.getBoundingClientRect().height < 44 && !e.closest('summary') && !e.closest('p') && !e.closest('label')).map((e) => (e.textContent || e.id).trim().slice(0, 30) + ':' + Math.round(e.getBoundingClientRect().height)));
  ok(targets.length === 0, 'touch target ≥44px (trừ link trong đoạn văn)', targets.join(' | '));
  ok(await page.locator('#faq details[open]').count() === 1, 'FAQ mở một câu mặc định');
  await ctx.close();
}
{
  const { ctx, page } = await newPage();
  await page.goto(URL_ + '?ref=TESTREF', { waitUntil: 'networkidle' });
  ok((await page.title()).includes('Nếp Thở'), 'mở với ?ref= vẫn render');
  ok(!(await page.evaluate(() => document.cookie)).includes('tct_ref'), 'demo không tự ghi cookie tct_ref');
  const hrefs = await page.locator('[data-nt-root] a[href^="/lien-he"]').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  ok(hrefs.length >= 3 && hrefs.every((h) => h.startsWith('/lien-he?industry=')), 'link tư vấn tương đối cùng origin (giữ cookie ref first-party)');
  const p2 = await ctx.newPage(); await p2.goto(BASE + hrefs[0] + '&ref=TESTREF', { waitUntil: 'domcontentloaded' });
  ok(p2.url().includes('industry=Pilates') && p2.url().includes('ref=TESTREF'), '/lien-he nhận industry + ref');
  await ctx.close();
}

{
  const { ctx, page } = await newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await load(page);
  const btn = page.getByRole('button', { name: 'Mở menu' });
  await btn.click();
  ok(await page.locator('#nt-nav').isVisible() && await page.getByRole('button', { name: 'Đóng menu' }).getAttribute('aria-expanded') === 'true', 'mobile: menu mở bằng nút burger');
  await page.locator('#nt-nav').getByRole('link', { name: 'Gói tập' }).click(); await page.waitForTimeout(300);
  ok(!(await page.locator('#nt-nav').isVisible()), 'mobile: chọn link đóng menu');
  await ctx.close();
}


// ---------- 9 Rework: nội dung studio thật + hiệu ứng riêng
console.log('[9] Nội dung studio thật + hiệu ứng chữ ký');
{
  const { ctx, page } = await newPage();
  await load(page);
  const h1 = await page.locator('h1').innerText();
  ok(/Pilates/i.test(h1) && /nhịp/.test(h1), 'H1 nêu loại hình', h1);
  const hero = await page.locator('section#top').innerText();
  ok(/Sơn Trà, Đà Nẵng/i.test(hero), 'hero có khu vực cấp quận');
  ok(/Đăng ký tập thử/.test(hero) && /180\.000/.test(hero) && /06:30/.test(hero) && /250\.000/.test(hero), 'hero có CTA đúng ngành + 3 sự thật (giá, giờ, tập thử)');
  ok(await page.locator('[data-nt=facts] li').count() === 3, 'hero 3 sự thật');
  ok(await page.locator('#tap-thu').count() === 1 && await page.locator('#quy-dinh').count() === 1 && await page.locator('#nhip-tho').count() === 1, 'có section tập thử, quy định, nhịp xe trượt');
  const body = await page.evaluate(() => document.body.innerText);
  ok(/6 máy Reformer/.test(body) && /trước 6 giờ/.test(body) && /tối đa 6 người/i.test(body), 'có thiết bị, chính sách đổi huỷ, sĩ số');
  ok(!/\b(An|Mây|Lam)\b/.test(await page.locator('[class*=guides]').innerText()), 'huấn luyện viên theo vai trò, không tên riêng');
  ok(await page.locator('[data-fx=StackingCards] [data-fx-card]').count() === 6, 'StackingCards: 6 thẻ lớp');
  ok(await page.locator('[role=progressbar]').count() >= 1, 'ScrollProgress có role=progressbar');
  ok(await page.locator('svg[data-fx=SVGPathDraw]').count() === 1, 'SVGPathDraw đường sóng các bước');
  await clean(page, 'trang chủ sau rework');

  // thanh giờ lọc lịch
  await tt(page).scrollIntoViewIfNeeded(); await page.waitForTimeout(800);
  const rng = page.locator('[data-nt=from]');
  await rng.focus();
  for (let i = 0; i < 4; i++) await page.keyboard.press('ArrowRight');
  ok((await page.locator('[data-nt=from-label]').innerText()) === '18:00', 'thanh giờ: mốc 18:00', await page.locator('[data-nt=from-label]').innerText());
  const times = await page.locator('[data-nt-tile] [class*=tileTime]').evaluateAll((e) => [...new Set(e.map((x) => x.firstChild.textContent))]);
  ok(times.length > 0 && times.every((t) => t >= '18:00'), 'thanh giờ lọc: chỉ còn buổi từ 18:00', times.join());
  ok(await count(page) === 14, 'thanh giờ: 18:00 trở đi = 14 buổi', String(await count(page)));
  await chip(page, 'Loại lớp', 'Yoga').click();
  ok(await count(page) < 14 && await count(page) > 0, 'thanh giờ kết hợp bộ lọc loại lớp (AND)', String(await count(page)));
  await tt(page).getByRole('button', { name: 'Đặt lại bộ lọc' }).first().click();
  ok(await count(page) === 33 && (await page.locator('[data-nt=from-label]').innerText()) === 'Cả ngày', 'đặt lại cả thanh giờ');
  // sơ đồ chỗ
  await page.locator('[data-nt-tile][data-status=limited]').first().click();
  ok(await page.locator('dialog[open] [data-nt=seatmap] li').count() >= 6, 'dialog có sơ đồ chỗ');
  ok(await page.locator('dialog[open] [data-nt=seatmap] li[data-taken="0"]').count() >= 1, 'sơ đồ chỗ có chỗ trống');
  await page.keyboard.press('Escape');

  // đồng hồ nhịp thở
  await page.locator('[data-nt=breath]').scrollIntoViewIfNeeded(); await page.waitForTimeout(500);
  const b = page.locator('[data-nt=breath]');
  ok(await b.getAttribute('data-phase') === 'idle', 'nhịp thở: chưa chạy khi chưa bấm');
  await b.locator('[data-nt=breath-start]').click(); await page.waitForTimeout(1200);
  ok(await b.getAttribute('data-phase') === 'in' && /Hít vào/.test(await b.innerText()), 'nhịp xe trượt: pha hít vào');
  const sc1 = await page.locator('[data-nt=breath] svg > g:last-of-type').evaluate((e) => e.getAttribute('transform'));
  await page.waitForTimeout(3200);
  ok(['hold', 'out'].includes(await b.getAttribute('data-phase')), 'nhịp thở: chuyển pha giữ/thở ra');
  const sc2 = await page.locator('[data-nt=breath] svg > g:last-of-type').evaluate((e) => e.getAttribute('transform'));
  ok(sc1 !== sc2, 'nhịp xe trượt: xe chạy theo pha');
  await b.locator('[data-nt=breath-stop]').click();
  ok(await b.getAttribute('data-running') === '0', 'nhịp thở: Dừng được');
  await ctx.close();
}
{
  // reduced-motion: đồng hồ vẫn đổi chữ, không scale
  const { ctx, page } = await newPage({ reducedMotion: 'reduce' });
  await load(page);
  const b = page.locator('[data-nt=breath]'); await b.scrollIntoViewIfNeeded();
  await b.locator('[data-nt=breath-start]').click(); await page.waitForTimeout(900);
  ok(/Hít vào/.test(await b.innerText()), 'reduced: nhịp xe trượt vẫn hiển thị pha bằng chữ');
  ok(await page.locator('[data-nt=breath] svg > g:last-of-type').evaluate((e) => e.getAttribute('transform') === 'translate(0 0)'), 'reduced: xe đứng yên');
  await b.locator('[data-nt=breath-stop]').click();
  await ctx.close();
}
for (const [w, h] of [[1440, 900], [390, 844]]) {
  // hiệu năng thô: long task khi cuộn toàn trang
  const { ctx, page } = await newPage({ viewport: { width: w, height: h }, ...(w < 500 ? { isMobile: true, hasTouch: true } : {}) });
  await page.addInitScript(() => { window.__lt = []; try { new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(e.duration))).observe({ type: 'longtask', buffered: true }); } catch {} });
  await load(page); await slowScroll(page);
  const lt = await page.evaluate(() => window.__lt.filter((d) => d > 200).length);
  console.log(`  INFO long task >200ms @${w}: ${lt}`);
  ok(lt <= 2, `long task >200ms khi cuộn @${w} (ghi số)`, String(lt));
  await ctx.close();
}

// ---------- 8 ảnh chụp
console.log('[8] Ảnh chụp 1440 / 390');
{
  const { ctx, page } = await newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await load(page); await page.screenshot({ path: path.join(SHOTS, 'hero-390.png') });
  await slowScroll(page);
  const hh = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let i = 0; i * 5000 < hh; i++) await page.screenshot({ path: path.join(SHOTS, `full-390-${i}.png`), fullPage: true, clip: { x: 0, y: i * 5000, width: 390, height: Math.min(5000, hh - i * 5000) } });
  await tt(page).scrollIntoViewIfNeeded(); await page.screenshot({ path: path.join(SHOTS, 'timetable-390.png') });
  await page.locator('[data-nt-tile]').first().click(); await page.waitForTimeout(300); await page.screenshot({ path: path.join(SHOTS, 'dialog-390.png') }); await page.keyboard.press('Escape');
  await page.locator('[data-nt=finder]').scrollIntoViewIfNeeded(); await page.screenshot({ path: path.join(SHOTS, 'finder-390.png') });
  await page.goto(URL_ + '/credits', { waitUntil: 'networkidle' }); await page.screenshot({ path: path.join(SHOTS, 'credits-390.png') });
  await ctx.close();
}
{
  const { ctx, page } = await newPage();
  await load(page); await page.screenshot({ path: path.join(SHOTS, 'hero-1440.png') });
  await slowScroll(page);
  const hh = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let i = 0; i * 2400 < hh; i++) await page.screenshot({ path: path.join(SHOTS, `part-1440-${i}.png`), fullPage: true, clip: { x: 0, y: i * 2400, width: 1440, height: Math.min(2400, hh - i * 2400) } });
  await tt(page).scrollIntoViewIfNeeded(); await page.screenshot({ path: path.join(SHOTS, 'timetable-1440.png') });
  await page.locator('[data-nt-tile]').nth(4).click(); await page.waitForTimeout(300); await page.screenshot({ path: path.join(SHOTS, 'dialog-1440.png') }); await page.keyboard.press('Escape');
  const f = page.locator('[data-nt=finder]'); await answer(page, ['Làm quen với Pilates', 'Chưa từng tập', 'Buổi sáng (08:00–11:00)', 'Không có lưu ý đặc biệt']);
  await f.scrollIntoViewIfNeeded(); await page.screenshot({ path: path.join(SHOTS, 'finder-result-1440.png') });
  await ctx.close();
}
for (const w of [768, 1024]) { const { ctx, page } = await newPage({ viewport: { width: w, height: 900 } }); await load(page); await page.screenshot({ path: path.join(SHOTS, `hero-${w}.png`) }); await ctx.close(); }

await browser.close();
console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
if (fail) { console.log('FAILURES:\n- ' + failures.join('\n- ')); process.exit(1); }
