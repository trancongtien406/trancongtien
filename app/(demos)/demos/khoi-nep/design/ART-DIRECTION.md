# ART-DIRECTION — Khối Nếp: "bản vẽ tạp chí kiến trúc"

Ẩn dụ: một số tạp chí kiến trúc đóng gáy lưới; mọi thứ nằm trên lưới 12 cột, góc vuông, đường kẻ 1px, số thứ tự section "01 / …". Khác trang spa (vòm cong organic) và cafe (poster đồ hoạ viền đậm): không bo góc, không màu loè loẹt, ảnh phẳng chữ nhỏ, chữ khổng lồ chỉ ở masthead + footer.

## Section (desktop 1440 / mobile 390)
1. **Header** sticky 80/64px, nền Paper, viền dưới ink. Logo ngang lớn (56px cao), nav 4 mục, CTA đặc "Dự toán ngân sách ↗". Mobile: nút MENU, panel danh sách lớn có đường kẻ, Escape đóng.
2. **Cover hero**: thanh issue-line (Số 08 · Mùa 2026 / Studio… / Thiết kế & thi công nội thất) → khung ảnh full 12 cột cao clamp(600, 78svh, 880). Masthead KHỐI NẾP 224px mực ink trên tường sáng phía trên ảnh; H1 trắng + mô tả + 2 CTA (đặc "Bắt đầu dự án ↗" → form tư vấn thật; ghost "Thử dự toán chi phí") dưới đáy, gradient cục bộ; caption ngoài ảnh. Mobile: cao clamp(560,128vw,760), gradient mạnh hơn, CTA xếp dọc.
3. **Manifesto**: cột 1–3 sticky (nhãn + ảnh vân gỗ 1:1 + "Fig. 01"), cột 5–12 H2, câu chuyện 120 chữ, pull quote viền terracotta, 3 nguyên tắc cột. Mobile: xếp dọc, không sticky.
4. **Selected spaces**: 4 concept lưới bất đối xứng (1–7 / 9–12 lệch 96px / 1–4 / 6–12 lệch 64px), tỉ lệ 3:2, 3:4, 3:4, 16:10; thông tin dạng chú thích dưới ảnh; dialog `<dialog>` native.
5. **Services**: cột trái sticky H2 + ảnh bếp; cột phải bảng hàng (index · mô tả · giá tham khảo + CTA chọn sẵn phạm vi). Không pricing card.
6. **Budget Estimator**: khung viền ink 12 cột — form 7 cột nền White, "phiếu dự toán" 5 cột nền Ink (số khoảng lớn, cơ sở, breakdown, cách tính, lưu/sao chép/đặt lại).
7. **Materials**: 6 mẫu vuông 2 cột lưới + băng ảnh bếp/tắm 21:9; mobile 2 cột.
8. **Board builder**: điều khiển trái 5 cột, bảng mood 4:3 (gỗ lớn + đá/vải) + palette 5 ô + danh sách đã lưu phải 7 cột (sticky). Xuất PNG 1600×1200 bằng canvas.
9. **Process**: ảnh bàn ăn 21:9 + 4 cột có đường kẻ dọc, số khổng lồ terracotta; mobile timeline dọc.
10. **FAQ**: 4/8 cột, accordion một câu mở.
11. **Closing** nền Ink 8/4 cột; **Footer** Ink: 4 nhóm + wordmark ngang trang.

## Motion (GSAP + ScrollTrigger, chỉ transform/opacity)
- Hero (≈2s): ảnh scale 1.06→1 (1.8s); từng ký tự masthead trượt lên sau khung clip (0.9s, stagger 50ms); đường kẻ scaleX từ trái; H1/mô tả hiện y 22→0.
- Cuộn 1: mọi đường kẻ `[data-rule]` scaleX 0→1 (1s) một lần.
- Cuộn 2: ảnh `[data-veil]` mở ra bằng lớp che giấy scaleY 1→0 (1.1s) một lần; lớp che tạo bằng JS nên không JS thì ảnh hiện đủ.
- Cuộn 3: board "lắp ráp" (gỗ x −16, đá/vải y 12, palette lần lượt).
- Hover (chỉ hover+pointer fine): ảnh concept scale 1.03; FAQ fade 0.3s.
- reduced-motion: gsap.matchMedia không chạy gì; CSS tắt animation/transition.

## Tương tác
- Estimator: công thức C = A×F×(D hoặc R), khoảng −10%/+20% làm tròn ra ngoài theo triệu; lỗi cạnh ô, aria-invalid, trạng thái rỗng, ↑↓ ±5 m², localStorage `portfolio:lp08:budget:v1`, aria-live debounce 300ms.
- Board: 3 nhóm radio (có dấu ✓), 3 preset, xác nhận ghi đè khi đã chỉnh, lưu tối đa 20, xoá hai bước, autosave nháp 500ms, xuất PNG/TXT/sao chép.
- Phản biện ChatGPT đã nhận: giảm H1 (88px), thêm ✓ trạng thái chọn, mã phiếu dự toán KN-EST-01. Chưa làm: editorial spread xen giữa concept, mỗi concept một cách trình bày riêng.
