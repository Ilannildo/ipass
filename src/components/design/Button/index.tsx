import React from 'react';
import { Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { useCustomTheme } from '../../../contexts/theme';
import LottieView from 'lottie-react-native';
import { styles } from './styles';

type Props = RectButtonProps & {
  label: string;
  loading?: boolean;
};

export const Button: React.FC<Props> = ({
  label,
  enabled = true,
  loading = false,
  ...rest
}) => {
  const { colors, schemeColor } = useCustomTheme();
  return (
    <RectButton
      style={[
        styles.container,
        {
          backgroundColor: enabled
            ? colors.primary
            : schemeColor === 'light'
            ? 'rgba(27, 27, 31, 0.12)'
            : 'rgba(228, 225, 230, 0.12)',
        },
      ]}
      rippleColor={colors.onPrimary}
      enabled={enabled}
      {...rest}>
      {loading ? (
        <LottieView
          source={require('../../../lottie/loader.json')}
          autoPlay
          duration={1000}
          style={styles.anim}
        />
      ) : (
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
      )}
    </RectButton>
  );
};
