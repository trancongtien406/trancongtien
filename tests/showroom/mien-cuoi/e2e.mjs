// E2E Miền Cười (LP-06). Chạy: BASE=http://localhost:3100 node tests/showroom/mien-cuoi/e2e.mjs
import { chromium } from '/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = process.env.BASE || 'http://localhost:3100';
const URL_ = `${BASE}/demos/mien-cuoi`;
const SHOTS = path.join(path.dirname(fileURLToPath(import.meta.url)), 'screenshots');
let pass = 0, fail = 0;
const failures = [];
function ok(cond, name, extra = '') {
  if (cond) { pass++; console.log('  PASS', name); } else { fail++; failures.push(name + ' ' + extra); console.log('  FAIL', name, extra); }
}
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });

// ---- Chính sách nhãn mới (AGENT-RULES mục 11): trang không được chứa chữ demo/minh hoạ/giả định/mô phỏng...
const BANNED = /(?<![\/\w-])demo(?!s\b)|minh ho[aạ]|giả định|giả lập|mô phỏng|dữ liệu mẫu|không phải doanh nghiệp|thương hiệu minh|trình diễn|design demonstration/iu;
const BANNED_CREDITS = /(?<![\/\w-])demo(?!s\b)/iu;
async function expectClean(page, label, re = BANNED) {
  const texts = await page.evaluate(() => {
    const out = [document.title, document.body.innerText];
    document.querySelectorAll('meta[name=description],meta[property^="og:"],meta[name^="twitter:"]').forEach((m) => out.push(m.content || ''));
    document.querySelectorAll('[aria-label],[alt],[title],[placeholder],[aria-description]').forEach((e) => { for (const a of ['aria-label', 'alt', 'title', 'placeholder', 'aria-description']) { const v = e.getAttribute(a); if (v) out.push(v); } });
    return out;
  });
  const hits = [];
  for (const t of texts) { const m = t.normalize('NFC').match(re); if (m) { const i = t.normalize('NFC').indexOf(m[0]); hits.push(JSON.stringify(t.normalize('NFC').slice(Math.max(0, i - 25), i + 40))); } }
  ok(hits.length === 0, 'không có nhãn cấm: ' + label, hits.slice(0, 3).join(' | '));
}

