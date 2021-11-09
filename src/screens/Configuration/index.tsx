import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { useCustomTheme } from '../../contexts/theme';

export const Configuration: React.FC = () => {
  const { colors } = useCustomTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.secundary }]}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Text style={[styles.title, { color: colors.black }]}>Configurações</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {},
});
