import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
// import ReactNativeBiometrics from 'react-native-biometrics';
// import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { useAuth } from '../../contexts/auth';
import { useCustomTheme } from '../../contexts/theme';
import { useBiometry } from '../../contexts/biometry';
import { Button } from '../../components/design/Button';
import { TextInput } from 'react-native-paper';
import { verifyPasswordForce } from '../../utils/roles';

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
            mode="outlined"
            placeholder={'Digite sua senha master'}
            onChangeText={handleTextPass}
            returnKeyType="next"
            style={{
              backgroundColor: colors.background,
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
            selectionColor={colors.primary}
            children={undefined}
            autoComplete={false}
          />
        </View>
        <View style={styles.inputArea}>
          <TextInput
            label={'Repita sua senha master'}
            value={repeatPassword}
            mode="outlined"
            placeholder={'Confirme sua senha master'}
            onChangeText={handleTextRepeatPass}
            returnKeyType="next"
            style={{
              backgroundColor: colors.background,
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
            selectionColor={colors.primary}
            children={undefined}
            autoComplete={false}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.title, { color: colors.onSurface }]}>
          {forcePassword}
        </Text>
        <Button
          label="Continuar"
          onPress={handleSubmitPassword}
          enabled={!disableButton}
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
    paddingHorizontal: 24,
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
});
