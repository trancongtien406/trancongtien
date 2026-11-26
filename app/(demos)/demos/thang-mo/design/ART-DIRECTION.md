# ART-DIRECTION, Tháng Mơ

Ý tưởng: trang web là một cuốn photobook cưới cũ. Ảnh = ảnh in có viền giấy trắng ngà, góc dán ảnh (tam giác linen ở góc trên-trái và dưới-phải), xoay ±1.5–2.5°, caption Playfair nghiêng như ghi chú tay, số "Fig. 01", nền giấy có nhiễu hạt rất nhẹ (SVG data URI), đường kẻ mảnh và gáy sách. Không card bo tròn, không gradient pastel, không glassmorphism. Bo góc ảnh 0px, nút 2px.

Desktop 1440 / Mobile 390
- Header: dải cocoa "Wedding Studio · Vol. 01"; hàng nav 3 cột (Album, Gói chụp | logo | Moodboard, Quy trình, Tư vấn). Mobile: logo giữa + nút Menu, sheet toàn rộng.
- Hero "The Cover": chữ cột 1–6, ảnh in nghiêng cột 7–12 với ảnh phụ (nhẫn) chồng góc trái dưới, đường gáy dọc. Mobile: meta → H1 → ảnh → mô tả → CTA (đổi thứ tự bằng `display: contents`).
- Lời đề tựa: ảnh cô dâu nhìn từ sau (4 cột) + văn bản (7 cột). Mobile: ảnh 72% rồi chữ.
- Albums: lưới 12 cột bất đối xứng (A1 cột 1–7 ngang, A2 9–12 dọc lệch 96px, A3 1–4 dọc, A4 6–12 ngang lệch 56px). Mobile: một cột xen ảnh rộng đầy / 82% căn phải. Mỗi ảnh là nút mở Immersive Album.
- Photo essay: nền linen, H2 giữa, ba ảnh in 3:4 lệch cao thấp (cột 1–3, 5–8, 10–12).
- Gói chụp: bảng in từng hàng (số La Mã, tên, thông số có đường chấm, giá + CTA "Đưa vào moodboard"), không có huy hiệu "bán chạy".
- Moodboard: form 4 nhóm radio (4 cột) + bảng dán ảnh sticky (7 cột): ảnh chính, ảnh chi tiết xoay, 4 swatch có tên + hex, mẩu giấy ghi bối cảnh, tiêu đề, tổng giá.
- Quy trình: 4 cột số nghiêng lớn / mobile timeline dọc. FAQ: tiêu đề 4 cột + accordion 8 cột. Trang cuối: nền cocoa + ảnh in nghiêng. Footer giấy.

Immersive Album: nền cocoa đậm, trang giấy ngà. Desktop ≥1024×600: bìa → spread hai trang (có bóng gáy) → trang cuối; mobile: từng trang. Chuyển trang: desktop lật nhẹ (rotateY ±9°, 480ms, perspective 1200), mobile trượt 16px + mờ 280ms, reduced-motion tức thời. Chừa 88px đáy cho thanh DemoNotice dùng chung (luôn nổi trên cùng).

Motion (GSAP, chỉ transform/opacity): hero ~1.6s (tấm phủ giấy kéo lên, H1 trồi từng dòng trong mặt nạ, ảnh phụ xoay -4°→-2°, mô tả/CTA/caption), moment 1 albums đặt xuống (y32 + xoay ±2.5°, stagger), moment 2 ba ảnh essay trôi dọc khác tốc độ (scrub 0.8, chỉ ≥1024px), reveal các khối khác; hover chỉ trong `(hover:hover) and (pointer:fine)`. reduced-motion: không hiệu ứng, tấm phủ không bao giờ hiện (chỉ bật khi JS + motion được phép).


## Cập nhật 2026-11-25 (rework)
Thứ tự section: Hero (3 sự thật) -> Về studio (ScrollScrubText + ảnh ClipReveal) -> Dịch vụ (4 hàng số nghiêng, không ảnh) -> Gói chụp (hàng giá: thông số, Bao gồm / Không bao gồm, giá) + bảng Album, ảnh in và file -> Danh mục phong cách (DraggableGallery 4 thẻ in, mỗi thẻ có địa điểm/giờ/trang phục/mùa, mở ImmersiveAlbum) -> Trang phục và make-up (bảng theo gói + ảnh in nghiêng) -> Giờ chụp theo ánh sáng (GoldenHour: nền trời đổi tông, mặt trời trượt trên cung) -> Moodboard concept -> Quy trình 7 bước + Lịch giao ảnh (thanh mốc) -> Chính sách (2 cột, ảnh thiệp) -> FAQ 12 -> Đặt lịch (nền cocoa, ảnh ClipReveal từ phải). Mobile: bảng thành 2 cột (ẩn cột ghi chú), gallery vuốt ngang với nút Trước/Sau 48px.
Motion: ngôn ngữ "đặt ảnh xuống bàn" (xoay nhẹ + mờ dần, không fade-up); bỏ scrub essay. Đại trà giữ: ClipReveal, ScrollScrubText.
