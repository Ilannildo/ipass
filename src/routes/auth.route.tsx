import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Auth } from '../screens/Auth';
import { SignIn } from '../screens/SignIn';
import { WelcomeSignIn } from '../screens/WelcomeSignIn';
import { useAuth } from '../contexts/auth';

const { Navigator, Screen } = createNativeStackNavigator();

export const AuthRoutes: React.FC = () => {
  const { authenticated } = useAuth();
  return (
    <Navigator>
      {!authenticated ? (
        <Screen
          name="Welcome"
          component={WelcomeSignIn}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerTitle: '',
            headerShadowVisible: false,
          }}
        />
      )}
      <Screen name="Auth" component={Auth} />
    </Navigator>
  );
};
