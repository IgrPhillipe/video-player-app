import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps as NextThemesProviderProps,
} from 'next-themes';

export const ThemeProvider = ({ children, ...props }: NextThemesProviderProps) => (
  <NextThemesProvider {...props}>{children}</NextThemesProvider>
);
