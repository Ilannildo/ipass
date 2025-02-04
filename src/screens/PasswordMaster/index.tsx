import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useAuth } from '../../contexts/auth';
import { useCustomTheme } from '../../contexts/theme';
import { useBiometry } from '../../contexts/biometry';
import { Button } from '../../components/design/Button';
import { Dialog, TextInput, Button as Bt, Paragraph } from 'react-native-paper';
import { verifyPasswordForce } from '../../utils/roles';
import { AlertDialog } from '../../components/design/Dialog';

export const PasswordMaster: React.FC = () => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [forcePassword, setForcePasword] = useState<string>('');
  const [error, setError] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [enableAlert, setEnableAlert] = useState(false);

  const {
    user,
    savePasswordStorage,
    handleUserNotBiometrics,
    handleLoggedUser,
  } = useAuth();

  const { handleSimpleBiometrics, enableBiometrics, isAvaliableBiometrics } =
    useBiometry();

  const { colors, schemeColor } = useCustomTheme();

  const handleSubmitPassword = async () => {
    setLoading(true);
    setDisableButton(true);
    setError(false);

    await savePasswordStorage(user.uid, password);
    setLoading(false);
    if (isAvaliableBiometrics) {
      setEnableAlert(true);
    } else {
      handleLoggedUser();
    }
  };

  const handleBiometrics = async () => {
    setLoading(true);
    setEnableAlert(false);
    const result = await handleSimpleBiometrics();

    if (!result) {
      setLoading(false);
      handleUserNotBiometrics();
    } else {
      await enableBiometrics();
      handleLoggedUser();
    }
  };
  const handleNotBiometrics = async () => {
    setLoading(false);
    setEnableAlert(false);
    handleUserNotBiometrics();
  };

  const handleTextPass = (text: string) => {
    setPassword(text);
    verifyPasswordForce(text);
    const force = verifyPasswordForce(text);
    console.log('Força =>', force);
    if (force <= -20) {
      setForcePasword('');
    } else if (force < 30) {
      setForcePasword('fraca');
    } else if (force >= 30 && force < 60) {
      setForcePasword('media');
    } else {
      setForcePasword('forte');
    }
  };

  const handleTextRepeatPass = (text: string) => {
    if (text !== password) {
      setError(true);
      setDisableButton(true);
    } else {
      setError(false);
      setDisableButton(false);
    }
    setRepeatPassword(text);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        backgroundColor={colors.primary}
        barStyle={schemeColor === 'dark' ? 'dark-content' : 'light-content'}
      />
      <AlertDialog
        visible={enableAlert}
        onDismiss={() => handleNotBiometrics()}>
        <Dialog.Title style={{ color: colors.onSurface }}>
          Usar impressão digital?
        </Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            Deseja habilitar sua Digital para realizar ações dentro do app?
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Bt
            style={{ marginRight: 20 }}
            color={colors.primary}
            onPress={() => handleNotBiometrics()}>
            Agora não
          </Bt>
          <Bt
            color={colors.primary}
            style={{ marginRight: 15 }}
            onPress={() => {
              handleBiometrics();
            }}>
            Sim
          </Bt>
        </Dialog.Actions>
      </AlertDialog>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.onSurface }]}>
              Senha Master
            </Text>
            <Text style={[styles.subtitle, { color: colors.secondary }]}>
              A senha master é a única senha que você precisa lembrar.Lembre-se
              dela, pois não será possível recuperar e todas as senhas serão
              perdidas
            </Text>
            <View style={styles.inputArea}>
              <TextInput
                label={'Senha master'}
                value={password}
                mode="flat"
                placeholder={'Digite sua senha master'}
                onChangeText={handleTextPass}
                returnKeyType="next"
                style={{
                  backgroundColor:
                    schemeColor === 'dark'
                      ? 'rgba(158, 163, 255, 0.03)'
                      : 'rgba(77, 81, 189, 0.03)',
                }}
                theme={{
                  colors: {
                    text: colors.onSurface,
                    placeholder: colors.outline,
                    primary: colors.primary,
                  },
                }}
                underlineColor={colors.outline}
                activeUnderlineColor={colors.primary}
                selectTextOnFocus
                selectionColor={colors.primary}
                children={undefined}
                autoComplete={false}
              />
            </View>
            <View style={styles.inputArea}>
              <TextInput
                label={'Repita sua senha master'}
                value={repeatPassword}
                mode="flat"
                placeholder={'Confirme sua senha master'}
                onChangeText={handleTextRepeatPass}
                returnKeyType="next"
                style={{
                  backgroundColor:
                    schemeColor === 'dark'
                      ? 'rgba(158, 163, 255, 0.03)'
                      : 'rgba(77, 81, 189, 0.03)',
                }}
                theme={{
                  colors: {
                    text: colors.onSurface,
                    placeholder: colors.outline,
                    primary: colors.primary,
                    error: colors.error,
                  },
                }}
                underlineColor={colors.outline}
                activeUnderlineColor={colors.primary}
                selectTextOnFocus
                selectionColor={colors.primary}
                error={error}
                children={undefined}
                autoComplete={false}
              />
              {error && (
                <Text style={[styles.error, { color: colors.error }]}>
                  As senhas não são iguais
                </Text>
              )}
            </View>

            <View style={styles.footer}>
              <Text style={[styles.title, { color: colors.onSurface }]}>
                {forcePassword}
              </Text>
              <Button
                label="Continuar"
                onPress={handleSubmitPassword}
                enabled={!disableButton}
                loading={loading}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingBottom: 40,
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  header: {
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 30,
  },
  title: {
    fontWeight: '500',
    paddingBottom: 16,
    fontSize: 24,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'normal',
    marginBottom: 26,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  footer: {
    width: '100%',
    // paddingHorizontal: 24,
    marginTop: 44,
    marginBottom: 20,
  },
  inputArea: {
    width: '100%',
    marginTop: 30,
    marginBottom: 10,
    // marginLeft: 30,
    // paddingRight: 30,
  },
  error: {
    fontSize: 14,
    marginTop: 10,
  },
});
