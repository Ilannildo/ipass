import React from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../contexts/auth';
import { AppRoutes } from './app.route';
import { AuthRoutes } from './auth.route';

export const Routes = () => {
  const { loading, signed } = useAuth();

  if (loading) {
    return (
      <View>
        <Text>Carregando</Text>
      </View>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};
