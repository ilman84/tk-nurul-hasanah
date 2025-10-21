'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function AdminLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulasi login
    setTimeout(() => {
      if (
        email === 'tknurulhasanah@gmail.com' &&
        password === 'tknurulhasanah111'
      ) {
        localStorage.setItem('adminAuth', 'true');
        // Dispatch custom event to notify navbar
        window.dispatchEvent(new Event('authChange'));
        router.push('/admin/dashboard');
      } else {
        setError('Email atau password salah!');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFEFD5] via-[#CDEFFF] to-[#FFD6E8] p-4'>
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
        className='absolute top-20 right-10 w-32 h-32 bg-[#FFD6E8] rounded-full opacity-40 blur-3xl pointer-events-none'
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
        className='absolute bottom-32 left-20 w-40 h-40 bg-[#CDEFFF] rounded-full opacity-40 blur-3xl pointer-events-none'
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='w-full max-w-md relative z-10'
      >
        <div className='bg-white rounded-3xl shadow-2xl p-8 md:p-12'>
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className='flex justify-center mb-8'
          >
            <div className='w-20 h-20 bg-gradient-to-br from-[#FFD6E8] to-[#FFEFD5] rounded-full flex items-center justify-center shadow-lg'>
              <span className='text-4xl font-bold text-[#FF6B9D]'>N</span>
            </div>
          </motion.div>

          {/* Title */}
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>
              Admin Login
            </h1>
            <p className='text-gray-600'>TK Nurul Hasanah</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className='mb-6 p-4 bg-red-100 border-2 border-red-300 rounded-xl text-red-700 text-sm'
            >
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email */}
            <div>
              <label className='flex items-center gap-2 text-gray-700 font-semibold mb-2'>
                <FaUser className='text-[#FF6B9D]' />
                Email
              </label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete='email'
                inputMode='email'
                className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors'
                placeholder='Masukkan email'
              />
            </div>

            {/* Password */}
            <div>
              <label className='flex items-center gap-2 text-gray-700 font-semibold mb-2'>
                <FaLock className='text-[#FF6B9D]' />
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete='current-password'
                  className='w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none transition-colors pr-12'
                  placeholder='••••••••'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF6B9D] transition-colors'
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type='submit'
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='w-full py-4 bg-gradient-to-r from-[#FF6B9D] to-[#FF8FB3] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? 'Memproses...' : 'Login'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
