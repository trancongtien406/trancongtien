# REWORK-STANDARD — sửa 30 landing: đúng đề tài thực tế + không lặp hiệu ứng (2026-11-25)

Phản hồi của chủ dự án: (1) nhiều landing LẶP animation giống nhau; (2) nhiều landing chưa chú tâm vào NỘI DUNG và ĐỀ TÀI THỰC TẾ — ví dụ trang "giáo dục" phải là giới thiệu MỘT TRUNG TÂM NGOẠI NGỮ cụ thể (khoá học, giáo viên, học phí, lịch khai giảng, đăng ký học thử), không phải một trang nói chung về "học tập". Mọi landing phải đọc như website thật của một doanh nghiệp thật ở Đà Nẵng.

Đọc kèm `AGENT-RULES.md` (mục 9–12 vẫn hiệu lực, đặc biệt mục 11: không chữ Demo/minh hoạ/giả định/mô phỏng; không bịa hồ sơ). Giữ nhận diện thị giác riêng đã có (màu, font, logo, ảnh, hero concept đẹp) — đây là sửa NỘI DUNG + HIỆU ỨNG, không làm lại từ đầu.

## A. Chuẩn nội dung "như doanh nghiệp thật"
1. Trang là WEBSITE CỦA MỘT DOANH NGHIỆP CỤ THỂ trong ngành, không phải demo của một công cụ hay một ý tưởng. Công cụ tương tác (builder/finder/planner...) chỉ là MỘT section hữu ích trong trang, đặt tên theo từ vựng của ngành, không phải "bản thân" của trang.
2. Màn hình đầu (hero) phải trả lời trong 5 giây: đây là gì (loại hình cụ thể: ví dụ "Trung tâm ngoại ngữ: IELTS, giao tiếp, tiếng Nhật, tiếng Hàn"), ở đâu (Đà Nẵng, tối đa cấp quận), dành cho ai, làm gì tiếp (CTA đúng hành vi của ngành: Đăng ký học thử / Đặt bàn / Đặt lịch / Xem căn hộ / Nhận báo giá...), kèm 3 sự thật cụ thể (giá từ, giờ phục vụ, ưu đãi/điểm khác biệt) — KHÔNG chỉ khẩu hiệu mơ hồ hay chữ trang trí.
3. Cấu trúc section phải là bộ mà website thật của ngành đó có (8–12 section): bạn tự xác định bằng (a) hiểu biết về ngành ở Việt Nam, (b) WebSearch/WebFetch vài website công khai cùng ngành để HỌC CẤU TRÚC (không sao chép chữ/ảnh/mã của họ), (c) có thể hỏi ChatGPT. Mỗi section có nội dung cụ thể, dùng được: tên dịch vụ/sản phẩm/khoá học/món/phòng thật, mô tả, thời lượng, đối tượng, giá, quy trình, chính sách, câu hỏi thường gặp thực tế của ngành, cách liên hệ/đăng ký.
4. Được phép viết như doanh nghiệp thật: giờ mở cửa/giờ học, bảng giá, lịch khai giảng/lịch lớp/thực đơn, chính sách đặt cọc/huỷ, quy trình làm việc, đội ngũ theo VAI TRÒ (nhân vật vector, tên gọi chức danh, không tên người thật, không bằng cấp), địa điểm cấp quận ("Quận Sơn Trà, Đà Nẵng"), mô tả cơ sở vật chất.
5. VẪN CẤM (hồ sơ bịa): lời chứng thực/đánh giá sao/xếp hạng; số học viên/khách/ca/công trình/năm kinh nghiệm cụ thể; điểm số/kết quả đạt được; giải thưởng/chứng nhận/giấy phép/bằng cấp/số hiệu; tên người thật; địa chỉ đường cụ thể, số điện thoại/email thật (dùng `.example`/`0236 000 0000`); logo/tên doanh nghiệp thật; cam kết y tế/pháp lý/tài chính; JSON-LD Review/Rating/LocalBusiness/Offer. Trang vẫn `noindex`. Công cụ không thu họ tên/SĐT, không khẳng định đã gửi.
6. Kiểm tra đề tài: tự đặt câu hỏi "chủ một [ngành] ở Đà Nẵng nhìn trang này có nhận ra đây là website của họ không?". Nếu đề tài lệch (quá trừu tượng, sai loại hình, thiếu thứ khách thật cần), sửa hẳn đề tài, đổi tên section, thậm chí tên thương hiệu (cập nhật BRAND.md, meta.ts, logo nếu cần) — ghi lý do.
7. Tiếng Việt tự nhiên, cụ thể, có thông tin; không câu sáo rỗng ("hành trình", "trải nghiệm đẳng cấp") thay cho nội dung.

