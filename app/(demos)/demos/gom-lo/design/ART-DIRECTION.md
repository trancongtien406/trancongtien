# ART-DIRECTION: Đất Mơ

Ý tưởng: trang là một buổi ở bàn xoay. Bình SVG quay, bạn "nặn" nó bằng thanh trượt/kéo chuột, đi qua lửa khi cuộn, rồi chọn buổi làm gốm.

| Section | Desktop | Mobile | Hiệu ứng |
|---|---|---|---|
| Hero | Nền terracotta vân đất. Trái: nhãn viết tay, H1 khắc vào đất, mô tả, CTA từ tính, 3 ý nhanh. Phải: bàn xoay + bình quay trong đĩa tròn có chữ chạy vòng (quay theo cuộn), thanh "độ phình", ảnh bình nung khung vòm xoay nghiêng. Mép dưới răng cưa sang nâu | Chữ, CTA rồi tới bàn xoay (bình lộ ngay dưới nếp gấp), 3 ý nhanh xuống cuối | Bình "nặn" từ cục đất (u 0->1, back.out 1.7s); H1 khắc từng từ; ring textPath xoay 220deg theo cuộn; bình phình thêm theo cuộn; kéo ngang trên bình đổi độ phình |
| Dải chữ | "Nặn · Xoay · Phủ men · Nung · Chờ nguội" cỡ lớn, dấu vân tay xen giữa | Giống, nút Dừng chữ chạy | VelocityMarquee tăng tốc theo cuộn |
| Câu chuyện | Ảnh bàn xoay khung vòm (mở như vòng tròn) trái, chữ phải | Xếp dọc | ClipReveal circle; ScrollScrubText sáng dần |
| Từ đất đến men | Cột trái dính: tiêu đề, nhiệt kế, số °C, tên giai đoạn, đường cong nhiệt vẽ theo cuộn. Cột phải 4 bước | Một cột, không dính | Nền 3 lớp đất sống -> lửa -> men ngọc đổi theo cuộn; nhiệt độ 25 -> 1.240 °C; điểm lăn trên đường cong |
| Kệ gốm | Nền đất chín, 10 thẻ vòm, kéo ngang | Vuốt ngang native | DraggableGallery (quán tính, phím, nút), ImageHoverDistort trên 5 thẻ ảnh, 5 thẻ là bình SVG tự quay, con trỏ "Kéo" |
| Buổi làm gốm | 3 thẻ buổi (ảnh méo hover) + số người + khung giờ + nung; tờ tóm tắt giấy kraft dính phải, mép răng cưa | Tờ tóm tắt đặt dưới form | Công cụ Workshop Booking Preview |
| Nặn bình | Đĩa vòm có bình quay lớn + mã; trái-phải: bảng điều khiển hình dáng/độ phình/cổ/men/cách phủ/hoạ tiết | Xếp dọc | Pot Designer: dáng nội suy khi đổi, hoạ tiết chấm/sóng quay theo bình |
| Xưởng | Ảnh kệ lò parallax toàn bề ngang, 4 góc xưởng | Xếp dọc | ParallaxLayer |
| Hỏi đáp | Nền terracotta, 6 mục details | Xếp dọc | không |
| Kết | Chữ khổng lồ khắc, ảnh men nghiêng, vân tay lớn mờ | Xếp dọc | MagneticButton |

Hiệu ứng riêng (không từ thư viện): Pot (bàn xoay SVG nội suy path), Engrave (chữ khắc bằng clip-path từng từ), Fire (vết nung: 3 lớp nền, nhiệt kế, đường cong), ring textPath xoay theo cuộn, Fingerprint (vân tay vẽ tay). Từ thư viện: DraggableGallery, ImageHoverDistort, GrainOverlay, ParallaxLayer, ScrollScrubText, VelocityMarquee, ClipReveal, CustomCursor, MagneticButton, SVGPathDraw, ScrollProgress. Mobile: tắt méo ảnh, parallax, từ tính, con trỏ (thư viện tự tắt). reduced-motion: bình tĩnh nhưng vẫn đổi hình theo thanh, chữ hiện đủ, nền không đổi theo cuộn.
