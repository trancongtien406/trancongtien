# QA (đã chạy thật)
Lệnh: `BASE=http://localhost:3100 node tests/showroom/detail-xe/e2e.mjs` -> 66 pass, 0 fail (chạy sau lần sửa cuối).
Gồm: 0 lỗi console, 0 request ngoài, chữ cấm mục 11 (text/alt/aria/meta, cả trạng thái builder), glyph Việt (h1/h2/body, ă â ê ô ơ ư đ Ắ Ệ Ố Ử Ữ Ờ Ặ Ẩ Ẵ) + font tải thật, scrub (p 0 -> 0,5 -> 1, đồng hồ giờ), light streak, slider (phím/Home/End/kéo chuột), ánh sáng thẻ theo con trỏ, counter, builder (rỗng, sedan+rửa, SUV+xoáy+ceramic đúng tiền, xe điện, chọn từ thẻ, link thoát có industry/solution/utm_campaign, sao chép, nhớ lựa chọn), ?ref giữ, Tab/focus, FAQ, reduced-motion, không tràn ngang 320/390/768/1024/1440, long task khi cuộn (desktop 0, mobile 0), credits 12 ảnh.
Chưa kiểm: Safari/Firefox, thiết bị cảm ứng thật (slider chạm chỉ kiểm bằng pointer events), trình đọc màn hình thật, Lighthouse, mở bằng 127.0.0.1.
Ảnh chụp: tests/showroom/detail-xe/screenshots/ (desktop/mobile hero + full, và các section).

## Chạy lại sau REWORK 2026-11-25
- `BASE=http://localhost:3100 node tests/showroom/detail-xe/e2e.mjs` -> **69 pass, 0 fail** (long task >200ms: 0 desktop, 0 mobile). e2e đã đổi: Tab tới CTA "Đặt lịch kiểm tra xe", counter hero, kiểm vắng hiệu ứng đại trà ngoài ParallaxLayer/SVGPathDraw, nội dung ngành mới.
- `node scripts/showroom-effects-matrix.mjs detail-xe`: đại trà 6 -> 2 (ParallaxLayer, SVGPathDraw); chữ ký thư viện 5.
- Chụp lại screenshots 1440 và 390 (shot.mjs), đã xem cả 390. og-image tạo lại, không chữ demo/minh hoạ.
