import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { useCustomTheme } from '../../contexts/theme';

export const Configuration: React.FC = () => {
  const { colors, schemeColor } = useCustomTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        backgroundColor={colors.inverseOnSurface}
        barStyle={schemeColor === 'light' ? 'dark-content' : 'light-content'}
      />
      <Text style={[styles.title, { color: colors.onPrimaryContainer }]}>
        Configurações
      </Text>
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
