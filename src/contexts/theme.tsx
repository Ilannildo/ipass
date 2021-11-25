import React, { createContext, useContext, useEffect, useState } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { dark, light } from '../styles/colorSchemas';

type Props = {
  schemeColor: ColorSchemeName;
  toggleThemeDefault: () => void;
  toggleThemeLight: () => void;
  toggleThemeDark: () => void;
  colors: {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;
    secondary: string;
    onSecondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;
    tertiary: string;
    onTertiary: string;
    tertiaryContainer: string;
    onTertiaryContainer: string;
    error: string;
    errorContainer: string;
    onError: string;
    onErrorContainer: string;
    background: string;
    onBackground: string;
    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;
    outline: string;
    onOutline: string;
    inverseOnSurface: string;
    inverseSurface: string;
    primaryInverse: string;
    success: string;
    warning: string;
    backdrop: string;
  };
};

type ThemeType = 'light' | 'dark' | 'default';

export const CustomThemeContext = createContext<Props>({} as Props);

export const CustomThemeProvider: React.FC = ({ children }) => {
  const scheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>('light');
  const [schemeColors, setSchemeColors] = useState<ColorSchemeName>('light');

  useEffect(() => {
    if (theme === 'default') {
      if (scheme === 'dark') {
        setSchemeColors('dark');
      } else {
        setSchemeColors('light');
      }
    } else if (theme === 'light') {
      setSchemeColors('light');
    } else if (theme === 'dark') {
      setSchemeColors('dark');
    }
  }, [scheme, theme]);

  const toggleThemeDark = () => {
    setTheme('dark');
    setSchemeColors('dark');
  };
  const toggleThemeLight = () => {
    setTheme('light');
    setSchemeColors('light');
  };
  const toggleThemeDefault = () => {
    setTheme('default');
  };

  return (
    <CustomThemeContext.Provider
      value={{
        schemeColor: schemeColors,
        toggleThemeDark,
        toggleThemeDefault,
        toggleThemeLight,
        colors:
          theme === 'default'
            ? scheme === 'dark'
              ? dark
              : light
            : theme === 'light'
            ? light
            : dark,
      }}>
      {children}
    </CustomThemeContext.Provider>
  );
};

export const useCustomTheme = () => {
  const context = useContext(CustomThemeContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
};
