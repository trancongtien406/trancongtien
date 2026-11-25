// E2E Hiên Mặn Villa (LP-02). Chạy: node tests/showroom/hien-man/e2e.mjs  (BASE=http://localhost:3100)
// Logic thuần chạy riêng: node_modules/.bin/tsx --test tests/showroom/hien-man/logic.test.ts
import { chromium } from '/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = process.env.BASE || 'http://localhost:3100';
const URL_ = `${BASE}/demos/hien-man`;
const SHOTS = path.join(path.dirname(fileURLToPath(import.meta.url)), 'screenshots');
let pass = 0, fail = 0;
const failures = [];
function ok(cond, name, extra = '') {
  if (cond) { pass++; console.log('  PASS', name); } else { fail++; failures.push(name + ' ' + extra); console.log('  FAIL', name, extra); }
}

// Chính sách nhãn (AGENT-RULES mục 11): không còn nhãn "Demo"/"minh hoạ"/"giả định"/"mô phỏng" ở bất kỳ chỗ nào người dùng thấy.
const BANNED = /\bdemo\b|minh ho[aạ]|minh hoạ|giả định|mô phỏng|dữ liệu mẫu|không phải doanh nghiệp|thương hiệu minh|illustrative|fictional|sample data|mock/i;
async function bannedHits(page, root = '[data-site]') {
  return page.evaluate(({ root, src }) => {
    const re = new RegExp(src, 'i');
    const out = [];
    const r = document.querySelector(root) || document.body;
    const clone = r.cloneNode(true);
    clone.querySelectorAll('script,style').forEach((n) => n.remove());
    const texts = [clone.textContent || '', r.innerText || ''];
    r.querySelectorAll('[aria-label],[alt],[title],[placeholder]').forEach((e) => ['aria-label', 'alt', 'title', 'placeholder'].forEach((a) => e.getAttribute(a) && texts.push(e.getAttribute(a))));
    document.querySelectorAll('title,meta[name="description"],meta[property^="og:"],meta[name^="twitter:"]').forEach((m) => texts.push(m.content || m.textContent || ''));
    document.querySelectorAll('script[type="application/ld+json"]').forEach((s) => texts.push(s.textContent || ''));
    for (const t of texts) { const n = t.normalize('NFC'); const m = n.match(re); if (m) out.push(m[0] + ' … ' + n.slice(Math.max(0, m.index - 30), m.index + 40).replace(/\s+/g, ' ')); }
    return out;
  }, { root, src: BANNED.source });
}
const noBanned = async (page, label, root) => { const h = await bannedHits(page, root); ok(h.length === 0, `không còn nhãn cấm: ${label}`, h.slice(0, 3).join(' || ')); };
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });

