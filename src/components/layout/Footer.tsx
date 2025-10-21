'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTiktok,
} from 'react-icons/fa';
import { supabase, TABLES } from '@/lib/supabase';

interface FooterData {
  description: string;
  address: string;
  phone: string;
  email: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  whatsapp: string;
  copyright: string;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [footerData, setFooterData] = useState<FooterData>({
    description:
      'Tempat terbaik untuk tumbuh kembang anak dengan lingkungan yang ceria dan penuh kasih sayang.',
    address: 'Jl. Pendidikan No. 123, Jakarta Selatan 12345',
    phone: '(021) 1234-5678',
    email: 'info@tknurulhasanah.sch.id',
    facebook: '',
    instagram: '',
    tiktok: '',
    whatsapp: 'https://wa.me/6281234567890',
    copyright: '',
  });

  const [schedule, setSchedule] = useState([
    { day: 'Senin - Jumat', hours: '07.00 - 16.00' },
    { day: 'Sabtu', hours: '07.00 - 12.00' },
  ]);

  useEffect(() => {
    loadFooter();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('footer-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: TABLES.FOOTER,
        },
        () => {
          loadFooter();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadFooter = async () => {
    try {
      const { data, error } = await supabase
        .from(TABLES.FOOTER)
        .select('*')
        .limit(1)
        .single();

      if (error) throw error;

      if (data) {
        setFooterData({
          description: data.description,
          address: data.address,
          phone: data.phone,
          email: data.email,
          facebook: data.facebook || '',
          instagram: data.instagram || '',
          tiktok: data.tiktok || '',
          whatsapp: data.whatsapp,
          copyright: data.copyright,
        });
      }

      // Also load schedule from contact table
      const { data: contactData } = await supabase
        .from(TABLES.CONTACT)
        .select('schedule')
        .limit(1)
        .single();

      if (contactData && contactData.schedule) {
        setSchedule(contactData.schedule);
      }
    } catch (error) {
      console.error('Error loading footer:', error);
    }
  };

  const quickLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil', href: '#profil' },
    { name: 'Pendaftaran', href: '#pendaftaran' },
    { name: 'Kontak', href: '#kontak' },
  ];

  return (
    <footer className='bg-gradient-to-br from-[#FFEFD5] via-[#CDEFFF] to-[#FFD6E8] pt-16 pb-8'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-12 h-12 bg-gradient-to-br from-[#FFD6E8] to-[#FFEFD5] rounded-full flex items-center justify-center shadow-lg'>
                <span className='text-2xl font-bold text-[#FF6B9D]'>N</span>
              </div>
              <div>
                <h3 className='text-lg font-bold text-gray-800'>
                  TK Nurul Hasanah
                </h3>
                <p className='text-xs text-gray-600'>Belajar & Bermain</p>
              </div>
            </div>
            <p className='text-gray-700 text-sm leading-relaxed'>
              {footerData.description}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className='text-lg font-bold text-gray-800 mb-4'>Navigasi</h4>
            <ul className='space-y-2'>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-gray-700 hover:text-[#FF6B9D] transition-colors text-sm'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className='text-lg font-bold text-gray-800 mb-4'>Kontak</h4>
            <ul className='space-y-3'>
              <li className='flex items-start gap-3 text-sm text-gray-700'>
                <FaMapMarkerAlt className='text-[#FF6B9D] mt-1 flex-shrink-0' />
                <span>{footerData.address}</span>
              </li>
              <li className='flex items-center gap-3 text-sm text-gray-700'>
                <FaPhone className='text-[#FF6B9D] flex-shrink-0' />
                <span>{footerData.phone}</span>
              </li>
              <li className='flex items-center gap-3 text-sm text-gray-700'>
                <FaEnvelope className='text-[#FF6B9D] flex-shrink-0' />
                <span>{footerData.email}</span>
              </li>
            </ul>
          </motion.div>

          {/* Social Media & Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className='text-lg font-bold text-gray-800 mb-4'>Ikuti Kami</h4>
            <div className='flex gap-3 mb-6'>
              {footerData.facebook && (
                <motion.a
                  href={footerData.facebook}
                  target='_blank'
                  rel='noopener noreferrer'
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className='w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg bg-[#1877F2]'
                >
                  <FaFacebook size={18} />
                </motion.a>
              )}
              {footerData.instagram && (
                <motion.a
                  href={footerData.instagram}
                  target='_blank'
                  rel='noopener noreferrer'
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className='w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg bg-[#E4405F]'
                  title='Instagram'
                >
                  <FaInstagram size={18} />
                </motion.a>
              )}
              {footerData.tiktok && (
                <motion.a
                  href={footerData.tiktok}
                  target='_blank'
                  rel='noopener noreferrer'
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className='w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg bg-black'
                  title='TikTok'
                >
                  <FaTiktok size={18} />
                </motion.a>
              )}
              {footerData.whatsapp && (
                <motion.a
                  href={
                    footerData.whatsapp.includes('http')
                      ? footerData.whatsapp
                      : `https://wa.me/${footerData.whatsapp.replace(
                          /\D/g,
                          ''
                        )}`
                  }
                  target='_blank'
                  rel='noopener noreferrer'
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className='w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg bg-[#25D366]'
                  title='WhatsApp'
                >
                  <FaWhatsapp size={18} />
                </motion.a>
              )}
            </div>
            <div className='text-sm text-gray-700'>
              <p className='font-semibold mb-2'>Jam Buka:</p>
              {schedule.map((item, index) => (
                <p key={index}>
                  {item.day}: {item.hours}
                </p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='border-t border-gray-300 pt-6 text-center'
        >
          <p className='text-sm text-gray-700'>
            {footerData.copyright ||
              `© ${currentYear} TK Nurul Hasanah. All Rights Reserved.`}
          </p>
          <p className='text-xs text-gray-600 mt-1'>
            Made with ❤️ for our lovely children
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
