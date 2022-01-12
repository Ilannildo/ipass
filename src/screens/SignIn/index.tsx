import React from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { GoogleSigninButton } from 'react-native-google-signin';
import { useAuth } from '../../contexts/auth';

import Image1 from '../../assets/image-1.png';
import { useCustomTheme } from '../../contexts/theme';
import { LoadingIndicator } from '../../components/LoadingIndicator';

export const SignIn: React.FC = () => {
  const { handleSignIn, loadingSignIn } = useAuth();
  const { schemeColor, colors } = useCustomTheme();

  const handleSignInGoogle = async () => {
    await handleSignIn();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={schemeColor === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.background}
      />
      {loadingSignIn && <LoadingIndicator transparent />}
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {
              color: colors.onSurface,
            },
          ]}>
          {'Um jeito fácil e seguro\nde guardar suas senhas'}
        </Text>
        <Image source={Image1} width={320} height={224} resizeMode="contain" />
      </View>

      <View style={styles.footer}>
        <Text style={[styles.textHasAccount, { color: colors.onBackground }]}>
          {'Faça login ou crie uma conta\nGRATUITA'}
        </Text>

        <Text style={[styles.textDescrip, { color: colors.onBackground }]}>
          {
            'Crie uma conta para maior segurança, backup dos seus dados  e muito mais'
          }
        </Text>

        <GoogleSigninButton
          style={styles.googleSigninBtn}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleSignInGoogle}
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
    marginBottom: 16,
  },
  title: {
    // color: theme.colors.black,
    fontWeight: 'bold',
    marginTop: 16,
    width: '85%',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
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
    fontSize: 18,
  },
  textDescrip: {
    fontWeight: 'normal',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
  },
  googleSigninBtn: {
    width: '100%',
    height: 55,
    marginTop: 20,
  },
});