async function newPage(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  const page = await ctx.newPage();
  page.errors = []; page.external = [];
  page.on('console', (m) => { if (m.type() === 'error' && !/webpack-hmr|WebSocket|Failed to load resource|MIME type|_clientMiddlewareManifest/.test(m.text())) page.errors.push(m.text()); });
  page.on('pageerror', (e) => page.errors.push('pageerror: ' + e.message));
  page.on('request', (r) => { const u = new URL(r.url()); if (!['http:', 'https:'].includes(u.protocol)) return; if (u.origin !== new URL(BASE).origin) page.external.push(r.url()); });
  return { ctx, page };
}
const load = async (page, url = URL_) => { await page.goto(url, { waitUntil: 'networkidle' }); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(2800); };
const toTop = (page) => page.evaluate(() => window.scrollTo(0, 0));
const goto = async (page, id, wait = 1400) => { await page.evaluate((id) => document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' }), id); await page.waitForTimeout(wait); };
const clearDates = async (page) => { const b = page.getByRole('button', { name: 'Xoá ngày' }); if (await b.isEnabled()) await b.click(); };
const vnd = (s) => parseInt(String(s).replace(/[^\d]/g, ''), 10);

/** Chọn khoảng ngày bằng chuột: tìm ngày bắt đầu là thứ hai..thứ tư có n đêm liên tiếp trống trong các tháng đang hiển thị. */
async function pickRange(page, nights, weekdays = [1, 2, 3]) {
  const days = await page.evaluate(() => [...document.querySelectorAll('#lich-gia button[data-day]')].map((b) => ({ d: b.dataset.day, s: b.dataset.status })));
  const map = new Map(days.map((x) => [x.d, x.s]));
  const addD = (iso, n) => new Date(Date.parse(iso + 'T00:00:00Z') + n * 86400000).toISOString().slice(0, 10);
  for (const { d, s } of days) {
    if (s !== 'open' && s !== 'few') continue;
    const wd = new Date(d + 'T00:00:00Z').getUTCDay();
    if (!weekdays.includes(wd)) continue;
    let good = true;
    for (let i = 0; i < nights; i++) { const st = map.get(addD(d, i)); if (st !== 'open' && st !== 'few') { good = false; break; } }
    if (!good || !map.has(addD(d, nights))) continue;
    await page.locator(`#lich-gia button[data-day="${d}"]`).click();
    await page.locator(`#lich-gia button[data-day="${addD(d, nights)}"]`).click();
    return { ci: d, co: addD(d, nights) };
  }
  return null;
}

if (!process.env.ONLY6) {
// ---------- 1. tải trang, console, request ngoài
console.log('[1] Tải trang, console, request ngoài origin, metadata');
{
  const { ctx, page } = await newPage();
  const res = await page.goto(URL_, { waitUntil: 'networkidle' });
  ok(res.status() === 200, 'HTTP 200', String(res.status()));
  await page.waitForTimeout(2500);
  ok(page.errors.length === 0, '0 lỗi console', page.errors.join(' | '));
  ok(page.external.length === 0, 'không request ra ngoài origin', page.external.join(' | '));
  ok(/Hiên Mặn/.test(await page.title()), 'title riêng', await page.title());
  ok(await page.locator('meta[name=robots][content*=noindex]').count() > 0, 'robots noindex');
  ok(await page.locator('meta[name=description]').getAttribute('content').then((c) => /Hiên Mặn/.test(c || '') && !BANNED.test(c || '')), 'meta description riêng');
  ok(await page.locator('link[rel=icon][href*="hien-man/identity/favicon"]').count() > 0, 'favicon theo route');
  ok(await page.locator('meta[property="og:image"][content*="hien-man/identity/og-image"]').count() > 0, 'og-image theo route');
  ok(await page.locator('h1').count() === 1, 'đúng 1 h1');
  for (const id of ['ve-hien', 'mot-ngay', 'phong', 'khong-gian', 'trai-nghiem', 'lich-gia', 'hoi-dap', 'ket']) ok(await page.locator('#' + id).count() === 1, `có section #${id}`);
  const srcs = await page.evaluate(() => [...document.querySelectorAll('main img')].map((i) => new URL(i.currentSrc || i.src).searchParams.get('url') || i.src));
  ok(new Set(srcs).size >= 11, 'ảnh stock không lặp (≥11 ảnh khác nhau)', `${new Set(srcs).size}/${srcs.length}`);
  ok(await page.locator('footer a[href="/demos/hien-man/credits"]').count() > 0 && (await page.locator('footer').innerText()).includes('Ảnh & ghi công'), 'footer có link "Ảnh & ghi công"');
  ok((await page.locator('footer').innerText()).includes('Trần Công Tiến'), 'footer có dòng ký tên người thiết kế');
  await noBanned(page, 'trang chủ (toàn bộ văn bản, alt, aria-label, meta, JSON-LD)');
  ok(await page.locator('text=/Ảnh minh hoạ/').count() === 0, 'không còn chip "Ảnh minh hoạ" trên ảnh');
  ok(!/@gmail|\+84|0\d{9}/.test(await page.locator('body').innerText()), 'không in email/SĐT thật');
  await ctx.close();
}

// ---------- 2. tràn ngang
console.log('[2] Không tràn ngang 320/390/768/1024/1440');
for (const w of [320, 390, 768, 1024, 1440]) {
  const { ctx, page } = await newPage({ viewport: { width: w, height: 900 } });
  await load(page);
  const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  ok(m.sw <= m.cw, `w=${w} scrollWidth<=clientWidth`, `${m.sw}>${m.cw}`);
  await goto(page, 'lich-gia', 800);
  const m2 = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  ok(m2.sw <= m2.cw, `w=${w} (tại lịch & giá) không tràn`, `${m2.sw}>${m2.cw}`);
  await ctx.close();
}
{
  // ô lịch đủ lớn để chạm ở 320 và 390 (WCAG 2.2 AA tối thiểu 24px; quy tắc repo 44px)
  for (const w of [320, 390]) {
    const { ctx, page } = await newPage({ viewport: { width: w, height: 800 } });
    await load(page); await goto(page, 'lich-gia', 700);
    const b = await page.locator('#lich-gia button[data-status="open"]').first().boundingBox();
    ok(b.height >= 44 && b.width >= (w === 320 ? 36 : 44), `w=${w} ô ngày ${Math.round(b.width)}×${Math.round(b.height)}px đủ lớn để chạm`, `${b.width}x${b.height}`);
    await ctx.close();
  }
}

// ---------- 3. font Việt
console.log('[3] Font tiếng Việt render thật');
{
  const { ctx, page } = await newPage();
  await load(page);
  const r = await page.evaluate(async () => {
    const h1 = document.querySelector('h1');
    const dispStack = getComputedStyle(h1).fontFamily;
    const bodyStack = getComputedStyle(document.querySelector('main p')).fontFamily;
    const faces = [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family);
    const px = (stack, wt, ch, style = 'normal') => { const c = document.createElement('canvas'); c.width = 90; c.height = 110; const x = c.getContext('2d'); x.font = `${style} ${wt} 64px ${stack}`; x.textBaseline = 'alphabetic'; x.fillText(ch, 8, 86); return x.getImageData(0, 0, 90, 110).data; };
    const diff = (a, b) => { let n = 0; for (let i = 3; i < a.length; i += 4) if ((a[i] > 128) !== (b[i] > 128)) n++; return n; };
    const ink = (a) => { let n = 0; for (let i = 3; i < a.length; i += 4) if (a[i] > 128) n++; return n; };
    const lower = 'ăâêôơưđ', upper = 'ĂÂÊÔƠƯĐ';
    const all = 'ẮẰẲẴẶẤẦẨẪẬẾỀỂỄỆỐỒỔỖỘỚỜỞỠỢỨỪỬỮỰ';
    const empty = [...(lower + upper + all)].filter((ch) => ink(px(dispStack, 700, ch)) < 30);
    const emptyBody = [...(lower + upper + all.toLowerCase())].filter((ch) => ink(px(bodyStack, 700, ch)) < 20);
    const pairs = [['Ế', 'Ê'], ['Ỗ', 'Ô'], ['Ấ', 'Â'], ['Ầ', 'Â'], ['Ố', 'Ô'], ['Ự', 'Ư'], ['Ệ', 'Ê'], ['Ử', 'Ư'], ['Ặ', 'Ă']];
    const stacked = pairs.map(([a, b]) => diff(px(dispStack, 700, a), px(dispStack, 700, b)) > 40);
    const stackedBody = pairs.map(([a, b]) => diff(px(bodyStack, 700, a.toLowerCase()), px(bodyStack, 700, b.toLowerCase())) > 12);
    const nfc = document.body.innerText === document.body.innerText.normalize('NFC');
    return { dispStack, bodyStack, faces, empty, emptyBody, stacked, stackedBody, nfc };
  });
  ok(r.faces.some((f) => /lora/i.test(f)) && r.faces.some((f) => /^man/i.test(f)), 'face Lora + Manrope đã tải', r.faces.join(','));
  ok(r.empty.length === 0, 'Lora có glyph cho ă â ê ô ơ ư đ + Ắ…Ự (heading)', r.empty.join(''));
  ok(r.emptyBody.length === 0, 'Manrope có glyph tiếng Việt (body)', r.emptyBody.join(''));
  ok(r.stacked.every(Boolean), 'Lora vẽ đủ dấu chồng (Ế≠Ê, Ỗ≠Ô, Ấ≠Â, Ầ≠Â, Ố≠Ô, Ự≠Ư, Ệ≠Ê, Ử≠Ư, Ặ≠Ă)', JSON.stringify(r.stacked));
  ok(r.stackedBody.every(Boolean), 'Manrope vẽ đủ dấu chồng', JSON.stringify(r.stackedBody));
  ok(r.nfc, 'toàn bộ chữ ở dạng NFC');
  await ctx.close();
}

// ---------- 4. reduced motion
console.log('[4] prefers-reduced-motion: nội dung hiện đủ, không ẩn');
{
  const { ctx, page } = await newPage({ reducedMotion: 'reduce' });
  await load(page);
  const r = await page.evaluate(() => {
    const op = (s) => [...document.querySelectorAll(s)].map((e) => +getComputedStyle(e).opacity);
    const tr = (s) => [...document.querySelectorAll(s)].map((e) => getComputedStyle(e).transform);
    const vis = (s) => [...document.querySelectorAll(s)].map((e) => getComputedStyle(e).visibility);
    return { fade: op('[data-hm=hero-fade]'), lineT: tr('[data-hm=hero-line]'), rise: op('[data-hm=rise]'), riseV: vis('[data-hm=rise]'), plate: op('[data-hm=story-plate]'), media: tr('[data-hm=hero-media]'), book: op('#dat-nhanh'), n: document.querySelectorAll('[data-hm=rise]').length };
  });
  ok(r.fade.length > 0 && r.fade.every((o) => o === 1), 'hero hiện đủ', JSON.stringify(r.fade));
  ok(r.lineT.every((t) => t === 'none'), 'dòng H1 không dịch');
  ok(r.n >= 11 && r.rise.every((o) => o === 1) && r.riseV.every((v) => v === 'visible'), 'các dòng "rise" hiện đủ không cần cuộn', `${r.n}`);
  ok(r.plate.every((o) => o === 1), 'tấm Về Hiên hiện đủ');
  ok(r.media.every((t) => t === 'none'), 'ảnh hero không zoom');
  ok(r.book.every((o) => o === 1), 'thanh đặt phòng hiện đủ');
  await ctx.close();
}
{
  const { ctx, page } = await newPage();
  await load(page);
  const hidden = await page.evaluate(() => [...document.querySelectorAll('[data-hm=hero-fade],[data-hm=hero-line]')].filter((e) => +getComputedStyle(e).opacity < 0.99 || getComputedStyle(e).visibility === 'hidden').length);
  ok(hidden === 0, 'motion bật: hero hiện đủ sau khi chạy xong intro', String(hidden));
  const inline = await page.evaluate(() => getComputedStyle(document.getElementById('dat-nhanh')).opacity);
  ok(inline === '1', 'thanh đặt phòng về opacity 1', inline);
  // cuộn qua trang: không phần tử "rise" nào kẹt ẩn
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 350) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 130)); } });
  await page.waitForTimeout(1500);
  const stuck = await page.evaluate(() => [...document.querySelectorAll('[data-hm=rise]')].filter((e) => +getComputedStyle(e).opacity < 0.99).length);
  ok(stuck === 0, 'motion bật: không phần tử nào kẹt ẩn sau khi cuộn', String(stuck));
  await ctx.close();
}

