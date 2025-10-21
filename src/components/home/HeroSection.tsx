'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import { getHeroSlides } from '@/lib/supabase-helpers';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
}

const defaultSlides: HeroSlide[] = [
  {
    id: 1,
    title: 'Selamat Datang di TK Nurul Hasanah',
    subtitle: 'Tempat Belajar dan Bermain dengan Ceria!',
    description:
      'Mengembangkan potensi anak melalui pembelajaran yang menyenangkan',
    image:
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&h=600&fit=crop',
    color: '#FFEFD5',
  },
  {
    id: 2,
    title: 'Pembelajaran Kreatif',
    subtitle: 'Belajar Sambil Bermain',
    description:
      'Metode pembelajaran yang interaktif dan menyenangkan untuk si kecil',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=600&fit=crop',
    color: '#CDEFFF',
  },
  {
    id: 3,
    title: 'Fasilitas Lengkap',
    subtitle: 'Lingkungan yang Aman & Nyaman',
    description: 'Ruang kelas modern dengan fasilitas bermain yang lengkap',
    image:
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200&h=600&fit=crop',
    color: '#FFD6E8',
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [slidesData, setSlidesData] = useState<HeroSlide[]>(defaultSlides);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load slides from Supabase
    const loadSlides = async () => {
      try {
        const data = await getHeroSlides();
        if (data && data.length > 0) {
          setSlidesData(data);
        } else {
          setSlidesData(defaultSlides);
        }
      } catch (error) {
        console.error('Error loading slides:', error);
        setSlidesData(defaultSlides);
      } finally {
        setLoading(false);
      }
    };

    loadSlides();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  }, [slidesData]);

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slidesData.length) % slidesData.length
    );
  };

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [autoPlay, nextSlide]);

  if (loading) {
    return (
      <section className='relative h-screen min-h-[600px] overflow-hidden bg-gradient-to-br from-[#FFEFD5] via-[#CDEFFF] to-[#FFD6E8] flex items-center justify-center'>
        <div className='text-center'>
          <div className='inline-block w-16 h-16 border-4 border-white border-t-[#FF6B9D] rounded-full animate-spin'></div>
          <p className='mt-4 text-white text-lg font-semibold'>Memuat...</p>
        </div>
      </section>
    );
  }

  return (
    <section className='relative h-screen min-h-[600px] overflow-hidden'>
      {/* Slides */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.7 }}
          className='absolute inset-0'
          style={{ backgroundColor: slidesData[currentSlide].color }}
        >
          {/* Background Image with Overlay */}
          <div className='absolute inset-0'>
            <div
              className='w-full h-full bg-cover bg-center'
              style={{
                backgroundImage: `url(${slidesData[currentSlide].image})`,
              }}
            />
            <div className='absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent' />
          </div>

          {/* Content */}
          <div className='relative h-full flex items-center z-10'>
            <div className='container mx-auto px-4'>
              <div className='max-w-3xl'>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className='relative z-20'
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                    className='inline-block mb-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full'
                  >
                    <span className='text-sm font-semibold text-[#FF6B9D]'>
                      ✨ Tahun Ajaran 2025/2026
                    </span>
                  </motion.div>

                  <h1 className='text-4xl md:text-6xl font-bold text-white mb-4 leading-tight'>
                    {slidesData[currentSlide].title}
                  </h1>

                  <h2 className='text-2xl md:text-3xl text-white/95 mb-6 font-medium'>
                    {slidesData[currentSlide].subtitle}
                  </h2>

                  <p className='text-lg text-white/90 mb-8 max-w-2xl'>
                    {slidesData[currentSlide].description}
                  </p>

                  <div className='flex flex-wrap gap-4 relative z-30'>
                    <motion.div
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 10,
                      }}
                      className='relative z-30'
                    >
                      <Link
                        href='#pendaftaran'
                        onClick={(e) => {
                          e.preventDefault();
                          document
                            .getElementById('pendaftaran')
                            ?.scrollIntoView({
                              behavior: 'smooth',
                              block: 'start',
                            });
                        }}
                        className='inline-block px-8 py-4 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-[0_20px_50px_rgba(255,107,157,0.5)] hover:from-[#FF8FB3] hover:to-[#FF6B9D] transition-all duration-300 transform hover:brightness-110 cursor-pointer relative z-30'
                      >
                        🎓 Daftar Sekarang
                      </Link>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 10,
                      }}
                      className='relative z-30'
                    >
                      <Link
                        href='#profil'
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById('profil')?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                          });
                        }}
                        className='inline-block px-8 py-4 bg-white/90 backdrop-blur-sm text-gray-800 font-bold text-lg rounded-full shadow-2xl hover:shadow-[0_20px_50px_rgba(255,255,255,0.8)] hover:bg-white transition-all duration-300 transform hover:scale-105 cursor-pointer relative z-30'
                      >
                        👀 Lihat Profil
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          prevSlide();
          setAutoPlay(false);
        }}
        className='absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-all shadow-lg z-20'
      >
        <FaChevronLeft size={20} />
      </button>

      <button
        onClick={() => {
          nextSlide();
          setAutoPlay(false);
        }}
        className='absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-all shadow-lg z-20'
      >
        <FaChevronRight size={20} />
      </button>

      {/* Dots Indicator */}
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20'>
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setAutoPlay(false);
            }}
            className={`transition-all rounded-full ${
              index === currentSlide
                ? 'w-12 h-3 bg-white'
                : 'w-3 h-3 bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className='absolute top-20 right-10 w-20 h-20 bg-[#FFD6E8] rounded-full opacity-60 blur-xl'
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className='absolute bottom-32 left-20 w-32 h-32 bg-[#CDEFFF] rounded-full opacity-60 blur-xl'
      />
    </section>
  );
}
