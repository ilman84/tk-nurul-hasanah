# Panduan Kegiatan Mingguan, Bulanan, dan Tahunan

## Perubahan yang Dilakukan

Jadwal Kegiatan Harian telah diganti dengan sistem kegiatan yang lebih fleksibel:

- **Kegiatan Mingguan** - Kegiatan yang dilakukan setiap minggu
- **Kegiatan Bulanan** - Kegiatan yang dilakukan setiap bulan
- **Kegiatan Tahunan** - Kegiatan yang dilakukan setiap tahun

## Cara Setup Database

1. Buka Supabase Dashboard Anda
2. Masuk ke **SQL Editor**
3. Buka file `update-schedule-tables.sql` yang ada di root project
4. Copy semua isinya dan paste ke SQL Editor
5. Klik **Run** atau tekan Ctrl/Cmd + Enter
6. Tunggu hingga query selesai dijalankan

> ⚠️ **PENTING**: SQL script ini akan menghapus tabel `schedules` dan `weekly_schedules` yang lama. Pastikan Anda sudah backup data jika diperlukan.

## Cara Mengelola Kegiatan di Admin

1. Login ke halaman admin: `/admin/login`
2. Setelah login, klik menu **"Jadwal Kegiatan"** di sidebar
3. Anda akan melihat 3 tab:
   - **Kegiatan Mingguan**
   - **Kegiatan Bulanan**
   - **Kegiatan Tahunan**

### Menambah Kegiatan

1. Pilih tab kegiatan yang ingin Anda tambahkan
2. Klik tombol **"Tambah Kegiatan"**
3. Isi form:
   - **Judul Kegiatan**: Nama kegiatan (contoh: "Senam Pagi")
   - **Deskripsi**: Penjelasan detail tentang kegiatan
4. Klik **"Simpan Kegiatan"**

### Mengedit Kegiatan

1. Cari kegiatan yang ingin diedit
2. Klik tombol **"Edit"** (ikon pensil biru)
3. Form akan muncul dengan data yang sudah terisi
4. Ubah data yang diperlukan
5. Klik **"Update Kegiatan"**

### Menghapus Kegiatan

1. Cari kegiatan yang ingin dihapus
2. Klik tombol **"Hapus"** (ikon tempat sampah merah)
3. Konfirmasi penghapusan
4. Kegiatan akan terhapus dari database

## Tampilan di Website

Kegiatan yang Anda tambahkan akan ditampilkan di halaman utama website pada bagian **"Program & Kegiatan"**, tepatnya di bawah card program pembelajaran.

Kegiatan akan ditampilkan dalam 3 kolom:

- **Kolom Kiri**: Kegiatan Mingguan (gradien kuning-pink)
- **Kolom Tengah**: Kegiatan Bulanan (gradien pink-biru)
- **Kolom Kanan**: Kegiatan Tahunan (gradien biru-kuning)

### Catatan Penting

- Kegiatan dengan judul kosong tidak akan ditampilkan di website
- Anda bisa menambahkan sebanyak mungkin kegiatan untuk setiap kategori
- Data disimpan secara real-time di Supabase
- Perubahan akan langsung terlihat setelah halaman di-refresh

## Struktur Database

### Tabel: `weekly_activities`

| Kolom       | Tipe      | Keterangan                  |
| ----------- | --------- | --------------------------- |
| id          | BIGSERIAL | Primary key, auto-increment |
| title       | TEXT      | Judul kegiatan              |
| description | TEXT      | Deskripsi kegiatan          |
| created_at  | TIMESTAMP | Waktu dibuat                |
| updated_at  | TIMESTAMP | Waktu diupdate              |

### Tabel: `monthly_activities`

| Kolom       | Tipe      | Keterangan                  |
| ----------- | --------- | --------------------------- |
| id          | BIGSERIAL | Primary key, auto-increment |
| title       | TEXT      | Judul kegiatan              |
| description | TEXT      | Deskripsi kegiatan          |
| created_at  | TIMESTAMP | Waktu dibuat                |
| updated_at  | TIMESTAMP | Waktu diupdate              |

### Tabel: `yearly_activities`

| Kolom       | Tipe      | Keterangan                  |
| ----------- | --------- | --------------------------- |
| id          | BIGSERIAL | Primary key, auto-increment |
| title       | TEXT      | Judul kegiatan              |
| description | TEXT      | Deskripsi kegiatan          |
| created_at  | TIMESTAMP | Waktu dibuat                |
| updated_at  | TIMESTAMP | Waktu diupdate              |

## Troubleshooting

### Error: "relation schedules does not exist"

**Solusi**: Jalankan script SQL `update-schedule-tables.sql` di Supabase SQL Editor

### Kegiatan tidak muncul di website

**Solusi**:

1. Pastikan judul kegiatan tidak kosong
2. Refresh halaman website (Ctrl/Cmd + R)
3. Cek di browser console apakah ada error

### Error saat menyimpan data

**Solusi**:

1. Pastikan koneksi internet stabil
2. Cek environment variables (NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY)
3. Pastikan RLS policies sudah di-apply dengan benar

## File yang Diubah

1. `update-schedule-tables.sql` - Script SQL untuk update database (FILE BARU)
2. `src/lib/supabase.ts` - Update table names
3. `src/lib/supabase-helpers.ts` - Tambah CRUD functions untuk 3 tabel kegiatan
4. `src/app/admin/schedule/page.tsx` - Halaman admin untuk kelola kegiatan (REDESIGN TOTAL)
5. `src/components/home/ProgramSection.tsx` - Update tampilan kegiatan di homepage

## Support

Jika ada pertanyaan atau masalah, silakan:

1. Cek dokumentasi Supabase: https://supabase.com/docs
2. Cek error di browser console (F12)
3. Cek logs di Supabase Dashboard
