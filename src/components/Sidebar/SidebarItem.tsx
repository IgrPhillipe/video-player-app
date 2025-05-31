import { CustomIcon } from '@/types';
import { useRef } from 'react';
import { SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';

export type SidebarItemProps = {
  name: string;
  url: string;
  icon: CustomIcon;
};

export const SidebarItem = ({ name, url, icon: Icon }: SidebarItemProps) => {
  const iconRef = useRef<any>(null);

  const handleMouseEnter = () => {
    iconRef.current?.startAnimation();
  };

  const handleMouseLeave = () => {
    iconRef.current?.stopAnimation();
  };

  return (
    <SidebarMenuItem onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <SidebarMenuButton asChild>
        <a href={url}>
          <Icon ref={iconRef} size={16} />
          <span>{name}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
