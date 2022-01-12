import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/auth';
import { PasswordMaster } from '../screens/PasswordMaster';
import { WelcomeSignIn } from '../screens/WelcomeSignIn';
import { Auth } from '../screens/Auth';

const { Navigator, Screen } = createNativeStackNavigator();

export const AuthRoutes: React.FC = () => {
  const { signed, authenticated } = useAuth();
  return (
    <Navigator>
      {authenticated ? (
        <Screen
          name="Auth"
          component={Auth}
          options={{
            headerShown: false,
          }}
        />
      ) : !signed ? (
        <Screen
          name="Welcome"
          component={WelcomeSignIn}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Screen
          name="PasswordMaster"
          component={PasswordMaster}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Navigator>
  );
};
