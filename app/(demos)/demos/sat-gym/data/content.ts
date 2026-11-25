export const IMG = "/images/demos/sat-gym";

export const NAV = [
  { href: "#chuong-trinh", label: "Chương trình" },
  { href: "#chon-bai", label: "Chọn bài tập" },
  { href: "#lich-lop", label: "Lịch lớp" },
  { href: "#goi-tap", label: "Gói tập" },
  { href: "#hoi-dap", label: "Hỏi đáp" },
] as const;

export const PROGRAMS = [
  {
    n: "01", tag: "STRENGTH", title: "Sức mạnh nền tảng", img: "thanh-ta-day",
    alt: "Thanh tạ và dây thừng nằm trên sàn gỗ tối của phòng tập",
    text: "Squat, deadlift, đẩy vai với thanh tạ. Mỗi buổi có một động tác chính, tăng tải từng bước nhỏ và dừng khi kỹ thuật bắt đầu rơi.",
    specs: ["Thanh tạ, rack, tạ tay", "60 phút", "Từ mới bắt đầu"],
  },
  {
    n: "02", tag: "CONDITIONING", title: "Thể lực và nhịp độ", img: "dia-ta",
    alt: "Đĩa tạ nằm trên thảm cao su tối, nhìn chéo từ trên xuống",
    text: "Tabata, EMOM, AMRAP. Làm quen với việc chia sức, giữ kỹ thuật khi mệt và nghỉ đúng lúc. Mức tạ và số lần do bạn và HLV chọn.",
    specs: ["Dây nhảy, kettlebell, thảm", "45 đến 60 phút", "Chia mức theo người"],
  },
  {
    n: "03", tag: "FUNCTIONAL", title: "Chuyển động chức năng", img: "khoi-magie",
    alt: "Đám bột magie bay lên quanh đôi tay trong ánh sáng ngược",
    text: "Kéo, đẩy, mang, nhảy và treo xà. Bài tập có bậc: hỗ trợ bằng dây, hạ xà thấp, hoặc đổi sang động tác nhẹ hơn cho đến khi bạn sẵn sàng.",
    specs: ["Xà, dây thừng, kettlebell", "60 phút", "Có bậc hỗ trợ"],
  },
  {
    n: "04", tag: "FOUNDATION", title: "Làm quen và kỹ thuật", img: "tay-xa",
    alt: "Bàn tay nắm thanh xà đỏ trước bức tường gạch",
    text: "Dành thời gian cho tư thế, nhịp thở và cách dùng dụng cụ an toàn trước khi tăng độ khó. Phù hợp với người mới hoặc quay lại sau thời gian nghỉ.",
    specs: ["Thanh nhẹ, tạ tay, cơ thể", "45 đến 60 phút", "Dành cho người mới"],
  },
] as const;

/** Các bước thêm đĩa. plate = kg mỗi đĩa ở mỗi đầu thanh; total = tổng kg trên thanh sau bước đó (thanh 20 kg). */
export const LOAD_STEPS = [
  { plate: 0, total: 20, title: "Thanh trống", text: "Học tư thế, nhịp thở và đường đi của thanh trước khi nghĩ tới tạ." },
  { plate: 20, total: 60, title: "Một đĩa mỗi bên", text: "Chỉ tăng khi cả hiệp cuối vẫn đẹp như hiệp đầu." },
  { plate: 15, total: 90, title: "Thêm đĩa nhỏ hơn", text: "Nghỉ đủ giữa các hiệp. Mỏi cơ thì được, mất kỹ thuật thì dừng." },
  { plate: 10, total: 110, title: "Tải của riêng bạn", text: "Mỗi người một mức. Không so với người đứng cạnh." },
] as const;

