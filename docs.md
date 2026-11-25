# Product Engineering Studio — Product & Technical Specification

> Trạng thái: Chốt triển khai  
> Cập nhật: 13/08/2026  
> Sản phẩm: `trancongtien.com`

## 1. Tầm nhìn

Xây dựng một sales engine giúp chuyển năng lực phát triển phần mềm thành quy trình tìm kiếm, tư vấn, ký kết và chăm sóc khách hàng có thể đo lường:

```text
Portfolio → Solutions → Partner → Lead → Consultation → Proposal
→ Contract → Payment → Development → Commission → Referral
```

Website không chỉ là portfolio cá nhân. Đây là điểm vào chung cho khách organic, CTV, freelancer, agency và khách hàng cũ.

Định vị:

> Product Engineering Studio — biến ý tưởng và vấn đề vận hành thành sản phẩm số có thể chạy production.

Nguyên tắc:

1. Bán business outcome trước, technology sau.
2. Partner bán cuộc hẹn và giải pháp, không tự estimate technical scope.
3. Mọi lead đều được đăng ký và có attribution rõ ràng.
4. Commission dựa trên tiền thực nhận.
5. Chạy thủ công trước; chỉ tự động hóa quy trình đã chứng minh hiệu quả.

## 2. Mục tiêu sản phẩm

### Website marketing

- Tạo niềm tin bằng sản phẩm thật, case study, quy trình và năng lực engineering.
- Giải thích dịch vụ bằng vấn đề và kết quả kinh doanh.
- Cung cấp URL theo ngành để partner gửi trực tiếp cho khách.
- Dẫn mọi trang quan trọng về một CTA: **Discuss Your Project**.

### CRM nội bộ

- Thu lead về một pipeline duy nhất.
- Theo dõi nguồn, partner, lần liên hệ gần nhất và follow-up tiếp theo.
- Lưu lịch sử thay đổi để tránh thất thoát hoặc tranh chấp lead.
- Theo dõi proposal, contract, payment và commission theo tiền thực nhận.

### Partner program

- Referral Partner: giới thiệu khách.
- Sales Partner: tìm khách, qualification và follow-up.
- Agency Partner: outsource, white-label hoặc revenue sharing.

Partner Platform chỉ mở sau khi pilot 3–5 partner tạo lead đều đặn.

## 3. Phạm vi triển khai

### Release 1 — Foundation và conversion

- Giữ và nâng cấp CMS hiện tại.
- Redesign Home theo positioning Product Engineering Studio.
- Chuẩn hóa Services, Work/Case Studies, About, Engineering và Contact.
- Một consultation form duy nhất với attribution.
- PostgreSQL production, Cloudflare R2, SMTP/Nodemailer và Node/PM2 trên VPS.

### Release 2 — Solutions và CRM

- Solution landing pages cho Spa, Real Estate và Construction.
- Lead pipeline: `NEW → CONTACTED → QUALIFIED → MEETING → PROPOSAL → NEGOTIATION → WON/LOST`.
- Activity timeline, notes, follow-up, lost reason và source.
- Partner record, referral code và first-party attribution cookie.

### Release 3 — Commercial operations

- Proposal, contract, payment và commission ledger.
- Commission chỉ được ghi nhận theo payment đã nhận.
- Sales resources và policy quản lý trong admin.

### Release 4 — Partner Platform

Chỉ thực hiện sau pilot:

- Partner account và phân quyền.
- Partner tự đăng ký lead.
- Theo dõi trạng thái được phép công khai.
- Sales kit, commission và notification.

### Ngoài phạm vi hiện tại

- Microservices hoặc NestJS backend riêng.
- Mobile app cho partner.
- Redis/realtime dashboard.
- Automated payout hoặc payment gateway.
- AI lead scoring.
- Customer portal hoàn chỉnh.

## 4. Information architecture

```text
Home
├── Services
│   ├── Website Development
│   ├── Mobile Application
│   ├── Business Software
│   └── AI & Automation
├── Solutions
│   ├── Spa & Beauty
│   ├── Real Estate
│   └── Construction
├── Work / Case Studies
├── Engineering
├── Process
├── About
├── Blog / Resources
└── Contact / Consultation
```

Admin:

```text
Dashboard
├── Leads
├── Partners
├── Solutions
├── Case Studies / Projects
├── Services
├── Blog / Resources
├── Payments & Commissions
├── Media
├── Notifications
└── Settings
```

## 5. Page specifications

### Home

Hero:

> We build digital products that solve real business problems.

Supporting copy:

> Websites, mobile apps, business systems and AI solutions for startups and growing businesses.

