import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Auth } from '../screens/Auth';
import { Welcome } from '../screens/Welcome/intex';
import { SignIn } from '../screens/SignIn';
import { theme } from '../styles/theme';

const { Navigator, Screen } = createNativeStackNavigator();

export const AuthRoutes: React.FC = () => {
  return (
    <Navigator>
      <Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerTitle: '',
          headerShadowVisible: false,
        }}
      />
      <Screen name="Auth" component={Auth} />
    </Navigator>
  );
};
