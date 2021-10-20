import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { useRem } from 'responsive-native';
import { theme } from '../../styles/theme';

type Props = TouchableOpacityProps & {
  label: string;
  filled?: boolean;
};

const styles = StyleSheet.create({
  btnCreateAccount: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 5,

    shadowColor: 'rgba(18, 159, 219, 0.35)',
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowRadius: 8,
    elevation: 10,
  },
  btnTextCreateAccount: {
    fontWeight: '500',
  },
});

export const Button: React.FC<Props> = ({
  label,
  filled = false,
  disabled,
  ...rest
}) => {
  const rem = useRem();
  return (
    <TouchableOpacity
      style={[
        styles.btnCreateAccount,
        {
          backgroundColor: filled
            ? theme.colors.primary
            : theme.colors.secundary,
          borderWidth: filled ? 0 : 1,
          borderColor: theme.colors.primary,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      disabled={disabled}
      {...rest}>
      <Text
        style={[
          styles.btnTextCreateAccount,
          {
            fontSize: rem(1),
            color: filled ? theme.colors.secundary : theme.colors.primary,
          },
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
