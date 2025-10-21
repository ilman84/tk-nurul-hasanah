-- Supabase Database Schema for TK Nurul Hasanah
-- Copy and paste this SQL to your Supabase SQL Editor

-- Table: hero_slides
CREATE TABLE IF NOT EXISTS hero_slides (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  color VARCHAR(20) DEFAULT '#FFEFD5',
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: profile (visi & misi)
CREATE TABLE IF NOT EXISTS profile (
  id BIGSERIAL PRIMARY KEY,
  visi TEXT NOT NULL,
  misi TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: values (nilai-nilai)
CREATE TABLE IF NOT EXISTS values (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: teachers
CREATE TABLE IF NOT EXISTS teachers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  photo TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: programs
CREATE TABLE IF NOT EXISTS programs (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: schedules (jadwal harian)
CREATE TABLE IF NOT EXISTS schedules (
  id BIGSERIAL PRIMARY KEY,
  time TEXT NOT NULL,
  activity TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: weekly_schedules (jadwal mingguan)
CREATE TABLE IF NOT EXISTS weekly_schedules (
  id BIGSERIAL PRIMARY KEY,
  day TEXT NOT NULL,
  activities TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: gallery
CREATE TABLE IF NOT EXISTS gallery (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: news
CREATE TABLE IF NOT EXISTS news (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: registrations
CREATE TABLE IF NOT EXISTS registrations (
  id BIGSERIAL PRIMARY KEY,
  child_name TEXT NOT NULL,
  child_age TEXT NOT NULL,
  birth_date TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: registration_info
CREATE TABLE IF NOT EXISTS registration_info (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  requirements JSONB NOT NULL,
  fee JSONB NOT NULL,
  period JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: contact
CREATE TABLE IF NOT EXISTS contact (
  id BIGSERIAL PRIMARY KEY,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  maps_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: footer
CREATE TABLE IF NOT EXISTS footer (
  id BIGSERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  social_media JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default profile data
INSERT INTO profile (visi, misi) VALUES (
  'Menjadi lembaga pendidikan anak usia dini yang unggul, islami, dan berkarakter, menghasilkan generasi yang cerdas, kreatif, dan berakhlak mulia.',
  'Menyelenggarakan pendidikan berkualitas dengan metode pembelajaran yang menyenangkan, mengembangkan potensi anak secara optimal, dan menanamkan nilai-nilai keislaman sejak dini.'
) ON CONFLICT DO NOTHING;

-- Insert default registration info
INSERT INTO registration_info (title, subtitle, requirements, fee, period) VALUES (
  'Pendaftaran Siswa Baru',
  'Daftarkan putra-putri Anda sekarang untuk tahun ajaran 2025/2026',
  '[{"title": "Syarat Pendaftaran", "description": "Usia minimal 4 tahun, fotokopi KK, akta kelahiran"}]'::jsonb,
  '{"title": "Biaya Pendaftaran", "description": "Rp 500.000 (sudah termasuk seragam dan buku)"}'::jsonb,
  '{"title": "Waktu Pendaftaran", "description": "Dibuka mulai Januari - Juni 2025"}'::jsonb
) ON CONFLICT DO NOTHING;

-- Insert default weekly schedules
INSERT INTO weekly_schedules (day, activities) VALUES
  ('Senin', ARRAY['Upacara', 'Pembelajaran Dasar', 'Seni']),
  ('Selasa', ARRAY['Olahraga', 'Matematika', 'Musik']),
  ('Rabu', ARRAY['Bahasa', 'Kreativitas', 'Bermain']),
  ('Kamis', ARRAY['Sains', 'Tari', 'Storytelling']),
  ('Jumat', ARRAY['Agama', 'Olahraga', 'Praktik'])
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE values ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE registration_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer ENABLE ROW LEVEL SECURITY;

-- Create policies to allow read access for all users
CREATE POLICY "Allow public read for hero_slides" ON hero_slides FOR SELECT USING (true);
CREATE POLICY "Allow public read for profile" ON profile FOR SELECT USING (true);
CREATE POLICY "Allow public read for values" ON values FOR SELECT USING (true);
CREATE POLICY "Allow public read for teachers" ON teachers FOR SELECT USING (true);
CREATE POLICY "Allow public read for programs" ON programs FOR SELECT USING (true);
CREATE POLICY "Allow public read for schedules" ON schedules FOR SELECT USING (true);
CREATE POLICY "Allow public read for weekly_schedules" ON weekly_schedules FOR SELECT USING (true);
CREATE POLICY "Allow public read for gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read for news" ON news FOR SELECT USING (true);
CREATE POLICY "Allow public read for registration_info" ON registration_info FOR SELECT USING (true);
CREATE POLICY "Allow public read for contact" ON contact FOR SELECT USING (true);
CREATE POLICY "Allow public read for footer" ON footer FOR SELECT USING (true);

-- Allow public to insert registrations
CREATE POLICY "Allow public insert for registrations" ON registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read for registrations" ON registrations FOR SELECT USING (true);

-- Allow all operations (for now, later you can add authentication)
CREATE POLICY "Allow all for hero_slides" ON hero_slides FOR ALL USING (true);
CREATE POLICY "Allow all for profile" ON profile FOR ALL USING (true);
CREATE POLICY "Allow all for values" ON values FOR ALL USING (true);
CREATE POLICY "Allow all for teachers" ON teachers FOR ALL USING (true);
CREATE POLICY "Allow all for programs" ON programs FOR ALL USING (true);
CREATE POLICY "Allow all for schedules" ON schedules FOR ALL USING (true);
CREATE POLICY "Allow all for weekly_schedules" ON weekly_schedules FOR ALL USING (true);
CREATE POLICY "Allow all for gallery" ON gallery FOR ALL USING (true);
CREATE POLICY "Allow all for news" ON news FOR ALL USING (true);
CREATE POLICY "Allow all for registration_info" ON registration_info FOR ALL USING (true);
CREATE POLICY "Allow all for contact" ON contact FOR ALL USING (true);
CREATE POLICY "Allow all for footer" ON footer FOR ALL USING (true);

