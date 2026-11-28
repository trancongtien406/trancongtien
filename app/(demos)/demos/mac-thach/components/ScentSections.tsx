"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Calendar, Check, ShoppingBag, Sparkles } from "lucide-react";
import styles from "../brand.module.css";
import {
  ATELIER_PILLARS,
  DISCOVERY_SET,
  FRAGRANCES,
  formatVnd,
  type Fragrance,
} from "../data";

type Props = {
  onInspectFragrance: (id: string) => void;
  onAddToCart: (fragrance: Fragrance, ml: 50 | 100) => void;
  onAddDiscovery: () => void;
};

const MOOD_FILTERS: { id: "all" | Fragrance["mood"]; label: string }[] = [
  { id: "all", label: "Tất cả 5 mùi hương" },
  { id: "tram-am", label: "Trầm ấm" },
  { id: "hoa-dem", label: "Hoa đêm" },
  { id: "suong-lanh", label: "Sương lạnh" },
  { id: "bien-sau", label: "Biển sâu" },
  { id: "do-tram", label: "Đỏ trầm" },
];

export function ScentSections({
  onInspectFragrance,
  onAddToCart,
  onAddDiscovery,
}: Props) {
  const [mood, setMood] = useState<"all" | Fragrance["mood"]>("all");
  const [booked, setBooked] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestSlot, setGuestSlot] = useState("19:00 · Thứ Sáu");
  const [guestNote, setGuestNote] = useState("Muốn thử Abysse và Grenat");

  const visibleFragrances =
    mood === "all" ? FRAGRANCES : FRAGRANCES.filter((f) => f.mood === mood);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim()) return;
    setBooked(true);
  };

  return (
    <>
      {/* 2. Olfactory Architecture */}
      <section id="kien-truc-huong" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Kiến trúc tầng hương đêm</h2>
            <p className={styles.sectionLead}>
              Mỗi mùi hương được cân chỉnh theo ba lớp chuyển vị rõ rệt: lớp mở lạnh khoáng,
              tầng giữa đậm đặc nguyên liệu tự nhiên và lớp nền bám sâu trên da suốt đêm.
            </p>
          </div>

          <div className={styles.moodBar} role="tablist" aria-label="Lọc theo nhóm hương">
            {MOOD_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={mood === f.id}
                className={`${styles.moodPill} ${
                  mood === f.id ? styles.moodPillActive : ""
                }`}
                onClick={() => setMood(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className={styles.scentList}>
            {visibleFragrances.map((item) => (
              <article
                key={item.id}
                className={styles.scentRow}
                style={
                  {
                    "--row-hex": item.accentHex,
                    "--row-rgb": item.accentRgb,
                  } as React.CSSProperties
                }
              >
                <div className={styles.scentThumb}>
                  <Image
                    src={item.image}
                    alt={item.fullName}
                    fill
                    sizes="84px"
                    style={{ objectFit: "cover", objectPosition: "center 54%" }}
                  />
                </div>

                <div>
                  <h3 translate="no" className={styles.scentName}>
                    {item.namePrefix}
                    <span style={{ fontStyle: "italic", color: item.accentHex }}>
                      {item.nameAccent}
                    </span>
                  </h3>
                  <p className={styles.scentSub}>
                    {item.subtitleVi} · {item.concentration}
                  </p>
                </div>

                <div className={styles.scentNotesGrid}>
                  <div className={styles.scentNoteCol}>
                    <span className={styles.scentNoteHeading}>Hương đầu</span>
                    <span className={styles.scentNoteText}>{item.notes.top.join(", ")}</span>
                  </div>
                  <div className={styles.scentNoteCol}>
                    <span className={styles.scentNoteHeading}>Hương giữa</span>
                    <span className={styles.scentNoteText}>{item.notes.heart.join(", ")}</span>
                  </div>
                  <div className={styles.scentNoteCol}>
                    <span className={styles.scentNoteHeading}>Hương cuối</span>
                    <span className={styles.scentNoteText}>{item.notes.base.join(", ")}</span>
                  </div>
                </div>

                <div>
                  <span className={styles.scentNoteHeading}>Độ đậm & lưu hương</span>
                  <div className={styles.scentNoteText} style={{ marginTop: 4 }}>
                    {item.longevity}
                  </div>
                  <div
                    className={styles.intensityTrack}
                    aria-label={`Độ đậm ${item.intensity} trên 5`}
                  >
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span
                        key={idx}
                        className={`${styles.intensityDot} ${
                          idx < item.intensity ? styles.intensityDotFilled : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className={styles.scentActions}>
                  <button
                    type="button"
                    className={styles.ghostBtn}
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      onInspectFragrance(item.id);
                    }}
                  >
                    Xem ánh sáng <ArrowUpRight size={14} aria-hidden />
                  </button>
                  <button
                    type="button"
                    className={styles.ghostBtn}
                    style={{
                      borderColor: `rgba(${item.accentRgb}, 0.45)`,
                      color: item.accentHex,
                    }}
                    onClick={() => onAddToCart(item, 100)}
                  >
                    <ShoppingBag size={13} aria-hidden />
                    {formatVnd(item.volumes[1].price)}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Atelier & Basalt Craftsmanship */}
      <section id="nghe-thuat" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.atelierGrid}>
            <div className={styles.atelierMedia}>
              <Image
                src="/images/demos/mac-thach/atelier-craft.jpg"
                alt="Xưởng chế tác nước hoa Mặc Thạch với chai thủy tinh hổ phách và đá bazan đen"
                fill
                sizes="(min-width: 960px) 55vw, 100vw"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div>
              <h2 className={styles.sectionTitle}>Chế tác trong bóng tối đá bazan</h2>
              <p className={styles.sectionLead} style={{ marginTop: 18 }}>
                Ánh sáng mạnh làm phân rã các phân tử hương tự nhiên. Tại Mặc Thạch, toàn bộ
                quá trình ủ lạnh và lọc tinh dầu diễn ra trong hầm đá bazan kín sáng để giữ
                trọn độ sâu của nhựa thơm, trầm hương và hoa đêm.
              </p>

              <div className={styles.pillarList}>
                {ATELIER_PILLARS.map((pillar) => (
                  <div key={pillar.title} className={styles.pillarItem}>
                    <span className={styles.pillarMetric}>{pillar.metric}</span>
                    <div>
                      <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                      <p className={styles.pillarDesc}>{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Discovery Coffret & Private Salon Booking */}
      <section id="dat-hen" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.dualGrid}>
            {/* Left: Discovery Set */}
            <div className={styles.featureCard}>
              <div>
                <h2 className={styles.sectionTitle} style={{ fontSize: "clamp(28px, 3vw, 40px)" }}>
                  Thử trọn 5 mùi hương tại nhà
                </h2>
                <p className={styles.sectionLead} style={{ marginTop: 14 }}>
                  {DISCOVERY_SET.subtitle}
                </p>

                <div className={styles.vialStrip} style={{ marginTop: 24 }}>
                  {FRAGRANCES.map((f) => (
                    <span key={f.id} className={styles.vialChip}>
                      <span
                        className={styles.vialSwatch}
                        style={{ backgroundColor: f.accentHex }}
                        aria-hidden
                      />
                      <span translate="no">{f.fullName}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 16,
                  paddingTop: 20,
                  borderTop: "1px solid var(--mt-border)",
                }}
              >
                <div>
                  <div style={{ fontSize: 12, color: "var(--mt-ink-muted)" }}>
                    Hộp đá đen · 5 ống xịt 5ml
                  </div>
                  <div className={styles.detailPrice}>{formatVnd(DISCOVERY_SET.price)}</div>
                </div>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={onAddDiscovery}
                >
                  <Sparkles size={15} aria-hidden />
                  Thêm Coffret vào giỏ
                </button>
              </div>
            </div>

            {/* Right: Private Salon Appointment */}
            <div className={styles.featureCard}>
              <div>
                <h2 className={styles.sectionTitle} style={{ fontSize: "clamp(28px, 3vw, 40px)" }}>
                  Đặt lịch thử hương riêng tư
                </h2>
                <p className={styles.sectionLead} style={{ marginTop: 14 }}>
                  Phòng thử hương tối giản dành riêng cho 1–2 khách mỗi lượt tại Hải Châu, Đà Nẵng.
                  Chuyên gia mùi hương sẽ hướng dẫn thử từng tầng hương trong 45 phút.
                </p>
              </div>

              {booked ? (
                <div className={styles.bookingSuccess} role="status">
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 500, marginBottom: 6 }}>
                    <Check size={16} aria-hidden /> Đã ghi nhận lịch hẹn minh hoạ
                  </div>
                  Xin chào {guestName}, phòng thử hương Mặc Thạch đã giữ khung giờ{" "}
                  <strong>{guestSlot}</strong>. Chúng tôi sẽ chuẩn bị sẵn mẫu thử theo ghi chú của bạn.
                </div>
              ) : (
                <form className={styles.formGrid} onSubmit={handleBook}>
                  <div className={styles.inputRow}>
                    <input
                      type="text"
                      required
                      placeholder="Họ và tên"
                      aria-label="Họ và tên"
                      className={styles.field}
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Số điện thoại"
                      aria-label="Số điện thoại"
                      className={styles.field}
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputRow}>
                    <select
                      aria-label="Khung giờ mong muốn"
                      className={styles.field}
                      value={guestSlot}
                      onChange={(e) => setGuestSlot(e.target.value)}
                    >
                      <option value="16:30 · Thứ Năm">16:30 · Thứ Năm</option>
                      <option value="19:00 · Thứ Sáu">19:00 · Thứ Sáu</option>
                      <option value="15:00 · Thứ Bảy">15:00 · Thứ Bảy</option>
                      <option value="19:30 · Chủ Nhật">19:30 · Chủ Nhật</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Mùi hương muốn thử"
                      aria-label="Mùi hương muốn thử"
                      className={styles.field}
                      value={guestNote}
                      onChange={(e) => setGuestNote(e.target.value)}
                    />
                  </div>
                  <button type="submit" className={styles.primaryBtn}>
                    <Calendar size={15} aria-hidden />
                    Giữ lịch thử hương riêng
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
