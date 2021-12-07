import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ToastAndroid } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ContextData = {
  isBiometrics: boolean;
  deleteKeysBiometrics: () => Promise<void>;
  handleSimpleBiometrics: (
    message?: string,
    cancelText?: string,
  ) => Promise<boolean>;
  handleCreateKeysFingerprint: () => Promise<void>;
  disableBiometrics: () => Promise<void>;
  enableBiometrics: () => Promise<void>;
  isAvaliableBiometrics: boolean;
};

export const BiometryContext = createContext<ContextData>({} as ContextData);

export const BiometryProvider: React.FC = ({ children }) => {
  const [isBiometrics, setIsBiometrics] = useState<boolean>(false);
  const [isAvaliableBiometrics, setIsAvaliableBiometrics] =
    useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      await isAvaliable();
      try {
        const value = await AsyncStorage.getItem('myaccess@isBiometrics');
        if (value !== null) {
          setIsBiometrics(true);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const handleCreateKeysFingerprint = useCallback(async () => {
    try {
      const resultObject = await ReactNativeBiometrics.createKeys();
      setIsBiometrics(true);
      console.log('Public Key => ', resultObject.publicKey);
    } catch (error) {
      console.log('Error => ', error);
    }
  }, []);

  const handleSimpleBiometrics = useCallback(
    async (message?: string, cancelText?: string) => {
      try {
        const result = await ReactNativeBiometrics.simplePrompt({
          promptMessage: message || 'Confirme para continuar',
          cancelButtonText: cancelText || 'Cancelar',
        });

        const { success } = result;
        if (!success) {
          ToastAndroid.show('Biometria cancelada', 2000);
        }
        return success;
      } catch (error) {
        ToastAndroid.show('Biometria falhou', 2000);
        return false;
      }
    },
    [],
  );

  const deleteKeysBiometrics = useCallback(async () => {
    const resultObject = await ReactNativeBiometrics.deleteKeys();
    if (resultObject.keysDeleted) {
      console.log('Successful deletion');
      setIsBiometrics(false);
    } else {
      console.log('Unsuccessful deletion because there were no keys to delete');
    }
  }, []);

  const disableBiometrics = async () => {
    try {
      await AsyncStorage.removeItem('myaccess@isBiometrics');
    } catch (e) {
      // remove error
      console.log(e);
    }
    setIsBiometrics(false);
  };

  const enableBiometrics = async () => {
    try {
      const jsonValue = JSON.stringify(true);
      await AsyncStorage.setItem('myaccess@isBiometrics', jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
    setIsBiometrics(true);
  };

  const isAvaliable = async () => {
    const { biometryType } = await ReactNativeBiometrics.isSensorAvailable();
    setIsAvaliableBiometrics(biometryType === ReactNativeBiometrics.Biometrics);
  };

  return (
    <BiometryContext.Provider
      value={{
        isBiometrics,
        deleteKeysBiometrics,
        disableBiometrics,
        enableBiometrics,
        handleCreateKeysFingerprint,
        handleSimpleBiometrics,
        isAvaliableBiometrics,
      }}>
      {children}
    </BiometryContext.Provider>
  );
};

export const useBiometry = () => {
  const context = useContext(BiometryContext);
  if (!context) {
    throw new Error('useBiometry must be used within an AuthProvider.');
  }
  return context;
};
