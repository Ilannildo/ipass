import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScreenProvider } from 'responsive-native';
import { AuthProvider } from './contexts/auth';
import { Routes } from './routes';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ScreenProvider baseFontSize={16}>
        <NavigationContainer>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </NavigationContainer>
      </ScreenProvider>
    </SafeAreaProvider>
  );
};

export default App;