CTA chính: `Discuss Your Project`  
CTA phụ: `View Our Work`

Thứ tự nội dung:

1. Hero và positioning.
2. Trust layer — chỉ dùng bằng chứng kiểm chứng được.
3. Bốn nhóm dịch vụ.
4. Problems/outcomes điển hình.
5. Case studies nổi bật.
6. Ba solution theo ngành.
7. Quy trình Discovery → Design → Development → Launch.
8. Engineering credibility.
9. CTA consultation.

### Service page

Mỗi service trả lời:

- Khách phù hợp là ai?
- Vấn đề nào được giải quyết?
- Deliverables là gì?
- Quy trình và thời gian dự kiến?
- Case study liên quan?
- Bước tiếp theo?

Không đưa danh sách framework lên trước business outcome.

### Solution page

Route: `/solutions/[slug]`.

Template:

1. Hero theo ngành.
2. Business problems.
3. Proposed solution.
4. Capabilities/features.
5. Product preview.
6. Recommended package.
7. Process.
8. Related case study.
9. CTA có sẵn `industry` và `solution` khi mở form.

Concept project được trình bày như dự án portfolio bình thường (web hoặc app);
không gắn nhãn disclaimer trên trang công khai.

### Case study

1. Overview.
2. Problem.
3. Solution.
4. Key features.
5. User experience/screenshots.
6. Architecture.
7. Engineering challenges.
8. Result — chỉ dùng metric thật.
9. CTA cho dự án tương tự.

### Consultation

Form fields:

- Name — bắt buộc.
- Company.
- Email — bắt buộc.
- Phone — bắt buộc.
- Industry.
- Project type.
- Project description — bắt buộc.
- Estimated budget.
- Expected timeline.
- Referral/partner code — tự điền từ attribution nhưng cho phép nhập tay.
- Consent với privacy policy — bắt buộc.

Khi submit thành công:

1. Validate trên server.
2. Tạo Lead và LeadActivity.
3. Gắn partner/referral nếu code hợp lệ.
4. Tạo notification trong admin.
5. Gửi email admin và email xác nhận khách bằng Nodemailer.
6. Phát event analytics `consultation_submitted`.
7. Không làm thất bại request chỉ vì SMTP tạm lỗi.

## 6. Lead và sales rules

### Lead pipeline

```text
NEW
→ CONTACTED
→ QUALIFIED
→ MEETING
→ PROPOSAL
→ NEGOTIATION
→ WON
  hoặc LOST
```

Lead fields:

- Public lead number dạng `LEAD-2026-XXXXX`.
- Customer, company, phone, email.
- Industry và project type.
- Description, budget và timeline.
- Source và landing page.
- Partner/referral attribution.
- Status, priority và estimated value.
- Last contact, next follow-up và lost reason.
- Created/updated timestamps.

Mỗi cập nhật quan trọng tạo `LeadActivity`; không ghi đè lịch sử.

### Qualification

Tối thiểu phải biết:

- Business problem.
- Current process/solution.
- Expected product.
- Timeline.
- Budget range.
- Decision maker.

### Lead ownership

- Mặc định partner sở hữu lead 30 ngày.
- Ownership được gia hạn khi có follow-up hợp lệ.
- Admin có quyền release/reassign và phải ghi activity.
- Email hoặc số điện thoại trùng cần được cảnh báo trước khi tạo lead mới.

### Proposal và payment

Proposal gồm executive summary, current problem, proposed solution, scope, deliverables, timeline, technology, responsibilities, price, payment schedule, maintenance và out-of-scope.

Không bắt đầu development trước deposit. Commission được tính theo từng payment đã nhận, không theo tổng giá trị hợp đồng.

## 7. Technical architecture

### Chốt tech stack

| Layer | Technology |
|---|---|
| Application | Next.js 16 App Router |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS 4 |
| Validation | Zod 4 |
| ORM | Prisma 7 |
| Database | PostgreSQL |
| Object storage | Cloudflare R2, S3-compatible API |
| Email | Nodemailer qua SMTP |
| Analytics | PostHog, có thể tắt bằng env |
| Monitoring | Sentry hoặc structured application logs |
| Runtime | Node.js |
| Deployment | Node.js + PM2 trên VPS, reverse proxy Nginx/Caddy |
| CI/CD | GitHub Actions hoặc deploy script có migration gate |

Kiến trúc là modular monolith. Không tách service cho đến khi có nhu cầu scale hoặc ownership độc lập rõ ràng.

### Next.js conventions

