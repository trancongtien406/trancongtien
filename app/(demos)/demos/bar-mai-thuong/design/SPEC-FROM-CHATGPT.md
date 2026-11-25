# Đặc tả rút gọn từ ChatGPT (2 lượt, ngày 2026-11-25)

Đã dùng: tên thương hiệu TẦNG MÂY (3 phương án: Tầng Mây, Dạ Quang, Sau Giờ), slogan "Chạm tầng mây, chạm vị đêm.", giọng văn "bạn - tụi mình", palette (#07080F, #101321, #FF3CAC, #00E5FF, #9B5CFF, #F7F5FF, #B9B9C9), Unbounded + Chakra Petch, cấu trúc section (hero, manifesto, matcher, menu, rooftop, nhịp tuần, đặt bàn, FAQ, footer), copy hero/FAQ, 4 vị Matcher + độ mạnh + có/không cồn, trạng thái empty/lỗi/aria-live/focus vào heading kết quả, quy tắc "chưa xác nhận thì không báo thành công", hiệu ứng: ignite + flicker opacity vài lần/chu kỳ, spotlight fixed + screen blend + tắt trên mobile, marquee nền ~35px/s tăng theo vận tốc cuộn, grain, ly SVG rót, hai đèn quét pink/cyan blend screen, 2 moment cuộn.

Đã bỏ / đổi (quyết định của tôi):
- Thực đơn tự viết lại (16 mục, tên và giá riêng, 14 ly + 2 món nhắm) thay cho danh sách tên tiếng Anh của ChatGPT; giá ghi "Giá tham khảo".
- Khu vực đổi thành Sân thượng mở / Hiên kính / Quầy bar / Góc neon; không khẳng định view biển/cầu.
- Matcher dùng luật chấm điểm riêng (điểm trùng vị, phạt vị nổi bật không chọn, lệch độ mạnh) thay cho công thức 0,7/0,3 của ChatGPT; không loading giả.
- Ly rót chạy theo tiến độ cuộn (scrub, kéo ngược được) thay vì chạy một lần; hero choreography viết bằng CSS keyframes (không chớp nội dung trước hydrate) thay cho gsap.from.
- Bỏ lịch giờ giấc/giờ mở cửa; giờ trong công cụ chỉ là "giờ mong muốn".
- Ảnh: ChatGPT đề xuất ảnh Đà Nẵng, thực tế dùng ảnh stock Pexels không gắn địa danh.
