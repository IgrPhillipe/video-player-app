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
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold text-accent-foreground">
              Ops! Parece que você se perdeu.
            </h1>
            <p className="text-sm text-muted-foreground">
              A página que você está procurando não existe.
            </p>

            <Link
              prefetch
              href="/"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-fit flex gap-2 items-center h-10 px-2 py-1 rounded-xl bg-red-500 text-white mt-8"
            >
              <ArrowLeftIcon ref={iconRef} size={18} />
              Voltar para a página inicial
            </Link>
          </div>
        </SidebarInset>
      </ReactLenis>
    </SidebarProvider>
  );
};
