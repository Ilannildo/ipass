import React from 'react';
import { View, StyleSheet, TextInput, TextInputProps } from 'react-native';
import { useCustomTheme } from '../../../../contexts/theme';

export const SearchInput: React.FC<TextInputProps> = ({ ...rest }) => {
  const { colors } = useCustomTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.secundary20 }]}>
      <TextInput
        {...rest}
        placeholderTextColor={colors.grey}
        style={[styles.input, { color: colors.black }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    borderRadius: 16,
  },
  input: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: '400',
  },
});
