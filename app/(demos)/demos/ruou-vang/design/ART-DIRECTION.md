# ART-DIRECTION (Mộc Vang)

Ý tưởng: một căn hầm nhỏ ánh nến. Nền burgundy, vignette tối cố định, vàng đồng cho đường kẻ và nút, serif tương phản cao (Noto Serif Display) cho chữ lớn. Khác kim-hoan (đen thuần + vàng) và bar-mai-thuong (neon): ở đây là đỏ rượu ấm, ánh sáng cam nến, bàn gỗ, rèm nhung.

## Section (desktop 1440 / mobile 390)
1. **Header**: sticky, nền đen đỏ trong mờ, logo vòng đai thùng + ly, 4 link, nút "Đặt bàn" đồng. Mobile: nút Đặt bàn + burger 48px, drawer serif lớn, Escape đóng và trả focus.
2. **Rèm nhung** (overlay JS, một lần mỗi phiên): hai cánh sọc nhung (repeating-linear-gradient) viền đồng, giữ 0,22 s rồi mở sang hai bên 0,9 s (cubic-bezier .76,0,.24,1), logo mờ dần; bỏ qua bằng click/phím; reduced và no-JS không hiện.
3. **Hero**: 2 cột (chữ trái, khung tranh phải); mobile khung tranh lên trước, nhỏ hơn. Khung tranh treo tường có đèn rọi đồng và nón sáng; hai ngọn nến SVG nhấp nháy trên kệ gỗ; bụi sáng canvas. Choreography sau rèm: đèn rọi bật (0,9 s) → khung hiện từ trên xuống (1,0 s) → h1 tách từ (1,3 s, SplitWords) → đoạn dẫn → nút → ý nhỏ (đến 2,1 s). Scroll: khung tranh trôi chậm hơn chữ, nón sáng mờ dần.
4. **Dải chữ** Đỏ / Trắng / Hồng / Sủi (marquee CSS thuần, dừng khi hover/focus).
5. **Câu chuyện**: nền thùng sồi parallax tối, tuyên ngôn ScrollScrubText (từng từ sáng dần), ba nguyên tắc.
6. **Rót** (moment cuộn 1): cột trái dính chứa SVG chai nghiêng + ly; đường rượu (path, pathLength=1) vẽ dần theo cuộn rồi rút ngược sau khi ly đầy, mực ly dâng 0→100% với số %; cột phải 4 bước Rót/Xoay/Ngửi/Nhấp sáng lần lượt. Mobile: ly dính ở trên (44svh), bước cuộn bên dưới. Chưa có JS hoặc reduced: ly đầy 70%, đường rượu vẽ đủ.
7. **Xoay ly** (riêng): kéo ngang trên ly SVG; năng lượng xoay làm mặt vang lắc/nghiêng, hương bay lên, thước "Vang đã thở" đầy dần rồi đứng yên (rAF chỉ chạy khi còn năng lượng); phím ← → / Enter cũng xoay.
8. **Nhãn chai lật** (riêng): 4 nhãn giấy ngà xếp lệch góc; bấm lật 3D để đọc vị chính + món hợp + nút "Xem ... trong thực đơn" (nhảy tới thực đơn và chọn tab).
9. **Thực đơn**: tab 4 loại (ARIA tabs, phím mũi tên/Home/End), 14 dòng chấm dẫn giá ly/chai (giá tham khảo), ảnh crossfade theo tab (sticky ở desktop, thanh ngang ở mobile).
10. **Món nhắm**: ảnh phô mai mở bằng ClipReveal, danh sách 5 đĩa kèm vang hợp.
11. **Căn phòng**: gallery kéo ngang có quán tính (DraggableGallery), ảnh so le, nút Trước/Sau 48px.
12. **Chọn vang (Pairing Finder)**: bảng điều khiển có CursorSpotlight; 6 bước (món, dịp, loại, độ đậm, khô/ngọt, ngân sách); trạng thái lỗi (chưa chọn món), rỗng, kết quả 3 gợi ý (kiểu nho, % hợp, lý do, món đi cùng, giá tham khảo, cờ vượt ngân sách, "Thêm vào bàn").
13. **Tóm tắt đặt bàn**: số khách (stepper 1-12), ngày (không cho quá khứ), giờ, danh sách ly đã thêm; sinh văn bản tóm tắt, nút Sao chép, nút cuối "Gửi yêu cầu đặt bàn" → `buildConsultHref("ruou-vang")`. Không thu họ tên/SĐT, ghi rõ chưa gửi gì.
14. **Hỏi đáp** (details), **chân trang** (chữ khổng lồ rỗng viền đồng + nến, 18+, link Ảnh & ghi công, ký tên).

## Hiệu ứng (≥6 có chủ đích)
Từ thư viện: SplitWords (mọi h1/h2), ScrollScrubText (tuyên ngôn), ClipReveal (ảnh món nhắm), ParallaxLayer (nền câu chuyện), VelocityMarquee mode css (dải chữ), DraggableGallery (căn phòng), GrainOverlay (nhiễu phim cố định), CanvasParticles (bụi sáng hero), MagneticButton (CTA chính), CursorSpotlight (bảng Finder).
Riêng: rèm nhung hai bên, đường rượu rót SVG + ly dâng theo cuộn, dark spotlight/ánh nến theo con trỏ + vignette, nến SVG nhấp nháy (3 ngọn), xoay ly bằng kéo, nhãn chai lật 3D, crossfade ảnh thực đơn, khung tranh có đèn rọi.
Chính sách: chỉ animate transform/opacity/clip-path/stroke-dashoffset; hover trong (hover:hover)(pointer:fine); reduced-motion = trạng thái cuối, không rèm, không nháy; không scroll-jacking; canvas dừng khi ẩn tab/ngoài khung.
