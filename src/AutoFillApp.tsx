import React from 'react';
import { Button, Text, View } from 'react-native';
import { AutoFillBridge } from './services/autofillbridge';

interface AutoFillAppProps {
  urls?: Array<string>;
}

export const AutoFillApp: React.FC<AutoFillAppProps> = ({ urls }) => {
  console.log('URL =>', urls);
  // }, []);
  return (
    <View>
      <Text>Auto Fill App</Text>
      <Button
        title="Cancelar"
        onPress={() => AutoFillBridge.cancelAutoFill()}
      />
      <Button
        title="Escolher"
        onPress={async () =>
          await AutoFillBridge.completeAutoFill('Ilannildo', '123', 'Magalu')
        }
      />
    </View>
  );
};
