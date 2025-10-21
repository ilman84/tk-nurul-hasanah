'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaPlus, FaTrash, FaTimes } from 'react-icons/fa';
import {
  getGallery,
  createGallery,
  deleteGallery,
} from '@/lib/supabase-helpers';

interface GalleryImage {
  id: number | string;
  image: string;
  title: string;
  category: string;
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    category: 'pembelajaran',
  });
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      setLoading(true);
      const data = await getGallery();
      setGallery(data);
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert('Silakan upload gambar terlebih dahulu!');
      return;
    }

    try {
      const newImage = await createGallery(formData);
      setGallery([newImage, ...gallery]);
      closeModal();
    } catch (error) {
      console.error('Error creating gallery item:', error);
      alert('Gagal upload foto. Silakan coba lagi.');
    }
  };

  const deleteImage = async (id: number | string) => {
    if (confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
      try {
        await deleteGallery(Number(id));
        const updated = gallery.filter((img) => img.id !== id);
        setGallery(updated);
        setSelectedImage(null);
      } catch (error) {
        console.error('Error deleting gallery item:', error);
        alert('Gagal menghapus foto. Silakan coba lagi.');
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      image: '',
      title: '',
      category: 'pembelajaran',
    });
    setPhotoPreview('');
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran file terlalu besar! Maksimal 2MB.');
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData({ ...formData, image: base64String });
        setPhotoPreview(base64String);
      };

      reader.readAsDataURL(file);
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
              Kelola Galeri
            </h1>
            <p className='text-gray-600'>
              Upload dan kelola foto kegiatan sekolah
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className='px-6 py-3 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white font-semibold rounded-xl shadow-lg flex items-center gap-2'
          >
            <FaPlus />
            Upload Foto
          </motion.button>
        </motion.div>

        {/* Gallery Grid */}
        {loading ? (
          <div className='flex items-center justify-center py-20'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B9D]'></div>
          </div>
        ) : (
          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {gallery.length > 0 ? (
              gallery.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className='relative group'
                >
                  <div
                    onClick={() => setSelectedImage(image)}
                    className='aspect-[4/3] bg-cover bg-center rounded-2xl shadow-lg cursor-pointer overflow-hidden'
                    style={{ backgroundImage: `url(${image.image})` }}
                  >
                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'>
                      <div className='absolute bottom-0 left-0 right-0 p-4'>
                        <h3 className='text-white font-bold'>{image.title}</h3>
                        <p className='text-white/90 text-sm capitalize'>
                          {image.category}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteImage(image.id)}
                    className='absolute top-2 right-2 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg'
                  >
                    <FaTrash />
                  </button>
                </motion.div>
              ))
            ) : (
              <div className='col-span-full text-center py-12 text-gray-500'>
                <p>
                  Belum ada foto. Klik tombol &quot;Upload Foto&quot; untuk
                  menambah foto.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Upload Modal */}
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
                className='bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto'
              >
                <div className='p-6 md:p-8'>
                  <div className='flex items-center justify-between mb-6'>
                    <h2 className='text-2xl font-bold text-gray-800'>
                      Upload Foto Baru
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
                        Upload Gambar
                      </label>

                      {/* Photo Preview */}
                      {photoPreview && (
                        <div className='mb-4'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photoPreview}
                            alt='Preview'
                            className='w-full h-40 object-cover rounded-xl shadow-lg'
                          />
                        </div>
                      )}

                      <label className='flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#FF6B9D] hover:bg-[#FFD6E8]/10 transition-colors'>
                        <div className='text-center'>
                          <svg
                            className='mx-auto h-10 w-10 text-gray-400 mb-2'
                            stroke='currentColor'
                            fill='none'
                            viewBox='0 0 48 48'
                            aria-hidden='true'
                          >
                            <path
                              d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                          <span className='text-sm text-gray-600'>
                            {photoPreview
                              ? 'Klik untuk ganti foto'
                              : 'Klik untuk pilih foto'}
                          </span>
                          <p className='text-xs text-gray-500 mt-1'>
                            PNG, JPG, GIF max 2MB
                          </p>
                        </div>
                        <input
                          type='file'
                          accept='image/*'
                          className='hidden'
                          onChange={handlePhotoChange}
                          required={!photoPreview}
                        />
                      </label>
                    </div>

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
                        placeholder='Masukkan judul foto'
                      />
                    </div>

                    <div>
                      <label className='block text-gray-700 font-semibold mb-2'>
                        Kategori
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none'
                      >
                        <option value='pembelajaran'>Pembelajaran</option>
                        <option value='seni'>Seni</option>
                        <option value='bermain'>Bermain</option>
                        <option value='olahraga'>Olahraga</option>
                        <option value='outing'>Outing</option>
                      </select>
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
                        Upload
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Detail Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className='fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4'
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
                className='max-w-4xl w-full'
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className='absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors'
                >
                  <FaTimes size={20} />
                </button>
                <div className='bg-white rounded-2xl overflow-hidden'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className='w-full h-auto max-h-[70vh] object-contain'
                  />
                  <div className='p-6 bg-gradient-to-r from-[#FFEFD5] to-[#FFD6E8]'>
                    <h3 className='text-2xl font-bold text-gray-800 mb-2'>
                      {selectedImage.title}
                    </h3>
                    <p className='text-gray-700 capitalize'>
                      {selectedImage.category}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}
