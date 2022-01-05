import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useCustomTheme } from '../../../contexts/theme';
import { styles } from './styles';

type Props = TouchableOpacityProps & {
  label: string;
  selected?: boolean;
  icon: boolean;
};

export const Ship: React.FC<Props> = ({ label, selected, icon, ...rest }) => {
  const { colors } = useCustomTheme();
  return (
    <TouchableOpacity
      {...rest}
      style={[
        styles.container,
        {
          backgroundColor: selected
            ? colors.secondaryContainer
            : colors.surface,
          borderWidth: 1,
          borderColor: selected ? colors.secondaryContainer : colors.outline,
        },
      ]}>
      {icon && selected && (
        <MaterialIcons
          name="check"
          size={18}
          color={colors.onSecondaryContainer}
        />
      )}
      <Text
        style={[
          styles.label,
          {
            color: selected
              ? colors.onSecondaryContainer
              : colors.onSurfaceVariant,
          },
        ]}>
        {label || 'Label'}
      </Text>
    </TouchableOpacity>
  );
};
