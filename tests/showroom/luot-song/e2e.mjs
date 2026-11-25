// E2E cho /demos/luot-song. Chạy: BASE=http://localhost:3100 node tests/showroom/luot-song/e2e.mjs
import { chromium } from '/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = process.env.BASE || 'http://localhost:3100';
const URL_ = `${BASE}/demos/luot-song`;
const SHOTS = path.join(path.dirname(fileURLToPath(import.meta.url)), 'screenshots');
const exe = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; console.log('  ok  ', m); } else { fail++; console.log('  FAIL', m); } };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: exe, headless: true });

async function open(w, h, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: opts.reduced ? 'reduce' : 'no-preference', hasTouch: !!opts.touch, isMobile: !!opts.touch });
  const p = await ctx.newPage();
  const errors = [], external = [];
  p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  p.on('pageerror', (e) => errors.push(String(e)));
  p.on('request', (r) => { const u = new URL(r.url()); if (!['localhost', '127.0.0.1'].includes(u.hostname) && !r.url().startsWith('data:') && !r.url().startsWith('blob:')) external.push(r.url()); });
  await p.goto(opts.url || URL_, { waitUntil: 'networkidle', timeout: 150000 });
  await p.waitForTimeout(opts.reduced ? 1200 : 4200);
  return { ctx, p, errors, external };
}

// ---------------------------------------------------------------- 1. tải trang, console, request ngoài
console.log('1) Tải trang 1440');
let { ctx, p, errors, external } = await open(1440, 900);
ok(errors.length === 0, `0 lỗi console (${errors.slice(0, 2).join(' | ')})`);
ok(external.length === 0, `0 request ra ngoài origin (${external.slice(0, 2).join(' | ')})`);
ok((await p.title()).includes('Ráng Sóng'), 'title riêng của trang');
ok(await p.locator('meta[name=robots]').getAttribute('content').then((c) => /noindex/.test(c || '')), 'robots noindex');
ok(await p.locator('h1').count() === 1, 'đúng 1 h1');
const lang = await p.evaluate(() => document.documentElement.lang);
ok(lang === 'vi', 'html lang=vi');

// ---------------------------------------------------------------- 2. font tiếng Việt
console.log('2) Font tiếng Việt');
const fonts = await p.evaluate(async () => {
  await document.fonts.ready;
  const root = document.querySelector('[data-site="luot-song"]');
  const cs = (el) => getComputedStyle(el).fontFamily;
  const ffD = cs(document.querySelector('h1')), ffB = cs(root), ffS = cs(document.querySelector('h1 [class*="heroScript"]') || document.querySelector('h1'));
  const loaded = [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family);
  const draw = (ff, ch, size = 80) => {
    const c = document.createElement('canvas'); c.width = 140; c.height = 140; const x = c.getContext('2d');
    x.fillStyle = '#fff'; x.fillRect(0, 0, 140, 140); x.fillStyle = '#000'; x.font = `${size}px ${ff}`; x.textBaseline = 'alphabetic'; x.fillText(ch, 20, 110);
    return x.getImageData(0, 0, 140, 140).data;
  };
  const diff = (a, b) => { let n = 0; for (let i = 0; i < a.length; i += 4) if (Math.abs(a[i] - b[i]) > 40) n++; return n; };
  const chars = ['ă', 'â', 'ê', 'ô', 'ơ', 'ư', 'đ', 'Ắ', 'Ầ', 'Ẩ', 'Ẫ', 'Ậ', 'Ế', 'Ể', 'Ệ', 'Ố', 'Ổ', 'Ộ', 'Ớ', 'Ờ', 'Ở', 'Ợ', 'Ứ', 'Ử', 'Ữ', 'Ự'];
  const res = {};
  for (const [name, ff] of [['display', ffD], ['body', ffB]]) {
    let bad = [];
    for (const ch of chars) {
      const a = draw(ff, ch), b = draw('monospace', ch);
      // glyph phải khác font dự phòng và có mực
      let ink = 0; for (let i = 0; i < a.length; i += 4) if (a[i] < 100) ink++;
      if (diff(a, b) < 60 || ink < 80) bad.push(ch);
    }
    res[name] = bad;
  }
  return { loaded: loaded.length, ffD, res, checkD: document.fonts.check(`40px ${ffD}`, 'Ế'), checkB: document.fonts.check(`16px ${ffB}`, 'Ử') };
});
ok(fonts.loaded >= 3, `font đã tải: ${fonts.loaded} face`);
ok(fonts.res.display.length === 0, `glyph Việt display render thật (lỗi: ${fonts.res.display.join('')})`);
ok(fonts.res.body.length === 0, `glyph Việt body render thật (lỗi: ${fonts.res.body.join('')})`);
ok(fonts.checkD && fonts.checkB, 'document.fonts.check Ế/Ử');
await p.locator('h1').screenshot({ path: path.join(SHOTS, 'font-h1.png') });

