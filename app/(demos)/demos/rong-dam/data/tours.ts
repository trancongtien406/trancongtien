/**
 * Dữ liệu tour của Rong Dặm. Giá, giờ, thời lượng, chính sách chỉ mang tính tham khảo, không phải báo giá.
 * Tiền lưu dạng số nguyên VND.
 */
export type Lang = "vi" | "en";
export type L10n = { vi: string; en: string };
export type TourId = "RD-01" | "RD-02" | "RD-03" | "RD-04" | "RD-05" | "RD-06";
export type Interest = "nature" | "culture" | "food" | "photography" | "relaxation";
export type Companion = "solo" | "couple" | "family" | "friends";
export type DurationKind = "half-day" | "one-day" | "multi-day";
export type PlaceId = "danang" | "banahills" | "hoian" | "myson" | "sontra" | "nguhanhson" | "hue";

export type Stop = { id: string; time: string; place: PlaceId; label: L10n };
export type Day = { id: string; title: L10n; stops: Stop[] };

export type Tour = {
  id: TourId;
  name: L10n;
  subtitle: L10n;
  summary: L10n;
  photo: string;
  photoPos: string;
  departure: string;
  end: string;
  durationLabel: L10n;
  durationKind: DurationKind;
  pickup: L10n;
  effort: L10n;
  interests: Interest[];
  companions: Companion[];
  pricing: {
    adultBase: number;
    childBase: number;
    adultAdmission: number;
    childAdmission: number;
    singleRoomSupplement: number;
  };
  included: L10n[];
  excluded: L10n[];
  cancel: "A" | "B";
  days: Day[];
};

const s = (id: string, time: string, place: PlaceId, vi: string, en: string): Stop => ({ id, time, place, label: { vi, en } });

