'use client';

import { SearchInput } from '@/components/SearchInput';
import { Sidebar } from '@/components/Sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { RootLayoutProps } from '@/types';
import { ReactLenis } from '@studio-freight/react-lenis';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
export const RootLayout = ({ children }: RootLayoutProps) => {
  const pathname = usePathname();

  const TRANSITION = { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] };

  return (
    <SidebarProvider>
      <Sidebar.Menu />

      <ReactLenis
        root
        options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}
        className="bg-foreground"
      >
        <SidebarInset>
          <div className="flex max-w-[1440px] mx-auto flex-col gap-8 py-6 px-8">
            <header className="sm:grid grid-cols-12 flex grid-rows-1 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear bg-foreground p-2 rounded-xl">
              <div className="col-span-1" />

              <div className="col-span-10">
                <SearchInput />
              </div>

              <div className="col-span-1" />
            </header>

            <AnimatePresence mode="sync">
              <motion.div
                initial={{
                  y: 60,
                  opacity: 0,
                  transition: TRANSITION,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: TRANSITION,
                }}
                exit={{ opacity: 0 }}
                key={pathname}
                className="flex flex-1 flex-col gap-4 h-full w-full"
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
