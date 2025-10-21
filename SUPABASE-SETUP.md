# 🚀 Setup Supabase untuk TK Nurul Hasanah

## ✅ Yang Sudah Dikerjakan:

### 1. **Install & Setup**

- ✅ Supabase client library ter-install
- ✅ Supabase config file (`src/lib/supabase.ts`)
- ✅ Helper functions untuk CRUD (`src/lib/supabase-helpers.ts`)
- ✅ Database schema (`supabase-schema.sql`)

### 2. **Fitur Yang Sudah Diupdate ke Supabase:**

- ✅ **Hero Section** (Admin & Homepage)
- ✅ **Profile** - Visi & Misi (Admin & Homepage)
- ✅ **Values** - Nilai-Nilai Kami (Admin & Homepage)
- ✅ **Teachers** - Tim Pengajar (Admin & Homepage)
- ✅ **Programs** - Program & Kegiatan (Admin & Homepage)
- ✅ **Schedules** - Jadwal Harian & Mingguan (Admin & Homepage)
- ✅ **Gallery** - Galeri Foto (Admin & Homepage)
- ✅ **Registration Info** - Info Pendaftaran (Admin & Homepage)
- ✅ **Registrations** - Data Pendaftaran (Admin)
- ✅ **News** - Berita & Pengumuman (Admin & Homepage) + Real-time ⚡
- ✅ **Contact** - Kontak & Lokasi (Admin & Homepage) + TikTok + Real-time ⚡
- ✅ **Footer** - Footer Website (Admin & Homepage) + TikTok + Real-time ⚡

### 3. **Status:**

🎉 **SEMUA FITUR SUDAH MENGGUNAKAN SUPABASE! (100%)**

Tidak ada lagi yang menggunakan localStorage. Semua data:

- ✅ Tersimpan permanen di cloud
- ✅ Sinkron otomatis di semua device
- ✅ Real-time updates
- ✅ Support TikTok social media

---

## 📝 Langkah-Langkah Setup:

### **Step 1: Pastikan .env.local Sudah Benar**

File `.env.local` sudah ada di project root? Isinya harus seperti ini:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Cara mendapatkan credentials:**

1. Buka project Supabase Anda di https://supabase.com
2. Klik **Settings** → **API**
3. Copy **Project URL** dan **anon public** key
4. Paste ke `.env.local`

### **Step 2: Jalankan SQL Schema**

1. Di Supabase dashboard, klik **SQL Editor**
2. Klik **New query**
3. Copy **semua isi** file `supabase-schema.sql` dari project
4. Paste ke SQL Editor
5. Klik **Run** (atau Ctrl + Enter)
6. Tunggu sampai muncul **"Success"**

### **Step 3: Restart Development Server**

```bash
# Stop server yang sedang berjalan (Ctrl + C)
# Kemudian jalankan lagi:
npm run dev
```

⚠️ **PENTING**: Restart server diperlukan agar environment variables terbaca!

### **Step 4: Test Fitur**

1. Buka http://localhost:3001
2. Data pertama kali akan kosong atau menggunakan default
3. Masuk ke Admin (http://localhost:3001/admin/dashboard)
4. Edit data di masing-masing halaman admin
5. Kembali ke homepage dan refresh - data akan terupdate!
6. **Buka di komputer/HP lain** - data akan sama!

---

## 🎯 Keuntungan Menggunakan Supabase:

✅ **Sinkron di Semua Device**

- Edit di laptop → langsung update di HP
- Edit di komputer kantor → langsung update di komputer rumah
- Semua device selalu punya data yang sama!

✅ **Data Permanen**

- Tidak hilang walau clear browser cache
- Tidak hilang walau ganti browser
- Tersimpan di cloud secara permanen

✅ **Real-time**

- Perubahan langsung terlihat di semua device
- Tidak perlu refresh manual

✅ **Gratis Selamanya**

- 500MB database
- 1GB file storage
- 2GB bandwidth per bulan
- Cukup untuk website TK

✅ **Scalable**

- Bisa ditambah user authentication nanti
- Bisa ditambah role-based access
- Bisa upgrade plan jika perlu

---

## 🔧 Troubleshooting:

### **Error: "Failed to fetch"**

- Pastikan `.env.local` sudah benar
- Restart development server
- Check internet connection

### **Error: "relation does not exist"**

- SQL schema belum dijalankan
- Jalankan `supabase-schema.sql` di SQL Editor

### **Data Tidak Muncul**

- Check console browser (F12) untuk error
- Pastikan SQL schema sudah berhasil
- Check Supabase dashboard → Table Editor

### **Credentials Salah**

- Double check `.env.local`
- Pastikan tidak ada spasi sebelum/sesudah URL dan key
- Pastikan menggunakan anon key, bukan service_role key

---

## 📊 Database Tables:

| Table               | Deskripsi                |
| ------------------- | ------------------------ |
| `hero_slides`       | Data slider hero section |
| `profile`           | Visi & Misi sekolah      |
| `values`            | Nilai-nilai TK           |
| `teachers`          | Data guru/pengajar       |
| `programs`          | Program & Kegiatan       |
| `schedules`         | Jadwal kegiatan harian   |
| `weekly_schedules`  | Jadwal mingguan          |
| `gallery`           | Galeri foto              |
| `news`              | Berita & Pengumuman      |
| `registrations`     | Data pendaftaran siswa   |
| `registration_info` | Info pendaftaran         |
| `contact`           | Informasi kontak         |
| `footer`            | Data footer              |

---

## 🎨 Cara Mengecek Data di Supabase:

1. Buka Supabase dashboard
2. Klik **Table Editor** di sidebar
3. Pilih table yang ingin dilihat (misalnya: `hero_slides`)
4. Data yang sudah diinput dari admin akan muncul di sini
5. Anda juga bisa edit langsung dari Table Editor jika perlu

---

## 🔐 Security (RLS - Row Level Security):

Saat ini, semua orang bisa membaca dan menulis data (untuk kemudahan development).

**Untuk Production, nanti bisa ditambahkan:**

- Authentication untuk admin
- RLS policies yang lebih strict
- Role-based access control

---

## 📞 Support:

Jika ada masalah:

1. Check console browser (F12 → Console tab)
2. Check terminal untuk error messages
3. Check Supabase logs (Dashboard → Logs)

Selamat mencoba! 🎉
