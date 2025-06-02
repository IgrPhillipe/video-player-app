'use client';

import { Sidebar } from '@/components/Sidebar';
import { MoonIcon } from '@/components/ui/moon';
import { SunIcon } from '@/components/ui/sun';
import { useTheme } from 'next-themes';
import { Suspense, useEffect, useState } from 'react';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  const isDark = theme === 'dark';

  const getThemeIcon = () => (isDark ? SunIcon : MoonIcon);
  const getThemeLabel = () => (isDark ? 'Claro' : 'Escuro');

  const handleThemeChange = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Suspense fallback={<></>}>
      <Sidebar.Button name={getThemeLabel()} icon={getThemeIcon()} onClick={handleThemeChange} />
    </Suspense>
  );
};