// ---------------------------------------------------------------- 3. chữ cấm (mục 11)
console.log('3) Quét chữ cấm');
const banned = /demo|minh hoạ|minh họa|giả định|mô phỏng|dữ liệu mẫu/i;
async function scan(page, label) {
  const found = await page.evaluate(() => {
    const root = document.querySelector('[data-site="luot-song"]');
    const parts = [root.innerText];
    root.querySelectorAll('[alt],[aria-label],[title],[placeholder]').forEach((e) => { for (const a of ['alt', 'aria-label', 'title', 'placeholder']) { const v = e.getAttribute(a); if (v) parts.push(v); } });
    root.querySelectorAll('details').forEach((d) => parts.push(d.textContent));
    parts.push(document.title, document.querySelector('meta[name=description]')?.content || '', document.querySelector('meta[property="og:title"]')?.content || '', document.querySelector('meta[property="og:description"]')?.content || '');
    return parts.join('\n');
  });
  const m = found.match(banned);
  ok(!m, `không có chữ cấm: ${label}${m ? ' -> ' + m[0] : ''}`);
}
await scan(p, 'trang mặc định');

// ---------------------------------------------------------------- 4. hiệu ứng khởi chạy
console.log('4) Hiệu ứng');
const fx = await p.evaluate(() => {
  const q = (n) => [...document.querySelectorAll(`[data-fx="${n}"]`)];
  const r = {};
  for (const n of ['SplitReveal', 'VelocityMarquee', 'ScrollScrubText', 'ClipReveal', 'DraggableGallery', 'SVGPathDraw', 'GrainOverlay', 'MagneticButton', 'ParallaxLayer', 'ShineSweep', 'ScrollProgress']) r[n] = q(n).map((e) => e.getAttribute('data-fx-ready'));
  return r;
});
for (const [k, v] of Object.entries(fx)) ok(v.length > 0 && v.every((x) => x), `${k}: ${v.length} gốc, ready=${[...new Set(v)].join(',')}`);
// tuỳ chỉnh: đọc trạng thái trước/sau cuộn
const snap = () => p.evaluate(() => {
  const root = document.querySelector('[data-site="luot-song"]');
  const cs = getComputedStyle(root);
  const board = document.querySelector('[data-rs="ride"] g[transform]')?.getAttribute('transform');
  const tp = document.querySelector('[data-rs="textwave"] textPath')?.getAttribute('startOffset');
  const sunT = getComputedStyle(document.querySelector('[data-rs="sun"]')).transform;
  const stT = getComputedStyle(document.querySelector('[data-rs="sticker"] > div')).transform;
  const waveT = getComputedStyle(document.querySelector('[data-rs="waves"] > div')).transform;
  return { amp: cs.getPropertyValue('--rs-amp'), sy: cs.getPropertyValue('--rs-sy'), hp: cs.getPropertyValue('--rs-hp'), board, tp, sunT, stT, waveT };
});
await p.evaluate(() => window.scrollTo(0, 0)); await sleep(600);
const a = await snap();
await p.mouse.move(700, 400);
for (let y = 0; y <= 700; y += 50) { await p.mouse.wheel(0, 50); await sleep(30); }
await sleep(500);
const b = await snap();
ok(a.board && b.board && a.board !== b.board, 'ván lướt trượt theo đường sóng khi cuộn (transform đổi)');
ok(a.sunT !== b.sunT, 'mặt trời lên theo cuộn (transform đổi)');
ok(a.stT !== b.stT, 'tem tròn quay theo cuộn (transform đổi)');
ok(parseFloat(b.hp) > parseFloat(a.hp), `tiến độ hero tăng ${a.hp} -> ${b.hp}`);
ok(parseFloat(b.sy) >= 600, `--rs-sy theo cuộn (${b.sy})`);
const wavesSpeed = await p.evaluate(async () => {
  const el = document.querySelector('[data-rs="waves"] svg'); const t1 = getComputedStyle(el).transform; await new Promise((r) => setTimeout(r, 700)); const t2 = getComputedStyle(el).transform; return [t1, t2];
});
ok(wavesSpeed[0] !== wavesSpeed[1], 'sóng SVG chuyển động ngang liên tục');
ok(await p.locator('[data-rs="waves"] > div').count() >= 4, 'sóng nhiều lớp (>=4 lớp)');
// biên độ đáp ứng cuộn nhanh
await p.evaluate(() => window.scrollTo(0, 0)); await sleep(1200);
const amp0 = parseFloat((await snap()).amp);
let ampMax = amp0;
for (let i = 0; i < 12; i++) { await p.mouse.wheel(0, 260); await sleep(40); ampMax = Math.max(ampMax, parseFloat((await snap()).amp)); }
ok(ampMax > amp0 + 0.15, `biên độ sóng tăng khi cuộn nhanh (${amp0.toFixed(2)} -> ${ampMax.toFixed(2)})`);
// textPath chạy theo cuộn
await p.locator('[data-rs="textwave"]').scrollIntoViewIfNeeded(); await sleep(300);
const t1 = (await snap()).tp; await p.mouse.wheel(0, 300); await sleep(900); const t2 = (await snap()).tp;
ok(t1 !== t2, `chữ cong textPath chạy theo cuộn (${t1} -> ${t2})`);
// marquee velocity thật sự chuyển động (cuộn tới băng chữ trước)
await p.mouse.move(3, 3); await p.locator('[class*="bands"]').scrollIntoViewIfNeeded(); await sleep(900);
const mq = await p.evaluate(async () => { const t = document.querySelector('[data-fx="VelocityMarquee"] [data-fx-track]'); const a = t.style.transform; await new Promise((r) => setTimeout(r, 700)); return [a, t.style.transform]; });
ok(mq[0] !== mq[1], 'marquee chạy');
const pb = p.locator('[class*="bandBtn"]').first();
ok((await pb.count()) === 1, 'có nút Dừng chạy chữ');
await pb.click(); await sleep(200);
ok((await pb.getAttribute('aria-pressed')) === 'true', 'nút Dừng đặt aria-pressed=true');
const mq2 = await p.evaluate(async () => { const t = document.querySelector('[data-fx="VelocityMarquee"] [data-fx-track]'); const a = t.style.transform; await new Promise((r) => setTimeout(r, 600)); return [a, t.style.transform]; });
ok(mq2[0] === mq2[1], 'marquee dừng thật sau khi bấm Dừng');
await pb.click();
// gallery nút sau
const galNext = p.getByRole('button', { name: 'Khoá sau' });
await galNext.scrollIntoViewIfNeeded();
const sl0 = await p.evaluate(() => document.querySelector('[data-fx="DraggableGallery"] [tabindex="0"], [data-fx="DraggableGallery"] [data-fx-viewport]')?.scrollLeft ?? -1);
await galNext.click(); await sleep(900);
const sl1 = await p.evaluate(() => document.querySelector('[data-fx="DraggableGallery"] [tabindex="0"], [data-fx="DraggableGallery"] [data-fx-viewport]')?.scrollLeft ?? -1);
ok(sl1 > sl0, `gallery khoá học cuộn khi bấm Khoá sau (${sl0} -> ${sl1})`);

