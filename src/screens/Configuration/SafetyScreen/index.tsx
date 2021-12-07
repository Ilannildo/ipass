import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useCustomTheme } from '../../../contexts/theme';
import { Switch } from 'react-native-paper';
import { useAuth } from '../../../contexts/auth';
import ReactNativeBiometrics from 'react-native-biometrics';

export const SafetyScreen: React.FC = () => {
  const { colors } = useCustomTheme();
  const {
    isBiometrics,
    handleSimpleBiometrics,
    createSignatureBiometrics,
    handleCreateKeysFingerprint,
    deleteKeysBiometrics,
  } = useAuth();

  const onChange = async (value: boolean) => {
    if (value) {
      console.log('Habilitar impressão');
      const { keysExist } = await ReactNativeBiometrics.biometricKeysExist();
      if (!keysExist) {
        await handleCreateKeysFingerprint();
      }
      const result = await createSignatureBiometrics();
      if (!result) {
        await deleteKeysBiometrics();
      }
      console.log('Biometria =>', result);
    } else {
      const result = await handleSimpleBiometrics();
      if (result) {
        await deleteKeysBiometrics();
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View>
          <Text style={[styles.label, { color: colors.onPrimaryContainer }]}>
            Acesso ao app
          </Text>
          <Text style={[styles.text, { color: colors.outline }]}>
            Solicitar biometria para acessar o app
          </Text>
        </View>
        <Switch
          value={isBiometrics}
          onValueChange={value => onChange(value)}
          children={undefined}
          color={colors.primary}
          thumbColor={isBiometrics ? colors.primary : colors.background}
          trackColor={{
            false: '#AFAFAF',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 30,
    marginTop: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    fontWeight: 'normal',
  },
});
