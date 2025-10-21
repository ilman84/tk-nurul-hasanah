'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaEdit, FaSave } from 'react-icons/fa';
import { supabase, TABLES } from '@/lib/supabase';

interface ContactData {
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  maps_url: string;
  schedule: {
    day: string;
    hours: string;
  }[];
}

const defaultContact: ContactData = {
  address: 'Jl. Pendidikan No. 123, Jakarta Selatan 12345',
  phone: '(021) 1234-5678',
  whatsapp: 'https://wa.me/6281234567890',
  email: 'info@tknurulhasanah.sch.id',
  facebook: 'https://facebook.com/tknurulhasanah',
  instagram: 'https://instagram.com/tknurulhasanah',
  tiktok: 'https://tiktok.com/@tknurulhasanah',
  maps_url:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2179572994757!2d106.82493931476893!3d-6.229728295498379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf5486c4b000!2sMonas!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid',
  schedule: [
    { day: 'Senin - Jumat', hours: '07.00 - 16.00 WIB' },
    { day: 'Sabtu', hours: '07.00 - 12.00 WIB' },
    { day: 'Minggu', hours: 'Libur' },
  ],
};

export default function ContactManagement() {
  const [contactData, setContactData] = useState<ContactData>(defaultContact);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    loadContact();
  }, []);

  const loadContact = async () => {
    try {
      const { data, error } = await supabase
        .from(TABLES.CONTACT)
        .select('*')
        .limit(1)
        .single();

      if (error) throw error;

      if (data) {
        setContactData({
          address: data.address,
          phone: data.phone,
          whatsapp: data.whatsapp,
          email: data.email,
          facebook: data.facebook || '',
          instagram: data.instagram || '',
          tiktok: data.tiktok || '',
          maps_url: data.maps_url || defaultContact.maps_url,
          schedule: data.schedule || defaultContact.schedule,
        });
      }
    } catch (error) {
      console.error('Error loading contact:', error);
    }
  };

  const handleSave = async () => {
    try {
      // Update contact table
      const { error: contactError } = await supabase
        .from(TABLES.CONTACT)
        .upsert({
          id: 1,
          address: contactData.address,
          phone: contactData.phone,
          whatsapp: contactData.whatsapp,
          email: contactData.email,
          facebook: contactData.facebook,
          instagram: contactData.instagram,
          tiktok: contactData.tiktok,
          maps_url: contactData.maps_url,
          schedule: contactData.schedule,
        });

      if (contactError) throw contactError;

      setIsEditing(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error('Error saving contact:', error);
      alert('Gagal menyimpan data kontak. Silakan coba lagi.');
    }
  };

  const updateSchedule = (
    index: number,
    field: 'day' | 'hours',
    value: string
  ) => {
    const newSchedule = [...contactData.schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    setContactData({ ...contactData, schedule: newSchedule });
  };

  const addSchedule = () => {
    setContactData({
      ...contactData,
      schedule: [...contactData.schedule, { day: '', hours: '' }],
    });
  };

  const removeSchedule = (index: number) => {
    const newSchedule = contactData.schedule.filter((_, i) => i !== index);
    setContactData({ ...contactData, schedule: newSchedule });
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
              Edit Informasi Kontak
            </h1>
            <p className='text-gray-600'>
              Kelola informasi kontak dan jam operasional
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

        <div className='grid md:grid-cols-2 gap-6'>
          {/* Informasi Kontak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-white p-6 rounded-2xl shadow-lg'
          >
            <h3 className='text-xl font-bold text-gray-800 mb-4'>
              Informasi Kontak
            </h3>
            <div className='space-y-4'>
              <div>
                <label className='text-sm font-semibold text-gray-700 mb-2 block'>
                  Alamat
                </label>
                {isEditing ? (
                  <textarea
                    value={contactData.address}
                    onChange={(e) =>
                      setContactData({
                        ...contactData,
                        address: e.target.value,
                      })
                    }
                    rows={3}
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none resize-none'
                  />
                ) : (
                  <p className='text-gray-600'>{contactData.address}</p>
                )}
              </div>

              <div>
                <label className='text-sm font-semibold text-gray-700 mb-2 block'>
                  Telepon
                </label>
                {isEditing ? (
                  <input
                    type='text'
                    value={contactData.phone}
                    onChange={(e) =>
                      setContactData({ ...contactData, phone: e.target.value })
                    }
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none'
                  />
                ) : (
                  <p className='text-gray-600'>{contactData.phone}</p>
                )}
              </div>

              <div>
                <label className='text-sm font-semibold text-gray-700 mb-2 block'>
                  WhatsApp
                </label>
                {isEditing ? (
                  <div>
                    <input
                      type='text'
                      value={contactData.whatsapp}
                      onChange={(e) =>
                        setContactData({
                          ...contactData,
                          whatsapp: e.target.value,
                        })
                      }
                      className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none'
                      placeholder='https://wa.me/6281234567890'
                    />
                    <p className='text-xs text-gray-500 mt-1'>
                      Format: https://wa.me/628xxxxxxxxxx (62 tanpa +)
                    </p>
                  </div>
                ) : (
                  <p className='text-gray-600'>{contactData.whatsapp}</p>
                )}
              </div>

              <div>
                <label className='text-sm font-semibold text-gray-700 mb-2 block'>
                  Email
                </label>
                {isEditing ? (
                  <input
                    type='email'
                    value={contactData.email}
                    onChange={(e) =>
                      setContactData({ ...contactData, email: e.target.value })
                    }
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none'
                  />
                ) : (
                  <p className='text-gray-600'>{contactData.email}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='bg-white p-6 rounded-2xl shadow-lg'
          >
            <h3 className='text-xl font-bold text-gray-800 mb-4'>
              Google Maps Lokasi
            </h3>
            <div>
              <label className='text-sm font-semibold text-gray-700 mb-2 block'>
                Google Maps Embed URL
              </label>
              {isEditing ? (
                <div>
                  <textarea
                    value={contactData.maps_url}
                    onChange={(e) =>
                      setContactData({
                        ...contactData,
                        maps_url: e.target.value,
                      })
                    }
                    rows={3}
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none resize-none'
                    placeholder='https://www.google.com/maps/embed?pb=...'
                  />
                  <div className='mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800'>
                    <p className='font-semibold mb-2'>
                      📍 Cara Mendapatkan Embed URL:
                    </p>
                    <ol className='list-decimal list-inside space-y-1'>
                      <li>
                        Buka{' '}
                        <a
                          href='https://www.google.com/maps'
                          target='_blank'
                          rel='noopener noreferrer'
                          className='underline'
                        >
                          Google Maps
                        </a>
                      </li>
                      <li>Cari lokasi TK Nurul Hasanah</li>
                      <li>
                        Klik tombol <strong>&quot;Share&quot;</strong> atau{' '}
                        <strong>&quot;Bagikan&quot;</strong>
                      </li>
                      <li>
                        Pilih tab <strong>&quot;Embed a map&quot;</strong> atau{' '}
                        <strong>&quot;Sematkan peta&quot;</strong>
                      </li>
                      <li>
                        Klik <strong>&quot;Copy HTML&quot;</strong>
                      </li>
                      <li>
                        Paste di sini, lalu{' '}
                        <strong>
                          ambil hanya URL di dalam src=&quot;...&quot;
                        </strong>
                      </li>
                    </ol>
                    <p className='mt-2 text-xs'>
                      Contoh: Dari{' '}
                      <code>
                        &lt;iframe
                        src=&quot;https://www.google.com/maps/embed?pb=...&quot;&gt;
                      </code>{' '}
                      ambil URL-nya saja
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className='text-gray-600 text-sm mb-3 break-all'>
                    {contactData.maps_url}
                  </p>
                  {contactData.maps_url && (
                    <div className='h-64 rounded-xl overflow-hidden'>
                      <iframe
                        src={contactData.maps_url}
                        width='100%'
                        height='100%'
                        style={{ border: 0 }}
                        allowFullScreen
                        loading='lazy'
                        referrerPolicy='no-referrer-when-downgrade'
                        title='Preview Maps'
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Jam Operasional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='bg-white p-6 rounded-2xl shadow-lg'
          >
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-xl font-bold text-gray-800'>
                Jam Operasional
              </h3>
              {isEditing && (
                <button
                  onClick={addSchedule}
                  className='px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600'
                >
                  + Tambah
                </button>
              )}
            </div>
            <div className='space-y-3'>
              {contactData.schedule.map((item, index) => (
                <div
                  key={index}
                  className='border-2 border-gray-200 rounded-xl p-3'
                >
                  {isEditing ? (
                    <div className='space-y-2'>
                      <input
                        type='text'
                        value={item.day}
                        onChange={(e) =>
                          updateSchedule(index, 'day', e.target.value)
                        }
                        className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm'
                        placeholder='Hari'
                      />
                      <input
                        type='text'
                        value={item.hours}
                        onChange={(e) =>
                          updateSchedule(index, 'hours', e.target.value)
                        }
                        className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm'
                        placeholder='Jam'
                      />
                      <button
                        onClick={() => removeSchedule(index)}
                        className='w-full px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600'
                      >
                        Hapus
                      </button>
                    </div>
                  ) : (
                    <div className='flex justify-between'>
                      <span className='font-semibold text-gray-800'>
                        {item.day}
                      </span>
                      <span className='text-gray-600'>{item.hours}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Media Sosial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='bg-white p-6 rounded-2xl shadow-lg md:col-span-2'
          >
            <h3 className='text-xl font-bold text-gray-800 mb-4'>
              Media Sosial
            </h3>
            <div className='grid md:grid-cols-3 gap-4'>
              <div>
                <label className='text-sm font-semibold text-gray-700 mb-2 block'>
                  Facebook URL
                </label>
                {isEditing ? (
                  <input
                    type='url'
                    value={contactData.facebook}
                    onChange={(e) =>
                      setContactData({
                        ...contactData,
                        facebook: e.target.value,
                      })
                    }
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none'
                    placeholder='https://facebook.com/...'
                  />
                ) : (
                  <p className='text-gray-600'>{contactData.facebook}</p>
                )}
              </div>

              <div>
                <label className='text-sm font-semibold text-gray-700 mb-2 block'>
                  Instagram URL
                </label>
                {isEditing ? (
                  <input
                    type='url'
                    value={contactData.instagram}
                    onChange={(e) =>
                      setContactData({
                        ...contactData,
                        instagram: e.target.value,
                      })
                    }
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none'
                    placeholder='https://instagram.com/...'
                  />
                ) : (
                  <p className='text-gray-600'>{contactData.instagram}</p>
                )}
              </div>

              <div>
                <label className='text-sm font-semibold text-gray-700 mb-2 block'>
                  TikTok URL
                </label>
                {isEditing ? (
                  <input
                    type='url'
                    value={contactData.tiktok}
                    onChange={(e) =>
                      setContactData({
                        ...contactData,
                        tiktok: e.target.value,
                      })
                    }
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none'
                    placeholder='https://tiktok.com/@...'
                  />
                ) : (
                  <p className='text-gray-600'>{contactData.tiktok}</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
