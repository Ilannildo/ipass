import React from 'react';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { useAuth } from '../contexts/auth';
import { AppRoutes } from './app.route';
import { AuthRoutes } from './auth.route';

export const Routes = () => {
  const { loading, logged } = useAuth();

  if (loading) {
    return <LoadingIndicator />;
  }

  return logged ? <AppRoutes /> : <AuthRoutes />;
};
