import { RootLayout } from '@/components/RootLayout';
import { RootLayoutProps } from '@/types';
import { Suspense } from 'react';

const RootPublicLayout = ({ children }: RootLayoutProps) => (
  <Suspense>
    <RootLayout>{children}</RootLayout>
  </Suspense>
);

export default RootPublicLayout;
