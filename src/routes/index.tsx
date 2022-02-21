import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';

import { Loader } from '../components/design/Loader';
import { useAuth } from '../contexts/auth';
import { useCustomTheme } from '../contexts/theme';
// import { HomeRoutes } from './home.route';
import { AuthRoutes } from './auth.routes';
import { HomeRoutes } from './home.routes';

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
    return logged ? <HomeRoutes /> : <AuthRoutes />;
  }
};
