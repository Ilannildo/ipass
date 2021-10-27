import React from 'react';
import { View, StyleSheet, TextInput, TextInputProps } from 'react-native';
import { useCustomTheme } from '../../../../contexts/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const SearchInput: React.FC<TextInputProps> = ({ ...rest }) => {
  const { colors } = useCustomTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.secundary20 }]}>
      <Ionicons name="search" size={22} color={colors.black} />
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
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 16,
    fontWeight: '400',
    width: '100%',
  },
});
