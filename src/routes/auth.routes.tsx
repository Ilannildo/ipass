import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/auth';
import { PasswordMaster } from '../screens/PasswordMaster';
import { SignIn } from '../screens/SignIn';
import { Auth } from '../screens/Auth';
import { useCustomTheme } from '../contexts/theme';

const { Navigator, Screen } = createNativeStackNavigator();

export const AuthRoutes: React.FC = () => {
  const { signed, authenticated, user } = useAuth();
  const { colors } = useCustomTheme();
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
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Screen
          name="PasswordMaster"
          component={PasswordMaster}
          options={{
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.onSecondary,
            headerTitleAlign: 'center',
            title: `Olá, ${user?.givenName}`,
          }}
        />
      )}
    </Navigator>
  );
};
