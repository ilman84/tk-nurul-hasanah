# 🚀 Setup Super Mudah - 3 Langkah Saja!

## ✅ File: update-all-tables.sql

File ini menggabungkan semua update untuk:

- ✅ News (Berita & Pengumuman)
- ✅ Contact (Kontak & Lokasi + TikTok)
- ✅ Footer (Footer + TikTok)

---

## 📋 HANYA 3 LANGKAH:

### **Step 1: Jalankan SQL** (2 menit)

1. Buka **Supabase Dashboard** → Klik **SQL Editor** di sidebar
2. Klik tombol **"New query"**
3. Buka file **`update-all-tables.sql`** di VS Code
4. **Select All** (Ctrl + A) → **Copy** (Ctrl + C)
5. **Paste** di SQL Editor Supabase
6. Klik **"Run"** (atau Ctrl + Enter)
7. Tunggu sampai muncul: **"✅ BERHASIL! Tables news, contact, dan footer sudah diupdate dengan TikTok support!"**

⚠️ **CATATAN**: SQL ini akan drop table lama. Data akan diganti dengan default.

---

### **Step 2: Restart Dev Server** (1 menit)

```bash
# Di terminal, tekan Ctrl + C untuk stop server

# Lalu jalankan lagi:
npm run dev
```

---

### **Step 3: Test!** (2 menit)

#### **Test Berita:**

1. Buka: http://localhost:3001/admin/news
2. Klik **"Tambah Berita"**
3. Isi form + upload gambar
4. Klik **"Simpan"**
5. ✅ Lihat di homepage: http://localhost:3001/#berita

#### **Test Contact & Footer:**

1. Buka: http://localhost:3001/admin/contact
2. Klik **"Edit"**
3. Isi **TikTok URL**: `https://tiktok.com/@tknurulhasanah`
4. Isi **WhatsApp**: `https://wa.me/6281234567890` (62 tanpa +)
5. Isi **Google Maps** (lihat file `CARA-GANTI-GOOGLE-MAPS.md` untuk panduan)
6. Klik **"Simpan"**
7. ✅ Lihat di homepage: http://localhost:3001/#kontak

---

## 🎉 SELESAI!

Kalau 3 langkah di atas sudah, website Anda:

✅ **100% Cloud Database** - Semua data di Supabase  
✅ **Real-time Sync** - Update otomatis di semua device  
✅ **TikTok Support** - Icon TikTok di Contact & Footer  
✅ **WhatsApp Fixed** - Tidak 404 lagi  
✅ **Facebook & Instagram** - Terhubung Supabase  
✅ **Google Maps Dinamis** - Lokasi bisa diubah dari admin panel

---

## 📱 Test Real-time:

1. Buka Chrome → Edit berita di admin
2. Buka Edge → Refresh homepage
3. ✅ Berita langsung muncul!

---

## ❌ Error?

### "relation does not exist"

→ Pastikan SQL sudah di-Run dengan benar

### "Failed to fetch"

→ Check koneksi internet & .env.local

### WhatsApp masih 404

→ Format harus: `https://wa.me/628xxxxxxxxxx` (62 tanpa +)

---

## 📞 Format Yang Benar:

| Social Media | Format                           | Contoh                                 |
| ------------ | -------------------------------- | -------------------------------------- |
| Facebook     | `https://facebook.com/username`  | `https://facebook.com/tknurulhasanah`  |
| Instagram    | `https://instagram.com/username` | `https://instagram.com/tknurulhasanah` |
| TikTok       | `https://tiktok.com/@username`   | `https://tiktok.com/@tknurulhasanah`   |
| WhatsApp     | `https://wa.me/628xxxxxxxxxx`    | `https://wa.me/6281234567890`          |

---

## ✅ Checklist:

- [ ] SQL `update-all-tables.sql` sudah di-Run
- [ ] Dev server sudah di-restart
- [ ] Berita bisa ditambah di admin
- [ ] Contact bisa diedit dengan TikTok
- [ ] Footer bisa diedit dengan TikTok
- [ ] WhatsApp tidak 404 lagi
- [ ] Semua social media icon muncul di homepage
- [ ] Google Maps bisa diubah dari admin contact
- [ ] Preview maps muncul di admin saat tidak edit

**Kalau semua ✅ = SUKSES! 🎊**

---

## 📍 Cara Ganti Google Maps:

Lihat panduan lengkap di file: **`CARA-GANTI-GOOGLE-MAPS.md`**

**Ringkasan Cepat:**

1. Buka Google Maps → Cari lokasi TK
2. Klik "Share" → "Embed a map"
3. Copy HTML → Ambil URL di dalam src="..."
4. Paste di admin/contact → Simpan
5. ✅ Lokasi langsung update!

**Format URL yang benar:**

```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!...
```
