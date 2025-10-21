import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table names
export const TABLES = {
  HERO_SLIDES: 'hero_slides',
  PROFILE: 'profile',
  VALUES: 'values',
  TEACHERS: 'teachers',
  PROGRAMS: 'programs',
  SCHEDULES: 'schedules',
  WEEKLY_SCHEDULES: 'weekly_schedules',
  GALLERY: 'gallery',
  NEWS: 'news',
  REGISTRATIONS: 'registrations',
  REGISTRATION_INFO: 'registration_info',
  CONTACT: 'contact',
  FOOTER: 'footer',
};
