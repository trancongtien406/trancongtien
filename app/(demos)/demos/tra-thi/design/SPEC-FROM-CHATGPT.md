# Đặc tả rút gọn từ ChatGPT (tab riêng, đã đóng)

Đã hỏi ChatGPT 3 lượt: (1) 3 tên thương hiệu, (2) đặc tả thi công (nội dung, logo, palette, section, công cụ), (3) đặc tả hiệu ứng + shot list. Quyết định cuối là của người làm; các điểm KHÔNG theo ChatGPT được ghi bên dưới.

## Tên
Ba phương án: Mộc Trà, Tịch Trà, Trà Ẩn. Chọn **Tịch Trà** (slogan "Một chén trà, vạn khoảng lặng"). ChatGPT nhắc: tên ngắn dễ trùng, cần tra Cục SHTT, tên miền, mạng xã hội.

## Dùng được
- Giọng văn: trầm, thiền, mộc, tinh tế; tránh "đỉnh cao, số một, thần dược, cam kết hiệu quả".
- Thứ tự section: Hero, Tuyên ngôn, Ba nghi thức, Danh mục, Tea Pairing, Tóm tắt buổi trà, Không gian, FAQ, Footer.
- Logo: con dấu đỏ son (hình vuông viền hơi lệch) + wordmark Newsreader 500 tracking ~0.12em. Màu đỏ son ChatGPT đề xuất #a84235 (đã dùng).
- Tea Pairing: ba trường tâm trạng / thời điểm / đồ ăn ảnh hưởng kết quả; kết quả ghi rõ không phải đánh giá sức khoẻ; đồng hồ đếm giờ phải tính theo mốc thời gian (timestamp), không chỉ đếm interval, không tự phát âm thanh (đã làm: chuông chỉ khi bật ô "Chuông báo").
- Tóm tắt buổi trà: số người, khung giờ, bộ trà, ghi chú; nút sao chép + nút dẫn tới form tư vấn thật.
- Hiệu ứng: hero choreography nhiều mốc, ink-reveal mask loang từ điểm (như giọt mực), scroll-scrub chữ xám khói sang giấy ngà, path draw nét cọ (round cap), parallax lá nhẹ, hơi nước canvas (object pool, dừng khi ẩn), chuyển cảnh mực chỉ ở điểm quan trọng, hover nhẹ, reduced-motion = hiện tĩnh.

## Không theo
- ChatGPT đề xuất section "giấy ngà" sáng xen kẽ: bỏ, chủ yêu cầu nền tối ấm không kem.
- Hero dài 4,8s: rút còn ~1,1s chuyển cảnh mực + ~2s choreography (quy tắc preloader <= 1,2s).
- Dùng GenUI/issueNewTurn trong nút: không áp dụng; nút cuối luôn là buildConsultHref.
- Giá và dữ liệu 12 loại trà tự biên soạn (data/tea.ts), không dùng bảng của ChatGPT.
