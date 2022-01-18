import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Settings } from '../screens/Settings';
import { useCustomTheme } from '../contexts/theme';
import { SafetyScreen } from '../screens/Settings/SafetyScreen';

const { Navigator, Screen } = createNativeStackNavigator();

export type SettingstStackParamList = {
  SafetyScreen: undefined;
  // ThemeScreen: undefined;
  SynchBackupScreen: undefined;
  MeScreen: undefined;
  AboutScreen: undefined;
};

export const ConfigurationRoutes: React.FC = () => {
  const { colors } = useCustomTheme();
  return (
    <Navigator>
      <Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Ajustes',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.onSurface,
        }}
      />
      <Screen
        name="SafetyScreen"
        component={SafetyScreen}
        options={{
          title: 'Segurança',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.onSurface,
          animation: 'fade_from_bottom',
        }}
      />
    </Navigator>
  );
};
