'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaBullseye } from 'react-icons/fa';
import { getProfile, getValues, getTeachers } from '@/lib/supabase-helpers';

interface ProfileData {
  visi: string;
  misi: string;
}

interface VisionMissionItem {
  icon: React.ElementType;
  title: string;
  color: string;
  description: string;
}

const defaultProfileData: ProfileData = {
  visi: 'Menjadi lembaga pendidikan anak usia dini yang unggul, islami, dan berkarakter, menghasilkan generasi yang cerdas, kreatif, dan berakhlak mulia.',
  misi: 'Menyelenggarakan pendidikan berkualitas dengan metode pembelajaran yang menyenangkan, mengembangkan potensi anak secara optimal, dan menanamkan nilai-nilai keislaman sejak dini.',
};

interface Value {
  id: string | number;
  title: string;
  description: string;
  icon: string;
}

interface ValueWithColor extends Value {
  color: string;
}

// Color mapping berdasarkan index untuk variasi
const colors = [
  '#FFD6E8',
  '#FFEFD5',
  '#CDEFFF',
  '#FFD6E8',
  '#CDEFFF',
  '#FFEFD5',
];

interface Teacher {
  id: string;
  name: string;
  position: string;
  photo: string;
  description: string;
}

const defaultTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Ibu Siti Nurhaliza',
    position: 'Kepala Sekolah',
    photo:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    description: 'Berpengalaman 15 tahun dalam pendidikan anak usia dini',
  },
  {
    id: '2',
    name: 'Ibu Aisyah',
    position: 'Guru Kelas A',
    photo:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    description: 'Lulusan S1 Pendidikan Anak Usia Dini',
  },
];

export default function ProfileSection() {
  const [teachers, setTeachers] = useState<Teacher[]>(defaultTeachers);
  const [values, setValues] = useState<ValueWithColor[]>([]);
  const [visionMission, setVisionMission] = useState<VisionMissionItem[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load profile data (visi & misi) from Supabase
        const profileData = await getProfile();

        if (profileData) {
          // Convert to visionMission array format
          setVisionMission([
            {
              icon: FaEye,
              title: 'Visi',
              color: '#FFEFD5',
              description: profileData.visi,
            },
            {
              icon: FaBullseye,
              title: 'Misi',
              color: '#CDEFFF',
              description: profileData.misi,
            },
          ]);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        // Use default if error
        setVisionMission([
          {
            icon: FaEye,
            title: 'Visi',
            color: '#FFEFD5',
            description: defaultProfileData.visi,
          },
          {
            icon: FaBullseye,
            title: 'Misi',
            color: '#CDEFFF',
            description: defaultProfileData.misi,
          },
        ]);
      }
    };

    const loadTeachersAndValues = async () => {
      try {
        // Load teachers from Supabase
        const teachersData = await getTeachers();
        if (teachersData && teachersData.length > 0) {
          setTeachers(teachersData);
        }

        // Load values from Supabase
        const valuesData = await getValues();
        if (valuesData && valuesData.length > 0) {
          const valuesWithColor: ValueWithColor[] = valuesData.map(
            (value: Value, index: number) => ({
              ...value,
              color: colors[index % colors.length],
            })
          );
          setValues(valuesWithColor);
        }
      } catch (error) {
        console.error('Error loading teachers/values:', error);
        // Use defaults if error
        setTeachers(defaultTeachers);
      }
    };

    loadData();
    loadTeachersAndValues();
  }, []);
  return (
    <section
      id='profil'
      className='py-20 bg-gradient-to-b from-white to-[#FFEFD5]/20'
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
            Profil <span className='text-[#FF6B9D]'>TK Nurul Hasanah</span>
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Mengenal lebih dekat visi, misi, dan nilai-nilai yang kami junjung
            tinggi
          </p>
        </motion.div>

        {/* Vision & Mission */}
        <div className='grid md:grid-cols-2 gap-8 mb-20'>
          {visionMission.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className='relative p-8 rounded-3xl shadow-xl overflow-hidden'
              style={{ backgroundColor: item.color }}
            >
              <div className='relative z-10'>
                <div className='w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg'>
                  <item.icon className='text-3xl text-[#FF6B9D]' />
                </div>
                <h3 className='text-2xl font-bold text-gray-800 mb-4'>
                  {item.title}
                </h3>
                <p className='text-gray-700 leading-relaxed whitespace-pre-line'>
                  {item.description}
                </p>
              </div>
              {/* Decorative Circle */}
              <div className='absolute -right-10 -bottom-10 w-40 h-40 bg-white/30 rounded-full' />
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-20'
        >
          <h3 className='text-3xl font-bold text-center text-gray-800 mb-12'>
            Nilai-Nilai Kami
          </h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {values.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className='p-6 rounded-2xl text-center shadow-lg'
                style={{ backgroundColor: value.color }}
              >
                <div className='text-5xl mb-4'>{value.icon}</div>
                <h4 className='text-xl font-bold text-gray-800 mb-2'>
                  {value.title}
                </h4>
                <p className='text-sm text-gray-700'>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Teachers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className='text-3xl font-bold text-center text-gray-800 mb-12'>
            Tim Pengajar Kami
          </h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {teachers.map((teacher, index) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className='group'
              >
                <div className='relative overflow-hidden rounded-2xl shadow-lg mb-4'>
                  <div className='w-full aspect-[3/4] relative'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={teacher.photo}
                      alt={teacher.name}
                      className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                    />
                  </div>
                  <div className='absolute inset-0 bg-gradient-to-t from-[#FF6B9D]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                </div>
                <h4 className='text-lg font-bold text-gray-800 mb-1'>
                  {teacher.name}
                </h4>
                <p className='text-sm text-[#FF6B9D] font-medium mb-2'>
                  {teacher.position}
                </p>
                <p className='text-xs text-gray-600'>{teacher.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
