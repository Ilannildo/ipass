import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Configuration } from '../screens/Configuration';
import { Search } from '../screens/Search';

const { Navigator, Screen } = createNativeStackNavigator();

export const ConfigurationRoutes: React.FC = () => {
  return (
    <Navigator>
      <Screen
        name="Configuration"
        component={Configuration}
        options={{
          title: 'Ajustes',
          headerShadowVisible: false,
        }}
      />
    </Navigator>
  );
};
