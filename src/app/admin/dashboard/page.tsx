'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaUsers, FaNewspaper, FaImages, FaSignOutAlt } from 'react-icons/fa';
import { supabase, TABLES } from '@/lib/supabase';

interface Stats {
  registrations: number;
  news: number;
  gallery: number;
}

interface Registration {
  childName: string;
  childAge: string;
  birthDate: string;
  parentName: string;
  phone: string;
  email: string;
  address: string;
  submittedAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    registrations: 0,
    news: 0,
    gallery: 0,
  });
  const [recentRegistrations, setRecentRegistrations] = useState<
    Registration[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();

    // Subscribe to real-time changes
    const registrationsChannel = supabase
      .channel('dashboard-registrations')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: TABLES.REGISTRATIONS },
        () => {
          loadDashboardData();
        }
      )
      .subscribe();

    const newsChannel = supabase
      .channel('dashboard-news')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: TABLES.NEWS },
        () => {
          loadDashboardData();
        }
      )
      .subscribe();

    const galleryChannel = supabase
      .channel('dashboard-gallery')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: TABLES.GALLERY },
        () => {
          loadDashboardData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(registrationsChannel);
      supabase.removeChannel(newsChannel);
      supabase.removeChannel(galleryChannel);
    };
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch registrations count
      const { count: registrationsCount } = await supabase
        .from(TABLES.REGISTRATIONS)
        .select('*', { count: 'exact', head: true });

      // Fetch news count
      const { count: newsCount } = await supabase
        .from(TABLES.NEWS)
        .select('*', { count: 'exact', head: true });

      // Fetch gallery count
      const { count: galleryCount } = await supabase
        .from(TABLES.GALLERY)
        .select('*', { count: 'exact', head: true });

      // Fetch recent registrations
      const { data: recentData } = await supabase
        .from(TABLES.REGISTRATIONS)
        .select('*')
        .order('submitted_at', { ascending: false })
        .limit(5);

      setStats({
        registrations: registrationsCount || 0,
        news: newsCount || 0,
        gallery: galleryCount || 0,
      });

      if (recentData) {
        setRecentRegistrations(
          recentData.map((reg) => ({
            childName: reg.child_name,
            childAge: reg.child_age,
            birthDate: reg.birth_date,
            parentName: reg.parent_name,
            phone: reg.phone,
            email: reg.email,
            address: reg.address,
            submittedAt: reg.submitted_at,
          }))
        );
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    window.dispatchEvent(new Event('authChange'));
    router.push('/admin/login');
  };

  const statCards = [
    {
      icon: FaUsers,
      label: 'Total Pendaftaran',
      value: stats.registrations,
      color: '#FFEFD5',
      iconColor: '#FF6B9D',
    },
    {
      icon: FaNewspaper,
      label: 'Total Berita',
      value: stats.news,
      color: '#CDEFFF',
      iconColor: '#4A90E2',
    },
    {
      icon: FaImages,
      label: 'Total Foto Galeri',
      value: stats.gallery,
      color: '#FFD6E8',
      iconColor: '#FF6B9D',
    },
  ];

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-6 md:mb-8'
        >
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2'>
                Dashboard
              </h1>
              <p className='text-sm md:text-base text-gray-600'>
                Selamat datang kembali di Admin Panel TK Nurul Hasanah
              </p>
            </div>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl shadow-lg transition-colors whitespace-nowrap'
            >
              <FaSignOutAlt size={16} />
              <span>Logout</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className='text-center py-12'>
            <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B9D]'></div>
            <p className='text-gray-600 mt-4'>Memuat data dashboard...</p>
          </div>
        )}

        {/* Stats Cards */}
        {!loading && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8'>
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className='p-4 md:p-6 rounded-2xl shadow-lg'
                style={{ backgroundColor: stat.color }}
              >
                <div className='flex items-center justify-between mb-3 md:mb-4'>
                  <div
                    className='w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center'
                    style={{ backgroundColor: 'white' }}
                  >
                    <stat.icon size={20} style={{ color: stat.iconColor }} />
                  </div>
                  <span className='text-2xl md:text-3xl font-bold text-gray-800'>
                    {stat.value}
                  </span>
                </div>
                <p className='text-sm md:text-base text-gray-700 font-medium'>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Recent Registrations */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className='bg-white rounded-2xl shadow-lg p-4 md:p-6'
          >
            <h2 className='text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6'>
              Pendaftaran Terbaru
            </h2>
            {recentRegistrations.length > 0 ? (
              <div className='space-y-3 md:space-y-4'>
                {recentRegistrations
                  .reverse()
                  .map((reg: Registration, index: number) => (
                    <div
                      key={index}
                      className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors'
                    >
                      <div className='flex-1'>
                        <h3 className='font-semibold text-gray-800 text-sm md:text-base'>
                          {reg.childName}
                        </h3>
                        <p className='text-xs md:text-sm text-gray-600'>
                          Orang Tua: {reg.parentName}
                        </p>
                        <p className='text-xs text-gray-500'>
                          Usia: {reg.childAge} tahun
                        </p>
                      </div>
                      <div className='sm:text-right'>
                        <p className='text-xs md:text-sm text-gray-600'>
                          {reg.phone}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {new Date(reg.submittedAt).toLocaleDateString(
                            'id-ID'
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className='text-center py-8 md:py-12 text-gray-500'>
                <p className='text-sm md:text-base'>Belum ada pendaftaran</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </AdminLayout>
  );
}
