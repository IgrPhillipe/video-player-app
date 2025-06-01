'use client';

import { SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { CustomIcon, CustomIconHandle } from '@/types';
import { Link } from 'next-view-transitions';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

export type SidebarItemProps = {
  name: string;
  url: string;
  icon: CustomIcon;
};

export const SidebarItem = ({ name, url, icon: Icon }: SidebarItemProps) => {
  const { toggleSidebar, isMobile } = useSidebar();
  const iconRef = useRef<CustomIconHandle>(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleMouseEnter = () => {
    iconRef.current?.startAnimation();
  };

  const handleMouseLeave = () => {
    iconRef.current?.stopAnimation();
  };

  const category = searchParams.get('category');

  const isActive = category
    ? url.includes(category)
    : pathname === url || (url !== '/' && pathname.startsWith(url + '/'));

  return (
    <SidebarMenuItem onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <SidebarMenuButton asChild isActive={isActive} tooltip={name}>
        <Link prefetch href={url} onClick={isMobile ? toggleSidebar : undefined}>
          <Icon ref={iconRef} size={16} />
          <span>{name}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
