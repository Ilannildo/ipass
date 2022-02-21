import React from 'react';
import { Loader } from './components/design/Loader';
import { useAuth } from './contexts/auth';
import { AuthRoutes } from './routes/auth.routes';
import { Autofill } from './screens/Autofill';

interface AutoFillAppProps {
  urls?: Array<string>;
}

export const AutoFillApp: React.FC<AutoFillAppProps> = ({ urls }) => {
  console.log('URL =>', urls);
  const { loading, logged } = useAuth();

  if (loading) {
    return <Loader />;
  } else {
    return logged ? <Autofill /> : <AuthRoutes />;
  }
};
