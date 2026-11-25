import { COPY } from "../data/copy";
import Link from "next/link";
import type { Lang } from "../data/tours";
import styles from "../brand.module.css";
import { Photo } from "./Photo";

export function Rhythm({ lang }: { lang: Lang }) {
  const t = COPY[lang].rhythm;
  const rot = [styles.rotA, styles.rotB, styles.rotC, styles.rotD];
  return (
    <section id="destinations" className={styles.section} aria-labelledby="rd-rhythm">
      <div className={styles.wrap}>
        <div className={styles.rhythmHead}>
          <div>
            <span className={`${styles.label} ${styles.eyebrow}`}>{t.eyebrow}</span>
            <h2 id="rd-rhythm" className={styles.h2}>{t.title}</h2>
          </div>
        </div>
        <ul className={styles.rhythmGrid}>
          {t.places.map((p, i) => (
            <li key={p.name} className={`${styles.passport} ${rot[i]}`} data-rd="rhythm">
              <span className={styles.passNo} aria-hidden="true">0{i + 1}</span>
              <h3 className={styles.h3}>{p.name}</h3>
              <p>{p.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Journal({ lang }: { lang: Lang }) {
  const t = COPY[lang].journal;
  const items = [
    { photo: "cao-lau", cls: styles.pA, pos: "50% 55%", alt: lang === "vi" ? "Hai tô mì kiểu cao lầu với thịt xíu và bánh phồng giòn" : "Two bowls of cao lau-style noodles with roast pork and crisp crackers", box: styles.note1 },
    { photo: "ba-na-suong", cls: styles.pB, pos: "50% 40%", alt: lang === "vi" ? "Bàn tay đá và lan can vàng của Cầu Vàng trong sương" : "Stone hands and golden railing of the Golden Bridge in mist", box: styles.note2 },
    { photo: "da-nang-bo-bien", cls: styles.pC, pos: "35% 50%", alt: lang === "vi" ? "Bờ biển Đà Nẵng nhìn từ trên cao với sóng trắng" : "Aerial view of the Da Nang coastline with white surf", box: styles.note3 },
  ];
  return (
    <section id="journal" className={styles.section} aria-labelledby="rd-journal">
      <div className={styles.wrap}>
        <span className={`${styles.label} ${styles.eyebrow}`}>{t.eyebrow}</span>
        <h2 id="rd-journal" className={styles.h2}>{t.title}</h2>
        <div className={styles.journalGrid}>
          {items.map((it, i) => (
            <article key={it.photo} className={it.box} data-rd="note">
              <figure className={`${styles.polaroid} ${it.cls}`}>
                <div className={styles.ph}>
                  <Photo name={it.photo} alt={it.alt} sizes="(max-width: 800px) 90vw, 30vw" position={it.pos} />
                </div>
                <span className={`${styles.sticker} ${i === 1 ? styles.stickerBlue : ""}`}>{t.notes[i].tag}</span>
              </figure>
              <div className={styles.noteBody}>
                <h3 className={styles.h3}>{t.notes[i].title}</h3>
                <p>{t.notes[i].body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Why({ lang }: { lang: Lang }) {
  const t = COPY[lang].why;
  return (
    <section id="about" className={`${styles.section} ${styles.whySec} ${styles.onDark}`} aria-labelledby="rd-why">
      <div className={styles.wrap}>
        <span className={`${styles.label} ${styles.eyebrow}`}>{t.eyebrow}</span>
        <h2 id="rd-why" className={styles.h2}>{t.title}</h2>
        <ul className={styles.whyGrid}>
          {t.items.map((it) => (
            <li key={it.title} className={styles.whyItem} data-rd="note">
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Faq({ lang }: { lang: Lang }) {
  const t = COPY[lang].faq;
  return (
    <section id="faq" className={styles.section} aria-labelledby="rd-faq">
      <div className={`${styles.wrap} ${styles.faqGrid}`}>
        <div>
          <span className={`${styles.label} ${styles.eyebrow}`}>{t.eyebrow}</span>
          <h2 id="rd-faq" className={styles.h2}>{t.title}</h2>
        </div>
        <div className={styles.faqList}>
          {t.items.map((it) => (
            <details key={it.q} className={styles.faqItem}>
              <summary>{it.q}</summary>
              <p>{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Closing({ lang, consultHref }: { lang: Lang; consultHref: string }) {
  const t = COPY[lang].closing;
  return (
    <section id="contact" className={`${styles.section} ${styles.closing}`} aria-labelledby="rd-closing">
      <div className={`${styles.wrap} ${styles.closingInner}`}>
        <span className={`${styles.label} ${styles.eyebrow}`}>{t.eyebrow}</span>
        <h2 id="rd-closing" className={`${styles.h2}`}>{t.title}</h2>
        <p>{t.body}</p>
        <div className={styles.ctaRow}>
          <a className={`${styles.btn} ${styles.btnYellow}`} href={consultHref} data-cta="consult">
            {t.cta} <span aria-hidden="true">↗</span>
          </a>
          <a className={`${styles.btn} ${styles.btnGhost}`} href="#itinerary">
            {t.cta2}
          </a>
        </div>
        <p className={styles.small} style={{ color: "#fff" }}>{t.ctaNote}</p>
      </div>
    </section>
  );
}

export function Footer({ lang, consultHref, signedName }: { lang: Lang; consultHref: string; signedName: string }) {
  const t = COPY[lang].footer;
  const base = lang === "vi" ? "/demos/rong-dam" : "/demos/rong-dam/en";
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.footGrid}>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demos/rong-dam/identity/logo-horizontal-reversed.svg" alt="Rong Dặm" width={200} height={56} translate="no" />
            <p className={styles.footSlogan}>{t.slogan}</p>
          </div>
          <div>
            <h2>{t.col1}</h2>
            <ul>
              {t.links.map((l) => (
                <li key={l.id}>
                  <a href={`${base}#${l.id}`}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{t.col2}</h2>
            <ul>
              <li>{t.demo}</li>
              <li>{t.sample}</li>
              <li>{t.noService}</li>
              <li>
                <a href="/demos/rong-dam/credits">{t.credits}</a>
              </li>
              <li>
                <a href={consultHref}>{t.askCta}</a>
              </li>
              <li>
                <Link href="/">{t.back}</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footBase}>
          <span>{t.copyright}</span>
          <span>
            {t.signed} {signedName}
          </span>
          <span>{t.contact}</span>
        </div>
      </div>
    </footer>
  );
}
