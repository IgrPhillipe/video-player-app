import { RootLayout } from '@/components/RootLayout';
import { RootLayoutProps } from '@/types';

export default function PublicLayout({ children }: RootLayoutProps) {
  return <RootLayout>{children}</RootLayout>;
}
