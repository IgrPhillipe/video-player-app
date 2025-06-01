import { ViewTransitions } from 'next-view-transitions';

import '../styles/globals.css';

import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

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
  <ViewTransitions>
    <html lang="pt_BR" className={fontSans.variable} suppressHydrationWarning>
      <body>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  </ViewTransitions>
);

export default Root;
