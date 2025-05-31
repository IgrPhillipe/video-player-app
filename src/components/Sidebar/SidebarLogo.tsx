'use client';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRef } from 'react';
import { YoutubeIcon, type YoutubeIconHandle } from '../ui/youtube';

export function SidebarLogo() {
  const iconRef = useRef<YoutubeIconHandle>(null);
  const { state } = useSidebar();

  const handleMouseEnter = () => {
    iconRef.current?.startAnimation();
  };

  const handleMouseLeave = () => {
    iconRef.current?.stopAnimation();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href="/">
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={cn(
                'flex px-2 py-1 items-center justify-center rounded-lg bg-red-500 text-sidebar-primary-foreground',
                state === 'collapsed' && 'px-1',
              )}
            >
              <YoutubeIcon ref={iconRef} size={state === 'collapsed' ? 24 : 28} />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Video Player App</span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
