# Đặc tả rút gọn từ ChatGPT (chế độ khách, 1 lượt)

ChatGPT chỉ dùng được ở chế độ khách (không đăng nhập). Đã gửi một câu rút gọn (thương hiệu, logo, 4 hiệu ứng, Pairing Finder + thực đơn, shot list ảnh). Phản hồi đầy đủ, không bị cắt. Tab đã đóng ngay sau khi đọc. Không gửi thông tin cá nhân hay đường dẫn máy.

## Phần lấy từ ChatGPT
- Ba tên: Nếp Vang, Mộc Vang, Chén Nguyệt. ChatGPT chọn Nếp Vang. **Quyết định cuối (tự quyết): Mộc Vang**, vì "Nếp" đã nằm trong hai thương hiệu khác của bộ (Nếp Thở, Khối Nếp), cần khác biệt; "Mộc" gợi gỗ, thùng sồi, bàn gỗ, hợp ý "hầm rượu".
- Slogan do ChatGPT gợi: "Chạm vị vang, chạm khoảnh khắc." Đã đổi thành "Chậm lại một ly vang." (ngắn hơn, đúng giọng "không vội").
- Palette: burgundy #4a0e1a, antique gold #c08a4a, ivory #eadfc9 (đổi nhẹ thành #f0e4cf cho tương phản), midnight #171112 (đổi thành #1c040a ngả đỏ).
- Hiệu ứng (thời gian/easing ChatGPT): curtain 900-1100 ms cubic-bezier(.76,0,.24,1) (dùng đúng easing này, tổng ≤1,2 s); pour = path dashoffset + clipPath dâng mực (dùng); spotlight radial theo con trỏ qua CSS variable, mobile tĩnh (dùng); nến SVG 2-3 lớp scaleY/rotate/opacity chu kỳ 1,2-2,4 s (dùng: 2 lớp lửa + quầng, chu kỳ 1,3 / 2,1 / 3,4 s).
- Reduced motion: rèm bỏ, pour hiện đủ, spotlight bỏ tracking, nến tĩnh (đã làm đúng như vậy).
- Pairing Finder: trục món (bò, hải sản, phô mai, món Việt, pasta, tráng miệng) x dịp (hẹn hò, bạn bè, kỷ niệm, thư giãn) x khẩu vị x loại x độ đậm x độ ngọt x ngân sách; luôn trả 3 lựa chọn, không tên nhà sản xuất (đã làm).
- Thực đơn 14 dòng theo phong cách nho + giá ly/chai tham khảo (dùng cấu trúc 14 dòng, tự viết lại tên theo "kiểu ...", ghi chú vị và giá).
- Shot list: hero ly dưới nến, rót vang, ánh nến, hầm thùng sồi, phô mai/charcuterie, tay rót tại bàn (đã dùng); rèm nhung burgundy và quầy da/gỗ không tìm được ảnh phù hợp nên dùng ảnh tealight nền rèm đỏ làm hero và vẽ rèm bằng CSS.

## Phần ChatGPT KHÔNG dùng (hoặc tự quyết khác)
- Gợi ý font Cormorant Garamond/Playfair Display/Be Vietnam Pro/Montserrat: trùng font đã dùng, bỏ. Chọn Noto Serif Display + Nunito Sans (có glyph Việt, đã đo).
- Cấu trúc landing (Philosophy, Collection, Finder, Experience, Gallery, Visit, Footer): tự thiết kế lại thứ tự và bố cục riêng (hero tranh dưới đèn rọi, dải chữ, câu chuyện, rót vang, xoay ly, nhãn lật, thực đơn tab, món nhắm, căn phòng kéo ngang, Pairing + tóm tắt đặt bàn, hỏi đáp).
- "Visit Us: địa chỉ, bản đồ, giờ mở cửa": bỏ (quy tắc mục 11: không địa chỉ/giờ mở cửa thật).
- "EST. 2026": bỏ (không bịa năm thành lập).
- Menu 4 tab Red/White/Rosé/Sparkling tiếng Anh: đổi sang tiếng Việt.
- Chưa hỏi ChatGPT về chi tiết logo SVG theo toạ độ: tự vẽ (vòng đai thùng + ly có vạch mực + giọt), ghi trong BRAND.md.
