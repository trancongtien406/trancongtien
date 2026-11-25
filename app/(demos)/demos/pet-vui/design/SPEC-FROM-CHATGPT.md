# SPEC-FROM-CHATGPT (LP-19 Bông Xù) — một phần, tab khách, đã đóng tab

Mở tab ChatGPT riêng (chế độ khách, chưa đăng nhập) và gửi một câu hỏi rút gọn (không phải toàn bộ khung 8 mục của CHATGPT-SPEC-PROMPT, vì không có tài khoản và dễ bị cắt/treo). ChatGPT trả lời được: 3 tên + slogan, và đặc tả 6 hiệu ứng. Phần còn lại (logo, palette, cấu trúc trang, nội dung chữ, công cụ, shot list, SEO, nghiệm thu) do agent tự quyết, ghi ở BRAND.md / ART-DIRECTION.md / ASSETS.md.

## Phần lấy được từ ChatGPT (rút gọn)
Tên đề xuất: Gâu Mew ("Tắm xinh – Tỉa chất – Cưng hết nấc!"), Bông Xù ("Biến boss thành cục bông đáng yêu!"), Tít Tắp ("Sạch thơm một cái, xinh ngay một nấc!"). ChatGPT khuyên chọn Bông Xù (mềm mại, sạch, hợp hình tròn/sticker, không bó chó hay mèo). Đã chọn Bông Xù.

Hiệu ứng (thời gian/easing ChatGPT gợi ý, đã chỉnh khi cài):
1. Paw Cursor: mặc định → dấu chân; hover link → phóng nhẹ; click → đóng dấu; 120–180ms; cubic-bezier(.2,.8,.2,1). Reduced/touch: tắt, dùng con trỏ hệ thống.
2. Sticker kéo thả: hover nổi; nhấc 180ms, snap 350ms; ease nảy nhẹ. Reduced: không xoay, không nảy.
3. Word Bounce: 220ms/từ, stagger 45ms, một lần khi vào khung. Reduced: chữ tĩnh.
4. Bubble Canvas: hover thẻ gói tắm → 6–10 bong bóng bay lên, mờ dần, 0,9–1,3s; giới hạn DPR/số hạt, chỉ chạy khi hover. Reduced: 2–3 bong bóng SVG tĩnh.
5. Wagging Tail: hover nút → đuôi hiện và vẫy chu kỳ 450ms; click giật nhẹ 180ms. Reduced: đuôi đứng yên.
6. Big Reveal (moment cuộn): mascot tròn lớn trượt vào + sticker nhỏ xuất hiện, 650–850ms; Intersection Observer, một lần, không khoá cuộn.
Nguyên tắc chung ChatGPT nêu: viền đen 3–4px, bóng lệch cứng 4–6px, mobile không phụ thuộc hover, luôn định vị "Pet Spa & Grooming" (không phải phòng khám thú y).

## Quyết định của agent (khác/thêm so với ChatGPT)
- Moment cuộn thật sự cài: "CircleWipe" (khối xanh loang từ cạnh trên như vòng bọt, scrub clip-path, loang hết một lần thì giữ) thay cho Big Reveal; hero disc + ảnh + nhãn dán vào bằng CSS.
- Bounce của chữ: nhảy 0,16em rồi nảy nhỏ 0,04em, không overshoot lớn.
- Đuôi vẫy cũng bật khi focus bàn phím (không chỉ hover).
- Thương hiệu, palette, font (Coiny + Quicksand), công cụ, cấu trúc, nội dung: agent tự viết.
