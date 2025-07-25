
'use client';

import { BottomNav } from './bottom-nav';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react'

export function MobileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noNavRoutes = ['/', '/booking-successful', '/rent-a-bus', '/rent-a-bus/success'];
  const showBottomNav = !noNavRoutes.includes(pathname) && !pathname.startsWith('/signup');

  return (
    <main className="flex justify-center items-center min-h-svh">
      <div className="relative w-full max-w-sm h-[844px] bg-background shadow-2xl rounded-[40px] overflow-hidden border-[10px] border-black dark:border-gray-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black dark:bg-gray-800 rounded-b-xl z-20"></div>
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-hidden">
            <Suspense>
              {children}
            </Suspense>
          </div>
          {showBottomNav && <BottomNav />}
        </div>
      </div>
    </main>
  );
}