async function newPage(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  const page = await ctx.newPage();
  page.errors = []; page.external = [];
  page.on('console', (m) => { if (m.type() === 'error' && !/webpack-hmr|WebSocket|Failed to load resource|MIME type|_clientMiddlewareManifest/.test(m.text())) page.errors.push(m.text()); });
  page.on('pageerror', (e) => page.errors.push('pageerror: ' + e.message));
  page.on('request', (r) => { const u = new URL(r.url()); if (!['http:', 'https:'].includes(u.protocol)) return; if (u.origin !== new URL(BASE).origin) page.external.push(r.url()); });
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

// ---------- 1
console.log('[1] Tải trang, console, request ngoài origin, metadata');
{
  const { ctx, page } = await newPage();
  const res = await page.goto(URL_, { waitUntil: 'networkidle' });
  ok(res.status() === 200, 'HTTP 200', String(res.status()));
  await page.waitForTimeout(2000);
  ok(page.errors.length === 0, '0 lỗi console', page.errors.join(' | '));
  await expectClean(page, 'trang chủ sau khi tải');
  ok(page.external.length === 0, 'không request ra ngoài origin', page.external.join(' | '));
  ok(/Miền Cười/.test(await page.title()), 'title riêng', await page.title());
  ok(await page.locator('meta[name=robots][content*=noindex]').count() > 0, 'robots noindex');
  ok(await page.locator('link[rel=icon][href*="mien-cuoi/identity/favicon"]').count() > 0, 'favicon theo route');
  ok(await page.locator('meta[property="og:image"][content*="mien-cuoi/identity/og-image"]').count() > 0, 'og-image');
  ok(await page.locator('h1').count() === 1, 'đúng 1 h1');
  ok(await page.locator('#services li').count() >= 6, '6 dịch vụ');
  ok(await page.locator('#faq details').count() === 8, '8 câu FAQ');
  const imgs = await page.evaluate(() => [...document.images].map((i) => i.currentSrc || i.src));
  ok(imgs.length >= 10 && new Set(imgs.map((s) => decodeURIComponent(s).match(/mien-cuoi\/([a-z0-9-]+)-\d+\.webp/)?.[1]).filter(Boolean)).size === imgs.filter((s) => /webp/.test(decodeURIComponent(s))).length, 'ảnh không lặp trên trang', String(imgs.length));
  const txt = await page.evaluate(() => document.body.innerText);
  ok(!/đảm bảo|100%|cam kết kết quả|không đau|số 1|hàng đầu/i.test(txt.replace(/Cấm.*/g, '')), 'không có từ cam kết/tuyệt đối');
  ok(/Giá tham khảo|giá tham khảo|Bảng giá tham khảo/.test(txt) && /không thay thế/.test(txt), 'có giá tham khảo + không thay thế tư vấn');
  ok(await page.locator('[data-mc-root] a[href^="/lien-he"]').count() >= 3, 'có ≥3 link tư vấn');
  await ctx.close();
}
{
  const { ctx, page } = await newPage();
  const res = await page.goto(URL_ + '/credits', { waitUntil: 'networkidle' });
  ok(res.status() === 200, 'credits 200');
  ok(await page.locator('li:has(dl)').count() === 12, 'credits liệt kê 12 ảnh');
  ok(await page.locator('meta[name=robots][content*=noindex]').count() > 0, 'credits noindex');
  await expectClean(page, 'trang credits', BANNED_CREDITS);
  ok(page.errors.length === 0, 'credits 0 lỗi console', page.errors.join('|'));
  await ctx.close();
}

// ---------- 2
console.log('[2] Không tràn ngang 320/390/768/1024/1440');
for (const w of [320, 390, 768, 1024, 1440]) {
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
  ok(r.faces.some((f) => /jakarta/i.test(f)) && r.faces.some((f) => /public/i.test(f)), 'face Plus Jakarta Sans + Public Sans loaded', r.faces.join(','));
  ok(!/^(Arial|Impact|system)/i.test(r.dispStack), 'stack heading bắt đầu bằng font riêng');
  ok(r.empty.length === 0, 'Plus Jakarta có glyph ă â ê ô ơ ư đ + Ắ…Ự', r.empty.join(''));
  ok(r.emptyBody.length === 0, 'Public Sans có glyph tiếng Việt', r.emptyBody.join(''));
  ok(r.stacked.every(Boolean), 'Plus Jakarta vẽ đủ dấu chồng', JSON.stringify(r.stacked));
  ok(r.stackedBody.every(Boolean), 'Public Sans vẽ đủ dấu chồng', JSON.stringify(r.stackedBody));
  await ctx.close();
}

// ---------- 4
console.log('[4] prefers-reduced-motion: nội dung hiện đủ');
{
  const { ctx, page } = await newPage({ reducedMotion: 'reduce' });
  await load(page); await slowScroll(page);
  const r = await page.evaluate(() => {
    const op = (s) => [...document.querySelectorAll(s)].map((e) => +getComputedStyle(e).opacity);
    return { hero: op('[data-mc]'), reveal: op('[data-mc-reveal]'), cover: getComputedStyle(document.querySelector('[data-mc=cover]')).transform, h1t: getComputedStyle(document.querySelector('[data-mc=h1a]')).transform };
  });
  ok(r.hero.length > 8 && r.hero.every((o) => o === 1), 'hero + khối [data-mc] hiện đủ', JSON.stringify(r.hero));
  ok(r.reveal.length > 5 && r.reveal.every((o) => o === 1), 'khối reveal hiện đủ');
  ok(r.h1t === 'none', 'H1 không bị dịch');
  const cover = await page.evaluate(() => { const m = new DOMMatrix(getComputedStyle(document.querySelector('[data-mc=cover]')).transform); return m.a; });
  ok(cover === 0, 'tấm phủ ảnh hero không che (scaleX 0)', String(cover));
  await ctx.close();
}
{
  const { ctx, page } = await newPage();
  await load(page); await slowScroll(page);
  const r = await page.evaluate(() => [...document.querySelectorAll('[data-mc-reveal],[data-mc=h1a],[data-mc=h1b],[data-mc=cta],[data-mc=desc],[data-mc=nav-panel],[data-mc=sched-form],[data-mc=sched-preview],[role=radio]')].filter((e) => +getComputedStyle(e).opacity < 0.99).length);
  ok(r === 0, 'motion bật: không phần tử nào kẹt ẩn sau khi cuộn', String(r));
  const hero = await page.evaluate(() => { const m = new DOMMatrix(getComputedStyle(document.querySelector('[data-mc=cover]')).transform); return m.a; });
  ok(hero === 0, 'motion bật: tấm phủ ảnh hero đã mở', String(hero));
  await ctx.close();
}

// ---------- 5 Care Navigator
console.log('[5] Care Navigator');
{
  const { ctx, page } = await newPage();
  await load(page);
  const nav = page.locator('#care-navigator');
  await nav.scrollIntoViewIfNeeded(); await page.waitForTimeout(1500);
  const cont = nav.getByRole('button', { name: 'Tiếp tục' });
  ok(await cont.isDisabled(), 'chưa chọn nhu cầu: Tiếp tục disabled');
  ok(await nav.getByText(/khó thở, khó nuốt, chảy máu nhiều/).first().isVisible(), 'cảnh báo an toàn hiện trước câu hỏi đầu');
  ok(await nav.getByText(/chỉ mang tính định hướng/).first().isVisible(), 'disclaimer định hướng hiện');
  // bàn phím radio
  await nav.getByRole('radio', { name: 'Khám định kỳ' }).click();
  await page.keyboard.press('ArrowRight');
  ok(await nav.getByRole('radio', { name: 'Tôi chưa biết nên chọn gì' }).getAttribute('aria-checked') === 'true', 'phím mũi tên đổi lựa chọn radio');
  await page.keyboard.press('ArrowLeft');
  // luồng planned
  await cont.click();
  ok(await nav.getByRole('heading', { name: /dấu hiệu nào/ }).isVisible(), 'sang bước 2');
  ok(await page.evaluate(() => document.activeElement?.tagName === 'H3'), 'focus vào heading bước mới');
  const see = nav.getByRole('button', { name: 'Xem định hướng' });
  ok(await see.isDisabled(), 'chưa chọn dấu hiệu: Xem định hướng disabled');
  await nav.getByLabel('Không có dấu hiệu nào kể trên').check();
  await nav.getByLabel('Sốt kèm vấn đề răng miệng').check();
  ok(!(await nav.getByLabel('Không có dấu hiệu nào kể trên').isChecked()), 'chọn dấu hiệu cụ thể bỏ "none"');
  await nav.getByLabel('Không có dấu hiệu nào kể trên').check();
  ok(!(await nav.getByLabel('Sốt kèm vấn đề răng miệng').isChecked()), 'chọn "none" xoá các dấu hiệu khác');
  await see.click();
  ok(await nav.locator('[data-outcome=planned]').isVisible(), 'checkup + none = planned');
  ok(await nav.getByRole('link', { name: 'Xem lịch hẹn' }).count() === 1, 'planned có CTA Scheduler');
  await expectClean(page, 'navigator: planned');
  await page.screenshot({ path: path.join(SHOTS, 'navigator-planned-1440.png') });
  // CTA prefill scheduler
  await nav.getByRole('link', { name: 'Xem lịch hẹn' }).click();
  await page.waitForTimeout(600);
  ok(await page.locator('#mc-service').inputValue() === 'checkup', 'CTA điền sẵn dịch vụ khám tổng quát vào Scheduler');
  // đặt lại
  await nav.getByRole('button', { name: 'Đặt lại' }).click();
  ok(await nav.getByRole('radio').first().getAttribute('aria-checked') === 'false', 'Đặt lại xoá state');
  // pain + none => assessment, không CTA
  await nav.getByRole('radio', { name: 'Đau hoặc ê buốt răng' }).click();
  await cont.click(); await nav.getByLabel('Không có dấu hiệu nào kể trên').check(); await nav.getByRole('button', { name: 'Xem định hướng' }).click();
  ok(await nav.locator('[data-outcome=assessment]').isVisible(), 'đau + none = assessment (ưu tiên gặp bác sĩ)');
  ok(await nav.getByRole('link', { name: 'Xem lịch hẹn' }).count() === 0, 'assessment không có CTA Scheduler');
  await expectClean(page, 'navigator: assessment');
  // emergency
  await nav.getByRole('button', { name: 'Quay lại' }).first().click();
  await nav.getByLabel('Khó thở hoặc khó nuốt').check();
  ok(await nav.getByRole('alert').filter({ hasText: 'Cần được hỗ trợ cấp cứu ngay' }).isVisible(), 'chọn dấu hiệu cấp cứu hiện cảnh báo ngay trong panel');
  await nav.getByRole('button', { name: 'Xem định hướng' }).click();
  ok(await nav.locator('[data-outcome=emergency]').isVisible() && /115/.test(await nav.locator('[data-outcome=emergency]').innerText()), 'emergency nêu 115');
  await expectClean(page, 'navigator: emergency');
  ok(await nav.getByRole('link', { name: 'Xem lịch hẹn' }).count() === 0, 'emergency không có CTA Scheduler');
  await page.screenshot({ path: path.join(SHOTS, 'navigator-emergency-1440.png') });
  // urgent
  await nav.getByRole('button', { name: 'Quay lại' }).first().click();
  await nav.getByLabel('Khó thở hoặc khó nuốt').uncheck(); await nav.getByLabel('Sưng vùng má hoặc nướu').check();
  await nav.getByRole('button', { name: 'Xem định hướng' }).click();
  ok(await nav.locator('[data-outcome=urgent]').isVisible(), 'sưng má = urgent');
  await expectClean(page, 'navigator: urgent');
  // unknown => assessment
  await nav.getByRole('button', { name: 'Đặt lại' }).first().click();
  await nav.getByRole('radio', { name: 'Tìm hiểu tẩy trắng' }).click(); await cont.click();
  await nav.getByLabel('Tôi không chắc').check(); await nav.getByRole('button', { name: 'Xem định hướng' }).click();
  ok(await nav.locator('[data-outcome=assessment]').isVisible(), 'tẩy trắng + không chắc = assessment');
  ok(!(await page.evaluate(() => JSON.stringify(localStorage) + JSON.stringify(sessionStorage))).includes('whitening'), 'không lưu lựa chọn sức khỏe vào storage');
  // service card preset
  await page.locator('#services').getByRole('link', { name: /Tìm hiểu hướng chăm sóc/ }).nth(2).click();
  await page.waitForTimeout(600);
  ok(await nav.getByRole('radio', { name: 'Tìm hiểu chỉnh nha' }).getAttribute('aria-checked') === 'true', 'thẻ dịch vụ chọn trước nhu cầu chỉnh nha, vẫn ở bước sàng lọc');
  ok(await nav.getByRole('heading', { name: /Điều gì đưa bạn đến đây/ }).isVisible(), 'không bỏ qua bước 1');
  ok(page.errors.length === 0, 'không lỗi console khi dùng Navigator', page.errors.join('|'));
  await ctx.close();
}

// ---------- 6 Scheduler
console.log('[6] Appointment Scheduler');
{
  const { ctx, page } = await newPage();
  await load(page);
  const sch = page.locator('#appointment');
  await sch.scrollIntoViewIfNeeded(); await page.waitForTimeout(1500);
  const prevBtn = sch.getByRole('button', { name: 'Xem trước lịch hẹn' });
  await prevBtn.click();
  ok(await sch.getByRole('alert').filter({ hasText: 'Hãy chọn một nhu cầu chăm sóc' }).isVisible(), 'trạng thái lỗi: chưa chọn dịch vụ');
  ok(await sch.getByText('Hãy chọn một nhu cầu chăm sóc để xem lịch hẹn.').first().isVisible(), 'trạng thái rỗng: chưa chọn dịch vụ');
  await sch.locator('#mc-service').selectOption('checkup');
  await prevBtn.click();
  ok(await sch.getByRole('alert').filter({ hasText: 'Hãy hoàn thành các lựa chọn' }).isVisible(), 'lỗi: chưa chọn đủ');
  await expectClean(page, 'scheduler: trạng thái lỗi/rỗng');
  const dayBtns = sch.locator('[role=group] button[data-st]');
  ok(await dayBtns.count() === 7, 'tuần hiện 7 ngày', String(await dayBtns.count()));
  // Chủ nhật phải là không làm việc; tìm trong 2 tuần
  const findDay = async (st) => {
    for (const pg of ['Tuần này', 'Tuần sau']) {
      const pb = sch.getByRole('button', { name: pg }); if (await pb.isEnabled()) await pb.click();
      const n = await dayBtns.count();
      for (let i = 0; i < n; i++) if ((await dayBtns.nth(i).getAttribute('data-st')) === st) return dayBtns.nth(i);
    }
    return null;
  };
  const off = await findDay('off');
  ok(!!off, 'có ngày "Không làm việc" (Chủ nhật)');
  await off.click();
  ok(await sch.getByText('Ngày này không có lịch khám. Hãy thử ngày khác.').isVisible(), 'ngày nghỉ: thông báo rỗng');
  await expectClean(page, 'scheduler: ngày nghỉ');
  const okDay = await findDay('ok');
  ok(!!okDay, 'có ngày còn lịch');
  await okDay.click();
  const slots = sch.locator('[aria-labelledby=mc-slot-l] button');
  const nSlots = await slots.count();
  ok(nSlots > 0, 'có khung giờ', String(nSlots));
  const times = (await slots.allInnerTexts()).map((t) => t.replace('✓ ', ''));
  const mins = times.map((t) => +t.slice(0, 2) * 60 + +t.slice(3));
  ok(mins.every((m) => (m >= 480 && m + 30 <= 690) || (m >= 810 && m + 30 <= 1020)), 'mọi slot nằm trong ca và không cắt giờ nghỉ trưa', times.join(','));
  await slots.first().click();
  ok(await slots.first().getAttribute('aria-pressed') === 'true', 'chọn slot');
  await sch.locator('#mc-service').selectOption('orthodontics');
  ok(!(await sch.locator('[aria-labelledby=mc-slot-l] button[aria-pressed=true]').count()), 'đổi dịch vụ reset slot');
  await sch.locator('#mc-service').selectOption('checkup');
  // đổi bác sĩ không tương thích
  await sch.locator('#mc-doctor').selectOption('minh-an');
  await sch.locator('#mc-service').selectOption('whitening');
  ok(await sch.locator('#mc-doctor').inputValue() === 'any', 'đổi sang dịch vụ không tương thích: bác sĩ về "bất kỳ"');
  const opts = await sch.locator('#mc-doctor option').allInnerTexts();
  ok(opts.length === 2 && /Thanh Lam/.test(opts[1]), 'danh sách bác sĩ chỉ gồm người phù hợp dịch vụ', opts.join('|'));
  // luồng đầy đủ
  await sch.locator('#mc-service').selectOption('checkup');
  const d2 = await findDay('ok'); await d2.click();
  await slots.first().click();
  await prevBtn.click();
  ok(await sch.getByRole('heading', { name: 'Tóm tắt lịch hẹn đã sẵn sàng.' }).isVisible(), 'xem trước lịch hẹn sẵn sàng');
  const pv = await sch.locator('aside').innerText();
  ok(/Khám tổng quát/.test(pv) && /BS\. Minh An/.test(pv) && /150\.000/.test(pv) && /\d\d:\d\d đến \d\d:\d\d/.test(pv) && /30\s*phút/.test(pv), 'preview có dịch vụ/bác sĩ/giờ/thời lượng/giá giả định', pv.replace(/\n/g, ' ').slice(0, 300));
  ok(/Chưa có yêu cầu đặt lịch nào được gửi đi/.test(pv) && !/thành công|mã bệnh nhân/i.test(pv), 'preview không giả vờ đặt thật');
  await expectClean(page, 'scheduler: tóm tắt lịch hẹn');
  await page.waitForTimeout(300);
  ok(await page.evaluate(() => document.activeElement?.tagName === 'H3'), 'focus chuyển vào tiêu đề preview');
  await page.screenshot({ path: path.join(SHOTS, 'scheduler-preview-1440.png') });
  await sch.getByRole('button', { name: 'Thử lịch khác' }).click();
  ok(await sch.getByRole('heading', { name: 'Lịch của bạn' }).isVisible(), 'Thử lịch khác quay lại chỉnh');
  await sch.getByRole('button', { name: 'Đặt lại', exact: true }).click();
  ok(await sch.locator('#mc-service').inputValue() === '', 'Đặt lại xoá state');
  // lưu ý triệu chứng
  await sch.locator('#mc-service').selectOption('pain');
  ok(await sch.getByText(/liên hệ cơ sở nha khoa hoặc cấp cứu ngay/).isVisible(), 'khám đau: nhắc liên hệ cơ sở/cấp cứu');
  await expectClean(page, 'scheduler: nhắc triệu chứng');
  // team prefill
  await page.locator('#team').getByRole('link', { name: /Xem lịch hẹn/ }).nth(1).click();
  await page.waitForTimeout(600);
  ok(await sch.locator('#mc-service').inputValue() === 'orthodontics' && await sch.locator('#mc-doctor').inputValue() === 'thanh-lam', 'thẻ bác sĩ điền sẵn dịch vụ + bác sĩ');
  // CTA tư vấn
  const href = await sch.getByTestId('consult-cta').getAttribute('href');
  const u = new URL(href, BASE);
  ok(u.pathname === '/lien-he' && u.searchParams.get('industry') === 'Nha khoa' && u.searchParams.get('solution') === 'clinic' && u.searchParams.get('utm_campaign') === 'mien-cuoi' && u.searchParams.get('utm_source') === 'showroom', 'CTA tư vấn có industry/solution/utm', href);
  ok(page.errors.length === 0, 'không lỗi console khi dùng Scheduler', page.errors.join('|'));
  await ctx.close();
}
// lịch dùng múi giờ HCM: giả lập thời gian
{
  const { ctx, page } = await newPage({ timezoneId: 'America/Los_Angeles' });
  await load(page);
  const r = await page.evaluate(() => { const d = [...document.querySelectorAll('#appointment [role=group] button[data-st]')][0]; return d?.getAttribute('aria-label'); });
  const hcm = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Ho_Chi_Minh', day: '2-digit', month: '2-digit' }).format(new Date());
  ok(!!r && r.includes(hcm), 'ngày đầu tiên theo giờ Asia/Ho_Chi_Minh dù trình duyệt ở múi giờ khác', `${r} vs ${hcm}`);
  await ctx.close();
}

// ---------- 7 bàn phím, link thoát, ref
console.log('[7] Bàn phím, FAQ, link thoát, ref');
{
  const { ctx, page } = await newPage();
  await load(page);
  let hit = 0;
  for (let i = 1; i <= 25; i++) { await page.keyboard.press('Tab'); const t = await page.evaluate(() => document.activeElement?.textContent?.trim() ?? ''); if (/Tìm hướng chăm sóc/.test(t)) { hit = i; break; } }
  ok(hit > 0, `Tab tới CTA "Tìm hướng chăm sóc" trong ${hit} lần`);
  const ol = await page.evaluate(() => { const s = getComputedStyle(document.activeElement); return s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2; });
  ok(ol, 'focus-visible rõ trên CTA');
  const f = page.locator('#faq summary').first();
  await f.focus(); await page.keyboard.press('Enter');
  ok(await page.locator('#faq details').first().evaluate((d) => d.open), 'FAQ mở bằng bàn phím');
  const hrefs = await page.locator('[data-mc-root] a[href^="/lien-he"]').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  ok(hrefs.every((h) => h.includes('industry=Nha+khoa') || h.includes('industry=Nha%20khoa')) , 'mọi link tư vấn đúng industry', hrefs.join(' '));
  ok(await page.locator('a[href="/demos/mien-cuoi/credits"]').count() > 0, 'có link Credits ảnh');
  const targets = await page.evaluate(() => [...document.querySelectorAll('[data-mc-root] a, [data-mc-root] button, [data-mc-root] select')].filter((e) => e.offsetParent && e.getBoundingClientRect().height > 0 && e.getBoundingClientRect().height < 44 && !e.closest('summary') && !e.closest('p') && !e.closest('li > a:only-child') ).map((e) => (e.textContent || e.id).trim().slice(0, 30) + ':' + Math.round(e.getBoundingClientRect().height)));
  ok(targets.length === 0, 'touch target ≥44px (trừ link trong đoạn văn)', targets.join(' | '));
  const small = await page.evaluate(() => [...document.querySelectorAll('select, input')].filter((e) => parseFloat(getComputedStyle(e).fontSize) < 16).length);
  ok(small === 0, 'input/select ≥16px');
  await ctx.close();
}
{
  const { ctx, page } = await newPage();
  await page.goto(URL_ + '?ref=TESTREF', { waitUntil: 'networkidle' });
  ok((await page.title()).includes('Miền Cười'), 'mở với ?ref= vẫn render');
  ok(!(await page.evaluate(() => document.cookie)).includes('tct_ref'), 'demo không tự ghi cookie tct_ref');
  const hrefs = await page.locator('[data-mc-root] a[href^="/lien-he"]').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  ok(hrefs.length >= 3 && hrefs.every((h) => h.startsWith('/lien-he?industry=')), 'link tư vấn tương đối cùng origin (giữ cookie ref first-party)');
  const p2 = await ctx.newPage(); await p2.goto(BASE + hrefs[0] + '&ref=TESTREF', { waitUntil: 'domcontentloaded' });
  ok(p2.url().includes('industry=Nha') && p2.url().includes('ref=TESTREF'), '/lien-he nhận industry + ref');
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
  await page.locator('#care-navigator').scrollIntoViewIfNeeded(); await page.screenshot({ path: path.join(SHOTS, 'navigator-390.png') });
  await page.locator('#appointment').scrollIntoViewIfNeeded(); await page.screenshot({ path: path.join(SHOTS, 'scheduler-390.png') });
  await page.goto(URL_ + '/credits', { waitUntil: 'networkidle' }); await page.screenshot({ path: path.join(SHOTS, 'credits-390.png') });
  await ctx.close();
}
{
  const { ctx, page } = await newPage();
  await load(page); await page.screenshot({ path: path.join(SHOTS, 'hero-1440.png') });
  await slowScroll(page);
  await page.screenshot({ path: path.join(SHOTS, 'full-1440.png'), fullPage: true });
  const hh = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let i = 0; i * 2400 < hh; i++) await page.screenshot({ path: path.join(SHOTS, `part-1440-${i}.png`), fullPage: true, clip: { x: 0, y: i * 2400, width: 1440, height: Math.min(2400, hh - i * 2400) } });
  await ctx.close();
}
for (const w of [768, 1024]) { const { ctx, page } = await newPage({ viewport: { width: w, height: 900 } }); await load(page); await page.screenshot({ path: path.join(SHOTS, `hero-${w}.png`) }); await ctx.close(); }

await browser.close();
console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
if (fail) { console.log('FAILURES:\n- ' + failures.join('\n- ')); process.exit(1); }
