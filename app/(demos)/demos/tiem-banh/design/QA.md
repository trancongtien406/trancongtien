# QA — Mây Kẹo
Lệnh: `BASE=http://localhost:3100 node tests/showroom/tiem-banh/e2e.mjs` (Playwright + Chrome headless). Kết quả lần chạy cuối: 59 pass, 0 fail.
Đã kiểm: 0 lỗi console, 0 request ngoài origin, quét chữ cấm (text/alt/aria/meta) sạch, 5 mốc rộng 320-1440 không tràn ngang, glyph Việt (ă â ê ô ơ ư đ Ắ Ệ Ố Ử Ữ Ờ Ặ) render bằng font thật, Cake Builder (vị, size, giá, chữ có dấu, giới hạn 24, rỗng/vượt/size nhỏ, copy, lưu localStorage), lọc thực đơn 16 món, tilt 3D, kéo nhãn dán, xoay bằng tay nắm và phím, Tab tới CTA + viền focus, menu mobile + Escape, reduced-motion, no-JS, credits (12 ảnh), long task khi cuộn: 0 ở 1440 và 390.
Chưa kiểm: link thoát có industry/solution/utm (chờ registry có tiem-banh, xem REQUESTS.md); tương phản bằng công cụ tự động (chỉ tính tay); thiết bị cảm ứng thật; Safari/Firefox; bundle size.

## REWORK 2026-11-25
`node tests/showroom/tiem-banh/e2e.mjs`: 98 pass, 0 fail (0 lỗi console, 0 request ngoài, không tràn ngang, glyph Việt, reduced-motion, no-JS, quét chữ cấm, long task >200ms = 0). Thêm: hero (Quận Hải Châu, 7:00, 320.000₫, trước 2 ngày), 21 món/4 nhóm, tủ kính xoay (nút, kéo, phím), lò nướng đếm giờ (giờ giả lập 03:00 và 08:30), cắt bánh (6/10/16/24 lát, tiến độ theo cuộn), thổi nến, vắng mặt các hiệu ứng đại trà thừa. Chưa kiểm: thiết bị cảm ứng thật.
