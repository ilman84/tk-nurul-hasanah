'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { supabase, TABLES } from '@/lib/supabase';

interface News {
  id?: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

export default function NewsPage() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Pengumuman',
    image: '',
  });
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from(TABLES.NEWS)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNewsList((data as News[]) || []);
    } catch (error) {
      console.error('Error loading news:', error);
      const errorMessage =
        error instanceof Error ? error.message : JSON.stringify(error);
      alert(
        `Gagal memuat berita.\n\nError: ${errorMessage}\n\nPastikan table news sudah dibuat di Supabase.`
      );
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
      setSaving(true);

      const newsData = {
        ...formData,
        date: new Date().toLocaleDateString('id-ID'),
        author: 'Admin TK',
      };

      if (editingNews && editingNews.id) {
        // Update existing news
        const { error } = await supabase
          .from(TABLES.NEWS)
          .update(newsData)
          .eq('id', editingNews.id);

        if (error) throw error;
      } else {
        // Insert new news
        const { error } = await supabase.from(TABLES.NEWS).insert([newsData]);

        if (error) throw error;
      }

      await loadNews();
      closeModal();
      alert(
        editingNews
          ? 'Berita berhasil diupdate!'
          : 'Berita berhasil ditambahkan!'
      );
    } catch (error) {
      console.error('Error saving news:', error);
      const errorMessage =
        error instanceof Error ? error.message : JSON.stringify(error);
      alert(
        `Gagal menyimpan berita.\n\nError: ${errorMessage}\n\nPastikan table news sudah dibuat di Supabase.`
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteNews = async (id?: number) => {
    if (!id) {
      alert('ID berita tidak valid');
      return;
    }

    if (!confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      return;
    }

    try {
      const { error } = await supabase.from(TABLES.NEWS).delete().eq('id', id);

      if (error) throw error;

      await loadNews();
      alert('Berita berhasil dihapus!');
    } catch (error) {
      console.error('Error deleting news:', error);
      const errorMessage =
        error instanceof Error ? error.message : JSON.stringify(error);
      alert(
        `Gagal menghapus berita.\n\nError: ${errorMessage}\n\nPastikan table news sudah dibuat di Supabase.`
      );
    }
  };

  const openModal = (news?: News) => {
    if (news) {
      setEditingNews(news);
      setFormData({
        title: news.title,
        excerpt: news.excerpt,
        content: news.content,
        category: news.category,
        image: news.image,
      });
      setPhotoPreview(news.image);
    } else {
      setEditingNews(null);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: 'Pengumuman',
        image: '',
      });
      setPhotoPreview('');
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingNews(null);
    setPhotoPreview('');
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
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
              Kelola Berita
            </h1>
            <p className='text-gray-600'>
              Tambah, edit, atau hapus berita sekolah
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal()}
            className='px-6 py-3 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white font-semibold rounded-xl shadow-lg flex items-center gap-2'
          >
            <FaPlus />
            Tambah Berita
          </motion.button>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className='text-center py-12'>
            <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B9D]'></div>
            <p className='text-gray-600 mt-4'>Memuat berita...</p>
          </div>
        )}

        {/* News List */}
        {!loading && (
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {newsList.length > 0 ? (
              newsList.map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className='bg-white rounded-2xl shadow-lg overflow-hidden'
                >
                  <div
                    className='h-48 bg-cover bg-center'
                    style={{ backgroundImage: `url(${news.image})` }}
                  />
                  <div className='p-6'>
                    <span className='inline-block px-3 py-1 bg-[#FFD6E8] text-[#FF6B9D] text-xs font-semibold rounded-full mb-3'>
                      {news.category}
                    </span>
                    <h3 className='text-lg font-bold text-gray-800 mb-2 line-clamp-2'>
                      {news.title}
                    </h3>
                    <p className='text-sm text-gray-600 mb-4 line-clamp-2'>
                      {news.excerpt}
                    </p>
                    <p className='text-xs text-gray-500 mb-4'>{news.date}</p>
                    <div className='flex gap-2'>
                      <button
                        onClick={() => openModal(news)}
                        className='flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2'
                      >
                        <FaEdit />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteNews(news.id)}
                        className='flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2'
                      >
                        <FaTrash />
                        Hapus
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className='col-span-full text-center py-12 text-gray-500'>
                <p>
                  Belum ada berita. Klik tombol &quot;Tambah Berita&quot; untuk
                  membuat berita baru.
                </p>
              </div>
            )}
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
                <div className='p-6 md:p-8'>
                  <div className='flex items-center justify-between mb-6'>
                    <h2 className='text-2xl font-bold text-gray-800'>
                      {editingNews ? 'Edit Berita' : 'Tambah Berita Baru'}
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
                        placeholder='Masukkan judul berita'
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
                        <option value='Pengumuman'>Pengumuman</option>
                        <option value='Kegiatan'>Kegiatan</option>
                        <option value='Event'>Event</option>
                        <option value='Prestasi'>Prestasi</option>
                      </select>
                    </div>

                    <div>
                      <label className='block text-gray-700 font-semibold mb-2'>
                        Ringkasan
                      </label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) =>
                          setFormData({ ...formData, excerpt: e.target.value })
                        }
                        required
                        rows={2}
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none resize-none'
                        placeholder='Ringkasan singkat berita'
                      />
                    </div>

                    <div>
                      <label className='block text-gray-700 font-semibold mb-2'>
                        Konten
                      </label>
                      <textarea
                        value={formData.content}
                        onChange={(e) =>
                          setFormData({ ...formData, content: e.target.value })
                        }
                        required
                        rows={5}
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none resize-none'
                        placeholder='Isi lengkap berita'
                      />
                    </div>

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
                              ? 'Klik untuk ganti gambar'
                              : 'Klik untuk pilih gambar'}
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
                          required={!photoPreview && !editingNews}
                        />
                      </label>
                    </div>

                    <div className='flex gap-3 pt-4'>
                      <button
                        type='button'
                        onClick={closeModal}
                        disabled={saving}
                        className='flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        Batal
                      </button>
                      <button
                        type='submit'
                        disabled={saving}
                        className='flex-1 px-6 py-3 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        {saving
                          ? 'Menyimpan...'
                          : editingNews
                          ? 'Update'
                          : 'Simpan'}
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
