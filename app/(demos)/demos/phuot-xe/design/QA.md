# QA (chạy thật 2026-11-25)
- `npx vitest run tests/showroom/phuot-xe`: 16/16 pass (lib/pricing.ts).
- `BASE=http://localhost:3100 node tests/showroom/phuot-xe/e2e.mjs`: 95 pass, 0 fail. Gồm: 0 lỗi console, 0 request ngoài, chữ cấm, glyph Việt (h1/h2/body) + ảnh glyph-stack, không tràn ngang 320/390/768/1024/1440, công cụ (lọc, bàn phím, 3/6/10/14 ngày, trần giá tuần, lỗi 0/31/rỗng/abc, giao nhận+phụ kiện+bảo hiểm, cọc theo xe, checklist, sao chép, CTA), hiệu ứng chạy thật (marquee tăng tốc 112 -> 220 px/s, --vx-v, kim đồng hồ, xe lướt, đèn xuất phát, đường vẽ, magnetic, tilt), preloader, reduced-motion, no-JS, credits, long task >200ms: 0 ở 1440 và 390.
- tsc và eslint: sạch cho thư mục phuot-xe.
- Chưa kiểm: href có industry/solution/utm (registry chưa có phuot-xe, xem REQUESTS.md); thiết bị cảm ứng thật; Safari/Firefox; trình đọc màn hình thật; tên thương hiệu ở Maps/Facebook/Zalo/WIPO.
