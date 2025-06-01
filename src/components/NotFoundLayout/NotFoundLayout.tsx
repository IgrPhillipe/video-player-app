'use client';

import { Sidebar } from '@/components/Sidebar';
import { ArrowLeftIcon } from '@/components/ui/arrow-left';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { CustomIconHandle } from '@/types';
import { ReactLenis } from 'lenis/react';
import Link from 'next/link';
import { useRef } from 'react';

export const NotFoundLayout = () => {
  const iconRef = useRef<CustomIconHandle>(null);

  const handleMouseEnter = () => {
    iconRef.current?.startAnimation();
  };

  const handleMouseLeave = () => {
    iconRef.current?.stopAnimation();
  };

  return (
    <SidebarProvider>
      <Sidebar.Menu />

      <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
        <SidebarInset>
          <main className="flex flex-col items-center justify-center h-full">
            <section className="text-center">
              <h1 className="text-2xl font-bold text-accent-foreground">
                Ops! Parece que você se perdeu.
              </h1>
              <p className="text-sm text-muted-foreground">
                A página que você está procurando não existe.
              </p>
            </section>

            <nav className="mt-8">
              <Link
                prefetch
                href="/"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-fit flex gap-2 items-center h-10 px-2 py-1 rounded-xl bg-red-500 text-white"
                aria-label="Voltar para a página inicial"
              >
                <ArrowLeftIcon ref={iconRef} size={18} />
                Voltar para a página inicial
              </Link>
            </nav>
          </main>
        </SidebarInset>
      </ReactLenis>
    </SidebarProvider>
  );
};
