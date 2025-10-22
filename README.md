# 🎓 TK Nurul Hasanah Website

Modern and responsive kindergarten website with full Admin Panel and cloud database integration.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Cloud-3ECF8E?style=for-the-badge&logo=supabase)

---

## ✨ Key Features

### 🌐 Public Website

- **Dynamic Hero Slider** - Multiple customizable slides
- **Profile Section** - Vision, mission, values, teachers
- **Programs & Activities** - Weekly, monthly, yearly activities
- **Photo Gallery** - Interactive gallery with categories
- **News & Announcements** - Latest updates with real-time sync
- **Online Registration** - Student registration form
- **Contact & Location** - Contact info with Google Maps integration
- **Dynamic Footer** - Social media links (Facebook, Instagram, TikTok)

### 🔐 Admin Panel

Complete content management system:

- Hero Slides Management
- Profile (Vision & Mission)
- Values & Principles
- Teachers Management
- Programs & Activities
- Schedule (Weekly, Monthly, Yearly)
- Photo Gallery
- News & Announcements
- Registration Info & Data
- Contact & Google Maps
- Footer & Social Media
- Real-time Dashboard Statistics

---

## 🛠️ Tech Stack

**Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4  
**Backend:** Supabase (PostgreSQL)  
**Animations:** Framer Motion  
**Forms:** React Hook Form  
**Icons:** React Icons

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Supabase account (free at [supabase.com](https://supabase.com))

### Installation

1. **Clone Repository**

```bash
git clone https://github.com/username/tk-nurul-hasanah.git
cd tk-nurul-hasanah
npm install
```

2. **Environment Setup**

Create `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Get credentials from: Supabase Dashboard → Settings → API

3. **Database Setup**

- Go to Supabase Dashboard → SQL Editor
- Copy content from `update-schedule-tables.sql`
- Paste and run the query
- Verify all tables are created

4. **Run Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Admin Access

- **URL:** `/admin/login`
- **Username:** `admin`
- **Password:** `admin123`

⚠️ Change password after deployment!

---

## 📁 Project Structure

```
tk-nurul-hasanah/
├── src/
│   ├── app/
│   │   ├── admin/           # Admin pages (14 pages)
│   │   ├── page.tsx         # Homepage
│   │   └── layout.tsx
│   ├── components/
│   │   ├── admin/           # Admin layout
│   │   ├── home/            # Homepage sections
│   │   └── layout/          # Navbar, Footer
│   └── lib/
│       ├── supabase.ts      # Supabase client
│       └── supabase-helpers.ts
├── update-schedule-tables.sql
└── PANDUAN-KEGIATAN.md
```

---

## 🗄️ Database Tables

- `hero_slides` - Homepage slider
- `profile` - Vision & mission
- `values` - Core values
- `teachers` - Teacher profiles
- `programs` - Educational programs
- `weekly_activities` - Weekly activities
- `monthly_activities` - Monthly activities
- `yearly_activities` - Yearly activities
- `gallery` - Photo gallery
- `news` - News & announcements
- `registrations` - Student registrations
- `registration_info` - Registration information
- `contact` - Contact details & maps
- `footer` - Footer content

---

## 🌟 Features Highlights

✅ **Real-time Sync** - Instant updates across all devices  
✅ **Cloud Database** - Supabase PostgreSQL  
✅ **Responsive Design** - Perfect on desktop, tablet, mobile  
✅ **Beautiful Animations** - Framer Motion  
✅ **Image Upload** - Base64 encoding  
✅ **Form Validation** - React Hook Form  
✅ **Modern UI/UX** - Pastel color theme for kindergarten

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy!

### Build for Production

```bash
npm run build
npm start
```

---

## 🔧 Troubleshooting

**Data not showing:**

- Check `.env.local` credentials
- Verify SQL schema is executed
- Restart dev server
- Check browser console for errors

**Maps not displaying:**

- Use format: `https://www.google.com/maps?q=LAT,LONG&output=embed`
- See `CARA-GANTI-GOOGLE-MAPS.md` for details

**Admin access issues:**

- Clear browser cache
- Try incognito/private mode
- Verify localStorage is enabled

---

## 📚 Documentation

Additional guides available:

- `PANDUAN-KEGIATAN.md` - Activities management guide (Indonesian)
- `CARA-GANTI-GOOGLE-MAPS.md` - Google Maps setup guide
- `update-schedule-tables.sql` - Database migration script

---

## 📊 Project Stats

- **Total Pages:** 15+ (Homepage + 14 Admin)
- **Components:** 20+ React components
- **Database Tables:** 14 tables
- **Status:** ✅ Production Ready

---

## 📄 License

Copyright © 2025 TK Nurul Hasanah. All rights reserved.

---

<div align="center">

**Made with ❤️ for TK Nurul Hasanah**

_Developing children's potential through joyful learning_

⭐ **Star this repo if you find it helpful!** ⭐

</div>
