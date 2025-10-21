'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaSave, FaPlus, FaTrash } from 'react-icons/fa';
import {
  getRegistrationInfo,
  updateRegistrationInfo,
} from '@/lib/supabase-helpers';

interface RegistrationInfo {
  title: string;
  subtitle: string;
  requirements: InfoItem[];
  fee: InfoItem;
  period: InfoItem;
}

interface InfoItem {
  title: string;
  description: string;
}

export default function AdminRegistrationInfo() {
  const [regInfo, setRegInfo] = useState<RegistrationInfo>({
    title: 'Pendaftaran Siswa Baru',
    subtitle:
      'Daftarkan putra-putri Anda sekarang untuk tahun ajaran 2025/2026',
    requirements: [
      {
        title: 'Syarat Pendaftaran',
        description: 'Usia minimal 4 tahun, fotokopi KK, akta kelahiran',
      },
    ],
    fee: {
      title: 'Biaya Pendaftaran',
      description: 'Rp 500.000 (sudah termasuk seragam dan buku)',
    },
    period: {
      title: 'Waktu Pendaftaran',
      description: 'Dibuka mulai Januari - Juni 2025',
    },
  });
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInfo = async () => {
      try {
        setLoading(true);
        const data = await getRegistrationInfo();
        if (data) {
          setRegInfo(data);
        }
      } catch (error) {
        console.error('Error loading registration info:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateRegistrationInfo(regInfo);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error('Error saving registration info:', error);
      alert('Gagal menyimpan informasi. Silakan coba lagi.');
    }
  };

  const addRequirement = () => {
    setRegInfo({
      ...regInfo,
      requirements: [...regInfo.requirements, { title: '', description: '' }],
    });
  };

  const updateRequirement = (
    index: number,
    field: 'title' | 'description',
    value: string
  ) => {
    const updated = [...regInfo.requirements];
    updated[index][field] = value;
    setRegInfo({ ...regInfo, requirements: updated });
  };

  const removeRequirement = (index: number) => {
    setRegInfo({
      ...regInfo,
      requirements: regInfo.requirements.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className='flex items-center justify-center py-20'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B9D]'></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className='pb-16 md:pb-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-6'
        >
          <div className='mb-6'>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2'>
              Edit Info Pendaftaran
            </h1>
            <p className='text-sm md:text-base text-gray-600'>
              Kelola informasi section pendaftaran siswa baru di beranda
            </p>
          </div>

          {/* Success Message */}
          {isSaved && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className='mb-6 p-4 bg-green-100 border-2 border-green-300 rounded-xl text-green-700 text-sm'
            >
              ✅ Informasi pendaftaran berhasil disimpan!
            </motion.div>
          )}

          {/* Form */}
          <div className='bg-white rounded-2xl shadow-lg p-4 md:p-6 pb-8'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Header Section */}
              <div className='border-b pb-6'>
                <h3 className='text-lg font-bold text-gray-800 mb-4'>
                  Header Section
                </h3>
                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Judul
                    </label>
                    <input
                      type='text'
                      value={regInfo.title}
                      onChange={(e) =>
                        setRegInfo({ ...regInfo, title: e.target.value })
                      }
                      required
                      className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                      placeholder='Pendaftaran Siswa Baru'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Subtitle
                    </label>
                    <textarea
                      value={regInfo.subtitle}
                      onChange={(e) =>
                        setRegInfo({ ...regInfo, subtitle: e.target.value })
                      }
                      required
                      rows={2}
                      className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors resize-none'
                      placeholder='Deskripsi singkat'
                    />
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className='border-b pb-6'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-bold text-gray-800'>
                    Syarat & Informasi
                  </h3>
                  <button
                    type='button'
                    onClick={addRequirement}
                    className='flex items-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg transition-colors'
                  >
                    <FaPlus size={14} />
                    Tambah
                  </button>
                </div>
                <div className='space-y-4'>
                  {regInfo.requirements.map((req, index) => (
                    <div key={index} className='p-4 bg-gray-50 rounded-xl'>
                      <div className='flex items-start justify-between mb-3'>
                        <span className='text-sm font-semibold text-gray-700'>
                          Item {index + 1}
                        </span>
                        {regInfo.requirements.length > 1 && (
                          <button
                            type='button'
                            onClick={() => removeRequirement(index)}
                            className='p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors'
                          >
                            <FaTrash size={12} />
                          </button>
                        )}
                      </div>
                      <input
                        type='text'
                        value={req.title}
                        onChange={(e) =>
                          updateRequirement(index, 'title', e.target.value)
                        }
                        required
                        className='w-full px-4 py-2 mb-2 text-base border-2 border-gray-200 rounded-lg focus:border-[#FF6B9D] focus:outline-none transition-colors'
                        placeholder='Judul (Contoh: Syarat Pendaftaran)'
                      />
                      <textarea
                        value={req.description}
                        onChange={(e) =>
                          updateRequirement(
                            index,
                            'description',
                            e.target.value
                          )
                        }
                        required
                        rows={2}
                        className='w-full px-4 py-2 text-base border-2 border-gray-200 rounded-lg focus:border-[#FF6B9D] focus:outline-none transition-colors resize-none'
                        placeholder='Deskripsi'
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Fee Info */}
              <div className='border-b pb-6'>
                <h3 className='text-lg font-bold text-gray-800 mb-4'>
                  Biaya Pendaftaran
                </h3>
                <div className='space-y-3'>
                  <input
                    type='text'
                    value={regInfo.fee.title}
                    onChange={(e) =>
                      setRegInfo({
                        ...regInfo,
                        fee: { ...regInfo.fee, title: e.target.value },
                      })
                    }
                    required
                    className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                    placeholder='Judul'
                  />
                  <textarea
                    value={regInfo.fee.description}
                    onChange={(e) =>
                      setRegInfo({
                        ...regInfo,
                        fee: { ...regInfo.fee, description: e.target.value },
                      })
                    }
                    required
                    rows={2}
                    className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors resize-none'
                    placeholder='Deskripsi biaya'
                  />
                </div>
              </div>

              {/* Period Info */}
              <div className='pb-6'>
                <h3 className='text-lg font-bold text-gray-800 mb-4'>
                  Waktu Pendaftaran
                </h3>
                <div className='space-y-3'>
                  <input
                    type='text'
                    value={regInfo.period.title}
                    onChange={(e) =>
                      setRegInfo({
                        ...regInfo,
                        period: { ...regInfo.period, title: e.target.value },
                      })
                    }
                    required
                    className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                    placeholder='Judul'
                  />
                  <textarea
                    value={regInfo.period.description}
                    onChange={(e) =>
                      setRegInfo({
                        ...regInfo,
                        period: {
                          ...regInfo.period,
                          description: e.target.value,
                        },
                      })
                    }
                    required
                    rows={2}
                    className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors resize-none'
                    placeholder='Periode pendaftaran'
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className='pt-4 pb-4'>
                <button
                  type='submit'
                  className='w-full py-4 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 relative z-10'
                >
                  <FaSave size={18} />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
