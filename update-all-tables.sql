-- ============================================
-- MIGRATION: Update All Tables (News, Contact, Footer)
-- Jalankan SQL ini SEKALI SAJA di Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. UPDATE TABLE NEWS
-- ============================================

-- Drop old news table (backup dulu jika ada data penting!)
DROP TABLE IF EXISTS news CASCADE;

-- Create new news table with updated structure
CREATE TABLE news (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT NOT NULL,
  date TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Admin TK',
  category TEXT NOT NULL DEFAULT 'Pengumuman',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read for news" ON news FOR SELECT USING (true);
CREATE POLICY "Allow all for news" ON news FOR ALL USING (true);

-- ============================================
-- 2. UPDATE TABLE CONTACT
-- ============================================

-- Drop old contact table (backup dulu jika ada data penting!)
DROP TABLE IF EXISTS contact CASCADE;

-- Create new contact table with TikTok support
CREATE TABLE contact (
  id BIGSERIAL PRIMARY KEY,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  facebook TEXT,
  instagram TEXT,
  tiktok TEXT,
  maps_url TEXT,
  schedule JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read for contact" ON contact FOR SELECT USING (true);
CREATE POLICY "Allow all for contact" ON contact FOR ALL USING (true);

-- Insert default data
INSERT INTO contact (address, phone, email, whatsapp, facebook, instagram, tiktok, maps_url, schedule) VALUES (
  'Jl. Pendidikan No. 123, Jakarta Selatan 12345',
  '(021) 1234-5678',
  'info@tknurulhasanah.sch.id',
  'https://wa.me/6281234567890',
  'https://facebook.com/tknurulhasanah',
  'https://instagram.com/tknurulhasanah',
  'https://tiktok.com/@tknurulhasanah',
  'https://www.google.com/maps?q=-6.373668505026893,106.76280806307838&z=17&output=embed',
  '[
    {"day": "Senin - Jumat", "hours": "07.00 - 16.00 WIB"},
    {"day": "Sabtu", "hours": "07.00 - 12.00 WIB"},
    {"day": "Minggu", "hours": "Libur"}
  ]'::jsonb
);

-- ============================================
-- 3. UPDATE TABLE FOOTER
-- ============================================

-- Drop old footer table (backup dulu jika ada data penting!)
DROP TABLE IF EXISTS footer CASCADE;

-- Create new footer table with TikTok support
CREATE TABLE footer (
  id BIGSERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  facebook TEXT,
  instagram TEXT,
  tiktok TEXT,
  whatsapp TEXT,
  copyright TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE footer ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read for footer" ON footer FOR SELECT USING (true);
CREATE POLICY "Allow all for footer" ON footer FOR ALL USING (true);

-- Insert default data
INSERT INTO footer (description, address, phone, email, facebook, instagram, tiktok, whatsapp, copyright) VALUES (
  'TK Nurul Hasanah adalah taman kanak-kanak yang menyediakan lingkungan belajar dan bermain yang menyenangkan untuk tumbuh kembang anak.',
  'Jl. Pendidikan No. 123, Jakarta Selatan 12345',
  '(021) 1234-5678',
  'info@tknurulhasanah.sch.id',
  'https://facebook.com/tknurulhasanah',
  'https://instagram.com/tknurulhasanah',
  'https://tiktok.com/@tknurulhasanah',
  'https://wa.me/6281234567890',
  '© 2025 TK Nurul Hasanah. All rights reserved.'
);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

SELECT '✅ BERHASIL! Tables news, contact, dan footer sudah diupdate dengan TikTok support!' AS message;

