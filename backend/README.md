# Damar Portfolio — Backend API

Go Fiber + PostgreSQL + JWT. Single static binary. Migrations dijalankan otomatis saat startup.

## Local development

1. Copy env file dan isi nilainya:

   ```bash
   cp .env.example .env
   ```

2. Buat database Postgres (sekali saja):

   ```bash
   createdb damar_portfolio
   ```

3. Jalankan:

   ```bash
   go run .
   ```

   Server listen di `http://localhost:8080`. Migration di folder `migrations/` dijalankan otomatis (idempotent).

## Endpoint

Public:

| Method | Path                | Keterangan               |
| ------ | ------------------- | ------------------------ |
| GET    | `/api/health`       | health check             |
| GET    | `/api/projects`     | list semua project       |
| GET    | `/api/projects/:id` | detail satu project      |
| POST   | `/api/auth/login`   | `{ username, password }` |

Butuh `Authorization: Bearer <token>`:

| Method | Path                | Keterangan                            |
| ------ | ------------------- | ------------------------------------- |
| GET    | `/api/auth/me`      | verify token                          |
| POST   | `/api/projects`     | create project                        |
| PUT    | `/api/projects/:id` | update project                        |
| DELETE | `/api/projects/:id` | delete project                        |
| POST   | `/api/upload`       | upload gambar (`multipart/form-data`) |

Static files: `GET /uploads/:filename`

## Project payload

```json
{
  "title": "string",
  "description": "string",
  "type": "Office | Personal | Campus",
  "stack": ["Go", "React"],
  "images": ["https://api.example.com/uploads/xxx.jpg"],
  "demoUrl": "https://...",
  "githubUrl": "https://...",
  "sortOrder": 0
}
```

---

## Deploy ke Google Cloud Run

### 1. Build & push image

Sudah ada `Dockerfile` multi-stage (binary + distroless, ~15MB).

```bash
# Set variabel
PROJECT_ID=your-gcp-project
REGION=asia-southeast2
SERVICE=damar-portfolio-api

# Build via Cloud Build (paling gampang)
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE .
```

### 2. Setup database

Pilih salah satu:

- **Cloud SQL Postgres** (rekomendasi production) — buat instance, lalu pakai Cloud SQL Auth Proxy via `--add-cloudsql-instances` saat deploy. `DATABASE_URL` pakai socket: `postgres://user:pass@/dbname?host=/cloudsql/PROJECT:REGION:INSTANCE`.
- **Supabase / Neon / Railway** (paling gampang) — copy connection string mereka langsung ke `DATABASE_URL`. Pastikan pakai `sslmode=require`.

### 3. Deploy

```bash
gcloud run deploy $SERVICE \
  --image gcr.io/$PROJECT_ID/$SERVICE \
  --region $REGION \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars "DATABASE_URL=postgres://...,JWT_SECRET=...,ADMIN_USERNAME=damar,ADMIN_PASSWORD=...,CORS_ORIGIN=https://damar-portfolio.vercel.app,PUBLIC_BASE_URL=https://damar-portfolio-api-xxxxx-as.a.run.app,UPLOAD_DIR=/uploads"
```

Setelah deploy pertama, update `PUBLIC_BASE_URL` ke URL Cloud Run yang sebenarnya, lalu redeploy.

### 4. ⚠️ Upload file di Cloud Run — wajib baca

Cloud Run filesystem **ephemeral** — file di `/uploads` akan hilang saat container restart/redeploy. Tiga opsi:

#### Opsi A — Mount Cloud Storage sebagai volume (rekomendasi, zero code change)

Cloud Run mendukung volume mount dari GCS bucket (GA Aug 2024). Kode backend **tidak perlu diubah** sama sekali.

```bash
# 1. Buat bucket
gsutil mb -l $REGION gs://damar-portfolio-uploads

# 2. Buat bucket jadi public-readable (supaya gambar bisa diakses dari browser)
gsutil iam ch allUsers:objectViewer gs://damar-portfolio-uploads

# 3. Deploy ulang Cloud Run dengan volume mount
gcloud run deploy $SERVICE \
  --image gcr.io/$PROJECT_ID/$SERVICE \
  --region $REGION \
  --add-volume name=uploads,type=cloud-storage,bucket=damar-portfolio-uploads \
  --add-volume-mount volume=uploads,mount-path=/uploads \
  --set-env-vars "UPLOAD_DIR=/uploads,PUBLIC_BASE_URL=https://storage.googleapis.com/damar-portfolio-uploads,..."
```

Catatan: dengan `PUBLIC_BASE_URL` di-set ke URL bucket GCS, route `/uploads/xxx.jpg` yang di-serve Fiber tidak lagi dibutuhkan untuk gambar yang sudah ada di bucket — browser langsung pull dari `storage.googleapis.com`. Kalau mau tetap di-serve via Cloud Run (misal untuk caching), biarkan `PUBLIC_BASE_URL` pakai Cloud Run URL.

#### Opsi B — Paste URL gambar (skip upload backend)

Pakai Supabase Storage / Cloudinary / ImgBB. Di admin form tinggal paste URL. Endpoint `/api/upload` tetap ada tapi tidak dipakai.

#### Opsi C — Local FS (HANYA dev / single-instance demo)

Default. Akan hilang saat container restart. Jangan pakai untuk production.

### 5. CORS

`CORS_ORIGIN` menerima comma-separated list. Untuk Vercel preview URLs, tambahkan domain utama + localhost:

```
CORS_ORIGIN=https://damar-portfolio.vercel.app,http://localhost:3000
```

Kalau butuh wildcard untuk preview URLs (`*.vercel.app`), perlu pakai `AllowOriginsFunc` — bisa ditambah belakangan.
