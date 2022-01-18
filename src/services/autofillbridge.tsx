import { NativeModules } from 'react-native';
export interface IntermediateEntry {
  id: string;
  title: string;
  username: string;
  password: string;
  entryPath: string;
  urls: Array<string>;
}

export type StoredAutofillEntries = Record<string, IntermediateEntry>;

export interface AutofillBridgeInterface {
  DEVICE_SUPPORTS_AUTOFILL: boolean;
  getAutoFillSystemStatus: () => Promise<boolean>;
  openAutoFillSystemSettings: () => Promise<void>;
  forceAutofill: () => Promise<boolean>;
  cancelAutoFill: () => Promise<void>;
  completeAutoFill: (
    username: string,
    password: string,
    entryPath: string,
  ) => Promise<void>;
  getEntriesForSourceID: (sourceID: string) => Promise<StoredAutofillEntries>;
  removeEntriesForSourceID: (sourceID: string) => Promise<void>;
  updateEntriesForSourceID: (
    sourceID: string,
    entries: Record<string, IntermediateEntry>,
  ) => Promise<void>;
}

const { AutoFillBridge } = NativeModules as {
  AutoFillBridge: AutofillBridgeInterface;
};

export { AutoFillBridge };
