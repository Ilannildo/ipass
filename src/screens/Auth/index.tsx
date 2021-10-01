import React from 'react';
import { Text, View, Image, StatusBar } from 'react-native';
import { styles } from './styles';

import icon from '../../assets/icon.png';

export const Auth: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <Text style={styles.title}>Auth Screen</Text>
        <Text>Ilannildo</Text>
        <Text>Use sua digital para entrar na sua conta</Text>
      </View>
      <Image source={icon} />
    </View>
  );
};
