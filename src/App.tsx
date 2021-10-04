import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './routes/auth.route';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScreenProvider } from 'responsive-native';
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <ScreenProvider baseFontSize={16}>
          <AuthRoutes />
        </ScreenProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