// ---------------------------------------------------------------- 5. Lesson Planner
console.log('5) Lesson Planner');
await p.locator('#lap-ke-hoach').scrollIntoViewIfNeeded();
const resultSel = '[class*="result"]';
await p.getByRole('button', { name: 'Xem khoá gợi ý' }).click(); await sleep(300);
ok(await p.locator('#lap-ke-hoach [role=alert]').count() === 4, 'bỏ trống: 4 lỗi cạnh nhóm chọn');
ok(await p.locator('[role=radiogroup][aria-invalid="true"]').count() === 4, 'aria-invalid trên 4 nhóm');
ok(await p.getByText('Chọn đủ bốn mục rồi bấm xem').count() === 1, 'trạng thái rỗng hiện');
const pick = async (lv, age, ses, slot) => { for (const v of [lv, age, String(ses), slot]) await p.locator(`#lap-ke-hoach input[type=radio][value="${v}"]`).check({ force: true }); };
await pick('moi', 'lon', 3, 'chieu');
await p.getByRole('button', { name: 'Xem khoá gợi ý' }).click(); await sleep(500);
let txt = await p.locator('#lap-ke-hoach').innerText();
ok(/Đứng Vững/.test(txt) && /1\.650\.000/.test(txt.replace(/\s/g, ' ').replace(/ /g, ' ')) || /1\.650\.000/.test(txt), 'moi/3 buổi -> Đứng Vững, 1.650.000');
const idx = ['An toàn', 'Chèo ván', 'Pop-up', 'Đọc sóng'].map((k) => txt.indexOf(k, txt.indexOf('Thứ tự bài học')));
ok(idx.every((i) => i > 0) && idx[0] < idx[1] && idx[1] < idx[2] && idx[2] < idx[3], `thứ tự bài học an toàn < chèo < pop-up < đọc sóng (${idx.join(',')})`);
ok(/Giá tham khảo/.test(txt) && /Điều kiện thực tế|huấn luyện viên xác nhận/i.test(txt), 'có chú thích giá tham khảo và điều kiện do huấn luyện viên');
// đổi lựa chọn -> cập nhật tức thì
await pick('luot', 'cao', 5, 'som'); await sleep(300);
txt = await p.locator('#lap-ke-hoach').innerText();
ok(/Tiến Bậc Sóng/.test(txt) && /3\.300\.000/.test(txt) && /40 tuổi|Từ 40|thể trạng/.test(txt), 'luot/5/40+ -> Tiến Bậc Sóng, 3.300.000, ghi chú thể trạng');
await pick('moi', 'nhi', 1, 'sang'); await sleep(300);
txt = await p.locator('#lap-ke-hoach').innerText();
ok(/Sóng Nhí/.test(txt) && /750\.000/.test(txt) && /phụ huynh/i.test(txt), 'trẻ 6-12 -> Sóng Nhí, 750.000, phụ huynh ở bờ');
await pick('dung', 'teen', 2, 'sang'); await sleep(300);
txt = await p.locator('#lap-ke-hoach').innerText();
ok(/Điều Ván/.test(txt) && /phụ huynh xác nhận/i.test(txt), 'teen -> cần phụ huynh xác nhận');
// checklist
const cbs = p.locator('#lap-ke-hoach input[type=checkbox]');
ok(await cbs.count() === 7, 'checklist 7 mục');
await cbs.nth(0).check({ force: true }); await cbs.nth(1).check({ force: true }); await sleep(200);
ok((await p.locator('[role=progressbar][aria-valuenow="2"]').count()) >= 1 && /2\/7/.test(await p.locator('#lap-ke-hoach').innerText()), 'tiến độ checklist 2/7');
await scan(p, 'planner có kết quả');
const href = await p.locator('a[data-rs-consult]').getAttribute('href');
console.log('   href tư vấn:', href);
ok(href.startsWith('/lien-he'), 'nút cuối dẫn tới /lien-he');
ok(/industry=/.test(href) && /solution=/.test(href) && /utm_campaign=luot-song/.test(href), 'link tư vấn có industry/solution/utm_campaign (cần registry đã đồng bộ meta.ts)');
// bản tóm tắt
await p.context().grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
await p.getByRole('button', { name: 'Chép bản tóm tắt' }).click(); await sleep(300);
ok(await p.locator('[role=status]').count() >= 1, 'chép tóm tắt có phản hồi');
await p.getByRole('button', { name: 'Chọn lại' }).click(); await sleep(200);
ok(await p.getByText('Chọn đủ bốn mục rồi bấm xem').count() === 1, 'Chọn lại -> trạng thái rỗng');
// bàn phím: Tab tới CTA, mũi tên chọn radio
await p.locator('#lap-ke-hoach input[type=radio][value="moi"]').focus(); await p.keyboard.press('ArrowDown'); await sleep(100);
ok(await p.locator('#lap-ke-hoach input[type=radio][value="dung"]').isChecked(), 'mũi tên đổi radio trong nhóm');

