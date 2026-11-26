# QA (thật)
Lệnh: `BASE=http://localhost:3100 node tests/showroom/can-ho-ven-bien/e2e.mjs` (Playwright + Chrome headless). Kết quả lần chạy cuối (sau đợt chỉnh 2026-11-25): 60 pass, 0 fail.
Gồm: 0 lỗi console, 0 request ngoài origin, không tràn ngang 320/390/768/1024/1440; font Spectral/Geologica đã tải + đo glyph Việt + ảnh glyph; hiệu ứng khởi chạy; sticky chapters đổi 0-1-2-3; cảnh nắng đổi màu theo giờ + phím; morph 1PN/2PN/3PN, hover/focus/mũi tên phòng, la bàn đổi theo tầng; annuity khớp công thức độc lập (sai số <0,1%), lãi 0%, rỗng/lỗi; link tư vấn có industry/solution/utm_campaign; menu mobile + Escape; reduced-motion; quét chữ cấm; credits 12 ảnh. Long task >200ms khi cuộn: 0 (1440) và 0 (390).
Chưa kiểm: Safari/Firefox, thiết bị thật, đọc bằng screen reader, Lighthouse, so sánh differentiation.mjs, trạng thái với `?ref=` chỉ kiểm link (cookie do proxy).
Ảnh chụp: tests/showroom/can-ho-ven-bien/screenshots.

## Đợt chỉnh 2026-11-25 (đề tài + hiệu ứng)
- e2e thêm: hero (loại hình, khu vực, CTA nhà mẫu, 48 m²/2,98 tỷ/36 tầng), tổng quan không cam kết, loại căn 48/71/101 m², mặt cắt tháp (dải trượt, mũi tên), thước tầng T01 -> T36, đặt lịch nhà mẫu (lời nhắn đổi theo buổi/căn, ghi không lưu không gửi), đã bỏ SplitReveal/ClipReveal/MagneticButton/SVGPathDraw/ScrollProgress; quét chữ cấm giữ cả "pháp lý" (đã đổi thành "giấy tờ").
- Ma trận hiệu ứng trước/sau: đại trà 7 (vượt) -> 2/2 (ParallaxLayer, ScrollScrubText); chữ ký thư viện 6 giữ nguyên + 3 chữ ký riêng mới (mặt cắt tháp, thước tầng, hero đèn cửa sổ).
- Long task >200ms khi cuộn: 0 ở 1440 và 390. Chụp lại 1440/390 và tự xem; sửa dải tháp chồng tab ở mobile.
- og-image vẽ lại, không chứa chữ demo/minh hoạ.
- Yếu: khoảng cách kết nối (5 phút, 10-15 phút, sân bay) là mô tả khu vực chung do agent viết; cần chủ dự án duyệt. Ảnh vài tấm chụp ở thành phố ven biển nước ngoài.
