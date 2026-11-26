/** Nội dung nhà hàng Bến Vị: quầy hải sản theo cân, cách chế biến, thực đơn, set tiệc, chính sách, hỏi đáp. Giá tham khảo, thay đổi theo ngày. */

export type Catch = { id: string; name: string; short: string; perKg: number; step: number; note: string; best: string[] };
export type Method = { id: string; name: string; fee: number; note: string };

/** Quầy hải sản tươi sống: bán theo cân (kg). Giá tham khảo / kg, thay đổi theo ngày. */
export const CATCH: Catch[] = [
  { id: "tom-su", name: "Tôm sú", short: "Tôm", perKg: 780000, step: 0.5, note: "Thịt chắc, vị ngọt. Một cân khoảng 18 đến 22 con.", best: ["nuong-than", "rang-me", "hap"] },
  { id: "cua", name: "Cua thịt", short: "Cua", perKg: 690000, step: 0.5, note: "Chọn con nặng tay, yếm đầy. Một cân thường 2 đến 3 con.", best: ["rang-me", "hap", "sot-ot"] },
  { id: "muc", name: "Mực ống", short: "Mực", perKg: 480000, step: 0.5, note: "Thân trong, đầu dính chặt. Hợp nướng hoặc hấp gừng.", best: ["nuong-than", "hap", "sot-ot"] },
  { id: "ca-bop", name: "Cá bớp", short: "Cá", perKg: 420000, step: 0.5, note: "Thịt béo, ít xương dăm. Có thể lấy nguyên con hoặc cắt khúc.", best: ["nuong-than", "hap", "sot-ot"] },
  { id: "hau", name: "Hàu", short: "Hàu", perKg: 220000, step: 0.5, note: "Một cân khoảng 8 đến 10 con, mở vỏ tại bếp.", best: ["nuong-than", "hap"] },
  { id: "ngheu", name: "Nghêu", short: "Nghêu", perKg: 160000, step: 1, note: "Ngâm nước sạch trước khi nấu, hợp hấp sả hoặc xào.", best: ["hap", "sot-ot"] },
];

/** Phí chế biến tính theo kg nguyên liệu (VND / kg). */
export const METHODS: Method[] = [
  { id: "nuong-than", name: "Nướng than", fee: 60000, note: "Muối ớt xanh hoặc mỡ hành, nướng trên bếp than." },
  { id: "rang-me", name: "Rang me", fee: 80000, note: "Sốt me chua ngọt, hành phi, ăn kèm bánh mì nướng." },
  { id: "hap", name: "Hấp sả gừng", fee: 50000, note: "Hấp bia hoặc sả gừng, giữ vị ngọt tự nhiên." },
  { id: "sot-ot", name: "Xào sa tế", fee: 70000, note: "Sa tế tỏi ớt, lửa lớn, hơi cay." },
];

export const ORDER_STEPS = [
  { n: "01", h: "Chọn ở quầy", p: "Ra quầy chỉ con bạn thích, hoặc chọn trên bàn xoay bên cạnh để ước lượng trước." },
  { n: "02", h: "Cân tại bàn", p: "Nhân viên cân trước mặt bạn, báo trọng lượng và giá theo cân hôm đó." },
  { n: "03", h: "Chọn cách nấu", p: "Mỗi loại có vài cách hợp vị. Bạn có thể chia một cân làm hai món khác nhau." },
  { n: "04", h: "Món lên theo lượt", p: "Món nhanh ra trước, món nướng và lẩu ra sau để cả bàn cùng ăn nóng." },
] as const;

/** Thực đơn dạng sách: bìa + 3 trang. */
export type MenuLine = { name: string; note: string; price: string };
export type MenuPage = { id: string; title: string; kicker: string; lines: MenuLine[]; foot: string };

export const MENU_PAGES: MenuPage[] = [
  {
    id: "tuoi-song",
    title: "Hải sản tươi sống",
    kicker: "Chọn theo cân",
    lines: [
      { name: "Tôm sú", note: "18 đến 22 con mỗi cân", price: "780.000₫/kg" },
      { name: "Cua thịt", note: "2 đến 3 con mỗi cân", price: "690.000₫/kg" },
      { name: "Mực ống", note: "Nướng hoặc hấp gừng", price: "480.000₫/kg" },
      { name: "Cá bớp", note: "Nguyên con hoặc cắt khúc", price: "420.000₫/kg" },
      { name: "Hàu", note: "Mở vỏ tại bếp", price: "220.000₫/kg" },
      { name: "Nghêu", note: "Hấp sả hoặc xào", price: "160.000₫/kg" },
    ],
    foot: "Phí chế biến từ 50.000₫ đến 80.000₫ mỗi kg nguyên liệu: nướng than, rang me, hấp sả gừng, xào sa tế.",
  },
  {
    id: "lau",
    title: "Lẩu và nồi nóng",
    kicker: "Cho 3 người trở lên",
    lines: [
      { name: "Lẩu hải sản bếp lửa", note: "Cá, mực, nghêu, rau; nước dùng xương ninh", price: "720.000₫" },
      { name: "Lẩu cá bớp măng chua", note: "Cá bớp cắt lát, măng chua, rau rừng", price: "640.000₫" },
      { name: "Lẩu thái hải sản", note: "Nước dùng chua cay, sả lá chanh", price: "690.000₫" },
      { name: "Cháo hải sản nồi đất", note: "Cho 2 đến 3 người", price: "260.000₫" },
    ],
    foot: "Lẩu tính theo nồi, thêm rau và mì tính riêng. Hãy báo nhân viên nếu cần giảm cay.",
  },
  {
    id: "an-kem",
    title: "Món ăn kèm",
    kicker: "Khai vị, rau, cơm",
    lines: [
      { name: "Gỏi xoài tôm khô", note: "Xoài xanh, rau răm, mè rang", price: "120.000₫" },
      { name: "Rau muống xào tỏi", note: "Lửa lớn, tỏi phi", price: "90.000₫" },
      { name: "Canh chua cá", note: "Me, thơm, cà chua, rau om", price: "190.000₫" },
      { name: "Cơm chiên hải sản", note: "Tôm, mực, trứng, hành lá", price: "170.000₫" },
      { name: "Bánh mì nướng bơ", note: "Ăn kèm món sốt", price: "35.000₫" },
      { name: "Trà đá, nước ngọt, nước suối", note: "Bia tính theo giá niêm yết", price: "từ 10.000₫" },
    ],
    foot: "Giá là giá tham khảo, thay đổi theo ngày, chưa gồm thuế và phí phục vụ.",
  },
];

