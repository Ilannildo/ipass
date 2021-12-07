import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useCustomTheme } from '../../contexts/theme';

type Props = {
  title: string;
  iconName: string;
  onPress: () => void;
};

export const MenuItem: React.FC<Props> = ({ title, iconName, onPress }) => {
  const { colors } = useCustomTheme();
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.background }]}
      onPress={onPress}
      activeOpacity={0.8}>
      {iconName === 'user' ||
      iconName === 'file-text' ||
      iconName === 'shield' ? (
        <Feather name={iconName} size={28} color={colors.onPrimaryContainer} />
      ) : (
        <Ionicons
          name={iconName || 'menu'}
          size={28}
          color={colors.onPrimaryContainer}
        />
      )}
      <Text style={[styles.title, { color: colors.onPrimaryContainer }]}>
        {title || 'Título do menu'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 30,
    elevation: 0.1,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 30,
  },
});
