'use client';

import * as React from 'react';

import { SidebarLogo } from '@/components/Sidebar/SidebarLogo';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { BananaIcon } from '@/components/ui/banana';
import { BoneIcon } from '@/components/ui/bone';
import { CloudSunIcon } from '@/components/ui/cloud-sun';
import { HeartIcon } from '@/components/ui/heart';
import { HomeIcon } from '@/components/ui/home';
import { MapPinIcon } from '@/components/ui/map-pin';
import { MonitorCheckIcon } from '@/components/ui/monitor-check';
import { RocketIcon } from '@/components/ui/rocket';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { SparklesIcon } from '@/components/ui/sparkles';
import { UsersIcon } from '@/components/ui/users';
import { SidebarCategories } from './SidebarCategories';
import { SidebarMenuContent } from './SidebarMenuContent';
import { SidebarTrigger } from './SidebarTrigger';

const SIDEBAR_MAIN_CONTENT = [
  {
    name: 'Página Inicial',
    url: '/',
    icon: HomeIcon,
  },
  {
    name: 'Favoritos',
    url: '/favoritos',
    icon: HeartIcon,
  },
  {
    name: 'Assistidos',
    url: '/assistidos',
    icon: MonitorCheckIcon,
  },
];

const SIDEBAR_CATEGORIES = [
  {
    name: 'Natureza',
    url: '#',
    icon: CloudSunIcon,
  },
  {
    name: 'Animais',
    url: '#',
    icon: BoneIcon,
  },
  {
    name: 'Cidade',
    url: '#',
    icon: MapPinIcon,
  },
  {
    name: 'Pessoas',
    url: '#',
    icon: UsersIcon,
  },
  {
    name: 'Comida',
    url: '#',
    icon: BananaIcon,
  },
  {
    name: 'Abstrato',
    url: '#',
    icon: SparklesIcon,
  },
  {
    name: 'Universo',
    url: '#',
    icon: RocketIcon,
  },
];

export const SidebarMenu = ({ ...props }: React.ComponentProps<typeof Sidebar>) => (
  <Sidebar collapsible="icon" {...props}>
    <SidebarHeader>
      <SidebarLogo />
    </SidebarHeader>

    <SidebarContent>
      <SidebarMenuContent items={SIDEBAR_MAIN_CONTENT} />
      <SidebarCategories categories={SIDEBAR_CATEGORIES} />
    </SidebarContent>

    <SidebarFooter>
      <ThemeSwitcher />
      <SidebarTrigger />
    </SidebarFooter>
  </Sidebar>
);
