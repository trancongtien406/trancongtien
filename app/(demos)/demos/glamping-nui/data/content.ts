/** Nội dung trang Rừng Thức. Giá luôn là giá tham khảo; vị trí chỉ ghi khu vực chung. */

export type Phase = "dawn" | "morning" | "noon" | "afternoon" | "dusk" | "night" | "late";

export type Scene = {
  id: string;
  time: string;
  minutes: number;
  label: string;
  title: string;
  text: string;
  photo: string;
  alt: string;
  position: string;
  phase: Phase;
};

export const SCENES: Scene[] = [
  { id: "binh-minh", time: "06:00", minutes: 360, label: "Bình minh", title: "Thức dậy cùng sương", text: "Mở cửa lều, đón làn không khí mát và ngắm từng tầng núi hiện ra sau màn sương.", photo: "mist-pines", alt: "Sương phủ triền núi với hàng thông", position: "50% 60%", phase: "dawn" },
  { id: "bua-sang", time: "08:00", minutes: 480, label: "Buổi sáng", title: "Bữa sáng thật chậm", text: "Một tách cà phê nóng, bữa sáng giản dị bên bếp ngoài trời và khoảng thời gian không cần vội.", photo: "camp-kitchen", alt: "Bếp ngoài trời giữa rừng, đang xiên thức ăn", position: "30% 50%", phase: "morning" },
  { id: "kham-pha", time: "10:00", minutes: 600, label: "Khám phá", title: "Đi tìm những lối nhỏ", text: "Dạo bộ hoặc tham gia hành trình trekking nhẹ, tuỳ điều kiện thời tiết và chương trình trong ngày.", photo: "pine-silhouette", alt: "Bóng cây thông trên sườn núi mờ sương", position: "50% 50%", phase: "noon" },
  { id: "nghi-ngoi", time: "13:00", minutes: 780, label: "Nghỉ ngơi", title: "Để thời gian trôi chậm", text: "Mắc võng giữa rừng thông, đọc một cuốn sách, nằm nghe gió hoặc chỉ cần ngồi yên.", photo: "hammock", alt: "Võng giữa rừng thông trong nắng chiều", position: "50% 55%", phase: "afternoon" },
  { id: "hoang-hon", time: "16:30", minutes: 990, label: "Hoàng hôn", title: "Khi núi rừng đổi màu", text: "Ngắm nắng cuối ngày trên triền núi, rồi cùng nhau nhóm bếp cho bữa tối.", photo: "sunset-bbq", alt: "Xiên thịt nướng bên lửa trên đồi lúc hoàng hôn", position: "50% 55%", phase: "dusk" },
  { id: "dem-xuong", time: "19:00", minutes: 1140, label: "Đêm xuống", title: "Bữa tối bên ánh lửa", text: "Cùng nhau nướng BBQ, trò chuyện và kể những chuyện chưa kịp kể.", photo: "grill", alt: "Xúc xích nướng trên vỉ than cạnh lều", position: "50% 40%", phase: "night" },
  { id: "khuya", time: "21:00", minutes: 1260, label: "Khuya", title: "Dưới một bầu trời đầy sao", text: "Ngồi lại bên nhau, ngước nhìn trời đêm và khép lại ngày dài bằng những khoảnh khắc bình yên.", photo: "milky-way", alt: "Dải ngân hà trên núi, vài chiếc lều nhỏ phía dưới", position: "50% 35%", phase: "late" },
];

export type Tent = {
  id: "moc" | "rung" | "may";
  name: string;
  mood: string;
  price: number;
  /** giá đêm cuối tuần (thứ Sáu, thứ Bảy) */
  weekend: number;
  /** giá đêm lễ, Tết */
  peak: number;
  cap: number;
  bed: string;
  size: string;
  amen: string[];
  text: string;
  perks: string[];
  photo: string;
  alt: string;
  position: string;
};

