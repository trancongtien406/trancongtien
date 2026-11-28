"use client";

import Image from "next/image";
import { Check, Minus, Plus, X } from "lucide-react";
import styles from "../brand.module.css";
import { formatVnd } from "../data";

export type CartItem = {
  key: string;
  name: string;
  meta: string;
  price: number;
  image: string;
  qty: number;
};

type Props = {
  open: boolean;
  items: CartItem[];
  checkedOut: boolean;
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onCheckout: () => void;
};

export function CartDrawer({
  open,
  items,
  checkedOut,
  onClose,
  onUpdateQty,
  onCheckout,
}: Props) {
  if (!open) return null;

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div
      className={styles.drawerBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label="Giỏ hàng Mặc Thạch Parfums"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.drawerPanel}>
        <div className={styles.drawerHeader}>
          <h2 className={styles.drawerTitle}>Giỏ hàng</h2>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={onClose}
            aria-label="Đóng giỏ hàng"
          >
            <X size={16} />
          </button>
        </div>

        <div className={styles.drawerBody}>
          {checkedOut ? (
            <div className={styles.bookingSuccess} role="status">
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 500, marginBottom: 6 }}>
                <Check size={16} aria-hidden /> Đơn hàng minh hoạ đã hoàn tất
              </div>
              Cảm ơn bạn đã trải nghiệm giỏ hàng của Mặc Thạch Parfums. Đây là giao diện demo
              mô phỏng chạy trên trình duyệt, chưa phát sinh thanh toán thật.
            </div>
          ) : items.length === 0 ? (
            <p style={{ color: "var(--mt-ink-muted)", fontSize: 14, lineHeight: 1.7 }}>
              Giỏ hàng đang trống. Hãy chọn một hốc trưng bày ở đầu trang hoặc thêm Coffret
              5 × 5ml để trải nghiệm.
            </p>
          ) : (
            items.map((item) => (
              <div key={item.key} className={styles.cartItem}>
                <div className={styles.cartThumb}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="60px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500 }} translate="no">
                    {item.name}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--mt-ink-muted)", marginTop: 2 }}>
                    {item.meta}
                  </div>
                  <div className={styles.qtyControls}>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={() => onUpdateQty(item.key, -1)}
                      aria-label={`Giảm số lượng ${item.name}`}
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ fontSize: 13 }}>{item.qty}</span>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={() => onUpdateQty(item.key, 1)}
                      aria-label={`Tăng số lượng ${item.name}`}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>
                  {formatVnd(item.price * item.qty)}
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && !checkedOut && (
          <div className={styles.drawerFooter}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: 13, color: "var(--mt-ink-muted)" }}>Tạm tính</span>
              <span className={styles.detailPrice}>{formatVnd(subtotal)}</span>
            </div>
            <p style={{ fontSize: 12, color: "var(--mt-ink-faint)", margin: 0 }}>
              Miễn phí giao hàng hộp quà đá đen kèm 2 ống mẫu thử 2ml.
            </p>
            <button type="button" className={styles.primaryBtn} onClick={onCheckout}>
              Xác nhận đặt hàng (mô phỏng)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