// ---------------------------------------------------------------- 6. Mùa sóng
console.log('6) Mùa sóng');
await p.locator('#mua-song').scrollIntoViewIfNeeded();
await p.getByRole('button', { name: 'Tháng 5', exact: true }).click(); await sleep(300);
let st = await p.locator('#mua-song').innerText();
ok(/Tháng 5/i.test(st) && /Nắng nhiều, sóng ít/i.test(st), 'chọn tháng 5 đổi nội dung');
await p.getByRole('button', { name: 'Tháng 11', exact: true }).click(); await sleep(300);
st = await p.locator('#mua-song').innerText();
ok(/Đông bắc rõ hơn/.test(st), 'chọn tháng 11 đổi nội dung');
ok(/không phải dự báo/i.test(st) && /do huấn luyện viên quyết định mỗi buổi/.test(st), 'lưu ý: tham khảo, không phải dự báo, HLV quyết định mỗi buổi');
ok(!/an toàn tuyệt đối|đảm bảo an toàn|chắc chắn an toàn/i.test(st), 'không khẳng định an toàn');
await scan(p, 'mùa sóng');

// ---------------------------------------------------------------- 7. FAQ + Tab + trang credits
console.log('7) FAQ, Tab, credits');
await p.locator('#hoi-dap summary').first().click(); await sleep(150);
ok(await p.locator('#hoi-dap details[open]').count() === 1, 'FAQ mở được');
await p.evaluate(() => window.scrollTo(0, 0)); await p.keyboard.press('Tab'); await p.keyboard.press('Tab');
const foc = await p.evaluate(() => document.activeElement?.textContent?.slice(0, 40));
ok(!!foc, `Tab đi tiếp có phần tử focus (${foc})`);
// Tab tới nút CTA hero
let reached = false;
for (let i = 0; i < 40 && !reached; i++) { await p.keyboard.press('Tab'); reached = await p.evaluate(() => /Lên kế hoạch buổi học/.test(document.activeElement?.textContent || '')); }
ok(reached, 'Tab tới CTA hero');
const hasLink = await p.locator('a[href="/demos/luot-song/credits"]').count();
ok(hasLink >= 1, 'footer có link Ảnh & ghi công');
await ctx.close();

