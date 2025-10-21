'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaClock,
  FaFacebook,
  FaInstagram,
} from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa';
import { supabase, TABLES } from '@/lib/supabase';

interface ContactData {
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  maps_url?: string;
  schedule?: Array<{ day: string; hours: string }>;
}

export default function ContactSection() {
  const [contactData, setContactData] = useState<ContactData>({
    address: 'Jl. Pendidikan No. 123, Jakarta Selatan 12345',
    phone: '(021) 1234-5678',
    email: 'info@tknurulhasanah.sch.id',
    whatsapp: 'https://wa.me/6281234567890',
    facebook: '',
    instagram: '',
    tiktok: '',
    maps_url:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2179572994757!2d106.82493931476893!3d-6.229728295498379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf5486c4b000!2sMonas!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid',
    schedule: [
      { day: 'Senin - Jumat', hours: '07.00 - 16.00 WIB' },
      { day: 'Sabtu', hours: '07.00 - 12.00 WIB' },
      { day: 'Minggu', hours: 'Libur' },
    ],
  });

  useEffect(() => {
    loadContact();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('contact-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: TABLES.CONTACT,
        },
        () => {
          loadContact();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadContact = async () => {
    try {
      const { data, error } = await supabase
        .from(TABLES.CONTACT)
        .select('*')
        .limit(1)
        .single();

      if (error) throw error;

      if (data) {
        setContactData({
          address: data.address,
          phone: data.phone,
          email: data.email,
          whatsapp: data.whatsapp || '',
          facebook: data.facebook || '',
          instagram: data.instagram || '',
          tiktok: data.tiktok || '',
          maps_url: data.maps_url || contactData.maps_url,
          schedule: data.schedule || contactData.schedule,
        });
      }
    } catch (error) {
      console.error('Error loading contact:', error);
    }
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Alamat',
      content: contactData.address,
      color: '#FFEFD5',
    },
    {
      icon: FaPhone,
      title: 'Telepon',
      content: contactData.phone,
      link: `tel:${contactData.phone.replace(/\D/g, '')}`,
      color: '#CDEFFF',
    },
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      content: contactData.whatsapp.replace(/\D/g, ''),
      link: contactData.whatsapp.includes('http')
        ? contactData.whatsapp
        : `https://wa.me/${contactData.whatsapp.replace(/\D/g, '')}`,
      color: '#FFD6E8',
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      content: contactData.email,
      link: `mailto:${contactData.email}`,
      color: '#FFEFD5',
    },
  ];
  return (
    <section
      id='kontak'
      className='py-20 bg-gradient-to-b from-white to-[#FFEFD5]/20'
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
            Hubungi <span className='text-[#FF6B9D]'>Kami</span>
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Jangan ragu untuk menghubungi kami. Kami siap membantu Anda!
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-12 items-start'>
          {/* Contact Info */}
          <div>
            <div className='grid sm:grid-cols-2 gap-4 mb-8'>
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {info.link ? (
                    <a
                      href={info.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='block p-6 rounded-2xl shadow-lg transition-all hover:shadow-xl'
                      style={{ backgroundColor: info.color }}
                    >
                      <div className='w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4'>
                        <info.icon className='text-2xl text-[#FF6B9D]' />
                      </div>
                      <h4 className='font-bold text-gray-800 mb-2'>
                        {info.title}
                      </h4>
                      <p className='text-gray-700 text-sm'>{info.content}</p>
                    </a>
                  ) : (
                    <div
                      className='p-6 rounded-2xl shadow-lg'
                      style={{ backgroundColor: info.color }}
                    >
                      <div className='w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4'>
                        <info.icon className='text-2xl text-[#FF6B9D]' />
                      </div>
                      <h4 className='font-bold text-gray-800 mb-2'>
                        {info.title}
                      </h4>
                      <p className='text-gray-700 text-sm'>{info.content}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='bg-gradient-to-br from-[#CDEFFF] to-[#FFD6E8] p-8 rounded-2xl shadow-lg mb-8'
            >
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-12 h-12 bg-white rounded-xl flex items-center justify-center'>
                  <FaClock className='text-2xl text-[#FF6B9D]' />
                </div>
                <h4 className='text-xl font-bold text-gray-800'>
                  Jam Operasional
                </h4>
              </div>
              <div className='space-y-3'>
                {contactData.schedule?.map((item, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-center p-3 bg-white/70 rounded-xl'
                  >
                    <span className='font-semibold text-gray-800'>
                      {item.day}
                    </span>
                    <span className='text-gray-700'>{item.hours}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='flex items-center gap-4 flex-wrap'
            >
              <span className='font-semibold text-gray-800'>Ikuti Kami:</span>
              {contactData.facebook && (
                <motion.a
                  href={contactData.facebook}
                  target='_blank'
                  rel='noopener noreferrer'
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className='w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all'
                  title='Facebook'
                >
                  <FaFacebook size={20} />
                </motion.a>
              )}
              {contactData.instagram && (
                <motion.a
                  href={contactData.instagram}
                  target='_blank'
                  rel='noopener noreferrer'
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className='w-12 h-12 bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all'
                  title='Instagram'
                >
                  <FaInstagram size={20} />
                </motion.a>
              )}
              {contactData.tiktok && (
                <motion.a
                  href={contactData.tiktok}
                  target='_blank'
                  rel='noopener noreferrer'
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className='w-12 h-12 bg-black rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all'
                  title='TikTok'
                >
                  <FaTiktok size={20} />
                </motion.a>
              )}
            </motion.div>
          </div>

          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='h-full min-h-[500px]'
          >
            <div className='h-full rounded-2xl overflow-hidden shadow-xl'>
              {contactData.maps_url ? (
                <iframe
                  src={contactData.maps_url}
                  width='100%'
                  height='100%'
                  style={{ border: 0 }}
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  title='TK Nurul Hasanah Location'
                />
              ) : (
                <div className='h-full flex items-center justify-center bg-gray-100'>
                  <p className='text-gray-500'>
                    Maps belum diatur. Silakan atur di admin panel.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