- Pages/layouts là Server Components mặc định.
- Chỉ đánh dấu `use client` tại boundary cần state, event hoặc browser API.
- Mutation qua Server Actions hoặc Route Handlers; mọi mutation tự kiểm tra auth/role.
- Marketing content có thể cache/revalidate.
- Lead, payment, commission và admin data luôn dynamic, không cache.
- Dynamic route params của Next.js 16 phải được `await`.
- App chạy Node.js runtime vì Prisma, Nodemailer và R2 SDK.

### Modules

```text
app/                 Routes, layouts, route handlers
components/          Shared presentational components
features/            Domain UI and client interactions
lib/auth/            Session and authorization
lib/storage/         R2/local storage adapter
lib/email/           SMTP transport and templates
lib/leads/           Lead validation and business rules
lib/partners/        Referral attribution and ownership
lib/analytics/       Server/client event adapter
prisma/              Schema, migrations and seed
```

## 8. Data model

Core content models tiếp tục được giữ: User, Post, Category, Project, Service, Resource, Testimonial, ProcessStep, Media, SiteSetting, Notification, PageContent, Faq, CoreValue và JourneyItem.

Models bổ sung:

### Solution

- slug, title, industry, excerpt.
- heroTitle, heroDescription.
- problems, capabilities, packageItems dưới dạng JSON string ở release đầu.
- cover/mockup URL, status và sortOrder.

### Partner

- code unique, name, company, email, phone.
- type: REFERRAL, SALES, AGENCY.
- status: APPLIED, APPROVED, SUSPENDED, REJECTED.
- commission rate và ownership days.

### Lead

- leadNumber unique.
- contact và project data.
- pipeline status, source, priority.
- partner relation và referral code snapshot.
- commercial/follow-up fields.
- activities, proposals và ownership timestamps.

### LeadActivity

- Lead, actor, type, title, body, metadata và timestamp.

### Payment / Commission

- Payment thuộc lead/deal, amount, status, receivedAt và reference.
- Commission thuộc partner + payment để đảm bảo tính trên tiền thực nhận.
- Amount dùng Decimal, không dùng floating point.

Booking cũ được migrate thành Lead; route cũ có thể giữ compatibility trong một release.

## 9. Cloudflare R2 storage

R2 dùng S3-compatible API và private write access.

Environment variables:

```text
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=
R2_PUBLIC_URL=https://media.trancongtien.com
```

Quy tắc upload:

- Chỉ admin/automation được upload.
- Giới hạn 10 MB mặc định.
- Kiểm tra magic bytes cho image, không chỉ tin MIME từ client.
- Object key: `media/YYYY/MM/<uuid>.<ext>`.
- Cache immutable cho object có key versioned.
- Lưu `storageKey`, URL, MIME, size, width/height nếu có.
- Xóa database record và object phải là hai thao tác có xử lý lỗi rõ ràng.
- Local filesystem chỉ là fallback development, không dùng production.

## 10. Nodemailer/SMTP

Environment variables:

```text
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
SMTP_FROM="Tran Cong Tien <hello@trancongtien.com>"
NOTIFY_EMAIL=
```

Yêu cầu:

- Reuse singleton transporter.
- `secure=true` cho port 465; false cho STARTTLS/587.
- Timeout kết nối/gửi hợp lý.
- Escape dữ liệu người dùng trong HTML template.
- Log lỗi nhưng không log password hoặc full customer message.
- Email không chặn response consultation sau khi lead đã được lưu.
- SPF, DKIM và DMARC phải được cấu hình trên domain trước production.

## 11. Referral attribution

Referral URL:

```text
https://trancongtien.com/solutions/spa?ref=CTV001
```

Flow:

1. Middleware hoặc client boundary đọc `ref`.
2. Server xác nhận partner đang APPROVED.
3. Lưu first-party cookie `tct_ref` trong 30 ngày.
4. Lưu landing path và UTM parameters.
5. Consultation endpoint resolve code lại trên server.
6. Lead lưu partner relation và snapshot referral code.

Không tin hidden input từ client nếu chưa validate lại.

## 12. Security

- `SESSION_SECRET` bắt buộc ở production; app không được fallback sang dev secret.
- Cookie session: HttpOnly, Secure production, SameSite=Lax và expiry rõ ràng.
- Rate-limit login, consultation và upload tại reverse proxy hoặc application layer.
- Zod validation trên mọi public/admin mutation.
- Authorization nằm trong mỗi Server Action/Route Handler, không chỉ trong layout.
- CSP, HSTS, MIME sniff protection và referrer policy tiếp tục được duy trì.
- Upload allowlist, magic-byte validation và safe object keys.
- Không trả internal notes, margin hoặc commission cho public/partner API.
- Audit activity cho status, ownership, payment và commission.
- PostgreSQL backup hằng ngày; kiểm thử restore định kỳ.

