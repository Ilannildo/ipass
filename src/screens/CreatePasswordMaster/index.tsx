import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Alert } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { Button } from '../../components/Button';
import { FloatingLabelInputPassword } from '../../components/FloatingLabelInputPassword';
import { useAuth } from '../../contexts/auth';
import { useCustomTheme } from '../../contexts/theme';
import { theme } from '../../styles/theme';

export const CreatePasswordMaster: React.FC = () => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    user,
    savePasswordStorage,
    handleCreateKeysFingerprint,
    createSignatureBiometrics,
    handleUserNotBiocmetrics,
    handleLoggedUser,
  } = useAuth();

  const { colors, schemeColor } = useCustomTheme();

  const handleSubmitPassword = async () => {
    setLoading(true);
    setDisableButton(true);

    await savePasswordStorage(user.uid, password);
    const { biometryType } = await ReactNativeBiometrics.isSensorAvailable();
    if (biometryType === ReactNativeBiometrics.Biometrics) {
      Alert.alert(
        'Usar sua digital',
        'Deseja habilitar sua Digital para realizar ações dentro do app?',
        [
          {
            text: 'Habilitar digital',
            onPress: async () => await handleBiometrics(),
            style: 'default',
          },
          {
            text: 'Ainda não',
            onPress: () => handleUserNotBiocmetrics(),
            style: 'cancel',
          },
        ],
      );
    }
    setLoading(false);
    setError(false);
    setDisableButton(false);
  };

  const handleBiometrics = async () => {
    setLoading(true);
    const { keysExist } = await ReactNativeBiometrics.biometricKeysExist();
    if (!keysExist) {
      await handleCreateKeysFingerprint();
    }

    const result = await createSignatureBiometrics();
    if (!result) {
      console.log('Biometrics cancelled, ativo nas configs');
      await handleUserNotBiocmetrics();
      setLoading(false);
    } else {
      handleLoggedUser();
      setLoading(false);
    }
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
      <View
        style={[
          styles.footer,
          {
            marginTop: 44,
            marginBottom: 20,
          },
        ]}>
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
  },
  button: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: theme.colors.secundary,
    fontWeight: 'bold',
  },
  buttonTextForgotPass: {
    color: theme.colors.title,
    textAlign: 'right',
  },
  textOr: {
    textAlign: 'center',
    color: theme.colors.title,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 40,
  },
});
