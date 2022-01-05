import React from 'react';
import { ColorValue, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useCustomTheme } from '../../../contexts/theme';
import { hexToRgbA } from '../../../utils/roles';
import { styles } from './styles';

type Props = RectButtonProps & {
  label: string;
  categorie: string;
  color: ColorValue;
  date: string;
  time: string;
  passwordForce: string;
  onEdit: () => void;
  onView: () => void;
};

export const Card: React.FC<Props> = ({
  color,
  date,
  label,
  time,
  ...rest
}) => {
  const { colors } = useCustomTheme();
  const rgba = hexToRgbA(color.toString());
  return (
    <>
      <RectButton
        {...rest}
        style={[styles.container, { backgroundColor: rgba }]}>
        <View>
          <Text style={[styles.title, { color: colors.onSurface }]}>
            {label}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
            {'Uma breve observação se o usuário quiser'}
          </Text>
          <View style={styles.footer}>
            <View style={styles.item}>
              <MaterialIcons
                name="date-range"
                size={10}
                color={colors.tertiary}
              />
              <Text style={[styles.footertext, { color: colors.tertiary }]}>
                {date ? date : '01 de jan de 2021'}
              </Text>
            </View>
            <View style={styles.item}>
              <MaterialIcons
                name="access-time"
                size={10}
                color={colors.tertiary}
              />
              <Text style={[styles.footertext, { color: colors.tertiary }]}>
                {time ? time : '00:00'}
              </Text>
            </View>
          </View>
        </View>
        {/* Aqui vai o botão de favoritar */}
      </RectButton>
      <View style={{ marginBottom: 16 }} />
    </>
  );
};
