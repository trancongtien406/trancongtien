import type { L10n, Lang } from "./tours";

/** Thông tin vận hành của Rong Dặm Tour (văn phòng cấp quận, liên hệ không gọi được). */
export const COMPANY = {
  name: "Rong Dặm Tour",
  phone: "0236 000 0000",
  email: "hello@rongdam.example",
  hours: { vi: "07:30–20:00 hằng ngày", en: "07:30–20:00 daily" } as L10n,
  office: { vi: "Văn phòng: Quận Hải Châu, Đà Nẵng", en: "Office: Hai Chau District, Da Nang" } as L10n,
  maxGuests: 12,
};

type Role = { id: "ops" | "guide" | "driver" | "care"; title: string; duty: string; meet: string };
type Step = { title: string; body: string };

export type Ops = {
  board: { eyebrow: string; title: string; lead: string; next: string; nextNote: string; tomorrow: string; today: string; colTime: string; colCode: string; colTrip: string; colPickup: string; colLen: string; daily: string; hh: string; mm: string; ss: string; seeTrip: string };
  price: { title: string; lead: string; caption: string; tour: string; adultsWord: string; withAdm: string; svcOnly: string; foot: string };
  combo: { eyebrow: string; title: string; lead: string; day: string; intro: string; incl: string; hint: string; region: string };
  team: {
    eyebrow: string; title: string; lead: string; roles: Role[];
    carTitle: string; carItems: string[]; carNote: string;
  };
  book: {
    eyebrow: string; title: string; lead: string; steps: Step[]; depositTitle: string; deposit: string[];
    sumTitle: string; sumTour: string; sumGuests: string; sumTotal: string; sumNote: string; cta: string; cta2: string; ctaNote: string;
  };
};

