export type Shape = "sine" | "triangle" | "square" | "sawtooth";

/** Bộ tạo âm mẫu: một oscillator + analyser. Chỉ chạy sau thao tác của người dùng, âm lượng thấp, có nút dừng. */
let ctx: AudioContext | null = null;
let osc: OscillatorNode | null = null;
let gain: GainNode | null = null;
let analyser: AnalyserNode | null = null;
let buf: Float32Array<ArrayBuffer> | null = null;

export const synth = {
  playing: () => osc !== null,
  start(freq: number, shape: Shape, amp: number) {
    if (osc) return true;
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    osc = ctx.createOscillator();
    gain = ctx.createGain();
    analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    buf = new Float32Array(analyser.fftSize);
    osc.type = shape;
    osc.frequency.value = freq;
    gain.gain.value = 0;
    osc.connect(gain).connect(analyser).connect(ctx.destination);
    osc.start();
    gain.gain.setTargetAtTime(Math.min(0.12, amp * 0.12), ctx.currentTime, 0.05);
    return true;
  },
  update(freq: number, shape: Shape, amp: number) {
    if (!osc || !ctx || !gain) return;
    osc.type = shape;
    osc.frequency.setTargetAtTime(freq, ctx.currentTime, 0.03);
    gain.gain.setTargetAtTime(Math.min(0.12, amp * 0.12), ctx.currentTime, 0.05);
  },
  stop() {
    if (!ctx || !osc || !gain) return;
    const c = ctx, o = osc;
    gain.gain.setTargetAtTime(0, c.currentTime, 0.04);
    osc = null; gain = null; analyser = null; ctx = null;
    setTimeout(() => { try { o.stop(); void c.close(); } catch { /* đã đóng */ } }, 200);
  },
  /** Đọc mẫu thời gian thực (-1..1) hoặc null nếu không phát. */
  read(): Float32Array | null {
    if (!analyser || !buf) return null;
    analyser.getFloatTimeDomainData(buf);
    return buf;
  },
};
