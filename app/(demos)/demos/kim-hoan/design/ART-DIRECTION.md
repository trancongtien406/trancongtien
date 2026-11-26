# ART-DIRECTION — Kim Nguyệt
Luxury đen và vàng, chậm: nhiều khoảng đen, ảnh sản phẩm lớn, serif Bodoni cao tương phản + Montserrat mảnh. Khác bar neon (đen + hồng/cyan), sat-gym (xám + axit), phong-thu (tím), detail-xe (carbon + bạc + đỏ).
## Section (desktop / mobile)
1. Intro: hộp trang sức CSS mở nắp (nắp xoay rotateX, ánh vàng toả, trăng khuyết trồi lên), hai panel đen tách đôi; tổng 1,15s; bấm/phím bỏ qua; reduced-motion không hiện.
2. Hero: 2 cột (chữ trái, ảnh nhẫn cắt hình ôvan "mặt trăng" phải) + quỹ đạo vàng vẽ dần có chấm thoi chạy theo ôvan + canvas lấp lánh; chữ "thời gian." shimmer lặp chậm. Mobile: chữ trước, ôvan dưới.
3. Dải chữ vàng nghiêng chạy (velocity theo cuộn, có nút dừng).
4. Giới thiệu: nền ảnh parallax + đoạn văn sáng dần theo cuộn (scrub).
5. Bộ sưu tập Trăng: 1 mẫu lớn ngang + 3 thẻ dọc lệch tầng; ảnh trồi lên từ lớp (clip + zoom + parallax chậm); glare vàng theo con trỏ + viền sáng.
6. Nhẫn xoay 3D CSS (40 mảnh vàng, ánh sáng đứng yên) + 3 điểm chế tác.
7. Công cụ thiết kế: preview SVG đổi theo loại/chất liệu/đá/cỡ/hoàn thiện; khoảng giá NumberTicker; bảng tính từng khoản; đơn giá vàng nhập được; tóm tắt + sao chép; CTA tư vấn. Mobile: preview + giá dính trên, chip điều khiển, bảng tính xuống dưới.
8. Chế tác: đường kẻ vàng dọc vẽ dần theo cuộn, nút thoi sáng lên từng bước.
9. Chất liệu / tuổi vàng (Counter %), Chăm sóc (2 ảnh lệch), Hỏi đáp (details), Liên hệ (nền ảnh bên phải, lấp lánh).
## Hiệu ứng
Thư viện: SplitWords, ScrollScrubText, VelocityMarquee, Counter, NumberTicker, SVGPathDraw (đường kẻ vàng), ParallaxLayer, GrainOverlay, ShineSweep, ScrollProgress, CustomCursor. Riêng: GoldGlare, GoldShimmer, GemSparkle (canvas), Ring3D (CSS 3D), mở hộp (Intro), ProductReveal (clip+parallax), đường kẻ vàng chế tác, hero choreography.

## Cập nhật 2026-11-25 (xem REWORK.md)
Section hiện tại: Intro hộp trang sức · Hero (tiệm kim hoàn, 3 sự thật) · Dải thông tin · Về tiệm · Danh mục 5 nhóm · Nhẫn xoay 3D · Tuổi vàng 10K–24K · Cách tính giá (3 bảng + cân tiểu ly) · Ước tính giá (Configurator) · Dịch vụ (khắc chữ, thước nới size) · Quy trình đặt làm 5 bước · Bảo quản, bảo hành, chính sách · Giờ mở cửa (bảng đèn) · Hỏi đáp · Đặt làm. Thư viện còn dùng: SVGPathDraw, ScrollProgress (đại trà 2/2), Counter, NumberTicker, ShineSweep, GrainOverlay, CustomCursor. Đã bỏ SplitWords, ScrollScrubText, VelocityMarquee, ParallaxLayer. Ngôn ngữ chuyển động: dải ánh kim quét tiêu đề, ảnh mở tủ kính từ giữa, sáng dần như bật đèn tủ kính.
