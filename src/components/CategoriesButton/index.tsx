import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { useCustomTheme } from '../../contexts/theme';

type Props = RectButtonProps & {
  title: string;
  selected: boolean;
};

export const CategoriesButton: React.FC<Props> = ({
  title,
  selected = false,
  ...rest
}) => {
  const { colors } = useCustomTheme();
  return (
    <RectButton
      style={[
        styles.container,
        {
          backgroundColor: selected ? colors.primary : colors.primaryContainer,
        },
      ]}
      {...rest}>
      <Text
        style={[
          styles.title,
          { color: selected ? colors.onPrimary : colors.primary },
        ]}>
        {title}
      </Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 40,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
});
