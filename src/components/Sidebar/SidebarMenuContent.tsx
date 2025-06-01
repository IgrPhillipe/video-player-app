'use client';

import { SidebarGroup, SidebarMenu } from '@/components/ui/sidebar';
import { SidebarItem, SidebarItemProps } from './SidebarItem';

type SidebarMenuContentProps = {
  items: SidebarItemProps[];
};

export const SidebarMenuContent = ({ items }: SidebarMenuContentProps) => (
  <SidebarGroup>
    <SidebarMenu>
      {items.map((item) => (
        <SidebarItem key={item.name} {...item} />
      ))}
    </SidebarMenu>
  </SidebarGroup>
);
