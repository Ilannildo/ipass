import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useCustomTheme } from '../../../contexts/theme';
import { styles } from './styles';

type Props = RectButtonProps & {
  color: number;
  icon: string;
};

export const RoundButton: React.FC<Props> = ({ color, icon, ...rest }) => {
  const { colors } = useCustomTheme();
  return (
    <RectButton
      {...rest}
      style={[
        styles.container,
        {
          backgroundColor:
            color === 1
              ? colors.color1
              : color === 2
              ? colors.color2
              : color === 3
              ? colors.color3
              : color === 4
              ? colors.color4
              : colors.color5,
        },
      ]}>
      <MaterialIcons
        name={icon || 'mode-edit'}
        color={colors.onPrimaryContainer}
        size={24}
      />
    </RectButton>
  );
};
