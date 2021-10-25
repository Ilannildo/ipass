import React from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { GoogleSigninButton } from 'react-native-google-signin';
import { useAuth } from '../../contexts/auth';
import { useRem } from 'responsive-native';
import { theme } from '../../styles/theme';

import Image1 from '../../assets/image-1.png';
import { useCustomTheme } from '../../contexts/theme';
import { LoadingIndicator } from '../../components/LoadingIndicator';

export const WelcomeSignIn: React.FC = () => {
  const { handleSignIn, loadingSignIn } = useAuth();
  const { schemeColor, colors } = useCustomTheme();
  const rem = useRem();

  const handleSignInGoogle = async () => {
    handleSignIn();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.secundary }]}>
      <StatusBar
        barStyle={schemeColor === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.secundary}
      />
      {loadingSignIn && <LoadingIndicator transparent />}
      <View style={[styles.header, { marginBottom: rem(1) }]}>
        <Text
          style={[
            styles.title,
            {
              fontSize: rem(1.25),
              marginBottom: rem(1.3),
              color: colors.black,
            },
          ]}>
          {'Um jeito fácil e seguro\nde guardar suas senhas'}
        </Text>
        <Image
          source={Image1}
          width={rem(20)}
          height={rem(14)}
          resizeMode="contain"
        />
      </View>

      <View style={styles.footer}>
        <Text
          style={[
            styles.textHasAccount,
            { fontSize: rem(1.125), color: colors.title },
          ]}>
          {'Faça login ou crie uma conta\nGRATUITA'}
        </Text>

        <Text style={[styles.textDescrip, { fontSize: rem(0.75) }]}>
          {
            'Crie uma conta para maior segurança, backup dos seus dados  e muito mais'
          }
        </Text>

        <GoogleSigninButton
          style={styles.googleSigninBtn}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleSignInGoogle}
          // onPress={() => toggleThemeDefault()}
          // onPress={() => navigation.navigate('SignIn')}
          disabled={loadingSignIn}
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
    // backgroundColor: theme.colors.secundary,
  },
  header: {
    width: '100%',
    paddingHorizontal: 35,
    alignItems: 'center',
  },
  title: {
    // color: theme.colors.black,
    fontWeight: 'bold',
    marginTop: 16,
    width: '85%',
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    paddingHorizontal: 35,
  },
  textHasAccount: {
    // color: theme.colors.title,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 34,
  },
  textDescrip: {
    color: theme.colors.grey,
    fontWeight: 'normal',
    textAlign: 'center',
    marginBottom: 20,
  },
  googleSigninBtn: {
    width: '100%',
    height: 55,
    marginTop: 20,
  },
});
