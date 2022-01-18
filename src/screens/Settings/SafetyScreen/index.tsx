import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useCustomTheme } from '../../../contexts/theme';
import { Button, Dialog, Switch } from 'react-native-paper';
import { useBiometry } from '../../../contexts/biometry';
import { useAutofill } from '../../../contexts/autofill';
import { AlertDialog } from '../../../components/design/Dialog';

export const SafetyScreen: React.FC = () => {
  const { colors } = useCustomTheme();
  const [openResponse, setOpenResponse] = useState(false);
  const {
    enabled,
    handleAutofillSettings,
    handleDisabled,
    isAvaliableAutofill,
  } = useAutofill();
  const {
    isBiometrics,
    handleSimpleBiometrics,
    enableBiometrics,
    disableBiometrics,
    isAvaliableBiometrics,
  } = useBiometry();

  const onChangeBiometry = async (value: boolean) => {
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

  const onChangeAutofill = async (value: boolean) => {
    if (!value) {
      await handleDisabled();
      console.log('desabilitar auto fill service');
    } else {
      console.log('habilitar auto fill service');
      await handleAutofillSettings();
      setOpenResponse(true);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {isAvaliableBiometrics && (
        <View style={styles.content}>
          <View>
            <Text style={[styles.label, { color: colors.onSurface }]}>
              Acesso ao app
            </Text>
            <Text style={[styles.text, { color: colors.onSurfaceVariant }]}>
              Solicitar biometria para acessar o app
            </Text>
          </View>
          <Switch
            value={isBiometrics}
            disabled={!isAvaliableBiometrics}
            onValueChange={value => onChangeBiometry(value)}
            children={undefined}
            color={colors.primary}
            thumbColor={isBiometrics ? colors.primary : '#FBFCFF'}
            trackColor={{
              false: '#AFAFAF',
              true: colors.secondaryContainer,
            }}
          />
        </View>
      )}
      {isAvaliableAutofill && (
        <View style={styles.content}>
          <View>
            <Text style={[styles.label, { color: colors.onSurface }]}>
              Autopreencimento
            </Text>
            <Text style={[styles.text, { color: colors.onSurfaceVariant }]}>
              Ativar autopreencimento de senhas nos seus aplicativos
            </Text>
          </View>
          <Switch
            value={enabled}
            disabled={!isAvaliableBiometrics}
            onValueChange={value => onChangeAutofill(value)}
            children={undefined}
            color={colors.primary}
            thumbColor={enabled ? colors.primary : '#FBFCFF'}
            trackColor={{
              false: '#AFAFAF',
              true: colors.secondaryContainer,
            }}
          />
        </View>
      )}
      <AlertDialog
        visible={openResponse}
        onDismiss={() => setOpenResponse(false)}>
        <Dialog.Title style={{ color: colors.onSurface }}>
          {enabled
            ? 'Autopreencimento ativado'
            : 'Autopreencimento não ativado'}
        </Dialog.Title>
        <Dialog.Actions>
          <Button
            color={colors.primary}
            style={{ marginRight: 15 }}
            onPress={() => setOpenResponse(false)}>
            Ok
          </Button>
        </Dialog.Actions>
      </AlertDialog>
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
