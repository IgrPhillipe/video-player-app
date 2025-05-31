import { RootLayoutProps } from '@/types';
import { SidebarMenu } from '../Sidebar/SidebarMenu';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';

export const RootLayout = ({ children }: RootLayoutProps) => (
  <SidebarProvider>
    <SidebarMenu />

    <SidebarInset>{children}</SidebarInset>
  </SidebarProvider>
);
