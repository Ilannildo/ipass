import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { theme } from '../../styles/theme';

export const SignIn: React.FC = () => {
  const { handleSignIn } = useAuth();

  return (
    <View style={styles.container}>
      <Text>Olá mundo!</Text>
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
});
