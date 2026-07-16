# ChatGPT scheduled blog automation

This repo runs two separate apps from the same codebase:

- Website app: Next.js, exposed at `https://trancongtien.com`, local port `3342`.
- MCP app: ChatGPT automation server, exposed at `https://mcp.trancongtien.com`, local port `3343`.

ChatGPT can research and draft the post, generate a cover image, then call the MCP server to upload the image and create a draft in `trancongtien.com`.

The MCP server does not need an OpenAI API key. The writing and image generation happen inside ChatGPT. The server only receives the final content/image and sends it to the website API.

## Environment

Set these on the VPS:

```bash
SITE_ORIGIN=https://trancongtien.com
CONTENT_AUTOMATION_TOKEN=replace-with-long-random-internal-token
WEB_PORT=3342
MCP_ACCESS_TOKEN=replace-with-different-long-random-external-token
MCP_PORT=3343
MCP_ALLOWED_IMAGE_HOSTS=
```

Use different long random values for `CONTENT_AUTOMATION_TOKEN` and `MCP_ACCESS_TOKEN`.

`CONTENT_AUTOMATION_TOKEN` must also be set for the Next.js website process, because `/api/admin/posts` and `/api/admin/upload` verify it.

## PM2

Start or restart both processes:

```bash
npm install
npm run build
pm2 start ecosystem.config.cjs
pm2 save
```

Or restart only one app:

```bash
pm2 restart trancongtien-web
pm2 restart trancongtien-mcp
```

Check it locally on the VPS:

```bash
curl http://127.0.0.1:3342
curl http://127.0.0.1:3343/health
```

## Nginx

Expose the website and MCP app on separate domains:

```nginx
server {
  server_name trancongtien.com www.trancongtien.com;

  location / {
    proxy_pass http://127.0.0.1:3342;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}

server {
  server_name mcp.trancongtien.com;

  location / {
    proxy_pass http://127.0.0.1:3343;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

With this config, the protected MCP URL is:

```text
https://mcp.trancongtien.com/mcp/<MCP_ACCESS_TOKEN>
```

If the ChatGPT connector setup lets you send an Authorization header, use this URL instead:

```text
https://mcp.trancongtien.com/mcp
Authorization: Bearer <MCP_ACCESS_TOKEN>
```

## Scheduled task prompt

Use this prompt for the daily 08:00 ChatGPT scheduled task.

Important: scheduled ChatGPT runs often fail when asked to finish 2–3 full posts + covers in one reply. Prefer **1 bài / lần chạy**. Update the ChatGPT scheduled task text to match:

```text
Moi ngay luc 08:00 Asia/Ho_Chi_Minh, tao DUNG 1 ban nhap blog SEO cho trancongtien.com (muc tieu tang do phu khi tim "Tran Cong Tien").

Ban CO day du tool MCP va CO the tao anh bang tinh nang tao anh cua ChatGPT. Khong duoc dung som, khong bao "khong the tao anh", khong yeu cau chuyen sang Agent khac.

Quy trinh (lam LAN LUOT, 1 bai duy nhat):
1. Goi list_categories. Chon 1 category_slug phu hop (tu-duy-san-pham | kien-truc-he-thong | frontend | ai-san-pham).
2. Goi list_recent_posts. Chon 1 chu de KHONG trung title/slug/y dinh tim kiem voi cac bai gan day. Chu de lien quan Tran Cong Tien / web app / MERN / Next.js / SEO / portfolio / AI Agent / freelancer.
3. Viet 1 bai tieng Viet: title, slug, excerpt (~40-220 ky tu), tags (3-6), read_time, content HTML (H2/H3, ket luan thuc te). Co the chen internal link /ve-toi, /blog khi hop ly. Khong nhoi tu khoa.
4. Tao 1 cover image bang tinh nang tao anh cua ChatGPT (anh editorial ngang, khong chu/logo/watermark, hop chu de).
5. Lay URL anh vua tao, goi upload_cover voi:
   - image_url = URL anh ChatGPT vua tao
   - filename, alt tieng Viet
   Khong can image_base64 neu da co image_url.
6. Goi create_blog_draft voi:
   - cover_url = dung gia tri cover_url (hoac media.url) tra ve tu upload_cover, dang /api/uploads/...
   - category_slug da chon o buoc 1
   - status DRAFT (khong publish)
   Neu muon gon, co the bo qua buoc 5 va truyen image_url + category_slug truc tiep vao create_blog_draft.
7. Bao cao ngan: title, slug, category_slug, cover_url (/api/uploads/...), /admin/posts/<id>.

Luu y:
- Chi 1 bai moi lan chay. Thanh cong khi da goi create_blog_draft va nhan post.id.
- cover_url tren post phai la /api/uploads/..., khong de nguyen URL OpenAI/DALL-E.
- Neu 1 tool loi: sua input roi thu lai, khong dung toan bo quy trinh.
```
