import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
const [w, h, tag] = [Number(process.argv[2] || 1440), Number(process.argv[3] || 900), process.argv[4] || "d"];
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: w, height: h }, hasTouch: w < 800, isMobile: w < 800 })).newPage();
await p.goto("http://localhost:3100/demos/tiem-banh", { waitUntil: "networkidle" });
await p.waitForTimeout(2200);
const go = async (sel, off = 0) => { await p.evaluate(([s, o]) => { const e = document.querySelector(s); window.scrollTo(0, e.getBoundingClientRect().top + scrollY + o); }, [sel, off]); await p.waitForTimeout(1400); };
const S = [["1hero", "#dau-trang", 0], ["2menu", "#tu-banh", 0], ["3shelf", "#tu-kinh", 0], ["4oven", "#gio-ra-lo", 0], ["5slice", "#bang-gia", 120], ["6build", "#dung-banh", 0], ["7candle", "#thiep-chu", 0], ["8season", "#mua-dip", 0], ["9process", "#dat-banh", 0], ["10care", "#giao-nhan", 0], ["11story", "#mot-ngay", 0], ["12faq", "#hoi-dap", 0], ["13foot", "footer", -300]];
for (const [n, sel, off] of S) { await go(sel, off); await p.screenshot({ path: `screenshots/${tag}-${n}.png` }); }
await b.close();
