# Đặc tả từ ChatGPT (chế độ khách, một lượt, đã đóng tab)

Gửi một câu rút gọn (chưa đăng nhập nên không dùng khung prompt đầy đủ). ChatGPT trả lời đủ ba phần; tab đã đóng ngay sau khi đọc.

## ChatGPT đề xuất (dùng)
- 3 tên: Nâu Nung, Đất Mơ, Men Nhà. Chọn **Đất Mơ** ("Nặn nên điều bạn mơ"). Lý do bỏ Nâu Nung: tra WebSearch thấy trang "Nâu làm gốm" ở Cẩm Lệ, Đà Nẵng, quá gần.
- Câu chuyện thương hiệu (80 chữ) và 5 câu giọng văn: dùng làm gốc cho hero, câu chuyện, CTA ("Đất trong tay, bình yên trong lòng", "Cùng đất kể một câu chuyện").
- 10 sản phẩm + giá: giữ tên và giá của 6 món (Cốc Đất Mộc 145k, Bình Nắng 320k, Bình Đất 490k, Bát Mây 165k, Đĩa Biển 250k, Cốc Men Ngọc 185k); đổi các món Đế hương/Chân nến/Khay/Bộ trà thành Lọ Sương, Bình Than, Bát Chậm, Bình Tro vì vẽ được bằng bàn xoay SVG.
- 3 buổi: Chạm Đất (nặn tay, 90 phút, 250k), Xoay Đất (bàn xoay, 120 phút, 350k), Phủ Men (vẽ men, 90 phút, 290k). ChatGPT gộp phí nung vào giá; mình tách thành +70.000 ₫/người có nung để công cụ có lựa chọn "có/không nung".
- Hiệu ứng: bàn xoay SVG (8-12 điểm điều khiển, thanh độ phình 0-100%, chu kỳ quay 6s, settle ~400ms), chữ khắc (stroke rồi fill, stagger 45-70ms), vết nung #A85D42 -> #C47A56 -> #3C9B91 theo cuộn, gallery kéo ma sát 0.92-0.95, ảnh méo hover 3-8px.

## Tự quyết (ChatGPT không cung cấp hoặc không hợp)
- Màu nền: ChatGPT gợi ý nền kem #F3EBDD. Bỏ, dùng terracotta #b4532a / nâu đất #3b2418 theo yêu cầu.
- Font: ChatGPT gợi ý Playfair Display/Cormorant (đã dùng ở trang cũ). Dùng Yeseva One + Patrick Hand + Nunito Sans.
- Bàn xoay: không làm ghim cuộn mà làm bình quay thật bằng path nội suy (9 bán kính, Catmull-Rom), kéo ngang/thanh trượt/cuộn đều đổi hình.
- Ảnh méo: ChatGPT gợi ý WebGL; dùng thư viện SVG feDisplacementMap có sẵn.
- Không có: logo SVG chi tiết, shot list, SEO, nghiệm thu (câu hỏi rút gọn không xin). Tự làm.
