"use client";

/* eslint-disable @next/next/no-img-element */
import s from "../brand.module.css";
import { BUILDS, IMG, INTERIORS, PAINTS, WHEELS, fmt } from "../data";
import { useBuild } from "../Store";

const add = (n: number) => (n ? `+${n} triệu` : "Đã gồm");

export function Config() {
  const b = useBuild();
  const P = PAINTS[b.paint];
  return (
    <section id="cau-hinh" className={s.config} aria-labelledby="cfg-h">
      <p className={s.kick}><b>05</b><i />Cấu hình</p>
      <h2 id="cfg-h" className={s.srOnly}>Cấu hình xe V4 Mưa Rào</h2>
      <p className={s.cfgBig} aria-hidden="true">V4</p>
      <div className={s.cfgGrid}>
        <div>
          <p className={s.cfgCap}>Bản dựng sẵn</p>
          <div className={s.builds} role="group" aria-label="Bản dựng sẵn">
            {BUILDS.map((x, i) => {
              const on = b.paint === x.p && b.wheel === x.w && b.interior === x.i;
              return (
                <button key={x.name} type="button" className={s.build3} aria-pressed={on} onClick={() => b.setAll(x.p, x.w, x.i)}>
                  <span className={s.thumb}><img className={s.img} src={`${IMG}car-grey.webp`} alt="" width={1400} height={1000} loading="lazy" /><i style={{ background: PAINTS[x.p].tint || "transparent" }} /></span>
                  <b>{x.name}</b><small>{x.d}</small>
                  <span className={s.srOnly}>{i + 1}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={s.stage}>
          <div className={s.oval}>
            <img className={s.img} src={`${IMG}car-grey.webp`} width={1400} height={1000} alt={`Xe V4 Mưa Rào màu ${P.name} (ảnh minh hoạ, đổi màu bằng lớp phủ)`} loading="lazy" decoding="async" />
            <span className={s.tintL} style={{ background: P.tint || "transparent", opacity: P.tint ? 0.8 : 0 }} aria-hidden="true" />
          </div>
          <div className={s.ovalRef} aria-hidden="true"><img className={s.img} src={`${IMG}car-grey.webp`} alt="" width={1400} height={1000} loading="lazy" /></div>
          <p className={s.ext} aria-live="polite"><small>Ngoại thất</small>{P.name}</p>
        </div>

        <div className={s.opts}>
          <fieldset>
            <legend>Màu thân <em>{add(P.add)}</em></legend>
            <div className={s.swatches}>
              {PAINTS.map((p, i) => (<button key={p.id} type="button" className={s.sw} style={{ background: p.color }} aria-pressed={b.paint === i} aria-label={`Màu ${p.name}, ${add(p.add)}`} onClick={() => b.setPaint(i)} />))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Mâm <em>{add(WHEELS[b.wheel].add)}</em></legend>
            <div className={s.swatches}>
              {WHEELS.map((w, i) => (<button key={w.id} type="button" className={`${s.sw} ${s.swRim}`} style={{ ["--rim" as string]: w.ring }} aria-pressed={b.wheel === i} aria-label={`Mâm ${w.name}, ${add(w.add)}`} onClick={() => b.setWheel(i)} />))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Nội thất <em>{add(INTERIORS[b.interior].add)}</em></legend>
            <div className={s.interiors}>
              {INTERIORS.map((n, i) => (<button key={n.id} type="button" className={s.int} aria-pressed={b.interior === i} onClick={() => b.setInterior(i)}><i style={{ ["--c" as string]: n.color }} /><span><b>{n.name}</b><small>{n.d}</small></span></button>))}
            </div>
          </fieldset>
        </div>
      </div>
      <div className={s.cfgFoot}>
        <p className={s.price}><small>Bản dựng của bạn</small><b>{fmt(b.total)}</b><em>MÃ {b.code}</em></p>
        <div className={s.cfgActs}>
          <a className={s.ghost} href="#lai-thu">Đặt lái thử</a>
          <button type="button" className={s.gold} onClick={b.openDrawer}>Giữ suất xe <i aria-hidden="true">→</i></button>
        </div>
      </div>
    </section>
  );
}
