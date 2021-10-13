import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRem } from 'responsive-native';
import { theme } from '../../styles/theme';
import Image1 from '../../assets/image-1.png';
import { useNavigation } from '@react-navigation/core';

export const Welcome: React.FC = () => {
  const navigation = useNavigation();
  const rem = useRem();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.secundary}
      />
      <View style={[styles.header, { marginBottom: rem(1) }]}>
        <Image
          source={Image1}
          width={rem(20)}
          height={rem(14)}
          resizeMode="contain"
        />
        <Text style={[styles.title, { fontSize: rem(1) }]}>
          Um jeito fácil e seguro de guardar suas senhas
        </Text>
      </View>

      <View
        style={[
          styles.footer,
          {
            marginTop: rem(2),
          },
        ]}>
        <TouchableOpacity
          style={[
            styles.btnCreateAccount,
            { height: rem(2.8), borderRadius: rem(1) },
          ]}>
          <Text style={[styles.btnTextCreateAccount, { fontSize: rem(1) }]}>
            Criar conta
          </Text>
        </TouchableOpacity>

        <Text style={[styles.textHasAccount, { fontSize: rem(0.85) }]}>
          Já tem uma conta?
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          style={[styles.btnLogin, { height: rem(2.8), borderRadius: rem(1) }]}>
          <Text style={[styles.btnTextLogin, { fontSize: rem(1) }]}>Login</Text>
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
    alignItems: 'center',
  },
  title: {
    color: theme.colors.black,
    fontWeight: 'bold',
    marginTop: 16,
    width: '85%',
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    paddingHorizontal: 35,
  },
  btnCreateAccount: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextCreateAccount: {
    color: theme.colors.secundary,
    fontWeight: '500',
  },
  textHasAccount: {
    color: theme.colors.title,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  btnLogin: {
    width: '100%',
    backgroundColor: theme.colors.secundary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  btnTextLogin: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
});
