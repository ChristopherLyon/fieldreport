'use client';
import Footer from '@/components/footer';
import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import { useState } from 'react';
import { LoginFloater } from '@/components/login-floater';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CornerRightDown } from 'lucide-react';
import AIChatbot from '@/components/ai-chatbot';
import Image from 'next/image';

export default function Home() {
  const [customerType, setCustomerType] = useState('personal');

  return (
    <main className="h-screen font-raleway">
      <Header />
      <LoginFloater />
{/*       <AIChatbot mode={customerType} setMode={setCustomerType} />
 */}      <HeroSection />
      <div className="px-4">
        <div className="max-w-5xl mx-auto border-x border-dashed h-screen border-muted flex flex-col gap-32 pt-24">
          <div className="flex flex-col gap-3 pl-6 ">
            <span className="text-xs font-mono text-foreground/80">
              Tailor your experience{' '}
              <CornerRightDown className="h-3 w-3 inline text-cyan-500" />
            </span>
            <Tabs
              defaultValue="personal"
              className="w-[400px]"
              onValueChange={setCustomerType}
              value={customerType}
            >
              <TabsList>
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div className="flex flex-col gap-3">
              <span className="text-cyan-500 px-6 font-semibold">
                What we solve
              </span>
              <h1 className="text-5xl max-w-xl border-l border-cyan-500 px-6">
                Nothing slips through the cracks.
              </h1>
              <h2 className="max-w-xl text-foreground/90 px-6">
                {customerType === 'personal'
                  ? 'We remove any exuses for not gathering critical information about your life. As long as you can think it, FieldReport can handle it. We make sure to boil up all the critical infromation effortlessly with AI'
                  : 'We remove any exuses for not gathering critical information about your operations. As long as you can think it, FieldReport can handle it. We make sure to boil up all the critical infromation effortlessly with AI'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div className="flex flex-col gap-3">
              <span className="text-cyan-500 px-6 font-semibold">
                How we solve it
              </span>
              <h1 className="text-5xl max-w-xl border-l border-cyan-500 px-6">
                We make it easy to collect data.
              </h1>
              <h2 className="max-w-xl text-foreground/90 px-6">
                {customerType === 'personal'
                  ? 'We built FieldReport around a single governing principle: make it easy to collect data. All you see is a single input field. All we see is a world of possibilities.'
                  : 'We built FieldReport around a single governing principle: make it easy to collect data. All you see is a single input field. All we see is a world of possibilities.'}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
