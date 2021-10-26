import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Alert } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { useRem } from 'responsive-native';
import { Button } from '../../components/Button';
import { FloatingLabelInputPassword } from '../../components/FloatingLabelInputPassword';
import { useAuth } from '../../contexts/auth';
import { theme } from '../../styles/theme';

export const CreatePasswordMaster: React.FC = () => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const rem = useRem();

  const {
    user,
    savePasswordStorage,
    handleCreateKeysFingerprint,
    createSignatureBiometrics,
    handleUserNotBiocmetrics,
  } = useAuth();

  const handleSubmitPassword = async () => {
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
    setError(false);
    setDisableButton(false);
  };

  const handleBiometrics = async () => {
    const { keysExist } = await ReactNativeBiometrics.biometricKeysExist();
    if (!keysExist) {
      await handleCreateKeysFingerprint();
    }

    const result = await createSignatureBiometrics();
    if (!result) {
      console.log('Biometrics cancelled, ativo nas configs');
      await handleUserNotBiocmetrics();
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
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.secundary}
        barStyle="dark-content"
      />
      <View style={styles.header}>
        <Text style={[styles.title, { fontSize: rem(1.375) }]}>
          Senha Master
        </Text>
        <Text style={[styles.subtitle, { fontSize: rem(0.75) }]}>
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
            marginTop: rem(2.8),
            marginBottom: rem(1.25),
          },
        ]}>
        <Button
          label="Continuar"
          onPress={handleSubmitPassword}
          filled
          disabled={disableButton}
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
    backgroundColor: theme.colors.secundary,
  },
  header: {
    width: '100%',
    paddingHorizontal: 40,
  },
  title: {
    color: theme.colors.black,
    fontWeight: 'bold',
    paddingBottom: 7,
  },
  subtitle: {
    color: theme.colors.grey,
    fontWeight: 'normal',
    marginBottom: 25,
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