const cr = await open(1280, 800, { url: `${URL_}/credits` });
const ct = await cr.p.locator('main').innerText();
ok(/12 ảnh/.test(ct) && /Paytone One/.test(ct) && /Pacifico/.test(ct) && /Readex Pro/.test(ct), 'credits liệt kê 12 ảnh + 3 font');
ok(cr.errors.length === 0, 'credits 0 lỗi console');
ok(/Trần Công Tiến/.test(ct), 'credits ghi rõ người thiết kế');
await cr.ctx.close();

// ---------------------------------------------------------------- 8. ref giữ trên link thoát
console.log('8) ?ref=');
{
  const r = await open(1280, 800, { url: `${URL_}?ref=abc123` });
  const cookies = await r.ctx.cookies();
  const h = await r.p.locator('#lap-ke-hoach').count();
  ok(h === 1, 'mở được với ?ref=');
  ok(!r.errors.length, '?ref= 0 lỗi console');
  console.log('   cookie tct_ref (do proxy.ts đặt, không phải demo):', cookies.some((c) => c.name === 'tct_ref'));
  await r.ctx.close();
}

// ---------------------------------------------------------------- 9. không tràn ngang
console.log('9) Tràn ngang');
for (const w of [320, 390, 768, 1024, 1440]) {
  const r = await open(w, w < 700 ? 800 : 900);
  const o = await r.p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  const w2 = await r.p.evaluate(() => { const bad = []; document.querySelectorAll('[data-site="luot-song"] *').forEach((e) => { const rc = e.getBoundingClientRect(); if (rc.right > innerWidth + 2 && getComputedStyle(e).position !== 'fixed' && !e.closest('[class*="galleryWrap"],[class*="bands"],[class*="waves"],[class*="hero"],[class*="textWave"],[class*="ribbon"],[class*="manifesto"],[class*="cta"],[data-fx="GrainOverlay"],svg')) bad.push(e.tagName + '.' + (e.className?.toString().slice(0, 30) || '') + '<' + (e.parentElement?.className?.toString().slice(0, 30) || '')); }); return bad.slice(0, 3); });
  ok(o <= 0, `không tràn ngang ở ${w}px (dư ${o}px)`);
  ok(w2.length === 0, `không phần tử lòi khỏi khung ở ${w}px ${w2.join(',')}`);
  await r.ctx.close();
}

