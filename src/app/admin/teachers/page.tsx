'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaChalkboardTeacher, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from '@/lib/supabase-helpers';

interface Teacher {
  id: string | number;
  name: string;
  position: string;
  photo: string;
  description: string;
}

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    photo: '',
    description: '',
  });
  const [photoPreview, setPhotoPreview] = useState<string>('');

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      setLoading(true);
      const data = await getTeachers();
      if (data && data.length > 0) {
        setTeachers(data);
      } else {
        // Insert default teachers if empty
        const defaultTeachers = [
          {
            name: 'Ibu Siti Nurhaliza',
            position: 'Kepala Sekolah',
            photo:
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
            description:
              'Berpengalaman 15 tahun dalam pendidikan anak usia dini',
          },
          {
            name: 'Ibu Aisyah',
            position: 'Guru Kelas A',
            photo:
              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
            description: 'Lulusan S1 Pendidikan Anak Usia Dini',
          },
        ];
        for (const teacher of defaultTeachers) {
          await createTeacher(teacher);
        }
        const newData = await getTeachers();
        setTeachers(newData);
      }
    } catch (error) {
      console.error('Error loading teachers:', error);
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
        setFormData({ ...formData, photo: base64String });
        setPhotoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.photo) {
      alert('Silakan upload foto terlebih dahulu');
      return;
    }

    try {
      if (editingId) {
        await updateTeacher(Number(editingId), formData);
      } else {
        await createTeacher(formData);
      }

      await loadTeachers();
      setFormData({ name: '', position: '', photo: '', description: '' });
      setPhotoPreview('');
      setIsEditing(false);
      setEditingId(null);
      alert(
        editingId ? 'Guru berhasil diupdate!' : 'Guru berhasil ditambahkan!'
      );
    } catch (error) {
      console.error('Error saving teacher:', error);
      alert('Gagal menyimpan guru. Periksa koneksi Supabase.');
    }
  };

  const handleEdit = (teacher: Teacher) => {
    setFormData({
      name: teacher.name,
      position: teacher.position,
      photo: teacher.photo,
      description: teacher.description,
    });
    setPhotoPreview(teacher.photo);
    setEditingId(teacher.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string | number) => {
    if (confirm('Apakah Anda yakin ingin menghapus guru ini?')) {
      try {
        await deleteTeacher(Number(id));
        await loadTeachers();
        alert('Guru berhasil dihapus!');
      } catch (error) {
        console.error('Error deleting teacher:', error);
        alert('Gagal menghapus guru. Periksa koneksi Supabase.');
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
                Tim Pengajar Kami
              </h1>
              <p className='text-sm md:text-base text-gray-600'>
                Kelola data tim pengajar TK Nurul Hasanah
              </p>
            </div>
            <button
              onClick={() => {
                setIsEditing(!isEditing);
                if (isEditing) {
                  setFormData({
                    name: '',
                    position: '',
                    photo: '',
                    description: '',
                  });
                  setPhotoPreview('');
                  setEditingId(null);
                }
              }}
              className='flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all whitespace-nowrap'
            >
              <FaPlus size={16} />
              <span>{isEditing ? 'Batal' : 'Tambah Guru'}</span>
            </button>
          </div>

          {/* Form */}
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-6'
            >
              <h2 className='text-lg md:text-xl font-bold text-gray-800 mb-4'>
                {editingId ? 'Edit Guru' : 'Tambah Guru Baru'}
              </h2>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Foto Guru
                  </label>
                  <div className='space-y-3'>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleFileChange}
                      className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FFD6E8] file:text-[#FF6B9D] hover:file:bg-[#FF6B9D] hover:file:text-white'
                    />
                    {photoPreview && (
                      <div className='relative'>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photoPreview}
                          alt='Preview'
                          className='w-32 h-32 object-cover rounded-xl shadow-lg'
                        />
                        <button
                          type='button'
                          onClick={() => {
                            setFormData({ ...formData, photo: '' });
                            setPhotoPreview('');
                          }}
                          className='absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors text-xs'
                        >
                          ✕
                        </button>
                      </div>
                    )}
                    <p className='text-xs text-gray-500'>
                      Format: JPG, PNG, GIF (Max 2MB)
                    </p>
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Nama Lengkap
                  </label>
                  <input
                    type='text'
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                    placeholder='Nama guru'
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Jabatan
                  </label>
                  <input
                    type='text'
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                    required
                    className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                    placeholder='Contoh: Guru Kelas A'
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
                    placeholder='Deskripsi singkat tentang guru...'
                  />
                </div>
                <button
                  type='submit'
                  className='w-full py-3 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all'
                >
                  {editingId ? 'Update Guru' : 'Simpan Guru'}
                </button>
              </form>
            </motion.div>
          )}

          {/* Loading State */}
          {loading && (
            <div className='text-center py-12'>
              <div className='inline-block w-12 h-12 border-4 border-[#FF6B9D] border-t-transparent rounded-full animate-spin'></div>
              <p className='mt-4 text-gray-600'>Memuat data...</p>
            </div>
          )}

          {/* Teachers List */}
          {!loading && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
              {teachers.map((teacher, index) => (
                <motion.div
                  key={teacher.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow'
                >
                  <div className='text-center'>
                    <div className='w-full h-48 bg-gradient-to-br from-[#FFD6E8] to-[#FFEFD5] overflow-hidden'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={teacher.photo}
                        alt={teacher.name}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='p-6'>
                      <h3 className='text-lg font-bold text-gray-800 mb-1'>
                        {teacher.name}
                      </h3>
                      <p className='text-sm text-[#FF6B9D] font-semibold mb-2'>
                        {teacher.position}
                      </p>
                      <p className='text-sm text-gray-600'>
                        {teacher.description}
                      </p>
                      <div className='flex gap-2 mt-4'>
                        <button
                          onClick={() => handleEdit(teacher)}
                          className='flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors'
                        >
                          <FaEdit size={14} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(teacher.id)}
                          className='flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-colors'
                        >
                          <FaTrash size={14} />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && teachers.length === 0 && (
            <div className='text-center py-12 bg-white rounded-2xl shadow-lg'>
              <FaChalkboardTeacher
                size={48}
                className='mx-auto text-gray-300 mb-4'
              />
              <p className='text-gray-500'>
                Belum ada data guru. Klik &quot;Tambah Guru&quot; untuk
                menambahkan.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
}
