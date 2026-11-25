# Tịch Trà · Art direction

Ý tưởng: một căn phòng trà lúc ánh sáng thấp. Nền than ấm, chữ giấy ngà, xanh lá trà cho trạng thái và đường nét, MỘT điểm đỏ son (con dấu, thanh tiến độ, câu kết). Không nền kem. Góc vuông, viền mảnh 1px, chữ serif nhẹ (Newsreader 300) rất lớn, khoảng trắng rộng, chữ dọc ở hero.

## Bố cục
- **Hero** (desktop): lưới 1.05fr / 0.95fr. Trái: kicker, H1 3 dòng cỡ 6.4rem, nét cọ SVG, đoạn dẫn, 2 CTA (nút chính có từ tính), 3 mục nhỏ. Phải: khung ảnh 4:5 ấm đất nung, hơi nước canvas đè lên miệng ấm, chữ dọc "Tịch · Trà · Đà Nẵng" bên trái khung, con dấu đỏ lệch góc phải dưới. Mobile: ảnh tràn mép (52svh) lên TRƯỚC, hơi nước, tiêu đề kéo chồng lên mép ảnh, CTA xếp dọc.
- **Dải tên trà**: VelocityMarquee (CSS) tên 12 loại trà chữ nghiêng, chấm màu lá; có nút Dừng.
- **Tuyên ngôn**: ảnh đồi chè sương làm nền (parallax 90px), phủ than, lá trà trôi nhiều tầng, đoạn chữ cỡ 3.2rem sáng dần theo cuộn, nét cọ vẽ theo cuộn, câu kết đỏ nhạt.
- **Ba nghi thức** (Thức, Rót, Lắng): 3 hàng so le ảnh/chữ (12 cột), số 01-03 chữ rỗng nét, đường cọ xanh uốn lượn vẽ theo cuộn phía sau. Mobile: một cột, đường cọ thành sợi mảnh bên trái.
- **Danh mục**: bảng chữ (số, tên + chấm màu lá, vùng, giá) 12 hàng, cột phải dính: ảnh lá trà + chi tiết loại đang hover/focus. Mobile: chi tiết mở ngay trong hàng đã chọn, ảnh nằm cuối.
- **Ghép trà**: trái 3 nhóm radio dạng ô vuông; phải (dính) thẻ kết quả: tên, lý do, bộ số chén, 4 thông số, các nước pha, đồng hồ vòng tròn + hơi nước vẽ khi chạy.
- **Buổi trà**: trái form (stepper số người, khung giờ, bộ trà, trà, ghi chú), phải (dính) "vé" tóm tắt có con dấu, đường đứt, nút sao chép + nút tới form tư vấn.
- **Không gian**: 3 ảnh so le, mỗi ảnh loang mực riêng. **Hỏi đáp**: accordion `details`. **Kết**: ảnh đồi mờ nền, con dấu, "Ngồi xuống một chút." **Footer**: logo ngang, nét cọ, liên hệ `.example`, link ảnh & ghi công, dòng ký tên.

## Hiệu ứng (bộ ký hiệu)
Thư viện (`@/features/showroom/effects`): ScrollScrubText (tuyên ngôn), SVGPathDraw (nét cọ hero, tuyên ngôn, đường nghi thức, footer), ParallaxLayer (nền tuyên ngôn), VelocityMarquee (dải tên trà), MagneticButton (CTA hero), CustomCursor (chấm xanh phóng to + nhãn "Xem/Ngắm/Chọn/Gửi"), GrainOverlay (hạt phim), ScrollProgress (thanh đỏ mảnh trên cùng).
Riêng (tự viết trong demo): **InkReveal** (mặt nạ 4 vết mực radial-gradient loang từ 4 tâm lệch, biến `--i1..4`, ảnh phóng 1.14 về 1), **InkTitle** (từng từ blur 14px -> nét, lệch nhịp), **Steam** (canvas 26 hạt mềm, lắc sin, dừng khi ẩn), **Preloader chuyển cảnh mực** (ensō vẽ nét cọ 0.5s, con dấu, lỗ mực mở rộng; ~1.1s, 1 lần/phiên, bấm bỏ qua), **LeafDrift** (lá SVG parallax + xoay, 3 độ sâu), **đồng hồ pha trà** (vòng tiến độ + hơi nước SVG + chuông Web Audio tuỳ chọn), hero parallax ảnh nhẹ, hover xoay logo 2 độ, ảnh panel zoom 1.035.
Reduced-motion: không preloader, không mặt nạ, chữ hiện đủ, path vẽ tĩnh, hơi nước một khung. Touch: hơi nước 14 hạt, không con trỏ, không từ tính, parallax tắt dưới 768px.
