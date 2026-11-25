import { useSyncExternalStore } from "react";

/**
 * "Nghe thử": nhạc tổng hợp bằng WebAudio, chỉ tạo AudioContext SAU khi người dùng bấm.
 * Âm lượng tổng thấp (gain 0.09 + compressor), tự dừng sau 40 giây, dừng khi tab ẩn.
 * AnalyserNode cấp mức thật cho sóng/equalizer/VU khi đang phát; khi lặng các hình dùng sóng mô phỏng bằng toán.
 */
type AC = typeof AudioContext;
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let analyser: AnalyserNode | null = null;
let noiseBuf: AudioBuffer | null = null;
let playing = false;
let timer: ReturnType<typeof setInterval> | null = null;
let autoStop: ReturnType<typeof setTimeout> | null = null;
let step = 0;
let nextTime = 0;
let startedPerf = 0;
const freq = new Uint8Array(64);
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

const BPM = 92;
const STEP = 60 / BPM / 4;
const MASTER_GAIN = 0.09;
const ROOT = [55, 55, 65.41, 49]; // A1 A1 C2 G1 mỗi ô nhịp

function env(g: GainNode, t: number, a: number, peak: number, d: number) {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + a);
  g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
}
function kick(t: number) {
  if (!ctx || !master) return;
  const o = ctx.createOscillator(); const g = ctx.createGain();
  o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.14);
  env(g, t, 0.004, 1, 0.26);
  o.connect(g).connect(master); o.start(t); o.stop(t + 0.32);
}
function noise(t: number, dur: number, hp: number, peak: number) {
  if (!ctx || !master || !noiseBuf) return;
  const s = ctx.createBufferSource(); s.buffer = noiseBuf;
  const f = ctx.createBiquadFilter(); f.type = "highpass"; f.frequency.value = hp;
  const g = ctx.createGain(); env(g, t, 0.002, peak, dur);
  s.connect(f).connect(g).connect(master); s.start(t); s.stop(t + dur + 0.05);
}
function tone(t: number, f0: number, dur: number, peak: number, type: OscillatorType, lp: number) {
  if (!ctx || !master) return;
  const o = ctx.createOscillator(); o.type = type; o.frequency.value = f0;
  const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = lp;
  const g = ctx.createGain(); env(g, t, 0.02, peak, dur);
  o.connect(f).connect(g).connect(master); o.start(t); o.stop(t + dur + 0.1);
}
function schedule(i: number, t: number) {
  const s = i % 16; const bar = Math.floor(i / 16) % 4;
  if (s === 0 || s === 6 || s === 8 || s === 11) kick(t);
  if (s === 4 || s === 12) noise(t, 0.14, 1800, 0.5);
  if (s % 2 === 0) noise(t, 0.04, 7000, s % 4 === 2 ? 0.28 : 0.16);
  const r = ROOT[bar];
  if (s === 0 || s === 3 || s === 8 || s === 10 || s === 14) tone(t, r * (s === 10 ? 2 : 1), STEP * 2.4, 0.5, "sawtooth", 420);
  if (s === 0) { [3, 5, 6, 9].forEach((m, k) => tone(t + k * 0.012, r * 4 * 2 ** ((m - 3) / 12) * 1.19, STEP * 15, 0.09, "triangle", 1400)); }
  if (s % 4 === 2 && bar % 2 === 1) tone(t, r * 8 * (s === 6 ? 1.5 : 1.2), STEP * 1.5, 0.09, "sine", 3000);
}
function tick() {
  if (!ctx) return;
  while (nextTime < ctx.currentTime + 0.14) { schedule(step, nextTime); nextTime += STEP; step++; }
}

export async function startAudition(): Promise<boolean> {
  if (playing) return true;
  try {
    const AC = (window.AudioContext || (window as unknown as { webkitAudioContext: AC }).webkitAudioContext) as AC | undefined;
    if (!AC) return false;
    if (!ctx) {
      ctx = new AC();
      const comp = ctx.createDynamicsCompressor();
      master = ctx.createGain(); master.gain.value = 0;
      analyser = ctx.createAnalyser(); analyser.fftSize = 128; analyser.smoothingTimeConstant = 0.78;
      master.connect(comp); comp.connect(analyser); analyser.connect(ctx.destination);
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    await ctx.resume();
    if (!master) return false;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(MASTER_GAIN, ctx.currentTime + 0.25);
    step = 0; nextTime = ctx.currentTime + 0.08; startedPerf = performance.now();
    timer = setInterval(tick, 25);
    autoStop = setTimeout(stopAudition, 40000);
    playing = true; emit();
    return true;
  } catch {
    return false;
  }
}

export function stopAudition() {
  if (!playing) return;
  playing = false;
  if (timer) clearInterval(timer);
  if (autoStop) clearTimeout(autoStop);
  timer = null; autoStop = null;
  if (ctx && master) {
    const c = ctx;
    master.gain.cancelScheduledValues(c.currentTime);
    master.gain.setValueAtTime(master.gain.value, c.currentTime);
    master.gain.linearRampToValueAtTime(0, c.currentTime + 0.15);
    setTimeout(() => { if (!playing) c.suspend().catch(() => {}); }, 260);
  }
  emit();
}

export const isPlaying = () => playing;
/** Giây đã phát (cho đồng hồ timecode). */
export const elapsed = () => (playing ? (performance.now() - startedPerf) / 1000 : 0);
/** Đọc phổ thật vào `out` (0..1), trả về mức tổng 0..1; -1 nếu không phát. */
export function readSpectrum(out: Float32Array): number {
  if (!playing || !analyser) return -1;
  analyser.getByteFrequencyData(freq);
  const n = out.length; let sum = 0;
  for (let i = 0; i < n; i++) {
    const idx = Math.min(freq.length - 1, Math.floor(Math.pow(i / n, 1.6) * freq.length * 0.9));
    const v = freq[idx] / 255; out[i] = v; sum += v;
  }
  return Math.min(1, (sum / n) * 1.7);
}

if (typeof document !== "undefined") document.addEventListener("visibilitychange", () => { if (document.hidden) stopAudition(); });

const subscribe = (l: () => void) => { listeners.add(l); return () => { listeners.delete(l); }; };
export const useAudition = () => useSyncExternalStore(subscribe, isPlaying, () => false);
