'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AdminSidebar from './AdminSidebar';
import {
  FaImages,
  FaChartLine,
  FaBars,
  FaHome,
  FaSignOutAlt,
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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      router.push('/admin/login');
    }

    // Restore menu state from localStorage
    const savedMenuState = localStorage.getItem('mobileMenuOpen');
    if (savedMenuState !== null) {
      setIsMobileMenuOpen(savedMenuState === 'true');
    }
  }, [router]);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    localStorage.setItem('mobileMenuOpen', String(newState));
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    window.dispatchEvent(new Event('authChange'));
    router.push('/admin/login');
  };

  const menuItems = [
    { icon: FaChartLine, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: FaPhotoVideo, label: 'Edit Hero', href: '/admin/hero' },
    { icon: FaEdit, label: 'Edit Profil', href: '/admin/profile' },
    { icon: FaHeart, label: 'Nilai-Nilai Kami', href: '/admin/values' },
    {
      icon: FaChalkboardTeacher,
      label: 'Tim Pengajar',
      href: '/admin/teachers',
    },
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

  return (
    <div className='min-h-screen bg-gray-50'>
      <AdminSidebar />

      {/* Mobile Header */}
      <div className='lg:hidden bg-white shadow-md p-4 sticky top-0 z-20'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full overflow-hidden shadow-lg bg-white'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src='/images/logo.png'
                alt='TK Nurul Hasanah Logo'
                className='w-full h-full object-cover'
              />
            </div>
            <div>
              <h2 className='text-sm font-bold text-gray-800'>Admin Panel</h2>
              <p className='text-xs text-gray-600'>TK Nurul Hasanah</p>
            </div>
          </div>
          <button
            onClick={toggleMobileMenu}
            className='p-2 rounded-lg bg-[#FFD6E8] text-[#FF6B9D] hover:bg-[#ffc0d9] transition-colors'
          >
            <FaBars size={20} />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='mt-4 pt-4 border-t border-gray-200 max-h-96 overflow-y-auto'
          >
            <div className='space-y-2'>
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    localStorage.setItem('mobileMenuOpen', 'false');
                  }}
                  className='flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-[#FFD6E8] transition-colors'
                >
                  <item.icon size={18} />
                  <span className='font-medium'>{item.label}</span>
                </Link>
              ))}

              {/* Divider */}
              <div className='border-t border-gray-200 my-2'></div>

              {/* Ke Beranda */}
              <Link
                href='/'
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  localStorage.setItem('mobileMenuOpen', 'false');
                }}
                className='flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-[#CDEFFF] transition-colors'
              >
                <FaHome size={18} />
                <span className='font-medium'>Ke Beranda</span>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className='w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors'
              >
                <FaSignOutAlt size={18} />
                <span className='font-medium'>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <div className='lg:ml-64 p-4 md:p-6 lg:p-8'>{children}</div>
    </div>
  );
}
