/**
 * Registry các landing ngành nghề. TẠO TỰ ĐỘNG bởi scripts/showroom-registry-sync.mjs từ
 * app/(demos)/demos/<slug>/meta.ts — đừng sửa tay (sửa meta.ts rồi chạy lại script).
 * Chỉ chứa thông tin điều hướng/CTA, KHÔNG có theme/layout dùng chung: mỗi landing tự sở hữu giao diện.
 */
export type DemoEntry = {
  id: string;
  slug: string;
  brand: string;
  industry: string;
  /** slug trang /solutions/<slug> trong DB */
  solutionSlug: string;
  tagline: string;
  /** mô tả ngắn phong cách thị giác riêng */
  look: string;
};

export const DEMOS: readonly DemoEntry[] = [
  { id: "LP-01", slug: "mien-an", brand: "Miên An Wellness", industry: "Spa", solutionSlug: "spa", tagline: "Spa & massage trị liệu", look: "Organic luxury, khung vòm, nền kem và xanh rêu" },
  { id: "LP-02", slug: "hien-man", brand: "Hiên Mặn Villa", industry: "Villa", solutionSlug: "hospitality", tagline: "Villa nghỉ dưỡng ven biển Sơn Trà", look: "Ảnh toàn màn hình điện ảnh, thanh đặt phòng nổi" },
  { id: "LP-03", slug: "rong-dam", brand: "Rong Dặm", industry: "Tour", solutionSlug: "hospitality", tagline: "Tour trải nghiệm", look: "Travel zine: ảnh dán băng keo, tem, bản đồ nét tay, VI/EN" },
  { id: "LP-04", slug: "rot-nhiet", brand: "Rót Nhiệt Coffee", industry: "Cafe", solutionSlug: "fnb", tagline: "Quán cà phê rang xay", look: "Áp phích đồ hoạ, chữ khổng lồ, viền đậm đỏ đen" },
  { id: "LP-05", slug: "ben-vi", brand: "Bến Vị", industry: "Hải sản", solutionSlug: "fnb", tagline: "Nhà hàng hải sản ven biển Sơn Trà", look: "Nền tối điện ảnh, bàn xoay, thực đơn lật trang, bếp lửa" },
  { id: "LP-06", slug: "mien-cuoi", brand: "Miền Cười", industry: "Nha khoa", solutionSlug: "clinic", tagline: "Phòng khám nha khoa tại Hải Châu", look: "Swiss clinical: lưới sạch, xanh bạc hà, sơ đồ hàm răng, timeline quy trình" },
  { id: "LP-07", slug: "nep-tho", brand: "Nếp Thở", industry: "Pilates", solutionSlug: "fitness", tagline: "Studio pilates & yoga lớp nhỏ tại Sơn Trà, Đà Nẵng", look: "Lifestyle viên thuốc, thời khoá biểu là trung tâm" },
  { id: "LP-08", slug: "khoi-nep", brand: "Khối Nếp", industry: "Nội thất", solutionSlug: "construction", tagline: "Thiết kế & thi công nội thất tại Đà Nẵng", look: "Tạp chí kiến trúc: chữ trên ảnh, đường kẻ, lưới" },
  { id: "LP-09", slug: "thang-mo", brand: "Tháng Mơ", industry: "Ảnh cưới", solutionSlug: "agency", tagline: "Studio ảnh cưới Đà Nẵng: pre-wedding, phóng sự, album", look: "Photobook analog: khung ảnh, viền giấy, ghi chú tay" },
  { id: "LP-10", slug: "net-lech", brand: "Nét Lệch", industry: "Tiệm tóc", solutionSlug: "spa", tagline: "Salon tóc Hải Châu: cắt, uốn, duỗi, nhuộm, phục hồi", look: "Tạp chí thời trang, giấy ngà + đen + lime, chữ Oswald condensed, đường chéo 14°" },
  { id: "LP-11", slug: "bar-mai-thuong", brand: "Tầng Mây", industry: "Rooftop bar", solutionSlug: "fnb", tagline: "Rooftop bar & cocktail ở Sơn Trà", look: "Neon đêm retro-futuristic: đen xanh, hồng neon, cyan; chuyển động chính là bật đèn neon, đồng hồ happy hour, ly rót theo cuộn, cảnh đêm đổi theo giờ" },
  { id: "LP-12", slug: "tiem-banh", brand: "Mây Kẹo", industry: "Tiệm bánh", solutionSlug: "fnb", tagline: "Tiệm bánh ngọt, bánh kem sinh nhật ở Hải Châu", look: "Pastel kẹo, nhãn dán, bo tròn lớn; chuyển động chính là nảy: lò nướng đếm giờ, tủ kính xoay, cắt bánh theo cuộn, thổi nến" },
  { id: "LP-13", slug: "tra-thi", brand: "Tịch Trà", industry: "Nhà trà", solutionSlug: "fnb", tagline: "Nhà trà, phòng trà nhóm và trà mang về ở Hải Châu", look: "Mực nho thiền: nền than ấm, loang mực, xanh lá trà, một điểm đỏ son" },
  { id: "LP-14", slug: "glamping-nui", brand: "Rừng Thức", industry: "Glamping", solutionSlug: "hospitality", tagline: "Khu glamping 3 loại lều ở chân núi Bà Nà, Hòa Vang", look: "Rừng đêm, lửa trại: cuộn ngang một ngày-đêm, sáng chuyển tối, tàn lửa bay" },
  { id: "LP-15", slug: "lan-bien", brand: "Tầng Xanh", industry: "Lặn biển", solutionSlug: "hospitality", tagline: "Trung tâm lặn biển & thể thao nước ở Sơn Trà, Đà Nẵng", look: "Dưới nước: nền chuyển màu theo độ sâu, đồng hồ 0 đến 30 m, bong bóng và sóng méo ảnh" },
  { id: "LP-16", slug: "phuot-xe", brand: "Vọt", industry: "Thuê xe phượt", solutionSlug: "hospitality", tagline: "Cửa hàng cho thuê xe máy & mô tô ở Hải Châu, Đà Nẵng", look: "Đường đua: vàng #ffd400 trên đen, chữ nghiêng nặng, sọc caro, đồng hồ tốc độ cuộn theo trang, xe lướt qua khi chuyển section" },
  { id: "LP-17", slug: "hoa-tuoi", brand: "Nở Rừng", industry: "Tiệm hoa", solutionSlug: "ecommerce", tagline: "Hoa cho những điều đang nở", look: "Botanical đậm kiểu tạp chí hoa: xanh rừng, đỏ cam, hồng sen; mặt nạ cánh hoa, gallery kéo, cánh hoa rơi" },
  { id: "LP-18", slug: "sat-gym", brand: "SẬT Gym", industry: "Phòng tập", solutionSlug: "fitness", tagline: "Box CrossFit & strength ở Ngũ Hành Sơn", look: "Brutalist bê tông: xám than, xanh axit, chữ khổng lồ rỗng viền, thẻ chương trình xếp chồng, tạ SVG và đồng hồ tabata chạy thật" },
  { id: "LP-19", slug: "pet-vui", brand: "Bông Xù", industry: "Tiệm tắm và cắt tỉa lông thú cưng", solutionSlug: "spa", tagline: "Tiệm tắm và cắt tỉa lông chó mèo ở Quận Sơn Trà, đặt lịch hẹn trước", look: "Vui nhộn màu cơ bản đậm: vàng, xanh dương, đỏ, trắng, viền đen dày, nhãn dán và hình tròn lớn" },
  { id: "LP-20", slug: "da-xanh", brand: "NÉA Skin Studio", industry: "Studio chăm sóc da cơ bản", solutionSlug: "spa", tagline: "Studio chăm sóc da cơ bản ở Quận Thanh Khê, liệu trình 45 đến 90 phút, hẹn trước", look: "Kính mờ dịu: gradient mesh lilac và xanh nước chuyển động chậm, thẻ kính nhiều lớp, giọt serum rơi theo cuộn, chuyển động lướt kính" },
  { id: "LP-21", slug: "nail-pop", brand: "Chấm Chanh", industry: "Nail studio", solutionSlug: "spa", tagline: "Tiệm nail ở Đà Nẵng: sơn gel, đắp gel, nail art, đặt lịch theo giờ trống", look: "Pop art màu gắt: hồng nóng, vàng chanh, cobalt trên trắng và đen; halftone chuyển động, color-flood, bàn tay SVG đổi màu, chọn khung giờ đặt lịch" },
  { id: "LP-22", slug: "ngoai-ngu-sao", brand: "Mở Lời", industry: "Trung tâm ngoại ngữ", solutionSlug: "education", tagline: "Trung tâm ngoại ngữ Quận Hải Châu: tiếng Anh giao tiếp, IELTS, tiếng Nhật JLPT, tiếng Hàn sơ cấp", look: "Trung tâm ngoại ngữ: nền xanh dương, thẻ bo lớn, chương trình lọc theo đối tượng, lộ trình lên cấp, lịch khai giảng, so sánh gói học, thẻ từ vựng lật và hội thoại" },
  { id: "LP-23", slug: "cowork-grid", brand: "Ô Lưới", industry: "Coworking", solutionSlug: "sme-ops", tagline: "Không gian làm việc chung ở Hải Châu, Đà Nẵng: hot desk, bàn cố định, phòng riêng, phòng họp", look: "Bản vẽ kỹ thuật và terminal: đen #0b0b0c, trắng #f4f4f2, cam #ff5a1f; lưới đường kẻ có toạ độ A1-B2, chữ mono, sơ đồ chỗ ngồi SVG theo giờ, con trỏ chữ thập" },
  { id: "LP-24", slug: "detail-xe", brand: "Gương Phẩm", industry: "Car detailing", solutionSlug: "sme-ops", tagline: "Cửa hàng chăm sóc xe hơi ở Ngũ Hành Sơn: rửa chi tiết, đánh bóng, phủ ceramic", look: "Carbon & chrome: đen sợi carbon #0c0d0f, bạc chrome #c9ced6, đỏ #e10600 điểm nhấn nhỏ; vệt sáng quét, bụi bẩn tan theo cuộn, slider lớp phủ và bộ chọn gói theo dòng xe" },
  { id: "LP-25", slug: "phong-thu", brand: "Tần Số Studio", industry: "Phòng thu âm", solutionSlug: "agency", tagline: "Phòng thu âm ở Quận Hải Châu, Đà Nẵng: thu giọng, band, podcast, voice-over, sản xuất beat, mix & master", look: "Kênh mixer và timeline DAW: tím đậm #1a0b2e, cam #ff8a1f, trắng ngà; sóng âm canvas theo con trỏ, kênh mixer M/S + fader, playhead timeline, máy tính dung lượng file, đĩa than quay theo cuộn; chuyển động chính: playhead quét và mức VU dâng" },
  { id: "LP-26", slug: "gom-lo", brand: "Đất Mơ", industry: "Xưởng gốm", solutionSlug: "fnb", tagline: "Xưởng gốm thủ công và workshop làm gốm ở Quận Ngũ Hành Sơn, Đà Nẵng: bán gốm, lớp nặn tay, bàn xoay, vẽ men", look: "Thủ công đất: nền terracotta và nâu đất có vân đất sét, men xanh ngọc điểm nhấn, bàn xoay SVG nặn bình, lịch lớp tuần chọn được, vết nung theo cuộn; chuyển động chính: đất nén rồi nở và men chảy" },
  { id: "LP-27", slug: "kim-hoan", brand: "Kim Nguyệt", industry: "Trang sức", solutionSlug: "ecommerce", tagline: "Tiệm kim hoàn ở Quận Hải Châu, Đà Nẵng: nhẫn cưới, trang sức vàng chế tác theo yêu cầu", look: "Luxury đen và vàng: hộp trang sức mở đầu trang, ánh vàng theo con trỏ, chữ ánh kim quét ngang, ảnh mở như tủ kính, nhẫn xoay 3D, cân tiểu ly, khắc chữ và thước nới size" },
  { id: "LP-28", slug: "ruou-vang", brand: "Mộc Vang", industry: "Wine bar", solutionSlug: "fnb", tagline: "Wine bar ở Quận Ngũ Hành Sơn, Đà Nẵng: vang theo ly và theo chai, set thử rượu, đồ nhắm charcuterie", look: "Đỏ rượu và ánh nến: burgundy #4a0e1a, vàng đồng, ngà; rèm nhung mở hai bên, đường rượu rót vẽ theo cuộn, ly xoay bằng kéo, nhãn chai lật, khay thử rượu được rót, nến giờ mở cửa ngắn dần, nội dung dâng lên như mực vang" },
  { id: "LP-29", slug: "luot-song", brand: "Ráng Sóng Surf Club", industry: "Trường lướt sóng", solutionSlug: "education", tagline: "Trường dạy lướt sóng ở Sơn Trà, Đà Nẵng: buổi trải nghiệm, khoá 3, 5, 10 buổi, lớp trẻ em", look: "Retro thập niên 70 in ấn có hạt: vàng sa mạc, teal, cam cháy, nâu đậm; sóng SVG nhiều lớp phản ứng cuộn, mặt trời lên theo cuộn, tem tròn quay, ván lướt trượt theo đường sóng; đồng hồ buổi học chạy theo cuộn, cung nắng chọn khung giờ, ba cờ biển" },
  { id: "LP-30", slug: "can-ho-ven-bien", brand: "Vọng Triều", industry: "Căn hộ ven biển", solutionSlug: "real-estate", tagline: "Dự án căn hộ ven biển một tháp 36 tầng ở Đà Nẵng: căn 1PN, 2PN, 3PN, đặt lịch xem nhà mẫu", look: "Kiến trúc điện ảnh navy và đồng: chương cuộn dính, tháp nhiều lớp, mặt bằng tương tác, ánh sáng đổi theo giờ, mặt cắt tháp theo tầng, thước tầng chạy theo cuộn" },
] as const;

export function getDemo(slug: string) {
  return DEMOS.find((d) => d.slug === slug);
}
