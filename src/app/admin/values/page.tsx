'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaHeart, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import {
  getValues,
  createValue,
  updateValue,
  deleteValue,
} from '@/lib/supabase-helpers';

interface Value {
  id: string | number;
  title: string;
  description: string;
  icon: string;
}

// Emoji yang cocok untuk TK
const availableEmojis = [
  '❤️',
  '💖',
  '💗',
  '💕',
  '💝', // Love/Heart
  '🎨',
  '🖌️',
  '✏️',
  '🖍️',
  '📝', // Art/Creativity
  '📚',
  '📖',
  '📕',
  '📗',
  '📘', // Books/Learning
  '🌟',
  '⭐',
  '✨',
  '💫',
  '🌈', // Stars/Rainbow
  '🎵',
  '🎶',
  '🎤',
  '🎸',
  '🥁', // Music
  '⏰',
  '⏱️',
  '⌚',
  '🕐',
  '📅', // Time/Schedule
  '🤝',
  '👫',
  '👨‍👩‍👧‍👦',
  '👶',
  '🧒', // People/Family
  '🏃',
  '⚽',
  '🏀',
  '🎯',
  '🎪', // Sports/Activity
  '🌺',
  '🌸',
  '🌻',
  '🌼',
  '🌷', // Flowers
  '🍎',
  '🍊',
  '🍇',
  '🥕',
  '🥦', // Healthy Food
  '🎁',
  '🎈',
  '🎉',
  '🎊',
  '🎀', // Celebration
  '💡',
  '🔔',
  '🏆',
  '🎓',
  '📢', // Achievement/Ideas
];

