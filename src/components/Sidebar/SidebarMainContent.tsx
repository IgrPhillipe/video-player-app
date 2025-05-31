'use client';

import { SidebarGroup, SidebarMenu } from '@/components/ui/sidebar';
import { SidebarItem, SidebarItemProps } from './SidebarItem';

type SidebarMainContentProps = {
  items: SidebarItemProps[];
};

export const SidebarMainContent = ({ items }: SidebarMainContentProps) => (
  <SidebarGroup>
    <SidebarMenu>
      {items.map((item) => (
        <SidebarItem key={item.name} {...item} />
      ))}
    </SidebarMenu>
  </SidebarGroup>
);
