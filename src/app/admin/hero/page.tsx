'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import {
  getHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} from '@/lib/supabase-helpers';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
}

const defaultSlides: HeroSlide[] = [
  {
    id: 1,
    title: 'Selamat Datang di TK Nurul Hasanah',
    subtitle: 'Tempat Belajar dan Bermain dengan Ceria!',
    description:
      'Mengembangkan potensi anak melalui pembelajaran yang menyenangkan',
    image:
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&h=600&fit=crop',
    color: '#FFEFD5',
  },
  {
    id: 2,
    title: 'Pembelajaran Kreatif',
    subtitle: 'Belajar Sambil Bermain',
    description:
      'Metode pembelajaran yang interaktif dan menyenangkan untuk si kecil',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=600&fit=crop',
    color: '#CDEFFF',
  },
  {
    id: 3,
    title: 'Fasilitas Lengkap',
    subtitle: 'Lingkungan yang Aman & Nyaman',
    description: 'Ruang kelas modern dengan fasilitas bermain yang lengkap',
    image:
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200&h=600&fit=crop',
    color: '#FFD6E8',
  },
];

export default function HeroManagement() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: '',
    color: '#FFEFD5',
  });

  useEffect(() => {
    loadSlides();
  }, []);

  const loadSlides = async () => {
    try {
      setLoading(true);
      const data = await getHeroSlides();
      if (data && data.length > 0) {
        setSlides(data);
      } else {
        // If no data, insert default slides
        for (const slide of defaultSlides) {
          await createHeroSlide({ ...slide, position: slide.id });
        }
        const newData = await getHeroSlides();
        setSlides(newData);
      }
    } catch (error) {
      console.error('Error loading slides:', error);
      alert('Gagal memuat data. Periksa koneksi Supabase.');
    } finally {
      setLoading(false);
    }
  };

  // Handle file upload and convert to base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran file terlalu besar. Maksimal 2MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData({ ...formData, image: base64String });
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert('Silakan upload gambar terlebih dahulu');
      return;
    }

    try {
      if (editingSlide) {
        // Update existing slide
        await updateHeroSlide(editingSlide.id, formData);
      } else {
        // Create new slide
        await createHeroSlide({
          ...formData,
          position: slides.length + 1,
        });
      }

      await loadSlides();
      closeModal();
      alert(
        editingSlide
          ? 'Slide berhasil diupdate!'
          : 'Slide berhasil ditambahkan!'
      );
    } catch (error) {
      console.error('Error saving slide:', error);
      alert('Gagal menyimpan slide. Periksa koneksi Supabase.');
    }
  };

  const deleteSlide = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus slide ini?')) {
      try {
        await deleteHeroSlide(id);
        await loadSlides();
        alert('Slide berhasil dihapus!');
      } catch (error) {
        console.error('Error deleting slide:', error);
        alert('Gagal menghapus slide. Periksa koneksi Supabase.');
      }
    }
  };

  const openModal = (slide?: HeroSlide) => {
    if (slide) {
      setEditingSlide(slide);
      setFormData({
        title: slide.title,
        subtitle: slide.subtitle,
        description: slide.description,
        image: slide.image,
        color: slide.color,
      });
      setImagePreview(slide.image);
    } else {
      setEditingSlide(null);
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        image: '',
        color: '#FFEFD5',
      });
      setImagePreview('');
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSlide(null);
    setImagePreview('');
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
              Edit Hero Section
            </h1>
            <p className='text-gray-600'>Kelola slider hero di halaman utama</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal()}
            className='px-6 py-3 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white font-semibold rounded-xl shadow-lg flex items-center gap-2'
          >
            <FaPlus />
            Tambah Slide
          </motion.button>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className='text-center py-12'>
            <div className='inline-block w-12 h-12 border-4 border-[#FF6B9D] border-t-transparent rounded-full animate-spin'></div>
            <p className='mt-4 text-gray-600'>Memuat data...</p>
          </div>
        )}

        {/* Slides List */}
        {!loading && (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {slides.map((slide, index) => (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className='bg-white rounded-2xl shadow-lg overflow-hidden'
              >
                <div
                  className='h-48 bg-cover bg-center relative overflow-hidden'
                  style={{ backgroundColor: slide.color }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-bold text-gray-800 mb-2'>
                    {slide.title}
                  </h3>
                  <p className='text-sm text-gray-600 mb-2'>{slide.subtitle}</p>
                  <p className='text-xs text-gray-500 mb-4'>
                    {slide.description}
                  </p>
                  <div className='flex gap-2'>
                    <button
                      onClick={() => openModal(slide)}
                      className='flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2'
                    >
                      <FaEdit />
                      Edit
                    </button>
                    <button
                      onClick={() => deleteSlide(slide.id)}
                      className='flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2'
                    >
                      <FaTrash />
                      Hapus
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'
              >
                <div className='p-8'>
                  <div className='flex items-center justify-between mb-6'>
                    <h2 className='text-2xl font-bold text-gray-800'>
                      {editingSlide ? 'Edit Slide' : 'Tambah Slide Baru'}
                    </h2>
                    <button
                      onClick={closeModal}
                      className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors'
                    >
                      <FaTimes />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                      <label className='block text-gray-700 font-semibold mb-2'>
                        Judul
                      </label>
                      <input
                        type='text'
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none'
                        placeholder='Masukkan judul'
                      />
                    </div>

                    <div>
                      <label className='block text-gray-700 font-semibold mb-2'>
                        Subtitle
                      </label>
                      <input
                        type='text'
                        value={formData.subtitle}
                        onChange={(e) =>
                          setFormData({ ...formData, subtitle: e.target.value })
                        }
                        required
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none'
                        placeholder='Masukkan subtitle'
                      />
                    </div>

                    <div>
                      <label className='block text-gray-700 font-semibold mb-2'>
                        Deskripsi
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        required
                        rows={3}
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none resize-none'
                        placeholder='Masukkan deskripsi'
                      />
                    </div>

                    <div>
                      <label className='block text-gray-700 font-semibold mb-2'>
                        Gambar Hero
                      </label>
                      <div className='space-y-3'>
                        <input
                          type='file'
                          accept='image/*'
                          onChange={handleFileChange}
                          className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FFD6E8] file:text-[#FF6B9D] hover:file:bg-[#FF6B9D] hover:file:text-white'
                        />
                        {imagePreview && (
                          <div className='relative'>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={imagePreview}
                              alt='Preview'
                              className='w-full h-48 object-cover rounded-xl shadow-lg'
                            />
                            <button
                              type='button'
                              onClick={() => {
                                setFormData({ ...formData, image: '' });
                                setImagePreview('');
                              }}
                              className='absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors text-xs'
                            >
                              ✕
                            </button>
                          </div>
                        )}
                        <p className='text-xs text-gray-500'>
                          Format: JPG, PNG, GIF (Max 2MB). Rekomendasi ukuran:
                          1200x600px
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className='block text-gray-700 font-semibold mb-2'>
                        Warna Background
                      </label>
                      <div className='flex gap-3'>
                        <input
                          type='color'
                          value={formData.color}
                          onChange={(e) =>
                            setFormData({ ...formData, color: e.target.value })
                          }
                          className='w-20 h-12 rounded-lg cursor-pointer'
                        />
                        <input
                          type='text'
                          value={formData.color}
                          onChange={(e) =>
                            setFormData({ ...formData, color: e.target.value })
                          }
                          className='flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none'
                          placeholder='#FFEFD5'
                        />
                      </div>
                    </div>

                    <div className='flex gap-3 pt-4'>
                      <button
                        type='button'
                        onClick={closeModal}
                        className='flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors'
                      >
                        Batal
                      </button>
                      <button
                        type='submit'
                        className='flex-1 px-6 py-3 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all'
                      >
                        {editingSlide ? 'Update' : 'Simpan'}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}
