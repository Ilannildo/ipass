import React, { useCallback, useEffect, useMemo } from 'react';
import { AppState } from 'react-native';
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
import SecureStorage, {
  ACCESS_CONTROL,
  ACCESSIBLE,
  AUTHENTICATION_TYPE,
} from 'react-native-secure-storage';

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

  const handleCoverScreen = useCallback(() => {
    if (isAutofill) {
      return;
    }
    AppState.addEventListener('blur', state => {
      if (state === 'inactive' || state === 'background') {
        console.log('In Back');
      } else {
        console.log('In Front');
      }
    });
  }, [isAutofill]);

  const secure = async () => {
    const config = {
      accessControl: ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
      authenticationPrompt: 'auth with yourself',
      service: 'example',
      authenticateType: AUTHENTICATION_TYPE.BIOMETRICS,
    };
    const autoFillKey = 'com.ipass.autofillstore';
    const domainMapKey = 'com.ipass.domainmapstore';
    const service = 'com.ipass.autofillstore';
    // const key = 'someKey';
    // await SecureStorage.setItem(key, 'some value', config);
    const autoFillKeygot = await SecureStorage.getItem(autoFillKey, config);
    const domainMapKeyautoFillKeygot = await SecureStorage.getItem(
      domainMapKey,
      config,
    );
    const serviceautoFillKeygot = await SecureStorage.getItem(service, config);
    console.log(autoFillKeygot);
    console.log(domainMapKeyautoFillKeygot);
    console.log(serviceautoFillKeygot);
  };

  useEffect(() => {
    handleCoverScreen();
    secure();
  }, [handleCoverScreen]);

  console.log('Auto Fill Context =>', isContextAutoFill);
  console.log('Auto Fill Service Identifiers =>', serviceIdentifiers);
  // TO DO: Criar método nativo para retornar os dados para o js e salvar no storage

  // private static final String autoFillKey = "com.ipass.autofillstore";
  // private static final String domainMapKey = "com.ipass.domainmapstore";
  // private static final String service = "com.ipass.autofillstore";

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
