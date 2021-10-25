import React, { createContext, useContext, useEffect, useState } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { dark } from '../styles/dark';
import { light } from '../styles/light';

type Props = {
  schemeColor: ColorSchemeName;
  toggleThemeDefault: () => void;
  toggleThemeLight: () => void;
  toggleThemeDark: () => void;
  colors: {
    primary: string;
    secundary: string;
    secundary10: string;
    title: string;
    grey: string;
    black: string;
    error: string;
    warning: string;
    success: string;
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
              ? dark.colors
              : light.colors
            : theme === 'light'
            ? light.colors
            : dark.colors,
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
