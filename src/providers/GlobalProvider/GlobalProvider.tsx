import { ReactNode } from 'react';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { TanstackProvider } from '../TanstackProvider';
import { ThemeProvider } from '../ThemeProvider';

type GlobalProviderProps = Readonly<{
  children: ReactNode;
}>;

export const GlobalProvider = async ({ children }: GlobalProviderProps) => (
  <NuqsAdapter>
    <TanstackProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </TanstackProvider>
  </NuqsAdapter>
);
