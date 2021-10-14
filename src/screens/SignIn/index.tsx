import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Image,
} from 'react-native';
import { GoogleSigninButton } from 'react-native-google-signin';
import { useRem } from 'responsive-native';
import { Button } from '../../components/Button';
import { FloatingLabelInput } from '../../components/FloatingLabelInput';
import Logo from '../../assets/icon.png';

import { useAuth } from '../../contexts/auth';
import { theme } from '../../styles/theme';

export const SignIn: React.FC = () => {
  const { handleSignIn } = useAuth();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const rem = useRem();

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.secundary}
        barStyle="dark-content"
      />
      <View style={styles.header}>
        <Text style={[styles.title, { fontSize: rem(1.375) }]}>
          Seja bem vindo,
        </Text>
        <Text style={[styles.subtitle, { fontSize: rem(0.875) }]}>
          Faça login para continuar
        </Text>
      </View>

      <View style={styles.formArea}>
        <FloatingLabelInput
          label="E-mail"
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
        />
        <FloatingLabelInput
          label="Senha"
          secureTextEntry
          onChangeText={text => setPass(text)}
        />

        <View
          style={{
            marginTop: rem(2.8),
            marginBottom: rem(1.25),
            width: '100%',
          }}>
          <Button label="Login" onPress={() => {}} filled />
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Text style={[styles.buttonTextForgotPass, { fontSize: rem(0.75) }]}>
            Recuperar senha?
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={[styles.textOr, { marginTop: rem(2.8), fontSize: rem(0.875) }]}>
        ou
      </Text>

      <View style={styles.footer}>
        <GoogleSigninButton
          style={styles.googleSigninBtn}
          size={GoogleSigninButton.Size.Wide}
          onPress={handleSignIn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  },
  googleSigninBtn: {
    width: '100%',
    height: 55,
    marginTop: 20,
  },
  formArea: {
    width: '100%',
    paddingHorizontal: 40,
    marginTop: 40,
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
