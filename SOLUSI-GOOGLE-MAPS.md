# 🗺️ Solusi Error Google Maps "Invalid pb parameter"

## ❌ Penyebab Error:

URL dari Google Maps mengandung karakter HTML entities seperti `&#39;` yang tidak valid untuk iframe embed.

---

## ✅ SOLUSI 1: Gunakan Koordinat Langsung (Paling Mudah!)

Daripada pakai embed URL yang rumit, gunakan koordinat langsung:

### **Format URL Sederhana:**

```
https://www.google.com/maps?q=LATITUDE,LONGITUDE&output=embed
```

### **Untuk Masjid Jami' Nurul Hasanah:**

Dari URL Anda, koordinatnya adalah:

- **Latitude:** -6.373652655093808
- **Longitude:** 106.76241891941461

**URL yang harus dipakai:**

```
https://www.google.com/maps?q=-6.373652655093808,106.76241891941461&output=embed
```

---

## ✅ SOLUSI 2: Cara Mudah Dapat Koordinat

### **Cara 1: Dari Google Maps (Manual)**

1. Buka Google Maps
2. Klik kanan di lokasi TK
3. Klik koordinat yang muncul (format: -6.xxxxx, 106.xxxxx)
4. Koordinat akan ter-copy
5. Gunakan format: `https://www.google.com/maps?q=KOORDINAT_TADI&output=embed`

### **Cara 2: Dari URL Browser Google Maps**

1. Buka lokasi di Google Maps
2. Lihat URL di address bar browser
3. Cari bagian `@-6.xxxxxx,106.xxxxxx`
4. Itu adalah koordinatnya!
5. Gunakan format: `https://www.google.com/maps?q=-6.xxx,106.xxx&output=embed`

---

## 🚀 Langkah Cepat (Untuk Lokasi Anda):

**Copy URL ini:**

```
https://www.google.com/maps?q=-6.373652655093808,106.76241891941461&output=embed
```

**Lalu:**

1. Buka: http://localhost:3001/admin/contact
2. Klik **"Edit"**
3. Paste URL di atas ke field **"Google Maps Embed URL"**
4. Klik **"Simpan"**
5. ✅ Maps akan berfungsi tanpa error!

---

## 💡 Format URL Alternatif Lainnya:

### **Format 1: Dengan Place Name**

```
https://www.google.com/maps?q=Masjid+Jami+Nurul+Hasanah&output=embed
```

### **Format 2: Dengan Koordinat (Paling Reliable)**

```
https://www.google.com/maps?q=-6.373652655093808,106.76241891941461&output=embed
```

### **Format 3: Dengan Zoom Level**

```
https://www.google.com/maps?q=-6.373652655093808,106.76241891941461&z=17&output=embed
```

(z=17 adalah zoom level, bisa diubah 1-20)

---

## ❌ Kenapa Embed URL Dari Google Suka Error?

Google Maps embed URL yang di-generate dari "Share → Embed" kadang mengandung:

- HTML entities (`&#39;`, `&quot;`, dll)
- Parameter yang terlalu kompleks
- Karakter yang tidak support iframe

**Solusi:** Gunakan format sederhana dengan koordinat!

---

## ✅ Checklist:

Pastikan URL yang Anda paste:

- [ ] Dimulai dengan `https://` (TIDAK ada `@` di depan)
- [ ] Tidak ada `&#39;` atau HTML entities lain
- [ ] Format sederhana: `?q=LAT,LONG&output=embed`
- [ ] Tidak ada spasi di awal/akhir

---

## 🎯 Rekomendasi Terbaik:

**Gunakan format koordinat sederhana:**

```
https://www.google.com/maps?q=-6.373652655093808,106.76241891941461&output=embed
```

Ini:

- ✅ Lebih simple
- ✅ Tidak ada karakter aneh
- ✅ Selalu berfungsi
- ✅ Mudah di-edit nanti

Selamat mencoba! 🗺️