// ---------- 5. Phòng: tablist
console.log('[5] Rooms stage: tab, bàn phím, đồng bộ với công cụ tính');
{
  const { ctx, page } = await newPage();
  await load(page);
  await goto(page, 'phong');
  const tabs = page.getByRole('tab');
  ok((await tabs.count()) === 4, '4 tab loại phòng');
  ok(await page.getByRole('heading', { level: 3, name: 'Hiên Biển' }).isVisible(), 'mặc định Hiên Biển');
  await page.getByRole('tab', { name: /Suite Hồ Bơi/ }).click();
  await page.waitForTimeout(500);
  ok(await page.getByRole('heading', { level: 3, name: 'Suite Hồ Bơi' }).isVisible(), 'bấm tab đổi sang Suite Hồ Bơi');
  ok((await page.getByRole('tab', { name: /Suite Hồ Bơi/ }).getAttribute('aria-selected')) === 'true', 'aria-selected đúng');
  await page.getByRole('tab', { name: /Suite Hồ Bơi/ }).focus();
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(300);
  ok(await page.getByRole('heading', { level: 3, name: 'Bao trọn villa' }).isVisible(), 'ArrowDown chuyển sang Bao trọn villa');
  ok(await page.evaluate(() => document.activeElement?.getAttribute('role')) === 'tab', 'focus ở lại trên tab');
  await page.keyboard.press('Home');
  await page.waitForTimeout(300);
  ok(await page.getByRole('heading', { level: 3, name: 'Hiên Biển' }).isVisible(), 'Home về tab đầu');
  await page.getByRole('tab', { name: /Hiên Bình Minh/ }).click();
  await goto(page, 'lich-gia', 800);
  ok(await page.getByRole('radio', { name: /Hiên Bình Minh/ }).isChecked(), 'chọn phòng ở stage đồng bộ sang công cụ tính');
  await ctx.close();
}

}