export default function AdminValues() {
  const [values, setValues] = useState<Value[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '❤️',
  });

  useEffect(() => {
    loadValues();
  }, []);

  const loadValues = async () => {
    try {
      setLoading(true);
      const data = await getValues();
      if (data && data.length > 0) {
        setValues(data);
      } else {
        // Insert default values if empty
        const defaultValues = [
          {
            title: 'Kasih Sayang',
            description:
              'Memberikan perhatian dan kasih sayang kepada setiap anak',
            icon: '❤️',
          },
          {
            title: 'Kreativitas',
            description: 'Mengembangkan kreativitas dan imajinasi anak',
            icon: '🎨',
          },
          {
            title: 'Kedisiplinan',
            description: 'Menanamkan nilai kedisiplinan sejak dini',
            icon: '⏰',
          },
        ];
        for (const value of defaultValues) {
          await createValue(value);
        }
        const newData = await getValues();
        setValues(newData);
      }
    } catch (error) {
      console.error('Error loading values:', error);
      alert('Gagal memuat data. Periksa koneksi Supabase.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateValue(Number(editingId), formData);
      } else {
        await createValue(formData);
      }

      await loadValues();
      setFormData({ title: '', description: '', icon: '❤️' });
      setIsEditing(false);
      setEditingId(null);
      setShowEmojiPicker(false);
      alert(
        editingId ? 'Nilai berhasil diupdate!' : 'Nilai berhasil ditambahkan!'
      );
    } catch (error) {
      console.error('Error saving value:', error);
      alert('Gagal menyimpan nilai. Periksa koneksi Supabase.');
    }
  };

  const handleEdit = (value: Value) => {
    setFormData({
      title: value.title,
      description: value.description,
      icon: value.icon,
    });
    setEditingId(value.id);
    setIsEditing(true);
    setShowEmojiPicker(false);
  };

  const handleDelete = async (id: string | number) => {
    if (confirm('Apakah Anda yakin ingin menghapus nilai ini?')) {
      try {
        await deleteValue(Number(id));
        await loadValues();
        alert('Nilai berhasil dihapus!');
      } catch (error) {
        console.error('Error deleting value:', error);
        alert('Gagal menghapus nilai. Periksa koneksi Supabase.');
      }
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
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
            <div>
              <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2'>
                Nilai-Nilai Kami
              </h1>
              <p className='text-sm md:text-base text-gray-600'>
                Kelola nilai-nilai yang diterapkan di TK Nurul Hasanah
              </p>
            </div>
            <button
              onClick={() => {
                setIsEditing(!isEditing);
                if (isEditing) {
                  setFormData({ title: '', description: '', icon: '❤️' });
                  setEditingId(null);
                  setShowEmojiPicker(false);
                }
              }}
              className='flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all whitespace-nowrap'
            >
              <FaPlus size={16} />
              <span>{isEditing ? 'Batal' : 'Tambah Nilai'}</span>
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className='text-center py-12'>
              <div className='inline-block w-12 h-12 border-4 border-[#FF6B9D] border-t-transparent rounded-full animate-spin'></div>
              <p className='mt-4 text-gray-600'>Memuat data...</p>
            </div>
          )}

          {/* Form */}
          {!loading && isEditing && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-6'
            >
              <h2 className='text-lg md:text-xl font-bold text-gray-800 mb-4'>
                {editingId ? 'Edit Nilai' : 'Tambah Nilai Baru'}
              </h2>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Icon (Emoji)
                  </label>
                  <div className='space-y-3'>
                    {/* Selected Emoji Display */}
                    <div className='flex items-center gap-3'>
                      <div className='w-20 h-20 bg-gradient-to-br from-[#FFD6E8] to-[#FFEFD5] rounded-xl flex items-center justify-center text-5xl shadow-lg'>
                        {formData.icon}
                      </div>
                      <button
                        type='button'
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className='px-6 py-3 bg-[#FF6B9D] text-white font-semibold rounded-xl hover:bg-[#FF8FB3] transition-colors'
                      >
                        {showEmojiPicker ? 'Tutup Pilihan' : 'Pilih Icon'}
                      </button>
                    </div>

                    {/* Emoji Picker */}
                    {showEmojiPicker && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className='bg-gradient-to-br from-[#FFEFD5] to-[#FFD6E8] p-4 rounded-xl'
                      >
                        <p className='text-sm text-gray-700 font-semibold mb-3'>
                          Pilih emoji yang sesuai:
                        </p>
                        <div className='grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-2 max-h-64 overflow-y-auto'>
                          {availableEmojis.map((emoji, index) => (
                            <button
                              key={index}
                              type='button'
                              onClick={() => {
                                setFormData({ ...formData, icon: emoji });
                                setShowEmojiPicker(false);
                              }}
                              className={`w-10 h-10 flex items-center justify-center text-2xl rounded-lg transition-all hover:scale-125 ${
                                formData.icon === emoji
                                  ? 'bg-[#FF6B9D] shadow-lg scale-110'
                                  : 'bg-white hover:bg-[#FFD6E8]'
                              }`}
                              title={emoji}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Judul Nilai
                  </label>
                  <input
                    type='text'
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                    placeholder='Contoh: Kasih Sayang'
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Deskripsi
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    rows={3}
                    className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors resize-none'
                    placeholder='Deskripsi nilai...'
                  />
                </div>
                <button
                  type='submit'
                  className='w-full py-3 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all'
                >
                  {editingId ? 'Update Nilai' : 'Simpan Nilai'}
                </button>
              </form>
            </motion.div>
          )}

          {/* Values List */}
          {!loading && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
              {values.map((value, index) => (
                <motion.div
                  key={value.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className='bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow'
                >
                  <div className='text-center mb-4'>
                    <div className='text-5xl mb-3'>{value.icon}</div>
                    <h3 className='text-xl font-bold text-gray-800 mb-2'>
                      {value.title}
                    </h3>
                    <p className='text-sm text-gray-600'>{value.description}</p>
                  </div>
                  <div className='flex gap-2 mt-4'>
                    <button
                      onClick={() => handleEdit(value)}
                      className='flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors'
                    >
                      <FaEdit size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(value.id)}
                      className='flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-colors'
                    >
                      <FaTrash size={14} />
                      <span>Hapus</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && values.length === 0 && (
            <div className='text-center py-12 bg-white rounded-2xl shadow-lg'>
              <FaHeart size={48} className='mx-auto text-gray-300 mb-4' />
              <p className='text-gray-500'>
                Belum ada nilai. Klik &quot;Tambah Nilai&quot; untuk
                menambahkan.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
}
