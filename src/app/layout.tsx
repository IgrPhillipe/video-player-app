import '../styles/globals.css';

import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import { RootLayout } from '@/components/RootLayout';
import { GlobalProvider } from '@/providers';
import { RootLayoutProps } from '@/types';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Video Player App',
  description: 'Video Player App',
};

const Root = ({ children }: RootLayoutProps) => (
  <html lang="pt_BR" className={fontSans.variable} suppressHydrationWarning>
    <body>
      <GlobalProvider>
        <RootLayout>{children}</RootLayout>
      </GlobalProvider>
    </body>
  </html>
);

export default Root;
