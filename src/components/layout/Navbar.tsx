'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaUserShield } from 'react-icons/fa';

const navLinks = [
  { name: 'Beranda', href: '/' },
  { name: 'Profil', href: '#profil' },
  { name: 'Program', href: '#program' },
  { name: 'Galeri', href: '#galeri' },
  { name: 'Pendaftaran', href: '#pendaftaran' },
  { name: 'Berita', href: '#berita' },
  { name: 'Kontak', href: '#kontak' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const adminAuth = localStorage.getItem('adminAuth');
      setIsAuthenticated(adminAuth === 'true');
    };

    checkAuth();

    // Listen for storage changes (for when user logs out in another tab)
    window.addEventListener('storage', checkAuth);

    // Custom event for same-tab updates
    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-gradient-to-r from-[#FFEFD5] via-[#CDEFFF] to-[#FFD6E8]'
      }`}
    >
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-20'>
          {/* Logo */}
          <Link href='/' className='flex items-center gap-3 group'>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className='w-12 h-12 rounded-full overflow-hidden shadow-lg bg-white'
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src='/images/logo.png'
                alt='TK Nurul Hasanah Logo'
                className='w-full h-full object-cover'
              />
            </motion.div>
            <div className='block'>
              <h1 className='text-base md:text-xl font-bold text-gray-800 group-hover:text-[#FF6B9D] transition-colors whitespace-nowrap'>
                TK Nurul Hasanah
              </h1>
              <p className='text-xs text-gray-600 whitespace-nowrap'>
                Giat Bersahaja
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className='hidden lg:flex items-center gap-3'>
            <div className='flex items-center gap-0 mt-1'>
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className='relative px-3 py-2 text-gray-700 font-medium rounded-full hover:text-white transition-all group'
                  >
                    <span className='relative z-10'>{link.name}</span>
                    <motion.div
                      className='absolute inset-0 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] rounded-full opacity-0 group-hover:opacity-100'
                      initial={false}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Admin Login Button */}
            <AnimatePresence mode='wait'>
              {!isAuthenticated && (
                <motion.div
                  key='login-button'
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className='ml-6 mt-1'
                >
                  <Link
                    href='/admin/login'
                    className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap'
                  >
                    <FaUserShield size={16} />
                    <span>Login Admin</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className='lg:hidden p-2 rounded-lg bg-[#FFD6E8] text-[#FF6B9D] hover:bg-[#ffc0d9] transition-colors'
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='lg:hidden bg-white border-t border-gray-200'
          >
            <div className='container mx-auto px-4 py-4'>
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className='block py-3 px-4 text-gray-700 font-medium rounded-lg hover:bg-[#FFD6E8] hover:text-[#FF6B9D] transition-colors'
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Admin Login Button - Mobile */}
              {!isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className='mt-4 pt-4 border-t border-gray-200'
                >
                  <Link
                    href='/admin/login'
                    onClick={() => setIsOpen(false)}
                    className='flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all whitespace-nowrap'
                  >
                    <FaUserShield size={16} />
                    <span>Login Admin</span>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
