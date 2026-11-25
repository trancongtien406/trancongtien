# ART DIRECTION · Nét Lệch

Ý tưởng: bìa tạp chí thời trang có thể tương tác. Cú ngoặt đặc trưng: mọi đường cắt, dải màu, hình đồ hoạ đều nghiêng đúng 14° (độ lệch ngang = chiều cao × tan14° ≈ 24,93%; ảnh hero dùng aspect-ratio cố định 4/5 nên clip-path `31.2%` giữ đúng góc ở mọi viewport).

## Section (desktop 1440 / mobile 390)
1. Header đen cố định 68/60px: logo-reversed, issue line "Issue 010 · The Difference Issue", nav, nút lime "Dựng dịch vụ". Mobile: nút Menu, overlay đen chữ Oswald 42px, Escape đóng + trả focus.
2. Cover: dòng masthead có gạch 2px; H1 Oswald 700 ~11,6vw "KHÔNG CẦN / GIỐNG AI." trên giấy ngà, dòng 2 đè lên dải lime nghiêng -14° kéo sang ảnh; ảnh đen trắng tương phản cao (tông đơ + lược cắt sát gáy, không mặt) cắt chéo ở mép trái, bám mép phải. Mobile: ảnh 3:4 cắt chéo đáy, H1 19vw bên dưới.
3. Statement strip lime: CẮT / MÀU / CÁ TÍNH cỡ lớn, vạch chéo, tĩnh (không marquee).
4. Manifesto: cột ảnh bóng dáng cam (cắt chéo đáy) + tiêu đề lớn, câu chuyện, pull-quote highlight lime, 3 nguyên tắc có đường kẻ trên.
5. Lookbook (nền đen): panel lọc sticky trái (checkbox dạng nút, nhóm Độ dài / Loại / Phong cách / Mức chăm sóc), lưới 3 cột so le (cột giữa lệch xuống như contact sheet), thẻ ảnh + mã LK + caption kiểu index; dialog chi tiết 5:7. Mobile: nút "Tìm phong cách" mở bộ lọc, lưới 2 cột.
6. Craft (nền giấy): bảng editorial 4 hàng, số trong hình bình hành nghiêng, giá tham khảo + thời gian dự kiến, nút "Thêm vào dịch vụ"; ảnh dụng cụ nhuộm cắt chéo ở cột trái sticky.
7. Builder (nền concrete): 3 nhóm lựa chọn nhìn thấy hết (không wizard), summary đen sticky với tổng giá lime lớn, góc cắt chéo; dialog xem trước yêu cầu.
8. People (nền đen): ba thẻ đồ hoạ vạch chéo (không ảnh người), nút "Chọn định hướng này".
9. Space: ảnh salon tràn viền, panel đen cắt chéo 14° bên trái.
10. Process: 4 cột số outline (text-stroke).
11. FAQ: heading sticky + accordion `<details>` nhiều câu mở cùng lúc, dấu +/– trong hình bình hành.
12. Final lime: tiêu đề cỡ poster, monogram lớn, CTA chính "Nhận tư vấn website tiệm tóc" → buildConsultHref('net-lech').
13. Footer đen: logo, điều hướng, tên khổng lồ xám đậm, disclaimer, Credits, dòng ký tên.

## Motion (GSAP + ScrollTrigger, chỉ transform/opacity)
- Hero 1,5s: issue line, tấm lime quét ngang mở ảnh (scaleX, power4.inOut), H1 từng dòng trượt lên (y 44→0), slogan/mô tả/CTA/caption nối tiếp.
- Moment 1: contact sheet Lookbook (thẻ vào so le 70ms). Khi đổi bộ lọc chỉ fade/translate 200ms bằng CSS.
- Moment 2: tấm đen quét chéo mở phần Final lime, rồi tiêu đề, CTA.
- Hover (hover:hover + pointer:fine): ảnh lookbook scale 1,045, mũi tên dịch (3,-3), gạch chân nav mở từ trái, nút đổi màu, số dịch vụ đổi sang lime.
- reduced-motion: matchMedia không đăng ký animation; tấm phủ `display:none`; mọi nội dung hiện ngay.

## Tương tác
- Lookbook Filter: OR trong nhóm, AND giữa nhóm, giữ thứ tự dữ liệu, aria-live số kết quả, empty state có nút xoá, dialog `<dialog>` (Escape, trả focus, khoá cuộn). "Dùng kiểu này làm cảm hứng" thêm dịch vụ gợi ý vào Builder (không trùng, không đổi độ dài tóc) và chuyển focus tới tiêu đề Builder.
- Service Builder: dịch vụ + độ dài + stylist (ba hướng phong cách); giá = làm tròn 1.000đ (giá gốc × hệ số độ dài × hệ số stylist) rồi cộng; thời gian = gốc + phút thêm theo độ dài. Nhuộm + Uốn: cảnh báo, khoá preview, vẫn tính giá. Preview là dialog (ngày không quá khứ, buổi, sao chép yêu cầu mẫu, clipboard lỗi thì hiện textarea). localStorage `demo:net-lech:builder:v1` (chỉ trạng thái builder, validate khi đọc).
