# Đặc tả từ ChatGPT (rút gọn) và quyết định của agent

Phiên ChatGPT là phiên chưa đăng nhập; trả lời đầy đủ nhưng cuối cùng hiện cửa sổ đăng nhập (không ảnh hưởng nội dung đã nhận). Khung prompt dùng bản sửa: thương hiệu tự sáng tác, nội dung viết như thật, không nhãn demo, thêm yêu cầu đặc tả hiệu ứng chi tiết. ChatGPT trả lời đủ các mục (A–J); tab đã đóng sau khi đọc.

## Phần dùng được (đã áp dụng)
- Tên: SẬT / THÉP / LÌ, chọn SẬT; slogan "Rèn thân. Lì tâm."; giọng văn câu ngắn, không hứa hẹn; câu chuyện thương hiệu (viết lại ngắn gọn trong trang).
- Logo: khung vuông + chữ S gấp khúc + thanh ngang (đã tự vẽ lại và dựng wordmark thành path).
- Palette: Concrete 950 #2b2d2f, 800 #414447, 500 #8a8d8f, 100 #e5e6e3, Chalk #f5f5f0, Acid #c6ff00, Ink #151617; quy tắc không dùng #8a8d8f cho chữ nhỏ, không chữ trắng trên acid.
- Thứ tự section: thanh/nav, hero, marquee outline, giới thiệu, 4 chương trình stacking, Workout Picker, không gian ảnh, lịch lớp, counter, gói tập, FAQ, CTA, footer. (Giữ gần như nguyên, thêm khối "thanh tạ tăng tải theo cuộn" giữa chương trình và bộ chọn.)
- 4 chương trình: Strength, Conditioning, Functional, Foundation. Gói tập 4 mức (180.000 / 1.200.000 / 1.550.000 / 1.900.000 theo ChatGPT; agent đổi thành Buổi thử 180.000, Thẻ 12 buổi 1.550.000, Tháng mở 1.900.000, Gói 3 tháng 5.100.000 để có cả gói dài hạn; tất cả ghi "giá tham khảo").
- Picker: luật chọn bài theo mục tiêu/dụng cụ/trình độ, không chọn ngẫu nhiên hoàn toàn, mở rộng sang bài chỉ cơ thể nếu thiếu và hiện nhãn "Đã điều chỉnh lựa chọn"; timer dựa mốc thời gian (không cộng dồn setInterval), đồng bộ khi tab quay lại, âm thanh mặc định tắt, aria-live chỉ báo khi đổi pha, phím Space/R; checkbox xác nhận khởi động bắt buộc; cảnh báo an toàn; EMOM số lần bảo thủ; trạng thái lỗi/rỗng; cảnh báo rời trang khi đang chạy (beforeunload).
- Lịch lớp: bộ lọc loại/khung giờ/HLV; HLV là nhãn vai trò + nhân vật vector, không ảnh; mobile xếp dọc.
- Hiệu ứng: hero timeline ~2.1s (agent dùng ~2.4s), outline text tô theo cuộn, stacking cards (sticky + scale), counter chỉ là thông số cấu trúc bài (20s/10s/8), rung CTA ±2px, 3 nhịp, ~0.2s, debounce 350ms, giảm biên độ trên cảm ứng; thanh tạ SVG nâng theo cuộn; stencil reveal; reduced-motion tắt chuyển động nhưng timer vẫn chạy.
- Shot list 12 ảnh (gần như đã ghép được ~10 mục; không có ảnh lưng/kettlebell phù hợp nên thay bằng chi tiết tay, bàn chân, xà).

## Phần agent bỏ hoặc đổi (và vì sao)
- Font: ChatGPT đề xuất Oswald (đã dùng ở Nét Lệch), Be Vietnam Pro (tránh làm chữ chính), Black Ops One (không có glyph Việt) và IBM Plex Mono (trùng họ IBM Plex ở Khối Nếp). Dùng Big Shoulders Display + Chivo + JetBrains Mono.
- Hero H1 "Không tập cho có. Tập cho ra chất": thay bằng chữ khổng lồ "SẬT" (h1) kèm dòng "Rèn thân. Lì tâm.".
- Nhiều nhãn tiếng Anh (MOVE WITH PURPOSE, THE FLOOR...): đổi sang tiếng Việt để trang đọc tự nhiên cho khách Việt.
- Lịch lớp: ChatGPT bảo đặt `schedulePublished=false` và không hiển thị như lịch thật. Yêu cầu của chủ dự án là có công cụ lịch lớp tuần, nên giữ lịch, nhưng ghi rõ "khung giờ có thể điều chỉnh theo từng tuần và được xác nhận khi trao đổi", không khẳng định đặt chỗ.
- Form tư vấn có họ tên/liên hệ ngay trong lịch: BỎ theo AGENT-RULES mục 11 (không thu thập PII trong demo; chuyển đổi cuối luôn là link `buildConsultHref("sat-gym")`).
- Modal chi tiết lớp: thay bằng thẻ lớp đủ thông tin + tóm tắt lớp quan tâm (không modal để giảm rủi ro focus trap).
- Thời lượng 40 phút và EMOM 5/8/10 phút: dùng 15/20/30 phút để gắn chặt với bộ đếm Tabata 20/10 xoay vòng và EMOM 60 giây.
- JSON-LD: không dùng (ChatGPT cho phép loại không bịa; chọn không dùng).
- Câu "Giao diện minh họa trạng thái bộ đếm" trong mẫu của ChatGPT: không đưa vào trang (cấm chữ minh hoạ).
