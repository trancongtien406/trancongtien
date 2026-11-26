"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../brand.module.css";
import { MAX_TRAY_QTY, MENU_MAP, TEMP_LABEL, formatVnd } from "../data/menu";
import { useTray } from "./TrayProvider";

export function TrayDrawer() {
  const t = useTray();
  const ref = useRef<HTMLDialogElement>(null);
  const [confirm, setConfirm] = useState(false);
  const [done, setDone] = useState<{ cups: number; total: number } | null>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (t.open && !d.open) d.showModal();
    if (!t.open && d.open) d.close();
  }, [t.open]);

  const finish = () => {
    setDone({ cups: t.count, total: t.subtotal });
    t.clear();
  };
  const close = () => { setDone(null); setConfirm(false); t.closeTray(); };

  return (
    <>
      <dialog
        ref={ref}
        className={styles.drawer}
        aria-labelledby="rn-tray-title"
        onClose={() => { setDone(null); setConfirm(false); t.closeTray(); }}
        onClick={(e) => { if (e.target === ref.current) close(); }}
      >
        <div className={styles.drawerHead}>
          <h2 id="rn-tray-title">Khay ({t.count})</h2>
          <button type="button" className={styles.iconBtn} onClick={close} aria-label="Đóng khay">×</button>
        </div>
        <div className={styles.drawerBody}>
          {done ? (
            <div className={styles.drawerEmpty} role="status">
              <p>Tóm tắt khay</p>
              <p>Đưa tóm tắt này cho nhân viên khi gọi món tại quầy. Trang này chưa nhận đơn trực tuyến.</p>
              <p style={{ marginTop: 12 }}><b>{done.cups} ly · {formatVnd(done.total)}</b> (tạm tính)</p>
              <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} style={{ marginTop: 20 }} onClick={close}>Quay lại menu</button>
            </div>
          ) : t.lines.length === 0 ? (
            <div className={styles.drawerEmpty}>
              <p>Khay trống</p>
              <p>Khay của bạn đang chờ một chút nhiệt.</p>
              <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} style={{ marginTop: 20 }} onClick={() => { close(); location.hash = "menu"; }}>Chọn đồ uống</button>
            </div>
          ) : (
            <ul>
              {t.lines.map((l) => {
                const p = MENU_MAP.get(l.productId);
                if (!p) return <li key={l.productId + l.temperature} className={styles.line}><span>Món này không còn trong menu.</span></li>;
                return (
                  <li key={`${l.productId}:${l.temperature}`} className={styles.line}>
                    <div>
                      <div className={styles.lineName}>{p.name} · {TEMP_LABEL[l.temperature]}</div>
                      <div className={styles.lineSub}>{formatVnd(p.priceVnd)} x {l.quantity} = <b>{formatVnd(p.priceVnd * l.quantity)}</b></div>
                    </div>
                    <div className={styles.qty} role="group" aria-label={`Số lượng ${p.name} ${TEMP_LABEL[l.temperature]}`}>
                      <button type="button" aria-label={`Giảm ${p.name}`} onClick={() => t.changeQty(l.productId, l.temperature, -1)}>−</button>
                      <output aria-live="polite">{l.quantity}</output>
                      <button type="button" aria-label={`Tăng ${p.name}`} onClick={() => t.changeQty(l.productId, l.temperature, 1)}>+</button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {!done && t.lines.length > 0 && (
          <div className={styles.drawerFoot}>
            <div className={styles.totalRow}><span className={styles.label}>Tạm tính · {t.count}/{MAX_TRAY_QTY} ly</span><b>{formatVnd(t.subtotal)}</b></div>
            {t.storageError && <p className={styles.notice} role="status">Không thể lưu khay trên thiết bị này. Bạn vẫn có thể tiếp tục trải nghiệm.</p>}
            {confirm ? (
              <div className={styles.confirmBox} role="group" aria-label="Xác nhận làm trống khay">
                <b>Bạn muốn làm trống toàn bộ khay?</b>
                <div className={styles.row}>
                  <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => { t.clear(); setConfirm(false); }}>Làm trống</button>
                  <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => setConfirm(false)}>Giữ lại</button>
                </div>
              </div>
            ) : (
              <>
                <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={finish}>Xem tóm tắt khay</button>
                <button type="button" className={styles.linkBtn} onClick={() => setConfirm(true)}>Làm trống khay</button>
              </>
            )}
            <p style={{ fontSize: 13 }}>Không tính thuế, phí hay khuyến mãi. Không có đơn hàng thật nào được tạo.</p>
          </div>
        )}
      </dialog>
      <div role="status" aria-live="polite">{t.message && <div className={styles.toast}>{t.message}</div>}</div>
    </>
  );
}
