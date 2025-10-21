'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaSave } from 'react-icons/fa';
import { supabase, TABLES } from '@/lib/supabase';

interface FooterData {
  description: string;
  address: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  whatsapp: string;
  copyright: string;
}

export default function AdminFooter() {
  const [footerData, setFooterData] = useState<FooterData>({
    description: '',
    address: '',
    phone: '',
    email: '',
    facebook: '',
    instagram: '',
    tiktok: '',
    whatsapp: '',
    copyright: '',
  });
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadFooter();
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
    } catch (error) {
      console.error('Error loading footer:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);

      const { error } = await supabase.from(TABLES.FOOTER).upsert({
        id: 1,
        description: footerData.description,
        address: footerData.address,
        phone: footerData.phone,
        email: footerData.email,
        facebook: footerData.facebook,
        instagram: footerData.instagram,
        tiktok: footerData.tiktok,
        whatsapp: footerData.whatsapp,
        copyright: footerData.copyright,
      });

      if (error) throw error;

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error('Error saving footer:', error);
      alert('Gagal menyimpan data footer. Silakan coba lagi.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-6'
        >
          <div className='mb-6'>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2'>
              Edit Footer
            </h1>
            <p className='text-sm md:text-base text-gray-600'>
              Kelola informasi di bagian footer website
            </p>
          </div>

          {/* Success Message */}
          {isSaved && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className='mb-6 p-4 bg-green-100 border-2 border-green-300 rounded-xl text-green-700 text-sm'
            >
              ✅ Data footer berhasil disimpan!
            </motion.div>
          )}

          {/* Form */}
          <div className='bg-white rounded-2xl shadow-lg p-4 md:p-6'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Description */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Deskripsi Sekolah
                </label>
                <textarea
                  value={footerData.description}
                  onChange={(e) =>
                    setFooterData({
                      ...footerData,
                      description: e.target.value,
                    })
                  }
                  required
                  rows={4}
                  className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors resize-none'
                  placeholder='Deskripsi singkat tentang sekolah...'
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* Address */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Alamat
                  </label>
                  <textarea
                    value={footerData.address}
                    onChange={(e) =>
                      setFooterData({ ...footerData, address: e.target.value })
                    }
                    required
                    rows={3}
                    className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors resize-none'
                    placeholder='Alamat lengkap sekolah'
                  />
                </div>

                {/* Contact Info */}
                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Nomor Telepon
                    </label>
                    <input
                      type='text'
                      value={footerData.phone}
                      onChange={(e) =>
                        setFooterData({ ...footerData, phone: e.target.value })
                      }
                      required
                      className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                      placeholder='+62 812-3456-7890'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Email
                    </label>
                    <input
                      type='email'
                      value={footerData.email}
                      onChange={(e) =>
                        setFooterData({ ...footerData, email: e.target.value })
                      }
                      required
                      className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                      placeholder='email@tknurulhasanah.sch.id'
                    />
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className='border-t pt-6'>
                <h3 className='text-lg font-bold text-gray-800 mb-4'>
                  Media Sosial
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Facebook
                    </label>
                    <input
                      type='url'
                      value={footerData.facebook}
                      onChange={(e) =>
                        setFooterData({
                          ...footerData,
                          facebook: e.target.value,
                        })
                      }
                      className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                      placeholder='https://facebook.com/...'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Instagram
                    </label>
                    <input
                      type='url'
                      value={footerData.instagram}
                      onChange={(e) =>
                        setFooterData({
                          ...footerData,
                          instagram: e.target.value,
                        })
                      }
                      className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                      placeholder='https://instagram.com/...'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      TikTok
                    </label>
                    <input
                      type='url'
                      value={footerData.tiktok}
                      onChange={(e) =>
                        setFooterData({
                          ...footerData,
                          tiktok: e.target.value,
                        })
                      }
                      className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                      placeholder='https://tiktok.com/@...'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      WhatsApp
                    </label>
                    <input
                      type='text'
                      value={footerData.whatsapp}
                      onChange={(e) =>
                        setFooterData({
                          ...footerData,
                          whatsapp: e.target.value,
                        })
                      }
                      className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                      placeholder='https://wa.me/6281234567890'
                    />
                    <p className='text-xs text-gray-500 mt-1'>
                      Format: https://wa.me/628xxxxxxxxxx (62 tanpa +)
                    </p>
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div className='border-t pt-6'>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Copyright Text
                </label>
                <input
                  type='text'
                  value={footerData.copyright}
                  onChange={(e) =>
                    setFooterData({ ...footerData, copyright: e.target.value })
                  }
                  required
                  className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                  placeholder='© 2025 TK Nurul Hasanah. All rights reserved.'
                />
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                disabled={saving}
                className='w-full py-4 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <FaSave size={18} />
                <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
