import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/auth';
import { CreatePasswordMaster } from '../screens/CreatePasswordMaster';
import { WelcomeSignIn } from '../screens/WelcomeSignIn';
import { Auth } from '../screens/Auth';
import { Authenticate } from '../screens/Authenticate';

const { Navigator, Screen } = createNativeStackNavigator();

export const AuthRoutes: React.FC = () => {
  const { signed, authenticated } = useAuth();
  return (
    <Navigator>
      {authenticated ? (
        <Screen
          name="Auth"
          component={Authenticate}
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
          name="CreatePasswordMaster"
          component={CreatePasswordMaster}
          options={{
            headerTitle: '',
            headerShadowVisible: false,
          }}
        />
      )}
    </Navigator>
  );
};
