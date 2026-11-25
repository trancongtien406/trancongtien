# ART-DIRECTION: Rong Dặm, "sổ tay du lịch" (travel zine)

Từ khoá: giấy chấm bi, ảnh polaroid lệch nhịp, băng dính washi, dấu bưu điện, nhãn dán, vé giấy có viền đậm và bóng cứng (4-8px, không blur), bản đồ nét tay. Vui nhưng đáng tin: mọi giá/giờ có ghi chú giả định.
Khác 9 demo còn lại: nền giấy chấm bi + viền forest 2px + bóng cứng offset; ảnh nghiêng -6° đến +5°; bố cục lệch nhịp (không lưới đều); chuỗi section đổi màu nền (paper, vàng, paper, xanh biển, paper, forest, paper, đỏ, forest).

## Section (desktop 1440 / mobile 390)
1. **Dải thông tin + Header** (34px + 80px, sticky): logo ngang, nav 5 mục, công tắc VI|EN, CTA vàng "Lên đường thôi". Mobile: logo, VI|EN, nút menu (panel mở, Escape đóng và trả focus).
2. **Hero** "Đi một dặm. Thêm một chuyện.": dòng issue (Sổ tay hành trình / Tập 01); trái cột 1-6 chữ + CTA + nét đứt hoạ tiết; phải cột 7-12 collage khung 1.02:1 gồm nền vàng nghiêng +4°, ảnh Hội An -4°, ảnh Bà Nà -6°, ảnh đèn lồng +5°, dấu bưu điện +8° (16°N 108°E), 2 nhãn dán. Chữ không đè ảnh. Mobile: chữ, CTA, rồi collage cao ~330px (không slider).
3. **Nhịp miền Trung** (#destinations): 4 thẻ "hộ chiếu" trắng viền đậm, nghiêng nhẹ, so le (grid 4 cột desktop, 2 cột tablet, 1 cột mobile). Không ảnh (dành ảnh cho thẻ tour để không lặp).
4. **Trip Finder** (#trip-finder, nền vàng): cột trái tiêu đề + nhãn dán, cột phải form trắng bóng cứng: thời gian (radio chip), ngân sách (range + ô số, 300k-6tr, bước 50k), sở thích (checkbox chip, tối đa 5), đi cùng ai (radio chip). Kết quả 1-3 thẻ có số 01-03, lý do giải thích được, giá ước tính đã gồm vé, nút "Khám phá lịch trình".
5. **Sáu hành trình** (#tours): lưới vé 3 cột, ảnh 3:2 + nhãn "Giá tham khảo", giờ khởi hành khác thời lượng, điểm đón, dòng giá dịch vụ và vé (tách riêng). Cột giữa hạ 26px. Mobile 1 cột.
6. **Itinerary Explorer** (#itinerary, nền xanh biển): tab 6 tour (cuộn ngang), meta, tab ngày (RD-06), timeline theo giờ (nút), bản đồ SVG sticky bên phải; dưới là Đã bao gồm / Chưa bao gồm / Chính sách huỷ; Bộ tính chi phí kiểu vé (trái chọn khách, phải chi tiết + tổng đậm), lưu/sao chép, ghi chú minh bạch nền vàng.
7. **Nhật ký dọc đường** (#journal): 3 polaroid 4:5, 3:4, 16:11 lệch nhịp.
8. **Vui nhưng đáng tin** (#about, nền forest): 3 khối viền kem.
9. **FAQ** (#faq): 6 `details` trong thẻ trắng.
10. **Closing** (nền đỏ): CTA vàng "Trao đổi về dự án của bạn" tới `buildConsultHref('rong-dam')`, CTA phụ về Explorer.
11. **Footer** (forest): logo đảo màu, slogan, link, credits, dòng ký tên "Website do Trần Công Tiến", liên hệ `.example`.

## Bản đồ nét tay
SVG viewBox 300 20 700×650. Biển xanh nhạt, bờ biển cong tay 3px, bán đảo Sơn Trà, núi dạng chữ M, sông Hàn nét xanh, đường đi đỏ nét đứt nối các điểm theo thứ tự ngày đang xem, ghim đánh số. Điểm dừng được chọn: vòng vàng + chấm đỏ phóng to, nhãn lớn hơn, hai chiều với timeline (chọn trên bản đồ hoặc trong danh sách). Có thể ẩn bản đồ. Văn bản tương đương: timeline.

## Motion (GSAP, chỉ transform/opacity)
- Hero (≈1.6s): dòng tiêu đề trượt lên từ khe cắt (stagger 0.12s) → 4 ảnh rơi xuống và xoay về góc (0.14s, back.out) → dấu bưu điện đóng (scale 1.9→1 tại 1.0s) → mô tả/CTA mờ vào → tấm giấy phủ trượt đi để lộ nét đứt hoạ tiết.
- Cuộn 1: thẻ hộ chiếu, vé tour, nhật ký nghiêng 3° rồi thẳng lại khi vào khung (ScrollTrigger once).
- Cuộn 2: ghim bản đồ nảy lên lần lượt khi Explorer vào khung nhìn.
- Hover (chỉ `(hover:hover) and (pointer:fine)`): nút dịch -2px/-2px + nghiêng -1°, dòng lịch trình đổi vàng.
- `prefers-reduced-motion: reduce`: không chạy timeline, không ScrollTrigger, nội dung hiện đủ (không có trạng thái ẩn ban đầu trong CSS).

## Tương tác
- **Trip Finder**: luật theo SPEC (lọc cứng thời gian+ngân sách đã gồm vé; điểm 55 sở thích, 20 người đồng hành, 15 thời lượng, 10 ngân sách còn dư; sort điểm, giá, ID; top 3). Lỗi cạnh ô (role=alert, aria-invalid), kết quả cũ khi sửa form, rỗng có gợi ý (ngân sách hoặc thời gian), không giả loading. Enter khi gõ IME không gửi form.
- **Itinerary Explorer**: trạng thái tour/ngày/điểm dừng/khách/phụ thu/tính vé/hiện bản đồ; đổi tour giữ số khách, đặt lại ngày và điểm dừng, reset phụ thu nếu tour không có lưu trú; công thức S+T+R bằng số nguyên VND; khách 1-12, tối thiểu 1 người lớn.
- **Giữ trạng thái VI/EN**: một khoá `localStorage` (`rd-state-v1`) được kiểm lại (sanitize) khi nạp; hai route dùng cùng provider nên tour, ngày, điểm dừng, khách, ngân sách, lựa chọn Trip Finder và kết quả đi theo khi bấm VI/EN. Storage lỗi: dùng mặc định, không báo thành công giả.
