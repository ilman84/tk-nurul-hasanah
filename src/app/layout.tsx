import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'TK Nurul Hasanah - Giat Bersahaja',
  description:
    'TK Nurul Hasanah adalah taman kanak-kanak yang menyediakan lingkungan belajar dan bermain yang menyenangkan untuk tumbuh kembang anak dengan motto Giat Bersahaja.',
  keywords:
    'TK Nurul Hasanah, taman kanak-kanak, PAUD, pendidikan anak usia dini, sekolah TK, Giat Bersahaja',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='id' className='overflow-x-hidden'>
      <body className={`${poppins.variable} antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
