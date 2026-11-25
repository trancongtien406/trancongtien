# Art direction: carbon & chrome, tĩnh, sang, chính xác
Nguyên tắc: nền đen vân carbon, chữ hoa Saira cách chữ rộng, đường kẻ mảnh bạc, đỏ chỉ là vạch 2px. Chuyển động chậm, có điểm dừng, ánh sáng là nhân vật chính (không bounce, không nghiêng).

## Section (desktop 1440 / mobile 390)
1. Header cố định mờ kính: logo ngang, 5 link, nút "Đặt lịch". Mobile: logo + nút (ẩn nút ở <=420px).
2. Hero 100svh: ảnh SUV đen toàn nền, phủ gradient carbon trái, tiêu đề chrome 3 dòng tách từ, 2 CTA (CTA chính có quét sáng lặp 5s), dải 4 số liệu counter. Mobile: ảnh trên 54svh rồi chữ.
3. Triết lý: tiêu đề + đoạn chữ sáng dần theo cuộn; ảnh sơn đen dọc 4:5 mở inset từ dưới, parallax 50px; 3 nguyên tắc.
4. Quy trình (scrub): section 330svh, khung sticky; ảnh sedan + lớp bụi bị quét chéo theo cuộn, đường mép sáng; đồng hồ giờ làm 0 đến 8,0 và bước 0 đến 8; 4 giai đoạn. Mobile: ảnh 34svh trên, chữ dưới, không nội dung nào ngoài khung.
5. Gói chăm sóc: 5 thẻ carbon (3+2), số viền rỗng, ánh sáng phản chiếu bám con trỏ (nền + viền sáng cục bộ), nút quét sáng khi hover.
6. Năm bước: đường dọc vẽ theo cuộn + 4 ô đếm.
7. Lớp phủ: slider chưa phủ / đã phủ (kéo, chạm, phím), vệt sáng chạy theo cuộn trên khung, giải thích + ghi chú trung thực.
8. Chọn gói (Package Builder): 3 nhóm chọn bên trái, phiếu kết quả dính bên phải (mobile: xếp dưới).
9. Gallery kéo ngang 7 ảnh (quán tính, nút, phím), mỗi ảnh có vệt sáng cuộn.
10. FAQ 6 mục (details), kết trang, footer.

## Hiệu ứng (thư viện = L, riêng = R)
SplitWords hero (L), Counter hero/quy trình (L), CursorSpotlight hero (L), ShineSweep nút CTA/thẻ (L), ScrollScrubText triết lý (L), ClipReveal + ParallaxLayer ảnh (L), SVGPathDraw đường quy trình (L), DraggableGallery (L), NumberTicker trong builder (L), ScrollProgress (L); hero choreography có blur-to-sharp (R), scroll-scrub bụi -> sạch với mép sáng và đồng hồ (R), light streak scrub theo cuộn (R), slider lớp phủ (R), ánh sáng phản chiếu theo con trỏ trên thẻ gói (R), blur-to-sharp khi vào khung (R), vân carbon CSS (R).
Mọi chuyển động chỉ transform/opacity/filter/clip-path; reduced-motion: nội dung đủ, scrub bỏ ghim và giữ trạng thái sạch; hiệu ứng con trỏ chỉ chuột.
