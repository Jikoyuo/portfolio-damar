# Supabase Setup — Step by Step

Tujuan akhir: dapat 4 nilai env yang nanti dipakai backend Cloud Run.

```
DATABASE_URL=postgres://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres?sslmode=require
SUPABASE_URL=https://<ref>.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOi...   ← service_role key
SUPABASE_BUCKET=portfolio-images
```

---

## 1. Buat project Supabase

1. Buka https://supabase.com/dashboard → **New project**.
2. Isi:
   - **Name**: `damar-portfolio` (atau bebas)
   - **Database password**: GENERATE — **simpan di password manager**, ini akan jadi `<password>` di connection string. Tidak bisa dilihat ulang setelah ini, hanya bisa di-reset.
   - **Region**: pilih yang paling dekat (`Singapore` / `Tokyo` paling cepat dari Indonesia). Catat region-nya, dibutuhkan untuk URL pooler.
   - **Plan**: Free tier cukup untuk portfolio (500 MB DB + 1 GB storage).
3. Tunggu ±2 menit sampai project ready.

---

## 2. Dapatkan DATABASE_URL (Connection Pooler)

Cloud Run = serverless, jadi **wajib pakai pooler** (bukan direct connection).

1. Di dashboard project: **Project Settings** (⚙ kiri bawah) → **Database**.
2. Scroll ke **Connection string** → pilih tab **Transaction** (mode 6543).
3. Pilih **URI** format. Akan terlihat seperti:
   ```
   postgres://postgres.abcdwxyz:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
   ```
4. Replace `[YOUR-PASSWORD]` dengan password yang kamu generate tadi.
5. **Tambahkan `?sslmode=require`** di akhir:
   ```
   postgres://postgres.abcdwxyz:MyPa$$word@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?sslmode=require
   ```

> ℹ Backend ini auto-detect pooler URL dan otomatis switch ke simple-query
> protocol — aman untuk Supabase Transaction Pooler. Tidak perlu config tambahan.

> ⚠ Kalau password berisi karakter spesial (`@`, `:`, `/`, `?`, `#`), URL-encode
> mereka. Atau lebih gampang: regenerate password tanpa karakter spesial.

---

## 3. Buat bucket Storage

1. Sidebar kiri → **Storage** → **New bucket**.
2. Isi:
   - **Name**: `portfolio-images`
   - **Public bucket**: ✅ **AKTIFKAN** — supaya gambar bisa diakses dari browser tanpa signed URL.
   - **File size limit**: bisa di-skip atau set 10 MB.
   - **Allowed MIME types**: kosong (atau set ke `image/*` kalau mau extra strict).
3. Klik **Save**.

### 3a. Policy upload (RLS)

Supabase Storage pakai Row Level Security. Service role key bypass RLS, jadi
backend kita bisa upload tanpa setup policy tambahan. Tapi untuk pembacaan publik:

- Public bucket = file bisa di-GET semua orang via URL → **cukup**.
- Tidak perlu policy untuk SELECT.

Untuk upload via service role → tidak butuh INSERT/UPDATE policy, kita
bypass via `Authorization: Bearer <service_role>`.

Jadi: **selesai, lanjut**.

---

## 4. Ambil Service Role Key

1. **Project Settings** → **API**.
2. Scroll ke **Project API keys**.
3. Copy **`service_role`** key (yang panjang, label warna merah/abu). Ini:
   - Mem-bypass semua RLS — **server-only**.
   - Jangan dipakai di frontend, jangan commit ke git.
4. Sekalian copy **Project URL** (formatnya `https://abcdwxyz.supabase.co`) → ini jadi `SUPABASE_URL`.

---

## 5. Test koneksi dari laptop kamu (opsional tapi disarankan)

Buat file `.env` di `backend/`:

```bash
cd backend
cp .env.example .env
```

Edit `.env`:

```
DATABASE_URL=postgres://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres?sslmode=require
JWT_SECRET=ganti_dengan_string_random_minimum_32_karakter_yang_kuat
ADMIN_USERNAME=damar
ADMIN_PASSWORD=passwordku_yang_kuat
CORS_ORIGIN=http://localhost:3000
STORAGE_BACKEND=supabase
SUPABASE_URL=https://<ref>.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOi...
SUPABASE_BUCKET=portfolio-images
```

Lalu:

```bash
go run .
```

Yang harus kamu lihat di log (urutannya):

```
storage: supabase bucket=portfolio-images
listening on :8080
```

Kalau ada error:

- `failed to connect`/SSL → cek `?sslmode=require` ada di URL
- `password authentication failed` → password salah / belum di-URL-encode
- `STORAGE_BACKEND=supabase requires ...` → satu env Supabase belum di-set

Test endpoint:

```bash
curl http://localhost:8080/api/health
# {"status":"ok","storage":"supabase"}

curl http://localhost:8080/api/projects
# {"data":[]}
```

Test upload (perlu login dulu):

```bash
# Login
TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"damar","password":"passwordku_yang_kuat"}' \
  | jq -r .token)

# Upload sebuah gambar
curl -X POST http://localhost:8080/api/upload \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@/path/to/test.jpg"
# {"url":"https://<ref>.supabase.co/storage/v1/object/public/portfolio-images/<filename>",...}
```

Buka URL yang dikembalikan di browser — harus tampil gambarnya. Cek juga di
Supabase Dashboard → Storage → bucket — file-nya nongol.

---

## 6. Checklist sebelum lanjut ke deploy backend

- [ ] Project Supabase dibuat
- [ ] Database password tersimpan
- [ ] `DATABASE_URL` (port **6543** + `sslmode=require`) — TESTED
- [ ] Bucket `portfolio-images` (public) dibuat
- [ ] `SUPABASE_URL` dan `SUPABASE_SERVICE_KEY` di-copy
- [ ] Local backend test (`go run .`) → bisa login, upload, list

Setelah semua ✅, kirim 4 nilai ini ke saya (atau simpan untuk masukan ke Cloud Run env):

```
DATABASE_URL=...
SUPABASE_URL=...
SUPABASE_SERVICE_KEY=...
SUPABASE_BUCKET=portfolio-images
```

Kita lanjut ke Step 2: deploy backend ke Cloud Run.
