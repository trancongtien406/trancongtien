"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ShapeName = "sphere" | "browser" | "play" | "phone" | "code" | "atom" | "cta" | "none";
type Shape = { pos: Float32Array; col: Float32Array; spin: boolean; scale: number; dy?: number };

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const hex = (h: string): [number, number, number] => [parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255];
const mix = (a: [number, number, number], b: [number, number, number], t: number): [number, number, number] => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const gauss = (r: () => number) => (r() + r() + r() + r() - 2) * 0.9;

function build(name: Exclude<ShapeName, "none">, N: number): Shape {
  const r = rng(name.length * 977 + 13);
  const pos = new Float32Array(N * 3);
  const col = new Float32Array(N * 3);
  const put = (i: number, x: number, y: number, z: number, c: [number, number, number]) => {
    pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
    col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
  };
  const white = hex("#f2efe9"), grey = hex("#9a9690");
  const spark = (c: [number, number, number]) => (r() < 0.06 ? hex("#fff4e6") : c);
  if (name === "sphere" || name === "cta") {
    const hot = name === "sphere";
    const c1 = hex(hot ? "#ff7a33" : "#ff8f8f"), c2 = hex(hot ? "#8e220a" : "#c92a4f");
    for (let i = 0; i < N; i++) {
      const y = r() * 2 - 1, rad = Math.sqrt(1 - y * y), th = r() * Math.PI * 2;
      const k = 0.96 + r() * 0.07;
      put(i, Math.cos(th) * rad * k, y * k, Math.sin(th) * rad * k, spark(mix(c2, c1, Math.pow(r(), 0.8))));
    }
    return { pos, col, spin: true, scale: 0.5, dy: hot ? 0.13 : 0 };
  }
  if (name === "browser") {
    const W = 1.15, H = 0.78;
    for (let i = 0; i < N; i++) {
      const u = r();
      let x = 0, y = 0;
      if (u < 0.22) { // viền
        const e = r() * 4;
        if (e < 1) { x = (e * 2 - 1) * W; y = H; } else if (e < 2) { x = W; y = ((e - 1) * 2 - 1) * H; } else if (e < 3) { x = ((e - 2) * 2 - 1) * W; y = -H; } else { x = -W; y = ((e - 3) * 2 - 1) * H; }
      } else if (u < 0.3) { x = (r() * 2 - 1) * W; y = H - 0.16 + (r() - 0.5) * 0.02; }
      else if (u < 0.62) { const row = Math.floor(r() * 7); const len = [0.9, 0.7, 0.8, 0.5, 0.85, 0.6, 0.4][row]; x = -W + 0.15 + r() * len; y = H - 0.38 - row * 0.12 + (r() - 0.5) * 0.025; }
      else { const b = Math.floor(r() * 3); const bx = -0.1 + b * 0.42; const e = r() * 4; const w = 0.36, h = 0.42; if (e < 1) { x = bx + e * w; y = -0.1; } else if (e < 2) { x = bx + w; y = -0.1 - (e - 1) * h; } else if (e < 3) { x = bx + (3 - e) * w; y = -0.1 - h; } else { x = bx; y = -0.1 - (4 - e) * h; } }
      put(i, x + (r() - 0.5) * 0.015, y + (r() - 0.5) * 0.015, x * 0.12 + (r() - 0.5) * 0.02, spark(r() < 0.8 ? white : grey));
    }
    return { pos, col, spin: false, scale: 0.8 };
  }
  if (name === "play") {
    for (let i = 0; i < N; i++) {
      if (r() < 0.38) {
        const a = r() * Math.PI * 2, rad = 1.12 + (r() - 0.5) * 0.07;
        put(i, Math.cos(a) * rad, Math.sin(a) * rad, (r() - 0.5) * 0.08, spark(white));
      } else {
        let a = r(), b = r(); if (a + b > 1) { a = 1 - a; b = 1 - b; }
        const vx = -0.4 * (1 - a - b) + -0.4 * a + 0.62 * b;
        const vy = 0.62 * (1 - a - b) + -0.62 * a + 0 * b;
        put(i, vx, vy, (r() - 0.5) * 0.25, spark(r() < 0.8 ? white : grey));
      }
    }
    return { pos, col, spin: false, scale: 0.88 };
  }
  if (name === "phone") {
    // điện thoại: khối chữ nhật bo góc đặc, viền sáng hơn, khuyết "tai thỏ"
    const w = 0.62, h = 1.15, rr = 0.16;
    for (let i = 0; i < N; i++) {
      let x = 0, y = 0;
      for (let k = 0; k < 8; k++) {
        x = (r() * 2 - 1) * w; y = (r() * 2 - 1) * h;
        const cx = Math.max(Math.abs(x) - (w - rr), 0), cy = Math.max(Math.abs(y) - (h - rr), 0);
        if (cx * cx + cy * cy <= rr * rr) break;
      }
      const edge = r() < 0.22;
      if (edge) { const e = r() * 4; if (e < 1) { x = (e * 2 - 1) * (w - 0.05); y = h - 0.01; } else if (e < 2) { x = w - 0.01; y = ((e - 1) * 2 - 1) * (h - 0.1); } else if (e < 3) { x = ((e - 2) * 2 - 1) * (w - 0.05); y = -h + 0.01; } else { x = -w + 0.01; y = ((e - 3) * 2 - 1) * (h - 0.1); } }
      put(i, x, y, (r() - 0.5) * 0.1, spark(r() < (edge ? 0.95 : 0.7) ? white : grey));
    }
    return { pos, col, spin: false, scale: 0.85 };
  }
  if (name === "code") {
    const strokes: [number, number][][] = [
      [[-0.55, 0.62], [-1.15, 0], [-0.55, -0.62]],
      [[-0.22, -0.78], [0.22, 0.78]],
      [[0.55, 0.62], [1.15, 0], [0.55, -0.62]],
    ];
    for (let i = 0; i < N; i++) {
      const st = strokes[Math.floor(r() * 3)];
      const seg = Math.floor(r() * (st.length - 1));
      const t = r();
      const x = st[seg][0] + (st[seg + 1][0] - st[seg][0]) * t, y = st[seg][1] + (st[seg + 1][1] - st[seg][1]) * t;
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 0.1;
      put(i, x + Math.cos(a) * d, y + Math.sin(a) * d, (r() - 0.5) * 0.2, spark(r() < 0.82 ? white : grey));
    }
    return { pos, col, spin: false, scale: 0.8 };
  }
  // atom
  for (let i = 0; i < N; i++) {
    if (r() < 0.22) { put(i, gauss(r) * 0.14, gauss(r) * 0.14, gauss(r) * 0.14, spark(white)); continue; }
    const o = Math.floor(r() * 3), a = r() * Math.PI * 2;
    let x = Math.cos(a) * 1.15 + gauss(r) * 0.015, y = Math.sin(a) * 0.42 + gauss(r) * 0.015, z = gauss(r) * 0.015;
    const rot = (o * Math.PI) / 3, c = Math.cos(rot), s = Math.sin(rot);
    [x, y] = [x * c - y * s, x * s + y * c];
    const tilt = 0.9; [y, z] = [y * Math.cos(tilt) - z * Math.sin(tilt), y * Math.sin(tilt) + z * Math.cos(tilt)];
    put(i, x, y, z, spark(r() < 0.8 ? white : grey));
  }
  return { pos, col, spin: true, scale: 0.78 };
}

