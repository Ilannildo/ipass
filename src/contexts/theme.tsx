import React, { createContext, useContext, useEffect, useState } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
// import { dark, light } from '../styles/colorSchemas';
import { dark, light } from '../styles/schemaColors';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

type Props = {
  schemeColor: ColorSchemeName;
  toggleThemeDefault: () => void;
  toggleThemeLight: () => void;
  toggleThemeDark: () => void;
  toggleTheme: (value: ThemeType) => void;
  theme: ThemeType;
  // colors: {
  //   primary: string;
  //   onPrimary: string;
  //   primaryContainer: string;
  //   onPrimaryContainer: string;
  //   secondary: string;
  //   onSecondary: string;
  //   secondaryContainer: string;
  //   onSecondaryContainer: string;
  //   tertiary: string;
  //   onTertiary: string;
  //   tertiaryContainer: string;
  //   onTertiaryContainer: string;
  //   error: string;
  //   errorContainer: string;
  //   onError: string;
  //   onErrorContainer: string;
  //   background: string;
  //   onBackground: string;
  //   surface: string;
  //   onSurface: string;
  //   surfaceVariant: string;
  //   onSurfaceVariant: string;
  //   outline: string;
  //   onOutline: string;
  //   inverseOnSurface: string;
  //   inverseSurface: string;
  //   primaryInverse: string;
  //   success: string;
  //   warning: string;
  //   backdrop: string;
  // };
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
    inverseOnSurface: string;
    inverseSurface: string;
    primaryInverse: string;
    success: string;
    warning: string;
    backdrop: string;
    color1: string;
    color2: string;
    color3: string;
    color4: string;
    color5: string;
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
        changeNavigationBarColor(dark.background, false, true);
      } else {
        setSchemeColors('light');
        changeNavigationBarColor(light.background, true, true);
      }
    } else if (theme === 'light') {
      setSchemeColors('light');
      changeNavigationBarColor(light.background, true, true);
    } else if (theme === 'dark') {
      setSchemeColors('dark');
      changeNavigationBarColor(dark.background, false, true);
    }
  }, [scheme, theme]);

  const toggleThemeDark = () => {
    setTheme('dark');
    setSchemeColors('dark');
  };

  const toggleTheme = (value: ThemeType) => {
    setTheme(value);
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
        theme,
        toggleThemeDark,
        toggleThemeDefault,
        toggleThemeLight,
        toggleTheme,
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
