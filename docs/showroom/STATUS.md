# STATUS — 10 demo ngành nghề (2026-11-25)

Route: `/demos/<slug>` (noindex, thanh Demo trung thực + nút về `/lien-he?industry=&solution=&utm_campaign=`). Chỉ mục: `/demos` (trong layout `(site)`). Trang `/solutions/<ngành>` hiển thị thẻ demo thật thay khung trống. Hợp đồng agent: `AGENT-RULES.md`. Kế hoạch: `portfolio/LANDING_PLAN.md`.

Số test dưới đây do điều phối viên TỰ CHẠY LẠI sau khi các agent báo xong (`BASE=http://localhost:3100 node tests/showroom/<slug>/e2e.mjs`).

| Demo | Ngành | Font (heading / body) | e2e | Ảnh |
|---|---|---|---|---|
| mien-an | Spa | Cormorant Garamond / Be Vietnam Pro | 107 pass, 0 fail | 12 stock Pexels |
| hien-man | Villa | Lora / Manrope | 121 pass, 0 fail (+22 unit giá/lịch pass) | 12 Pexels |
| rong-dam | Tour VI/EN | Bricolage Grotesque / Lexend (DM Sans không có glyph Việt) | 136 pass, 0 fail | 12 (11 Unsplash, 1 Pexels) |
| rot-nhiet | Cafe | Anybody / Space Grotesk | 82 pass, 0 fail | 12 Unsplash |
| ben-vi | Hải sản | Fraunces / Barlow | 70 pass, 0 fail | 12 Pexels |
| mien-cuoi | Nha khoa | Plus Jakarta Sans / Public Sans | 94 pass, 0 fail | 12 Pexels |
| nep-tho | Pilates | Lexend (Sora thiếu glyph Việt) / Mulish | 107 pass, 0 fail | 12 Pexels |
| khoi-nep | Nội thất | IBM Plex Sans / IBM Plex Serif | 86 pass, 0 fail | 12 Pexels |
| thang-mo | Ảnh cưới | Playfair Display / Josefin Sans (Jost thiếu glyph Việt) | 152 pass, 0 fail | 11 Pexels |
| net-lech | Tiệm tóc | Oswald / Archivo | 113 pass, 0 fail | 12 Pexels |

Không có ảnh AI trong cả 10 demo. `tsc --noEmit` không lỗi ở file demo/showroom; ESLint: 0 lỗi (14 cảnh báo) cho `app/(demos)`, `features/showroom`, `app/(site)/demos` sau khi thêm ngoại lệ hai luật React Compiler cho `app/(demos)` trong `eslint.config.mjs`.

## Differentiation Gate (`tests/showroom/differentiation.mjs`, báo cáo `differentiation-report.txt`)
- Bố cục, cấu trúc DOM, chữ: mọi cặp đều vượt ngưỡng; composite 0,61–0,77 (ngưỡng 0,35 desktop / 0,28 mobile). Bản sao cố ý (cùng bố cục, đổi màu/chữ) bị bắt ở cả 2 viewport.
- 18 cặp/kiểm tra KHÔNG đạt, gần như chỉ ở chỉ số bảng màu: 5 demo nền kem/trắng sáng (mien-an, mien-cuoi, nep-tho, thang-mo, rong-dam). Cặp giống thật nhất: mien-an ↔ nep-tho (kem + xanh rêu). Hero rot-nhiet ↔ net-lech (chữ khổng lồ trái, ảnh phải) gần nhau ở desktop (0,24 so với ngưỡng 0,25) và mien-an ↔ rot-nhiet ở mobile.
- Ngưỡng do ChatGPT đề xuất, chưa kiểm chứng; cách đo màu thô (histogram 2-bit). Gate chỉ phát hiện nghi vấn.

## Việc CHỦ DỰ ÁN phải làm/duyệt (máy không làm được)
1. Tra trùng tên 10 thương hiệu (Google, Maps, Facebook, Zalo, WIPO, Cục SHTT). Cụm phổ thông dễ trùng: Bến Vị, Miền Cười, Tháng Mơ. Miên An Wellness gần "An Miên Spa" (có trên Klook). Mọi `BRAND.md` ghi `NEEDS_OWNER_REVIEW`.
2. Duyệt từng ảnh và logo; ảnh Khối Nếp hero/olive-walnut là ảnh nhân màu; ảnh nhiều ảnh phòng (villa) không cùng một công trình.
3. Nội dung y tế (Miền Cười) chưa được bác sĩ thẩm định; không dùng cho phòng khám thật khi chưa duyệt.
4. Nhãn địa danh vài ảnh tour (my-son-thap, son-tra-phat, hue-dai-noi) theo mô tả nguồn, chưa xác minh độc lập.
5. Quyết định có đổi bảng màu Nếp Thở / Tháng Mơ hoặc hero Nét Lệch để Gate đạt hết hay không.

## Điểm yếu chung (thật)
- Chỉ test Chrome headless. Chưa Safari/Firefox, trình đọc màn hình, thiết bị thật, Lighthouse/axe, đo bundle, `next build` production; tương phản chủ yếu tính tay.
- Cookie giới thiệu `tct_ref` chưa kiểm được thật (cần đối tác APPROVED trong DB): e2e chỉ kiểm link thoát đúng và demo không tự ghi cookie.
- Một root layout duy nhất: JSON-LD "identity" của site chính và `<title>` mặc định vẫn nằm trong HTML demo (mỗi demo tự đặt title/description; noindex). Bản EN của Rong Dặm đặt `lang="en"` bằng wrapper + script, không phải HTML server-render.
- Thanh Demo cố định che một phần đáy màn hình (đặc biệt mobile); có nút "Ẩn".
- Dev server cần khởi động lại để nhận `allowedDevOrigins` (đã thêm vào `next.config.ts`); mở bằng `localhost`, không dùng `127.0.0.1` cho đến lúc đó.
- Đã thêm `gsap@3.15.1` vào `package.json`; `package-lock.json` bị ghi lại bởi `npm ci/install` (file này đã có thay đổi chưa commit của chủ repo từ trước).
- Chưa thêm demo vào `sitemap.ts` (demo noindex; trang `/demos` có thể thêm nếu muốn index).
- Repo vẫn còn ~107+ thay đổi chưa commit của chủ; không có commit nào do phiên này tạo.
