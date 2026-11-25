# Mây Kẹo — BRAND (LP-12, tiệm bánh ngọt) · trạng thái NEEDS_OWNER_REVIEW

- Tên: **Mây Kẹo** (`translate="no"` chưa cần vì có dấu, nhưng nên giữ nguyên khi dịch). Mây = bông kẹo bồng bềnh, Kẹo = vị ngọt vui. Slogan: "Ngọt vừa đủ, vui vừa đủ." Tên do mình sáng tác (ChatGPT không dùng được, xem SPEC-FROM-CHATGPT.md).
- Logo: tự vẽ. Symbol = đám mây kẹo hồng có mặt cười, viền sô-cô-la, viền nhãn dán trắng ngoài, vài sợi cốm màu trên đỉnh. Wordmark "Mây Kẹo" Baloo 2 800 chuyển thành path (fontTools, chạy trong thư mục tạm, không cài vào repo). Bộ file trong `public/images/demos/tiem-banh/identity/`: symbol, logo-primary, logo-horizontal, logo-reversed, logo-primary-reversed, logo-mono, favicon.svg, favicon-32.png, apple-touch-icon.png, og-image.webp (1200x630).
- Palette (token `--mk-*`): peach #FFB9A8 (nền hero, quy trình) · pink #FF9DBB (Cake Builder, kết) · mint #A8E8CC (tủ bánh, hỏi đáp) · butter #FFE27D (bảng nhãn dán, điểm nhấn) · lilac #D6C8FF (thẻ) · choco #46251A (chữ, viền, nền xen kẽ) · paper #FFF3EC (thẻ/panel, không dùng làm nền trang) · pink-2 #FF6F98 (nút, nhấn). Choco trên mọi nền pastel đạt AA (>= 6:1).
- Font: **Baloo 2** (biến thiên 400-800, heading) + **Nunito** (biến thiên 200-1000, body). Cả hai OFL, subset vietnamese + latin + latin-ext, `next/font/local`, `adjustFontFallback:false`, vietnamese đứng trước latin. Fredoka bị loại vì không có subset tiếng Việt.
- Giọng văn: gần gũi, vui, câu ngắn, không tuyên bố vô căn cứ (không "số một", "tươi 100%", không số khách/năm/giải).
- Liên hệ trong footer: `chao@maykeo.example`, `0236 000 0000`, "Đà Nẵng". Không địa chỉ/giờ mở cửa.
- Tra cứu tên: WebSearch "Mây Kẹo" tiệm bánh Đà Nẵng cho thấy không có kết quả trùng ở web. KHÔNG tra được Google Maps, Facebook, Zalo, WIPO, Cục SHTT từ môi trường này. Chủ cần tự tra trước khi dùng thật.
- Chính sách nhãn (mục 11): trang không có chữ Demo/minh hoạ/giả định/mô phỏng/dữ liệu mẫu; e2e quét tự động.
