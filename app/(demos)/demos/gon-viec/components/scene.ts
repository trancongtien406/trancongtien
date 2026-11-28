import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type SceneApi = {
  setTarget: (p: number) => void;
  setStatic: (on: boolean) => void;
  resize: () => void;
  start: () => void;
  stop: () => void;
  dispose: () => void;
  getP: () => number;
};
type Hooks = { onFrame: (p: number) => void };

const clamp = (x: number) => Math.min(1, Math.max(0, x));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const sm = (x: number) => x * x * (3 - 2 * x);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const PAL = ["#2f4f86", "#4a3f9a", "#a0287f", "#d23f78", "#7a2f9c", "#3a6aa0"];

function cardTexture(c1: string, c2: string, title: string, tag: string) {
  const cv = document.createElement("canvas");
  cv.width = 512; cv.height = 320;
  const g = cv.getContext("2d")!;
  const gr = g.createLinearGradient(0, 0, 512, 320);
  gr.addColorStop(0, c1); gr.addColorStop(1, c2);
  g.fillStyle = gr;
  g.beginPath(); g.roundRect(0, 0, 512, 320, 34); g.fill();
  g.fillStyle = "rgba(255,255,255,.9)"; g.font = "600 34px Inter, system-ui, sans-serif"; g.fillText(title, 34, 80);
  g.fillStyle = "rgba(255,255,255,.65)"; g.font = "500 24px Inter, system-ui, sans-serif"; g.fillText(tag, 34, 122);
  g.fillStyle = "rgba(255,255,255,.28)"; g.beginPath(); g.roundRect(34, 160, 444, 14, 7); g.fill();
  g.fillStyle = "rgba(255,255,255,.85)"; g.beginPath(); g.roundRect(34, 160, 444 * 0.62, 14, 7); g.fill();
  for (let i = 0; i < 3; i++) { g.fillStyle = ["#f3d7b5", "#c9d6e8", "#e8c4cf"][i]; g.beginPath(); g.arc(56 + i * 34, 238, 20, 0, 7); g.fill(); g.strokeStyle = c1; g.lineWidth = 4; g.stroke(); }
  g.fillStyle = "rgba(255,255,255,.22)"; g.beginPath(); g.roundRect(330, 214, 148, 48, 24); g.fill();
  g.fillStyle = "#fff"; g.font = "600 22px Inter, system-ui, sans-serif"; g.fillText("Hạn 28/12", 346, 246);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}

function boardTexture() {
  const cv = document.createElement("canvas");
  cv.width = 1200; cv.height = 880;
  const g = cv.getContext("2d")!;
  g.clearRect(0, 0, 1200, 880);
  g.fillStyle = "#f4f4f6"; g.beginPath(); g.roundRect(0, 0, 1200, 880, 60); g.fill();
  g.fillStyle = "#e6e6ea"; g.beginPath(); g.roundRect(30, 30, 230, 820, 40); g.fill();
  g.fillStyle = "#2c2c32"; g.font = "700 40px Inter, system-ui, sans-serif"; g.fillText("Bảng điều khiển", 300, 96);
  g.font = "700 40px Inter, system-ui, sans-serif"; g.fillText("Bảng công việc", 760, 96);
  for (let i = 0; i < 9; i++) { g.fillStyle = "#c9c9d0"; g.beginPath(); g.roundRect(58, 120 + i * 64, 34, 34, 10); g.fill(); g.fillStyle = "#b5b5be"; g.beginPath(); g.roundRect(108, 130 + i * 64, 110 - (i % 3) * 18, 14, 7); g.fill(); }
  g.fillStyle = "#d8b79a"; g.beginPath(); g.arc(70, 800, 26, 0, 7); g.fill();
  g.fillStyle = "#8a8a94"; g.font = "500 24px Inter, system-ui, sans-serif"; g.fillText("Minh Khôi", 108, 798);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}