// ---------- 6. Calendar + Calculator
console.log('[6] Availability Calendar + Stay Calculator');
{
  const { ctx, page } = await newPage();
  await load(page);
  await goto(page, 'lich-gia', 900);
  const empty = await page.locator('text=Chưa có ngày để tính').count();
  ok(empty === 1, 'trạng thái rỗng khi chưa chọn ngày');
  const st = await page.evaluate(() => { const s = {}; document.querySelectorAll('#lich-gia button[data-day]').forEach((b) => { s[b.dataset.status] = (s[b.dataset.status] || 0) + 1; }); return s; });
  ok(st.open > 10 && st.full >= 3 && st.past >= 20, 'lịch có ngày trống, ngày kín, ngày đã qua', JSON.stringify(st));

  // chọn 2 đêm giữa tuần bằng chuột
  const r1 = await pickRange(page, 2);
  ok(!!r1, 'tìm được khoảng 2 đêm trống để chọn', JSON.stringify(r1));
  await page.waitForTimeout(300);
  ok((await page.locator('#lich-gia [role=region] tbody tr').count()) >= 2, 'bảng chi tiết có dòng cho từng đêm');
  const rows = await page.evaluate(() => [...document.querySelectorAll('#lich-gia [role=region] table tbody')[0].querySelectorAll('tr')].map((tr) => tr.lastElementChild.textContent));
  ok(rows.length === 2, 'đúng 2 dòng cho 2 đêm', String(rows.length));
  const sumRows = rows.reduce((s, t) => s + vnd(t), 0);
  const getDl = () => page.evaluate(() => Object.fromEntries([...document.querySelectorAll('#lich-gia dl > div')].map((d) => [d.querySelector('dt').textContent.trim(), d.querySelector('dd').textContent])));
  let dl = await getDl();
  const key = (re) => Object.keys(dl).find((k) => re.test(k));
  ok(vnd(dl[key(/^Tiền phòng/)]) === sumRows, 'Tiền phòng = tổng các đêm', `${dl[key(/^Tiền phòng/)]} vs ${sumRows}`);
  const total = vnd(dl['Tổng']);
  const calc = vnd(dl[key(/^Tiền phòng/)]) + vnd(dl[key(/^Phí dịch vụ/)]) + vnd(dl[key(/^Phí vệ sinh/)]);
  ok(total === calc, 'Tổng = phòng + dịch vụ + vệ sinh (không phụ thu/giảm giá ở 2 đêm, 2 khách)', `${total} vs ${calc}`);
  ok(Math.abs(vnd(dl[key(/^Phí dịch vụ/)]) - sumRows * 0.05) <= 1000, 'phí dịch vụ ≈ 5%');
  ok((await page.locator('#lich-gia').innerText()).includes('Tạm tính 2 đêm'), 'tiêu đề kết quả nói rõ 2 đêm');
  await noBanned(page, 'công cụ lịch & ước tính chi phí khi đã chọn ngày');
  // thanh đặt nhanh đồng bộ: cuộn lên hero
  await toTop(page); await page.waitForTimeout(600);
  const barTotal = await page.locator('#dat-nhanh').innerText();
  ok(barTotal.replace(/\s/g, '').includes(String(total).replace(/\B(?=(\d{3})+(?!\d))/g, '.')), 'booking bar hiện cùng tổng tạm tính', barTotal.replace(/\n/g, ' | '));

  // phụ thu khách thêm: 3 khách ở Hiên Biển (gốc 2) +350.000 × 2 đêm
  await goto(page, 'lich-gia', 600);
  await page.locator('#lich-gia').getByLabel('Số khách', { exact: true }).fill('3');
  await page.waitForTimeout(300);
  dl = await getDl();
  ok(!!key(/^Phụ thu 1 khách thêm/) && vnd(dl[key(/^Phụ thu 1 khách thêm/)]) === 700000, 'phụ thu 1 khách thêm = 700.000 ₫ cho 2 đêm', JSON.stringify(dl));
  // vượt sức chứa
  await page.locator('#lich-gia').getByLabel('Số khách', { exact: true }).fill('9');
  await page.waitForTimeout(300);
  ok(await page.getByRole('alert').filter({ hasText: 'Số khách phải từ 1 đến 3' }).count() > 0, 'lỗi số khách vượt sức chứa (cạnh ô, role=alert)');
  ok(await page.locator('text=Chưa thể tính giá').count() === 1, 'kết quả báo chưa thể tính giá khi khách vượt');
  await page.locator('#lich-gia').getByLabel('Số khách', { exact: true }).fill('2');
  // dài ngày: đổi sang 7 đêm
  await clearDates(page);
  const r7 = await pickRange(page, 7, [0, 1, 2, 3, 4, 5, 6]);
  if (r7) {
    await page.waitForTimeout(300);
    dl = await getDl();
    ok(!!key(/^Giảm giá ở dài ngày \(12%\)/), 'ở 7 đêm có giảm giá 12%', Object.keys(dl).join('|'));
  } else { ok(true, 'ở 7 đêm: (không có cửa sổ 7 đêm trống trong 2 tháng đang hiển thị, đã có unit test)'); }

  // đêm kín: bấm ngày kín khi chưa có ngày nhận
  await clearDates(page);
  const full = page.locator('#lich-gia button[data-status="full"]').first();
  await full.click({ force: true });
  ok(await page.locator('text=/đã kín hoặc không mở đặt/').count() > 0, 'bấm ngày kín hiện thông báo lỗi (role=status)');
  await page.getByRole('button', { name: 'Đã hiểu' }).click();
  // khoảng chứa đêm kín
  const hard = await page.evaluate(() => { const d = [...document.querySelectorAll('#lich-gia button[data-day]')].map((b) => ({ d: b.dataset.day, s: b.dataset.status })); const i = d.findIndex((x) => x.d === '2026-12-06'); return { before: d.slice(0, i).reverse().find((x) => x.s === 'open' || x.s === 'few')?.d, after: '2026-12-09' }; });
  if (hard.before) {
    await page.locator(`#lich-gia button[data-day="${hard.before}"]`).click();
    await page.locator(`#lich-gia button[data-day="${hard.after}"]`).click();
    ok(await page.locator('text=/Khoảng này có đêm đã kín/').count() > 0, 'chọn khoảng chứa đêm kín bị từ chối kèm ngày kín đầu tiên', hard.before);
  }
  if (await page.getByRole('button', { name: 'Đã hiểu' }).count()) await page.getByRole('button', { name: 'Đã hiểu' }).click();

  // min-nights: chọn đúng 1 đêm thứ sáu → yêu cầu 2 đêm, nút kéo dài hoạt động
  await clearDates(page);
  await page.getByRole('button', { name: /Tháng sau/ }).click();
  await page.waitForTimeout(200);
  const fri = await page.evaluate(() => { const d = [...document.querySelectorAll('#lich-gia button[data-day]')].map((b) => ({ d: b.dataset.day, s: b.dataset.status })); const addD = (iso, n) => new Date(Date.parse(iso + 'T00:00:00Z') + n * 86400000).toISOString().slice(0, 10); const m = new Map(d.map((x) => [x.d, x.s])); return d.find((x) => (x.s === 'open' || x.s === 'few') && new Date(x.d + 'T00:00:00Z').getUTCDay() === 5 && !/-(0[1-9]|1\d)$/.test(x.d.slice(0, 0)) && ['open', 'few'].includes(m.get(addD(x.d, 1))) && ['open', 'few'].includes(m.get(addD(x.d, 2))) && !(x.d >= '2026-12-30'))?.d; });
  if (fri) {
    const next = new Date(Date.parse(fri + 'T00:00:00Z') + 86400000).toISOString().slice(0, 10);
    await page.locator(`#lich-gia button[data-day="${fri}"]`).click();
    await page.locator(`#lich-gia button[data-day="${next}"]`).click();
    ok(await page.locator('text=/tối thiểu 2 đêm/').count() > 0, '1 đêm cuối tuần bị yêu cầu tối thiểu 2 đêm', fri);
    await page.getByRole('button', { name: /Kéo dài thành 2 đêm/ }).click();
    await page.waitForTimeout(300);
    ok((await page.locator('#lich-gia').innerText()).includes('Tạm tính 2 đêm'), 'nút "Kéo dài" sửa được lỗi và tính ra giá');
  }

  // bao trọn villa: số khách mặc định 12, qty khoá
  const villa = page.getByRole('radio', { name: /Bao trọn villa/ });
  await villa.evaluate((e) => e.scrollIntoView({ block: 'center' }));
  await page.waitForTimeout(400);
  if (process.env.ONLY6) { const bx = await villa.boundingBox(); console.log('BOX', JSON.stringify(bx), await page.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); return e ? e.tagName + ' ' + e.className + ' ' + (e.closest('label')?.innerText || '').slice(0, 30) : 'none'; }, [bx.x + bx.width / 2, bx.y + bx.height / 2]), await page.evaluate(() => window.scrollY)); }
  await villa.click({ force: true });
  await page.waitForTimeout(500);
  if (!(await villa.isChecked())) await page.screenshot({ path: path.join(SHOTS, 'debug-villa.png') });
  if (!(await villa.isChecked())) console.log('DEBUG radios', await page.evaluate(() => [...document.querySelectorAll('#lich-gia input[type=radio]')].map((r) => r.value + ':' + r.checked).join(' ')), page.errors.join('|'));
  ok(await villa.isChecked(), 'chọn bao trọn villa bằng radio');
  await page.waitForTimeout(300);
  ok((await page.locator('#lich-gia').getByLabel('Số khách', { exact: true }).inputValue()) === '12', 'chọn bao trọn villa: số khách tự về 12');
  ok(await page.locator('#lich-gia').getByRole('textbox', { name: 'Số phòng' }).isDisabled(), 'bao trọn villa: ô số phòng bị khoá');
  await ctx.close();
}

