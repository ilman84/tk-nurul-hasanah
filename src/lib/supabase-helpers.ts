import { supabase, TABLES } from './supabase';

// Types
type HeroSlide = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
  position?: number;
};

type ProfileData = {
  visi: string;
  misi: string;
};

type Value = {
  title: string;
  description: string;
  icon: string;
};

type Teacher = {
  name: string;
  position: string;
  photo: string;
  description: string;
};

type Program = {
  title: string;
  description: string;
  features: string[];
};

type Activity = {
  title: string;
  description: string;
};

type Registration = {
  child_name: string;
  child_age: string;
  birth_date: string;
  parent_name: string;
  phone: string;
  email: string;
  address: string;
};

type NewsItem = {
  title: string;
  content: string;
  image: string;
  date: string;
};

type GalleryItem = {
  title: string;
  category: string;
  image: string;
};

type ContactData = {
  address: string;
  phone: string;
  email: string;
  whatsapp?: string;
  maps_url?: string;
};

type FooterData = {
  description: string;
  social_media: Record<string, unknown>;
};

type RegistrationInfo = {
  title: string;
  subtitle: string;
  requirements: Array<{ title: string; description: string }>;
  fee: { title: string; description: string };
  period: { title: string; description: string };
};

// ===================== HERO SLIDES =====================
export async function getHeroSlides() {
  const { data, error } = await supabase
    .from(TABLES.HERO_SLIDES)
    .select('*')
    .order('position', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createHeroSlide(slide: HeroSlide) {
  const { data, error } = await supabase
    .from(TABLES.HERO_SLIDES)
    .insert([slide])
    .select();

  if (error) throw error;
  return data[0];
}

export async function updateHeroSlide(id: number, slide: Partial<HeroSlide>) {
  const { data, error } = await supabase
    .from(TABLES.HERO_SLIDES)
    .update({ ...slide, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
}

export async function deleteHeroSlide(id: number) {
  const { error } = await supabase
    .from(TABLES.HERO_SLIDES)
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ===================== PROFILE (Visi & Misi) =====================
export async function getProfile() {
  const { data, error } = await supabase
    .from(TABLES.PROFILE)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(profileData: ProfileData) {
  const { data, error } = await supabase
    .from(TABLES.PROFILE)
    .update({ ...profileData, updated_at: new Date().toISOString() })
    .eq('id', 1)
    .select();

  if (error) throw error;
  return data[0];
}

// ===================== VALUES =====================
export async function getValues() {
  const { data, error } = await supabase
    .from(TABLES.VALUES)
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createValue(value: Value) {
  const { data, error } = await supabase
    .from(TABLES.VALUES)
    .insert([value])
    .select();

  if (error) throw error;
  return data[0];
}

export async function updateValue(id: number, value: Partial<Value>) {
  const { data, error } = await supabase
    .from(TABLES.VALUES)
    .update({ ...value, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
}

export async function deleteValue(id: number) {
  const { error } = await supabase.from(TABLES.VALUES).delete().eq('id', id);

  if (error) throw error;
}

// ===================== TEACHERS =====================
export async function getTeachers() {
  const { data, error } = await supabase
    .from(TABLES.TEACHERS)
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createTeacher(teacher: Teacher) {
  const { data, error } = await supabase
    .from(TABLES.TEACHERS)
    .insert([teacher])
    .select();

  if (error) throw error;
  return data[0];
}

export async function updateTeacher(id: number, teacher: Partial<Teacher>) {
  const { data, error } = await supabase
    .from(TABLES.TEACHERS)
    .update({ ...teacher, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
}

export async function deleteTeacher(id: number) {
  const { error } = await supabase.from(TABLES.TEACHERS).delete().eq('id', id);

  if (error) throw error;
}

// ===================== PROGRAMS =====================
export async function getPrograms() {
  const { data, error } = await supabase
    .from(TABLES.PROGRAMS)
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createProgram(program: Program) {
  const { data, error } = await supabase
    .from(TABLES.PROGRAMS)
    .insert([program])
    .select();

  if (error) throw error;
  return data[0];
}

export async function updateProgram(id: number, program: Partial<Program>) {
  const { data, error } = await supabase
    .from(TABLES.PROGRAMS)
    .update({ ...program, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
}

export async function deleteProgram(id: number) {
  const { error } = await supabase.from(TABLES.PROGRAMS).delete().eq('id', id);

  if (error) throw error;
}

// ===================== WEEKLY ACTIVITIES =====================
export async function getWeeklyActivities() {
  const { data, error } = await supabase
    .from(TABLES.WEEKLY_ACTIVITIES)
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createWeeklyActivity(activity: Activity) {
  const { data, error } = await supabase
    .from(TABLES.WEEKLY_ACTIVITIES)
    .insert([activity])
    .select();

  if (error) throw error;
  return data[0];
}

export async function updateWeeklyActivity(
  id: number,
  activity: Partial<Activity>
) {
  const { data, error } = await supabase
    .from(TABLES.WEEKLY_ACTIVITIES)
    .update({ ...activity, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
}

export async function deleteWeeklyActivity(id: number) {
  const { error } = await supabase
    .from(TABLES.WEEKLY_ACTIVITIES)
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ===================== MONTHLY ACTIVITIES =====================
export async function getMonthlyActivities() {
  const { data, error } = await supabase
    .from(TABLES.MONTHLY_ACTIVITIES)
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createMonthlyActivity(activity: Activity) {
  const { data, error } = await supabase
    .from(TABLES.MONTHLY_ACTIVITIES)
    .insert([activity])
    .select();

  if (error) throw error;
  return data[0];
}

export async function updateMonthlyActivity(
  id: number,
  activity: Partial<Activity>
) {
  const { data, error } = await supabase
    .from(TABLES.MONTHLY_ACTIVITIES)
    .update({ ...activity, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
}

export async function deleteMonthlyActivity(id: number) {
  const { error } = await supabase
    .from(TABLES.MONTHLY_ACTIVITIES)
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ===================== YEARLY ACTIVITIES =====================
export async function getYearlyActivities() {
  const { data, error } = await supabase
    .from(TABLES.YEARLY_ACTIVITIES)
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createYearlyActivity(activity: Activity) {
  const { data, error } = await supabase
    .from(TABLES.YEARLY_ACTIVITIES)
    .insert([activity])
    .select();

  if (error) throw error;
  return data[0];
}

export async function updateYearlyActivity(
  id: number,
  activity: Partial<Activity>
) {
  const { data, error } = await supabase
    .from(TABLES.YEARLY_ACTIVITIES)
    .update({ ...activity, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
}

export async function deleteYearlyActivity(id: number) {
  const { error } = await supabase
    .from(TABLES.YEARLY_ACTIVITIES)
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ===================== REGISTRATIONS =====================
export async function getRegistrations() {
  const { data, error } = await supabase
    .from(TABLES.REGISTRATIONS)
    .select('*')
    .order('submitted_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createRegistration(registration: Registration) {
  const { data, error } = await supabase
    .from(TABLES.REGISTRATIONS)
    .insert([registration])
    .select();

  if (error) throw error;
  return data[0];
}

export async function deleteRegistration(id: number) {
  const { error } = await supabase
    .from(TABLES.REGISTRATIONS)
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ===================== REGISTRATION INFO =====================
export async function getRegistrationInfo() {
  const { data, error } = await supabase
    .from(TABLES.REGISTRATION_INFO)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function updateRegistrationInfo(info: Partial<RegistrationInfo>) {
  const { data, error } = await supabase
    .from(TABLES.REGISTRATION_INFO)
    .update({ ...info, updated_at: new Date().toISOString() })
    .eq('id', 1)
    .select();

  if (error) throw error;
  return data[0];
}

// ===================== NEWS =====================
export async function getNews() {
  const { data, error } = await supabase
    .from(TABLES.NEWS)
    .select('*')
    .order('date', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createNews(news: NewsItem) {
  const { data, error } = await supabase
    .from(TABLES.NEWS)
    .insert([news])
    .select();

  if (error) throw error;
  return data[0];
}

export async function updateNews(id: number, news: Partial<NewsItem>) {
  const { data, error } = await supabase
    .from(TABLES.NEWS)
    .update({ ...news, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
}

export async function deleteNews(id: number) {
  const { error } = await supabase.from(TABLES.NEWS).delete().eq('id', id);

  if (error) throw error;
}

// ===================== GALLERY =====================
export async function getGallery() {
  const { data, error } = await supabase
    .from(TABLES.GALLERY)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createGallery(gallery: GalleryItem) {
  const { data, error } = await supabase
    .from(TABLES.GALLERY)
    .insert([gallery])
    .select();

  if (error) throw error;
  return data[0];
}

export async function updateGallery(id: number, gallery: Partial<GalleryItem>) {
  const { data, error } = await supabase
    .from(TABLES.GALLERY)
    .update({ ...gallery, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
}

export async function deleteGallery(id: number) {
  const { error } = await supabase.from(TABLES.GALLERY).delete().eq('id', id);

  if (error) throw error;
}

// ===================== CONTACT =====================
export async function getContact() {
  const { data, error } = await supabase
    .from(TABLES.CONTACT)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function updateContact(contact: Partial<ContactData>) {
  const { data, error } = await supabase
    .from(TABLES.CONTACT)
    .update({ ...contact, updated_at: new Date().toISOString() })
    .eq('id', 1)
    .select();

  if (error) throw error;
  return data[0];
}

// ===================== FOOTER =====================
export async function getFooter() {
  const { data, error } = await supabase
    .from(TABLES.FOOTER)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function updateFooter(footer: Partial<FooterData>) {
  const { data, error } = await supabase
    .from(TABLES.FOOTER)
    .update({ ...footer, updated_at: new Date().toISOString() })
    .eq('id', 1)
    .select();

  if (error) throw error;
  return data[0];
}