export const GALLERY = [
  { n: "01", label: "SÀN TẬP", img: "san-don", alt: "Thanh tạ đen trắng nằm trên sàn nhà tập trải rộng", ratio: "3 / 2" },
  { n: "02", label: "DÂY THỪNG", img: "day-thung", alt: "Dây thừng treo trên tường xám trong nhà tập", ratio: "2 / 3", crop: true },
  { n: "03", label: "MAGIE", img: "tay-magie", alt: "Bàn tay phủ bột magie trước buổi tập", ratio: "2 / 3" },
  { n: "04", label: "XÀ NGOÀI TRỜI", img: "xa-ngoai", alt: "Hai cánh tay đang treo trên thanh xà ngoài trời", ratio: "3 / 2" },
  { n: "05", label: "BÀN CHÂN", img: "ban-chan", alt: "Đôi bàn chân trần nhón lên trên sàn tập tối", ratio: "3 / 2" },
  { n: "06", label: "KHO TẠ", img: "gia-ta", alt: "Giá đĩa tạ đặt trước bức tường gạch trắng", ratio: "2 / 3" },
] as const;

export const PLANS = [
  { id: "thu", name: "Buổi thử", price: 180000, per: "1 buổi", note: "Làm quen không gian, dụng cụ và cách một buổi tập diễn ra.", feats: ["1 lớp bất kỳ", "HLV giới thiệu dụng cụ", "Không ràng buộc"] },
  { id: "12", name: "Thẻ 12 buổi", price: 1550000, per: "12 buổi", note: "Dành cho người muốn tập đều nhưng không cố định giờ.", feats: ["Mọi lớp trong lịch tuần", "Dùng trong 8 tuần", "Đổi lớp theo tuần"] },
  { id: "thang", name: "Tháng mở", price: 1900000, per: "1 tháng", note: "Tập theo lịch lớp trong tháng, chọn lớp mỗi tuần.", feats: ["Không giới hạn lớp trong lịch", "Kèm đánh giá kỹ thuật ban đầu", "Tạm hoãn khi bận, theo điều kiện gói"], hot: true },
  { id: "quy", name: "Gói 3 tháng", price: 5100000, per: "3 tháng", note: "Một mức giá cho một quãng tập dài, thuận tiện cho người đã có thói quen.", feats: ["Như gói tháng mở", "Theo dõi tiến trình tải mỗi 4 tuần", "Ưu tiên chọn giờ lớp"] },
] as const;

export const FAQ = [
  { q: "Mình chưa từng tập tạ thì có vào được không?", a: "Được. Lớp Kỹ thuật tạ và Làm quen dành cho người mới. Bạn bắt đầu bằng thanh nhẹ hoặc chỉ cơ thể, HLV sẽ chỉnh từng động tác trước khi thêm tải." },
  { q: "Mình có cần khoẻ trước rồi mới đến không?", a: "Không. Bài tập chia mức: mỗi động tác có bản dễ hơn và bản khó hơn. Quan trọng là chọn mức bạn kiểm soát được." },
  { q: "Có cảnh báo gì khi tập không?", a: "Hãy khởi động trước, chọn mức tạ kiểm soát được và dừng nếu đau nhói, chóng mặt hoặc khó thở bất thường. Nếu bạn có bệnh tim, huyết áp, chấn thương hoặc đang mang thai, hãy hỏi bác sĩ trước khi tập cường độ cao." },
  { q: "Bài WOD ở trang này có thay cho HLV không?", a: "Không. Đó là gợi ý khung bài để bạn thử, chưa tính đến thể trạng riêng của bạn. HLV sẽ xem lại kỹ thuật và mức tải trực tiếp." },
  { q: "Cần mang gì khi đến tập?", a: "Giày phẳng hoặc giày tập, quần áo thoải mái, khăn và chai nước. Magie, dây quấn cổ tay và dụng cụ cơ bản có sẵn để dùng." },
  { q: "Giá ở đây có phải giá cuối cùng không?", a: "Đó là giá tham khảo để bạn hình dung. Mức giá, thời hạn và điều kiện từng gói sẽ được xác nhận khi bạn trao đổi trực tiếp." },
] as const;
