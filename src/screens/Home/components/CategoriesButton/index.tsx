import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { useCustomTheme } from '../../../../contexts/theme';

type Props = TouchableOpacityProps & {
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
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: selected ? colors.primary : colors.secundary20 },
      ]}
      {...rest}>
      <Text
        style={[
          styles.title,
          { color: selected ? colors.secundary : colors.primary },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 40,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  title: {},
});
