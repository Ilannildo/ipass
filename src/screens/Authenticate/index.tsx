import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ToastAndroid,
  Keyboard,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
    Keyboard.dismiss();
    setLoading(true);
    if (password !== '') {
      const result = await handleSignInPassword(password);
      if (!result) {
        setLoading(false);
        ToastAndroid.show('Senha incorreta', 2000);
      } else {
        setTimeout(() => {
          setLoading(false);
          handleLoggedUser();
        }, 1000);
      }
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: colors.secundary }]}>
      {/* {loading && <LoadingIndicator transparent />} */}
      <StatusBar
        backgroundColor={colors.secundary}
        barStyle={schemeColor === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../../assets/icon.png')} />
        <Text style={[styles.title, { color: colors.black }]}>
          MyAccess Password Manager
        </Text>
        <View
          style={[
            styles.inputArea,
            {
              borderColor: focused ? colors.primary : colors.title,
              borderWidth: focused ? 1 : 0.8,
            },
          ]}>
          <TextInput
            placeholder="Senha master"
            onChangeText={changePassword}
            placeholderTextColor={colors.grey}
            secureTextEntry={!passwordVisble}
            autoCapitalize="none"
            value={password}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            returnKeyType="done"
            onEndEditing={handleSubmit}
            style={[
              styles.input,
              {
                color: colors.black,
              },
            ]}
          />
          <TouchableOpacity onPress={togglePasswordVisible}>
            <MaterialCommunityIcons
              name={passwordVisble ? 'eye-off' : 'eye'}
              size={20}
            />
          </TouchableOpacity>
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
                  : colors.black
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
                    : colors.black,
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
    fontSize: 16,
    fontWeight: '500',
  },
  inputArea: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
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