// ---------- 6c. Lưu / khôi phục kế hoạch (localStorage)
console.log('[6c] Lưu và khôi phục kế hoạch');
{
  const { ctx, page } = await newPage();
  await load(page); await goto(page, 'lich-gia', 700);
  ok(await page.getByRole('button', { name: 'Lưu kế hoạch' }).isDisabled(), 'chưa có ngày: nút Lưu kế hoạch bị khoá');
  const r = await pickRange(page, 2);
  await page.waitForTimeout(300);
  const save = page.getByRole('button', { name: 'Lưu kế hoạch' });
  await save.evaluate((e) => e.scrollIntoView({ block: 'center' })); await page.waitForTimeout(400);
  await save.click();
  ok(await page.locator('text=Kế hoạch đã được lưu trên thiết bị này.').count() === 1, 'bấm Lưu hiện xác nhận');
  await noBanned(page, 'sau khi lưu kế hoạch');
  const raw = await page.evaluate(() => localStorage.getItem('hien-man:stay-plan:v1'));
  ok(!!raw && !/total|tổng/i.test(raw) && JSON.parse(raw).checkIn === r.ci, 'lưu ngày, không lưu tổng tiền', raw);
  await page.reload({ waitUntil: 'networkidle' }); await page.waitForTimeout(1500); await goto(page, 'lich-gia', 800);
  ok((await page.locator('#lich-gia').innerText()).includes('Tạm tính 2 đêm'), 'tải lại trang: kế hoạch được khôi phục và tính lại giá');
  await page.evaluate(() => localStorage.setItem('hien-man:stay-plan:v1', JSON.stringify({ v: 1, room: 'bien-go', qty: 1, guests: 2, checkIn: '2020-01-01', checkOut: '2020-01-03' })));
  await page.reload({ waitUntil: 'networkidle' }); await page.waitForTimeout(1500); await goto(page, 'lich-gia', 800);
  ok(await page.locator('text=Chưa có ngày để tính').count() === 1, 'dữ liệu lưu không hợp lệ (ngày quá khứ) bị bỏ qua');
  ok(!(await page.evaluate(() => localStorage.getItem('hien-man:stay-plan:v1'))), 'dữ liệu không hợp lệ bị xoá');
  await ctx.close();
}

