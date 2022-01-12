import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomThemeProvider } from './contexts/theme';
import { AuthProvider } from './contexts/auth';
import { Routes } from './routes';
import { Provider } from 'react-native-paper';
import { BiometryProvider } from './contexts/biometry';
import { AutofillProvider } from './contexts/autofill';
import { AutoFillApp } from './AutoFillApp';
import { StorageProvider } from './contexts/storage';

type AppProps = {
  isContextAutoFill?: number;
  serviceIdentifiers?: Array<string>;
};

export const App: React.FC<AppProps> = ({
  isContextAutoFill = 0,
  serviceIdentifiers,
}) => {
  const isAutofill: boolean = useMemo(
    () => [1, true].indexOf(Number(isContextAutoFill)) > -1,
    [isContextAutoFill],
  );

  console.log('Auto Fill Context =>', isContextAutoFill);
  console.log('Auto Fill Service Identifiers =>', serviceIdentifiers);

  return (
    <SafeAreaProvider>
      <AutofillProvider isAutofill={isAutofill}>
        <CustomThemeProvider>
          <NavigationContainer>
            <AuthProvider>
              <BiometryProvider>
                <StorageProvider>
                  <Provider>
                    {isAutofill ? (
                      <AutoFillApp urls={serviceIdentifiers} />
                    ) : (
                      <Routes />
                    )}
                  </Provider>
                </StorageProvider>
              </BiometryProvider>
            </AuthProvider>
          </NavigationContainer>
        </CustomThemeProvider>
      </AutofillProvider>
    </SafeAreaProvider>
  );
};

export default App;
