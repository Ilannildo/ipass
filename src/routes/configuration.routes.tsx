import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Configuration } from '../screens/Configuration';
import { useCustomTheme } from '../contexts/theme';

const { Navigator, Screen } = createNativeStackNavigator();

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
        }}
      />
    </Navigator>
  );
};
