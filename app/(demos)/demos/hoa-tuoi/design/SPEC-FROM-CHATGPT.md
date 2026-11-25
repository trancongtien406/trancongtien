# SPEC-FROM-CHATGPT — rút gọn (đã lấy được, ChatGPT chế độ khách)

Một lượt hỏi trong tab riêng (đã đóng): ChatGPT trả lời đầy đủ nhưng chỉ ở chế độ khách (chưa đăng nhập), nên đây là bản đặc tả tham khảo, quyết định cuối là của mình (đã đối chiếu với repo và luật AGENT-RULES).

## Dùng nguyên hoặc gần nguyên
- Tên đề xuất: Nở Rừng / Mùa Nở / Lá Thắm. Chọn **Nở Rừng**, slogan "Hoa cho những điều đang nở." Giọng văn giàu hình ảnh, không sến, tránh "số 1", "đẹp nhất".
- Palette: forest #0e3b2c, vermilion #e5532d, lotus #df8fa9, cream #f3eddf (chỉ phụ), leaf #52745a.
- Thứ tự section: hero, manifesto "Hoa không chỉ để ngắm", bộ sưu tập (dịp), khu vườn (gallery), Bouquet Builder, tay nghề, dịp, liên hệ, footer. Đã gộp "dịp" vào danh sách dịp có dẫn vào Builder.
- Hero choreography ~3.2s: nền, ảnh nở bằng mặt nạ cánh hoa, lá trượt từ hai cạnh, tiêu đề mọc từ tâm, phụ đề stagger, CTA + blob morph.
- Mặt nạ cánh hoa: SVG clipPath objectBoundingBox, scale 0.08 -> 1.25 -> 1 (mình dùng 0.04 -> 1.08 -> 1 để không lộ quá khung).
- Blob hoa: ba trạng thái nụ / hé / nở cùng cấu trúc node, sine.inOut, 1.4–2.0s (mình tự nội suy, không dùng MorphSVG).
- Petal canvas: 38 hạt desktop, 14 mobile, kích thước 5–18px, rơi 0.25–1.1px/frame, gió theo vận tốc cuộn (xuống = sang phải, lên = sang trái, làm mượt), DPR ≤2, dừng khi tab ẩn.
- Chữ nở: clip-path từ dưới lên + scale 0.88 -> 1, tách theo dòng/từ, KHÔNG tách ký tự (giữ dấu Việt).
- Parallax lá: 3 tầng, scrub 0.8, xoay ±5°.
- Gallery kéo: card tỉ lệ 4:5, quán tính ~0.92–0.94, phím ←/→/Home/End, mobile cuộn native.
- Reduced motion: không canvas, không parallax, không morph, không quán tính.
- Builder: dịp, ngân sách (300k/500k/700k/1tr/tuỳ chỉnh), tông màu (cam đỏ/hồng sen/trắng kem/nhiều màu), chọn nhiều loại hoa, kích cỡ; xuất SVG, danh sách cành, giá tham khảo, lời thiệp.

## Khác với đề xuất (tự quyết)
- Font: ChatGPT gợi ý Be Vietnam Pro / DM Serif Display. Bỏ vì AGENT-RULES tránh Be Vietnam Pro, DM Serif Display không có subset tiếng Việt. Dùng **Prata** (400, có vietnamese) + **Work Sans** (biến thiên, có vietnamese), kiểm glyph bằng e2e.
- Dịp: bốn dịp theo yêu cầu chủ (Sinh nhật, Khai trương, Cưới, Xin lỗi) thay vì Sinh nhật/Kỷ niệm/Cảm ơn/Không cần dịp.
- Loại hoa: 10 loại (thêm mẫu đơn, mao lương, đồng tiền; bỏ lan hồ điệp). Giá/cành là giá tham khảo do mình đặt (hồng 18k, mao lương 32k, mẫu đơn 70k, tulip 34k, cẩm chướng 12k, hướng dương 22k, đồng tiền 16k, cẩm tú cầu 48k, cúc tana 10k, baby 10k) cộng phí lá xanh và giấy gói theo cỡ. Câu "giá giả lập" của ChatGPT không dùng (chính sách nhãn mục 11); trên trang ghi "Giá tham khảo".
- Mục "Delivery" của ChatGPT ("gửi đến tận nơi") không dùng nguyên: không nêu cam kết giao hàng, thời gian hay phí.
- Footer "Instagram, Facebook, Chính sách giao hoa" bỏ (không có tài khoản/chính sách thật).
