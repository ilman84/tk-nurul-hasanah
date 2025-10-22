'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  FaCalendar,
  FaPlus,
  FaTrash,
  FaEdit,
  FaSave,
  FaTimes,
} from 'react-icons/fa';
import {
  getWeeklyActivities,
  createWeeklyActivity,
  updateWeeklyActivity,
  deleteWeeklyActivity,
  getMonthlyActivities,
  createMonthlyActivity,
  updateMonthlyActivity,
  deleteMonthlyActivity,
  getYearlyActivities,
  createYearlyActivity,
  updateYearlyActivity,
  deleteYearlyActivity,
} from '@/lib/supabase-helpers';

interface Activity {
  id: string | number;
  title: string;
  description: string;
}

type ActivityType = 'weekly' | 'monthly' | 'yearly';

export default function AdminSchedule() {
  const [activeTab, setActiveTab] = useState<ActivityType>('weekly');
  const [weeklyActivities, setWeeklyActivities] = useState<Activity[]>([]);
  const [monthlyActivities, setMonthlyActivities] = useState<Activity[]>([]);
  const [yearlyActivities, setYearlyActivities] = useState<Activity[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    loadAllActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAllActivities = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadWeeklyActivities(),
        loadMonthlyActivities(),
        loadYearlyActivities(),
      ]);
    } catch (error) {
      console.error('Error loading activities:', error);
      alert('Gagal memuat kegiatan. Periksa koneksi Supabase.');
    } finally {
      setLoading(false);
    }
  };

  const loadWeeklyActivities = async () => {
    try {
      const data = await getWeeklyActivities();
      setWeeklyActivities(data || []);
    } catch (error) {
      console.error('Error loading weekly activities:', error);
    }
  };

  const loadMonthlyActivities = async () => {
    try {
      const data = await getMonthlyActivities();
      setMonthlyActivities(data || []);
    } catch (error) {
      console.error('Error loading monthly activities:', error);
    }
  };

  const loadYearlyActivities = async () => {
    try {
      const data = await getYearlyActivities();
      setYearlyActivities(data || []);
    } catch (error) {
      console.error('Error loading yearly activities:', error);
    }
  };

  const getCurrentActivities = () => {
    switch (activeTab) {
      case 'weekly':
        return weeklyActivities;
      case 'monthly':
        return monthlyActivities;
      case 'yearly':
        return yearlyActivities;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const activityData = {
        title: formData.title,
        description: formData.description,
      };

      if (editingId) {
        // Update existing activity
        switch (activeTab) {
          case 'weekly':
            await updateWeeklyActivity(Number(editingId), activityData);
            await loadWeeklyActivities();
            break;
          case 'monthly':
            await updateMonthlyActivity(Number(editingId), activityData);
            await loadMonthlyActivities();
            break;
          case 'yearly':
            await updateYearlyActivity(Number(editingId), activityData);
            await loadYearlyActivities();
            break;
        }
        alert('Kegiatan berhasil diupdate!');
      } else {
        // Create new activity
        switch (activeTab) {
          case 'weekly':
            await createWeeklyActivity(activityData);
            await loadWeeklyActivities();
            break;
          case 'monthly':
            await createMonthlyActivity(activityData);
            await loadMonthlyActivities();
            break;
          case 'yearly':
            await createYearlyActivity(activityData);
            await loadYearlyActivities();
            break;
        }
        alert('Kegiatan berhasil ditambahkan!');
      }

      setFormData({ title: '', description: '' });
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      console.error('Error saving activity:', error);
      alert('Gagal menyimpan kegiatan. Periksa koneksi Supabase.');
    }
  };

  const handleEdit = (activity: Activity) => {
    setFormData({
      title: activity.title,
      description: activity.description,
    });
    setEditingId(activity.id);
    setIsEditing(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string | number) => {
    if (confirm('Apakah Anda yakin ingin menghapus kegiatan ini?')) {
      try {
        switch (activeTab) {
          case 'weekly':
            await deleteWeeklyActivity(Number(id));
            await loadWeeklyActivities();
            break;
          case 'monthly':
            await deleteMonthlyActivity(Number(id));
            await loadMonthlyActivities();
            break;
          case 'yearly':
            await deleteYearlyActivity(Number(id));
            await loadYearlyActivities();
            break;
        }
        alert('Kegiatan berhasil dihapus!');
      } catch (error) {
        console.error('Error deleting activity:', error);
        alert('Gagal menghapus kegiatan. Periksa koneksi Supabase.');
      }
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '' });
    setIsEditing(false);
    setEditingId(null);
  };

  const getTabLabel = (type: ActivityType) => {
    switch (type) {
      case 'weekly':
        return 'Kegiatan Mingguan';
      case 'monthly':
        return 'Kegiatan Bulanan';
      case 'yearly':
        return 'Kegiatan Tahunan';
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
                Kelola Kegiatan
              </h1>
              <p className='text-sm md:text-base text-gray-600'>
                Kelola kegiatan mingguan, bulanan, dan tahunan
              </p>
            </div>
            <button
              onClick={() => {
                setIsEditing(!isEditing);
                if (isEditing) {
                  handleCancel();
                }
              }}
              className='flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all whitespace-nowrap'
            >
              {isEditing ? (
                <>
                  <FaTimes size={16} />
                  <span>Batal</span>
                </>
              ) : (
                <>
                  <FaPlus size={16} />
                  <span>Tambah Kegiatan</span>
                </>
              )}
            </button>
          </div>

          {/* Tabs */}
          <div className='flex gap-2 mb-6 border-b-2 border-gray-200 overflow-x-auto'>
            {(['weekly', 'monthly', 'yearly'] as ActivityType[]).map((type) => (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`flex items-center gap-2 px-4 md:px-6 py-3 font-semibold transition-all whitespace-nowrap ${
                  activeTab === type
                    ? 'text-[#FF6B9D] border-b-2 border-[#FF6B9D] -mb-0.5'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FaCalendar />
                <span>{getTabLabel(type)}</span>
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className='text-center py-12'>
              <div className='inline-block w-12 h-12 border-4 border-[#FF6B9D] border-t-transparent rounded-full animate-spin'></div>
              <p className='mt-4 text-gray-600'>Memuat kegiatan...</p>
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
                {editingId
                  ? 'Edit Kegiatan'
                  : `Tambah ${getTabLabel(activeTab)}`}
              </h2>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Judul Kegiatan
                  </label>
                  <input
                    type='text'
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                    placeholder='Masukkan judul kegiatan'
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
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
                    rows={4}
                    className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors resize-none'
                    placeholder='Masukkan deskripsi kegiatan...'
                  />
                </div>
                <div className='flex gap-3'>
                  <button
                    type='submit'
                    className='flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all'
                  >
                    <FaSave />
                    <span>
                      {editingId ? 'Update Kegiatan' : 'Simpan Kegiatan'}
                    </span>
                  </button>
                  <button
                    type='button'
                    onClick={handleCancel}
                    className='px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-xl transition-all'
                  >
                    Batal
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Activities List */}
          {!loading && (
            <>
              {/* Desktop View */}
              <div className='hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden'>
                <div className='overflow-x-auto'>
                  <table className='w-full'>
                    <thead className='bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3]'>
                      <tr>
                        <th className='px-4 py-3 text-left text-white text-sm font-semibold w-16'>
                          No.
                        </th>
                        <th className='px-4 py-3 text-left text-white text-sm font-semibold'>
                          Judul Kegiatan
                        </th>
                        <th className='px-4 py-3 text-left text-white text-sm font-semibold'>
                          Deskripsi
                        </th>
                        <th className='px-4 py-3 text-center text-white text-sm font-semibold w-32'>
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {getCurrentActivities().length > 0 ? (
                        getCurrentActivities().map((activity, index) => (
                          <tr
                            key={activity.id}
                            className={
                              index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                            }
                          >
                            <td className='px-4 py-3 text-sm text-gray-600 font-medium'>
                              {index + 1}
                            </td>
                            <td className='px-4 py-3 text-sm text-gray-800 font-semibold'>
                              {activity.title || (
                                <em className='text-gray-400'>Belum diisi</em>
                              )}
                            </td>
                            <td className='px-4 py-3 text-sm text-gray-600'>
                              {activity.description || (
                                <em className='text-gray-400'>Belum diisi</em>
                              )}
                            </td>
                            <td className='px-4 py-3'>
                              <div className='flex items-center justify-center gap-2'>
                                <button
                                  onClick={() => handleEdit(activity)}
                                  className='p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors'
                                  title='Edit'
                                >
                                  <FaEdit size={14} />
                                </button>
                                <button
                                  onClick={() => handleDelete(activity.id)}
                                  className='p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors'
                                  title='Hapus'
                                >
                                  <FaTrash size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={4}
                            className='px-4 py-12 text-center text-gray-500'
                          >
                            <FaCalendar
                              size={48}
                              className='mx-auto text-gray-300 mb-4'
                            />
                            <p>
                              Belum ada kegiatan. Klik &quot;Tambah
                              Kegiatan&quot; untuk menambahkan.
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile View */}
              <div className='md:hidden space-y-4'>
                {getCurrentActivities().length > 0 ? (
                  getCurrentActivities().map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className='bg-white rounded-xl shadow-lg p-4'
                    >
                      <div className='mb-3'>
                        <div className='text-xs font-bold text-[#FF6B9D] mb-1'>
                          Kegiatan #{index + 1}
                        </div>
                        <h3 className='text-base font-bold text-gray-800 mb-2'>
                          {activity.title || (
                            <em className='text-gray-400'>Belum diisi</em>
                          )}
                        </h3>
                        <p className='text-sm text-gray-600'>
                          {activity.description || (
                            <em className='text-gray-400'>Belum diisi</em>
                          )}
                        </p>
                      </div>
                      <div className='flex gap-2 pt-3 border-t border-gray-100'>
                        <button
                          onClick={() => handleEdit(activity)}
                          className='flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors'
                        >
                          <FaEdit size={14} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(activity.id)}
                          className='flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-colors'
                        >
                          <FaTrash size={14} />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className='text-center py-12 bg-white rounded-2xl shadow-lg'>
                    <FaCalendar
                      size={48}
                      className='mx-auto text-gray-300 mb-4'
                    />
                    <p className='text-gray-500'>
                      Belum ada kegiatan. Klik &quot;Tambah Kegiatan&quot; untuk
                      menambahkan.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
}
