import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useCustomTheme } from '../../contexts/theme';
import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/auth';

export const Authenticate: React.FC = () => {
  const { colors } = useCustomTheme();
  const [password, setPassword] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);
  const [biometricSuccess, setBiometricSuccess] = useState<boolean>(false);
  const [biometricError, setBiometricError] = useState<boolean>(false);

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
  }, [isBiometrics]);

  const changePassword = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = () => {
    console.log('Password >', password);
    // handleSignInPassword(password);
  };
  return (
    <View style={[styles.container, { backgroundColor: colors.secundary }]}>
      <StatusBar backgroundColor={colors.secundary} />
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../../assets/icon.png')} />
        <Text style={[styles.title, { color: colors.black }]}>
          MyAccess Password Manager
        </Text>

        <TextInput
          placeholder="Senha master"
          onChangeText={changePassword}
          placeholderTextColor={colors.grey}
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[
            styles.input,
            {
              color: colors.black,
              borderColor: focused ? colors.primary : colors.title,
              borderWidth: focused ? 1 : 0.8,
            },
          ]}
        />

        <Button label="Debloquear" filled onPress={handleSubmit} />

        <View style={styles.info}>
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
            [ o ]
          </Text>
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
              ? 'Biometria reconhecida'
              : 'Sensor de biometria'}
          </Text>
        </View>
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
  input: {
    width: '100%',
    marginTop: 40,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 14,
    paddingLeft: 20,
    marginBottom: 20,
  },
  info: {
    marginTop: 60,
    alignItems: 'center',
  },
  textInfo: {
    fontSize: 14,
    fontWeight: '500',
  },
});
