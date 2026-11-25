# QA · Nét Lệch (LP-10) — kết quả THẬT, 2026-11-25

## Lệnh đã chạy
- `BASE=http://localhost:3100 node tests/showroom/net-lech/e2e.mjs` (Playwright + Chrome headless, dev server dùng chung). Lần chạy cuối, sau lần sửa CSS cuối cùng: **113 pass, 0 fail**.
- `npx tsc --noEmit -p . | grep net-lech`: 0 lỗi. `npx eslint "app/(demos)/demos/net-lech"`: 0 lỗi/cảnh báo (1 dòng eslint-disable có lý do cho hydrate localStorage).
- Một lần chạy giữa chừng bị lỗi "Execution context was destroyed" ở bước chụp ảnh (dev server tải lại trang); chạy lại thì qua. Không phải lỗi logic.

## Phủ của e2e
1. Tải trang: HTTP 200, 0 lỗi console, 0 request ngoài origin, title/description riêng, noindex, favicon + og-image theo route, 1 h1, 8 kiểu lookbook, 8 FAQ, 12 ảnh stock không lặp, không từ cam kết, có nhãn giả định/minh hoạ, không SĐT/email/Zalo, JSON-LD chỉ WebPage, /credits 200 + 12 ảnh + noindex + liệt kê font.
2. Không tràn ngang ở 320/390/768/1024/1440.
3. Font: face next/font loaded; Oswald 700 và Archivo 400 có glyph ă â ê ô ơ ư đ + Ắ…Ự; đo canvas dấu chồng (Ế Ỗ Ấ Ầ Ố Ự Ệ Ề Ờ Ử) đều khác chữ gốc; Ệ khác font hệ thống; chữ NFC.
4. reduced-motion: mọi [data-nl]/reveal/thẻ lookbook hiện đủ, tấm phủ hero/closing tắt; chế độ bình thường kết thúc ở trạng thái hiện đủ.
5. Lookbook: OR/AND (Ngắn=4, Ngắn+Vừa=5, Ngắn+Nổi bật=1, Vừa+Nổi bật=0 → empty state), giữ thứ tự, aria-live, xoá bộ lọc, dialog (Enter mở, Escape đóng, focus trong/trả focus, khoá cuộn), "Dùng kiểu này làm cảm hứng" thêm Cắt+Nhuộm vào Builder, không đổi độ dài, focus tới tiêu đề Builder.
6. Builder: rỗng (0đ, preview disabled); 6 ca tính giá; Nhuộm+Uốn (cảnh báo, disabled, vẫn tính 1.680.000đ, không tự đổi lựa chọn); localStorage khôi phục / dữ liệu sai ID / JSON hỏng về mặc định / không lưu ngày; "Thêm vào dịch vụ" không trùng; chọn stylist; dialog preview (nhãn không phải lịch xác nhận, ngày quá khứ báo lỗi + aria-invalid/describedby, sao chép thành công, clipboard lỗi hiện textarea, Escape + trả focus, link tư vấn buildConsultHref); Đặt lại.
7. Bàn phím: Tab tới CTA trong 8 lần, focus-visible, màu chữ nút; FAQ bằng bàn phím và mở nhiều câu; mọi link tư vấn có industry/solution/utm_campaign; link Credits; dòng ký tên; touch target ≥44px; `?ref=` vẫn render, demo không ghi cookie tct_ref, /lien-he nhận ref.
8. Mobile 390: menu (Escape + trả focus), bộ lọc thu gọn/mở, Dài = 3 kiểu.
9. Ảnh chụp (tests/showroom/net-lech/screenshots): hero-1440/768/1024/390, full-1440, full-390-*, dialog-1440, builder-1440, credits-390. Đã tự xem hero 1440/390, các lát toàn trang desktop và mobile, dialog, builder, og-image, logo.

## Lỗi tìm thấy và đã sửa nhờ ảnh chụp/test
- Chữ nút bị `.brand a{color:inherit}` ghi đè (nút đen chữ đen): đổi reset sang `:where(.brand)`.
- Mobile: H1 tràn ngang và đè lên ảnh tối: giảm cỡ, bỏ chồng, đổi tỉ lệ ảnh.
- Lưới lookbook không so le (nth-child đặt sai phần tử), khoảng cách nhóm lọc, chip ảnh bị clip-path cắt, tên khổng lồ ở footer cụt dấu Ệ/É: đã sửa.
- Link "Xem lookbook" cao 21px: sửa ≥44px.
- Sai số số thực làm 1.046.500 thành 1.046.000: thêm epsilon, làm tròn nửa lên.

## Lệch so với đặc tả ChatGPT
- Ca "Cắt + Chăm sóc / Dài / Senior": đặc tả ghi 966.000đ, công thức đặc tả (làm tròn từng dòng, nửa lên) cho 403.000 + 564.000 = **967.000đ**; e2e dùng 967.000đ. Các ca còn lại khớp (250.000, 300.000, 1.047.000, 1.080.000, 1.365.000).
- Ảnh có mặt (Soft Wolf, French Bob…) thay bằng ảnh sau gáy/chi tiết; tên kiểu tóc đặt theo ảnh (xem SPEC-FROM-CHATGPT.md).

## Chưa kiểm / yếu
- Chưa chạy `tests/showroom/differentiation.mjs` (so khác biệt với 7 demo); chỉ tự so bằng mắt: khác Rót Nhiệt (giấy ngà + lime + chữ condensed + đường chéo 14° so với poster đỏ/đen viền đậm).
- 320px chỉ kiểm tràn ngang, chưa xem ảnh; chưa kiểm Safari/Firefox, thiết bị thật, màn hình đọc, Lighthouse, kích thước bundle.
- Animation GSAP kiểm bằng trạng thái cuối, không đo thời lượng/FPS.
- Tương phản lime trên giấy (1,09:1) được tránh có chủ đích; chưa chạy công cụ đo tự động trên toàn trang.
- Ảnh "gay-undercut" và "keo-luoc" có phần tai/đầu nhìn nghiêng từ sau, không thấy mặt; chủ nên duyệt từng ảnh.
- Tên thương hiệu chưa tra Maps/Facebook/Zalo/WIPO/Cục SHTT (xem BRAND.md).

## Chính sách nhãn mới (mục 11)
Đã bỏ mọi chữ "Demo", "minh hoạ", "giả định", "mô phỏng" và chip ảnh khỏi trang, meta, alt/aria, og-image, logo; credits giữ lời công khai trung thực. e2e có kiểm tra quét toàn bộ văn bản hiển thị; xem kết quả chạy cuối trong báo cáo.
