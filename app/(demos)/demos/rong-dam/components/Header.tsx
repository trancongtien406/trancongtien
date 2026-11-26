"use client";

import { useEffect, useRef, useState } from "react";
import { COPY } from "../data/copy";
import type { Lang } from "../data/tours";
import styles from "../brand.module.css";

const ID = "/images/demos/rong-dam/identity";
const VI = "/demos/rong-dam";
const EN = "/demos/rong-dam/en";

export function Header({ lang, home }: { lang: Lang; home?: string }) {
  const t = COPY[lang];
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const base = lang === "vi" ? VI : EN;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    panel.current?.querySelector("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className={styles.demoStrip}>
        <div className={`${styles.wrap} ${styles.demoStripRow}`}>
          <span>
            <b>Rong Dặm Tour</b> · {t.strip.office}
          </span>
          <span>{t.strip.hours}</span>
        </div>
      </div>
      <header className={styles.header}>
        <div className={`${styles.wrap} ${styles.headerRow}`}>
          <a className={styles.logoLink} href={home ?? base} aria-label={lang === "vi" ? "Rong Dặm, về đầu trang" : "Rong Dam, back to top"}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${ID}/logo-horizontal.svg`} alt="" width={320} height={90} translate="no" />
          </a>
          <nav className={styles.nav} aria-label={lang === "vi" ? "Điều hướng chính" : "Main navigation"}>
            {t.nav.map((n) => (
              <a key={n.id} href={`${base}#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className={styles.headerTools}>
            <div className={styles.lang} role="group" aria-label={t.langLabel}>
              {lang === "vi" ? (
                <>
                  <span className={styles.langOn} aria-current="true" title={t.langCurrent}>
                    VI
                  </span>
                  <a href={EN} hrefLang="en" lang="en" aria-label={t.langSwitchAria} data-lang-switch="en">
                    EN
                  </a>
                </>
              ) : (
                <>
                  <a href={VI} hrefLang="vi-VN" lang="vi" aria-label={t.langSwitchAria} data-lang-switch="vi">
                    VI
                  </a>
                  <span className={styles.langOn} aria-current="true" title={t.langCurrent}>
                    EN
                  </span>
                </>
              )}
            </div>
            <a className={`${styles.btn} ${styles.btnYellow} ${styles.headerCta}`} href="#dat-tour">
              {t.headerCta}
            </a>
            <button
              ref={btn}
              type="button"
              className={styles.menuBtn}
              aria-expanded={open}
              aria-controls="rd-menu"
              aria-label={open ? t.navClose : t.navOpen}
              onClick={() => setOpen((o) => !o)}
            >
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
        {open && (
          <div id="rd-menu" ref={panel} className={styles.menuPanel}>
            {t.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>
                {n.label}
              </a>
            ))}
            <a href="#dat-tour" onClick={() => setOpen(false)}>
              {t.headerCta} →
            </a>
          </div>
        )}
      </header>
    </>
  );
}