## B. Chuẩn hiệu ứng "không lặp"
Số liệu hiện tại: ScrollScrubText 20/30 trang, VelocityMarquee 18, MagneticButton 17, ClipReveal 16, SVGPathDraw 14, ScrollProgress 13, ParallaxLayer 13, SplitWords 12. Quy tắc mới:
1. Tám hiệu ứng "đại trà" (ScrollScrubText, VelocityMarquee, MagneticButton, ClipReveal, SVGPathDraw, ScrollProgress, ParallaxLayer, SplitWords): mỗi landing chỉ giữ TỐI ĐA 2 cái, theo bảng phân bổ ở mục C. Bỏ các cái còn lại (không thay bằng cái đại trà khác).
2. Mỗi landing có ≥4 hiệu ứng "chữ ký" RIÊNG gắn với nghiệp vụ của ngành (ví dụ: lịch lớp tự chạy, đồng hồ pha trà, sơ đồ ghế, bình gốm nặn được), trong đó ít nhất 3 phải là code riêng của landing, KHÔNG dùng ở landing khác. Hiệu ứng thư viện ít dùng (xem cột "thư viện chữ ký" ở mục C) được khuyến khích.
3. Hero choreography, kiểu chuyển cảnh section, hiệu ứng hover của thẻ/nút, và hiệu ứng con trỏ PHẢI khác các landing còn lại trong cùng nhóm màu/phong cách (tra cột phong cách ở PLAN-20 và PLAN trước đó). Không cùng một kiểu "fade-up + stagger" cho mọi section: mỗi landing chọn một ngôn ngữ chuyển động chính (ví dụ: ink-loang, lật thẻ, trượt ngang, quay, nảy, kéo thả, quét sáng, vẽ nét) và dùng nhất quán.
4. Giữ các hiệu ứng riêng đã đẹp và gắn đề tài; chỉ thay những cái trùng/đại trà/không có lý do kinh doanh. Tôn trọng reduced-motion, mobile, hiệu năng (0 long task >200ms), nút ≥44px.
5. Kiểm bằng số: chạy `node scripts/showroom-effects-matrix.mjs` (điều phối viên có sẵn) — landing của bạn không được vượt hạn mức đại trà và phải đạt ≥4 chữ ký; báo số trước/sau.

