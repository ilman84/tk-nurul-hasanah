'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  FaUser,
  FaChild,
  FaPhone,
  FaEnvelope,
  FaCalendar,
  FaMapMarkerAlt,
  FaTrash,
} from 'react-icons/fa';
import { getRegistrations, deleteRegistration } from '@/lib/supabase-helpers';

interface Registration {
  id?: number;
  child_name: string;
  child_age: string;
  birth_date: string;
  parent_name: string;
  phone: string;
  email: string;
  address: string;
  submitted_at?: string;
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = async () => {
    try {
      setLoading(true);
      const data = await getRegistrations();
      setRegistrations(data);
    } catch (error) {
      console.error('Error loading registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus pendaftaran ini?')) {
      try {
        await deleteRegistration(id);
        const updated = registrations.filter((r) => r.id !== id);
        setRegistrations(updated);
        setSelectedReg(null);
      } catch (error) {
        console.error('Error deleting registration:', error);
        alert('Gagal menghapus pendaftaran. Silakan coba lagi.');
      }
    }
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
      <div>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-8'
        >
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>
            Pendaftaran Siswa
          </h1>
          <p className='text-gray-600'>Kelola pendaftaran siswa baru</p>
        </motion.div>

        <div className='grid lg:grid-cols-3 gap-6'>
          {/* List */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-2xl shadow-lg p-6'>
              <h2 className='font-bold text-gray-800 mb-4'>
                Daftar Pendaftaran ({registrations.length})
              </h2>
              <div className='space-y-3 max-h-[600px] overflow-y-auto'>
                {registrations.length > 0 ? (
                  registrations.map((reg, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      onClick={() => setSelectedReg(reg)}
                      className={`p-4 rounded-xl cursor-pointer transition-colors ${
                        selectedReg === reg
                          ? 'bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <h3 className='font-semibold mb-1'>{reg.child_name}</h3>
                      <p
                        className={`text-sm ${
                          selectedReg === reg
                            ? 'text-white/90'
                            : 'text-gray-600'
                        }`}
                      >
                        {reg.parent_name}
                      </p>
                      <p
                        className={`text-xs ${
                          selectedReg === reg
                            ? 'text-white/80'
                            : 'text-gray-500'
                        }`}
                      >
                        {reg.submitted_at &&
                          new Date(reg.submitted_at).toLocaleDateString(
                            'id-ID'
                          )}
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <div className='text-center py-12 text-gray-500'>
                    <p>Belum ada pendaftaran</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Detail */}
          <div className='lg:col-span-2'>
            {selectedReg ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className='bg-white rounded-2xl shadow-lg p-8'
              >
                <div className='flex items-start justify-between mb-6'>
                  <h2 className='text-2xl font-bold text-gray-800'>
                    Detail Pendaftaran
                  </h2>
                  <button
                    onClick={() =>
                      selectedReg?.id && handleDelete(selectedReg.id)
                    }
                    className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2'
                  >
                    <FaTrash />
                    Hapus
                  </button>
                </div>

                <div className='space-y-6'>
                  {/* Child Info */}
                  <div className='p-6 bg-[#FFEFD5] rounded-xl'>
                    <h3 className='font-bold text-gray-800 mb-4 flex items-center gap-2'>
                      <FaChild className='text-[#FF6B9D]' />
                      Data Anak
                    </h3>

                    <div className='grid md:grid-cols-2 gap-4'>
                      <div>
                        <label className='text-sm text-gray-600'>
                          Nama Lengkap
                        </label>
                        <p className='font-semibold text-gray-800'>
                          {selectedReg.child_name}
                        </p>
                      </div>
                      <div>
                        <label className='text-sm text-gray-600'>Usia</label>
                        <p className='font-semibold text-gray-800'>
                          {selectedReg.child_age} tahun
                        </p>
                      </div>
                      <div className='md:col-span-2'>
                        <label className='text-sm text-gray-600'>
                          Tanggal Lahir
                        </label>
                        <p className='font-semibold text-gray-800'>
                          {selectedReg.birth_date}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Parent Info */}
                  <div className='p-6 bg-[#CDEFFF] rounded-xl'>
                    <h3 className='font-bold text-gray-800 mb-4 flex items-center gap-2'>
                      <FaUser className='text-[#4A90E2]' />
                      Data Orang Tua
                    </h3>
                    <div className='grid md:grid-cols-2 gap-4'>
                      <div>
                        <label className='text-sm text-gray-600 flex items-center gap-2'>
                          <FaUser className='text-gray-400' />
                          Nama Lengkap
                        </label>
                        <p className='font-semibold text-gray-800'>
                          {selectedReg.parent_name}
                        </p>
                      </div>
                      <div>
                        <label className='text-sm text-gray-600 flex items-center gap-2'>
                          <FaPhone className='text-gray-400' />
                          No. Telepon
                        </label>
                        <p className='font-semibold text-gray-800'>
                          {selectedReg.phone}
                        </p>
                      </div>
                      <div className='md:col-span-2'>
                        <label className='text-sm text-gray-600 flex items-center gap-2'>
                          <FaEnvelope className='text-gray-400' />
                          Email
                        </label>
                        <p className='font-semibold text-gray-800'>
                          {selectedReg.email}
                        </p>
                      </div>
                      <div className='md:col-span-2'>
                        <label className='text-sm text-gray-600 flex items-center gap-2'>
                          <FaMapMarkerAlt className='text-gray-400' />
                          Alamat
                        </label>
                        <p className='font-semibold text-gray-800'>
                          {selectedReg.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submission Info */}
                  <div className='p-6 bg-[#FFD6E8] rounded-xl'>
                    <h3 className='font-bold text-gray-800 mb-4 flex items-center gap-2'>
                      <FaCalendar className='text-[#FF6B9D]' />
                      Informasi Pendaftaran
                    </h3>
                    <p className='text-gray-700'>
                      Didaftarkan pada:{' '}
                      <span className='font-semibold'>
                        {selectedReg.submitted_at &&
                          new Date(selectedReg.submitted_at).toLocaleString(
                            'id-ID'
                          )}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className='bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center h-full min-h-[400px]'>
                <div className='text-center text-gray-500'>
                  <FaUser className='text-6xl mx-auto mb-4 opacity-30' />
                  <p className='text-lg'>
                    Pilih pendaftaran untuk melihat detail
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
