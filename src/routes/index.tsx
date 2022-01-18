import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';

import { Loader } from '../components/design/Loader';
import { useAuth } from '../contexts/auth';
import { useCustomTheme } from '../contexts/theme';
import { AppRoutes } from './app.route';
import { AuthRoutes } from './auth.route';

export const Routes = () => {
  const { loading, logged } = useAuth();
  const { loadingTheme } = useCustomTheme();

  useEffect(() => {
    if (!loading && !loadingTheme) {
      RNBootSplash.hide();
    }
  }, [loading, loadingTheme]);

  if (loading) {
    return <Loader />;
  } else {
    return logged ? <AppRoutes /> : <AuthRoutes />;
  }
};