## C. Bảng phân bổ (mỗi landing: tối đa 2 hiệu ứng đại trà được GIỮ | thư viện chữ ký gợi ý)
Viết tắt: SST ScrollScrubText · VM VelocityMarquee · MB MagneticButton · CR ClipReveal · SP ScrollProgress · SW SplitWords · PD SVGPathDraw · PL ParallaxLayer.
| # | slug | giữ tối đa | thư viện chữ ký gợi ý |
|---|---|---|---|
| 01 | mien-an | CR, PL | CursorSpotlight |
| 02 | hien-man | PL, SP | CurtainReveal |
| 03 | rong-dam | PD, MB | PinnedHorizontalScroll |
| 04 | rot-nhiet | VM, MB | Odometer, ShineSweep |
| 05 | ben-vi | CR, SW | TiltCard |
| 06 | mien-cuoi | SST | StickyChapters |
| 07 | nep-tho | PD, SP | StackingCards |
| 08 | khoi-nep | SW, PL | PinnedHorizontalScroll |
| 09 | thang-mo | CR, SST | DraggableGallery |
| 10 | net-lech | VM, SW | ImageHoverDistort |
| 11 | bar-mai-thuong | VM, SST | CursorSpotlight |
| 12 | tiem-banh | MB, SP | TiltCard, BlobMorph |
| 13 | tra-thi | PD, SST | (giữ hiệu ứng mực riêng) |
| 14 | glamping-nui | PL, SP | PinnedHorizontalScroll (đã có) |
| 15 | lan-bien | SW, PD | ImageHoverDistort, StickyChapters |
| 16 | phuot-xe | VM, MB | Odometer |
| 17 | hoa-tuoi | CR, PD | DraggableGallery, BlobMorph |
| 18 | sat-gym | SP | StackingCards, TextScramble |
| 19 | pet-vui | MB, SW | BlobMorph |
| 20 | da-xanh | PL, CR | CursorSpotlight |
| 21 | nail-pop | VM, SW | SlotText |
| 22 | ngoai-ngu-sao | SST, PD | StackingCards, SlotText |
| 23 | cowork-grid | SW, SP | TextScramble |
| 24 | detail-xe | PL, PD | ShineSweep |
| 25 | phong-thu | VM, MB | AudioWaveVisualizer, TextScramble |
| 26 | gom-lo | SST, CR | ImageHoverDistort, DraggableGallery |
| 27 | kim-hoan | SP, PD | CurtainReveal, ShineSweep |
| 28 | ruou-vang | PL, SW | CurtainReveal, CursorSpotlight |
| 29 | luot-song | VM, PL | (giữ sóng/tem riêng) |
| 30 | can-ho-ven-bien | SST, PL | StickyChapters |
Mỗi hiệu ứng thư viện ít dùng chỉ nên xuất hiện ở ≤3 landing. Ngoài các cột này, landing tự sáng tạo hiệu ứng riêng theo nghiệp vụ.

## D. Quy trình + bằng chứng cho mỗi landing
1. Đọc landing hiện tại (page.tsx, components, data, design/*.md) và ảnh chụp `tests/showroom/<slug>/screenshots/`. Viết `design/REWORK.md`: (a) đánh giá đề tài hiện tại có đúng ngành thực tế không, (b) danh sách section thật của ngành, (c) kế hoạch đổi nội dung, (d) bảng hiệu ứng trước/sau.
2. Sửa nội dung (data/*.ts, components, page.tsx, metadata, FAQ, bảng giá...), đổi hero, thêm section còn thiếu, giảm công cụ về đúng vai trò; cập nhật ảnh chọn lại nếu cần (đúng đề tài), giữ credits.json chính xác (xoá ảnh bỏ đi).
3. Sửa hiệu ứng theo mục B/C. Chạy `node scripts/showroom-effects-matrix.mjs <slug>` trước/sau.
4. Cập nhật e2e (assert nội dung mới, giữ các kiểm khác: 0 console error, 0 request ngoài, không tràn ngang, glyph Việt, reduced-motion, quét chữ cấm mục 11, long task), chụp lại 1440/390, TỰ XEM, sửa. Cập nhật design/*.md, meta.ts (tagline/look nếu đổi).
5. Dev server chung http://localhost:3100. Sửa file nhỏ từng bước (lỗi cú pháp ở `fonts.ts`... làm sập mọi route). Chạy e2e ở foreground tới dòng kết quả cuối; KHÔNG kết thúc lượt khi còn tiến trình nền.
6. Báo cáo ≤250 từ: đề tài trước → sau, section mới, hiệu ứng bỏ/giữ/thêm (số liệu ma trận), số e2e thật, điều còn yếu.

## E. Làm rõ (điều phối viên, sau đợt 1)
- Script `showroom-effects-matrix.mjs` CHỈ đếm hiệu ứng thư viện. "≥4 hiệu ứng chữ ký" tính cả thư viện ít dùng LẪN code riêng của landing; hạn mức "tối đa 2 đại trà" là điều kiện cứng (script phải không báo VƯỢT). Liệt kê các chữ ký riêng trong `design/REWORK.md` (tên, file, mô tả 1 dòng) để điều phối viên kiểm.
- Hiệu ứng riêng giống hệt của landing khác (ví dụ đồng hồ thở 4-2-6 đã có ở mien-an) KHÔNG tính là riêng: chọn khác.
- Không chạy lệnh git phá hoại (git rm/reset/clean/checkout/stash/restore): repo có nhiều thay đổi chưa commit của chủ.