export const TENTS: Tent[] = [
  { id: "moc", name: "Lều Mộc", mood: "Ấm cúng", price: 890_000, weekend: 1_090_000, peak: 1_390_000, cap: 2, bed: "1 giường đôi", size: "Lều chuông đường kính 5 m", amen: ["Quạt và đèn sạc", "Chăn đệm dày, gối riêng", "Ổ cắm sạc điện thoại", "Nhà vệ sinh chung cách 20 m"], text: "Không gian nhỏ xinh bằng vải canvas, ánh đèn vàng và cảm giác gần gũi. Hợp với cặp đôi hoặc người thích kỳ nghỉ giản dị.", perks: ["Cặp đôi", "Ánh sáng ấm", "Ngủ 2 người"], photo: "bell-tent", alt: "Lều chuông màu kem giữa rừng thông, treo cờ đèn nhỏ", position: "50% 60%" },
  { id: "rung", name: "Lều Rừng", mood: "Cân bằng", price: 1_290_000, weekend: 1_590_000, peak: 1_990_000, cap: 3, bed: "1 giường đôi và 1 giường đơn", size: "Lều chữ A khoảng 18 m²", amen: ["Quạt, đèn sạc, bàn nhỏ", "Hiên có bàn ghế", "Ổ cắm và đèn đọc sách", "Nhà vệ sinh chung cách 15 m"], text: "Rộng hơn, có khoảng sinh hoạt riêng, dáng lều chữ A giữa rừng. Dành cho gia đình nhỏ hoặc nhóm bạn thân.", perks: ["Gia đình nhỏ", "Có hiên", "Ngủ 3 người"], photo: "tent-night", alt: "Lều chữ A sáng đèn trong rừng thông ban đêm", position: "50% 55%" },
  { id: "may", name: "Lều Mây", mood: "Mở rộng", price: 1_790_000, weekend: 2_190_000, peak: 2_790_000, cap: 4, bed: "2 giường đôi", size: "Lều trên sàn gỗ khoảng 28 m²", amen: ["Quạt, đèn dây, bàn trà", "Sàn gỗ có hiên rộng", "Phòng vệ sinh riêng cạnh lều", "Ổ cắm, đèn đọc sách"], text: "Rộng và thoáng, ưu tiên cảm giác riêng tư cùng góc nhìn mở ra thiên nhiên, có sàn gỗ và dây đèn.", perks: ["Nhóm bạn", "Vệ sinh riêng", "Ngủ 4 người"], photo: "fairy-tent", alt: "Lều glamping trên sàn gỗ với dây đèn vàng ban đêm", position: "50% 70%" },
];

export type Activity = {
  id: "bbq" | "trek" | "stars" | "atv";
  name: string;
  price: number;
  text: string;
  when: string;
  length: string;
  note: string;
};

export const ACTIVITIES: Activity[] = [
  { id: "bbq", name: "BBQ giữa rừng", price: 250_000, text: "Bữa tối ngoài trời: cùng chuẩn bị món, nướng trên than và ăn khi trời đã tối hẳn.", when: "Mỗi tối, 18:30", length: "Khoảng 2 giờ", note: "Từ 2 người, gọi trước 18:00" },
  { id: "trek", name: "Trekking", price: 150_000, text: "Đi theo những lối mòn nhẹ trong rừng với chương trình phù hợp điều kiện thực tế.", when: "Sáng, 8:30", length: "Khoảng 2 giờ, 3 km", note: "Có người dẫn, từ 8 tuổi" },
  { id: "stars", name: "Ngắm sao", price: 80_000, text: "Tìm một góc yên tĩnh, tắt bớt đèn, ngước nhìn bầu trời đêm vùng núi.", when: "Tối, 21:00", length: "Khoảng 1 giờ", note: "Cần trời quang, báo lại nếu nhiều mây" },
  { id: "atv", name: "Xe địa hình", price: 350_000, text: "Thêm chút phiêu lưu: chạy xe theo tuyến có người dẫn, tuỳ điều kiện đường và thời tiết.", when: "Chiều, 14:00", length: "Khoảng 1,5 giờ", note: "Từ 16 tuổi, có mũ bảo hiểm" },
];

