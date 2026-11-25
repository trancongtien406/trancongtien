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
  cap: number;
  text: string;
  perks: string[];
  photo: string;
  alt: string;
  position: string;
};

export const TENTS: Tent[] = [
  { id: "moc", name: "Lều Mộc", mood: "Ấm cúng", price: 890_000, cap: 2, text: "Không gian nhỏ xinh bằng vải canvas, ánh đèn vàng và cảm giác gần gũi. Hợp với cặp đôi hoặc người thích kỳ nghỉ giản dị.", perks: ["Giường đôi", "Góc ngồi thư giãn", "Ánh sáng ấm"], photo: "bell-tent", alt: "Lều chuông màu kem giữa rừng thông, treo cờ đèn nhỏ", position: "50% 60%" },
  { id: "rung", name: "Lều Rừng", mood: "Cân bằng", price: 1_290_000, cap: 3, text: "Rộng hơn, có khoảng sinh hoạt riêng, dáng lều chữ A giữa rừng. Dành cho gia đình nhỏ hoặc nhóm bạn thân.", perks: ["Khu ngủ rộng", "Không gian sinh hoạt", "Góc hiên"], photo: "tent-night", alt: "Lều chữ A sáng đèn trong rừng thông ban đêm", position: "50% 55%" },
  { id: "may", name: "Lều Mây", mood: "Mở rộng", price: 1_790_000, cap: 4, text: "Rộng và thoáng, ưu tiên cảm giác riêng tư cùng góc nhìn mở ra thiên nhiên, có sàn gỗ và dây đèn.", perks: ["Không gian ngủ rộng", "Khu thư giãn riêng", "Thiết kế mở đón sáng"], photo: "fairy-tent", alt: "Lều glamping trên sàn gỗ với dây đèn vàng ban đêm", position: "50% 70%" },
];

export type Activity = {
  id: "bbq" | "trek" | "stars" | "atv";
  name: string;
  price: number;
  text: string;
};

export const ACTIVITIES: Activity[] = [
  { id: "bbq", name: "BBQ giữa rừng", price: 250_000, text: "Bữa tối ngoài trời: cùng chuẩn bị món, nướng trên than và ăn khi trời đã tối hẳn." },
  { id: "trek", name: "Trekking", price: 150_000, text: "Đi theo những lối mòn nhẹ trong rừng với chương trình phù hợp điều kiện thực tế." },
  { id: "stars", name: "Ngắm sao", price: 80_000, text: "Tìm một góc yên tĩnh, tắt bớt đèn, ngước nhìn bầu trời đêm vùng núi." },
  { id: "atv", name: "Xe địa hình", price: 350_000, text: "Thêm chút phiêu lưu: chạy xe theo tuyến có người dẫn, tuỳ điều kiện đường và thời tiết." },
];

export const FAQ = [
  { q: "Rừng Thức nằm ở đâu?", a: "Rừng Thức hướng tới trải nghiệm glamping và camping ở vùng núi gần Đà Nẵng, quanh khu vực Bà Nà, Hải Vân và bán đảo Sơn Trà. Vị trí lưu trú cụ thể được gửi khi bạn trao đổi chuyến đi." },
  { q: "Tôi nên chuẩn bị gì khi đi camping?", a: "Trang phục thoải mái, giày phù hợp địa hình, áo khoác mỏng cho buổi tối, đồ dùng cá nhân và thuốc cá nhân nếu bạn cần. Với hoạt động ngoài trời, hãy ưu tiên đồ hợp thời tiết." },
  { q: "Có thể đi cùng trẻ em không?", a: "Tuỳ loại lều, địa điểm và hoạt động bạn chọn. Hãy cho chúng mình biết độ tuổi của bé để được tư vấn phương án phù hợp." },
  { q: "Trời mưa hoặc thời tiết xấu thì sao?", a: "Một số hoạt động ngoài trời có thể được đổi giờ, tạm hoãn hoặc không tổ chức khi thời tiết không phù hợp. Lịch trình sẽ được điều chỉnh theo điều kiện thực tế." },
  { q: "Chi phí trong công cụ lên kế hoạch đã là giá cuối chưa?", a: "Chưa. Đó là mức tham khảo để bạn hình dung ngân sách. Giá xác nhận có thể thay đổi theo thời điểm, loại lều, số người, dịch vụ chọn và điều kiện áp dụng lúc đặt." },
];
