import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { FloatingLabelInputPassword } from '../../components/FloatingLabelInputPassword';
import { useAuth } from '../../contexts/auth';
import { useCustomTheme } from '../../contexts/theme';
import { useBiometry } from '../../contexts/biometry';

export const CreatePasswordMaster: React.FC = () => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
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

  const {
    // handleCreateKeysFingerprint,
    handleSimpleBiometrics,
    enableBiometrics,
    isAvaliableBiometrics,
  } = useBiometry();

  const { colors, schemeColor } = useCustomTheme();

  const handleSubmitPassword = async () => {
    setLoading(true);
    setDisableButton(true);

    await savePasswordStorage(user.uid, password);
    if (isAvaliableBiometrics) {
      // const { keysExist } = await ReactNativeBiometrics.biometricKeysExist();
      // if (!keysExist) {
      //   await handleCreateKeysFingerprint();
      // }
      setEnableAlert(true);
    } else {
      handleLoggedUser();
    }
    setLoading(false);
    setError(false);
    setDisableButton(false);
  };

  const handleBiometrics = async () => {
    setLoading(true);
    setEnableAlert(false);
    const result = await handleSimpleBiometrics();

    if (!result) {
      console.log('Biometrics cancelled, ativo nas configs');
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
  };

  const handleTextRepeatPass = (text: string) => {
    if (text !== password) {
      setError(true);
    } else {
      setError(false);
      setDisableButton(false);
    }
    setRepeatPassword(text);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={schemeColor === 'light' ? 'dark-content' : 'light-content'}
      />
      <Alert
        title="Usar impressão digital?"
        message="Deseja habilitar sua Digital para realizar ações dentro do app?"
        visible={enableAlert}
        onConfirmText="Habilitar digital"
        onCancelText="Ainda não"
        onConfirm={() => handleBiometrics()}
        onCancel={() => handleNotBiometrics()}
      />
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.onPrimaryContainer }]}>
          Senha Master
        </Text>
        <Text style={[styles.subtitle, { color: colors.secondary }]}>
          A senha master é a única senha que você precisa lembrar.Lembre-se
          dela, pois não será possível recuperar e todas as senhas serão
          perdidas
        </Text>

        <FloatingLabelInputPassword
          label="Senha Master"
          isPassword
          secureTextEntry
          onChangeText={handleTextPass}
        />
        <FloatingLabelInputPassword
          error={error}
          label="Confirme sua senha master"
          secureTextEntry
          onChangeText={handleTextRepeatPass}
        />
      </View>
      <View style={styles.footer}>
        <Button
          label="Continuar"
          onPress={handleSubmitPassword}
          filled
          disabled={disableButton}
          loading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingBottom: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    paddingHorizontal: 40,
    marginTop: 30,
  },
  title: {
    fontWeight: 'bold',
    paddingBottom: 7,
    fontSize: 22,
  },
  subtitle: {
    fontWeight: 'normal',
    marginBottom: 25,
    fontSize: 14,
    opacity: 0.6,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 40,
    marginTop: 44,
    marginBottom: 20,
  },
});
