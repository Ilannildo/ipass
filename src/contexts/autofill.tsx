import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AutoFillBridge } from '../services/autofillbridge';

interface IAutofill {
  isAutofill: boolean;
}

interface IAutofillContext {
  isAutofill: boolean;
  enabled: boolean;
  isAvaliableAutofill: boolean;
  handleAutofillSettings: () => Promise<void>;
  handleDisabled: () => Promise<void>;
}

interface AutofillProviderProps {
  children: React.ReactNode;
  isAutofill: boolean;
}

export const AutofillContext = React.createContext<IAutofillContext>(
  {} as IAutofillContext,
);

export function AutofillProvider(props: AutofillProviderProps) {
  const { isAutofill } = props;
  const [enabled, setEnabled] = useState(false);
  const [isAvaliableAutofill, setIsAvaliableAutofill] = useState(false);

  const context: IAutofill = useMemo(
    () => ({
      isAutofill,
    }),
    [isAutofill],
  );

  const handleAutofillSettings = async () => {
    try {
      await AutoFillBridge.openAutoFillSystemSettings();
      await getStatus();
    } catch (error) {
      console.log('Falha ao ativar auto fill service');
    }
  };
  const handleDisabled = async () => {
    try {
      const result = await AutoFillBridge.forceAutofill();
      console.log('Teste =>', result);
      await getStatus();
    } catch (error) {
      console.log('Falha ao ativar auto fill service');
    }
  };

  const getStatus = async () => {
    try {
      const result = await AutoFillBridge.getAutoFillSystemStatus();
      console.log('Auto fill =>', result);
      setEnabled(result);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const getAvaliable = async () => {
    try {
      setIsAvaliableAutofill(AutoFillBridge.DEVICE_SUPPORTS_AUTOFILL);
      // console.log('Auto fill =>', result);
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    getStatus();
    getAvaliable();
  }, []);

  return (
    <AutofillContext.Provider
      value={{
        ...context,
        enabled,
        handleAutofillSettings,
        handleDisabled,
        isAvaliableAutofill,
      }}>
      {props.children}
    </AutofillContext.Provider>
  );
}

export const useAutofill = () => {
  const context = useContext(AutofillContext);
  if (!context) {
    throw new Error('useStorage must be used within an AuthProvider.');
  }
  return context;
};
