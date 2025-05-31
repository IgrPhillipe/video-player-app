'use client';

import * as React from 'react';

import { SidebarLogo } from '@/components/Sidebar/SidebarLogo';
import { SidebarMainContent } from '@/components/Sidebar/SidebarMainContent';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { BananaIcon } from '../ui/banana';
import { BoneIcon } from '../ui/bone';
import { CloudSunIcon } from '../ui/cloud-sun';
import { HeartIcon } from '../ui/heart';
import { HomeIcon } from '../ui/home';
import { MapPinIcon } from '../ui/map-pin';
import { MonitorCheckIcon } from '../ui/monitor-check';
import { RocketIcon } from '../ui/rocket';
import { SparklesIcon } from '../ui/sparkles';
import { UsersIcon } from '../ui/users';
import { SidebarCategories } from './SidebarCategories';

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
      <SidebarMainContent items={SIDEBAR_MAIN_CONTENT} />
      <SidebarCategories categories={SIDEBAR_CATEGORIES} />
    </SidebarContent>

    <SidebarFooter>
      <ThemeSwitcher />
    </SidebarFooter>
  </Sidebar>
);
