# ART DIRECTION — SẬT Gym (brutalist bê tông)

Ý tưởng: một căn phòng bê tông bị phóng to quá cỡ. Viền dày 4px, bóng cứng không mờ (offset 6 đến 10px), lưới thô 96px, nhãn stencil dạng ô acid, chữ Big Shoulders 900 hoa khổng lồ, ảnh đen trắng. Màu: xám than #2b2d2f, xám bê tông #8a8d8f/#414447, acid #c6ff00, mực #151617, bột magie #f5f5f0. Nền sáng chỉ dùng cho bộ chọn bài tập và hỏi đáp để đổi nhịp (sáng/tối xen kẽ), không có nền kem.

## Bố cục từng section (desktop 1440 / mobile 390)
1. **Header**: sticky 72px (64px mobile), nền than 94%, viền dưới acid 3px. Logo ngang, 5 link mono hoa, nút "Chọn bài tập" acid có rung. Mobile: nút menu 48px vuông viền dày, panel toàn màn hình, link chữ 40 đến 64px, focus trap, Escape trả focus.
2. **Hero** (cao ≈ 100svh trừ header): ảnh nhà tập đen trắng + lớp halftone + grain; 4 đường lưới dọc; nhãn stencil "Đà Nẵng | Strength & Conditioning Club"; chữ **SẬT** rỗng viền cỡ min(46vw, 51svh) bên trái; cột phải: "Rèn thân. Lì tâm." (acid), mô tả, 2 nút; đáy là thanh thông số 20 giây làm / 10 giây nghỉ / 8 hiệp (Counter) + ghi chú tabata. Mobile: một cột, chữ SẬT cỡ 46vw, 2 nút full width.
3. **Băng chữ chạy** (nền acid, viền ink): "Rèn thân / Lì tâm / Từng rep..." xen kẽ chữ rỗng viền ink và chữ đặc; VelocityMarquee tăng tốc theo vận tốc cuộn, có nút Dừng.
4. **Giới thiệu**: 2 cột (chữ 1.05fr, ảnh dọc 0.95fr có bóng acid); h2 "Bê tông ở ngoài." (rỗng, tô theo cuộn) + "Kỷ luật ở bên trong."; đoạn tuyên ngôn sáng dần theo cuộn; 3 ô stencil "Di chuyển / Nâng / Lặp lại". Mobile: chữ trước, ảnh sau.
5. **Chương trình**: 4 thẻ xếp chồng sticky (top 84px, lệch 14px, thu nhỏ 3.5% mỗi lớp), mỗi thẻ một tông (xám 800, chalk, acid, xám 500), số 01 đến 04 rỗng viền khổng lồ (tô khi rê), ảnh đen trắng 40%. Mobile: ảnh ngang 150px phía trên, chữ 16px.
6. **Tăng tải**: nền ink, vùng cao 320svh, khung ghim 100svh; trái: tiêu đề + 4 bước (bước đang active sáng acid); phải: số kg khổng lồ (20 đến 110) + thanh tạ SVG nâng lên và trượt từng đĩa 20/15/10 kg vào hai đầu, rung nhẹ mỗi khi thêm đĩa. Mobile: cùng cấu trúc, số kg 72 đến 110px, chỉ bước active hiện mô tả.
7. **Chọn bài tập** (nền c100): form 4 nhóm chip (mục tiêu, thời gian, trình độ, dụng cụ) sticky trái (chỉ khi màn đủ cao), kết quả phải (nền ink, bóng acid): danh sách 5 đến 6 động tác, nút chuyển Tabata/EMOM, Đổi bài khác, khối cảnh báo khởi động viền acid có dải hazard + checkbox bắt buộc, đồng hồ lớn đổi màu theo pha (acid = làm, xám = nghỉ, chalk = xong), nút CTA "Nhờ SẬT xem lại bài này".
8. **Không gian tập**: lưới 12 cột lệch (7/5, 3/4, 7/5) các ảnh khung viền dày, parallax nhẹ, ClipReveal trượt, chú thích số thứ tự "01 SÀN TẬP". Mobile: 2 cột, ảnh đầu và ảnh 4 chiếm hàng.
9. **Lịch lớp tuần** (nền c800): 4 nhân vật HLV vector + "Tất cả HLV" (radio), bộ lọc loại lớp và khung giờ (pill), đếm kết quả (role=status), lưới ngày (4 cột ≥1280, 3 cột ≥1000, 2 ≥700, 1 cột mobile), thẻ lớp có giờ lớn, nút Chọn lớp (aria-pressed), khối tóm tắt nền chalk có "Tư vấn lịch tập" (link) và "Sao chép tóm tắt".
10. **Nhịp tập** (nền acid): "Một rep. Một nhịp. Một lần tập trung." + 4 số khổng lồ rỗng viền ink tô khi vào khung (20s, 10s, 8, 60s) = thông số cấu trúc bài, có ghi chú không phải thành tích.
11. **Gói tập**: 4 thẻ (Buổi thử, Thẻ 12 buổi, Tháng mở nổi bật acid, Gói 3 tháng), giá BSD 46 đến 64px, "Hỏi gói này" dẫn tới tư vấn; ghi "Giá tham khảo".
12. **Hỏi đáp** (nền c100): tiêu đề dính trái, 6 câu `<details>` viền dày, mở = đầu câu hỏi chuyển acid.
13. **CTA cuối**: ảnh đĩa/thanh tạ trong sương, dải hazard trên cùng, "Tạ xuống sàn." (rỗng, tô theo cuộn) + "Bắt đầu từ đây.", nút acid lớn "Nhận tư vấn buổi tập đầu".
14. **Footer**: logo, 3 cột, ghi chú an toàn, link "Ảnh & ghi công", dòng "Website do Trần Công Tiến thiết kế", chữ SẬT khổng lồ rỗng viền cắt ở đáy.

