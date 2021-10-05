import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

export const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
    </View>
  );
};
