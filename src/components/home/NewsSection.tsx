'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendar, FaUser, FaArrowRight, FaTimes } from 'react-icons/fa';
import { supabase, TABLES } from '@/lib/supabase';

interface News {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

const defaultNews: News[] = [
  {
    id: 1,
    title: 'Penerimaan Siswa Baru Tahun Ajaran 2025/2026',
    excerpt:
      'TK Nurul Hasanah membuka pendaftaran siswa baru untuk tahun ajaran 2025/2026. Dapatkan early bird discount!',
    content: '',
    date: '15 Januari 2025',
    author: 'Admin TK',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop',
    category: 'Pengumuman',
  },
  {
    id: 2,
    title: 'Kegiatan Field Trip ke Kebun Binatang',
    excerpt:
      'Anak-anak TK Nurul Hasanah berkunjung ke kebun binatang untuk belajar tentang berbagai hewan dan habitat mereka.',
    content: '',
    date: '10 Januari 2025',
    author: 'Bu Rina',
    image:
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop',
    category: 'Kegiatan',
  },
  {
    id: 3,
    title: 'Workshop Parenting: Mendidik Anak di Era Digital',
    excerpt:
      'Mengundang seluruh orang tua untuk mengikuti workshop parenting tentang pendidikan anak di era digital.',
    content: '',
    date: '5 Januari 2025',
    author: 'Admin TK',
    image:
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&h=400&fit=crop',
    category: 'Event',
  },
  {
    id: 4,
    title: 'Pentas Seni Akhir Semester',
    excerpt:
      'Anak-anak menampilkan berbagai penampilan seni seperti menyanyi, menari, dan drama sebagai penutup semester.',
    content: '',
    date: '28 Desember 2024',
    author: 'Bu Maya',
    image:
      'https://images.unsplash.com/photo-1560087637-bf797bc7796a?w=600&h=400&fit=crop',
    category: 'Kegiatan',
  },
  {
    id: 5,
    title: 'Lomba Mewarnai Tingkat TK Se-Jakarta',
    excerpt:
      'Selamat kepada Adik Alif yang meraih juara 1 lomba mewarnai tingkat TK se-Jakarta!',
    content: '',
    date: '20 Desember 2024',
    author: 'Admin TK',
    image:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
    category: 'Prestasi',
  },
  {
    id: 6,
    title: 'Perayaan Hari Guru Nasional',
    excerpt:
      'TK Nurul Hasanah merayakan Hari Guru Nasional dengan berbagai kegiatan menyenangkan bersama guru-guru tercinta.',
    content: '',
    date: '25 November 2024',
    author: 'Bu Dewi',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop',
    category: 'Event',
  },
];

export default function NewsSection() {
  const [news, setNews] = useState<News[]>([]);
  const [selectedNews, setSelectedNews] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('news-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: TABLES.NEWS,
        },
        () => {
          loadNews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from(TABLES.NEWS)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setNews(data as News[]);
      } else {
        // Insert default news if database is empty
        const { error: insertError } = await supabase
          .from(TABLES.NEWS)
          .insert(defaultNews);

        if (!insertError) {
          setNews(defaultNews);
        }
      }
    } catch (error) {
      console.error('Error loading news:', error);
      setNews(defaultNews);
    } finally {
      setLoading(false);
    }
  };

  const selectedNewsData = news.find((item) => item.id === selectedNews);
  return (
    <section
      id='berita'
      className='py-20 bg-gradient-to-b from-[#FFD6E8]/20 to-white'
    >
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
            Berita & <span className='text-[#FF6B9D]'>Pengumuman</span>
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Update terbaru kegiatan dan informasi dari TK Nurul Hasanah
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className='text-center py-12'>
            <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B9D]'></div>
            <p className='text-gray-600 mt-4'>Memuat berita...</p>
          </div>
        )}

        {/* No News Message */}
        {!loading && news.length === 0 && (
          <div className='text-center py-12 bg-white rounded-2xl shadow-lg'>
            <p className='text-gray-500'>
              Belum ada berita. Silakan tambahkan berita di admin panel.
            </p>
          </div>
        )}

        {/* Featured News */}
        {!loading && news.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mb-12'
          >
            <div className='grid lg:grid-cols-2 gap-8 bg-gradient-to-br from-[#FFEFD5] to-[#FFD6E8] p-8 rounded-3xl shadow-xl'>
              <div
                className='h-80 bg-cover bg-center rounded-2xl shadow-lg'
                style={{ backgroundImage: `url(${news[0].image})` }}
              />
              <div className='flex flex-col justify-center'>
                <span className='inline-block px-4 py-1 bg-[#FF6B9D] text-white text-sm font-semibold rounded-full mb-4 w-fit'>
                  {news[0].category}
                </span>
                <h3 className='text-3xl font-bold text-gray-800 mb-4'>
                  {news[0].title}
                </h3>
                <p className='text-gray-700 mb-6 leading-relaxed'>
                  {news[0].excerpt}
                </p>
                <div className='flex items-center gap-4 text-sm text-gray-600 mb-6'>
                  <span className='flex items-center gap-2'>
                    <FaCalendar className='text-[#FF6B9D]' />
                    {news[0].date}
                  </span>
                  <span className='flex items-center gap-2'>
                    <FaUser className='text-[#FF6B9D]' />
                    {news[0].author}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedNews(news[0].id)}
                  className='flex items-center gap-2 px-6 py-3 bg-white text-[#FF6B9D] font-semibold rounded-full shadow-lg hover:shadow-xl transition-all w-fit'
                >
                  Baca Selengkapnya
                  <FaArrowRight />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* News Grid */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {news.length > 1
            ? news.slice(1).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedNews(item.id)}
                  className='bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer'
                >
                  {/* Image */}
                  <div className='relative h-48 overflow-hidden'>
                    <div
                      className='w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110'
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <span className='absolute top-4 left-4 px-3 py-1 bg-[#FF6B9D] text-white text-xs font-semibold rounded-full'>
                      {item.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className='p-6'>
                    <h4 className='text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#FF6B9D] transition-colors'>
                      {item.title}
                    </h4>
                    <p className='text-gray-600 text-sm mb-4 line-clamp-3'>
                      {item.excerpt}
                    </p>
                    <div className='flex items-center gap-4 text-xs text-gray-500 mb-4'>
                      <span className='flex items-center gap-1'>
                        <FaCalendar className='text-[#FF6B9D]' />
                        {item.date}
                      </span>
                      <span className='flex items-center gap-1'>
                        <FaUser className='text-[#FF6B9D]' />
                        {item.author}
                      </span>
                    </div>
                    <button className='text-[#FF6B9D] font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all'>
                      Lihat Detail
                      <FaArrowRight />
                    </button>
                  </div>
                </motion.div>
              ))
            : news.length === 1 && (
                <div className='col-span-full text-center py-12 text-gray-500'>
                  <p>
                    Hanya ada 1 berita. Tambahkan lebih banyak berita di admin
                    panel.
                  </p>
                </div>
              )}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='text-center mt-12'
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='px-8 py-4 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all'
          >
            Lihat Semua Berita
          </motion.button>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedNews && selectedNewsData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNews(null)}
            className='fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4'
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className='bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedNews(null)}
                className='sticky top-4 left-full ml-4 p-3 bg-[#FF6B9D] text-white rounded-full hover:bg-[#FF8FB3] transition-colors shadow-lg z-10'
              >
                <FaTimes size={20} />
              </button>

              {/* Image */}
              <div className='relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-t-3xl -mt-14'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedNewsData.image}
                  alt={selectedNewsData.title}
                  className='w-full h-auto max-h-[500px] object-contain'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none' />
                <div className='absolute bottom-6 left-6 right-6'>
                  <span className='inline-block px-4 py-2 bg-[#FF6B9D] text-white text-sm font-semibold rounded-full mb-3'>
                    {selectedNewsData.category}
                  </span>
                  <h2 className='text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg'>
                    {selectedNewsData.title}
                  </h2>
                  <div className='flex items-center gap-4 text-sm text-white/90 drop-shadow-lg'>
                    <span className='flex items-center gap-2'>
                      <FaCalendar />
                      {selectedNewsData.date}
                    </span>
                    <span className='flex items-center gap-2'>
                      <FaUser />
                      {selectedNewsData.author}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className='p-8'>
                {/* Excerpt */}
                <div className='mb-6 p-4 bg-gradient-to-r from-[#FFD6E8]/30 to-[#FFEFD5]/30 rounded-xl border-l-4 border-[#FF6B9D]'>
                  <p className='text-lg text-gray-700 font-medium leading-relaxed'>
                    {selectedNewsData.excerpt}
                  </p>
                </div>

                {/* Full Content */}
                {selectedNewsData.content && (
                  <div className='prose prose-lg max-w-none'>
                    <p className='text-gray-700 leading-relaxed whitespace-pre-line'>
                      {selectedNewsData.content}
                    </p>
                  </div>
                )}

                {/* No content message */}
                {!selectedNewsData.content && (
                  <div className='text-center py-8 text-gray-500'>
                    <p>Detail konten belum tersedia.</p>
                  </div>
                )}

                {/* Action Button */}
                <div className='mt-8 pt-6 border-t border-gray-200'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedNews(null)}
                    className='w-full px-6 py-4 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all'
                  >
                    Tutup
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