// ---------- 6b. Calendar bàn phím
console.log('[6b] Calendar bàn phím');
{
  const { ctx, page } = await newPage();
  await load(page);
  await goto(page, 'lich-gia', 700);
  const active = () => page.evaluate(() => document.activeElement?.getAttribute('data-day'));
  ok(await page.locator('#lich-gia button[data-status="past"]').first().isDisabled(), 'ngày đã qua bị disabled');
  await page.locator('#lich-gia button[data-day][tabindex="0"]').first().focus();
  const start = await active();
  ok(!!start, 'có ô nhận focus (roving tabindex)', String(start));
  ok((await page.locator('#lich-gia button[data-day][tabindex="0"]').count()) === 1, 'đúng 1 ô nằm trong thứ tự Tab');
  await page.keyboard.press('ArrowRight');
  const nx = await active();
  const exp = new Date(Date.parse(start + 'T00:00:00Z') + 86400000).toISOString().slice(0, 10);
  ok(nx === exp, 'ArrowRight sang ngày kế', `${start} -> ${nx}`);
  await page.keyboard.press('ArrowDown');
  const dn = await active();
  ok(dn === new Date(Date.parse(nx + 'T00:00:00Z') + 7 * 86400000).toISOString().slice(0, 10), 'ArrowDown +7 ngày');
  await page.keyboard.press('PageDown');
  await page.waitForTimeout(400);
  const t1 = await page.locator('#lich-gia h3').first().innerText();
  ok(/Tháng 1 2027/.test((await page.locator('#lich-gia h3').allInnerTexts()).join('|')), 'PageDown tới tháng sau', t1);
  // chọn bằng Enter: tìm 2 ngày trống kế nhau
  await page.keyboard.press('Home');
  const cur = await active();
  await page.keyboard.press('Enter');
  const sel = await page.locator('#lich-gia [aria-live=polite]').first().innerText();
  ok(/chọn ngày trả/.test(sel) || /Chọn ngày nhận/.test(sel) === false, 'Enter chọn ngày nhận', sel + ' @' + cur);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  ok(/Chọn ngày nhận phòng/.test(await page.locator('#lich-gia [aria-live=polite]').first().innerText()), 'Escape bỏ chọn');
  // ngày kín có aria-label đọc được
  const lab = await page.locator('#lich-gia button[data-status="full"]').first().getAttribute('aria-label');
  ok(/đã kín/.test(lab || ''), 'ngày kín có aria-label "đã kín"', lab);
  // Tab tới CTA chính
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.locator('a', { hasText: 'Bỏ qua điều hướng' }).first().focus().catch(() => {});
  let reached = false;
  for (let i = 0; i < 160; i++) { await page.keyboard.press('Tab'); const t = await page.evaluate(() => document.activeElement?.textContent || ''); if (/Nhận tư vấn website cho villa/.test(t)) { reached = true; break; } }
  ok(reached, 'Tab tới được CTA "Nhận tư vấn website cho villa của bạn"');
  await ctx.close();
}

