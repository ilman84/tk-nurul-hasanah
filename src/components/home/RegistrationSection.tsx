'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as Toast from '@radix-ui/react-toast';
import {
  FaUser,
  FaChild,
  FaPhone,
  FaEnvelope,
  FaCalendar,
  FaCheckCircle,
} from 'react-icons/fa';
import {
  getRegistrationInfo,
  createRegistration,
} from '@/lib/supabase-helpers';

interface RegistrationForm {
  childName: string;
  childAge: string;
  birthDate: string;
  parentName: string;
  phone: string;
  email: string;
  address: string;
}

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

export default function RegistrationSection() {
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    const loadInfo = async () => {
      try {
        const data = await getRegistrationInfo();
        if (data) {
          setRegInfo(data);
        }
      } catch (error) {
        console.error('Error loading registration info:', error);
      }
    };

    loadInfo();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationForm>();

  const onSubmit = async (data: RegistrationForm) => {
    try {
      // Convert camelCase to snake_case for database
      await createRegistration({
        child_name: data.childName,
        child_age: data.childAge,
        birth_date: data.birthDate,
        parent_name: data.parentName,
        phone: data.phone,
        email: data.email,
        address: data.address,
      });

      setOpen(true);
      reset();
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('Gagal mengirim pendaftaran. Silakan coba lagi.');
    }
  };

  return (
    <Toast.Provider swipeDirection='right'>
      <section
        id='pendaftaran'
        className='py-20 bg-gradient-to-b from-[#CDEFFF]/20 to-[#FFD6E8]/20'
      >
        <div className='container mx-auto px-4'>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-12'
          >
            <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
              {regInfo.title.includes('Siswa Baru') ? (
                <>
                  {regInfo.title.replace('Siswa Baru', '').trim()}{' '}
                  <span className='text-[#FF6B9D]'>Siswa Baru</span>
                </>
              ) : (
                regInfo.title
              )}
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              {regInfo.subtitle}
            </p>
          </motion.div>

          <div className='max-w-5xl mx-auto'>
            <div className='grid lg:grid-cols-2 gap-8 items-start'>
              {/* Info Box */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className='bg-gradient-to-br from-[#FFEFD5] to-[#FFD6E8] p-8 rounded-3xl shadow-xl mb-6'>
                  <h3 className='text-2xl font-bold text-gray-800 mb-6'>
                    Informasi Pendaftaran
                  </h3>
                  <div className='space-y-4 text-gray-700'>
                    {regInfo.requirements.map((req, index) => (
                      <div key={index} className='flex items-start gap-3'>
                        <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                          <span className='text-[#FF6B9D] font-bold'>
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <h4 className='font-semibold mb-1'>{req.title}</h4>
                          <p className='text-sm'>{req.description}</p>
                        </div>
                      </div>
                    ))}
                    <div className='flex items-start gap-3'>
                      <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                        <span className='text-[#FF6B9D] font-bold'>
                          {regInfo.requirements.length + 1}
                        </span>
                      </div>
                      <div>
                        <h4 className='font-semibold mb-1'>
                          {regInfo.fee.title}
                        </h4>
                        <p className='text-sm'>{regInfo.fee.description}</p>
                      </div>
                    </div>
                    <div className='flex items-start gap-3'>
                      <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                        <span className='text-[#FF6B9D] font-bold'>
                          {regInfo.requirements.length + 2}
                        </span>
                      </div>
                      <div>
                        <h4 className='font-semibold mb-1'>
                          {regInfo.period.title}
                        </h4>
                        <p className='text-sm'>{regInfo.period.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='bg-white p-8 rounded-3xl shadow-xl'
                >
                  {/* Child Name */}
                  <div className='mb-6'>
                    <label className='flex items-center gap-2 text-gray-700 font-semibold mb-2'>
                      <FaChild className='text-[#FF6B9D]' />
                      Nama Anak
                    </label>
                    <input
                      {...register('childName', {
                        required: 'Nama anak wajib diisi',
                      })}
                      className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                      placeholder='Masukkan nama lengkap anak'
                    />
                    {errors.childName && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.childName.message}
                      </p>
                    )}
                  </div>

                  {/* Child Age & Birth Date */}
                  <div className='grid grid-cols-2 gap-4 mb-6'>
                    <div>
                      <label className='flex items-center gap-2 text-gray-700 font-semibold mb-2'>
                        <FaCalendar className='text-[#FF6B9D]' />
                        Usia
                      </label>
                      <input
                        {...register('childAge', {
                          required: 'Usia wajib diisi',
                        })}
                        type='number'
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                        placeholder='4'
                      />
                      {errors.childAge && (
                        <p className='text-red-500 text-sm mt-1'>
                          {errors.childAge.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='text-gray-700 font-semibold mb-2 block'>
                        Tanggal Lahir
                      </label>
                      <input
                        {...register('birthDate', {
                          required: 'Tanggal lahir wajib diisi',
                        })}
                        type='date'
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                      />
                      {errors.birthDate && (
                        <p className='text-red-500 text-sm mt-1'>
                          {errors.birthDate.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Parent Name */}
                  <div className='mb-6'>
                    <label className='flex items-center gap-2 text-gray-700 font-semibold mb-2'>
                      <FaUser className='text-[#FF6B9D]' />
                      Nama Orang Tua
                    </label>
                    <input
                      {...register('parentName', {
                        required: 'Nama orang tua wajib diisi',
                      })}
                      className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                      placeholder='Masukkan nama orang tua/wali'
                    />
                    {errors.parentName && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.parentName.message}
                      </p>
                    )}
                  </div>

                  {/* Phone & Email */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                    <div>
                      <label className='flex items-center gap-2 text-gray-700 font-semibold mb-2'>
                        <FaPhone className='text-[#FF6B9D]' />
                        No. Telepon
                      </label>
                      <input
                        {...register('phone', {
                          required: 'Nomor telepon wajib diisi',
                          pattern: {
                            value: /^[0-9]{10,13}$/,
                            message: 'Nomor telepon tidak valid',
                          },
                        })}
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                        placeholder='08123456789'
                      />
                      {errors.phone && (
                        <p className='text-red-500 text-sm mt-1'>
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='flex items-center gap-2 text-gray-700 font-semibold mb-2'>
                        <FaEnvelope className='text-[#FF6B9D]' />
                        Email
                      </label>
                      <input
                        {...register('email', {
                          required: 'Email wajib diisi',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email tidak valid',
                          },
                        })}
                        type='email'
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                        placeholder='email@example.com'
                      />
                      {errors.email && (
                        <p className='text-red-500 text-sm mt-1'>
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className='mb-6'>
                    <label className='text-gray-700 font-semibold mb-2 block'>
                      Alamat
                    </label>
                    <textarea
                      {...register('address', {
                        required: 'Alamat wajib diisi',
                      })}
                      rows={3}
                      className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors resize-none'
                      placeholder='Masukkan alamat lengkap'
                    />
                    {errors.address && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type='submit'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='w-full py-4 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all'
                  >
                    Kirim Pendaftaran
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        <Toast.Root
          className='bg-white rounded-2xl shadow-2xl p-6 border-2 border-green-400 data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:animate-swipeOut'
          open={open}
          onOpenChange={setOpen}
        >
          <div className='flex items-start gap-4'>
            <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
              <FaCheckCircle className='text-2xl text-green-600' />
            </div>
            <div className='flex-1'>
              <Toast.Title className='text-lg font-bold text-gray-800 mb-1'>
                Pendaftaran Berhasil! 🎉
              </Toast.Title>
              <Toast.Description className='text-sm text-gray-600'>
                Terima kasih! Data pendaftaran Anda telah kami terima. Tim kami
                akan menghubungi Anda segera.
              </Toast.Description>
            </div>
          </div>
          <Toast.Action
            className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors'
            asChild
            altText='Close notification'
          >
            <button className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100'>
              ✕
            </button>
          </Toast.Action>
        </Toast.Root>

        <Toast.Viewport className='fixed bottom-0 right-0 flex flex-col p-6 gap-3 w-96 max-w-[100vw] m-0 list-none z-50 outline-none' />
      </section>
    </Toast.Provider>
  );
}
