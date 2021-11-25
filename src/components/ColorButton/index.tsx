import React from 'react';
import { StyleSheet, ColorValue } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = RectButtonProps & {
  color: ColorValue;
  selected: boolean;
};

export const ColorButton: React.FC<Props> = ({
  color,
  selected = false,
  ...rest
}) => {
  return (
    <RectButton
      style={[
        styles.container,
        {
          backgroundColor: color,
        },
      ]}
      {...rest}>
      {selected && <MaterialIcons name="check" color="#FFFFFF" size={24} />}
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    marginTop: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