// ---------------------------------------------------------------- 10. mobile: menu, Escape, touch target
console.log('10) Mobile');
{
  const r = await open(390, 844, { touch: true });
  const mb = r.p.getByRole('button', { name: 'Mở menu' });
  await mb.click(); await sleep(300);
  ok(await r.p.locator('#rs-menu').isVisible(), 'menu mobile mở');
  await r.p.keyboard.press('Escape'); await sleep(200);
  ok(!(await r.p.locator('#rs-menu').isVisible()), 'Escape đóng menu');
  ok(await r.p.evaluate(() => document.activeElement?.getAttribute('aria-controls') === 'rs-menu'), 'trả focus về nút menu');
  const small = await r.p.evaluate(() => [...document.querySelectorAll('[data-site="luot-song"] a, [data-site="luot-song"] button, [data-site="luot-song"] summary')].filter((e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 && (b.height < 43.5 || b.width < 43.5) && getComputedStyle(e).visibility !== 'hidden' && !e.closest('[hidden]'); }).map((e) => (e.textContent || e.className).trim().slice(0, 30)));
  ok(small.length === 0, `touch target >=44px (nhỏ: ${small.slice(0, 5).join(' | ')})`);
  const ins = await r.p.evaluate(() => [...document.querySelectorAll('input,textarea,select')].filter((e) => e.type !== 'radio' && e.type !== 'checkbox').length);
  ok(ins === 0, 'không có ô nhập chữ nhỏ (<16px)');
  await r.ctx.close();
}