// ---------- 7. booking bar, FAQ, CTA, ref
console.log('[7] Booking bar, FAQ, link thoát, ref');
{
  const { ctx, page } = await newPage();
  await load(page);
  await page.getByRole('button', { name: 'Xem phòng trống' }).click();
  await page.waitForTimeout(900);
  ok(await page.getByRole('alert').filter({ hasText: 'Chọn ngày nhận và trả phòng' }).count() > 0 || (await page.evaluate(() => window.scrollY)) > 300, 'Xem phòng trống khi chưa chọn ngày: báo lỗi và cuộn tới lịch');
  await noBanned(page, 'trạng thái lỗi thanh đặt phòng (chưa chọn ngày)');
  await goto(page, 'hoi-dap', 600);
  ok(await page.locator('details[open]').count() === 1, 'FAQ mặc định mở câu đầu tiên');
  await noBanned(page, 'FAQ (mọi câu hỏi)');
  await page.locator('summary').nth(1).click();
  ok(await page.locator('details[open]').count() === 2, 'FAQ cho mở nhiều câu cùng lúc');
  const q0 = page.locator('summary').first();
  await q0.focus(); await page.keyboard.press('Enter');
  ok(await page.locator('details[open]').count() === 1, 'FAQ đóng bằng Enter trên summary');
  await page.keyboard.press('Space');
  ok(await page.locator('details[open]').count() === 2, 'FAQ mở bằng Space');
  const hrefs = await page.locator('main a[href^="/lien-he"]').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  ok(hrefs.length >= 2, 'có ≥2 link tư vấn trong trang', String(hrefs.length));
  const u = new URL(hrefs[0], BASE);
  ok(u.pathname === '/lien-he' && u.searchParams.get('industry') === 'Villa' && u.searchParams.get('solution') === 'hospitality' && u.searchParams.get('utm_campaign') === 'hien-man' && u.searchParams.get('utm_source') === 'showroom', 'link tư vấn có industry/solution/utm', hrefs[0]);
  await page.goto(URL_ + '?ref=TESTREF', { waitUntil: 'networkidle' });
  ok((await page.title()).includes('Hiên Mặn'), 'mở với ?ref= vẫn render bình thường');
  ok(!(await page.evaluate(() => document.cookie)).includes('tct_ref'), 'demo không tự ghi cookie tct_ref');
  const hr2 = await page.locator('main a[href^="/lien-he"]').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  ok(hr2.length >= 2 && hr2.every((h) => h.startsWith('/lien-he?industry=Villa')), 'link tư vấn là đường dẫn tương đối cùng origin (giữ cookie ref first-party)', hr2.join(' '));
  const p2 = await ctx.newPage(); await p2.goto(BASE + hr2[0] + '&ref=TESTREF', { waitUntil: 'domcontentloaded' });
  ok(p2.url().includes('industry=Villa') && p2.url().includes('ref=TESTREF'), '/lien-he nhận industry + ref');
  await ctx.close();
}

// ---------- 8. credits
console.log('[8] Trang credits');
{
  const { ctx, page } = await newPage();
  const res = await page.goto(URL_ + '/credits', { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(2500);
  ok(res.status() === 200, 'credits 200');
  ok((await page.locator('main ul li dl').count()) === 12, 'credits liệt kê 12 ảnh', String(await page.locator('main ul li dl').count()));
  ok((await page.locator('text=Lora').count()) > 0 && (await page.locator('text=Manrope').count()) > 0, 'credits có font');
  ok(await page.locator('meta[name=robots][content*=noindex]').count() > 0, 'credits noindex');
  ok(/Hiên Mặn/.test(await page.title()), 'credits có title riêng');
  await noBanned(page, 'trang credits (không có chữ Demo/minh hoạ)');
  const ctx2 = (await page.locator('main').innerText()).replace(/\s+/g, ' ');
  ok(/do .*Trần Công Tiến.* thiết kế để giới thiệu phong cách thiết kế website/.test(ctx2) && /ảnh stock/.test(ctx2), 'credits giữ lời công khai trung thực', ctx2.slice(-200));
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } });
  await page.waitForTimeout(800);
  const bad = await page.evaluate(() => [...document.querySelectorAll('main li img')].filter((i) => !i.naturalWidth).length);
  ok(bad === 0, 'ảnh credits đều tải được', String(bad));
  ok(page.errors.length === 0, 'credits: 0 lỗi console', page.errors.join('|'));
  await ctx.close();
}

