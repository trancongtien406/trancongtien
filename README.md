# trancongtien.com

Website, CMS và sales CRM cho Product Engineering Studio.

## Stack

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4
- Prisma 7 và PostgreSQL trên host (không dùng Docker)
- Cloudflare R2 cho media production
- Nodemailer qua SMTP
- PM2 để chạy process trên VPS

Đặc tả sản phẩm và kiến trúc nằm trong [docs.md](./docs.md).

## Local development

Yêu cầu Node.js 22+, npm và PostgreSQL đã chạy sẵn trên máy.

```bash
cp .env.example .env
# chỉnh DATABASE_URL, ví dụ:
# DATABASE_URL=postgresql://mac:@localhost:5432/trancongtien?schema=public&connection_limit=10
createdb trancongtien   # nếu chưa có database
npm install
npx prisma migrate deploy
npm run seed
npm run dev
```

Các biến tối thiểu:

```text
DATABASE_URL=postgresql://...
SESSION_SECRET=...
ADMIN_EMAIL=...
ADMIN_PASSWORD=...
```

Không cấu hình R2 ở development thì upload được lưu trong `uploads/`. Production bắt buộc cấu hình đủ `R2_*`. SMTP/R2/PostHog có thể import sau.

Pilot partner codes sau seed: `CTV001`, `CTV002`, `AGY001`.

Cổng đối tác (không phải admin): `/doi-tac` — đăng nhập bằng mã + email đã duyệt.

Track link mẫu: `/solutions/spa?ref=CTV001` hoặc link ngắn `/r/CTV001`.

## AI Estimator

Conversational product consultant: icon chatbot góc phải trên mọi trang (share `/e/{code}`).

- Giá tính server-side (Pricing Engine + Development Units) — LLM không set giá
- Catalog: Website, Mobile, Business Software, SaaS, Marketplace, AI
- Admin: `/admin/estimator` (products/features/pricing/sessions), sales kit `/admin/sales-resources`
- Smoke: `npm run smoke:estimator`
- LLM tuỳ chọn: Settings hoặc `LLM_API_KEY` / `LLM_MODEL`

## PayOS

Thêm vào `.env`:

```text
PAYOS_CLIENT_ID=
PAYOS_API_KEY=
PAYOS_CHECKSUM_KEY=
```

Webhook trên my.payos.vn: `https://your-domain/api/webhooks/payos`.  
Admin tạo link tại **Thanh toán & hoa hồng**; khi webhook xác nhận, payment → Đã nhận và ghi hoa hồng (nếu có đối tác).

## Quality checks

```bash
npm run lint
npm test
npm run smoke
npm run build
```

`npm test` chạy unit test (validation, referral, hoa hồng).  
`npm run smoke` chạy thật trên Postgres: lead → đề xuất → thanh toán → hoa hồng.

## Deploy VPS (Node + PM2, không Docker)

Postgres chạy sẵn trên VPS (`postgres` / mật khẩu trống hoặc `123456`). Nginx proxy `trancongtien.com` → `127.0.0.1:3342`.

```bash
# Từ máy local (cần SSH vào VPS được)
export SSHPASS='your-ssh-password'   # hoặc dùng SSH key
chmod +x scripts/deploy-vps.sh
./scripts/deploy-vps.sh
```

Script sẽ: rsync code → tạo DB `trancongtien` nếu thiếu → ghi/cập nhật `.env.production` → `npm ci` → `prisma migrate deploy` → `npm run build` → `pm2 restart`.

Sau deploy (tuỳ chọn seed lần đầu):

```bash
ssh tiendev@VPS_IP 'cd ~/trancongtien && set -a && source .env.production && set +a && npm run seed'
```

Nginx mẫu: `docs/nginx.conf.example`.

## Production checklist

- PostgreSQL backup hằng ngày; không public port nếu không cần.
- R2 custom domain và CORS đúng.
- SMTP domain có SPF, DKIM và DMARC.
- `SESSION_SECRET`, `ADMIN_PASSWORD`, R2 và SMTP secret không commit.
- Reverse proxy rate-limit login/form public.
- Smoke test Home, Solutions, Contact, Admin Leads và upload sau deploy.

## Database migration note

`prisma/migrations-sqlite/` lưu lịch sử schema SQLite cũ để tham chiếu. Production PostgreSQL bắt đầu tại migration `sales_engine_foundation`.
