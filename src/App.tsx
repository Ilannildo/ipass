import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomThemeProvider } from './contexts/theme';
import { BiometryProvider } from './contexts/biometry';
import { AutofillProvider } from './contexts/autofill';
import { StorageProvider } from './contexts/storage';
import { AuthProvider } from './contexts/auth';
import { Provider } from 'react-native-paper';
import { AutoFillApp } from './AutoFillApp';
import { Routes } from './routes';

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

  // console.log('Auto Fill Context =>', isContextAutoFill);
  // console.log('Auto Fill Service Identifiers =>', serviceIdentifiers);
  // TO DO: Criar método nativo para retornar os dados para o js e salvar no storage

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
