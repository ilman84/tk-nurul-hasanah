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
  getSchedules,
  getWeeklySchedules,
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

interface Program {
  id: number;
  title: string;
  description: string;
  features: string[];
}

interface ProgramWithUI extends Program {
  icon: any;
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
const getIconAndColor = (title: string): { icon: any; color: string } => {
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

const defaultWeeklySchedule: WeeklySchedule[] = [
  { day: 'Senin', activities: ['Upacara', 'Pembelajaran Dasar', 'Seni'] },
  { day: 'Selasa', activities: ['Olahraga', 'Matematika', 'Musik'] },
  { day: 'Rabu', activities: ['Bahasa', 'Kreativitas', 'Bermain'] },
  { day: 'Kamis', activities: ['Sains', 'Tari', 'Storytelling'] },
  { day: 'Jumat', activities: ['Agama', 'Olahraga', 'Praktik'] },
];

const defaultDailySchedule: Schedule[] = [
  {
    id: '1',
    time: '07.00 - 07.30',
    activity: 'Penyambutan & Bermain Bebas',
    description: 'Siswa disambut dan bermain bebas di playground',
  },
  {
    id: '2',
    time: '07.30 - 08.00',
    activity: 'Circle Time & Doa',
    description: 'Pembukaan, doa bersama, dan pengenalan tema',
  },
  {
    id: '3',
    time: '08.00 - 09.30',
    activity: 'Kegiatan Inti',
    description: 'Aktivitas belajar utama sesuai tema harian',
  },
  {
    id: '4',
    time: '09.30 - 10.00',
    activity: 'Snack Time & Istirahat',
    description: 'Makan snack dan istirahat',
  },
  {
    id: '5',
    time: '10.00 - 11.00',
    activity: 'Kegiatan Lanjutan',
    description: 'Kegiatan tambahan atau praktik',
  },
  {
    id: '6',
    time: '11.00 - 11.30',
    activity: 'Penutup & Doa',
    description: 'Review kegiatan hari ini dan doa penutup',
  },
];

export default function ProgramSection() {
  const [programs, setPrograms] = useState<ProgramWithUI[]>([]);
  const [dailySchedule, setDailySchedule] =
    useState<Schedule[]>(defaultDailySchedule);
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklySchedule[]>(
    defaultWeeklySchedule
  );

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
      } catch (error) {
        console.error('Error loading programs:', error);
      }
    };

    const loadSchedules = async () => {
      try {
        // Load daily schedules from Supabase
        const schedulesData = await getSchedules();
        if (schedulesData && schedulesData.length > 0) {
          setDailySchedule(schedulesData);
        }

        // Load weekly schedules from Supabase
        const weeklyData = await getWeeklySchedules();
        if (weeklyData && weeklyData.length > 0) {
          setWeeklySchedule(weeklyData);
        }
      } catch (error) {
        console.error('Error loading schedules:', error);
      }
    };

    loadData();
    loadSchedules();
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

        {/* Daily Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='max-w-4xl mx-auto'
        >
          <h3 className='text-3xl font-bold text-center text-gray-800 mb-8'>
            Jadwal Kegiatan Harian
          </h3>
          <div className='bg-gradient-to-br from-[#FFEFD5] to-[#FFD6E8] p-8 rounded-3xl shadow-xl'>
            <div className='space-y-4'>
              {weeklySchedule.map((item, index) => (
                <motion.div
                  key={item.day}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className='flex items-start gap-4 p-4 bg-white/70 rounded-2xl hover:bg-white transition-colors'
                >
                  <div className='flex-shrink-0 w-24'>
                    <span className='text-lg font-bold text-[#FF6B9D]'>
                      {item.day}
                    </span>
                  </div>
                  <div className='flex-1'>
                    <div className='flex flex-wrap gap-2'>
                      {item.activities.map((activity) => (
                        <span
                          key={activity}
                          className='px-3 py-1 bg-[#FFD6E8] rounded-full text-sm font-medium text-gray-700'
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Schedule Info */}
            <div className='mt-6 p-4 bg-white/70 rounded-2xl'>
              <h4 className='font-bold text-gray-800 mb-3'>Jam Kegiatan:</h4>
              <div className='space-y-3'>
                {dailySchedule.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className='flex items-start gap-3 p-3 bg-white rounded-xl border-l-4 border-[#FF6B9D]'
                  >
                    <div className='flex-shrink-0 w-32'>
                      <span className='text-sm font-bold text-[#FF6B9D]'>
                        {item.time}
                      </span>
                    </div>
                    <div className='flex-1'>
                      <h5 className='font-semibold text-gray-800 text-sm mb-1'>
                        {item.activity}
                      </h5>
                      <p className='text-xs text-gray-600'>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
