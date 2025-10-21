'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaEdit, FaSave } from 'react-icons/fa';
import { getProfile, updateProfile } from '@/lib/supabase-helpers';

interface ProfileData {
  visi: string;
  misi: string;
}

const defaultProfile: ProfileData = {
  visi: 'Menjadi lembaga pendidikan anak usia dini yang unggul, islami, dan berkarakter, menghasilkan generasi yang cerdas, kreatif, dan berakhlak mulia.',
  misi: 'Menyelenggarakan pendidikan berkualitas dengan metode pembelajaran yang menyenangkan, mengembangkan potensi anak secara optimal, dan menanamkan nilai-nilai keislaman sejak dini.',
};

export default function ProfileManagement() {
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      if (data) {
        setProfileData({ visi: data.visi, misi: data.misi });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      alert('Gagal memuat data. Periksa koneksi Supabase.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile(profileData);
      setIsEditing(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Gagal menyimpan data. Periksa koneksi Supabase.');
    }
  };

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex items-center justify-between mb-8'
        >
          <div>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>
              Edit Profil Sekolah
            </h1>
            <p className='text-gray-600'>
              Kelola visi dan misi TK Nurul Hasanah
            </p>
          </div>
          <div className='flex gap-3'>
            {isSaved && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className='px-4 py-2 bg-green-100 text-green-700 rounded-lg'
              >
                ✓ Tersimpan
              </motion.div>
            )}
            {!isEditing ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className='px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-lg flex items-center gap-2'
              >
                <FaEdit />
                Edit
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className='px-6 py-3 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white font-semibold rounded-xl shadow-lg flex items-center gap-2'
              >
                <FaSave />
                Simpan
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className='text-center py-12'>
            <div className='inline-block w-12 h-12 border-4 border-[#FF6B9D] border-t-transparent rounded-full animate-spin'></div>
            <p className='mt-4 text-gray-600'>Memuat data...</p>
          </div>
        )}

        {/* Visi & Misi */}
        {!loading && (
          <div className='grid md:grid-cols-2 gap-6 mb-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-white p-6 rounded-2xl shadow-lg'
            >
              <h3 className='text-xl font-bold text-gray-800 mb-4'>Visi</h3>
              {isEditing ? (
                <textarea
                  value={profileData.visi}
                  onChange={(e) =>
                    setProfileData({ ...profileData, visi: e.target.value })
                  }
                  rows={6}
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none resize-none'
                />
              ) : (
                <p className='text-gray-700 leading-relaxed'>
                  {profileData.visi}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className='bg-white p-6 rounded-2xl shadow-lg'
            >
              <h3 className='text-xl font-bold text-gray-800 mb-4'>Misi</h3>
              {isEditing ? (
                <textarea
                  value={profileData.misi}
                  onChange={(e) =>
                    setProfileData({ ...profileData, misi: e.target.value })
                  }
                  rows={6}
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none resize-none'
                />
              ) : (
                <p className='text-gray-700 leading-relaxed'>
                  {profileData.misi}
                </p>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
