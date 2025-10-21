'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaHome,
  FaImages,
  FaSignOutAlt,
  FaChartLine,
  FaEdit,
  FaHeart,
  FaChalkboardTeacher,
  FaClock,
  FaUserGraduate,
  FaBullhorn,
  FaPhotoVideo,
  FaInfoCircle,
  FaPhone,
  FaBook,
  FaAlignJustify,
} from 'react-icons/fa';

const menuItems = [
  { icon: FaChartLine, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: FaPhotoVideo, label: 'Edit Hero', href: '/admin/hero' },
  { icon: FaEdit, label: 'Edit Profil', href: '/admin/profile' },
  { icon: FaHeart, label: 'Nilai-Nilai Kami', href: '/admin/values' },
  { icon: FaChalkboardTeacher, label: 'Tim Pengajar', href: '/admin/teachers' },
  { icon: FaBook, label: 'Edit Program', href: '/admin/programs' },
  { icon: FaClock, label: 'Jadwal Kegiatan', href: '/admin/schedule' },
  { icon: FaImages, label: 'Galeri Kegiatan', href: '/admin/gallery' },
  {
    icon: FaUserGraduate,
    label: 'Data Pendaftaran',
    href: '/admin/registrations',
  },
  {
    icon: FaInfoCircle,
    label: 'Info Pendaftaran',
    href: '/admin/registration-info',
  },
  { icon: FaBullhorn, label: 'Berita & Pengumuman', href: '/admin/news' },
  { icon: FaPhone, label: 'Edit Kontak', href: '/admin/contact' },
  { icon: FaAlignJustify, label: 'Edit Footer', href: '/admin/footer' },
];

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    // Dispatch custom event to notify navbar
    window.dispatchEvent(new Event('authChange'));
    router.push('/admin/login');
  };

  return (
    <div className='hidden lg:flex w-64 bg-white h-screen fixed left-0 top-0 shadow-lg flex-col'>
      {/* Logo */}
      <div className='p-6 border-b border-gray-200'>
        <Link href='/' className='flex items-center gap-3'>
          <div className='w-12 h-12 rounded-full overflow-hidden shadow-lg bg-white'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src='/images/logo.png'
              alt='TK Nurul Hasanah Logo'
              className='w-full h-full object-cover'
            />
          </div>
          <div>
            <h2 className='text-lg font-bold text-gray-800'>Admin Panel</h2>
            <p className='text-xs text-gray-600'>TK Nurul Hasanah</p>
          </div>
        </Link>
      </div>

      {/* Menu Items */}
      <nav className='flex-1 p-4 overflow-y-auto'>
        <ul className='space-y-2'>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? 'bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white shadow-lg'
                        : 'text-gray-700 hover:bg-[#FFD6E8]'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className='font-medium'>{item.label}</span>
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className='p-4 border-t border-gray-200'>
        <Link href='/' className='block mb-2'>
          <motion.div
            whileHover={{ x: 5 }}
            className='flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-[#CDEFFF] transition-colors'
          >
            <FaHome size={20} />
            <span className='font-medium'>Ke Beranda</span>
          </motion.div>
        </Link>
        <motion.button
          onClick={handleLogout}
          whileHover={{ x: 5 }}
          className='w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors'
        >
          <FaSignOutAlt size={20} />
          <span className='font-medium'>Logout</span>
        </motion.button>
      </div>
    </div>
  );
}
