import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { useCustomTheme } from '../../contexts/theme';
import { theme } from '../../styles/theme';

type Props = TouchableOpacityProps & {
  label: string;
  filled?: boolean;
  loading?: boolean;
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
  loading = false,
  ...rest
}) => {
  const { colors } = useCustomTheme();
  return (
    <TouchableOpacity
      style={[
        styles.btnCreateAccount,
        {
          backgroundColor: filled ? colors.primary : colors.secundary,
          borderWidth: filled ? 0 : 1,
          borderColor: colors.primary,
          opacity: disabled ? 0.1 : 1,
        },
      ]}
      disabled={disabled}
      {...rest}>
      {loading ? (
        <ActivityIndicator
          size={20}
          color={filled ? colors.secundary : colors.primary}
        />
      ) : (
        <Text
          style={[
            styles.btnTextCreateAccount,
            {
              fontSize: 16,
              color: disabled
                ? colors.primary
                : filled
                ? colors.secundary
                : colors.primary,
            },
          ]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