export const TOURS: Tour[] = [
  {
    id: "RD-01",
    name: { vi: "Bà Nà: Chạm vào mây", en: "Ba Na Hills: Above the Clouds" },
    subtitle: { vi: "Một ngày lên núi", en: "A day in the mountains" },
    summary: {
      vi: "Một ngày đổi gió từ phố biển lên miền núi. Đi qua những tầng mây, ngắm Cầu Vàng, dạo quanh các công trình trên đỉnh Bà Nà và dành thời gian lưu lại những khung hình yêu thích.",
      en: "Trade the coast for the mountains. Rise above the clouds, discover the Golden Bridge, wander through Ba Na Hills and take your time capturing the views.",
    },
    photo: "ba-na-bien-may",
    photoPos: "50% 55%",
    departure: "07:30",
    end: "17:30",
    durationLabel: { vi: "10 giờ", en: "10 hours" },
    durationKind: "one-day",
    pickup: { vi: "Khách sạn khu vực Mỹ Khê hoặc trung tâm Đà Nẵng", en: "Hotels in the My Khe area or central Da Nang" },
    effort: { vi: "Trung bình", en: "Moderate" },
    interests: ["nature", "photography"],
    companions: ["couple", "family", "friends"],
    pricing: { adultBase: 650000, childBase: 450000, adultAdmission: 950000, childAdmission: 750000, singleRoomSupplement: 0 },
    included: [
      { vi: "Xe đưa đón", en: "Transfers" },
      { vi: "Hướng dẫn viên", en: "Guide" },
      { vi: "Nước uống", en: "Drinking water" },
    ],
    excluded: [
      { vi: "Vé cáp treo và tham quan (tách riêng)", en: "Cable car and admission (listed separately)" },
      { vi: "Bữa trưa tự túc", en: "Lunch at your own expense" },
      { vi: "Chi phí cá nhân", en: "Personal expenses" },
    ],
    cancel: "A",
    days: [
      {
        id: "day-1",
        title: { vi: "Chạm mây", en: "Above the clouds" },
        stops: [
          s("1-1", "07:30", "danang", "Đón khách tại Đà Nẵng", "Hotel pickup in Da Nang"),
          s("1-2", "09:00", "banahills", "Đến Bà Nà, chuẩn bị lên cáp treo", "Arrive at Ba Na Hills and prepare for the cable car"),
          s("1-3", "10:00", "banahills", "Khám phá Cầu Vàng", "Discover the Golden Bridge"),
          s("1-4", "11:30", "banahills", "Dạo khu vườn và các điểm tham quan", "Explore gardens and scenic attractions"),
          s("1-5", "12:30", "banahills", "Nghỉ trưa, ăn uống tự túc", "Lunch at your own expense"),
          s("1-6", "14:00", "banahills", "Tự do khám phá khu vực trên núi", "Free time to explore the hilltop"),
          s("1-7", "15:45", "banahills", "Tập trung và xuống núi", "Meet up and descend the mountain"),
          s("1-8", "17:30", "danang", "Trả khách tại Đà Nẵng", "Return to Da Nang"),
        ],
      },
    ],
  },
  {
    id: "RD-02",
    name: { vi: "Phố Hội lên đèn", en: "Hoi An: When the Lanterns Glow" },
    subtitle: { vi: "Nửa ngày chiều tối", en: "An afternoon into evening" },
    summary: {
      vi: "Theo những con hẻm nhỏ vào phố cổ, nếm một chút hương vị địa phương, ngắm dòng sông khi trời tối và trải nghiệm đèn hoa đăng theo hình thức được phép tại điểm đến.",
      en: "Wander down old alleyways, sample local flavours and watch the riverside transform after dark, with a lantern experience where locally permitted.",
    },
    photo: "hoi-an-cau-chua",
    photoPos: "50% 55%",
    departure: "15:00",
    end: "21:00",
    durationLabel: { vi: "6 giờ", en: "6 hours" },
    durationKind: "half-day",
    pickup: { vi: "Khách sạn trung tâm Đà Nẵng hoặc Mỹ Khê", en: "Hotels in central Da Nang or My Khe" },
    effort: { vi: "Nhẹ đến trung bình", en: "Light to moderate" },
    interests: ["culture", "food", "photography", "relaxation"],
    companions: ["solo", "couple", "family", "friends"],
    pricing: { adultBase: 490000, childBase: 340000, adultAdmission: 180000, childAdmission: 100000, singleRoomSupplement: 0 },
    included: [
      { vi: "Xe đưa đón", en: "Transfers" },
      { vi: "Hướng dẫn viên", en: "Guide" },
      { vi: "Phần ăn nhẹ", en: "Light snack" },
      { vi: "Trải nghiệm hoa đăng khi được phép", en: "Lantern experience where permitted" },
    ],
    excluded: [
      { vi: "Vé tham quan phố cổ (tách riêng)", en: "Old town admission (listed separately)" },
      { vi: "Đi thuyền tuỳ chọn", en: "Optional boat ride" },
      { vi: "Bữa tối đầy đủ", en: "Full dinner" },
      { vi: "Chi phí cá nhân", en: "Personal expenses" },
    ],
    cancel: "A",
    days: [
      {
        id: "day-1",
        title: { vi: "Phố Hội", en: "Hoi An" },
        stops: [
          s("2-1", "15:00", "danang", "Đón khách, di chuyển đến Hội An", "Pickup and transfer to Hoi An"),
          s("2-2", "16:00", "hoian", "Tản bộ phố cổ", "Walk through the ancient town"),
          s("2-3", "17:00", "hoian", "Thưởng thức món ăn nhẹ địa phương", "Taste local snacks"),
          s("2-4", "18:00", "hoian", "Ngắm phố Hội khi lên đèn", "See the lanterns light up"),
          s("2-5", "18:45", "hoian", "Trải nghiệm hoa đăng nếu điều kiện cho phép", "Lantern experience, subject to local conditions"),
          s("2-6", "19:30", "hoian", "Tự do dạo phố", "Free time in the old town"),
          s("2-7", "20:15", "hoian", "Khởi hành về Đà Nẵng", "Depart for Da Nang"),
          s("2-8", "21:00", "danang", "Trả khách", "Hotel drop-off"),
        ],
      },
    ],
  },
  {
    id: "RD-03",
    name: { vi: "Theo dấu Chăm Pa", en: "My Son: Tracing Cham Heritage" },
    subtitle: { vi: "Một buổi sáng di sản", en: "A heritage morning" },
    summary: {
      vi: "Dành một buổi sáng cho những câu chuyện được lưu giữ trong các đền tháp Mỹ Sơn. Một hành trình nhẹ nhàng cho người tò mò về văn hoá, kiến trúc và lịch sử.",
      en: "Spend a morning discovering the stories preserved in My Son's ancient temples, with time to appreciate Cham culture, architecture and history.",
    },
    photo: "my-son-thap",
    photoPos: "50% 40%",
    departure: "07:00",
    end: "12:30",
    durationLabel: { vi: "5,5 giờ", en: "5.5 hours" },
    durationKind: "half-day",
    pickup: { vi: "Khách sạn khu vực trung tâm Đà Nẵng", en: "Hotels in central Da Nang" },
    effort: { vi: "Trung bình", en: "Moderate" },
    interests: ["culture", "nature", "photography"],
    companions: ["solo", "couple", "friends"],
    pricing: { adultBase: 450000, childBase: 310000, adultAdmission: 150000, childAdmission: 75000, singleRoomSupplement: 0 },
    included: [
      { vi: "Xe đưa đón", en: "Transport" },
      { vi: "Hướng dẫn viên", en: "Guide" },
      { vi: "Nước uống", en: "Drinking water" },
    ],
    excluded: [
      { vi: "Vé tham quan (tách riêng)", en: "Admission (listed separately)" },
      { vi: "Bữa ăn", en: "Meals" },
      { vi: "Chi phí cá nhân", en: "Personal expenses" },
    ],
    cancel: "A",
    days: [
      {
        id: "day-1",
        title: { vi: "Mỹ Sơn", en: "My Son" },
        stops: [
          s("3-1", "07:00", "danang", "Đón khách", "Hotel pickup"),
          s("3-2", "08:30", "myson", "Đến khu vực Mỹ Sơn", "Arrive at My Son"),
          s("3-3", "09:00", "myson", "Khám phá các nhóm đền tháp", "Explore the temple complexes"),
          s("3-4", "10:15", "myson", "Nghe câu chuyện về kiến trúc Chăm Pa", "Learn about Cham architecture"),
          s("3-5", "11:00", "myson", "Nghỉ ngơi, chuẩn bị trở về", "Rest and prepare to return"),
          s("3-6", "12:30", "danang", "Trả khách tại Đà Nẵng", "Return to Da Nang"),
        ],
      },
    ],
  },
  {
    id: "RD-04",
    name: { vi: "Từ biển đến núi", en: "Da Nang: Coast to Mountain" },
    subtitle: { vi: "Sơn Trà và Ngũ Hành Sơn", en: "Son Tra and the Marble Mountains" },
    summary: {
      vi: "Khám phá một Đà Nẵng vừa xanh vừa yên, từ bán đảo Sơn Trà đến những khối đá, hang động và không gian văn hoá tại Ngũ Hành Sơn.",
      en: "Discover a greener, quieter side of Da Nang, from the Son Tra Peninsula to the rocky landscapes, caves and cultural sites of the Marble Mountains.",
    },
    photo: "son-tra-phat",
    photoPos: "50% 38%",
    departure: "08:00",
    end: "15:00",
    durationLabel: { vi: "7 giờ", en: "7 hours" },
    durationKind: "one-day",
    pickup: { vi: "Khách sạn khu vực Mỹ Khê và trung tâm", en: "Hotels in My Khe and the city centre" },
    effort: { vi: "Trung bình", en: "Moderate" },
    interests: ["nature", "culture", "photography"],
    companions: ["solo", "couple", "family", "friends"],
    pricing: { adultBase: 590000, childBase: 410000, adultAdmission: 80000, childAdmission: 40000, singleRoomSupplement: 0 },
    included: [
      { vi: "Xe đưa đón", en: "Transfers" },
      { vi: "Hướng dẫn viên", en: "Guide" },
      { vi: "Bữa trưa", en: "Lunch" },
      { vi: "Nước uống", en: "Drinking water" },
    ],
    excluded: [
      { vi: "Vé khu tham quan có thu phí (tách riêng)", en: "Paid attraction admission (listed separately)" },
      { vi: "Thang máy tuỳ chọn", en: "Optional elevator services" },
      { vi: "Chi phí cá nhân", en: "Personal expenses" },
    ],
    cancel: "A",
    days: [
      {
        id: "day-1",
        title: { vi: "Biển và núi", en: "Sea and stone" },
        stops: [
          s("4-1", "08:00", "danang", "Đón khách", "Hotel pickup"),
          s("4-2", "08:30", "sontra", "Khám phá khu vực Sơn Trà", "Explore the Son Tra Peninsula"),
          s("4-3", "10:00", "sontra", "Tham quan khu vực chùa Linh Ứng", "Visit the Linh Ung Pagoda area"),
          s("4-4", "11:30", "danang", "Nghỉ trưa", "Lunch break"),
          s("4-5", "13:00", "nguhanhson", "Khám phá Ngũ Hành Sơn", "Explore the Marble Mountains"),
          s("4-6", "14:30", "nguhanhson", "Tập trung trở về", "Meet up for the return journey"),
          s("4-7", "15:00", "danang", "Trả khách", "Hotel drop-off"),
        ],
      },
    ],
  },
  {
    id: "RD-05",
    name: { vi: "Một ngày qua đất cố đô", en: "Hue: A Day in the Imperial City" },
    subtitle: { vi: "Ngày dài ở Huế", en: "A long day in Hue" },
    summary: {
      vi: "Một ngày để gặp Huế qua những mái ngói, cổng thành, công trình di sản và hương vị đặc trưng của đất cố đô.",
      en: "Spend a day getting to know Hue through its historic gateways, imperial architecture, cultural heritage and distinctive local flavours.",
    },
    photo: "hue-dai-noi",
    photoPos: "50% 50%",
    departure: "06:30",
    end: "19:30",
    durationLabel: { vi: "13 giờ", en: "13 hours" },
    durationKind: "one-day",
    pickup: { vi: "Khách sạn trung tâm Đà Nẵng", en: "Hotels in central Da Nang" },
    effort: { vi: "Trung bình, ngày dài", en: "Moderate, a long day" },
    interests: ["culture", "food", "photography"],
    companions: ["solo", "couple", "friends"],
    pricing: { adultBase: 890000, childBase: 620000, adultAdmission: 350000, childAdmission: 175000, singleRoomSupplement: 0 },
    included: [
      { vi: "Xe đưa đón", en: "Transfers" },
      { vi: "Hướng dẫn viên", en: "Guide" },
      { vi: "Bữa trưa món Huế", en: "Hue-style lunch" },
      { vi: "Nước uống", en: "Drinking water" },
    ],
    excluded: [
      { vi: "Vé tham quan di tích (tách riêng)", en: "Heritage site admission (listed separately)" },
      { vi: "Chi phí cá nhân", en: "Personal expenses" },
    ],
    cancel: "A",
    days: [
      {
        id: "day-1",
        title: { vi: "Đất cố đô", en: "The old capital" },
        stops: [
          s("5-1", "06:30", "danang", "Đón khách, khởi hành đi Huế", "Pickup and departure for Hue"),
          s("5-2", "09:30", "hue", "Tham quan khu vực Đại Nội", "Explore the Imperial City"),
          s("5-3", "12:00", "hue", "Thưởng thức bữa trưa món Huế", "Enjoy a Hue-style lunch"),
          s("5-4", "13:30", "hue", "Tham quan chùa Thiên Mụ", "Visit Thien Mu Pagoda"),
          s("5-5", "15:00", "hue", "Khám phá một điểm di sản lăng tẩm", "Explore an imperial tomb"),
          s("5-6", "16:30", "hue", "Khởi hành về Đà Nẵng", "Depart for Da Nang"),
          s("5-7", "19:30", "danang", "Trả khách", "Hotel drop-off"),
        ],
      },
    ],
  },
  {
    id: "RD-06",
    name: { vi: "Ba ngày rong ruổi", en: "Three Days of Wandering" },
    subtitle: { vi: "Combo 3 ngày 2 đêm", en: "3 days, 2 nights" },
    summary: {
      vi: "Ba ngày vừa đủ để làm quen với nhịp sống miền Trung. Một ngày chạm mây ở Bà Nà, một ngày miền di sản và phố Hội, một ngày dành cho biển, núi và phố phường Đà Nẵng.",
      en: "Three unhurried days to get a feel for Central Vietnam: mountain views in Ba Na Hills, heritage and lantern-lit streets, then the coast and city life of Da Nang.",
    },
    photo: "da-nang-cau-rong",
    photoPos: "50% 50%",
    departure: "08:00",
    end: "15:00",
    durationLabel: { vi: "3 ngày 2 đêm", en: "3 days, 2 nights" },
    durationKind: "multi-day",
    pickup: { vi: "Khách sạn khu vực trung tâm Đà Nẵng", en: "Hotels in central Da Nang" },
    effort: { vi: "Trung bình", en: "Moderate" },
    interests: ["nature", "culture", "food", "photography", "relaxation"],
    companions: ["couple", "family", "friends"],
    pricing: { adultBase: 2990000, childBase: 2090000, adultAdmission: 1360000, childAdmission: 965000, singleRoomSupplement: 600000 },
    included: [
      { vi: "Xe theo lịch trình", en: "Scheduled transfers" },
      { vi: "Hướng dẫn viên", en: "Guide" },
      { vi: "Hai đêm khách sạn, phòng hai người", en: "Two nights in a twin/double room" },
      { vi: "Hai bữa sáng, hai bữa trưa, nước uống", en: "Two breakfasts, two lunches, drinking water" },
    ],
    excluded: [
      { vi: "Vé cáp treo Bà Nà, Mỹ Sơn, phố cổ, Ngũ Hành Sơn (tách riêng)", en: "Cable car, My Son, old town and Marble Mountains admission (listed separately)" },
      { vi: "Các bữa không được liệt kê", en: "Unlisted meals" },
      { vi: "Phụ thu phòng riêng", en: "Single-room supplement" },
      { vi: "Chi phí cá nhân", en: "Personal expenses" },
    ],
    cancel: "B",
    days: [
      {
        id: "day-1",
        title: { vi: "Chạm mây", en: "Above the clouds" },
        stops: [
          s("6-1-1", "08:00", "danang", "Đón khách", "Meet your guide"),
          s("6-1-2", "09:30", "banahills", "Đến Bà Nà", "Arrive at Ba Na Hills"),
          s("6-1-3", "10:30", "banahills", "Khám phá Cầu Vàng", "Discover the Golden Bridge"),
          s("6-1-4", "12:30", "banahills", "Nghỉ trưa, tự do tham quan", "Lunch break and free time"),
          s("6-1-5", "16:00", "banahills", "Xuống núi", "Descend the mountain"),
          s("6-1-6", "17:30", "danang", "Nhận phòng khách sạn", "Hotel check-in"),
          s("6-1-7", "19:00", "danang", "Tự do buổi tối", "Evening at leisure"),
        ],
      },
      {
        id: "day-2",
        title: { vi: "Di sản và đèn lồng", en: "Heritage and lanterns" },
        stops: [
          s("6-2-1", "07:00", "danang", "Khởi hành đi Mỹ Sơn", "Depart for My Son"),
          s("6-2-2", "08:30", "myson", "Tham quan đền tháp", "Explore the temples"),
          s("6-2-3", "11:30", "myson", "Ăn trưa, nghỉ ngơi", "Lunch and rest"),
          s("6-2-4", "14:30", "hoian", "Đến Hội An", "Arrive in Hoi An"),
          s("6-2-5", "16:00", "hoian", "Dạo phố cổ", "Explore the ancient town"),
          s("6-2-6", "18:45", "hoian", "Trải nghiệm hoa đăng nếu được phép", "Lantern experience where permitted"),
          s("6-2-7", "21:00", "danang", "Về khách sạn", "Return to the hotel"),
        ],
      },
      {
        id: "day-3",
        title: { vi: "Từ biển đến núi", en: "Coast to mountain" },
        stops: [
          s("6-3-1", "08:00", "sontra", "Khởi hành đi Sơn Trà", "Depart for Son Tra"),
          s("6-3-2", "09:00", "sontra", "Tham quan khu vực Linh Ứng", "Visit the Linh Ung Pagoda area"),
          s("6-3-3", "11:00", "danang", "Trả phòng khách sạn", "Hotel check-out"),
          s("6-3-4", "12:00", "danang", "Ăn trưa", "Lunch"),
          s("6-3-5", "13:00", "nguhanhson", "Tham quan Ngũ Hành Sơn", "Explore the Marble Mountains"),
          s("6-3-6", "15:00", "danang", "Kết thúc hành trình", "End of the trip"),
        ],
      },
    ],
  },
];

