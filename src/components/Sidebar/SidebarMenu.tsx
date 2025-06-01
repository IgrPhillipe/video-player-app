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
import { ALLOWED_CATEGORIES } from '@/config';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
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
    url: '/?category=nature',
    icon: CloudSunIcon,
  },
  {
    name: 'Animais',
    url: '/?category=animals',
    icon: BoneIcon,
  },
  {
    name: 'Cidade',
    url: '/?category=city',
    icon: MapPinIcon,
  },
  {
    name: 'Pessoas',
    url: '/?category=people',
    icon: UsersIcon,
  },
  {
    name: 'Comida',
    url: '/?category=food',
    icon: BananaIcon,
  },
  {
    name: 'Abstrato',
    url: '/?category=abstract',
    icon: SparklesIcon,
  },
  {
    name: 'Universo',
    url: '/?category=universe',
    icon: RocketIcon,
  },
];

export const SidebarMenu = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get('category');

  useEffect(() => {
    if (category && !ALLOWED_CATEGORIES.includes(category)) {
      router.push('/');
    }
  }, [category, router]);

  return (
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
};
