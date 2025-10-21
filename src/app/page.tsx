import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import ProfileSection from '@/components/home/ProfileSection';
import ProgramSection from '@/components/home/ProgramSection';
import GallerySection from '@/components/home/GallerySection';
import RegistrationSection from '@/components/home/RegistrationSection';
import NewsSection from '@/components/home/NewsSection';
import ContactSection from '@/components/home/ContactSection';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <Navbar />
      <HeroSection />
      <ProfileSection />
      <ProgramSection />
      <GallerySection />
      <RegistrationSection />
      <NewsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
