"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../brand.module.css";
import { synth, type Shape } from "./audio";
import { Wave, type WaveParams } from "./Wave";

const SHAPES: [Shape, string][] = [["sine", "Sin"], ["triangle", "Tam giác"], ["square", "Vuông"], ["sawtooth", "Răng cưa"]];

/** Phòng nghe thử: chỉnh dạng sóng, tần số, biên độ; nút phát tạo âm mẫu thật bằng Web Audio. */
export function Lab() {
  const [shape, setShape] = useState<Shape>("sine");
  const [freq, setFreq] = useState(220);
  const [amp, setAmp] = useState(0.7);
  const [on, setOn] = useState(false);
  const params = useRef<WaveParams>({ shape: "sine", cycles: 4, amp: 0.7 });

  useEffect(() => {
    params.current = { shape, cycles: 1.5 + Math.log2(freq / 55) * 2.2, amp };
    if (synth.playing()) synth.update(freq, shape, amp);
  }, [shape, freq, amp]);
  useEffect(() => () => synth.stop(), []);

  const toggle = () => {
    if (on) { synth.stop(); setOn(false); return; }
    setOn(synth.start(freq, shape, amp));
  };

  return (
    <div className={styles.lab}>
      <div className={styles.labScreen}>
        <Wave height={360} layers={5} params={params} label={`Dạng sóng ${shape} ở ${freq} hertz`} className={styles.labWave} />
        <span className={styles.labTag} aria-hidden="true">{freq} Hz · {SHAPES.find((s) => s[0] === shape)![1]}</span>
      </div>
      <div className={styles.labCtl}>
        <fieldset className={styles.shapes}><legend>Dạng sóng</legend>
          {SHAPES.map(([v, l]) => (<label key={v} className={shape === v ? styles.shapeOn : ""}><input type="radio" name="shape" checked={shape === v} onChange={() => setShape(v)} />{l}</label>))}
        </fieldset>
        <label className={styles.range}>Tần số: <b>{freq} Hz</b>
          <input type="range" min={55} max={880} step={1} value={freq} onChange={(e) => setFreq(Number(e.target.value))} />
        </label>
        <label className={styles.range}>Biên độ: <b>{Math.round(amp * 100)}%</b>
          <input type="range" min={0.1} max={1} step={0.05} value={amp} onChange={(e) => setAmp(Number(e.target.value))} />
        </label>
        <button type="button" className={styles.btn} aria-pressed={on} onClick={toggle}>{on ? "Dừng âm mẫu" : "Phát âm mẫu"}</button>
        <p className={styles.muteP}>Âm mẫu được tạo ngay trong trình duyệt, âm lượng thấp, chỉ phát khi bạn bấm. Có thể di chuột qua dạng sóng để làm nó phình lên.</p>
      </div>
    </div>
  );
}
