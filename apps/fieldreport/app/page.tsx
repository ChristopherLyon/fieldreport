"use client"
import Footer from '@/components/footer';
import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import { useState } from 'react';
import { LoginFloater } from '@/components/login-floater';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CornerRightDown } from 'lucide-react';
import AIChatbot from '@/components/ai-chatbot';

export default function Home() {

  const [customerType, setCustomerType] = useState('personal');

  return (
    <main className="h-screen font-raleway">
      <Header />
      <LoginFloater />
      <AIChatbot mode={customerType} setMode={setCustomerType} />
      <HeroSection />
      <div className='px-4'>
        <div className='max-w-6xl mx-auto border-x border-dashed h-screen border-muted flex flex-col gap-24 pt-24'>
          <div className='flex flex-col gap-3 pl-6 '>
            <span className='text-xs font-mono text-foreground/80'>
              Tailor your experience <CornerRightDown className='h-3 w-3 inline text-cyan-500' />
            </span>
            <Tabs defaultValue="personal" className="w-[400px]" onValueChange={setCustomerType} value={customerType}>
              <TabsList>
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className='flex flex-col gap-3' >
            <span className='text-cyan-500 pl-6 font-semibold'>
              What we solve
            </span>
            <h1 className='text-5xl max-w-xl border-l border-cyan-500 pl-6'>
              Nothing slips through the cracks.
            </h1>
            <h2 className='max-w-xl text-foreground/90 pl-6'>
              {customerType === 'personal' ? 'We remove any exuses for not gathering critical information about your life.' : 'We remove any exuses for not gathering critical information about your operations.'}
            </h2>
          </div>

          <div className='flex flex-col gap-3' >
            <span className='text-cyan-500 pl-6 font-semibold'>
              How we solve it
            </span>
            <h1 className='text-5xl max-w-xl border-l border-cyan-500 pl-6'>
              We make it easy to collect data.
            </h1>
            <h2 className='max-w-xl text-foreground/90 pl-6'>
              {customerType === 'personal' ? 'We make it easy to collect data about your life.' : 'We make it easy to collect data about your operations.'}
            </h2>
          </div>
        </div>
      </div>
      <Footer />
    </main >
  );
}
