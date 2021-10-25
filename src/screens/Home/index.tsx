import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { theme } from '../../styles/theme';

export const Home: React.FC = () => {
  const { user, handleSignOut } = useAuth();

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 100, height: 100 }}
        source={{
          uri: user?.photo,
        }}
      />

      <Text style={styles.title}>Bem vindo, {user?.givenName}</Text>
      <TouchableOpacity style={styles.btn} onPress={handleSignOut}>
        <Text style={styles.textLogOut}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secundary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    marginTop: 50,
    width: 300,
    height: 48,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogOut: {
    color: '#FFF',
    fontSize: 16,
  },
});
