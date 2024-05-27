import Footer from '@/components/frontend/footer';
import Header from '@/components/frontend/header';
import HeroSection from '@/components/frontend/hero-section'
import ProductFeatures from '@/components/frontend/product-features';
import VideoAndTitleBlock from '@/components/frontend/video-and-title-block';
import IndustryGallery from '@/components/frontend/industry-user-stories';
export default function Home() {
  return (
    <main className="h-screen font-raleway">
      <Header />
      <HeroSection />
      <ProductFeatures />
      <VideoAndTitleBlock videoUrl="/videos/solar-farm.mov" title="Built for the people who build our future." />
      <IndustryGallery />

      <Footer />
    </main>
  );
}
