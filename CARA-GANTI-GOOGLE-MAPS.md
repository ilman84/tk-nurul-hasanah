# 📍 Cara Mengubah Lokasi Google Maps

## 🎯 Tujuan:

Mengganti pin lokasi Google Maps di section Kontak agar menunjuk ke lokasi TK Nurul Hasanah yang sebenarnya.

---

## 📋 Langkah-Langkah (5 Menit):

### **Step 1: Dapatkan Embed URL dari Google Maps**

1. Buka **Google Maps**: https://www.google.com/maps

2. **Cari lokasi TK Anda** dengan salah satu cara:

   - Ketik alamat lengkap di search bar
   - Atau klik langsung di peta untuk pin lokasi manual

3. **Klik tombol "Share" (Bagikan)**

   - Biasanya ada di sidebar kiri setelah memilih lokasi
   - Atau klik kanan pada pin → pilih "Share" atau "Bagikan"

4. **Pilih tab "Embed a map" (Sematkan peta)**

   - Di popup yang muncul, ada 2 tab
   - Pilih yang "Embed a map" (bukan "Send a link")

5. **Pilih ukuran (opsional)**

   - Small, Medium, Large, atau Custom
   - Pilih yang sesuai, biasanya **Medium** atau **Large**

6. **Klik "COPY HTML"**

   - Akan muncul kode seperti ini:

   ```html
   <iframe
     src="https://www.google.com/maps/embed?pb=!1m18!1m12!..."
     width="600"
     height="450"
     style="border:0;"
     allowfullscreen=""
     loading="lazy"
   ></iframe>
   ```

7. **Ambil HANYA URL-nya** (yang di dalam src="...")
   - Copy dari `https://` sampai sebelum tanda `"` penutup
   - Contoh hasil: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966...`

---

### **Step 2: Paste di Admin Panel**

1. Buka: **http://localhost:3001/admin/contact**

2. Klik tombol **"Edit"**

3. Scroll ke bagian **"Google Maps Lokasi"**

4. **Paste URL** yang sudah dicopy ke dalam textarea

5. Klik **"Simpan"**

6. ✅ Maps tersimpan!

---

### **Step 3: Lihat Hasilnya**

1. Buka: **http://localhost:3001/#kontak**

2. Scroll ke bagian Kontak

3. ✅ **Google Maps sekarang menunjuk ke lokasi yang benar!**

---

## 🎨 Preview di Admin:

Ketika Anda tidak dalam mode Edit, akan ada **preview maps** langsung di admin panel! Jadi Anda bisa memastikan lokasi sudah benar sebelum publish.

---

## ❌ Troubleshooting:

### **Maps tidak muncul / blank**

**Penyebab:**

- URL yang dipaste salah atau tidak lengkap
- Paste full HTML code, bukan cuma URL

**Solusi:**

1. Pastikan yang dipaste adalah **URL saja**, bukan full HTML
2. URL harus diawali dengan: `https://www.google.com/maps/embed?pb=`
3. Jangan include `<iframe>` atau `</iframe>`

### **Maps muncul tapi lokasi salah**

**Solusi:**

1. Ulangi Step 1 dengan lokasi yang benar
2. Pastikan pin di Google Maps sudah tepat sebelum klik "Share"
3. Ganti URL di admin contact → Simpan

### **Error "Invalid URL"**

**Solusi:**

- URL harus lengkap dimulai dengan `https://`
- Jangan ada spasi di awal/akhir
- Copy ulang dari Google Maps

---

## 💡 Tips:

### **Cara Pin Lokasi Manual:**

1. Di Google Maps, klik kanan di lokasi yang tepat
2. Pilih **"What's here?"** atau **"Apa yang ada di sini?"**
3. Pin akan muncul di lokasi tersebut
4. Lalu ikuti Step 1 di atas (klik Share → Embed)

### **Cara Zoom & Adjust View:**

1. Sebelum klik "Share", atur zoom level yang diinginkan
2. Posisikan peta sesuai keinginan (center, zoom, dll)
3. Baru klik "Share" → "Embed"
4. Embed URL akan simpan posisi peta yang Anda atur

---

## ✅ Hasil Akhir:

Setelah setup:

- ✅ Google Maps di homepage menunjuk lokasi yang benar
- ✅ Lokasi tersimpan di Supabase (permanen)
- ✅ Bisa diubah kapan saja dari admin panel
- ✅ Real-time sync (langsung update di homepage)
- ✅ Preview langsung di admin saat tidak edit

---

## 📝 Contoh URL Yang Benar:

```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2179572994757!2d106.82493931476893!3d-6.229728295498379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf5486c4b000!2sMonas!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid
```

**Ciri URL yang benar:**

- ✅ Dimulai dengan `https://www.google.com/maps/embed?`
- ✅ Ada parameter `pb=!1m18...` (koordinat)
- ✅ Panjang URL (biasanya 200-400 karakter)

---

## 🚀 Keuntungan:

Sekarang Google Maps:

- ✅ Terhubung dengan Supabase (data permanen)
- ✅ Bisa diubah dari admin panel (tidak perlu edit code)
- ✅ Real-time sync (langsung update)
- ✅ Preview di admin sebelum publish

Selamat! Lokasi Google Maps sekarang dinamis dan bisa diubah! 🎉
