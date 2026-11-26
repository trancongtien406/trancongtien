import { createRequire } from "node:module";
const require = createRequire("/Users/mac/mern/works/hancitywebsite/package.json");
const { chromium } = require("playwright");
const [w, h, tag] = [Number(process.argv[2] || 1440), Number(process.argv[3] || 900), process.argv[4] || "d"];
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: w, height: h }, hasTouch: w < 800, isMobile: w < 800 })).newPage();
await p.goto("http://localhost:3100/demos/bar-mai-thuong", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
const go = async (sel, off = 0) => { await p.evaluate(([s, o]) => { const e = document.querySelector(s); window.scrollTo(0, e.getBoundingClientRect().top + scrollY + o); }, [sel, off]); await p.waitForTimeout(1500); };
const S = [["1hero", "#top", 0], ["2band", "#nhip", -60], ["3intro", "section[aria-label='Giới thiệu Tầng Mây']", 0], ["4happy", "#happy-hour", 0], ["5sig", "section[aria-label='Ba ly nên thử trước']", 0], ["6menu", "#thuc-don", 0], ["7board", "section[aria-label='Bảng pha chế tại quầy']", 0], ["8zones", "#khong-gian", 60], ["9night", "#nhip-dem", 0], ["10rhythm", "#nhip-tuan", 0], ["11events", "#su-kien", 0], ["12reserve", "#dat-ban", 60], ["13rules", "#quy-dinh", 0], ["14faq", "#hoi-dap", 0], ["15contact", "#lien-he", -80]];
for (const [n, sel, off] of S) { await go(sel, off); await p.screenshot({ path: `screenshots/${tag}-${n}.png` }); }
await b.close();
