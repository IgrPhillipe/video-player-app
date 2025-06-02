'use client';

import { ReactNode } from 'react';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from 'sonner';
import { TanstackProvider } from '../TanstackProvider';
import { ThemeProvider } from '../ThemeProvider';

type GlobalProviderProps = Readonly<{
  children: ReactNode;
}>;

export const GlobalProvider = ({ children }: GlobalProviderProps) => (
  <TanstackProvider>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <Toaster richColors />
      <NuqsAdapter>{children}</NuqsAdapter>
    </ThemeProvider>
  </TanstackProvider>
);
