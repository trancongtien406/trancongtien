# Đặc tả từ ChatGPT (rút gọn) và quyết định

ChatGPT chạy ở chế độ khách (chưa đăng nhập), nhận câu hỏi rút gọn và trả lời trọn một lượt (không bị treo). Tab đã đóng sau khi đọc xong.

## Nhận được
- 3 tên: Ô Lưới / Nếp Work / Trạm Mở. Chọn **Ô LƯỚI** (slogan ChatGPT: "Một ô riêng. Một không gian rộng mở."; mình rút gọn lại khi viết trang).
- Giọng văn: ngắn, tự tin, không quảng cáo quá đà ("Chọn chỗ ngồi phù hợp. Tập trung vào điều bạn đang xây dựng.").
- Logo: khung vuông lưới 3x3, một ô cam ở giữa, không bo góc, không gradient; wordmark Bai Jamjuree SemiBold viết hoa; toạ độ nhỏ bằng Space Mono.
- Palette: #0b0b0c / #f4f4f2 / #ff5a1f / lưới rgba(244,244,242,.10). Font: Bai Jamjuree (tiêu đề) + Space Mono (số liệu, nhãn).
- Nội dung: hero ("Tìm đúng chỗ ngồi"), 4 khối giá trị (Linh hoạt, Tập trung, Kết nối, Sẵn sàng), 3 gói (Hot desk 1,2tr; Bàn cố định 2tr; Phòng riêng từ 6tr), 8 tiện ích, 6 FAQ, CTA cuối.
- 6 hiệu ứng: grid reveal (đường lưới lần lượt, ô toạ độ stagger 35ms, ô cam sáng cuối), hero choreography ~1,8s (nền 0 / lưới 150 / logo và toạ độ 350 / headline 500 / mô tả 1000 / CTA 1250 / seat map 1500), text scramble (500-800ms, 30-40ms/khung, chỉ scramble ký tự ASCII và số), live seat map (snapshot theo khung giờ, transition 250ms, nhãn chữ cho trạng thái, không chỉ dùng màu cam, bàn phím, aria-label), cursor crosshair (hai đường 0,45 opacity, tắt trên mobile và khi nhập liệu), pricing live (số cũ fade-out, số mới fade-in 250ms, thẻ scale .99 -> 1). Bảng reduced-motion cho từng hiệu ứng.

## Đã bỏ / sửa
- Mọi chữ "giá giả định", "DEMO DATA", "đề xuất để xây dựng bảng giá", "lưu ý cần xác nhận trước khi công bố" (vi phạm chính sách nhãn): viết lại như thương hiệu thật, giá ghi "Giá tham khảo".
- "Internet tốc độ cao", "ổn định" (ngầm cam kết hiệu năng): đổi thành mô tả chức năng không nêu tốc độ/uptime.
- Dữ liệu "lấy từ backend đặt chỗ": sơ đồ chỉ là mật độ chỗ thường gặp theo giờ/ngày, nhãn "mật độ thường gặp", không khẳng định còn chỗ thật.
- Toạ độ hero "16°03'N 108°13'E": giữ dạng chung (Đà Nẵng) để không chỉ ra địa chỉ.

## Tự quyết (ChatGPT không đưa)
Bố cục chi tiết từng section, công thức tính gói của Seat & Plan Picker, đồng hồ ngày làm việc, shot list ảnh, FAQ chỉnh lại, bảng giá phòng họp/phòng riêng theo sức chứa: ghi ở ART-DIRECTION.md, ASSETS.md.
