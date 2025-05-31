'use client';

import { MoonIcon } from '@/components/ui/moon';
import { SunIcon } from '@/components/ui/sun';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SidebarButton } from '../Sidebar/SidebarButton';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  const handleThemeChange = () => {
    if (isDark) {
      return setTheme('light');
    }

    setTheme('dark');
  };

  const Icon = isDark ? SunIcon : MoonIcon;

  if (!mounted) {
    return null;
  }

  return (
    <SidebarButton name={isDark ? 'Claro' : 'Escuro'} icon={Icon} onClick={handleThemeChange} />
  );
};