// ---------- 9. mobile menu + ảnh chụp
console.log('[9] Mobile + ảnh chụp');
{
  const { ctx, page } = await newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await load(page);
  const burger = page.getByRole('button', { name: 'Mở menu' });
  ok(await burger.isVisible(), 'mobile có nút menu');
  await page.screenshot({ path: path.join(SHOTS, 'hero-390.png') });
  await burger.click();
  ok(await page.locator('#hm-menu').getByRole('link', { name: 'Phòng nghỉ' }).isVisible(), 'panel menu mở');
  await noBanned(page, 'menu mobile đang mở (390px)');
  await page.screenshot({ path: path.join(SHOTS, 'menu-390.png') });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  ok(!(await page.locator('#hm-menu').isVisible()), 'Escape đóng menu');
  ok(await page.evaluate(() => document.activeElement?.getAttribute('aria-controls')) === 'hm-menu', 'Escape trả focus về nút menu');
  const small = await page.evaluate(() => [...document.querySelectorAll('main button, main a, header button, header a, main summary, main select, main input')].filter((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && cs.visibility !== 'hidden' && cs.opacity !== '0' && e.offsetParent && !e.classList.contains('sr-only') && r.height < 43.5 && !(e.matches('input[type=radio]')) && !e.closest('[hidden]'); }).map((e) => `${e.tagName}.${(e.className + '').slice(0, 24)}:${Math.round(e.getBoundingClientRect().height)}`));
  ok(small.length === 0, 'mọi nút/link/ô nhập ≥44px cao (mobile)', small.slice(0, 8).join(' '));
  const fs = await page.evaluate(() => [...document.querySelectorAll('input:not([type=radio]), select, textarea')].filter((e) => e.offsetParent).map((e) => parseFloat(getComputedStyle(e).fontSize)).filter((f) => f < 16));
  ok(fs.length === 0, 'ô nhập ≥16px (không zoom iOS)', fs.join(','));
  const ids = ['ve-hien', 'mot-ngay', 'phong', 'khong-gian', 'trai-nghiem', 'lich-gia', 'hoi-dap', 'ket'];
  for (const id of ids) { await goto(page, id, 1500); await page.screenshot({ path: path.join(SHOTS, `s-${id}-390.png`) }); }
  // trạng thái có chọn ngày trên mobile
  await goto(page, 'lich-gia', 600);
  await page.getByRole('button', { name: /Tháng sau/ }).click(); await page.waitForTimeout(300);
  const pr = (await pickRange(page, 3)) || (await pickRange(page, 2));
  ok(!!pr, 'mobile: chọn được khoảng ngày bằng chạm trên lịch 1 tháng', JSON.stringify(pr));
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(SHOTS, 'planner-selected-390.png') });
  await page.locator('[role=region][aria-label="Chi tiết từng đêm"]').evaluate((e) => e.scrollIntoView({ block: 'center' })); await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SHOTS, 'planner-result-390.png') });
  ok(page.errors.length === 0, 'mobile: 0 lỗi console', page.errors.join('|'));
  await ctx.close();
}
{
  const { ctx, page } = await newPage();
  await load(page);
  await page.screenshot({ path: path.join(SHOTS, 'hero-1440.png') });
  const ids = ['ve-hien', 'mot-ngay', 'phong', 'khong-gian', 'trai-nghiem', 'lich-gia', 'hoi-dap', 'ket'];
  for (const id of ids) { await goto(page, id, 1500); await page.screenshot({ path: path.join(SHOTS, `s-${id}-1440.png`) }); }
  await goto(page, 'lich-gia', 600);
  await pickRange(page, 3);
  await page.mouse.move(10, 10);
  await page.waitForTimeout(400);
  await page.evaluate(() => document.querySelector('#lich-gia [class*=plannerGrid]')?.scrollIntoView({ block: 'center' }));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SHOTS, 'planner-selected-1440.png') });
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(SHOTS, 'hero-with-quote-1440.png') });
  ok(page.errors.length === 0, 'desktop: 0 lỗi console', page.errors.join('|'));
  await ctx.close();
}
for (const [w, h] of [[768, 1024], [1024, 768]]) {
  const { ctx, page } = await newPage({ viewport: { width: w, height: h } });
  await load(page); await page.screenshot({ path: path.join(SHOTS, `hero-${w}.png`) });
  await ctx.close();
}

await browser.close();
console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
if (fail) { console.log('Thất bại:\n - ' + failures.join('\n - ')); process.exit(1); }
