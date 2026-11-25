# Bến Vị — BRAND (LP-05, nhà hàng hải sản) · trạng thái NEEDS_OWNER_REVIEW

- Tên: **Bến Vị** (hiển thị `translate="no"`). Bến = nơi neo lại, Vị = hương vị của biển và của bữa ăn. Slogan: "Vị biển, trọn cuộc vui."
- Thương hiệu, thực đơn, giá do Trần Công Tiến sáng tác; liên hệ dùng miền `.example`. Trang không dùng nhãn trong nội dung; lời công khai nằm ở trang credits và thanh nổi chung.
- Logo: tự vẽ. Symbol = đĩa tròn nhìn từ trên (viền) + mặt trời + 3 làn sóng. Không dùng icon con cua/tôm/mỏ neo. Wordmark "Bến Vị" Fraunces 600 chuyển thành path (fontkit, chạy trong thư mục tạm, không cài vào repo). Bộ file: `identity/` logo-primary, logo-primary-reversed, logo-horizontal, logo-reversed, logo-mono, symbol, favicon.svg, favicon-32.png, apple-touch-icon.png, og-image.webp (1200x630, có nhãn minh hoạ).
- Palette (token `--bv-*`): sea-950 #061922 (nền chính) · sea-900 #0A2733 (section xen kẽ) · sea-800 #0F3446 · gold #E2BA79 (CTA, nhấn) · cream #F4E9D2 (chữ trên nền tối) · paper #F1E5CC + ink #1A1410 (tờ thực đơn, phiếu) · ember-ink #A9421D (nhãn trên giấy). Cặp chính: cream/sea-950 ~14:1, gold/sea-950 ~10:1, ink/paper ~14:1, ember-ink/paper ~5:1.
- Font: **Fraunces** (biến thiên 100-900, heading, dùng 560/italic 400) + **Barlow** 400/500/600/700 (body). Cả hai OFL, subset vietnamese + latin + latin-ext, `next/font/local`, `adjustFontFallback:false`, vietnamese đứng trước latin. Fraunces đủ glyph tiếng Việt nên không phải thay font.
- Giọng văn: gần gũi, câu ngắn giàu hình ảnh, không tuyên bố vô căn cứ ("số một", "tươi 100%").
- Tra cứu tên: KHÔNG truy cập được Google/Maps/Facebook/Zalo/WIPO/Cục SHTT từ môi trường này. "Bến Vị" là cụm từ phổ thông nên rất có thể trùng nhà hàng có thật; chưa xác nhận. Chủ cần tự tra trước khi dùng ngoài mục đích demo.

## Chính sách nhãn (2026-11-25, AGENT-RULES mục 11)
Trang landing và công cụ không còn các chữ "Demo", "minh hoạ", "giả định", "mô phỏng", "dữ liệu mẫu", chip "Ảnh minh hoạ". Giá ghi "giá tham khảo"; công cụ đặt tên theo chức năng. Vẫn giữ: không đánh giá/số liệu/chứng nhận giả, liên hệ `.example`, không khẳng định đã gửi/đặt, noindex. Trang credits ghi: "Thương hiệu, nội dung và hình ảnh trên trang này do Trần Công Tiến thiết kế để giới thiệu phong cách thiết kế website; ảnh là ảnh stock có ghi công bên dưới." e2e có kiểm quét toàn bộ văn bản hiển thị. Có `meta.ts` cho registry.
