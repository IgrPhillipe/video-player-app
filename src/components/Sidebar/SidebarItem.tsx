'use client';

import { CustomIcon, CustomIconHandle } from '@/types';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import { SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';

export type SidebarItemProps = {
  name: string;
  url: string;
  icon: CustomIcon;
};

export const SidebarItem = ({ name, url, icon: Icon }: SidebarItemProps) => {
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
      <SidebarMenuButton asChild isActive={isActive}>
        <Link prefetch href={url}>
          <Icon ref={iconRef} size={16} />
          <span>{name}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
