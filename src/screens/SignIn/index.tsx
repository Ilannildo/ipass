import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Alert } from 'react-native';
import { useRem } from 'responsive-native';
import { Button } from '../../components/Button';
import { FloatingLabelInput } from '../../components/FloatingLabelInput';
import { FloatingLabelInputPassword } from '../../components/FloatingLabelInputPassword';
import { theme } from '../../styles/theme';

export const SignIn: React.FC = () => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const rem = useRem();

  const handleSubmit = () => {
    setDisableButton(true);
    setTimeout(() => {
      setError(false);
      setDisableButton(false);
      Alert.alert('Submit', `Sua senha => ${password}`);
    }, 5000);
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

  useEffect(() => {
    console.log('Pass => ', password);
    console.log('Repeat Pass => ', repeatPassword);
  }, [repeatPassword, password]);

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
          onPress={handleSubmit}
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
