# REWORK — Bông Xù (2026-11-25)
(a) Đề tài trước: "pet spa & grooming" chung chung, công cụ chọn gói chiếm vai trò chính, hero chỉ có khẩu hiệu, thiếu bảng giá theo loài/cân nặng/độ dài lông, thiếu quy định tiếp nhận (tiêm phòng), đưa đón, giờ mở cửa, lịch hẹn; thư viện ảnh và tuyên ngôn là nội dung trang trí. Sau: website một tiệm tắm và cắt tỉa lông chó mèo ở Quận Sơn Trà, Đà Nẵng. Công cụ chỉ còn là một section ("Ước tính cho bé"). Không dịch vụ thú y, không bác sĩ bịa (chỉ nhắc "hỏi bác sĩ thú y của bé").
(b) Section thật của ngành: Hero (loại hình, quận, CTA Đặt lịch cho bé / Xem bảng giá, 3 sự thật: từ 150.000 ₫, 8:00 – 19:00 nghỉ Thứ Hai, nhận từ 3 tháng) · Dải thông tin + đèn Đang mở cửa · Về tiệm (hai khu chó/mèo) · Dịch vụ (5: Tắm Bọt Thơm, Cắt Tỉa Tạo Kiểu, Cắt Móng & Lau Tai, Spa, Chải Suôn Gỡ Rối; thời gian + giá từ) · Bảng giá theo loài × cân nặng × độ dài lông · Phụ phí · Ước tính thời gian/chi phí (công cụ) · Quy trình tiếp nhận → chải → tắm → sấy → hoàn thiện (có phút) · Tiếp nhận (sổ tiêm, tuổi/sức khoẻ, khi nào chưa nhận, chuẩn bị), đưa đón (mô tả chung), chính sách cọc/huỷ/trễ/đón muộn · Lịch hẹn + giờ mở cửa · Hỏi đáp (9) · Closing · Footer.
(c) Đổi nội dung: data/care.ts (WEIGHTS có giá theo gói, SERVICES, SURCHARGES, HOURS, OPEN_RULE, SLOT_*), data/content.ts (FACTS, STEPS có phút, INTAKE, PICKUP, POLICIES, FAQ 9 câu); component mới PriceBoard, Booking, OpenNow, PawWalk, WordSwap; bỏ Manifesto và Gallery (ảnh chuyển sang thẻ dịch vụ/đưa đón/lịch hẹn, vẫn 14 ảnh không lặp). meta.ts, layout metadata, Header, footer cập nhật. Liên hệ vẫn `.example`, `0236 000 0000`, chỉ ghi quận.
(d) Hiệu ứng (ma trận thư viện): trước = 7 thư viện, đại trà 5 (ClipReveal, ScrollScrubText, VelocityMarquee, MagneticButton, ScrollProgress), chữ ký thư viện 2 (StackingCards, SlotText). Sau = 2 thư viện, đại trà 1/2 (MagneticButton ở CTA hero và CTA cuối), chữ ký thư viện 1 (BlobMorph, đĩa hero). Bỏ: ClipReveal, ScrollScrubText, VelocityMarquee, ScrollProgress, StackingCards (thay bằng PawWalk), SlotText (thay bằng WordSwap).
Chữ ký riêng (code của landing):
- BounceWords (components/BounceWords.tsx): chữ nhảy theo từ + nảy nhỏ, vào hero bằng back.out.
- PawCursor (components/PawCursor.tsx): dấu chân theo con trỏ, đóng dấu khi bấm, vệt mờ dần.
- DragStickers (components/DragStickers.tsx): nhãn dán kéo thả, bàn phím mũi tên và R xoay.
- BubbleHost (components/BubbleHost.tsx): bọt xà phòng canvas khi rê/chạm thẻ dịch vụ.
- WagButton (components/WagButton.tsx): đuôi vẫy khi hover/focus nút.
- CircleWipe (components/Motion.tsx): khối dịch vụ loang tròn từ mép trên theo cuộn.
- WordSwap (components/WordSwap.tsx): đổi từ kiểu đóng dấu "thơm tho / bông xù / mượt mà".
- PriceBoard + flip số (components/PriceBoard.tsx, CSS flipIn): đổi loài/độ dài lông thì giá và thời gian lật số.
- OpenNow (components/OpenNow.tsx): đèn Đang mở/đã nhận bé cuối/đã đóng theo giờ Đà Nẵng, cập nhật mỗi phút.
- PawWalk (components/PawWalk.tsx): dấu chân thú đóng dấu giữa các bước quy trình, thẻ bước bật vào xen kẽ trái/phải.
Ngôn ngữ chuyển động chính: NẢY và ĐÓNG DẤU (bounce, stamp, vẫy đuôi, bọt), không fade-up, không trượt kính, không loang mực.