// ---------------------------------------------------------------- 11. reduced-motion
console.log('11) reduced-motion');
{
  const r = await open(1440, 900, { reduced: true });
  const rm = await r.p.evaluate(() => {
    const root = document.querySelector('[data-site="luot-song"]');
    const hid = [...root.querySelectorAll('[data-rs="reveal"],[data-fx]')].filter((e) => { const cs = getComputedStyle(e); return cs.opacity === '0' || cs.visibility === 'hidden'; }).length;
    const waveAnim = getComputedStyle(document.querySelector('[data-rs="waves"] svg')).animationName;
    const sunRay = getComputedStyle(root.querySelector('[class*="sunRays"]')).animationName;
    return { hid, waveAnim, sunRay, st: root.getAttribute('data-rs-static'), txt: root.innerText.includes('Đừng chỉ ngắm biển') && root.innerText.includes('Một kế hoạch') && root.innerText.includes('Bạn hỏi') };
  });
  ok(rm.hid === 0, `reduced: không có khối ẩn (${rm.hid})`);
  ok(rm.waveAnim === 'none' && rm.sunRay === 'none', 'reduced: sóng và tia nắng đứng yên');
  ok(rm.st === '1', 'reduced: Motion ở chế độ tĩnh');
  ok(rm.txt, 'reduced: nội dung chính hiện đủ');
  await r.p.mouse.wheel(0, 900); await sleep(400);
  ok(/^1(\.0+)?$/.test((await r.p.evaluate(() => getComputedStyle(document.querySelector('[data-site="luot-song"]')).getPropertyValue('--rs-amp'))).trim()), 'reduced: biên độ sóng không đổi theo cuộn');
  ok(r.errors.length === 0, 'reduced: 0 lỗi console');
  await r.ctx.close();
}

// ---------------------------------------------------------------- 12. không JS: nội dung vẫn có trong HTML
console.log('12) No-JS');
{
  const ctx2 = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
  const pg = await ctx2.newPage(); await pg.goto(URL_, { waitUntil: 'load', timeout: 150000 });
  const t = await pg.evaluate(() => document.querySelector('[data-site="luot-song"]').innerText);
  ok(/Đừng chỉ ngắm biển/.test(t) && /Chọn con sóng/.test(t) && /Bạn hỏi/.test(t) && /Một kế hoạch/.test(t), 'no-JS: hero, khoá học, planner, FAQ có trong HTML');
  await ctx2.close();
}

// ---------------------------------------------------------------- 13. hiệu năng thô: long task >200ms khi cuộn toàn trang
console.log('13) Hiệu năng thô');
for (const [w, h, touch] of [[1440, 900, false], [390, 844, true]]) {
  const r = await open(w, h, { touch });
  await r.p.evaluate(() => { window.__lt = []; new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(Math.round(e.duration)))).observe({ entryTypes: ['longtask'] }); });
  const H = await r.p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 400) { await r.p.evaluate((y) => window.scrollTo(0, y), y); await sleep(70); }
  await sleep(500);
  const lt = await r.p.evaluate(() => window.__lt);
  const over = lt.filter((d) => d > 200);
  console.log(`   ${w}px: long task ${lt.length} (>200ms: ${over.length}) max=${Math.max(0, ...lt)}ms, cao trang ${H}px`);
  ok(over.length <= 3, `long task >200ms khi cuộn toàn trang ở ${w}px: ${over.length}`);
  await r.ctx.close();
}

// ---------------------------------------------------------------- 14. ảnh chụp
console.log('14) Ảnh chụp');
for (const [w, h, name, touch] of [[1440, 900, 'd', false], [390, 844, 'm', true]]) {
  const r = await open(w, h, { touch });
  await r.p.screenshot({ path: path.join(SHOTS, `${name}-hero.png`) });
  const H = await r.p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 500) { await r.p.evaluate((y) => window.scrollTo(0, y), y); await sleep(220); }
  await r.p.evaluate(() => window.scrollTo(0, 0)); await sleep(1500);
  await r.p.screenshot({ path: path.join(SHOTS, `${name}-full.png`), fullPage: true });
  await r.ctx.close();
}
console.log('   đã chụp vào', SHOTS);

await browser.close();
console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
