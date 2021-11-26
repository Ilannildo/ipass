import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useCustomTheme } from '../../contexts/theme';

type Props = {
  transparent?: boolean;
};

export const LoadingIndicator: React.FC<Props> = ({ transparent = false }) => {
  const { colors } = useCustomTheme();
  return (
    <View
      style={[
        styles.container,
        !transparent && { backgroundColor: colors.background },
      ]}>
      <ActivityIndicator color={colors.primary} size="large" />
      {!transparent && (
        <Text style={[styles.text, { color: colors.onPrimaryContainer }]}>
          Carregando
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  text: {
    marginTop: 15,
    fontSize: 16,
  },
});
