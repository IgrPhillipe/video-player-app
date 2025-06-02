'use client';

import { SearchInput } from '@/components/SearchInput';
import { Sidebar } from '@/components/Sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { RootLayoutProps } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';

const TRANSITION = { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] };

const VARIANTS = {
  initial: {
    y: 60,
    opacity: 0,
    transition: TRANSITION,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: TRANSITION,
  },
};

export const RootLayout = ({ children }: RootLayoutProps) => {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar.Menu />

      <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
        <SidebarInset>
          <div className="flex max-w-[1440px] mx-auto flex-col gap-8 py-6 w-full px-8 h-full">
            <header className="flex justify-center h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear rounded-xl">
              <SearchInput />
            </header>

            <AnimatePresence mode="sync">
              <motion.div
                initial="initial"
                animate="animate"
                variants={VARIANTS}
                key={pathname}
                className="flex flex-1 flex-col gap-4 h-full w-full relative"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </SidebarInset>
      </ReactLenis>
    </SidebarProvider>
  );
};
