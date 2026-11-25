// Tạo ảnh xem trước (webp) cho trang /demos và /solutions từ ảnh chụp hero thật của từng demo.
// Chạy: node scripts/showroom-thumbs.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
const CANDIDATES = ['hero-1440.png', 'vi-1440-hero.png', 'd-hero.png', 'd-1hero.png', 'desktop-hero.png', 'hero-d.png', '1440-hero.png', 'home-1440.png'];
const root = path.resolve('tests/showroom');
const out = path.resolve('public/images/demos/_showroom');
fs.mkdirSync(out, { recursive: true });
const slugs = fs.readdirSync(root).filter((d) => fs.existsSync(path.join(root, d, 'screenshots')));
for (const slug of slugs) {
  const dir = path.join(root, slug, 'screenshots');
  const OVERRIDE = { 'bar-mai-thuong': 'd-1hero.png' }; // hero-1440.png của trang này từng chụp phải màn hình lỗi tạm thời
  const pick = OVERRIDE[slug] || CANDIDATES.find((c) => fs.existsSync(path.join(dir, c)));
  if (!pick) { console.log('thiếu', slug); continue; }
  const f = path.join(dir, pick);
  // cắt phần trên (bỏ thanh Demo nổi ở đáy khung hình), đổi sang tỉ lệ 16:10
  const meta = await sharp(f).metadata();
  const h = Math.min(meta.height, 820);
  await sharp(f).extract({ left: 0, top: 0, width: meta.width, height: h })
    .resize(960, 600, { fit: 'cover', position: 'top' }).webp({ quality: 80 }).toFile(path.join(out, `${slug}.webp`));
  console.log('ok', slug);
}