export function createScene(canvas: HTMLCanvasElement, wrap: HTMLElement, hooks: Hooks): SceneApi {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const scene = new THREE.Scene();
  const pm = new THREE.PMREMGenerator(renderer);
  const env = pm.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = env.texture;
  const camera = new THREE.PerspectiveCamera(28, 1.4, 0.1, 100);
  const sun = new THREE.DirectionalLight(0xffffff, 1.4); sun.position.set(-4, 8, 5);
  sun.castShadow = true; sun.shadow.mapSize.set(1536, 1536); sun.shadow.radius = 6; sun.shadow.bias = -0.0004;
  Object.assign(sun.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: 1, far: 30 });
  scene.add(sun);
  scene.add(new THREE.AmbientLight(0xffffff, 0.35));

  const disposables: { dispose: () => void }[] = [env, pm];
  const track = <T extends { dispose: () => void }>(o: T) => { disposables.push(o); return o; };

  /* ---- Dải tấm 3D ---- */
  const N = 88;
  const slabGeo = track(new THREE.BoxGeometry(0.1, 1.5, 0.7));
  const slabMat = track(new THREE.MeshStandardMaterial({ roughness: 0.34, metalness: 0.15, envMapIntensity: 0.55 }));
  const ribbon = new THREE.InstancedMesh(slabGeo, slabMat, N);
  const col = new THREE.Color();
  for (let i = 0; i < N; i++) {
    const u = i / (N - 1) * (PAL.length - 1);
    const a = Math.floor(u), f = u - a;
    col.set(PAL[a]).lerp(new THREE.Color(PAL[Math.min(PAL.length - 1, a + 1)]), f);
    col.offsetHSL(0, 0.08, ((i * 37) % 11) / 11 * 0.16 - 0.1);
    ribbon.setColorAt(i, col);
  }
  const ribbonGroup = new THREE.Group(); ribbonGroup.add(ribbon); scene.add(ribbonGroup);
  const dummy = new THREE.Object3D();
  const updateRibbon = (t: number) => {
    for (let i = 0; i < N; i++) {
      const x = (i - N / 2) * 0.145;
      const ph = x * 0.5 + t * 0.45;
      const spike = Math.exp(-((x + 0.4) ** 2) * 2.6);
      const y = Math.sin(ph) * 0.42 + Math.sin(ph * 2.1 + 1) * 0.14 + spike * 0.95;
      dummy.position.set(x, y, Math.sin(ph * 0.8) * 0.3);
      dummy.rotation.set(Math.cos(ph) * 0.12, 0.95 + Math.sin(ph * 1.3) * 0.7 + spike * 0.4, Math.sin(ph * 0.9) * 0.1);
      dummy.scale.set(1, 1 + spike * 0.85, 1);
      dummy.updateMatrix();
      ribbon.setMatrixAt(i, dummy.matrix);
    }
    ribbon.instanceMatrix.needsUpdate = true;
  };

  /* ---- Bảng + foil nhàu ---- */
  const BW = 6, BH = 4.4, SX = 84, SY = 62;
  const boardGroup = new THREE.Group(); scene.add(boardGroup);
  const sheetGeo = track(new THREE.PlaneGeometry(BW, BH, SX, SY));
  const sheetMat = track(new THREE.MeshPhysicalMaterial({ color: "#e8e8ee", metalness: 0.95, roughness: 0.16, flatShading: true, envMapIntensity: 2, clearcoat: 1, clearcoatRoughness: 0.12, transparent: true }));
  const sheet = new THREE.Mesh(sheetGeo, sheetMat); sheet.rotation.x = -Math.PI / 2; sheet.castShadow = true; sheet.receiveShadow = true; boardGroup.add(sheet);
  const base = sheetGeo.attributes.position.array.slice() as Float32Array;
  let lastAmp = -1;
  const crumple = (amp: number) => {
    if (Math.abs(amp - lastAmp) < 0.004) return;
    lastAmp = amp;
    const pos = sheetGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3], y = base[i * 3 + 1];
      const r = Math.abs(Math.sin(x * 2.3 + y * 1.4)) * 0.5 + Math.abs(Math.sin(x * 4.9 - y * 3.3 + 1.2)) * 0.32 + Math.abs(Math.sin(x * 9.1 + y * 7.7)) * 0.14;
      const edge = 0.55 + 0.45 * Math.min(1, (Math.min(BW / 2 - Math.abs(x), BH / 2 - Math.abs(y))) * 1.2);
      pos.setZ(i, (r - 0.4) * 0.55 * amp * edge);
    }
    pos.needsUpdate = true;
  };
  const bezelMat = track(new THREE.MeshStandardMaterial({ color: "#dcdce0", roughness: 0.5, transparent: true, opacity: 0 }));
  const bezel = new THREE.Mesh(track(new THREE.PlaneGeometry(BW + 0.5, BH + 0.5)), bezelMat);
  bezel.receiveShadow = true; bezel.rotation.x = -Math.PI / 2; bezel.position.y = -0.03; boardGroup.add(bezel);
  const dashTex = track(boardTexture());
  const dashMat = track(new THREE.MeshBasicMaterial({ map: dashTex, transparent: true, opacity: 0, toneMapped: false }));
  const dash = new THREE.Mesh(track(new THREE.PlaneGeometry(BW, BH)), dashMat);
  dash.rotation.x = -Math.PI / 2; dash.position.y = 0.012; boardGroup.add(dash);
  const recvMat = track(new THREE.ShadowMaterial({ opacity: 0, color: 0x2a1840 }));
  const recv = new THREE.Mesh(track(new THREE.PlaneGeometry(BW, BH)), recvMat);
  recv.rotation.x = -Math.PI / 2; recv.position.y = 0.016; recv.receiveShadow = true; boardGroup.add(recv);

  /* chấm lưới + góc ngắm */
  const dotPos: number[] = [];
  for (let x = -4; x <= 4.01; x += 0.4) for (let z = -3.2; z <= 3.21; z += 0.4) dotPos.push(x, -0.05, z);
  const dotGeo = track(new THREE.BufferGeometry()); dotGeo.setAttribute("position", new THREE.Float32BufferAttribute(dotPos, 3));
  const dotMat = track(new THREE.PointsMaterial({ color: "#7d7d86", size: 0.035, transparent: true, opacity: 0 }));
  boardGroup.add(new THREE.Points(dotGeo, dotMat));
  const br: number[] = [];
  const corner = (cx: number, cz: number, sx: number, sz: number) => { br.push(cx, -0.04, cz, cx + sx * 0.9, -0.04, cz, cx, -0.04, cz, cx, -0.04, cz + sz * 0.9); };
  corner(-BW / 2 - 0.6, -BH / 2 - 0.6, 1, 1); corner(BW / 2 + 0.6, -BH / 2 - 0.6, -1, 1); corner(-BW / 2 - 0.6, BH / 2 + 0.6, 1, -1); corner(BW / 2 + 0.6, BH / 2 + 0.6, -1, -1);
  const brGeo = track(new THREE.BufferGeometry()); brGeo.setAttribute("position", new THREE.Float32BufferAttribute(br, 3));
  const brMat = track(new THREE.LineBasicMaterial({ color: "#6d6d76", transparent: true, opacity: 0 }));
  boardGroup.add(new THREE.LineSegments(brGeo, brMat));

  /* thẻ việc */
  const cardDefs = [
    { x: -1.7, z: -1.45, c: ["#c9565f", "#d9778a"], t: "Thiết kế trang chủ", g: "Ưu tiên cao" },
    { x: -0.45, z: -1.35, c: ["#b6479b", "#cf63a3"], t: "Viết nội dung", g: "Đang làm" },
    { x: 0.85, z: -1.2, c: ["#9a4aa8", "#c05fa0"], t: "Duyệt bản dựng", g: "Chờ duyệt" },
    { x: -1.9, z: -0.1, c: ["#547b9c", "#6f94b0"], t: "Khảo sát khách", g: "Đang làm" },
    { x: -0.5, z: 0.0, c: ["#b6479b", "#c9569b"], t: "Báo giá đối tác", g: "Ưu tiên cao" },
    { x: 0.9, z: 0.15, c: ["#c9565f", "#de7f78"], t: "Lên lịch đăng", g: "Hạn hôm nay" },
    { x: -1.1, z: 1.25, c: ["#547b9c", "#7a9fb8"], t: "Kiểm thử app", g: "Đang làm" },
    { x: 0.35, z: 1.3, c: ["#9a4aa8", "#bd5fa9"], t: "Họp nhóm tuần", g: "Thứ Sáu" },
    { x: 1.7, z: 1.1, c: ["#c9565f", "#d9778a"], t: "Chốt hợp đồng", g: "Ưu tiên cao" },
  ];
  const cardGeo = track(new THREE.PlaneGeometry(1.25, 0.78));
  const shadowGeo = track(new THREE.PlaneGeometry(1.45, 0.98));
  const shCv = document.createElement("canvas"); shCv.width = shCv.height = 64;
  const sg = shCv.getContext("2d")!; const rg = sg.createRadialGradient(32, 32, 4, 32, 32, 32); rg.addColorStop(0, "rgba(40,20,60,.5)"); rg.addColorStop(1, "rgba(40,20,60,0)"); sg.fillStyle = rg; sg.fillRect(0, 0, 64, 64);
  const shTex = track(new THREE.CanvasTexture(shCv));
  const cards = cardDefs.map((d, i) => {
    const tex = track(cardTexture(d.c[0], d.c[1], d.t, d.g));
    const mat = track(new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, toneMapped: false }));
    const m = new THREE.Mesh(cardGeo, mat); m.rotation.x = -Math.PI / 2; m.rotation.z = (i % 2 ? 1 : -1) * 0.05; m.castShadow = true;
    const smat = track(new THREE.MeshBasicMaterial({ map: shTex, transparent: true, opacity: 0, depthWrite: false }));
    const sh = new THREE.Mesh(shadowGeo, smat); sh.rotation.x = -Math.PI / 2; sh.position.set(d.x + 0.08, 0.02, d.z + 0.12);
    boardGroup.add(m, sh);
    return { m, mat, sh, smat, d, i };
  });

  boardGroup.visible = false;

  /* ---- Điều khiển ---- */
  const poseA = { pos: new THREE.Vector3(0, 0.2, 15), look: new THREE.Vector3(0, 0.1, 0), fov: 28 };
  const camUp = new THREE.Vector3(); void camUp;
  const poseB = { pos: new THREE.Vector3(5.6, 8.2, 6.6), look: new THREE.Vector3(0, 0, 0), fov: 27 };
  const tmp = new THREE.Vector3(), tmpL = new THREE.Vector3();
  let cur = 0, target = 0, staticMode = false, running = false, raf = 0, last = 0, tAcc = 0, visible = true;

  const draw = (p: number, t: number) => {
    // dải
    const rOut = sm(seg(p, 0.0, 0.2));
    const back = sm(seg(p, 0.9, 0.99));
    ribbonGroup.position.y = p < 0.5 ? rOut * 6.5 : -6.5 * (1 - back) - 0 * back;
    if (p >= 0.5) ribbonGroup.position.y = lerp(-7, 0, back);
    ribbonGroup.visible = p < 0.26 || p > 0.92;
    updateRibbon(t);
    // máy quay
    const cam = sm(seg(p, 0.16, 0.4)) * (1 - back);
    tmp.copy(poseA.pos).lerp(poseB.pos, cam); tmpL.copy(poseA.look).lerp(poseB.look, cam);
    camera.position.copy(tmp); camera.lookAt(tmpL); camera.fov = lerp(poseA.fov, poseB.fov, cam); camera.updateProjectionMatrix();
    // tấm foil
    const show = sm(seg(p, 0.27, 0.38)) * (1 - sm(seg(p, 0.9, 0.96)));
    boardGroup.visible = show > 0.001;
    const flat = sm(seg(p, 0.4, 0.56));
    crumple(1 - flat);
    sheetMat.opacity = show;
    sheetMat.metalness = lerp(0.95, 0.0, flat); sheetMat.roughness = lerp(0.16, 0.7, flat);
    sheetMat.color.set("#e8e8ee").lerp(new THREE.Color("#f1f1f3"), flat);
    sheet.scale.setScalar(lerp(0.75, 1, show));
    bezelMat.opacity = flat * 0.95;
    dotMat.opacity = show * (1 - sm(seg(p, 0.5, 0.64))) * 0.9;
    brMat.opacity = show * (1 - sm(seg(p, 0.5, 0.64))) * 0.9;
    dashMat.opacity = sm(seg(p, 0.58, 0.7));
    cards.forEach((c) => {
      const a = sm(seg(p, 0.44 + c.i * 0.018, 0.56 + c.i * 0.018));
      c.m.position.set(c.d.x, lerp(3.4, 0.11, a * a), c.d.z);
      c.mat.opacity = clamp(a * 1.6);
      c.smat.opacity = a * a * 0.85;
    });
    // trượt sang phải
    const s = sm(seg(p, 0.7, 0.86));
    boardGroup.position.set(lerp(0, 4.4, s), 0, lerp(0, 1.5, s));
    boardGroup.scale.setScalar(lerp(1, 1.55, s));
    boardGroup.rotation.y = lerp(0, -0.2, s);
    recvMat.opacity = sm(seg(p, 0.5, 0.62)) * show * 0.32;
    // thẻ nổi nhẹ
    cards.forEach((c) => { c.m.position.y += Math.sin(t * 1.2 + c.i) * 0.012 * a(p); });
  };
  const a = (p: number) => sm(seg(p, 0.56, 0.7));

  const resize = () => {
    const w = wrap.clientWidth, h = wrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // màn hẹp: lùi máy quay để vẫn thấy hết dải
    const k = camera.aspect < 1 ? 1.25 / camera.aspect ** 0.55 : 1;
    poseA.pos.z = 15 * k; poseB.pos.set(5.6 * k, 8.2 * k, 6.6 * k);
    camera.updateProjectionMatrix();
    draw(cur, tAcc);
    renderer.render(scene, camera);
  };

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    if (!visible) return;
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now;
    if (!staticMode) tAcc += dt;
    cur += (target - cur) * Math.min(1, dt * 7);
    draw(cur, tAcc);
    renderer.render(scene, camera);
    hooks.onFrame(cur);
  };
  const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; }, { threshold: 0 });
  io.observe(wrap);
  const ro = new ResizeObserver(resize); ro.observe(wrap);

  return {
    setTarget: (p) => { target = p; if (staticMode) { cur = p; } },
    setStatic: (on) => { staticMode = on; },
    resize,
    start: () => { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); },
    stop: () => { running = false; cancelAnimationFrame(raf); },
    getP: () => cur,
    dispose: () => {
      running = false; cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
      disposables.forEach((d) => d.dispose());
      slabGeo.dispose(); renderer.dispose(); renderer.forceContextLoss();
    },
  };
}
