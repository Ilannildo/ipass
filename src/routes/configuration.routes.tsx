import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Configuration } from '../screens/Configuration';
import { useCustomTheme } from '../contexts/theme';
import { SafetyScreen } from '../screens/Configuration/SafetyScreen';

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
        name="Configuration"
        component={Configuration}
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
