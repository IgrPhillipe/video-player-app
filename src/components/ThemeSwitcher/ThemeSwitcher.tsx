'use client';

import { Sidebar } from '@/components/Sidebar';
import { MoonIcon } from '@/components/ui/moon';
import { SunIcon } from '@/components/ui/sun';
import { useTheme } from 'next-themes';
import { Suspense, useEffect, useState } from 'react';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  const handleThemeChange = () => {
    if (isDark) {
      return setTheme('light');
    }

    setTheme('dark');
  };

  const Icon = isDark ? SunIcon : MoonIcon;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Suspense fallback={<></>}>
      <Sidebar.Button name={isDark ? 'Claro' : 'Escuro'} icon={Icon} onClick={handleThemeChange} />
    </Suspense>
  );
};