export const SETS = [
  { id: "ban-be", name: "Set 2 đến 3 người", price: "từ 690.000₫", tag: "Bữa trưa hoặc tối nhẹ", items: ["Hàu nướng mỡ hành, 4 con", "Mực nướng sa tế", "Rau muống xào tỏi", "Cơm chiên hải sản"] },
  { id: "gia-dinh", name: "Set 4 đến 6 người", price: "từ 1.490.000₫", tag: "Bữa gia đình cuối tuần", items: ["Tôm sú nướng muối ớt", "Cua rang me", "Mực hấp gừng", "Canh chua cá", "Rau theo mùa"] },
  { id: "tiec", name: "Set 8 đến 10 người", price: "từ 3.290.000₫", tag: "Sinh nhật, họp mặt", items: ["Khai vị hàu và gỏi", "Cua, tôm, ghẹ chọn theo cân", "Lẩu hải sản bếp lửa", "Rau, cơm, tráng miệng"] },
  { id: "phong-rieng", name: "Phòng riêng 10 đến 12 người", price: "set từ 5.500.000₫", tag: "Tiệc đoàn, đặt trước", items: ["Thực đơn chốt trước 1 ngày", "Bàn tròn xoay", "Có chỗ cho màn hình trình chiếu", "Phục vụ riêng một nhân viên"] },
] as const;

export const HOURS = [
  { d: "Thứ hai đến Thứ sáu", t: "10:00 đến 14:00 · 16:30 đến 22:00" },
  { d: "Thứ bảy, Chủ nhật, ngày lễ", t: "10:00 đến 22:00, không nghỉ trưa" },
] as const;

export const POLICIES = [
  { h: "Đặt bàn và giữ chỗ", p: "Bàn thường được giữ 15 phút sau giờ hẹn. Nhóm từ 6 khách nên đặt trước ít nhất 1 ngày, cuối tuần và lễ nên đặt sớm hơn." },
  { h: "Tiệc đoàn và đặt cọc", p: "Phòng riêng và tiệc từ 10 khách cần chốt thực đơn trước 1 ngày. Mức đặt cọc khoảng 30% giá trị dự kiến, được trừ vào hoá đơn." },
  { h: "Đổi hoặc huỷ", p: "Báo đổi hoặc huỷ trước giờ hẹn ít nhất 4 giờ (tiệc đoàn: trước 24 giờ) để nhà hàng sắp xếp lại bàn và hải sản." },
  { h: "Giá, thuế và phục vụ", p: "Giá niêm yết là giá tham khảo, hải sản tươi sống tính theo cân và đổi theo ngày. Giá cuối cùng được báo khi cân. Chưa gồm thuế và phí phục vụ." },
  { h: "Dị ứng và ăn chay", p: "Hãy báo dị ứng (đặc biệt tôm cua, nghêu sò) khi đặt bàn. Bếp có thể làm món rau, đậu hũ cho người ăn chay nhưng dùng chung khu bếp." },
  { h: "Trẻ em và đồ mang theo", p: "Có ghế ăn trẻ em, xin báo trước. Nhà hàng không nhận đồ uống mang vào; bánh sinh nhật mang vào tính phí cắt bánh." },
] as const;

export const FAQ = [
  ["Giá hải sản có cố định không?", "Không. Hải sản tươi sống đổi giá theo ngày và theo mùa. Giá trên trang là giá tham khảo; khi cân, nhân viên báo giá hôm đó trước khi chế biến."],
  ["Tôi có thể mang hải sản mua ở chợ vào nấu không?", "Nhà hàng không nhận gia công hải sản mang từ ngoài vào, vì không kiểm soát được độ tươi và nguồn gốc."],
  ["Nhóm đông có cần đặt trước không?", "Nên đặt trước. Từ 6 khách chúng tôi khuyên đặt trước 1 ngày; từ 10 khách dùng phòng riêng thì cần chốt thực đơn và đặt cọc."],
  ["Tôi dị ứng tôm cua, quán có món thay thế không?", "Có các món cá, mực, rau và cơm. Vì bếp chung nên không thể đảm bảo hoàn toàn không lẫn, hãy báo khi đặt bàn để bếp tách dụng cụ."],
  ["Một người ăn bao nhiêu hải sản là vừa?", "Với bữa chính, khoảng 0,3 đến 0,4 kg hải sản mỗi người cùng rau và cơm. Công cụ gợi ý bữa ăn trên trang giúp ước lượng theo ngân sách."],
  ["Phần đặt bàn trên trang có giữ chỗ ngay không?", "Chưa. Phiếu chỉ tóm tắt yêu cầu trên trình duyệt của bạn và không gửi đi đâu. Để giữ bàn, hãy dùng nút chuyển sang form liên hệ trong phiếu."],
] as const;
