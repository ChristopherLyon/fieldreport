import Footer from '@/components/frontend/footer';
import Header from '@/components/frontend/header';
import HeroSection from '@/components/frontend/hero-section'
import ProductFeatures from '@/components/frontend/product-features';
import VideoAndTitleBlock from '@/components/frontend/video-and-title-block';
import IndustryGallery from '@/components/frontend/industry-user-stories';
import { LoginFloater } from '@/components/login-floater';


export default function Home() {
  return (
    <main className="h-screen font-raleway">
      <Header />
      <LoginFloater />
      <HeroSection />
      <ProductFeatures />
      <VideoAndTitleBlock videoUrl="/videos/solar-farm.mov" title="Built for the people who build our future." />
      <IndustryGallery />
      <VideoAndTitleBlock videoUrl="/videos/office.mp4" title="Effortlessly manage millions of moving parts." />
      <Footer />
    </main>
  );
}
