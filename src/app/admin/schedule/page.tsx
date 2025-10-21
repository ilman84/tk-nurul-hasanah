'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaClock, FaPlus, FaTrash, FaEdit, FaCalendar } from 'react-icons/fa';
import {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getWeeklySchedules,
  updateWeeklySchedule,
} from '@/lib/supabase-helpers';

interface Schedule {
  id: string | number;
  time: string;
  activity: string;
  description: string;
}

interface WeeklySchedule {
  id?: string | number;
  day: string;
  activities: string[];
}

export default function AdminSchedule() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklySchedule[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    time: '',
    activity: '',
    description: '',
  });
  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [editingDayId, setEditingDayId] = useState<string | number | null>(
    null
  );
  const [weeklyFormData, setWeeklyFormData] = useState({
    day: '',
    activities: [''],
  });

  useEffect(() => {
    loadSchedules();
    loadWeeklySchedules();
  }, []);

  const loadSchedules = async () => {
    try {
      setLoading(true);
      const data = await getSchedules();
      if (data && data.length > 0) {
        setSchedules(data);
      } else {
        // Insert default schedules if empty
        const defaultSchedules = [
          {
            time: '07.00 - 07.30',
            activity: 'Penyambutan & Bermain Bebas',
            description: 'Siswa disambut dan bermain bebas di playground',
          },
          {
            time: '07.30 - 08.00',
            activity: 'Circle Time & Doa',
            description: 'Pembukaan, doa bersama, dan pengenalan tema',
          },
          {
            time: '08.00 - 09.30',
            activity: 'Kegiatan Inti',
            description: 'Aktivitas belajar utama sesuai tema harian',
          },
          {
            time: '09.30 - 10.00',
            activity: 'Snack Time & Istirahat',
            description: 'Makan snack dan istirahat',
          },
          {
            time: '10.00 - 11.00',
            activity: 'Kegiatan Lanjutan',
            description: 'Kegiatan tambahan atau praktik',
          },
          {
            time: '11.00 - 11.30',
            activity: 'Penutup & Doa',
            description: 'Review kegiatan hari ini dan doa penutup',
          },
        ];
        for (const schedule of defaultSchedules) {
          await createSchedule(schedule);
        }
        const newData = await getSchedules();
        setSchedules(newData);
      }
    } catch (error) {
      console.error('Error loading schedules:', error);
      alert('Gagal memuat jadwal. Periksa koneksi Supabase.');
    } finally {
      setLoading(false);
    }
  };

  const loadWeeklySchedules = async () => {
    try {
      const data = await getWeeklySchedules();
      if (data && data.length > 0) {
        setWeeklySchedule(data);
      } else {
        // Data default akan di-insert melalui SQL schema
        setWeeklySchedule([
          {
            day: 'Senin',
            activities: ['Upacara', 'Pembelajaran Dasar', 'Seni'],
          },
          { day: 'Selasa', activities: ['Olahraga', 'Matematika', 'Musik'] },
          { day: 'Rabu', activities: ['Bahasa', 'Kreativitas', 'Bermain'] },
          { day: 'Kamis', activities: ['Sains', 'Tari', 'Storytelling'] },
          { day: 'Jumat', activities: ['Agama', 'Olahraga', 'Praktik'] },
        ]);
      }
    } catch (error) {
      console.error('Error loading weekly schedules:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateSchedule(Number(editingId), formData);
      } else {
        await createSchedule(formData);
      }

      await loadSchedules();
      setFormData({ time: '', activity: '', description: '' });
      setIsEditing(false);
      setEditingId(null);
      alert(
        editingId ? 'Jadwal berhasil diupdate!' : 'Jadwal berhasil ditambahkan!'
      );
    } catch (error) {
      console.error('Error saving schedule:', error);
      alert('Gagal menyimpan jadwal. Periksa koneksi Supabase.');
    }
  };

  const handleEdit = (schedule: Schedule) => {
    setFormData({
      time: schedule.time,
      activity: schedule.activity,
      description: schedule.description,
    });
    setEditingId(schedule.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string | number) => {
    if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
      try {
        await deleteSchedule(Number(id));
        await loadSchedules();
        alert('Jadwal berhasil dihapus!');
      } catch (error) {
        console.error('Error deleting schedule:', error);
        alert('Gagal menghapus jadwal. Periksa koneksi Supabase.');
      }
    }
  };

  // Weekly schedule handlers
  const handleEditWeekly = (day: string) => {
    const schedule = weeklySchedule.find((s) => s.day === day);
    if (schedule) {
      setWeeklyFormData({
        day: schedule.day,
        activities: [...schedule.activities],
      });
      setEditingDay(day);
      setEditingDayId(schedule.id || null);
    }
  };

  const handleSaveWeekly = async () => {
    try {
      if (editingDayId) {
        await updateWeeklySchedule(Number(editingDayId), {
          activities: weeklyFormData.activities.filter((a) => a.trim() !== ''),
        });
        await loadWeeklySchedules();
        alert('Jadwal mingguan berhasil diupdate!');
      }
      setEditingDay(null);
      setEditingDayId(null);
      setWeeklyFormData({ day: '', activities: [''] });
    } catch (error) {
      console.error('Error saving weekly schedule:', error);
      alert('Gagal menyimpan jadwal mingguan. Periksa koneksi Supabase.');
    }
  };

  const handleAddActivity = () => {
    setWeeklyFormData({
      ...weeklyFormData,
      activities: [...weeklyFormData.activities, ''],
    });
  };

  const handleRemoveActivity = (index: number) => {
    setWeeklyFormData({
      ...weeklyFormData,
      activities: weeklyFormData.activities.filter((_, i) => i !== index),
    });
  };

  const handleActivityChange = (index: number, value: string) => {
    const newActivities = [...weeklyFormData.activities];
    newActivities[index] = value;
    setWeeklyFormData({ ...weeklyFormData, activities: newActivities });
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
                Jadwal Kegiatan
              </h1>
              <p className='text-sm md:text-base text-gray-600'>
                Kelola jadwal kegiatan harian dan mingguan siswa
              </p>
            </div>
            {activeTab === 'daily' && (
              <button
                onClick={() => {
                  setIsEditing(!isEditing);
                  if (isEditing) {
                    setFormData({ time: '', activity: '', description: '' });
                    setEditingId(null);
                  }
                }}
                className='flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all whitespace-nowrap'
              >
                <FaPlus size={16} />
                <span>{isEditing ? 'Batal' : 'Tambah Jadwal'}</span>
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className='flex gap-2 mb-6 border-b-2 border-gray-200'>
            <button
              onClick={() => setActiveTab('daily')}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
                activeTab === 'daily'
                  ? 'text-[#FF6B9D] border-b-2 border-[#FF6B9D] -mb-0.5'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaClock />
              <span>Jam Kegiatan Harian</span>
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
                activeTab === 'weekly'
                  ? 'text-[#FF6B9D] border-b-2 border-[#FF6B9D] -mb-0.5'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaCalendar />
              <span>Jadwal Mingguan</span>
            </button>
          </div>

          {/* Daily Schedule Content */}
          {activeTab === 'daily' && (
            <>
              {/* Loading State */}
              {loading && (
                <div className='text-center py-12'>
                  <div className='inline-block w-12 h-12 border-4 border-[#FF6B9D] border-t-transparent rounded-full animate-spin'></div>
                  <p className='mt-4 text-gray-600'>Memuat jadwal...</p>
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
                    {editingId ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}
                  </h2>
                  <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                      <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        Waktu
                      </label>
                      <input
                        type='text'
                        value={formData.time}
                        onChange={(e) =>
                          setFormData({ ...formData, time: e.target.value })
                        }
                        required
                        className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                        placeholder='Contoh: 07.00 - 08.00'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        Nama Kegiatan
                      </label>
                      <input
                        type='text'
                        value={formData.activity}
                        onChange={(e) =>
                          setFormData({ ...formData, activity: e.target.value })
                        }
                        required
                        className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                        placeholder='Nama kegiatan'
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
                        rows={3}
                        className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors resize-none'
                        placeholder='Deskripsi kegiatan...'
                      />
                    </div>
                    <button
                      type='submit'
                      className='w-full py-3 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all'
                    >
                      {editingId ? 'Update Jadwal' : 'Simpan Jadwal'}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Schedule List - Desktop Table View */}
              {!loading && (
                <div className='hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden'>
                  <div className='overflow-x-auto'>
                    <table className='w-full'>
                      <thead className='bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3]'>
                        <tr>
                          <th className='px-4 py-3 text-left text-white text-sm font-semibold'>
                            Waktu
                          </th>
                          <th className='px-4 py-3 text-left text-white text-sm font-semibold'>
                            Kegiatan
                          </th>
                          <th className='px-4 py-3 text-left text-white text-sm font-semibold'>
                            Deskripsi
                          </th>
                          <th className='px-4 py-3 text-center text-white text-sm font-semibold'>
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {schedules.map((schedule, index) => (
                          <tr
                            key={schedule.id}
                            className={
                              index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                            }
                          >
                            <td className='px-4 py-3 text-sm text-gray-800 font-medium whitespace-nowrap'>
                              {schedule.time}
                            </td>
                            <td className='px-4 py-3 text-sm text-gray-800 font-semibold'>
                              {schedule.activity}
                            </td>
                            <td className='px-4 py-3 text-sm text-gray-600'>
                              {schedule.description}
                            </td>
                            <td className='px-4 py-3'>
                              <div className='flex items-center justify-center gap-2'>
                                <button
                                  onClick={() => handleEdit(schedule)}
                                  className='p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors'
                                >
                                  <FaEdit size={14} />
                                </button>
                                <button
                                  onClick={() => handleDelete(schedule.id)}
                                  className='p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors'
                                >
                                  <FaTrash size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Schedule List - Mobile Card View */}
              {!loading && (
                <div className='md:hidden space-y-4'>
                  {schedules.map((schedule, index) => (
                    <motion.div
                      key={schedule.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className='bg-white rounded-xl shadow-lg p-4'
                    >
                      <div className='flex items-start justify-between mb-3'>
                        <div className='flex-1'>
                          <div className='text-xs font-bold text-[#FF6B9D] mb-1'>
                            {schedule.time}
                          </div>
                          <h3 className='text-base font-bold text-gray-800 mb-1'>
                            {schedule.activity}
                          </h3>
                          <p className='text-sm text-gray-600'>
                            {schedule.description}
                          </p>
                        </div>
                      </div>
                      <div className='flex gap-2 pt-3 border-t border-gray-100'>
                        <button
                          onClick={() => handleEdit(schedule)}
                          className='flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors'
                        >
                          <FaEdit size={14} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(schedule.id)}
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

              {!loading && schedules.length === 0 && (
                <div className='text-center py-12 bg-white rounded-2xl shadow-lg'>
                  <FaClock size={48} className='mx-auto text-gray-300 mb-4' />
                  <p className='text-gray-500'>
                    Belum ada jadwal. Klik &quot;Tambah Jadwal&quot; untuk
                    menambahkan.
                  </p>
                </div>
              )}
            </>
          )}

          {/* Weekly Schedule Content */}
          {activeTab === 'weekly' && (
            <div className='space-y-6'>
              {weeklySchedule.map((schedule) => (
                <motion.div
                  key={schedule.day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='bg-white rounded-2xl shadow-lg p-6'
                >
                  <div className='flex items-center justify-between mb-4'>
                    <h3 className='text-xl font-bold text-gray-800'>
                      {schedule.day}
                    </h3>
                    <button
                      onClick={() => handleEditWeekly(schedule.day)}
                      className='flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors'
                    >
                      <FaEdit size={14} />
                      <span>Edit</span>
                    </button>
                  </div>

                  {editingDay === schedule.day ? (
                    <div className='space-y-3'>
                      {weeklyFormData.activities.map((activity, index) => (
                        <div key={index} className='flex gap-2'>
                          <input
                            type='text'
                            value={activity}
                            onChange={(e) =>
                              handleActivityChange(index, e.target.value)
                            }
                            placeholder='Nama aktivitas'
                            className='flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none'
                          />
                          <button
                            onClick={() => handleRemoveActivity(index)}
                            className='p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors'
                            disabled={weeklyFormData.activities.length === 1}
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      ))}
                      <div className='flex gap-2 pt-2'>
                        <button
                          onClick={handleAddActivity}
                          className='flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors'
                        >
                          <FaPlus size={14} />
                          <span>Tambah Aktivitas</span>
                        </button>
                        <button
                          onClick={handleSaveWeekly}
                          className='flex items-center gap-2 px-4 py-2 bg-[#FF6B9D] hover:bg-[#FF8FB3] text-white rounded-lg transition-colors'
                        >
                          Simpan
                        </button>
                        <button
                          onClick={() => {
                            setEditingDay(null);
                            setWeeklyFormData({ day: '', activities: [''] });
                          }}
                          className='flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors'
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className='flex flex-wrap gap-2'>
                      {schedule.activities.map((activity, index) => (
                        <span
                          key={index}
                          className='px-4 py-2 bg-[#FFD6E8] rounded-full text-sm font-medium text-gray-700'
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
}