export const FAQ = [
  { q: "Khu glamping nằm ở đâu và đi thế nào?", a: "Khu nằm ở vùng chân núi Bà Nà, Hòa Vang, Đà Nẵng, cách trung tâm thành phố khoảng 40 phút đi xe máy hoặc ô tô. Chúng tôi gửi bản đồ và hướng dẫn đường cụ thể sau khi xác nhận đặt chỗ. Có thể đón tại điểm hẹn ở ngoại thành với phụ phí." },
  { q: "Giờ nhận và trả lều là mấy giờ?", a: "Nhận lều từ 14:00, trả lều trước 11:00. Nếu đến sớm bạn có thể gửi đồ và ngồi ở khu bếp chung. Trả lều muộn tính thêm theo giờ, báo trước để chúng tôi sắp xếp." },
  { q: "Đặt cọc và huỷ thế nào?", a: "Đặt cọc 50% giá lều khi giữ chỗ. Huỷ trước 7 ngày: hoàn đủ cọc. Huỷ từ 3 đến 7 ngày: hoàn một nửa. Huỷ trong vòng 3 ngày hoặc không đến: không hoàn cọc. Ngày lễ, Tết áp dụng chính sách riêng được báo khi đặt." },
  { q: "Mùa nào đi đẹp nhất, mưa bão thì sao?", a: "Từ tháng 2 đến tháng 5 trời mát và ít mưa, dễ ngắm sao nhất. Tháng 6 đến 8 ban ngày nắng nóng, tối vẫn dễ chịu. Mùa mưa thường từ tháng 9 đến tháng 12. Khi có bão hoặc mưa lớn, chúng tôi báo đổi ngày hoặc huỷ không mất cọc; hoạt động ngoài trời có thể đổi giờ hoặc tạm hoãn." },
  { q: "Cần mang theo gì?", a: "Giày đi bộ, áo khoác mỏng cho buổi tối (đêm có thể 18 đến 22 độ), đồ cá nhân, kem chống nắng, thuốc cá nhân nếu cần. Chăn đệm, đèn và quạt trong lều đã có sẵn. Nên mang áo mưa mỏng vào mùa mưa." },
  { q: "Có thể đi cùng trẻ em và thú cưng không?", a: "Trẻ em đi cùng người lớn, trẻ dưới 6 tuổi ngủ chung không tính giường thêm. Trekking từ 8 tuổi, xe địa hình từ 16 tuổi. Thú cưng nhỏ được ở lều Mộc và Rừng khi báo trước, vui lòng dắt dây ở khu chung." },
  { q: "Có điện, nước nóng và sóng điện thoại không?", a: "Mỗi lều có ổ cắm sạc và đèn. Nước nóng có ở khu vệ sinh từ 17:00 đến 22:00 và buổi sáng 5:30 đến 8:30. Sóng điện thoại chập chờn ở một số góc đồi nên hãy tải sẵn bản đồ." },
  { q: "Chi phí trong công cụ ước tính đã là giá cuối chưa?", a: "Chưa. Đó là mức tham khảo theo giá ngày thường để bạn hình dung ngân sách. Giá xác nhận thay đổi theo ngày cuối tuần, lễ Tết, số người, dịch vụ chọn và điều kiện lúc đặt." },
];

/* ---- Bảng giá tuần/lễ ---- */
export const SEASON_NOTE = "Ngày thường: Chủ Nhật đến thứ Năm. Cuối tuần: thứ Sáu, thứ Bảy. Lễ, Tết: các dịp nghỉ lễ và Tết Nguyên đán. Giá một lều, một đêm, chưa gồm ăn uống và hoạt động.";

/* ---- Ăn uống ---- */
export const MEALS = [
  { name: "Bữa sáng tại lều", price: "90.000₫/người", note: "Bánh mì trứng, cà phê hoặc trà nóng, trái cây, phục vụ 7:30 đến 9:00. Tặng kèm với lều Rừng và lều Mây." },
  { name: "Set BBQ 2 người", price: "590.000₫", note: "500 g thịt bò và heo ướp, 2 xiên hải sản, rau củ nướng, cơm cháy, nước chấm." },
  { name: "Set BBQ 4 người", price: "1.090.000₫", note: "1 kg thịt các loại, 4 xiên hải sản, rau củ, bắp nướng, lẩu nhỏ, trái cây." },
  { name: "Nướng bắp, khoai, marshmallow", price: "120.000₫ một nhóm", note: "Ăn vặt bên lửa trại, nhóm đến 6 người." },
  { name: "Cà phê và trà nóng", price: "Từ 30.000₫", note: "Pha tại quầy bếp chung, mở từ 6:00 đến 21:00." },
];

