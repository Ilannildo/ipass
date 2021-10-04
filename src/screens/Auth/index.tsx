import React, { useState } from 'react';
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
import { theme } from '../../styles/theme';
import icon from '../../assets/icon.png';

export const Auth: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);

  const handlePassword = (value: string) => {
    setPassword(value);
  };

  const rem = useRem();
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.secundary}
      />
      <View style={[styles.header, { marginBottom: rem(1) }]}>
        <Text style={[styles.title, { fontSize: rem(2) }]}>Olá,</Text>
        <Text
          style={[
            styles.subtitle,
            { fontSize: rem(2), marginBottom: rem(0.75) },
          ]}>
          Ilannildo
        </Text>
        <Text style={[styles.caption, { fontSize: rem(1) }]}>
          Use sua digital para entrar na sua conta
        </Text>
      </View>
      <TouchableOpacity>
        <Image source={icon} style={{ width: rem(9), height: rem(9) }} />
      </TouchableOpacity>

      <View
        style={[
          styles.footer,
          {
            marginTop: rem(2),
          },
        ]}>
        <View style={styles.line} />
        <Text style={[styles.footerTitle, { fontSize: rem(1) }]}>
          ou use sua senha
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              fontSize: rem(1),
              height: rem(2.6),
              borderColor: focused ? theme.colors.primary : theme.colors.grey,
            },
          ]}
          placeholder="Digite sua senha master"
          placeholderTextColor={theme.colors.grey}
          onChangeText={handlePassword}
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        <TouchableOpacity
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
    backgroundColor: theme.colors.secundary,
  },
  header: {
    width: '100%',
    paddingHorizontal: 35,
  },
  title: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  subtitle: {
    color: theme.colors.title,
    fontWeight: '400',
  },
  caption: {
    color: theme.colors.grey,
    fontWeight: '500',
  },
  footer: {
    width: '100%',
    paddingHorizontal: 35,
  },
  line: {
    width: '100%',
    backgroundColor: theme.colors.secundary10,
    height: 1,
    marginBottom: 7,
  },
  footerTitle: {
    color: theme.colors.grey,
    fontWeight: '500',
    marginBottom: 14,
  },
  input: {
    width: '100%',
    backgroundColor: theme.colors.secundary,
    paddingLeft: 30,
    color: theme.colors.title,
    fontWeight: '500',
    borderRadius: 16,
    borderWidth: 2,
  },
  button: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  buttonText: {
    color: theme.colors.secundary,
    fontWeight: 'bold',
  },
});
