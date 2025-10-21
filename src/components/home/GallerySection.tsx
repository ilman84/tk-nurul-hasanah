'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { getGallery } from '@/lib/supabase-helpers';

interface GalleryImage {
  id: number | string;
  image: string;
  title: string;
  category: string;
}

const defaultImages: GalleryImage[] = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop',
    title: 'Kegiatan Belajar',
    category: 'pembelajaran',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop',
    title: 'Aktivitas Kreatif',
    category: 'seni',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&h=400&fit=crop',
    title: 'Bermain Bersama',
    category: 'bermain',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1560087637-bf797bc7796a?w=600&h=400&fit=crop',
    title: 'Olahraga Pagi',
    category: 'olahraga',
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
    title: 'Menggambar',
    category: 'seni',
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop',
    title: 'Belajar Angka',
    category: 'pembelajaran',
  },
  {
    id: 7,
    image:
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop',
    title: 'Field Trip',
    category: 'outing',
  },
  {
    id: 8,
    image:
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&h=400&fit=crop',
    title: 'Menari Bersama',
    category: 'seni',
  },
  {
    id: 9,
    image:
      'https://images.unsplash.com/photo-1560087637-bf797bc7796a?w=600&h=400&fit=crop',
    title: 'Bermain di Taman',
    category: 'bermain',
  },
];

const categories = [
  { id: 'all', name: 'Semua' },
  { id: 'pembelajaran', name: 'Pembelajaran' },
  { id: 'seni', name: 'Seni' },
  { id: 'bermain', name: 'Bermain' },
  { id: 'olahraga', name: 'Olahraga' },
  { id: 'outing', name: 'Outing' },
];

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | string | null>(
    null
  );
  const [images, setImages] = useState<GalleryImage[]>(defaultImages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        setLoading(true);
        const data = await getGallery();
        if (data && data.length > 0) {
          setImages(data);
        } else {
          setImages(defaultImages);
        }
      } catch (error) {
        console.error('Error loading gallery:', error);
        setImages(defaultImages);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  const filteredImages =
    selectedCategory === 'all'
      ? images
      : images.filter((img) => img.category === selectedCategory);

  return (
    <section
      id='galeri'
      className='py-20 bg-gradient-to-b from-white to-[#CDEFFF]/20'
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
            Galeri <span className='text-[#FF6B9D]'>Kegiatan</span>
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Dokumentasi kegiatan anak-anak di TK Nurul Hasanah
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='flex flex-wrap justify-center gap-3 mb-12'
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-[#FF6B9D] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-[#FFD6E8]'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        {loading ? (
          <div className='flex items-center justify-center py-20'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B9D]'></div>
          </div>
        ) : (
          <>
            {filteredImages.length === 0 && (
              <div className='text-center py-12 bg-white rounded-2xl shadow-lg'>
                <p className='text-gray-500'>
                  {selectedCategory === 'all'
                    ? 'Belum ada foto. Silakan tambahkan foto di admin panel.'
                    : 'Tidak ada foto dalam kategori ini.'}
                </p>
              </div>
            )}

            <motion.div
              layout
              className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'
            >
              <AnimatePresence>
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -10 }}
                    onClick={() => setSelectedImage(image.id)}
                    className='relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg aspect-[3/4]'
                  >
                    {/* Image */}
                    <div
                      className='w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110'
                      style={{ backgroundImage: `url(${image.image})` }}
                    />

                    {/* Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      <div className='absolute bottom-0 left-0 right-0 p-4'>
                        <h3 className='text-white font-bold text-lg'>
                          {image.title}
                        </h3>
                        <p className='text-white/90 text-sm capitalize'>
                          {image.category}
                        </p>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className='absolute inset-0 flex items-center justify-center bg-[#FF6B9D]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                    >
                      <span className='text-white text-lg font-semibold'>
                        Lihat Foto
                      </span>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4'
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedImage(null)}
              className='absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-[#FFD6E8] transition-colors z-10'
            >
              <FaTimes size={24} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className='max-w-5xl w-full'
            >
              {(() => {
                const image = images.find((img) => img.id === selectedImage);
                return (
                  image && (
                    <div className='bg-white rounded-2xl overflow-hidden shadow-2xl'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.image}
                        alt={image.title}
                        className='w-full h-auto max-h-[80vh] object-contain'
                      />
                      <div className='p-6 bg-gradient-to-r from-[#FFEFD5] to-[#FFD6E8]'>
                        <h3 className='text-2xl font-bold text-gray-800 mb-2'>
                          {image.title}
                        </h3>
                        <p className='text-gray-700 capitalize'>
                          {image.category}
                        </p>
                      </div>
                    </div>
                  )
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
