import React, { createContext } from 'react';

type ContextData = {
  isBiometrics: boolean;
  handleUserNotBiocmetrics: () => Promise<void>;
};

export const BiometryProvider = createContext<ContextData>({} as ContextData);

export const BiometryProvider: React.FC = ({ children }) => {};
