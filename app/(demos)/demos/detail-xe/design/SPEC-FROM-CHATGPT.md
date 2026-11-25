# Đặc tả từ ChatGPT (chế độ khách, một lượt rút gọn)

ChatGPT chỉ dùng được ở chế độ khách; đã gửi một câu rút gọn (phong cách, bảng màu, yêu cầu 3 tên + nội dung + đặc tả hiệu ứng). Phản hồi trọn vẹn, không bị cắt. Tab đã đóng sau khi đọc.

## Dùng
- Tên: 01 GƯƠNG PHẨM (chọn), 02 KIM TUYẾN AUTO, 03 TĨNH QUANG DETAILING. Slogan: "Đánh thức vẻ đẹp nguyên bản."
- Giọng văn: điềm tĩnh, chính xác, nói bằng quy trình và vật liệu; câu ngắn; tránh "đẹp nhất Đà Nẵng".
- 5 gói + giờ + giá khởi điểm (350k / 2,5tr / 4,5tr / 900k / 700k; 90-120 phút, 6-10 giờ, 1-2 ngày, 3-5 giờ, 2-3 giờ) và 6 câu FAQ trung thực: dùng gần nguyên văn.
- Hiệu ứng: shine sweep quét (góc -15 đến -25 độ, 0.8-1.4s, ease-out, không lặp liên tục, không dùng đỏ); light streak theo scroll progress (mix-blend screen, blur 12-20px); scrub bẩn -> sạch bằng 2 lớp + mask; counter 1.6s một lần; slider 42px viền bạc, hỗ trợ bàn phím; ánh sáng theo con trỏ trên thẻ (radial 220px, bạc .12); hero timeline ~2.8s; không bounce, parallax <20px, giảm hiệu ứng khi reduced-motion/mobile.
- Gợi ý "70% cảm giác cao cấp đến từ ảnh và typography": giữ hiệu ứng ở vai trò hoàn thiện.

## Quyết định khác với ChatGPT
- Font: ChatGPT đề xuất Be Vietnam Pro / Inter (repo yêu cầu tránh). Dùng Saira (tiêu đề, số) + Noto Sans (nội dung).
- Code carbon của ChatGPT (repeating-linear-gradient 45/-45) cho vân sọc, không giống dệt sợi; thay bằng 4 linear-gradient kiểu twill 6px.
- Scrub "ảnh bẩn / ảnh sạch cùng góc máy": không có cặp ảnh stock thật cùng một xe, và chính sách nhãn cấm trình bày trước-sau như ca thật. Dùng một ảnh xe sạch + lớp bụi vẽ bằng CSS (sepia tối + nhiễu SVG), ghi rõ trong chip ảnh và trang credits.
- Slider "trước/sau hiệu chỉnh" của ChatGPT đổi thành "Bề mặt chưa phủ / Đã phủ" (hai ảnh stock của hai bề mặt khác nhau), kèm giải thích nguyên lý và ghi chú không phải ca thật.
- Bố cục theo ChatGPT (Hero, Triết lý, Dịch vụ, Before/After, Quy trình, FAQ, CTA, Footer) được mở rộng: thêm Package Builder và gallery kéo ngang. Footer không có địa chỉ/giờ/hotline thật (dùng .example và số không gọi được).
- Số liệu "120+ phút", "06 bước" ChatGPT ghi "dữ liệu minh hoạ": bỏ, thay bằng số thật suy ra từ chính bảng gói (5 gói, tối đa 24 bước, 90 phút đến 2 ngày, từ 350.000 ₫).