const VERT = `
attribute vec3 color;
uniform float uSize;
uniform float uPx;
varying vec3 vC;
void main(){
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  gl_PointSize = uSize * uPx * (4.0 / -mv.z);
  vC = color;
  gl_Position = projectionMatrix * mv;
}`;
const FRAG = `
precision mediump float;
uniform float uAlpha;
varying vec3 vC;
void main(){
  vec2 d = gl_PointCoord - 0.5;
  float r = dot(d,d);
  if(r > 0.25) discard;
  gl_FragColor = vec4(vC, uAlpha * smoothstep(0.25, 0.05, r));
}`;

/** Đám hạt fixed phía sau trang: biến hình theo [data-shape] đang ở giữa khung nhìn khi cuộn. */
export function ParticleStage({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let disposed = false;
    const cleanups: Array<() => void> = [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    (async () => {
      const THREE = await import("three");
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const small = window.innerWidth < 760;
      const N = small ? 5200 : 11000;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(0x000000, 0);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
      camera.position.z = 5;
      const group = new THREE.Group();
      scene.add(group);

      const names: Exclude<ShapeName, "none">[] = ["sphere", "browser", "play", "phone", "code", "atom", "cta"];
      const shapes = {} as Record<Exclude<ShapeName, "none">, Shape>;
      names.forEach((n) => { shapes[n] = build(n, N); });

      // vị trí đầu: tung toé, rồi tụ lại thành quả cầu
      const r0 = rng(7);
      const cur = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) { const d = 2 + r0() * 3, a = r0() * 6.283, b = Math.acos(2 * r0() - 1); cur[i * 3] = d * Math.sin(b) * Math.cos(a); cur[i * 3 + 1] = d * Math.sin(b) * Math.sin(a); cur[i * 3 + 2] = d * Math.cos(b) - 1; }
      const from = new Float32Array(cur), colFrom = new Float32Array(shapes.sphere.col), colCur = new Float32Array(colFrom);
      let target: Shape = shapes.sphere;
      const delay = new Float32Array(N); const jit = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) { delay[i] = r0() * 0.5; jit[i * 3] = r0() - 0.5; jit[i * 3 + 1] = r0() - 0.5; jit[i * 3 + 2] = r0() - 0.5; }

      const geo = new THREE.BufferGeometry();
      const posAttr = new THREE.BufferAttribute(cur, 3); posAttr.setUsage(THREE.DynamicDrawUsage);
      const colAttr = new THREE.BufferAttribute(colCur, 3); colAttr.setUsage(THREE.DynamicDrawUsage);
      geo.setAttribute("position", posAttr);
      geo.setAttribute("color", colAttr);
      const mat = new THREE.ShaderMaterial({
        vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false,
        uniforms: { uSize: { value: small ? 6 : 4.6 }, uPx: { value: renderer.getPixelRatio() }, uAlpha: { value: 0.95 } },
      });
      const points = new THREE.Points(geo, mat);
      points.frustumCulled = false;
      group.add(points);

      const st = { t: 1, alpha: 0, spinAng: 0, mx: 0, my: 0, shape: "sphere" as ShapeName };
      let w = 1, h = 1;
      const place = () => {
        w = window.innerWidth; h = window.innerHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h; camera.updateProjectionMatrix();
        const vh = 2 * 5 * Math.tan((40 * Math.PI) / 360), vw = vh * camera.aspect;
        if (w >= 900) { group.position.set(vw * 0.25, -0.02 + (target.dy ?? 0) * vh, 0); group.scale.setScalar(Math.min(1.05, vh * 0.34) * target.scale * 1.18); }
        else { group.position.set(0, vh * 0.24, 0); group.scale.setScalar(Math.min(vw * 0.42, 0.9) * target.scale); }
      };
      place();
      const onResize = () => { place(); if (reduce) renderer.render(scene, camera); };
      window.addEventListener("resize", onResize);

      const smooth = (x: number) => { const c = Math.min(1, Math.max(0, x)); return c * c * (3 - 2 * c); };
      const apply = () => {
        const t = st.t;
        const to = target.pos, cto = target.col;
        for (let i = 0; i < N; i++) {
          const k = i * 3;
          const p = smooth((t - delay[i] * 0.55) / 0.5);
          const arc = Math.sin(p * Math.PI) * 0.45;
          cur[k] = from[k] + (to[k] - from[k]) * p + jit[k] * arc;
          cur[k + 1] = from[k + 1] + (to[k + 1] - from[k + 1]) * p + jit[k + 1] * arc;
          cur[k + 2] = from[k + 2] + (to[k + 2] - from[k + 2]) * p + jit[k + 2] * arc;
          colCur[k] = colFrom[k] + (cto[k] - colFrom[k]) * p;
          colCur[k + 1] = colFrom[k + 1] + (cto[k + 1] - colFrom[k + 1]) * p;
          colCur[k + 2] = colFrom[k + 2] + (cto[k + 2] - colFrom[k + 2]) * p;
        }
        posAttr.needsUpdate = true; colAttr.needsUpdate = true;
      };

      let tween: gsap.core.Tween | null = null;
      const setShape = (name: ShapeName) => {
        if (name === st.shape) return;
        st.shape = name;
        if (name === "none") { gsap.to(mat.uniforms.uAlpha, { value: 0, duration: 0.7, onUpdate: reduce ? () => renderer.render(scene, camera) : undefined }); return; }
        gsap.to(mat.uniforms.uAlpha, { value: 0.95, duration: 0.7 });
        from.set(cur); colFrom.set(colCur);
        target = shapes[name];
        if (!target.spin) group.rotation.y = ((group.rotation.y + Math.PI) % (Math.PI * 2)) - Math.PI;
        tween?.kill();
        if (reduce) { st.t = 1; apply(); place(); renderer.render(scene, camera); return; }
        st.t = 0;
        tween = gsap.to(st, { t: 1, duration: 1.9, ease: "none", onUpdate: apply });
        place();
      };

      // khởi động: hạt tụ lại thành quả cầu
      if (reduce) { st.t = 1; apply(); mat.uniforms.uAlpha.value = 0.95; renderer.render(scene, camera); }
      else { st.t = 0; tween = gsap.to(st, { t: 1, duration: 2.4, ease: "none", delay: 0.2, onUpdate: apply }); gsap.fromTo(mat.uniforms.uAlpha, { value: 0 }, { value: 0.95, duration: 1.2 }); }

      // theo dõi các mục
      const triggers: ScrollTrigger[] = [];
      document.querySelectorAll<HTMLElement>("[data-shape]").forEach((el) => {
        triggers.push(ScrollTrigger.create({
          trigger: el, start: "top 58%", end: "bottom 42%",
          onToggle: (self) => { if (self.isActive) setShape(el.dataset.shape as ShapeName); },
        }));
      });

      const onMove = (e: PointerEvent) => { st.mx = (e.clientX / w - 0.5) * 2; st.my = (e.clientY / h - 0.5) * 2; };
      window.addEventListener("pointermove", onMove, { passive: true });

      let raf = 0, last = performance.now(), visible = true;
      const onVis = () => { visible = !document.hidden; last = performance.now(); };
      document.addEventListener("visibilitychange", onVis);
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        if (!visible) return;
        const dt = Math.min(0.05, (now - last) / 1000); last = now;
        if (target.spin) { st.spinAng += dt * 0.28; group.rotation.y = st.spinAng; }
        else group.rotation.y += (Math.sin(now / 1800) * 0.28 + st.mx * 0.25 - group.rotation.y) * 0.05;
        group.rotation.x += (st.my * 0.12 - group.rotation.x) * 0.05;
        renderer.render(scene, camera);
      };
      if (!reduce) raf = requestAnimationFrame(loop);

      cleanups.push(() => {
        cancelAnimationFrame(raf);
        tween?.kill();
        gsap.killTweensOf(mat.uniforms.uAlpha);
        triggers.forEach((t) => t.kill());
        window.removeEventListener("resize", onResize);
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("visibilitychange", onVis);
        geo.dispose(); mat.dispose(); renderer.dispose();
      });
    })();

    return () => { disposed = true; cleanups.forEach((fn) => fn()); };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
