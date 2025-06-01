'use client';

import { SidebarGroup, SidebarGroupLabel, SidebarMenu } from '@/components/ui/sidebar';
import { SidebarItem, SidebarItemProps } from './SidebarItem';

type SidebarCategoriesProps = {
  categories: SidebarItemProps[];
};

export const SidebarCategories = ({ categories }: SidebarCategoriesProps) => (
  <SidebarGroup className="group-data-[collapsible=icon]:hidden">
    <SidebarGroupLabel>Categorias</SidebarGroupLabel>

    <SidebarMenu>
      {categories.map((item) => (
        <SidebarItem key={item.name} {...item} />
      ))}
    </SidebarMenu>
  </SidebarGroup>
);
