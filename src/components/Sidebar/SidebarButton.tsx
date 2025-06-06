'use client';

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { CustomIcon, CustomIconHandle } from '@/types';
import { useRef } from 'react';

export type SidebarButtonProps = {
  name: string;
  icon: CustomIcon;
} & React.ComponentProps<typeof SidebarMenuItem>;

export const SidebarButton = ({ name, icon: Icon, onClick, className }: SidebarButtonProps) => {
  const iconRef = useRef<CustomIconHandle>(null);

  const handleMouseEnter = () => {
    iconRef.current?.startAnimation();
  };

  const handleMouseLeave = () => {
    iconRef.current?.stopAnimation();
  };

  return (
    <SidebarMenuItem
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn('cursor-pointer list-none', className)}
    >
      <SidebarMenuButton asChild tooltip={name}>
        <div className="flex items-center gap-2">
          <Icon ref={iconRef} size={16} className="fill-transparent" />
          <span>{name}</span>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
