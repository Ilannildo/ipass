import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';

import { LoadingIndicator } from '../components/LoadingIndicator';
import { useAuth } from '../contexts/auth';
import { AppRoutes } from './app.route';
import { AuthRoutes } from './auth.route';

export const Routes = () => {
  const { loading, logged } = useAuth();

  useEffect(() => {
    if (!loading) {
      RNBootSplash.hide({ fade: true });
    }
  }, [loading]);

  if (loading) {
    return <LoadingIndicator />;
  }
  return logged ? <AppRoutes /> : <AuthRoutes />;
};
