import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { ConfigurationRoutes } from './configuration.routes';
import { NewPassword } from '../screens/NewPassword';
import { useCustomTheme } from '../contexts/theme';
import Detail from '../screens/Detail';

const { Navigator, Screen } = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  ConfigurationRoutes: undefined;
  NewPass: undefined;
  Detail: undefined;
};

export const AppRoutes: React.FC = () => {
  const { colors } = useCustomTheme();
  return (
    <Navigator>
      <Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="ConfigurationRoutes"
        component={ConfigurationRoutes}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />
      <Screen
        name="NewPass"
        component={NewPassword}
        options={{
          title: 'Adicionar',
          headerTitleAlign: 'center',
          animation: 'slide_from_bottom',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.onSurface,
        }}
      />
      <Screen name="Detail" component={Detail} />
    </Navigator>
  );
};
