import React from 'react';
import { Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { useCustomTheme } from '../../../contexts/theme';
import { styles } from './styles';

type Props = RectButtonProps & {
  label: string;
};

export const Button: React.FC<Props> = ({ label, enabled = true, ...rest }) => {
  const { colors } = useCustomTheme();
  return (
    <RectButton
      style={[
        styles.container,
        {
          backgroundColor: enabled ? colors.primary : 'rgba(27, 27, 31, 0.12)',
        },
      ]}
      rippleColor={colors.onPrimary}
      enabled={enabled}
      {...rest}>
      <Text
        style={[
          styles.label,
          {
            color: enabled ? colors.onPrimary : colors.onSurface,
            opacity: enabled ? 1 : 0.38,
          },
        ]}>
        {label || 'Label'}
      </Text>
    </RectButton>
  );
};
