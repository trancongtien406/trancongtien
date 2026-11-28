"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import styles from "../brand.module.css";
import { DISCOVERY_SET, type Fragrance } from "../data";
import { NightGalleryHero } from "./NightGalleryHero";
import { ScentSections } from "./ScentSections";
import { CartDrawer, type CartItem } from "./CartDrawer";

export function MacThachApp() {
  const [activeFragranceId, setActiveFragranceId] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);

  const handleAddFragrance = useCallback((fragrance: Fragrance, ml: 50 | 100) => {
    const vol = fragrance.volumes.find((v) => v.ml === ml) ?? fragrance.volumes[1];
    const key = `${fragrance.id}-${vol.ml}`;
    setCheckedOut(false);
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      }
      return [
        ...prev,
        {
          key,
          name: fragrance.fullName,
          meta: `${vol.ml} ml · ${fragrance.concentration}`,
          price: vol.price,
          image: fragrance.image,
          qty: 1,
        },
      ];
    });
  }, []);

  const handleAddDiscovery = useCallback(() => {
    setCheckedOut(false);
    setItems((prev) => {
      const existing = prev.find((i) => i.key === DISCOVERY_SET.id);
      if (existing) {
        return prev.map((i) =>
          i.key === DISCOVERY_SET.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        {
          key: DISCOVERY_SET.id,
          name: DISCOVERY_SET.name,
          meta: "5 × 5 ml · Kèm phiếu 1.650.000 ₫",
          price: DISCOVERY_SET.price,
          image: DISCOVERY_SET.image,
          qty: 1,
        },
      ];
    });
    setCartOpen(true);
  }, []);

  const handleUpdateQty = useCallback((key: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const handleCheckout = useCallback(() => {
    setCheckedOut(true);
    setItems([]);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.grain} aria-hidden />
      <a className={styles.skip} href="#kien-truc-huong">
        Bỏ qua tới kiến trúc mùi hương
      </a>

      {/* Fixed Minimalist Luxury Header */}
      <header className={styles.header}>
        <a
          href="#bo-suu-tap"
          className={styles.brandLockup}
          onClick={() => setActiveFragranceId(null)}
        >
          <span translate="no" className={styles.brandName}>
            MẶC THẠCH
          </span>
          <span translate="no" className={styles.brandSub}>
            PARFUMS · ÉDITION NOCTURNE
          </span>
        </a>

        <nav className={styles.navLinks} aria-label="Điều hướng chính">
          <a
            href="#bo-suu-tap"
            className={styles.navLink}
            onClick={() => setActiveFragranceId(null)}
          >
            Bộ sưu tập
          </a>
          <a href="#kien-truc-huong" className={styles.navLink}>
            Tầng hương
          </a>
          <a href="#nghe-thuat" className={styles.navLink}>
            Xưởng chế tác
          </a>
          <a href="#dat-hen" className={styles.navLink}>
            Thử hương riêng
          </a>
        </nav>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.cartBtn}
            onClick={() => setCartOpen(true)}
            aria-label={`Mở giỏ hàng, hiện có ${totalQty} sản phẩm`}
          >
            <ShoppingBag size={15} aria-hidden />
            <span>Giỏ hàng</span>
            <span className={styles.cartCount}>{totalQty}</span>
          </button>
        </div>
      </header>

      <main>
        <NightGalleryHero
          activeId={activeFragranceId}
          onSelect={setActiveFragranceId}
          onAddToCart={handleAddFragrance}
        />

        <ScentSections
          onInspectFragrance={(id) => setActiveFragranceId(id)}
          onAddToCart={(f, ml) => {
            handleAddFragrance(f, ml);
            setCartOpen(true);
          }}
          onAddDiscovery={handleAddDiscovery}
        />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <strong translate="no" style={{ color: "var(--mt-ink)", letterSpacing: "0.18em" }}>
              MẶC THẠCH PARFUMS
            </strong>{" "}
            · 42 Bạch Đằng, Hải Châu, Đà Nẵng (thương hiệu minh hoạ)
          </div>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <span>Demo LP-71 · Showroom Trần Công Tiến</span>
            <Link href="/demos" style={{ color: "var(--mt-ink)", textDecoration: "none" }}>
              ← Tất cả demo
            </Link>
          </div>
        </div>
      </footer>

      <CartDrawer
        open={cartOpen}
        items={items}
        checkedOut={checkedOut}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
