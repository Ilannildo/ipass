import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { useCustomTheme } from '../../contexts/theme';

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

    // shadowColor: 'rgba(18, 159, 219, 0.35)',
    // shadowOffset: {
    //   height: 10,
    //   width: 0,
    // },
    // shadowRadius: 8,
    // elevation: 1,
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
          backgroundColor: disabled
            ? colors.surfaceVariant
            : filled
            ? colors.primary
            : colors.background,
          borderWidth: filled ? 0 : 1,
          borderColor: colors.primary,
        },
      ]}
      disabled={disabled}
      {...rest}>
      {loading ? (
        <ActivityIndicator
          size={20}
          color={filled ? colors.background : colors.primary}
        />
      ) : (
        <Text
          style={[
            styles.btnTextCreateAccount,
            {
              fontSize: 16,
              color: disabled
                ? colors.outline
                : filled
                ? colors.background
                : colors.primary,
              opacity: disabled ? 0.3 : 1,
            },
          ]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
