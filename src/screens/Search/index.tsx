import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useCustomTheme } from '../../contexts/theme';
import { SearchInput } from '../Home/components/SearchInput';

export const Search: React.FC = () => {
  const { colors } = useCustomTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.secundary }]}>
      <SearchInput placeholder="Pesquise aqui..." />
      <Text style={styles.title}>Configurações</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {},
});