export const TOUR_IDS = TOURS.map((t) => t.id);
export const getTour = (id: string | null | undefined): Tour => TOURS.find((t) => t.id === id) ?? TOURS[0];
export const isTourId = (id: unknown): id is TourId => typeof id === "string" && TOUR_IDS.includes(id as TourId);

/** Điểm trên bản đồ (viewBox 1000×680, bắc ở trên, biển bên phải). */
export const PLACES: Record<PlaceId, { x: number; y: number; name: L10n }> = {
  hue: { x: 560, y: 78, name: { vi: "Huế", en: "Hue" } },
  sontra: { x: 790, y: 272, name: { vi: "Sơn Trà", en: "Son Tra" } },
  banahills: { x: 455, y: 285, name: { vi: "Bà Nà", en: "Ba Na Hills" } },
  danang: { x: 660, y: 345, name: { vi: "Đà Nẵng", en: "Da Nang" } },
  nguhanhson: { x: 705, y: 440, name: { vi: "Ngũ Hành Sơn", en: "Marble Mountains" } },
  hoian: { x: 705, y: 525, name: { vi: "Hội An", en: "Hoi An" } },
  myson: { x: 470, y: 570, name: { vi: "Mỹ Sơn", en: "My Son" } },
};

export const CANCEL_POLICY: Record<"A" | "B", { title: L10n; rows: { when: L10n; refund: string }[] }> = {
  A: {
    title: { vi: "Chính sách huỷ A (tour trong ngày)", en: "Cancellation policy A (day trips)" },
    rows: [
      { when: { vi: "Từ 48 giờ trở lên trước giờ khởi hành", en: "48 hours or more before departure" }, refund: "100%" },
      { when: { vi: "Từ 24 đến dưới 48 giờ", en: "24 to under 48 hours" }, refund: "50%" },
      { when: { vi: "Dưới 24 giờ hoặc không có mặt", en: "Under 24 hours or no-show" }, refund: "0%" },
    ],
  },
  B: {
    title: { vi: "Chính sách huỷ B (combo nhiều ngày)", en: "Cancellation policy B (multi-day)" },
    rows: [
      { when: { vi: "Từ 7 ngày trở lên trước giờ khởi hành", en: "7 days or more before departure" }, refund: "100%" },
      { when: { vi: "Từ 3 đến dưới 7 ngày", en: "3 to under 7 days" }, refund: "70%" },
      { when: { vi: "Từ 24 giờ đến dưới 3 ngày", en: "24 hours to under 3 days" }, refund: "30%" },
      { when: { vi: "Dưới 24 giờ", en: "Under 24 hours" }, refund: "0%" },
    ],
  },
};
