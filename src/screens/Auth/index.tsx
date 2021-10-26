import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRem } from 'responsive-native';
import { useAuth } from '../../contexts/auth';
import { theme } from '../../styles/theme';
import Icon from '../../assets/icon.png';
import { useCustomTheme } from '../../contexts/theme';

export const Auth: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);
  const {
    handleSignInPassword,
    createSignatureBiometrics,
    isBiometrics,
    user,
  } = useAuth();
  const { colors } = useCustomTheme();

  const changePassword = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = () => {
    handleSignInPassword(password);
  };

  // useEffect(() => {
  //   if (isBiometrics) {
  //     createSignatureBiometrics();
  //   }
  // }, [isBiometrics]);

  const rem = useRem();
  return (
    <View style={[styles.container, { backgroundColor: colors.secundary }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.secundary} />
      <View style={[styles.header, { marginBottom: rem(1) }]}>
        <Text
          style={[styles.title, { fontSize: rem(1.5), color: colors.black }]}>
          Olá,
        </Text>
        <Text
          style={[
            styles.subtitle,
            { fontSize: rem(1.5), marginBottom: rem(0.8), color: colors.black },
          ]}>
          {user.givenName}
        </Text>
        <Text
          style={[styles.caption, { fontSize: rem(1), color: colors.title }]}>
          {isBiometrics
            ? 'Use sua digital para entrar na sua conta'
            : 'O dispositivo não possui biometria'}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => createSignatureBiometrics()}
        disabled={!isBiometrics}>
        <Image source={Icon} style={{ width: rem(9), height: rem(9) }} />
      </TouchableOpacity>

      <View
        style={[
          styles.footer,
          {
            marginTop: rem(2),
          },
        ]}>
        <View
          style={[
            styles.line,
            {
              backgroundColor: colors.secundary10,
            },
          ]}
        />
        <Text
          style={[
            styles.footerTitle,
            { fontSize: rem(1), color: colors.black },
          ]}>
          ou use sua senha
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              fontSize: rem(1),
              height: rem(2.6),
              borderColor: focused ? colors.primary : colors.grey,
              backgroundColor: colors.secundary,
              borderWidth: focused ? 2 : 0.8,
            },
          ]}
          placeholder="Digite sua senha master"
          placeholderTextColor={theme.colors.grey}
          onChangeText={changePassword}
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={[styles.button, { marginTop: rem(1.5), height: rem(2.8) }]}>
          <Text style={[styles.buttonText, { fontSize: rem(1) }]}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: theme.colors.secundary,
  },
  header: {
    width: '100%',
    paddingHorizontal: 35,
  },
  title: {
    // color: theme.colors.primary,
    fontWeight: 'bold',
  },
  subtitle: {
    color: theme.colors.title,
    fontWeight: 'normal',
  },
  caption: {
    // color: theme.colors.grey,
    fontWeight: '500',
  },
  footer: {
    width: '100%',
    paddingHorizontal: 35,
  },
  line: {
    width: '100%',
    height: 1,
    marginBottom: 7,
  },
  footerTitle: {
    // color: theme.colors.grey,
    fontWeight: '500',
    marginBottom: 14,
  },
  input: {
    width: '100%',
    paddingLeft: 30,
    color: theme.colors.title,
    fontWeight: '500',
    borderRadius: 5,
  },
  button: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginTop: 20,
  },
  buttonText: {
    color: theme.colors.secundary,
    fontWeight: 'bold',
  },
});
