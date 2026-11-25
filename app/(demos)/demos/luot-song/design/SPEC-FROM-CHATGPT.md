# Đặc tả rút gọn từ ChatGPT (chế độ khách) + quyết định của agent

Ngữ cảnh: ChatGPT chỉ dùng được ở chế độ khách; gửi một câu rút gọn (thương hiệu, cấu trúc 9 section, đặc tả hiệu ứng, luật planner, bảng mùa sóng). ChatGPT trả lời đủ trong một lượt (không bị cắt/treo); tab đã đóng. Không gửi thông tin cá nhân.

## ChatGPT đề xuất (dùng được)
- Tên: RÁNG SÓNG (chọn), Sóng Mơ, Bờ Rì Rào. Slogan "Chạm sóng, bắt nắng, sống hết mình".
- 9 section: hero "Đừng chỉ ngắm biển. Hãy cưỡi sóng!", tuyên ngôn "Biển không cần hoàn hảo. Chỉ cần bạn dám thử.", khoá học "Chọn con sóng của bạn", quy trình 4 bước "An toàn trước. Niềm vui theo sau.", Lesson Planner, điều kiện sóng, FAQ, CTA "Sóng không chờ mãi đâu!", footer.
- Hiệu ứng: 4 lớp sóng (#0f8b8d 26px/18s, #f3b562 18px/22s, #f26b21 12px/15s, #3a1f12 8px/26s) translateX 0 -> -50%, biên độ theo cuộn qua CSS var; marquee nền nâu, chữ vàng, viền cam, 24s/vòng, hover chậm; tem tròn 144px textPath quay 0-360 theo cuộn, mặt trời tâm; mặt trời 280px nhô lên 110px -> 0 trong 1.2s, 12 tia; ván lướt 220x55 trượt theo Bézier, xoay theo tiếp tuyến, splash; textPath ±8px 6s (mobile ±4); film grain 180px, opacity .10-.16, steps(4); mobile giảm số lớp sóng; reduced-motion tắt.
- Planner: trình độ (chưa biết/biết đứng/đã lướt) x tuổi (6-12/13-17/18-39/40+) x số buổi (1/2/3/5) x khung giờ (sáng sớm 5:30-8:00, sáng 8-10, chiều muộn 15:30-17:30); bảng khoá theo trình độ-số buổi; thứ tự bài học an toàn -> chèo -> pop-up -> đọc sóng; giá mẫu 650k / 1.2tr / 1.65tr / 2.5tr / lớp riêng 1.2tr / kids 750k; checklist 7 món; bảng 12 tháng; chú thích "điều kiện do HLV đánh giá mỗi buổi".

## Agent tự quyết (khác ChatGPT)
- Tên khoá đổi sang tiếng Việt (Buổi Làm Quen, Nhập Môn Sóng Trắng, Đứng Vững, Nền Tảng Trọn Vẹn, Đứng Đẹp, Điều Ván, Trại Tiến Bộ, Chỉnh Kỹ Thuật, Đường Sóng, Tiến Bậc Sóng, Sóng Nhí). ChatGPT chỉ cho giá cho 6 khoá; giá của khoá "biết đứng/đã lướt" theo số buổi do agent tự đặt (700k-2.8tr, 800k-3.3tr), ghi "Giá tham khảo".
- Bỏ "EST. 2026" và mọi số/tuyên bố về thâm niên (quy tắc không bịa hồ sơ). Không dùng tiếng Anh trong tiêu đề chính.
- Bảng mùa sóng của ChatGPT bị đơn giản hoá và có chỗ lệch với mô tả chung; agent viết lại ngắn, chỉ ở mức "thường", 5 mức độ lớn sóng; không dự báo, không khẳng định an toàn, mọi tháng đều kèm "điều kiện thực tế do huấn luyện viên quyết định mỗi buổi".
- Biểu diễn mùa sóng bằng vòng tia nắng 12 tháng + đồng hồ nước ở tâm thay vì lịch màu; sóng không dùng 4 lớp mà 5 lớp (ẩn 2 lớp dưới 640px).
- Ván lướt chạy theo đường chấm nét riêng (không bám sóng đang chuyển động) vì sóng chuyển động ngang vô hạn không có đường cố định.
- Chưa dùng các số liệu của ChatGPT như "12 tia 30°" cho mặt trời; dùng 28 tia xen kẽ cam/vàng.
