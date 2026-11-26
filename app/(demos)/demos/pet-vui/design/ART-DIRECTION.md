# ART-DIRECTION — Bông Xù (LP-19)

Ngôn ngữ: sticker-bold cartoon phẳng. Màu cơ bản đậm (vàng/xanh/đỏ/trắng/đen), viền đen 4px (8px cho hình tròn lớn), bóng đổ CỨNG lệch (7–10px, không blur), hình tròn lớn làm khung ảnh, chữ tròn dày (Coiny). Khác tiệm bánh pastel (Mây Kẹo): không pastel, không kem chảy, không confetti; viền đen + màu thuần.

## Bố cục (desktop 1440 / mobile 390)
1. Header: pill trắng viền đen dính đầu trang; logo ngang + 4 liên kết + nút "Chọn gói" (đuôi vẫy). Mobile: nút tròn vàng mở bảng menu (Escape đóng, trả focus).
2. Hero (vàng): trái chip + h1 "Tắm xinh, tỉa chất, *cưng hết nấc!*" (chữ nhảy theo từ, cụm nhấn là viên thuốc xanh), dòng "Cho boss thật [SlotText]" , lead, 2 nút. Phải: đĩa xanh 580px viền đen + bóng cứng chứa ảnh Shiba tròn; 6 nhãn dán kéo thả (Thơm tho!, Xinh xỉu!, dấu chân, xương, bong bóng, tim). Mobile: xếp dọc, đĩa 100% rộng, nhãn dán thu 66%, ẩn 2 nhãn.
3. Dải chữ đen/vàng: velocity marquee, dấu chân đỏ ngăn cách.
4. Giới thiệu (trắng): đĩa ảnh mèo (ClipReveal tròn) + 3 gạch đầu dòng.
5. Gói (xanh, CircleWipe): 4 thẻ (vàng/trắng/đỏ/trắng) với ảnh tròn nhô lên khỏi mép thẻ; hover thẻ = bọt xà phòng canvas. 4 cột → 2 → 1.
6. Công cụ (vàng): form trắng (5 bước: loài, cân nặng, độ dài lông, tình trạng, mục tiêu + ô cờ da) bên trái; bảng kế hoạch xanh bên phải (dính cuộn ≥1000px): gói gợi ý, thời gian, giá tham khảo, danh sách bước, cảnh báo thú y, nút tư vấn + sao chép.
7. Quy trình (đỏ): 5 thẻ xếp chồng dính (StackingCards), mỗi thẻ có số lớn, tiêu đề, mô tả, ảnh tròn.
8. Thư viện (vàng): 3 đĩa ảnh có nhãn xoay nhẹ (ClipReveal tròn).
9. Tuyên ngôn (đen): chữ vàng sáng dần theo cuộn (ScrollScrubText).
10. Hỏi đáp (trắng): details/summary, mở thì nền vàng.
11. Kết (xanh với đĩa vàng lớn): h2, nút tư vấn, 5 nhãn dán kéo thả. Chân trang đen.

## Chuyển động (khoảng 12 hiệu ứng, 4 từ thư viện + riêng)
Thư viện: VelocityMarquee (dải chữ), ClipReveal circle (đĩa ảnh), StackingCards (quy trình), ScrollScrubText (tuyên ngôn), SlotText (hero), MagneticButton (CTA hero và CTA cuối), ScrollProgress (thanh đỏ trên cùng).
Riêng (tự viết trong thư mục demo): PawCursor (dấu chân theo con trỏ, phóng khi rê nút, đóng dấu khi bấm, vệt dấu chân mờ dần tối đa 7), DragStickers (Pointer Events + bàn phím, thả nảy 0,45s back.out 1.4), BounceWords (nhảy 0,16em + nảy nhỏ 0,04em, so le 55ms; hero vào bằng back.out 1.2), BubbleHost (canvas bọt xà phòng, rAF chỉ khi có bọt), WagButton (đuôi vẫy CSS khi hover/focus), CircleWipe (clip-path loang từ cạnh trên theo cuộn, xong thì giữ), hero choreography (đĩa → ảnh → nhãn dán bật lần lượt 0,1s → 1,4s).
Reduced-motion: không con trỏ chân thú, không nhảy/vẫy/loang/marquee dịch; bọt thay bằng 3 vòng tĩnh; mọi nội dung hiện đủ. Touch: không con trỏ; bọt chạm thẻ nổi 6 bóng.

## Tương tác công cụ
Luật tính ở `data/care.ts` (cân nặng quyết định giá nền và hệ số thời gian; độ dài lông nhân giá và thời gian; mỗi tình trạng thêm bước + phụ phí; mục tiêu thêm bước tỉa/ủ-massage; mèo có bước và ghi chú riêng). Trạng thái rỗng liệt kê mục còn thiếu; cờ da bật cảnh báo mạnh "hỏi bác sĩ thú y trước"; cảnh báo chung luôn hiện. Lưu localStorage (try/catch). Không thu họ tên/SĐT; hành động cuối là liên kết tới `buildConsultHref("pet-vui")`.


Ghi chú rework 2026-11-25: nội dung, section và hiệu ứng đã đổi, xem design/REWORK.md (bản này mô tả giao diện gốc; công cụ chọn gói nay là section "Ước tính cho bé", bảng giá/quy trình/lịch hẹn là section chính, hiệu ứng đại trà chỉ còn MagneticButton).
