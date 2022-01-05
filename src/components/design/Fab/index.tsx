import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useCustomTheme } from '../../../contexts/theme';
import { styles } from './styles';

export const Fab: React.FC<RectButtonProps> = ({ onPress }) => {
  const { colors } = useCustomTheme();
  return (
    <RectButton
      rippleColor={colors.onPrimaryContainer}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: colors.primaryContainer,
        },
      ]}>
      <MaterialIcons name="add" size={24} color={colors.onPrimaryContainer} />
    </RectButton>
  );
};
