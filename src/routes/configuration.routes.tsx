import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Configuration } from '../screens/Configuration';

const { Navigator, Screen } = createNativeStackNavigator();

export const ConfigurationRoutes: React.FC = () => {
  return (
    <Navigator>
      <Screen
        name="Configuration"
        component={Configuration}
        options={{
          title: 'Ajustes',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
      />
    </Navigator>
  );
};
