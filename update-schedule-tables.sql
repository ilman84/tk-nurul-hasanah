-- Update Schema untuk Kegiatan Mingguan, Bulanan, dan Tahunan
-- Jalankan SQL ini di Supabase SQL Editor

-- Hapus tabel schedules lama (jadwal harian)
DROP TABLE IF EXISTS schedules CASCADE;

-- Hapus tabel weekly_schedules lama
DROP TABLE IF EXISTS weekly_schedules CASCADE;

-- Tabel untuk Kegiatan Mingguan
CREATE TABLE IF NOT EXISTS weekly_activities (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk Kegiatan Bulanan
CREATE TABLE IF NOT EXISTS monthly_activities (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk Kegiatan Tahunan
CREATE TABLE IF NOT EXISTS yearly_activities (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE weekly_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE yearly_activities ENABLE ROW LEVEL SECURITY;

-- Policies untuk akses public read
CREATE POLICY "Allow public read for weekly_activities" ON weekly_activities FOR SELECT USING (true);
CREATE POLICY "Allow public read for monthly_activities" ON monthly_activities FOR SELECT USING (true);
CREATE POLICY "Allow public read for yearly_activities" ON yearly_activities FOR SELECT USING (true);

-- Policies untuk akses admin (untuk sementara allow all, nanti bisa ditambahkan authentication)
CREATE POLICY "Allow all for weekly_activities" ON weekly_activities FOR ALL USING (true);
CREATE POLICY "Allow all for monthly_activities" ON monthly_activities FOR ALL USING (true);
CREATE POLICY "Allow all for yearly_activities" ON yearly_activities FOR ALL USING (true);

-- Insert data default kosong (3 item untuk masing-masing tabel)
-- Kegiatan Mingguan
INSERT INTO weekly_activities (title, description) VALUES
  ('', ''),
  ('', ''),
  ('', '')
ON CONFLICT DO NOTHING;

-- Kegiatan Bulanan
INSERT INTO monthly_activities (title, description) VALUES
  ('', ''),
  ('', ''),
  ('', '')
ON CONFLICT DO NOTHING;

-- Kegiatan Tahunan
INSERT INTO yearly_activities (title, description) VALUES
  ('', ''),
  ('', ''),
  ('', '')
ON CONFLICT DO NOTHING;

