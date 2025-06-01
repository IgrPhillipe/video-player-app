import '../styles/globals.css';

import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import { GlobalProvider } from '@/providers/GlobalProvider';
import { RootLayoutProps } from '@/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Video Player App',
  description: 'Video Player App',
};

const initializeUser = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get('user_id');

  if (!userId) {
    redirect('/api/user/init');
  }
};

const Root = async ({ children }: RootLayoutProps) => {
  await initializeUser();

  return (
    <html lang="pt_BR" className={fontSans.variable} suppressHydrationWarning>
      <body>
        <Suspense>
          <GlobalProvider>{children}</GlobalProvider>
        </Suspense>
      </body>
    </html>
  );
};

export default Root;