/* ---- Lịch trình mẫu 2N1Đ ---- */
export const ITINERARY = [
  { day: "Ngày 1", title: "Về với rừng", slots: [
    ["14:00", "Nhận lều, nghe hướng dẫn an toàn lửa và khu vực"],
    ["15:30", "Cà phê, dạo quanh đồi thông"],
    ["17:30", "Ngắm hoàng hôn, nhóm bếp"],
    ["18:30", "BBQ và lửa trại"],
    ["21:00", "Ngắm sao, về lều"],
  ] },
  { day: "Ngày 2", title: "Thức dậy cùng sương", slots: [
    ["06:00", "Bình minh, cà phê nóng ngoài hiên"],
    ["07:30", "Bữa sáng tại khu bếp chung"],
    ["08:30", "Trekking nhẹ 3 km, có người dẫn"],
    ["11:00", "Trả lều, hoặc ở thêm đêm thứ hai"],
    ["12:00", "Ăn trưa nhẹ, chia tay"],
  ] },
];

/* ---- Quy định, cách đến, mùa ---- */
export const RULES = [
  ["Nhận và trả lều", "Nhận từ 14:00, trả trước 11:00. Trả muộn tính 100.000₫ mỗi giờ, tối đa đến 14:00."],
  ["Đặt cọc", "Đặt cọc 50% giá lều khi giữ chỗ, thanh toán phần còn lại khi nhận lều."],
  ["Huỷ và đổi ngày", "Huỷ trước 7 ngày: hoàn đủ cọc. Từ 3 đến 7 ngày: hoàn 50%. Trong 3 ngày hoặc không đến: không hoàn. Đổi ngày một lần trước 3 ngày, không phí."],
  ["Lửa và bếp", "Chỉ nhóm lửa ở khu bếp và lửa trại có nhân viên trông coi. Không đốt lửa, thắp nến, hút thuốc trong lều."],
  ["Yên tĩnh", "Giữ yên lặng sau 22:30, loa nhỏ ở khu lửa trại. Rác mang về khu thu gom."],
  ["Sức chứa", "Mỗi lều theo đúng số người ghi trên. Thêm người tính phụ thu hoặc ghép thêm lều, báo trước khi đến."],
];
export const ACCESS = [
  ["Từ trung tâm Đà Nẵng", "Khoảng 40 phút đi xe máy hoặc ô tô, hướng về chân núi Bà Nà, Hòa Vang."],
  ["Từ sân bay Đà Nẵng", "Khoảng 50 phút. Có thể đặt xe đón tại điểm hẹn ngoại thành, phụ phí tính theo xe."],
  ["Đoạn cuối", "Khoảng 3 km đường nhỏ, một số đoạn dốc và đất. Ô tô 4 đến 7 chỗ đi được khi trời khô; mưa lớn nên báo để chúng tôi đón."],
  ["Bản đồ chi tiết", "Gửi sau khi xác nhận đặt chỗ. Chúng tôi không đăng địa chỉ cụ thể trên trang."],
];
export const WEATHER = [
  ["Tháng 2 đến 5", "Mát, ít mưa, đêm 18 đến 22 độ. Mùa đẹp nhất để ngắm sao và đi trekking."],
  ["Tháng 6 đến 8", "Ban ngày nắng nóng, nên đi trekking sáng sớm. Tối thoáng, gió núi dễ chịu."],
  ["Tháng 9 đến 12", "Mùa mưa, sương nhiều, buổi sáng rất đẹp. Có thể có bão; chúng tôi báo đổi ngày không mất cọc."],
  ["Tháng 1", "Se lạnh, có thể ẩm. Mang áo ấm, lều có chăn dày."],
];
