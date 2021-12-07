import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useCustomTheme } from '../../../contexts/theme';
import { Switch } from 'react-native-paper';
import { useAuth } from '../../../contexts/auth';
import ReactNativeBiometrics from 'react-native-biometrics';
import { useBiometry } from '../../../contexts/biometry';

export const SafetyScreen: React.FC = () => {
  const { colors } = useCustomTheme();
  const {
    isBiometrics,
    handleSimpleBiometrics,
    enableBiometrics,
    disableBiometrics,
    isAvaliableBiometrics,
  } = useBiometry();

  const onChange = async (value: boolean) => {
    if (value) {
      const result = await handleSimpleBiometrics();
      if (result) {
        await enableBiometrics();
      }
    } else {
      const result = await handleSimpleBiometrics();
      if (result) {
        await disableBiometrics();
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
          disabled={!isAvaliableBiometrics}
          onValueChange={value => onChange(value)}
          children={undefined}
          color={colors.primary}
          thumbColor={isBiometrics ? colors.primary : '#FBFCFF'}
          trackColor={{
            false: '#AFAFAF',
            true: colors.primaryInverse,
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
