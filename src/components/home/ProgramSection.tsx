'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaBookReader,
  FaPaintBrush,
  FaMusic,
  FaRunning,
  FaGlobeAsia,
  FaBus,
  FaBook,
} from 'react-icons/fa';
import {
  getPrograms,
  getWeeklyActivities,
  getMonthlyActivities,
  getYearlyActivities,
} from '@/lib/supabase-helpers';

interface Activity {
  id: string | number;
  title: string;
  description: string;
}

interface Program {
  id: number;
  title: string;
  description: string;
  features: string[];
}

interface ProgramWithUI extends Program {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
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

// Mapping icon dan color berdasarkan kata kunci di judul
const getIconAndColor = (
  title: string
): { icon: React.ComponentType<{ className?: string }>; color: string } => {
  const lowerTitle = title.toLowerCase();

  if (
    lowerTitle.includes('pembelajaran') ||
    lowerTitle.includes('belajar') ||
    lowerTitle.includes('dasar')
  ) {
    return { icon: FaBookReader, color: '#FFEFD5' };
  }
  if (
    lowerTitle.includes('seni') ||
    lowerTitle.includes('kreativitas') ||
    lowerTitle.includes('lukis')
  ) {
    return { icon: FaPaintBrush, color: '#FFD6E8' };
  }
  if (
    lowerTitle.includes('musik') ||
    lowerTitle.includes('tari') ||
    lowerTitle.includes('menyanyi')
  ) {
    return { icon: FaMusic, color: '#CDEFFF' };
  }
  if (
    lowerTitle.includes('olahraga') ||
    lowerTitle.includes('motorik') ||
    lowerTitle.includes('fisik')
  ) {
    return { icon: FaRunning, color: '#FFEFD5' };
  }
  if (
    lowerTitle.includes('lingkungan') ||
    lowerTitle.includes('alam') ||
    lowerTitle.includes('sosial')
  ) {
    return { icon: FaGlobeAsia, color: '#FFD6E8' };
  }
  if (
    lowerTitle.includes('outing') ||
    lowerTitle.includes('kunjungan') ||
    lowerTitle.includes('field')
  ) {
    return { icon: FaBus, color: '#CDEFFF' };
  }

  // Default
  return { icon: FaBook, color: '#E8F4F8' };
};

export default function ProgramSection() {
  const [programs, setPrograms] = useState<ProgramWithUI[]>([]);
  const [weeklyActivities, setWeeklyActivities] = useState<Activity[]>([]);
  const [monthlyActivities, setMonthlyActivities] = useState<Activity[]>([]);
  const [yearlyActivities, setYearlyActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load programs from Supabase
        const programsData = await getPrograms();
        if (programsData && programsData.length > 0) {
          const programsWithUI: ProgramWithUI[] = programsData.map(
            (program) => {
              const { icon, color } = getIconAndColor(program.title);
              return { ...program, icon, color };
            }
          );
          setPrograms(programsWithUI);
        } else {
          // Use default programs
          const programsWithUI: ProgramWithUI[] = defaultPrograms.map(
            (program) => {
              const { icon, color } = getIconAndColor(program.title);
              return { ...program, icon, color };
            }
          );
          setPrograms(programsWithUI);
        }

        // Load activities from Supabase
        const [weeklyData, monthlyData, yearlyData] = await Promise.all([
          getWeeklyActivities(),
          getMonthlyActivities(),
          getYearlyActivities(),
        ]);

        if (weeklyData) setWeeklyActivities(weeklyData);
        if (monthlyData) setMonthlyActivities(monthlyData);
        if (yearlyData) setYearlyActivities(yearlyData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);
  return (
    <section
      id='program'
      className='py-20 bg-gradient-to-b from-[#FFEFD5]/20 to-white'
    >
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
            Program & <span className='text-[#FF6B9D]'>Kegiatan</span>
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Berbagai program pembelajaran yang dirancang untuk mengembangkan
            potensi anak secara optimal
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20'>
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className='relative p-6 rounded-3xl shadow-xl overflow-hidden group cursor-pointer'
              style={{ backgroundColor: program.color }}
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className='w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-lg'
              >
                <program.icon className='text-3xl text-[#FF6B9D]' />
              </motion.div>

              {/* Content */}
              <h3 className='text-xl font-bold text-gray-800 mb-3'>
                {program.title}
              </h3>
              <p className='text-gray-700 text-sm mb-4 leading-relaxed'>
                {program.description}
              </p>

              {/* Features */}
              <div className='flex flex-wrap gap-2'>
                {program.features.map((feature) => (
                  <span
                    key={feature}
                    className='px-3 py-1 bg-white/70 rounded-full text-xs font-medium text-gray-700'
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Decorative Element */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className='absolute -right-8 -bottom-8 w-32 h-32 bg-white/20 rounded-full'
              />
            </motion.div>
          ))}
        </div>

        {/* Activities Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='max-w-6xl mx-auto'
        >
          <h3 className='text-3xl font-bold text-center text-gray-800 mb-12'>
            Kegiatan Sekolah
          </h3>

          <div className='grid md:grid-cols-3 gap-6'>
            {/* Kegiatan Mingguan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='bg-gradient-to-br from-[#FFEFD5] to-[#FFD6E8] p-6 rounded-3xl shadow-xl'
            >
              <h4 className='text-2xl font-bold text-gray-800 mb-4 text-center'>
                Kegiatan Mingguan
              </h4>
              <div className='space-y-3'>
                {weeklyActivities.length > 0 ? (
                  weeklyActivities
                    .filter((activity) => activity.title.trim() !== '')
                    .map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className='bg-white/80 p-4 rounded-2xl hover:bg-white transition-colors'
                      >
                        <h5 className='font-bold text-gray-800 mb-1 text-sm'>
                          {activity.title}
                        </h5>
                        <p className='text-xs text-gray-600'>
                          {activity.description}
                        </p>
                      </motion.div>
                    ))
                ) : (
                  <p className='text-center text-gray-600 text-sm py-4'>
                    Belum ada kegiatan mingguan
                  </p>
                )}
              </div>
            </motion.div>

            {/* Kegiatan Bulanan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='bg-gradient-to-br from-[#FFD6E8] to-[#CDEFFF] p-6 rounded-3xl shadow-xl'
            >
              <h4 className='text-2xl font-bold text-gray-800 mb-4 text-center'>
                Kegiatan Bulanan
              </h4>
              <div className='space-y-3'>
                {monthlyActivities.length > 0 ? (
                  monthlyActivities
                    .filter((activity) => activity.title.trim() !== '')
                    .map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className='bg-white/80 p-4 rounded-2xl hover:bg-white transition-colors'
                      >
                        <h5 className='font-bold text-gray-800 mb-1 text-sm'>
                          {activity.title}
                        </h5>
                        <p className='text-xs text-gray-600'>
                          {activity.description}
                        </p>
                      </motion.div>
                    ))
                ) : (
                  <p className='text-center text-gray-600 text-sm py-4'>
                    Belum ada kegiatan bulanan
                  </p>
                )}
              </div>
            </motion.div>

            {/* Kegiatan Tahunan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className='bg-gradient-to-br from-[#CDEFFF] to-[#FFEFD5] p-6 rounded-3xl shadow-xl'
            >
              <h4 className='text-2xl font-bold text-gray-800 mb-4 text-center'>
                Kegiatan Tahunan
              </h4>
              <div className='space-y-3'>
                {yearlyActivities.length > 0 ? (
                  yearlyActivities
                    .filter((activity) => activity.title.trim() !== '')
                    .map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className='bg-white/80 p-4 rounded-2xl hover:bg-white transition-colors'
                      >
                        <h5 className='font-bold text-gray-800 mb-1 text-sm'>
                          {activity.title}
                        </h5>
                        <p className='text-xs text-gray-600'>
                          {activity.description}
                        </p>
                      </motion.div>
                    ))
                ) : (
                  <p className='text-center text-gray-600 text-sm py-4'>
                    Belum ada kegiatan tahunan
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