## 13. Deployment trên VPS

Production topology:

```text
Internet
  ↓
Cloudflare DNS/WAF
  ↓
Nginx hoặc Caddy :443
  ↓
Next.js standalone container :3000
  ↓
PostgreSQL private network

Next.js → Cloudflare R2
Next.js → SMTP provider
```

Deploy trên VPS (Node + PM2, Postgres host):

- Process `web`: `npm run build` rồi `pm2 start` (`next start`), healthcheck `/api/health`.
- Postgres chạy trên host (user `postgres`); không chạy DB trong container.
- Nginx/Caddy reverse proxy trên host → `127.0.0.1:3342`.

Deploy procedure:

1. Rsync/git pull source lên VPS (`scripts/deploy-vps.sh`).
2. Backup database.
3. Chạy `npx prisma migrate deploy`.
4. `npm run build` và `pm2 restart`.
5. Healthcheck `/api/health`.
6. Smoke test home, consultation, login, admin leads và R2 upload.
7. Rollback release trước nếu healthcheck thất bại; migration phá vỡ tương thích phải dùng expand/contract.

## 14. Analytics funnel

Events:

```text
page_view
solution_viewed
case_study_viewed
consultation_cta_clicked
consultation_started
consultation_submitted
meeting_scheduled
proposal_sent
lead_won
```

Không gửi phone, email hoặc project description vào analytics.

KPI:

- Visitors → solution/case study views.
- CTA click rate.
- Form start → submit conversion.
- Lead → qualified → meeting → proposal → won.
- Revenue và commission theo source/partner.

## 15. UX và accessibility acceptance criteria

- Responsive từ 360 px đến màn hình desktop rộng.
- Semantic landmarks, skip link và heading hierarchy đúng.
- Visible focus ring và keyboard navigation.
- Form có label, inline validation, pending/success/error state.
- Admin list có loading, empty và failure states.
- Không dùng số liệu/testimonial giả.
- Nội dung chính giới hạn độ rộng đọc; tiêu đề dùng text wrapping cân bằng.
- Motion tôn trọng `prefers-reduced-motion`.
- Mọi ảnh có alt phù hợp; ảnh trang trí dùng alt rỗng.

## 16. Definition of done

Một release chỉ hoàn thành khi:

- Prisma migration chạy được trên database sạch và database có dữ liệu cũ.
- Seed tạo được admin, settings và content mẫu cần thiết.
- `npm run lint` thành công.
- `npm run build` thành công.
- Consultation tạo lead, attribution và email background đúng.
- Admin cập nhật pipeline và tạo activity đúng.
- Upload R2 hoạt động; local fallback chỉ dùng development.
- PM2 process và healthcheck `/api/health` chạy được.
- Không commit secret, database dump hoặc user upload.
- README và `.env.example` đủ để một VPS mới triển khai được.

## 17. Execution plan

### Ngày 1 — Foundation

- Chốt specification này.
- PostgreSQL schema/migration.
- Environment validation.
- R2, SMTP và Node/PM2 baseline trên VPS.

### Ngày 2 — Website conversion

- Home, Services, Work và unified CTA.
- Consultation form hoàn chỉnh.
- SEO metadata và conversion events.

### Ngày 3 — Solutions và case studies

- Solution model/template.
- Ba solution pages.
- Case study structure và content management.

### Ngày 4 — CRM và partner attribution

- Lead pipeline, detail, notes và follow-up.
- Partner records, referral cookie và ownership.

### Ngày 5 — Commercial records

- Proposal/payment/commission baseline.
- Dashboard KPI và export.

### Ngày 6 — Hardening

- Security, rate limit, empty/error/loading states.
- Database backup/restore và deployment scripts.

### Ngày 7 — Verification và pilot readiness

- Lint/build/smoke test.
- Seed production-safe starter content.
- Chạy thử end-to-end với 3–5 partner codes.
- Ghi nhận những phần được hoãn sang Partner Platform.

## 18. Thứ tự ưu tiên khi có xung đột

1. Không mất lead hoặc attribution.
2. Security và dữ liệu đúng.
3. Consultation conversion.
4. Nội dung tạo niềm tin.
5. Vận hành admin nhanh, rõ ràng.
6. Automation và tính năng nâng cao.

Đích đến không phải có nhiều CTV; đích đến là một quy trình mà partner có thể tìm đúng khách, gửi đúng solution, đăng ký lead và đưa khách tới meeting mà không cần tự cam kết technical scope.
