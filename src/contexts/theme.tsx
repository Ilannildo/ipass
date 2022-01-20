import React, { createContext, useContext, useEffect, useState } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { dark, light } from '../styles/schemaColors';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  schemeColor: ColorSchemeName;
  loadingTheme: boolean;
  toggleThemeDefault: () => void;
  toggleThemeLight: () => void;
  toggleThemeDark: () => void;
  toggleTheme: (value: ThemeType) => Promise<void>;
  theme: ThemeType;
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
    surface2: string;
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
  const [theme, setTheme] = useState<ThemeType>('' as ThemeType);
  const [schemeColors, setSchemeColors] = useState<ColorSchemeName>(
    '' as ColorSchemeName,
  );
  const [loadingTheme, setLoadingTheme] = useState(true);

  const saveTheme = async (currentTheme: ThemeType) => {
    try {
      await AsyncStorage.setItem('myaccess@theme', currentTheme);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const value = (await AsyncStorage.getItem(
          'myaccess@theme',
        )) as ThemeType;
        if (value !== null) {
          if (value === 'default') {
            if (scheme === 'dark') {
              setTheme('dark');
              setSchemeColors('dark');
              changeNavigationBarColor(dark.background, false, true);
            } else {
              setTheme('light');
              setSchemeColors('light');
              changeNavigationBarColor(light.background, true, true);
            }
          } else if (value === 'light') {
            setTheme('light');
            setSchemeColors('light');
            changeNavigationBarColor(light.background, true, true);
          } else if (value === 'dark') {
            setTheme('dark');
            setSchemeColors('dark');
            changeNavigationBarColor(dark.background, false, true);
          }
        } else {
          setTheme('default');
        }
        setLoadingTheme(false);
      } catch (e) {
        console.log(e);
        setLoadingTheme(false);
      }
    };
    getData();
  }, [scheme]);

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

  const toggleThemeDark = async () => {
    await saveTheme('dark');
    setTheme('dark');
    setSchemeColors('dark');
  };

  const toggleTheme = async (value: ThemeType) => {
    await saveTheme(value);
    setTheme(value);
  };

  const toggleThemeLight = async () => {
    await saveTheme('light');
    setTheme('light');
    setSchemeColors('light');
  };
  const toggleThemeDefault = async () => {
    await saveTheme('default');
    setTheme('default');
  };

  return (
    <CustomThemeContext.Provider
      value={{
        schemeColor: schemeColors,
        loadingTheme,
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
