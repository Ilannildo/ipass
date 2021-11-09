import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
// import { Configuration } from '../screens/Configuration';
import { ConfigurationRoutes } from './configuration.routes';
import { Search } from '../screens/Search';

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes: React.FC = () => {
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
        name="Search"
        component={Search}
        options={{
          // title: 'Ajustes',
          animation: 'fade_from_bottom',
        }}
      />
    </Navigator>
  );
};
