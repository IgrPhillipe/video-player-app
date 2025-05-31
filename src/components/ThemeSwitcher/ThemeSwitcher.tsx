import { Button } from '@/components/ui/button';
import { MoonIcon } from '@/components/ui/moon';
import { SunIcon } from '@/components/ui/sun';
import { useTheme } from 'next-themes';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const handleThemeChange = () => {
    if (isDark) {
      return setTheme('light');
    }

    setTheme('dark');
  };

  return (
    <Button
      onClick={handleThemeChange}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className="h-7 w-7"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};
