// Libraries
import type * as React from 'react';
import { redirect } from 'next/navigation';
import { unstable_getServerSession } from 'next-auth';
import { CONFIG } from '@/app/api/auth/[...nextauth]/config';

// UI Components
import { NavLinks } from '@/components/nav-links';
import Header from '@/components/header';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await unstable_getServerSession(CONFIG);
  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <main className="font-raleway h-screen overflow-hidden relative">
      <div className="grid min-h-screen w-full md:grid-cols-[70px_1fr] relative">
        <div className="hidden md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b mx-auto"></div>
            <div className="flex-1 overflow-auto">
              <NavLinks />
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full overflow-hidden relative">
          <Header />

          <div className="flex-1 max-h-[calc(98vh-4rem)] mr-4 ml-4 md:ml-0 relative">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
