import React, { useMemo } from 'react';

interface IAutofillContext {
  isAutofill: boolean;
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
  const context: IAutofillContext = useMemo(
    () => ({
      isAutofill,
    }),
    [isAutofill],
  );
  return (
    <AutofillContext.Provider value={context}>
      {props.children}
    </AutofillContext.Provider>
  );
}
