import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Keyboard,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput, Snackbar } from 'react-native-paper';
import { useCustomTheme } from '../../contexts/theme';
import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/auth';

export const Authenticate: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);
  const [passwordVisble, setPasswordVisible] = useState<boolean>(false);
  const [biometricSuccess, setBiometricSuccess] = useState<boolean>(false);
  const [biometricError, setBiometricError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [visibleSnackBar, setVisibleSnackBar] = useState<boolean>(false);

  const { colors, schemeColor } = useCustomTheme();
  const {
    handleSignInPassword,
    createSignatureBiometrics,
    isBiometrics,
    handleLoggedUser,
  } = useAuth();

  useEffect(() => {
    const handleBiometrics = async () => {
      setBiometricError(false);
      setBiometricSuccess(false);
      const result = await createSignatureBiometrics();
      if (!result) {
        setBiometricError(true);
      } else {
        setBiometricSuccess(true);
        setTimeout(() => {
          handleLoggedUser();
        }, 500);
      }
    };

    if (isBiometrics) {
      handleBiometrics();
    }
  }, [createSignatureBiometrics, isBiometrics, handleLoggedUser]);

  const changePassword = (value: string) => {
    setPassword(value);
  };

  const togglePasswordVisible = () => {
    setPasswordVisible(old => !old);
  };

  const handleSubmit = async () => {
    if (password !== '') {
      Keyboard.dismiss();
      setLoading(true);
      const result = await handleSignInPassword(password);
      if (!result) {
        setVisibleSnackBar(!visibleSnackBar);
        setLoading(false);
      } else {
        setTimeout(() => {
          handleLoggedUser();
        }, 500);
      }
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={schemeColor === 'dark' ? 'light-content' : 'dark-content'}
      />

      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../../assets/logo-app.png')}
        />
        <Text style={[styles.title, { color: colors.onPrimaryContainer }]}>
          My Access
        </Text>
        <View style={styles.inputArea}>
          <TextInput
            label="Senha master"
            mode="outlined"
            placeholder="Digite sua senha master"
            onChangeText={changePassword}
            placeholderTextColor={colors.outline}
            secureTextEntry={!passwordVisble}
            value={password}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            returnKeyType="done"
            onEndEditing={handleSubmit}
            style={{
              backgroundColor: colors.background,
            }}
            theme={{
              colors: {
                text: colors.onPrimaryContainer,
                placeholder: colors.outline,
              },
            }}
            activeOutlineColor={colors.primary}
            outlineColor={colors.outline}
            selectionColor={colors.onPrimaryContainer}
            right={
              <TextInput.Icon
                name={passwordVisble ? 'eye-off' : 'eye'}
                onPress={togglePasswordVisible}
                color={colors.onPrimaryContainer}
              />
            }
            children={undefined}
            autoComplete={false}
          />
        </View>

        <Button
          label="Debloquear"
          filled
          onPress={handleSubmit}
          disabled={password === ''}
          loading={loading}
        />

        {isBiometrics && (
          <View style={styles.info}>
            <MaterialCommunityIcons
              name={biometricError ? 'fingerprint-off' : 'fingerprint'}
              size={24}
              style={styles.icon}
              color={
                biometricError
                  ? colors.error
                  : biometricSuccess
                  ? colors.success
                  : colors.onPrimaryContainer
              }
            />
            <Text
              style={[
                styles.textInfo,
                {
                  color: biometricError
                    ? colors.error
                    : biometricSuccess
                    ? colors.success
                    : colors.onPrimaryContainer,
                },
              ]}>
              {biometricError
                ? 'Impressão digital cancelada pelo usuário'
                : biometricSuccess
                ? 'Impressão digital reconhecida'
                : 'Sensor de impressão digital'}
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity>
        <Text style={[styles.textInfo, { color: colors.primary }]}>
          Esqueceu sua senha master?
        </Text>
      </TouchableOpacity>
      <Snackbar
        visible={visibleSnackBar}
        onDismiss={() => setVisibleSnackBar(false)}
        duration={700}
        action={{
          label: 'Fechar',
          onPress: () => {
            console.log('Fechou snack');
          },
        }}>
        Senha incorreta
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '500',
  },
  inputArea: {
    width: '100%',
    marginTop: 40,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    fontSize: 14,
  },
  info: {
    marginTop: 60,
    alignItems: 'center',
  },
  textInfo: {
    fontSize: 14,
    fontWeight: '500',
  },
  icon: {
    marginBottom: 5,
  },
});
