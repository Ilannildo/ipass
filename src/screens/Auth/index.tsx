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
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput, Snackbar } from 'react-native-paper';
import { useCustomTheme } from '../../contexts/theme';
// import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/auth';
import { useBiometry } from '../../contexts/biometry';
import { Button } from '../../components/design/Button';
import LottieView from 'lottie-react-native';

const FingerLight = require('../../lottie/finger-light.json');
const FingerErrorLight = require('../../lottie/finger-error-light.json');
const FingerSuccessLight = require('../../lottie/finger-success-light.json');

export const Auth: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [passwordVisble, setPasswordVisible] = useState<boolean>(false);
  const [biometricSuccess, setBiometricSuccess] = useState<boolean>(false);
  const [biometricError, setBiometricError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [visibleSnackBar, setVisibleSnackBar] = useState<boolean>(false);

  const { colors, schemeColor } = useCustomTheme();
  const { handleSignInPassword, handleLoggedUser, user } = useAuth();
  const { isBiometrics, handleSimpleBiometrics } = useBiometry();

  useEffect(() => {
    const handleBiometrics = async () => {
      setBiometricError(false);
      setBiometricSuccess(false);
      const result = await handleSimpleBiometrics();
      if (!result) {
        setBiometricError(true);
      } else {
        setBiometricSuccess(true);
        setTimeout(() => {
          handleLoggedUser();
        }, 1700);
      }
    };

    if (isBiometrics) {
      handleBiometrics();
    }
  }, [handleSimpleBiometrics, isBiometrics, handleLoggedUser]);

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
        <Text style={[styles.title, { color: colors.onSurface }]}>
          {user.givenName
            ? `Bem vindo ${user.givenName}`
            : 'Bem vindo de volta ao My Access'}
        </Text>
        <View style={styles.inputArea}>
          <TextInput
            label="Senha master"
            mode="flat"
            placeholder="Digite sua senha master"
            onChangeText={changePassword}
            placeholderTextColor={colors.outline}
            secureTextEntry={!passwordVisble}
            value={password}
            returnKeyType="done"
            onEndEditing={handleSubmit}
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
            right={
              <TextInput.Icon
                name={passwordVisble ? 'eye-off' : 'eye'}
                onPress={togglePasswordVisible}
                color={colors.outline}
              />
            }
            children={undefined}
            autoComplete={false}
          />
        </View>

        {isBiometrics && (
          <View style={styles.info}>
            {biometricError ? (
              <LottieView
                source={FingerErrorLight}
                autoPlay
                // loop
                colorFilters={[
                  {
                    keypath: 'Layer 4',
                    color: colors.error,
                  },
                  {
                    keypath: 'Layer 3',
                    color: colors.error,
                  },
                  {
                    keypath: 'red',
                    color: colors.error,
                  },
                  {
                    keypath: 'gray',
                    color: colors.secondaryContainer,
                  },
                ]}
                style={styles.anim}
              />
            ) : biometricSuccess ? (
              <LottieView
                source={FingerSuccessLight}
                autoPlay
                // loop
                colorFilters={[
                  {
                    keypath: 'Layer 3',
                    color: colors.success,
                  },
                  {
                    keypath: 'red',
                    color: colors.success,
                  },
                  {
                    keypath: 'gray',
                    color: colors.secondaryContainer,
                  },
                ]}
                style={styles.anim}
              />
            ) : (
              <LottieView
                source={FingerLight}
                autoPlay
                // loop
                colorFilters={[
                  {
                    keypath: 'Shape Layer 11',
                    color: colors.primary,
                  },
                  {
                    keypath: 'Shape Layer 10',
                    color: colors.primary,
                  },
                  {
                    keypath: 'Shape Layer 8',
                    color: colors.primary,
                  },
                  {
                    keypath: 'Shape Layer 7',
                    color: colors.primary,
                  },
                  {
                    keypath: 'Shape Layer 13',
                    color: colors.primary,
                  },
                  {
                    keypath: 'Shape Layer 14',
                    color: colors.secondaryContainer,
                  },
                  {
                    keypath: 'Shape Layer 6',
                    color: colors.secondaryContainer,
                  },
                  {
                    keypath: 'Shape Layer 5',
                    color: colors.secondaryContainer,
                  },
                  {
                    keypath: 'Shape Layer 3',
                    color: colors.secondaryContainer,
                  },
                  {
                    keypath: 'Shape Layer 2',
                    color: colors.secondaryContainer,
                  },
                ]}
                style={styles.anim}
              />
            )}

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
                ? 'Impressão digital cancelada'
                : biometricSuccess
                ? 'Impressão digital reconhecida'
                : 'Sensor de impressão digital'}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.btnArea}>
        <Button
          label="Entrar"
          enabled={password !== ''}
          onPress={handleSubmit}
          loading={loading}
        />

        <TouchableOpacity>
          <Text style={[styles.textInfo, { color: colors.primary }]}>
            Esqueceu sua senha master?
          </Text>
        </TouchableOpacity>
      </View>
      <Snackbar
        visible={visibleSnackBar}
        onDismiss={() => setVisibleSnackBar(false)}
        duration={1000}
        action={{
          label: 'Fechar',
          color: colors.primary,
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
    justifyContent: 'space-evenly',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 24,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
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
    marginTop: 40,
    alignItems: 'center',
  },
  textInfo: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 16,
  },
  icon: {
    marginBottom: 5,
  },
  btnArea: {
    width: '100%',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  anim: {
    marginBottom: 10,
    width: 50,
    height: 50,
  },
});
