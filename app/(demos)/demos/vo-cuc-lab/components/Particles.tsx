"use client";
import { useEffect, useRef } from "react";
import { field } from "../field";

export const SHAPE_NAMES = ["sphere", "frame", "brackets", "bars", "house", "spark", "heart"] as const;
const N = 5400;

const r = (a: number, b: number) => a + Math.random() * (b - a);
function fill(fn: (i: number, out: number[]) => void) {
  const a = new Float32Array(N * 3);
  const o = [0, 0, 0];
  for (let i = 0; i < N; i++) { fn(i, o); a[i * 3] = o[0]; a[i * 3 + 1] = o[1]; a[i * 3 + 2] = o[2]; }
  return a;
}
function polyline(pts: number[][], o: number[], jit = 0.02) {
  const segs = pts.length - 1;
  const t = Math.random() * segs;
  const k = Math.min(segs - 1, Math.floor(t));
  const f = t - k;
  for (let c = 0; c < 3; c++) o[c] = pts[k][c] + (pts[k + 1][c] - pts[k][c]) * f + r(-jit, jit);
}

export function makeShapes(): Float32Array[] {
  const sphere = fill((i, o) => {
    const j = (i * 7919) % N, y = 1 - (j / (N - 1)) * 2, rad = Math.sqrt(1 - y * y), th = j * 2.399963, s = 0.96 + Math.random() * 0.08;
    o[0] = Math.cos(th) * rad * s; o[1] = y * s; o[2] = Math.sin(th) * rad * s;
  });
  const frame = fill((i, o) => {
    // khung vuông rỗng dày + khung nhỏ phía sau, hạt dày ở rìa
    if (i % 4 === 0) { let x = 0, y = 0; do { x = r(-0.62, 0.62); y = r(-0.62, 0.62); } while (Math.abs(x) < 0.4 && Math.abs(y) < 0.4); o[0] = x * 0.9; o[1] = y * 0.9; o[2] = -0.35 + r(-0.04, 0.04); return; }
    let x = 0, y = 0;
    do { x = r(-0.95, 0.95); y = r(-0.95, 0.95); } while (Math.abs(x) < 0.6 && Math.abs(y) < 0.6);
    o[0] = x; o[1] = y; o[2] = r(-0.16, 0.16);
  });
  const lt = [[-0.35, 0.55, 0], [-0.9, 0, 0], [-0.35, -0.55, 0]], gt = [[0.35, 0.55, 0], [0.9, 0, 0], [0.35, -0.55, 0]], sl = [[0.18, 0.7, 0], [-0.18, -0.7, 0]];
  const brackets = fill((i, o) => polyline(i % 3 === 0 ? lt : i % 3 === 1 ? gt : sl, o, 0.05));
  const bars = fill((i, o) => {
    if (i % 5 === 0) polyline([[-0.9, -0.3, 0], [-0.2, 0.15, 0], [0.2, -0.05, 0], [0.8, 0.8, 0]], o, 0.025);
    else { const b = Math.floor(Math.random() * 4); const h = 0.35 + b * 0.28; o[0] = -0.75 + b * 0.5 + r(-0.12, 0.12); o[1] = -0.8 + Math.random() * h; o[2] = r(-0.06, 0.06); }
  });
  // "nhà/khối": thân + mái + hai cột, hạt dày ở thân
  const house = fill((i, o) => {
    const m = i % 6;
    if (m === 0) polyline([[-0.8, -0.75, 0], [-0.8, 0.1, 0], [0, 0.85, 0], [0.8, 0.1, 0], [0.8, -0.75, 0], [-0.8, -0.75, 0]], o, 0.04);
    else { o[0] = r(-0.75, 0.75); o[1] = r(-0.75, 0.3 + Math.max(0, 0.55 - Math.abs(o[0]) * 0.75)); o[2] = r(-0.15, 0.15); }
  });
  // sao bốn cánh lớn + hai sao nhỏ
  const star = (cx: number, cy: number, R: number, o: number[]) => {
    for (let t = 0; t < 30; t++) {
      const x = r(-R, R), y = r(-R, R);
      if (Math.pow(Math.abs(x / R), 0.6) + Math.pow(Math.abs(y / R), 0.6) <= 1) { o[0] = cx + x; o[1] = cy + y; o[2] = r(-0.06, 0.06); return; }
    }
    o[0] = cx; o[1] = cy; o[2] = 0;
  };
  const spark = fill((i, o) => { const m = i % 10; if (m < 6) star(-0.2, -0.1, 0.75, o); else if (m < 8) star(0.6, 0.62, 0.38, o); else star(0.45, -0.7, 0.3, o); });
  const heart = fill((_, o) => {
    const t = r(0, 6.283), d = Math.pow(Math.random(), 0.45);
    o[0] = (16 * Math.pow(Math.sin(t), 3) / 17) * d; o[1] = ((13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 17) * d + 0.05; o[2] = r(-0.25, 0.25) * d;
  });
  return [sphere, frame, brackets, bars, house, spark, heart];
}

const VERT = /* glsl */ `
uniform vec2 uMouse; uniform float uR; uniform float uSize; uniform float uPx;
attribute float aSeed; varying float vA;
void main(){
  vec4 wp = modelMatrix * vec4(position,1.);
  vec2 d = wp.xy - uMouse; float l = length(d);
  float f = smoothstep(uR, 0., l);
  wp.xy += normalize(d + vec2(1e-4)) * f * 0.55; wp.z += f * 0.4;
  vec4 mv = viewMatrix * wp;
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * uPx * (0.55 + aSeed * 0.9) * (5.0 / -mv.z);
  vA = 0.45 + 0.55 * aSeed;
}`;
const FRAG = /* glsl */ `
uniform float uO; varying float vA;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(vec3(0.84,0.85,1.0), a * vA * uO);
}`;

/** Trường hạt 3D cố định: một canvas duy nhất, đổi hình/vị trí theo trạng thái `field` (do cuộn điều khiển), phản ứng con trỏ. */
export function ParticleField() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};
    (async () => {
      const THREE = await import("three");
      if (disposed) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mobile = window.innerWidth < 760;
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
      el.appendChild(renderer.domElement);
      renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
      cam.position.z = 5;
      const shapes = makeShapes();
      const count = mobile ? 2800 : N;
      const cur = new Float32Array(shapes[field.shape]);
      const seed = new Float32Array(N);
      for (let i = 0; i < N; i++) seed[i] = Math.random();
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(cur, 3));
      geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
      geo.setDrawRange(0, count);
      const mat = new THREE.ShaderMaterial({
        vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        uniforms: { uMouse: { value: new THREE.Vector2(99, 99) }, uR: { value: 0.9 }, uSize: { value: 3 }, uPx: { value: renderer.getPixelRatio() }, uO: { value: 1 } },
      });
      const pts = new THREE.Points(geo, mat);
      pts.frustumCulled = false;
      const grp = new THREE.Group();
      grp.add(pts);
      scene.add(grp);
      const st = { x: field.x, y: field.y, s: field.s, o: field.o };
      const mouse = { x: 99, y: 99 };
      let visW = 6, visH = 3.6;
      const resize = () => {
        const w = window.innerWidth, h = window.innerHeight;
        renderer.setSize(w, h, false);
        cam.aspect = w / h;
        cam.updateProjectionMatrix();
        visH = 2 * 5 * Math.tan((40 * Math.PI) / 360);
        visW = visH * cam.aspect;
        mat.uniforms.uPx.value = renderer.getPixelRatio();
        mat.uniforms.uSize.value = mobile ? 3.6 : 3;
      };
      resize();
      window.addEventListener("resize", resize);
      const onMove = (e: PointerEvent) => { mouse.x = (e.clientX / window.innerWidth - 0.5) * visW; mouse.y = (0.5 - e.clientY / window.innerHeight) * visH; };
      const onLeave = () => { mouse.x = 99; mouse.y = 99; };
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      const t0 = performance.now();
      let raf = 0;
      const draw = (now: number) => {
        raf = requestAnimationFrame(draw);
        const k = reduced ? 1 : 0.075;
        st.x += (field.x - st.x) * k; st.y += (field.y - st.y) * k; st.s += (field.s - st.s) * k; st.o += (field.o - st.o) * Math.max(k, 0.22);
        if (st.o < 0.01) { el.style.visibility = "hidden"; return; }
        el.style.visibility = "visible";
        const tgt = shapes[field.shape] ?? shapes[0];
        const t = (now - t0) / 1000;
        const m = reduced ? 1 : 0.06;
        for (let i = 0; i < count; i++) {
          const j = i * 3;
          const nz = reduced ? 0 : Math.sin(t * 1.6 + i) * 0.0022;
          cur[j] += (tgt[j] - cur[j]) * m + nz; cur[j + 1] += (tgt[j + 1] - cur[j + 1]) * m + nz; cur[j + 2] += (tgt[j + 2] - cur[j + 2]) * m;
        }
        geo.attributes.position.needsUpdate = true;
        grp.position.set((st.x - 0.5) * visW, (0.5 - st.y) * visH, 0);
        grp.scale.setScalar(st.s * (visH / 3.64) * (window.innerWidth < 760 ? 0.9 : 1));
        if (!reduced) { grp.rotation.y = t * 0.22; grp.rotation.x = Math.sin(t * 0.3) * 0.12; }
        mat.uniforms.uMouse.value.set(mouse.x, mouse.y);
        mat.uniforms.uO.value = st.o;
        renderer.render(scene, cam);
      };
      raf = requestAnimationFrame(draw);
      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize); window.removeEventListener("pointermove", onMove); document.removeEventListener("pointerleave", onLeave);
        geo.dispose(); mat.dispose(); renderer.dispose(); renderer.domElement.remove();
      };
    })();
    return () => { disposed = true; cleanup(); };
  }, []);

  return <div ref={host} aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", visibility: "hidden" }} />;
}