## Motion (bộ hiệu ứng khác các landing còn lại)
Thư viện (≥4): StackingCards, Counter, VelocityMarquee, ScrollScrubText, ClipReveal, ParallaxLayer, GrainOverlay, CustomCursor (con trỏ vuông acid có nhãn), ScrollProgress (thanh acid 4px trên cùng).
Riêng (≥2): **OutlineText** (chữ rỗng viền tô theo cuộn / theo vị trí chuột / khi rê / khi vào khung, bằng 3 biến CSS đăng ký bằng @property), **Shake có kiểm soát** (±2px, ±0.4°, 3 nhịp, 0.2s, tối đa 1 lần/350ms/nút, ±1px trên cảm ứng), **thanh tạ SVG nâng theo cuộn**, **đồng hồ tabata/EMOM chạy thật**, **nhãn stencil lộ dần** (clip-path trái sang phải), halftone CSS ở hero.
- Hero choreography ≈ 2.4s (nhường cuộn: tua nhanh x5 nếu cuộn sớm): ảnh nền phóng 1.12 về 1 (0 đến 1.5s), 4 đường lưới kẻ (0.1s), logo clip (0.2s), nhãn stencil (0.35s), chữ SẬT đóng dấu từ dưới lên (0.45s) rồi quét axit (1.05s đến 2.5s) kèm rung 0.22s, khẩu hiệu/mô tả (0.9s), nút (1.25s), thanh thông số trượt lên (1.4s).
- Moment cuộn: (1) ảnh hero trôi 12% + chữ SẬT tô theo cuộn khi rời hero + nội dung mờ dần; (2) thanh tạ SVG scrub; (3) thẻ chương trình xếp chồng; (4) nhãn stencil mở theo lô; (5) tiêu đề rỗng viền tô theo cuộn.
- Hover/con trỏ (chỉ pointer fine): chữ SẬT tô theo vị trí chuột, nút dịch -3px và bóng lớn dần, thẻ lớp nâng 4px, ảnh gallery bỏ bớt trắng đen, nav gạch chân scaleX.
- Micro-interaction công cụ: chip tô acid, nút Tạo bài tập rung, đồng hồ đổi nền theo pha, nút Bắt đầu rung.
- Reduced-motion: không chạy hero timeline, không scrub, không ghim barbell (hiện đủ 110 kg), không stencil/reveal, không rung, marquee thành dòng tĩnh; đồng hồ vẫn chạy.
- Mobile/touch: không con trỏ tuỳ chỉnh, không tô theo chuột, rung ±1px.
