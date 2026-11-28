import * as THREE from "three";
import { HOTSPOTS, PRODUCTS } from "./data";

export interface StoreApi {
  setProgress(p: number): void;
  setLook(x: number, y: number): void;
  resize(): void;
  setActive(v: boolean): void;
  renderOnce(): void;
  dispose(): void;
}

export interface StoreOpts {
  canvas: HTMLCanvasElement;
  reduced: boolean;
  onHot: (i: number | null) => void;
  onZone: (z: string) => void;
}

const BLUE = 0x0b4ccf;
const RED = 0xd0212e;
const BEIGE = 0xe6d9b8;

function mulberry(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function canvasTex(w: number, h: number, draw: (c: CanvasRenderingContext2D) => void) {
  const cv = document.createElement("canvas");
  cv.width = w;
  cv.height = h;
  const c = cv.getContext("2d")!;
  draw(c);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

export function createStore(opts: StoreOpts): StoreApi {
  const { canvas, reduced } = opts;
  const family = getComputedStyle(canvas).fontFamily || "sans-serif";
  const disposables: { dispose(): void }[] = [];
  const track = <T extends { dispose(): void }>(o: T) => {
    disposables.push(o);
    return o;
  };

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0xe9e2d0);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xebe5d6, 16, 62);
  const camera = new THREE.PerspectiveCamera(62, 1, 0.1, 120);
  scene.add(camera);

  scene.add(new THREE.AmbientLight(0xffffff, 1.7));
  scene.add(new THREE.HemisphereLight(0xffffff, 0xcdbf9f, 1.3));

  const mat = (color: number, extra: Partial<THREE.MeshLambertMaterialParameters> = {}) => track(new THREE.MeshLambertMaterial({ color, ...extra }));
  const boxGeo = track(new THREE.BoxGeometry(1, 1, 1));
  const planeGeo = track(new THREE.PlaneGeometry(1, 1));
  const box = (parent: THREE.Object3D, m: THREE.Material, sx: number, sy: number, sz: number, x: number, y: number, z: number) => {
    const o = new THREE.Mesh(boxGeo, m);
    o.scale.set(sx, sy, sz);
    o.position.set(x, y, z);
    parent.add(o);
    return o;
  };

  const signTex = (text: string, bg: string, fg: string, w = 1024, h = 160, sub?: string) =>
    track(
      canvasTex(w, h, (c) => {
        c.fillStyle = bg;
        c.fillRect(0, 0, w, h);
        c.fillStyle = fg;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.font = `700 ${Math.round(h * (sub ? 0.4 : 0.46))}px ${family}`;
        c.fillText(text, w / 2, sub ? h * 0.38 : h / 2, w - 40);
        if (sub) {
          c.font = `500 ${Math.round(h * 0.2)}px ${family}`;
          c.fillText(sub, w / 2, h * 0.76, w - 40);
        }
      }),
    );
  const signMesh = (tex: THREE.Texture, w: number, h: number) => {
    const m = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide }));
    track(m.material as THREE.Material);
    m.scale.set(w, h, 1);
    return m;
  };

  /* ---------- floor, ceiling, walls ---------- */
  const floorTex = track(
    canvasTex(256, 256, (c) => {
      c.fillStyle = "#dedbd2";
      c.fillRect(0, 0, 256, 256);
      c.strokeStyle = "rgba(160,155,140,.35)";
      c.lineWidth = 2;
      c.strokeRect(1, 1, 254, 254);
      const g = c.createLinearGradient(0, 0, 256, 256);
      g.addColorStop(0, "rgba(255,255,255,.35)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      c.fillStyle = g;
      c.fillRect(0, 0, 256, 256);
    }),
  );
  floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
  floorTex.repeat.set(26, 34);
  const floor = new THREE.Mesh(planeGeo, track(new THREE.MeshLambertMaterial({ map: floorTex })));
  floor.rotation.x = -Math.PI / 2;
  floor.scale.set(52, 68, 1);
  floor.position.set(14, 0, -24);
  scene.add(floor);

  const ceil = new THREE.Mesh(planeGeo, mat(BEIGE));
  ceil.rotation.x = Math.PI / 2;
  ceil.scale.set(52, 68, 1);
  ceil.position.set(14, 3.9, -24);
  scene.add(ceil);

  const wallM = mat(0xdccfa8);
  const walls: [number, number, number, number, number][] = [
    [-9, 0, 0, 68, Math.PI / 2], // x=-9
    [41, 0, 0, 68, -Math.PI / 2],
  ];
  walls.forEach(([x, , , len, ry]) => {
    const w = new THREE.Mesh(planeGeo, wallM);
    w.scale.set(len, 3.9, 1);
    w.position.set(x, 1.95, -24);
    w.rotation.y = ry;
    scene.add(w);
  });
  const wb = new THREE.Mesh(planeGeo, wallM);
  wb.scale.set(52, 3.9, 1);
  wb.position.set(14, 1.95, -58);
  scene.add(wb);
  const wf = new THREE.Mesh(planeGeo, wallM);
  wf.scale.set(52, 3.9, 1);
  wf.position.set(14, 1.95, 10);
  wf.rotation.y = Math.PI;
  scene.add(wf);

  // ceiling light panels and red guide strips
  const lightM = track(new THREE.MeshBasicMaterial({ color: 0xffffff }));
  const redM = track(new THREE.MeshBasicMaterial({ color: RED }));
  for (let z = 6; z > -56; z -= 3.2) {
    for (const x of [-4, 0, 4]) box(scene, lightM, 1.8, 0.04, 0.35, x, 3.86, z);
  }
  for (let x = 6; x < 38; x += 3.2) for (const z of [-48, -54]) box(scene, lightM, 0.35, 0.04, 1.8, x, 3.86, z);
  box(scene, redM, 0.14, 0.04, 56, -1.1, 3.88, -26);
  box(scene, redM, 0.14, 0.04, 56, 1.1, 3.88, -26);
  box(scene, redM, 40, 0.04, 0.14, 20, 3.88, -48.1);
  box(scene, redM, 40, 0.04, 0.14, 20, 3.88, -49.9);

  /* ---------- product textures + instancing ---------- */
  const drawFront = (c: CanvasRenderingContext2D, p: (typeof PRODUCTS)[number], img?: HTMLImageElement) => {
    c.fillStyle = p.color;
    c.fillRect(0, 0, 256, 320);
    c.fillStyle = p.accent;
    c.fillRect(0, 0, 256, 38);
    c.fillStyle = p.color;
    c.font = `700 20px ${family}`;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("Chợ Ba Miền", 128, 20, 236);
    // ảnh sản phẩm thật
    c.save();
    c.beginPath();
    c.roundRect(14, 48, 228, 172, 14);
    c.clip();
    if (img && img.complete && img.naturalWidth) {
      const r = Math.max(228 / img.naturalWidth, 172 / img.naturalHeight);
      const w = img.naturalWidth * r;
      const h = img.naturalHeight * r;
      c.drawImage(img, 14 + (228 - w) / 2, 48 + (172 - h) / 2, w, h);
    } else {
      c.fillStyle = p.accent;
      c.globalAlpha = 0.5;
      c.fillRect(14, 48, 228, 172);
      c.globalAlpha = 1;
    }
    c.restore();
    c.fillStyle = p.ink;
    c.textBaseline = "middle";
    c.font = `800 34px ${family}`;
    const words = p.short.split(" ");
    words.forEach((w, i) => c.fillText(w, 128, 268 + (i - (words.length - 1) / 2) * 34, 236));
    c.fillStyle = p.accent;
    c.fillRect(0, 308, 256, 12);
  };
  const frontCanvases = PRODUCTS.map((p, i) => {
    const t = track(canvasTex(256, 320, (c) => drawFront(c, p)));
    const im = new Image();
    im.decoding = "async";
    im.onload = () => {
      const c = (t.image as HTMLCanvasElement).getContext("2d");
      if (c) {
        drawFront(c, p, im);
        t.needsUpdate = true;
      }
    };
    im.src = `/images/demos/cho-ba-mien/sp-${i}.webp`;
    return t;
  });
  const frontTex = frontCanvases;

  const instances: THREE.Matrix4[][] = PRODUCTS.map(() => []);
  const rnd = mulberry(51);
  const tmpM = new THREE.Matrix4();
  const tmpQ = new THREE.Quaternion();
  const tmpS = new THREE.Vector3(1, 1, 1);

  const stripGroup = (name: string, len: number, x: number, z: number, ry: number, types: number[], sign: string) => {
    const g = new THREE.Group();
    g.name = name;
    g.position.set(x, 0, z);
    g.rotation.y = ry;
    scene.add(g);
    const blueM = mat(BLUE);
    const whiteM = mat(0xf4f4f1);
    const backM = mat(0xe9e6dc);
    box(g, backM, len, 3.0, 0.04, 0, 1.5, -0.62);
    const levels = [0.15, 0.72, 1.29, 1.86, 2.43];
    levels.forEach((y) => {
      box(g, blueM, len, 0.05, 0.62, 0, y, -0.3);
      box(g, whiteM, len, 0.08, 0.02, 0, y + 0.065, 0.005);
    });
    for (let ux = -len / 2; ux <= len / 2 + 0.01; ux += 4) box(g, blueM, 0.1, 3.0, 0.66, ux, 1.5, -0.3);
    box(g, blueM, len, 0.5, 0.7, 0, 3.3, -0.3);
    box(g, redM, len, 0.04, 0.72, 0, 3.02, -0.3);
    const tex = signTex(sign, "#0b4ccf", "#ffffff", 1024, 150);
    for (let sx = -len / 2 + 5; sx < len / 2; sx += 10) {
      const s = signMesh(tex, 3.6, 0.5);
      s.position.set(sx, 3.3, 0.06);
      g.add(s);
    }
    // products
    g.updateMatrixWorld(true);
    for (const y of levels) {
      let cx = -len / 2 + 0.2;
      while (cx < len / 2 - 0.2) {
        const t = types[Math.floor(rnd() * types.length)];
        const run = 3 + Math.floor(rnd() * 5);
        const [w, h, d] = PRODUCTS[t].size.map((v) => v * 1.45) as [number, number, number];
        for (let i = 0; i < run && cx < len / 2 - 0.2; i++) {
          const local = new THREE.Matrix4().compose(new THREE.Vector3(cx + w / 2, y + 0.025 + h / 2, -0.06 - d / 2), tmpQ.identity(), new THREE.Vector3(w, h, d));
          instances[t].push(tmpM.multiplyMatrices(g.matrixWorld, local).clone());
          cx += w + 0.015;
        }
        cx += 0.02;
      }
    }
    return g;
  };

  stripGroup("A", 40, -2.2, -24, Math.PI / 2, [0, 1, 2, 3], "Đặc sản miền Bắc");
  stripGroup("B", 40, 2.2, -24, -Math.PI / 2, [4, 5, 6, 7], "Đặc sản miền Trung");
  stripGroup("C", 30, 15, -52.4, 0, [8, 9, 10, 11], "Nam & Tây Nguyên");
  stripGroup("D", 27, 16.5, -45.6, Math.PI, [11, 10, 9, 8], "Nam & Tây Nguyên");
  void tmpS;

  PRODUCTS.forEach((p, i) => {
    const side = mat(new THREE.Color(p.color).getHex());
    const front = track(new THREE.MeshLambertMaterial({ map: frontTex[i] }));
    // +x,-x,+y,-y,+z,-z
    const mats = [side, side, side, side, front, side];
    const im = new THREE.InstancedMesh(boxGeo, mats, Math.max(1, instances[i].length));
    instances[i].forEach((m, k) => im.setMatrixAt(k, m));
    im.count = instances[i].length;
    im.instanceMatrix.needsUpdate = true;
    scene.add(im);
    disposables.push({ dispose: () => im.dispose() });
  });

  /* end caps */
  const capM = mat(BLUE);
  [-2.2, 2.2].forEach((x) => {
    box(scene, capM, 1.1, 3.4, 0.9, x, 1.7, -44.4);
    box(scene, redM, 1.12, 0.12, 0.92, x, 2.6, -44.4);
  });

  /* ---------- checkout area ---------- */
  const podM = mat(0xf0f0ed);
  const screenM = track(new THREE.MeshBasicMaterial({ color: 0x1b3a8f }));
  [
    [-3.9, -2.6, "01"],
    [-1.9, -2.6, "02"],
    [3.6, -2.4, "03"],
  ].forEach(([x, z, n]) => {
    const g = new THREE.Group();
    g.position.set(x as number, 0, z as number);
    scene.add(g);
    box(g, podM, 0.9, 0.95, 0.6, 0, 0.475, 0);
    box(g, mat(0xc9ccd2), 0.8, 0.04, 0.5, 0, 0.97, 0);
    const scr = box(g, screenM, 0.5, 0.36, 0.05, 0, 1.3, -0.1);
    scr.rotation.x = -0.25;
    box(g, mat(0x222831), 0.05, 0.35, 0.05, 0, 1.12, -0.12);
    const label = signMesh(signTex(n as string, "#0b4ccf", "#ffffff", 128, 128), 0.6, 0.6);
    label.position.set(0, 2.55, 0);
    g.add(label);
    box(g, mat(0x9aa3b5), 0.02, 0.9, 0.02, 0, 3.1, 0);
  });
  const selfSign = signMesh(signTex("THANH TOÁN TỰ ĐỘNG", "#0b4ccf", "#ffffff", 1024, 200, "Quét mã · Cân · Thanh toán"), 3.6, 0.7);
  selfSign.position.set(5.2, 2.9, -6.8);
  scene.add(selfSign);

  // pallet pyramid + low price sign
  const pallet = new THREE.Group();
  pallet.position.set(3.4, 0, 1.4);
  scene.add(pallet);
  box(pallet, mat(0xf4c20d), 1.5, 0.18, 1.5, 0, 0.09, 0);
  box(pallet, mat(BLUE), 1.4, 0.14, 1.4, 0, 0.25, 0);
  const redBox = mat(0xc62828);
  const redLite = mat(0xe14b3f);
  for (let lvl = 0; lvl < 3; lvl++) {
    const n = 4 - lvl;
    for (let a = 0; a < n; a++)
      for (let b = 0; b < n; b++) box(pallet, (a + b + lvl) % 2 ? redBox : redLite, 0.3, 0.26, 0.3, (a - (n - 1) / 2) * 0.33, 0.45 + lvl * 0.27, (b - (n - 1) / 2) * 0.33);
  }
  const lowSign = signMesh(signTex("GIÁ TỐT", "#c62828", "#ffffff", 512, 320, "MỖI NGÀY"), 1.9, 1.2);
  lowSign.position.set(3.4, 2.2, 0.8);
  lowSign.rotation.y = -0.25;
  scene.add(lowSign);
  box(scene, mat(0x333333), 0.05, 1.6, 0.05, 3.4, 1.3, 0.8);

  /* hanging banners */
  const banner = (text: string, sub: string | undefined, x: number, y: number, z: number, ry: number) => {
    const s = signMesh(signTex(text, "#0b4ccf", "#ffffff", 1024, 200, sub), 3.9, 0.76);
    s.position.set(x, y, z);
    s.rotation.y = ry;
    scene.add(s);
    const rope = mat(0x7f8798);
    const dx = Math.cos(ry) * 1.8;
    const dz = -Math.sin(ry) * 1.8;
    [-1, 1].forEach((k) => box(scene, rope, 0.02, 3.9 - y, 0.02, x + dx * k, (3.9 + y) / 2, z + dz * k));
  };
  banner("ĐẶC SẢN MỖI NGÀY", "Bắc · Trung · Nam", 0, 3.1, -12, 0);
  banner("QUÀ QUÊ ĐÓNG GÓI SẴN", undefined, 0, 3.1, -26, 0);
  banner("RẼ PHẢI: MIỀN NAM & TÂY NGUYÊN", undefined, 0, 3.1, -40, 0);
  banner("CÀ PHÊ · GẠO · NƯỚC DỪA", undefined, 8, 3.1, -49, -Math.PI / 2);
  banner("KHÔ · MẮM · ĐẶC SẢN SÔNG NƯỚC", undefined, 20, 3.1, -49, -Math.PI / 2);

  /* ---------- hotspots ---------- */
  const dotTex = track(
    canvasTex(128, 128, (c) => {
      c.fillStyle = "rgba(255,255,255,.96)";
      c.beginPath();
      c.arc(64, 64, 54, 0, Math.PI * 2);
      c.fill();
      c.strokeStyle = "#0b4ccf";
      c.lineWidth = 8;
      c.beginPath();
      c.arc(64, 64, 40, 0, Math.PI * 2);
      c.stroke();
      c.fillStyle = "#0b4ccf";
      c.fillRect(58, 42, 12, 44);
      c.fillRect(42, 58, 44, 12);
    }),
  );
  const dotMat = track(new THREE.SpriteMaterial({ map: dotTex, depthTest: false, transparent: true }));
  const dots = HOTSPOTS.map((h) => {
    const s = new THREE.Sprite(dotMat);
    s.position.set(...h.pos);
    s.scale.setScalar(0.22);
    s.renderOrder = 10;
    scene.add(s);
    return s;
  });

  /* ---------- cart in front of the camera ---------- */
  const cart = new THREE.Group();
  const wire = track(new THREE.LineBasicMaterial({ color: 0xf3f6fb }));
  const pts: number[] = [];
  const W = 0.9, H = 0.3, D = 0.62;
  const line = (a: number[], b: number[]) => pts.push(...a, ...b);
  const corners = [
    [-W / 2, 0, -D / 2],
    [W / 2, 0, -D / 2],
    [W / 2, 0, D / 2],
    [-W / 2, 0, D / 2],
  ];
  for (let i = 0; i < 4; i++) {
    const a = corners[i];
    const b = corners[(i + 1) % 4];
    line(a, b);
    line([a[0], H, a[2]], [b[0], H, b[2]]);
    line(a, [a[0], H, a[2]]);
  }
  for (let i = 1; i < 9; i++) {
    const x = -W / 2 + (W * i) / 9;
    line([x, 0, -D / 2], [x, 0, D / 2]);
    line([x, 0, D / 2], [x, H, D / 2]);
  }
  for (let j = 1; j < 6; j++) {
    const z = -D / 2 + (D * j) / 6;
    line([-W / 2, 0, z], [W / 2, 0, z]);
  }
  for (let k = 1; k < 3; k++) {
    const y = (H * k) / 3;
    line([-W / 2, y, D / 2], [W / 2, y, D / 2]);
    line([-W / 2, y, D / 2], [-W / 2, y, -D / 2]);
    line([W / 2, y, D / 2], [W / 2, y, -D / 2]);
  }
  const cg = track(new THREE.BufferGeometry());
  cg.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  const cartLines = new THREE.LineSegments(cg, wire);
  cart.add(cartLines);
  const cartBase = new THREE.Mesh(planeGeo, track(new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35, side: THREE.DoubleSide })));
  cartBase.rotation.x = -Math.PI / 2;
  cartBase.scale.set(W, D, 1);
  cart.add(cartBase);
  const rimM = track(new THREE.MeshBasicMaterial({ color: 0xffffff }));
  box(cart, rimM, W, 0.03, 0.03, 0, H, D / 2);
  box(cart, rimM, W, 0.03, 0.03, 0, H, -D / 2);
  box(cart, rimM, 0.03, 0.03, D, -W / 2, H, 0);
  box(cart, rimM, 0.03, 0.03, D, W / 2, H, 0);
  box(cart, rimM, 0.03, 0.03, D, 0, H, 0).scale.set(0.03, 0.03, D);
  cart.position.set(0, -0.72, -1.15);
  cart.scale.setScalar(0.85);
  cart.rotation.x = 0.12;
  camera.add(cart);

  /* ---------- path + loop ---------- */
  const curve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.2, 1.55, 6.2),
      new THREE.Vector3(0, 1.55, -8),
      new THREE.Vector3(0, 1.55, -26),
      new THREE.Vector3(0, 1.55, -42),
      new THREE.Vector3(0.8, 1.55, -47),
      new THREE.Vector3(5, 1.55, -49),
      new THREE.Vector3(18, 1.55, -49),
      new THREE.Vector3(31, 1.55, -49),
    ],
    false,
    "centripetal",
  );
  const sample = new THREE.Vector3();
  const ahead = new THREE.Vector3();
  const fwd = new THREE.Vector3();
  const tmp = new THREE.Vector3();

  let target = 0;
  let cur = 0;
  const look = { x: 0, y: 0, cx: 0, cy: 0 };
  let active = false;
  let raf = 0;
  let hot: number | null = null;
  let zone = "";
  let frame = 0;
  let last = performance.now();

  const place = () => {
    const t = Math.min(Math.max(cur, 0), 1);
    curve.getPointAt(t, sample);
    curve.getPointAt(Math.min(t + 0.03, 1), ahead);
    if (t > 0.97) {
      curve.getPointAt(0.94, tmp);
      ahead.copy(sample).addScaledVector(sample.clone().sub(tmp), 6);
    }
    camera.position.copy(sample);
    camera.position.y += Math.sin(cur * 520) * 0.012;
    camera.lookAt(ahead.x, ahead.y - 0.08, ahead.z);
    camera.rotateY(-look.cx * 0.36);
    camera.rotateX(-look.cy * 0.16);
  };

  const detect = () => {
    camera.getWorldDirection(fwd);
    let best = -1;
    let bestD = 1e9;
    HOTSPOTS.forEach((h, i) => {
      tmp.set(...h.pos).sub(camera.position);
      const d = tmp.length();
      if (d > 8 || d < 1.2) return;
      tmp.normalize();
      if (tmp.dot(fwd) < 0.78) return;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    const n = best < 0 ? null : best;
    if (n !== hot) {
      hot = n;
      opts.onHot(n);
    }
    const p = camera.position;
    const z = p.z > -3.5 ? "Khu thanh toán tự động" : p.z > -46 && p.x < 3 ? "Lối đặc sản Bắc · Trung" : "Lối Nam & Tây Nguyên";
    if (z !== zone) {
      zone = z;
      opts.onZone(z);
    }
  };

  const draw = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    cur += (target - cur) * (reduced ? 1 : 1 - Math.pow(0.0006, dt));
    look.cx += (look.x - look.cx) * 0.08;
    look.cy += (look.y - look.cy) * 0.08;
    place();
    const pulse = 1 + Math.sin(now / 380) * 0.12;
    dots.forEach((d, i) => d.scale.setScalar(0.22 * pulse * (i === hot ? 1.35 : 1)));
    if (frame++ % 4 === 0) detect();
    renderer.render(scene, camera);
  };
  const loop = (now: number) => {
    raf = requestAnimationFrame(loop);
    draw(now);
  };

  const api: StoreApi = {
    setProgress(p) {
      target = p;
      if (!active) api.renderOnce();
    },
    setLook(x, y) {
      look.x = x;
      look.y = y;
    },
    resize() {
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w / h < 0.9 ? 80 : w / h < 1.3 ? 70 : 60;
      camera.updateProjectionMatrix();
      if (!active) api.renderOnce();
    },
    setActive(v) {
      if (v === active) return;
      active = v;
      cancelAnimationFrame(raf);
      if (v) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    },
    renderOnce() {
      cur = target;
      draw(performance.now());
      detect();
    },
    dispose() {
      cancelAnimationFrame(raf);
      active = false;
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
  return api;
}
