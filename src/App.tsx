import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomThemeProvider } from './contexts/theme';
import { AuthProvider } from './contexts/auth';
import { Routes } from './routes';
import { Provider } from 'react-native-paper';
import { BiometryProvider } from './contexts/biometry';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <CustomThemeProvider>
        <NavigationContainer>
          <AuthProvider>
            <BiometryProvider>
              <Provider>
                <Routes />
              </Provider>
            </BiometryProvider>
          </AuthProvider>
        </NavigationContainer>
      </CustomThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
