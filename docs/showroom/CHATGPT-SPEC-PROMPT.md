# Mẫu prompt đặc tả cho ChatGPT (mỗi demo một chat, một tab)

Thay các trường trong [ngoặc vuông] bằng thông tin demo của bạn (xem `LANDING_PLAN.md`). Dán nguyên văn bằng `form_input` vào ô "Ask ChatGPT" của tab của bạn (lấy ref bằng `find`), rồi nhấn Return. Nếu ô nhập đã có nháp cũ, `form_input` sẽ ghi đè.

---
Bối cảnh: mình đang xây 10 website demo ngành nghề (thương hiệu minh hoạ do mình thiết kế, không dùng tên/logo doanh nghiệp thật) bên trong site Next.js 16 + Tailwind 4 của mình, route /demos/<slug>, mỗi demo giao diện hoàn toàn riêng (CSS Modules, font riêng, motion riêng GSAP), ảnh stock chụp thật Unsplash/Pexels, tiếng Việt, tương tác client-side mock, noindex, ghi nhãn "Demo". Đoạn chat này CHỈ dành cho 1 website: [ID] [TÊN THƯƠNG HIỆU] ([ngành], /demos/[slug]). Hướng đã thống nhất: [phong cách]; font [heading] (heading) + [body] (body); tương tác: [tương tác 1] + [tương tác 2].
Hãy viết cho mình BẢN ĐẶC TẢ THI CÔNG hoàn chỉnh của riêng website này, đủ chi tiết để một coding agent làm mà không phải hỏi lại:
1) Thương hiệu: tên đầy đủ, ý nghĩa, slogan, giọng văn (kèm 5 ví dụ câu), câu chuyện thương hiệu 120 chữ.
2) Logo SVG: mô tả chính xác từng hình (toạ độ/tỉ lệ trong viewBox), biến thể primary/horizontal/symbol/mono/reversed, cách chữ wordmark dựng (font, tracking), favicon.
3) Palette: mã hex + vai trò + tỉ lệ dùng + cặp màu đạt tương phản AA; quy tắc ảnh (grade màu, tỉ lệ khung, bo góc).
4) Cấu trúc trang từng section theo thứ tự: tên section, bố cục (grid cụ thể, desktop và mobile), nội dung chữ tiếng Việt HOÀN CHỈNH (tiêu đề, mô tả, nhãn nút, bảng giá/menu/dịch vụ/FAQ có dữ liệu giả định rõ ràng), loại CTA.
5) Hai tương tác đặc trưng: trạng thái, dữ liệu mẫu, luật tính, trạng thái lỗi/rỗng, bàn phím.
6) Motion signature: hero choreography có thời gian cụ thể, 2 moment cuộn, hover, tôn trọng reduced-motion.
7) Shot list 10–12 ảnh: chủ thể, góc, ánh sáng, tỉ lệ, vị trí dùng trong trang, 4–6 từ khoá tìm kiếm tiếng Anh trên Unsplash/Pexels cho mỗi ảnh, điều cần tránh (logo thương hiệu thật, mặt nhận diện, watermark).
8) SEO trung thực (title, description, noindex, JSON-LD không bịa review/rating), a11y, và checklist nghiệm thu đo được cho riêng site này.
Trả lời tiếng Việt, có cấu trúc, dùng bảng khi hợp lý. Nếu quá dài thì chia lượt, mình sẽ nhắn "tiếp".
---

Đợi phản hồi: kiểm `document.body.innerText.includes('Response complete')` (hoặc không còn nút Stop) bằng javascript_tool trên tab của bạn, mỗi lần chờ tối đa 10 giây bằng `computer wait`; phản hồi có thể mất 10–15 phút. Đọc kết quả bằng `document.body.innerText.slice(...)` theo từng đoạn ~9000 ký tự.
