// chụp theo từng section (cuộn thật) để kích hoạt hiệu ứng cuộn
import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:3100";
const W = +(process.argv[2]||1440), H = +(process.argv[3]||900);
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const c = await b.newContext({ viewport:{width:W,height:H}, hasTouch: W<500, isMobile: W<500 });
const p = await c.newPage();
await p.goto(BASE+"/demos/pet-vui",{waitUntil:"networkidle"}); await p.waitForTimeout(2000);
const total = await p.evaluate(()=>document.documentElement.scrollHeight);
let i=0;
for (let y=0;y<total;y+=H*0.9){ await p.evaluate(v=>window.scrollTo(0,v),y); await p.waitForTimeout(900); await p.screenshot({path:`tests/showroom/pet-vui/screenshots/s${W}-${String(i++).padStart(2,"0")}.png`}); }
console.log("shots",i,"total",total);
await b.close();
