'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import {
  getPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
} from '@/lib/supabase-helpers';

interface Program {
  id: number;
  title: string;
  description: string;
  features: string[];
}

const defaultPrograms: Program[] = [
  {
    id: 1,
    title: 'Pembelajaran Dasar',
    description:
      'Mengenalkan huruf, angka, dan keterampilan dasar membaca dengan metode yang menyenangkan',
    features: ['Calistung', 'Bahasa Indonesia', 'Matematika Dasar'],
  },
  {
    id: 2,
    title: 'Seni & Kreativitas',
    description:
      'Mengembangkan kreativitas anak melalui seni lukis, kerajinan tangan, dan aktivitas kreatif',
    features: ['Melukis', 'Kerajinan', 'Kolase'],
  },
  {
    id: 3,
    title: 'Musik & Tari',
    description:
      'Melatih kepekaan seni melalui musik, menyanyi, dan tarian tradisional maupun modern',
    features: ['Menyanyi', 'Tari', 'Alat Musik'],
  },
];

export default function ProgramManagement() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    features: [''],
  });

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      setLoading(true);
      const data = await getPrograms();
      if (data && data.length > 0) {
        setPrograms(data);
      } else {
        // Insert default programs if empty
        for (const program of defaultPrograms) {
          await createProgram(program);
        }
        const newData = await getPrograms();
        setPrograms(newData);
      }
    } catch (error) {
      console.error('Error loading programs:', error);
      alert('Gagal memuat data. Periksa koneksi Supabase.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const programData = {
      ...formData,
      features: formData.features.filter((f) => f.trim() !== ''),
    };

    try {
      if (editingProgram) {
        await updateProgram(editingProgram.id, programData);
      } else {
        await createProgram(programData);
      }

      await loadPrograms();
      closeModal();
      alert(
        editingProgram
          ? 'Program berhasil diupdate!'
          : 'Program berhasil ditambahkan!'
      );
    } catch (error) {
      console.error('Error saving program:', error);
      alert('Gagal menyimpan program. Periksa koneksi Supabase.');
    }
  };

  const deleteProgramHandler = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus program ini?')) {
      try {
        await deleteProgram(id);
        await loadPrograms();
        alert('Program berhasil dihapus!');
      } catch (error) {
        console.error('Error deleting program:', error);
        alert('Gagal menghapus program. Periksa koneksi Supabase.');
      }
    }
  };

  const openModal = (program?: Program) => {
    if (program) {
      setEditingProgram(program);
      setFormData({
        title: program.title,
        description: program.description,
        features: program.features,
      });
    } else {
      setEditingProgram(null);
      setFormData({
        title: '',
        description: '',
        features: [''],
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProgram(null);
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
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
              Edit Program & Kegiatan
            </h1>
            <p className='text-gray-600'>Kelola program pembelajaran sekolah</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal()}
            className='px-6 py-3 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white font-semibold rounded-xl shadow-lg flex items-center gap-2'
          >
            <FaPlus />
            Tambah Program
          </motion.button>
        </motion.div>

        {/* Programs List */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className='bg-white rounded-2xl shadow-lg p-6'
            >
              <h3 className='text-xl font-bold text-gray-800 mb-3'>
                {program.title}
              </h3>
              <p className='text-sm text-gray-600 mb-4'>
                {program.description}
              </p>
              <div className='flex flex-wrap gap-2 mb-4'>
                {program.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className='px-3 py-1 bg-[#FFD6E8] text-gray-700 text-xs font-medium rounded-full'
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <div className='flex gap-2'>
                <button
                  onClick={() => openModal(program)}
                  className='flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2'
                >
                  <FaEdit />
                  Edit
                </button>
                <button
                  onClick={() => deleteProgramHandler(program.id)}
                  className='flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2'
                >
                  <FaTrash />
                  Hapus
                </button>
              </div>
            </motion.div>
          ))}
        </div>

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
                      {editingProgram ? 'Edit Program' : 'Tambah Program Baru'}
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
                        Judul Program
                      </label>
                      <input
                        type='text'
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none'
                        placeholder='Masukkan judul program'
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
                        placeholder='Deskripsi program'
                      />
                    </div>

                    <div>
                      <div className='flex items-center justify-between mb-2'>
                        <label className='block text-gray-700 font-semibold'>
                          Fitur/Kegiatan
                        </label>
                        <button
                          type='button'
                          onClick={addFeature}
                          className='px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600'
                        >
                          + Tambah
                        </button>
                      </div>
                      <div className='space-y-2'>
                        {formData.features.map((feature, index) => (
                          <div key={index} className='flex gap-2'>
                            <input
                              type='text'
                              value={feature}
                              onChange={(e) =>
                                updateFeature(index, e.target.value)
                              }
                              className='flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#FF6B9D] focus:outline-none'
                              placeholder='Nama fitur/kegiatan'
                            />
                            {formData.features.length > 1 && (
                              <button
                                type='button'
                                onClick={() => removeFeature(index)}
                                className='px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'
                              >
                                <FaTrash />
                              </button>
                            )}
                          </div>
                        ))}
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
                        {editingProgram ? 'Update' : 'Simpan'}
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