export const OPS: Record<Lang, Ops> = {
  vi: {
    board: {
      eyebrow: "02 / Lịch khởi hành",
      title: "Mỗi sáng một bảng giờ, xe đón đúng giờ.",
      lead: "Sáu hành trình khởi hành hằng ngày từ Đà Nẵng. Giờ dưới đây là giờ xe đón khách đầu tiên; điểm đón và giờ chính xác được xác nhận lại vào chiều hôm trước.",
      next: "Chuyến khởi hành kế tiếp",
      nextNote: "theo giờ Việt Nam (UTC+7)",
      tomorrow: "Sáng mai",
      today: "Hôm nay",
      colTime: "Giờ đón",
      colCode: "Mã",
      colTrip: "Hành trình",
      colPickup: "Điểm đón",
      colLen: "Thời lượng",
      daily: "Hằng ngày",
      hh: "giờ",
      mm: "phút",
      ss: "giây",
      seeTrip: "Xem lịch trình",
    },
    price: {
      title: "Bảng giá theo nhóm",
      lead: "Tổng giá cho cả nhóm người lớn. Trẻ em 5–11 tuổi tính theo giá trẻ em trong công cụ tính giá bên dưới.",
      caption: "Tổng giá dịch vụ theo số người lớn trong nhóm",
      tour: "Hành trình",
      adultsWord: "người lớn",
      withAdm: "Gồm vé tham quan dự kiến",
      svcOnly: "Chưa gồm vé tham quan",
      foot: "Giá tham khảo. Combo 3 ngày chưa gồm phụ thu phòng riêng 600.000 ₫/người. Nhóm trên 12 khách: liên hệ để tách xe.",
    },
    combo: {
      eyebrow: "06 / Combo 3 ngày 2 đêm",
      title: "Ba ngày, ba nhịp: núi, di sản, biển.",
      lead: "Kéo ngang để xem từng ngày của combo RD-06: giờ đi, điểm dừng và chỗ nghỉ đêm.",
      day: "Ngày",
      intro: "Gồm xe theo lịch trình, hướng dẫn viên, hai đêm khách sạn phòng đôi, hai bữa sáng, hai bữa trưa và nước uống.",
      incl: "Đã bao gồm",
      hint: "Cuộn để xem tiếp →",
      region: "Lịch trình combo 3 ngày 2 đêm, cuộn ngang",
    },
    team: {
      eyebrow: "07 / Xe và đội ngũ",
      title: "Ai đón bạn, ai đi cùng bạn.",
      lead: "Mỗi chuyến có bốn vai trò rõ ràng. Bạn biết mình sẽ gặp ai, vào lúc nào.",
      roles: [
        { id: "ops", title: "Điều hành tour", duty: "Chốt giờ đón, điểm đón và xe cho từng đoàn, nhắn xác nhận vào chiều hôm trước.", meet: "Bạn gặp: tin nhắn xác nhận chuyến" },
        { id: "guide", title: "Hướng dẫn viên", duty: "Đi cùng suốt hành trình, kể chuyện điểm đến, nhắc giờ tập trung, hỗ trợ mua vé tham quan.", meet: "Bạn gặp: tại sảnh khách sạn" },
        { id: "driver", title: "Lái xe", duty: "Đón và trả đúng giờ, giữ xe sạch, chạy đúng tốc độ cho phép và dừng nghỉ theo lịch trình.", meet: "Bạn gặp: trên xe đón" },
        { id: "care", title: "Chăm sóc khách hàng", duty: "Giải đáp trước chuyến, đổi lịch theo chính sách, hỗ trợ khi có thay đổi thời tiết.", meet: "Bạn gặp: hotline và tin nhắn" },
      ],
      carTitle: "Xe 16 chỗ cho đoàn nhỏ",
      carItems: ["Điều hoà, ghế ngả", "Cổng sạc USB mỗi hàng ghế", "Nước uống trên xe", "Đoàn tối đa 12 khách để ngồi rộng"],
      carNote: "Xe đón có bảng ghi mã chuyến (ví dụ RD-02) đặt ở kính trước.",
    },
    book: {
      eyebrow: "10 / Đặt tour",
      title: "Đặt tour trong bốn bước.",
      lead: "Bạn chọn tour và số khách, gửi yêu cầu, nhân viên xác nhận lại bằng điện thoại hoặc tin nhắn. Website không thu tiền và không thu giấy tờ cá nhân.",
      steps: [
        { title: "Chọn tour và số khách", body: "Xem lịch trình, bản đồ và tính tổng chi phí cho nhóm của bạn ở phần Lịch trình." },
        { title: "Gửi yêu cầu đặt tour", body: "Điền ngày đi, số khách và khách sạn đang ở trong form tư vấn." },
        { title: "Xác nhận và đặt cọc", body: "Nhân viên xác nhận chỗ trong giờ làm việc. Đặt cọc 30% để giữ chỗ (combo 3 ngày: 50%)." },
        { title: "Xe đón tại khách sạn", body: "Chiều hôm trước bạn nhận tin nhắn giờ đón và số điện thoại hướng dẫn viên." },
      ],
      depositTitle: "Đặt cọc và huỷ",
      deposit: ["Tour trong ngày: huỷ trước 48 giờ hoàn 100% giá dịch vụ.", "Combo 3 ngày: huỷ trước 7 ngày hoàn 100% giá dịch vụ.", "Vé tham quan mua riêng theo quy định của từng điểm."],
      sumTitle: "Yêu cầu đặt tour của bạn",
      sumTour: "Hành trình",
      sumGuests: "Số khách",
      sumTotal: "Tổng dự kiến",
      sumNote: "Thông tin lấy từ công cụ tính giá. Bạn có thể đổi ở phần Lịch trình.",
      cta: "Gửi yêu cầu đặt tour",
      cta2: "Đổi tour hoặc số khách",
      ctaNote: "Mở form tư vấn của Trần Công Tiến, nơi nhận yêu cầu của bạn. Chưa có khoản thanh toán nào được thực hiện.",
    },
  },
  en: {
    board: {
      eyebrow: "02 / Departures",
      title: "One board every morning, pickups on time.",
      lead: "Six trips leave Da Nang every day. The time shown is the first hotel pickup; exact pickup point and time are confirmed the afternoon before.",
      next: "Next departure",
      nextNote: "Vietnam time (UTC+7)",
      tomorrow: "Tomorrow morning",
      today: "Today",
      colTime: "Pickup",
      colCode: "Code",
      colTrip: "Trip",
      colPickup: "Pickup area",
      colLen: "Length",
      daily: "Daily",
      hh: "hrs",
      mm: "min",
      ss: "sec",
      seeTrip: "See the itinerary",
    },
    price: {
      title: "Group price table",
      lead: "Total for a group of adults. Children aged 5–11 use the child rate in the price estimator below.",
      caption: "Total tour price by number of adults in the group",
      tour: "Trip",
      adultsWord: "adults",
      withAdm: "Include estimated admission",
      svcOnly: "Admission not included",
      foot: "Reference prices. The 3-day combo excludes the VND 600,000 per person single-room supplement. Groups above 12: get in touch to split vehicles.",
    },
    combo: {
      eyebrow: "06 / 3-day combo",
      title: "Three days, three paces: mountain, heritage, coast.",
      lead: "Scroll sideways through each day of combo RD-06: times, stops and where you sleep.",
      day: "Day",
      intro: "Includes scheduled transport, a guide, two hotel nights in a twin/double room, two breakfasts, two lunches and drinking water.",
      incl: "Included",
      hint: "Keep scrolling →",
      region: "3 days 2 nights combo itinerary, horizontal scroll",
    },
    team: {
      eyebrow: "07 / Vehicles and team",
      title: "Who picks you up, who goes with you.",
      lead: "Every trip has four clear roles, so you know who you will meet and when.",
      roles: [
        { id: "ops", title: "Tour operations", duty: "Fixes pickup time, pickup point and vehicle for each group and sends confirmation the afternoon before.", meet: "You meet: the confirmation message" },
        { id: "guide", title: "Tour guide", duty: "Stays with you all trip, tells the story of each place, calls meeting times and helps with admission tickets.", meet: "You meet: in the hotel lobby" },
        { id: "driver", title: "Driver", duty: "Picks up and drops off on time, keeps the vehicle clean, drives within the limit and stops as scheduled.", meet: "You meet: at the vehicle" },
        { id: "care", title: "Guest care", duty: "Answers questions before the trip, handles date changes under the policy, helps when the weather shifts.", meet: "You meet: hotline and messages" },
      ],
      carTitle: "16-seat vehicle for small groups",
      carItems: ["Air-conditioned, reclining seats", "USB charging at each row", "Drinking water on board", "Groups capped at 12 so everyone has space"],
      carNote: "The pickup vehicle shows the trip code (for example RD-02) on the windscreen.",
    },
    book: {
      eyebrow: "10 / Booking",
      title: "Book in four steps.",
      lead: "Pick a trip and group size, send a request, and our staff confirm by phone or message. This website takes no payment and no personal documents.",
      steps: [
        { title: "Choose trip and group", body: "Check the itinerary, map and total cost for your group in the Itinerary section." },
        { title: "Send a booking request", body: "Give your date, group size and hotel in the enquiry form." },
        { title: "Confirm and deposit", body: "Staff confirm your seats during office hours. A 30% deposit holds the booking (50% for the 3-day combo)." },
        { title: "Hotel pickup", body: "The afternoon before, you receive the pickup time and your guide's phone number." },
      ],
      depositTitle: "Deposit and cancellation",
      deposit: ["Day trips: cancel 48 hours ahead for a 100% refund of the tour price.", "3-day combo: cancel 7 days ahead for a 100% refund of the tour price.", "Admission tickets are bought separately under each site's rules."],
      sumTitle: "Your booking request",
      sumTour: "Trip",
      sumGuests: "Guests",
      sumTotal: "Estimated total",
      sumNote: "Taken from the price estimator. Change it in the Itinerary section.",
      cta: "Send a booking request",
      cta2: "Change trip or group size",
      ctaNote: "Opens the contact form of Tran Cong Tien, where your request is received. No payment has been made.",
    },
  },
};
